#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const websiteUrl = 'https://msi-ui-kit.vercel.app';
const githubUrl = 'https://github.com/smhirmak/msi-ui-kit';

// ComponentJson tipini tanımla
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
  .name('msi-ui-cli')
  .description('MSI UI Kit CLI - Complete UI solution with single init command')
  .version('0.0.26');

// INIT komutu
program
  .command('init')
  .description('Initialize MSI UI Kit - Complete configuration in one command')
  .option('-y, --yes', 'Answer yes to all prompts')
  .action(async (options: { yes?: boolean }) => {
    await initCompleteSetup(options);
  });

// ADD komutu
program
  .command('add <components...>')
  .description('Add components to your project')
  .action(async (components: string[]) => {
    await addComponents(components);
  });

// LIST komutu  
program
  .command('list')
  .description('List available components')
  .action(async () => {
    await listComponents();
  });

// Registry'den component listesini al
async function fetchComponentsFromRegistry(): Promise<RegistryItem[]> {
  const spinner = ora('Fetching components from registry...').start();
  
  try {
    const response = await fetch(`${websiteUrl}/r/registry.json`);
    
    if (!response.ok) {
      throw new Error(`Registry fetch failed: ${response.status}`);
    }
    
    const registry: RegistryResponse = await response.json();
    
    // Sadece UI component'lerini filtrele (theme, utils gibi diğer item'ları hariç tut)
    const uiComponents = registry.items.filter(item => 
      item.type === 'registry:ui' || item.name !== 'theme' && item.name !== 'utils'
    );
    
    spinner.succeed('Components fetched successfully');
    return uiComponents;
  } catch (error) {
    spinner.fail('Failed to fetch components from registry');
    console.log(chalk.yellowBright('Using fallback component list...'));
    
    // Fallback olarak hardcoded listeyi dön
    return [
      { 
        name: 'button', 
        type: 'registry:ui',
        title: 'Button',
        description: 'Button component with various variants and styles'
      },
      { 
        name: 'loading-spinner', 
        type: 'registry:ui',
        title: 'Loading Spinner',
        description: 'Loading indicator component'
      },
    ];
  }
}

// INIT FONKSİYONU
async function initCompleteSetup(options: { yes?: boolean } = {}) {
  const cwd = process.cwd();
  
  console.log('\nInitializing MSI UI Kit...\n');

  const spinner = ora();

  try {
    // 1. First run shadcn init (if needed)
    const componentJsonPath = path.join(cwd, 'components.json');
    if (!(await fs.pathExists(componentJsonPath))) {
      spinner.start('Setting up MSI UI Kit base...');
      
      const initArgs = [
        'shadcn@latest',
        'init',
        '-s',
        // '--no-css-variables', 
        '--no-base-style'
      ];
      if (options.yes) initArgs.push('-y');
      
      await execa('npx', initArgs, { 
        stdio: 'inherit',
        cwd 
      });
      
      spinner.succeed('MSI UI Kit base setup completed');
    }

    // 2. Add MSI registry
    spinner.start('Adding MSI registry...');
    const registrySuccess = await ensureMsiRegistry();
    if (registrySuccess) {
      spinner.succeed('MSI registry added');
    } else {
      spinner.fail('Failed to add MSI registry');
      return;
    }

    // 3. Add MSI Theme - ÖZEL HANDLING
    console.log('\nAdding MSI UI Kit theme...');
    
    // Spinner kullanmadan direkt execa çalıştır
    const themeArgs = [
      'shadcn@latest',
      'add',
      '@msi/theme',
      '@msi/typhography', 
      '@msi/utils',
      '-s',
      '--no-css-variables'
    ];
    
    // Eğer --yes flag'i varsa, otomatik onayla
    if (options.yes) {
      themeArgs.push('--yes');
    }
    
    await execa('npx', themeArgs, {
      stdio: 'inherit',
      cwd
    });

    await removeOnlyShadcnApplyRules();

    // Success message and next steps
    showSuccessMessage();

  } catch (error: any) {
    spinner.stop(); // Spinner'ı durdur
    
    console.log(chalk.red('\nInitialization failed'));
    
    console.log('\nTroubleshooting:');
    if (error.message.includes('init')) {
      console.log('  Try manual setup:');
      console.log(chalk.yellowBright('  npx shadcn add @msi/theme'));
    } else {
      console.log('  Error details:', error.message);
    }
    console.log(chalk.cyan(`  Documentation: ${websiteUrl}`));
  }
}

async function ensureMsiRegistry(): Promise<boolean> {
  const cwd = process.cwd();
  const componentJsonPath = path.join(cwd, 'components.json');
  
  if (!(await fs.pathExists(componentJsonPath))) {
    return false;
  }

  const componentJson: ComponentJson = await fs.readJson(componentJsonPath);

  // Create registries if not exists
  if (!componentJson.registries || typeof componentJson.registries !== 'object') {
    componentJson.registries = {};
  }

  // Add MSI registry if not exists
  const msiRegistryUrl = `${websiteUrl}/r/{name}.json`;

  if (!componentJson.registries['@msi']) {
    componentJson.registries['@msi'] = msiRegistryUrl;

    // Ensure tailwind section exists and enable cssVariables
    if (!componentJson.tailwind || typeof componentJson.tailwind !== 'object') {
      componentJson.tailwind = {};
    }
    componentJson.tailwind.cssVariables = true;

    await fs.writeJson(componentJsonPath, componentJson, { spaces: 2 });
    return true;
  }

  return true;
}

