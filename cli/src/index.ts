#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { execa } from "execa";
import { fileURLToPath } from "url";
import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const websiteUrl = "https://msi-ui-kit.vercel.app";
const githubUrl = "https://github.com/smhirmak/msi-ui-kit";

// ComponentJson tipini tanÄ±mla
interface ComponentJson {
  $schema?: string;
  style?: string;
  tailwind?: any;
  rsc?: boolean;
  tsx?: boolean;
  aliases?: {
    components?: string;
    utils?: string;
    ui?: string;
    lib?: string;
    hooks?: string;
  };
  registries?: {
    [key: string]: string;
  };
  [key: string]: any;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
}

interface RegistryResponse {
  items: RegistryItem[];
}

const program = new Command();

program
  .name("msi-ui-cli")
  .description("MSI UI Kit CLI - Complete UI solution with single init command")
  .version("0.0.49");

// INIT komutu
program
  .command("init")
  .description("Initialize MSI UI Kit - Complete configuration in one command")
  .option("-y, --yes", "Answer yes to all prompts")
  .action(async (options: { yes?: boolean }) => {
    await initCompleteSetup(options);
  });

// ADD komutu - components parametresini optional yap
program
  .command("add [components...]")
  .description("Add components to your project")
  .action(async (components: string[]) => {
    await addComponents(components);
  });

// LIST komutu
program
  .command("list")
  .description("List available components")
  .action(async () => {
    await listComponents();
  });

// Registry'den component listesini al
async function fetchComponentsFromRegistry(): Promise<RegistryItem[]> {
  const spinner = ora("Fetching components from registry...").start();

  try {
    const response = await fetch(`${websiteUrl}/r/registry.json`);

    if (!response.ok) {
      throw new Error(`Registry fetch failed: ${response.status}`);
    }

    const registry: RegistryResponse = await response.json();

    // Sadece UI component'lerini filtrele (theme, utils gibi diÄŸer item'larÄ± hariÃ§ tut)
    const uiComponents = registry.items.filter(
      (item) =>
        item.type === "registry:ui" ||
        (item.name !== "theme" && item.name !== "utils"),
    );

    spinner.succeed("Components fetched successfully");
    return uiComponents;
  } catch (error) {
    spinner.fail("Failed to fetch components from registry");
    console.log(chalk.yellowBright("Using fallback component list..."));

    // Fallback olarak hardcoded listeyi dÃ¶n
    return [
      {
        name: "button",
        type: "registry:ui",
        title: "Button",
        description: "Button component with various variants and styles",
      },
      {
        name: "loading-spinner",
        type: "registry:ui",
        title: "Loading Spinner",
        description: "Loading indicator component",
      },
    ];
  }
}

