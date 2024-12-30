const fs = require('fs');
const path = require('path');

function addComponent(componentName) {
  const currentDir = process.cwd();
  const componentDir = path.join(currentDir, 'src/components');
  const componentFilePath = path.join(componentDir, `${componentName}.js`);
  const templateFilePath = path.join(__dirname, '..', 'components', `${componentName}.js`);

  if (!fs.existsSync(templateFilePath)) {
    console.error(`Component template for ${componentName} not found.`);
    process.exit(1);
  }

  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  const componentContent = fs.readFileSync(templateFilePath, 'utf8');
  fs.writeFileSync(componentFilePath, componentContent.trim());
  console.log(`${componentName} component added successfully at:`, componentFilePath);
}

module.exports = addComponent;