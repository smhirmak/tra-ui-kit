const fs = require('fs-extra');
const path = require('path');

async function add(componentName) {
  const currentDir = process.cwd();
  const componentDir = path.join(currentDir, 'src/components/tra-kit');
  const typesDir = path.join(currentDir, 'src/types');
  const templateDir = path.join(__dirname, '..', 'components');
  const typeTemplateDir = path.join(__dirname, '..', 'types');

  // Check for component template
  const templateFilePathTsx = path.join(templateDir, `${componentName}.tsx`);
  const templateFilePathJsx = path.join(templateDir, `${componentName}.jsx`);

  // Check for type definition template
  const typeFilePath = path.join(typeTemplateDir, `${componentName}.ts`);

  // Find correct component template
  let templateFilePath;
  if (fs.existsSync(templateFilePathTsx)) {
    templateFilePath = templateFilePathTsx;
  } else if (fs.existsSync(templateFilePathJsx)) {
    templateFilePath = templateFilePathJsx;
  } else {
    console.error(`Component template for ${componentName} not found.`);
    process.exit(1);
  }

  // Create component directory if it doesn't exist
  if (!fs.existsSync(componentDir)) {
    await fs.ensureDir(componentDir);
  }

  // Create types directory if it doesn't exist
  if (!fs.existsSync(typesDir)) {
    await fs.ensureDir(typesDir);
  }

  // Copy component
  const componentContent = fs.readFileSync(templateFilePath, 'utf8');
  const componentFilePath = path.join(
    componentDir,
    `${componentName}${path.extname(templateFilePath)}`,
  );
  fs.writeFileSync(componentFilePath, componentContent.trim());
  console.log(`${componentName} component added successfully at src/components/tra-kit`);

  // Copy type definition if exists
  if (fs.existsSync(typeFilePath)) {
    const typesContent = fs.readFileSync(typeFilePath, 'utf8');
    const typesDestPath = path.join(typesDir, 'types.ts');

    // If types.ts exists, append the new type
    if (fs.existsSync(typesDestPath)) {
      const existingTypes = fs.readFileSync(typesDestPath, 'utf8');
      // Append new type while avoiding duplicates
      if (!existingTypes.includes(typesContent.trim())) {
        fs.appendFileSync(typesDestPath, `\n${typesContent.trim()}\n`);
      }
    } else {
      // Create new types.ts with the type definition
      fs.writeFileSync(typesDestPath, typesContent.trim());
    }
    console.log(`${componentName} types added successfully to src/types/types.ts`);
  }
}

module.exports = add;