// INIT FONKSÄ°YONU
async function initCompleteSetup(options: { yes?: boolean } = {}) {
  const cwd = process.cwd();

  console.log("\nInitializing MSI UI Kit...\n");

  const spinner = ora();

  try {
    // 1. First run shadcn init (if needed)
    const componentJsonPath = path.join(cwd, "components.json");
    if (!(await fs.pathExists(componentJsonPath))) {
      console.log("Setting up MSI UI Kit base...");

      const initArgs = ["shadcn@latest", "init", "-b", "radix", "-s"];
      if (options.yes) initArgs.push("-y");

      await execa("npx", initArgs, {
        stdio: "inherit",
        cwd,
      });

      console.log("✔ MSI UI Kit base setup completed");
    }

    // 2. Add MSI registry
    console.log("Adding MSI registry...");
    spinner.stop();
    const registrySuccess = await ensureMsiRegistry();
    if (registrySuccess) {
      console.log("✔ MSI registry added");
    } else {
      console.log("✗ Failed to add MSI registry");
      return;
    }

    // 3. Add MSI Theme - Ã–ZEL HANDLING
    console.log("\nAdding MSI UI Kit theme...");

    // Spinner kullanmadan direkt execa Ã§alÄ±ÅŸtÄ±r
    const themeArgs = [
      "shadcn@latest",
      "add",
      "@msi/theme",
      "@msi/typhography",
      "@msi/utils",
      "-s",
    ];

    // EÄŸer --yes flag'i varsa, otomatik onayla
    if (options.yes) {
      themeArgs.push("--yes");
    }

    await execa("npx", themeArgs, {
      stdio: "inherit",
      cwd,
    });

    try {
      const componentsConfig = await fs.readJson(componentJsonPath);

      // 1. Alias'tan gerçek yolu ayıkla (Örn: "@/components/ui" -> "components/ui")
      // Baştaki @ ve / işaretlerini temizliyoruz
      let uiAlias = componentsConfig.aliases?.ui || "components/ui";
      const relativeUiPath = uiAlias.replace(/^@\//, "");

      // 2. CWD ile birleştirerek mutlak yolu oluştur
      const fullUiDir = path.resolve(cwd, relativeUiPath);

      console.log("Target UI directory:", fullUiDir);

      if (await fs.pathExists(fullUiDir)) {
        await fs.remove(fullUiDir);
        console.log(chalk.green("✔ Default shadcn ui directory removed."));
      } else {
        // Alternatif yol denemesi (Eğer src/ altında ise ve alias'ta yazmıyorsa)
        const fallbackPath = path.resolve(cwd, "src", relativeUiPath);
        if (await fs.pathExists(fallbackPath)) {
          await fs.remove(fallbackPath);
          console.log(
            chalk.green("✔ Default shadcn ui directory removed (from src)."),
          );
        } else {
          console.log(
            chalk.yellow("ℹ UI directory not found, skipping cleanup."),
          );
        }
      }
    } catch (e) {
      console.log("Cleanup error:", String(e));
    }

    await removeOnlyShadcnApplyRules();

    // Success message and next steps
    showSuccessMessage();
  } catch (error: any) {
    spinner.stop(); // Spinner'Ä± durdur

    console.log(chalk.red("\nInitialization failed"));

    console.log("\nTroubleshooting:");
    if (error.message.includes("init")) {
      console.log("  Try manual setup:");
      console.log(chalk.yellowBright("  npx shadcn add @msi/theme"));
    } else {
      console.log("  Error details:", error.message);
    }
    console.log(chalk.cyan(`  Documentation: ${websiteUrl}`));
  }
}

async function ensureMsiRegistry(): Promise<boolean> {
  const cwd = process.cwd();
  const componentJsonPath = path.join(cwd, "components.json");

  if (!(await fs.pathExists(componentJsonPath))) {
    return false;
  }

  const componentJson: ComponentJson = await fs.readJson(componentJsonPath);

  // Create registries if not exists
  if (
    !componentJson.registries ||
    typeof componentJson.registries !== "object"
  ) {
    componentJson.registries = {};
  }

  // Add MSI registry if not exists
  const msiRegistryUrl = `${websiteUrl}/r/{name}.json`;

  if (!componentJson.registries["@msi"]) {
    componentJson.registries["@msi"] = msiRegistryUrl;

    // Ensure tailwind section exists and enable cssVariables
    if (!componentJson.tailwind || typeof componentJson.tailwind !== "object") {
      componentJson.tailwind = {};
    }
    componentJson.tailwind.cssVariables = true;

    await fs.writeJson(componentJsonPath, componentJson, { spaces: 2 });
    return true;
  }

  return true;
}

async function addComponents(components: string[]) {
  // EÄŸer component belirtilmemiÅŸse, interaktif seÃ§im gÃ¶ster
  if (components.length === 0) {
    await showInteractiveComponentSelector();
    return;
  }

  console.log(`\nAdding ${components.length} component(s)...\n`);

  const spinner = ora();

  // First check registry
  const registryReady = await ensureMsiRegistry();
  if (!registryReady) {
    console.log("Please run init first:");
    console.log(chalk.yellowBright("  npx msi-ui-cli init\n"));
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  // Run shadcn add for each component
  for (const component of components) {
    console.log(`Adding ${component}...`);

    try {
      const addArgs = ["shadcn@latest", "add", `@msi/${component}`];

      await execa("npx", addArgs, {
        stdio: "inherit",
        cwd: process.cwd(),
      });

      console.log(chalk.green(`âœ“ Added ${component}`));
      successCount++;
    } catch (error: any) {
      console.log(chalk.red(`âœ— Failed to add ${component}`));
      console.log("  Try manually:");
      console.log(chalk.yellowBright(`  npx shadcn add @msi/${component}`));
      errorCount++;
    }
  }

  console.log("\nSummary:");
  console.log(`  Success: ${successCount}`);
  if (errorCount > 0) {
    console.log(`  Failed: ${errorCount}`);
  }
  console.log(`  Total: ${components.length}\n`);
}

// Interaktif component seÃ§ici
async function showInteractiveComponentSelector() {
  console.log("\nðŸŒ¿ MSI UI Kit - Component Selector\n");

  try {
    const components = await fetchComponentsFromRegistry();

    if (components.length === 0) {
      console.log(chalk.yellow("No components available."));
      return;
    }

    const { selectedComponents } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "selectedComponents",
        message: "Select components to add:",
        choices: components.map((comp) => ({
          name: `${chalk.cyan(comp.name.padEnd(18))} - ${comp.description}`,
          value: comp.name,
          short: comp.name,
        })),
        pageSize: Math.min(components.length, 10),
      },
    ]);

    if (selectedComponents.length === 0) {
      console.log(chalk.yellow("No components selected."));
      return;
    }

    console.log(`\nSelected ${selectedComponents.length} component(s):`);
    selectedComponents.forEach((comp: string) => {
      console.log(`  â€¢ ${chalk.cyan(comp)}`);
    });

    const { confirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: "Proceed with installation?",
        default: true,
      },
    ]);

    if (confirm) {
      await addComponents(selectedComponents);
    } else {
      console.log(chalk.yellow("Installation cancelled."));
    }
  } catch (error) {
    console.log(chalk.red("Failed to load components list"));
    console.log(
      chalk.cyan("  Please check your internet connection and try again."),
    );
  }
}

