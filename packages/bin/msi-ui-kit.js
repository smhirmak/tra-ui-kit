#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

// Available components list
const availableComponents = {
  'Button': {
    template: `const Button = ({ children, ...props }) => {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" {...props}>
      {children}
    </button>
  );
};

export default Button;`
  },
  'Card': {
    template: `const Card = ({ title, children }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;`
  },
  'Input': {
    template: `const Input = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block mb-2 text-sm font-medium">{label}</label>}
      <input className="w-full px-3 py-2 border rounded-md" {...props} />
    </div>
  );
};

export default Input;`
  }
};

program
  .version('1.0.0')
  .command('init')
  .description('Initialize UI kit with Tailwind CSS')
  .action(async () => {
    try {
      // Create tailwind.config.js with proper format
      const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

      // Create index.css with Tailwind directives
      const indexCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

      // Create src directory if it doesn't exist
      await fs.ensureDir(path.join(process.cwd(), 'src'));

      // Write both files
      await Promise.all([
        fs.writeFile(
          path.join(process.cwd(), 'tailwind.config.js'),
          tailwindConfigContent
        ),
        fs.writeFile(
          path.join(process.cwd(), 'src/index.css'),
          indexCssContent
        )
      ]);

      console.log('Successfully initialized UI kit with Tailwind CSS');
      console.log('Created: tailwind.config.js');
      console.log('Created: src/index.css');
    } catch (error) {
      console.error('Error initializing UI kit:', error);
    }
  });

program
  .command('add')
  .description('Add a new component')
  .action(async () => {
    try {
      const { componentChoice } = await inquirer.prompt([
        {
          type: 'list',
          name: 'componentChoice',
          message: 'Select a component to add:',
          choices: Object.keys(availableComponents)
        }
      ]);

      const componentDir = path.join(process.cwd(), 'src/components');
      await fs.ensureDir(componentDir);

      const componentPath = path.join(componentDir, `${componentChoice}.jsx`);
      await fs.writeFile(componentPath, availableComponents[componentChoice].template);

      console.log(`Successfully created component: ${componentChoice}`);
    } catch (error) {
      console.error('Error creating component:', error);
    }
  });

program.parse(process.argv);
