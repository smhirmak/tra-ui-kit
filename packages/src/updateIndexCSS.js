const fs = require('fs');
const path = require('path');

function updateIndexCSS() {
  const currentDir = process.cwd();
  console.log('Current working directory:', currentDir);

  const cssPath = path.join(currentDir, 'src', 'index.css');
  console.log('CSS path:', cssPath);

  let cssContent;

  try {
    cssContent = fs.readFileSync(cssPath, 'utf8');
  } catch (error) {
    console.error('src/index.css dosyası bulunamadı.');
    process.exit(1);
  }

  const newColors = `
:root {
  --color-primary: #3490dc;
  --color-secondary: #ffed4a;
  /* Diğer renkleri ekleyin */
}

.dark {
  --color-primary: #2779bd;
  --color-secondary: #f6993f;
  /* Diğer karanlık mod renklerini ekleyin */
}
`;

  cssContent = newColors + cssContent;

  fs.writeFileSync(cssPath, cssContent);
  console.log('index.css güncellendi.');
}

module.exports = updateIndexCSS;