async function addComponents(components: string[]) {
  console.log(`\nAdding ${components.length} component(s)...\n`);

  const spinner = ora();

  // First check registry
  const registryReady = await ensureMsiRegistry();
  if (!registryReady) {
    console.log('Please run init first:');
    console.log(chalk.yellowBright('  npx msi-ui-cli init\n'));
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  // Run shadcn add for each component
  for (const component of components) {
    console.log(`Adding ${component}...`);
    
    try {
      const addArgs = ['shadcn@latest', 'add', `@msi/${component}`];
      
      await execa('npx', addArgs, {
        stdio: 'inherit',
        cwd: process.cwd()
      });
      
      console.log(chalk.green(`✓ Added ${component}`));
      successCount++;
    } catch (error: any) {
      console.log(chalk.red(`✗ Failed to add ${component}`));
      console.log('  Try manually:');
      console.log(chalk.yellowBright(`  npx shadcn add @msi/${component}`));
      errorCount++;
    }
  }

  console.log('\nSummary:');
  console.log(`  Success: ${successCount}`);
  if (errorCount > 0) {
    console.log(`  Failed: ${errorCount}`);
  }
  console.log(`  Total: ${components.length}\n`);
}

async function listComponents() {
  console.log('\nAvailable MSI UI Kit Components:\n');
  
  try {
    const components = await fetchComponentsFromRegistry();
    
    components.forEach(comp => {
      console.log(`  • ${chalk.cyan(comp.name.padEnd(18))} - ${comp.description}`);
    });

    console.log('\nUsage:');
    console.log('  Add components:');
    console.log(chalk.yellowBright('  npx msi-ui-cli add button') + ' or ' + chalk.yellowBright('msi add button'));
  } catch (error) {
    console.log(chalk.red('Failed to load components list'));
    console.log(chalk.cyan('  Please check your internet connection and try again.'));
  }
}

function showSuccessMessage() {
  console.log(`\n\n${chalk.green('Success!')} MSI UI Kit has been initialized.\n`);

  console.log('Next steps:');
  console.log('  Add components:');
  console.log(chalk.yellowBright('  npx msi-ui-cli add button') + ' or ' + chalk.yellowBright('msi add button'));
  
  console.log('\n  See all components:');
  console.log(chalk.yellowBright('  npx msi-ui-cli list') + ' or ' + chalk.yellowBright('msi list\n'));

  console.log('Documentation:');
  console.log(chalk.cyan(`  ${websiteUrl}\n`));

  console.log('Contribute:');
  console.log(chalk.cyan(`  ${githubUrl}\n`));
}

async function removeOnlyShadcnApplyRules() {
  const cwd = process.cwd();
  
  try {
    // components.json'dan CSS dosya yolunu al
    const componentJsonPath = path.join(cwd, 'components.json');
    if (!(await fs.pathExists(componentJsonPath))) {
      console.log(chalk.yellow('⚠️  components.json bulunamadı, CSS temizleme atlanıyor'));
      return;
    }

    const componentJson: ComponentJson = await fs.readJson(componentJsonPath);
    const cssFilePath = componentJson.tailwind?.css;

    if (!cssFilePath) {
      console.log(chalk.yellow('⚠️  CSS dosya yolu bulunamadı, işlem atlanıyor'));
      return;
    }

    const fullCssPath = path.join(cwd, cssFilePath);
    if (!(await fs.pathExists(fullCssPath))) {
      console.log(chalk.yellow(`⚠️  CSS dosyası bulunamadı: ${cssFilePath}`));
      return;
    }

    let cssContent = await fs.readFile(fullCssPath, 'utf-8');
    
    cssContent = removeSpecificApplyRules(cssContent);
    
    await fs.writeFile(fullCssPath, cssContent);
  } catch (error) {
    console.log(chalk.yellow('⚠️  CSS temizleme sırasında hata oluştu:'), error);
  }
}

function removeSpecificApplyRules(cssContent: string): string {
  let cleanedContent = cssContent;
  
  // SADECE bu iki spesifik @apply kuralını temizle
  const unwantedApplyRules = [
    // @apply border-border outline-ring/50;
    /@apply border-border outline-ring\/50;/g,
    
    // @apply bg-background text-foreground;
    /@apply bg-background text-foreground;/g
  ];

  unwantedApplyRules.forEach(pattern => {
    cleanedContent = cleanedContent.replace(pattern, '');
  });

  // Boş kalan selector'ları temizle (sadece {} kalan)
  cleanedContent = cleanedContent.replace(/\*\s*\{\s*\}/g, '');
  cleanedContent = cleanedContent.replace(/body\s*\{\s*\}/g, '');

  return cleanedContent;
}

// Start CLI
program.parse();