const fs = require('fs');
const path = require('path');

async function initializeTailwindConfig() {
  const currentDir = process.cwd();
  const tailwindConfigPath = path.join(currentDir, 'tailwind.config.js');
  const indexCSSPath = path.join(currentDir, 'index.css');

  // Create Tailwind configuration
  const tailwindConfig = `
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
`;

  fs.writeFileSync(tailwindConfigPath, tailwindConfig.trim());
  console.log('Tailwind configuration initialized at:', tailwindConfigPath);

  // Create index.css content
  const indexCSSContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Arial', sans-serif;
}
`;

  fs.writeFileSync(indexCSSPath, indexCSSContent.trim());
  console.log('index.css initialized with Tailwind directives at:', indexCSSPath);
}

module.exports = initializeTailwindConfig;