const fs = require('fs-extra');
const path = require('path');

async function add(componentName) {
  const currentDir = process.cwd();
  const componentDir = path.join(currentDir, 'src/components/msi-kit');
  const templateDir = path.join(__dirname, '..', 'components');

  // .jsx ve .tsx dosyalarını kontrol et
  const templateFilePathJsx = path.join(templateDir, `${componentName}.jsx`);
  const templateFilePathTsx = path.join(templateDir, `${componentName}.tsx`);

  let templateFilePath;
  if (fs.existsSync(templateFilePathJsx)) {
    templateFilePath = templateFilePathJsx;
  } else if (fs.existsSync(templateFilePathTsx)) {
    templateFilePath = templateFilePathTsx;
  } else {
    console.error(`Component template for ${componentName} not found.`);
    process.exit(1);
  }

  if (!fs.existsSync(componentDir)) {
    await fs.ensureDir(componentDir);
  }

  const componentContent = fs.readFileSync(templateFilePath, 'utf8');
  const componentFilePath = path.join(componentDir, `${componentName}${path.extname(templateFilePath)}`);
  fs.writeFileSync(componentFilePath, componentContent.trim());
  console.log(`${componentName} component added successfully at src/msi-kit`,);
}

module.exports = add;