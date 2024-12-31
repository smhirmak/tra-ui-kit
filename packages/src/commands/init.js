const fs = require('fs-extra');
const path = require('path');

async function initializeTailwindConfig() {
  const currentDir = process.cwd();
  const tailwindConfigJsPath = path.join(currentDir, 'tailwind.config.js');
  const tailwindConfigTsPath = path.join(currentDir, 'tailwind.config.ts');
  const indexCSSPath = path.join(currentDir, 'src/index.css');
  const msiKitDir = path.join(currentDir, 'src/components/msi-kit');

  // Tailwind CSS'in kurulu olup olmadığını kontrol et
  if (!fs.existsSync(tailwindConfigJsPath) && !fs.existsSync(tailwindConfigTsPath)) {
    console.error('Tailwind CSS is not installed in this project. Please install Tailwind CSS before running this command.');
    process.exit(1);
  }

  // Create Tailwind configuration
  const tailwindConfig = `
 /** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
`;

  // tailwind.config.js veya tailwind.config.ts dosyasını güncelle
  if (fs.existsSync(tailwindConfigJsPath)) {
    fs.writeFileSync(tailwindConfigJsPath, tailwindConfig.trim());
  } else if (fs.existsSync(tailwindConfigTsPath)) {
    fs.writeFileSync(tailwindConfigTsPath, tailwindConfig.trim());
  }

  // Create index.css content if it doesn't exist, otherwise append Tailwind directives
  const indexCSSContent = `

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Arial', sans-serif;
}
`;

  if (fs.existsSync(indexCSSPath)) {
    fs.appendFileSync(indexCSSPath, indexCSSContent.trim());
  } else {
    fs.writeFileSync(indexCSSPath, indexCSSContent.trim());
  }

  // Create msi-kit directory
  await fs.ensureDir(msiKitDir);
  console.log('MSI UI Kit initialized successfully.');
}

module.exports = initializeTailwindConfig;