async function listComponents() {
  console.log("\nAvailable MSI UI Kit Components:\n");

  try {
    const components = await fetchComponentsFromRegistry();

    components.forEach((comp) => {
      console.log(
        `  â€¢ ${chalk.cyan(comp.name.padEnd(18))} - ${comp.description}`,
      );
    });

    console.log("\nUsage:");
    console.log("  Add components:");
    console.log(
      chalk.yellowBright("  npx msi-ui-cli add") + " (interactive selection)",
    );
    console.log(
      chalk.yellowBright("  npx msi-ui-cli add button loading-spinner") +
        " (specific components)",
    );
  } catch (error) {
    console.log(chalk.red("Failed to load components list"));
    console.log(
      chalk.cyan("  Please check your internet connection and try again."),
    );
  }
}

function showSuccessMessage() {
  console.log(
    `\n\n${chalk.green("Success!")} MSI UI Kit has been initialized.\n`,
  );

  console.log("Next steps:");
  console.log("  Add components:");
  console.log(
    chalk.yellowBright("  npx msi-ui-cli add") + " (interactive selection)",
  );
  console.log(
    chalk.yellowBright("  npx msi-ui-cli add button") + " (specific component)",
  );

  console.log("\n  See all components:");
  console.log(
    chalk.yellowBright("  npx msi-ui-cli list") +
      " or " +
      chalk.yellowBright("msi list\n"),
  );

  console.log("Documentation:");
  console.log(chalk.cyan(`  ${websiteUrl}\n`));

  console.log("Contribute:");
  console.log(chalk.cyan(`  ${githubUrl}\n`));
}

async function removeOnlyShadcnApplyRules() {
  const cwd = process.cwd();

  try {
    // components.json'dan CSS dosya yolunu al
    const componentJsonPath = path.join(cwd, "components.json");
    if (!(await fs.pathExists(componentJsonPath))) {
      console.log(
        chalk.yellow(
          "âš ï¸  components.json bulunamadÄ±, CSS temizleme atlanÄ±yor",
        ),
      );
      return;
    }

    const componentJson: ComponentJson = await fs.readJson(componentJsonPath);
    const cssFilePath = componentJson.tailwind?.css;

    if (!cssFilePath) {
      console.log(
        chalk.yellow("âš ï¸  CSS dosya yolu bulunamadÄ±, iÅŸlem atlanÄ±yor"),
      );
      return;
    }

    const fullCssPath = path.join(cwd, cssFilePath);
    if (!(await fs.pathExists(fullCssPath))) {
      console.log(
        chalk.yellow(`âš ï¸  CSS dosyasÄ± bulunamadÄ±: ${cssFilePath}`),
      );
      return;
    }

    let cssContent = await fs.readFile(fullCssPath, "utf-8");

    cssContent = removeSpecificApplyRules(cssContent);

    await fs.writeFile(fullCssPath, cssContent);
  } catch (error) {
    console.log(
      chalk.yellow("âš ï¸  CSS temizleme sÄ±rasÄ±nda hata oluÅŸtu:"),
      error,
    );
  }
}

function removeSpecificApplyRules(cssContent: string): string {
  let cleanedContent = cssContent;

  // SADECE bu iki spesifik @apply kuralÄ±nÄ± temizle
  const unwantedApplyRules = [
    // @apply border-border outline-ring/50;
    /@apply border-border outline-ring\/50;/g,

    // @apply bg-background text-foreground;
    /@apply bg-background text-foreground;/g,
  ];

  unwantedApplyRules.forEach((pattern) => {
    cleanedContent = cleanedContent.replace(pattern, "");
  });

  // BoÅŸ kalan selector'larÄ± temizle (sadece {} kalan)
  cleanedContent = cleanedContent.replace(/\*\s*\{\s*\}/g, "");
  cleanedContent = cleanedContent.replace(/body\s*\{\s*\}/g, "");

  return cleanedContent;
}

// Start CLI
program.parse();
