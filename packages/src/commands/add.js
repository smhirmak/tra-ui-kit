const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

async function add(componentName, language) {
  const currentDir = process.cwd();
  const componentDir = path.join(currentDir, 'src/components/msi-kit');
  const templateDir = path.join(__dirname, '..', 'components');

  // Determine the correct file extension based on user preference
  const fileExtension = language === 'JavaScript' ? 'jsx' : 'tsx';
  const templateFilePath = path.join(templateDir, `${componentName}.${fileExtension}`);

  if (!fs.existsSync(templateFilePath)) {
    console.error(`Component template for ${componentName} not found.`);
    process.exit(1);
  }

  if (!fs.existsSync(componentDir)) {
    await fs.ensureDir(componentDir);
  }

  const componentContent = fs.readFileSync(templateFilePath, 'utf8');
  const componentFilePath = path.join(componentDir, `${componentName}.${fileExtension}`);
  fs.writeFileSync(componentFilePath, componentContent.trim());
  console.log(`${componentName} component added successfully at src/components/msi-kit`);
}

module.exports = add;