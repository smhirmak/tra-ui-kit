#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const inquirer = require('inquirer');
const fs = require('fs-extra');

const initializeTailwindConfig = require(path.resolve(__dirname, '../src/commands/init'));
const addComponent = require(path.resolve(__dirname, '../src/commands/add'));

const getAvailableComponents = async () => {
  const componentsDir = path.resolve(__dirname, '../src/components');
  const files = await fs.readdir(componentsDir);
  // return files.filter(file => file.endsWith('.jsx') || file.endsWith('.tsx')).map(file => path.basename(file, path.extname(file)));
  return files.filter(file => file.endsWith('.tsx')).map(file => path.basename(file, path.extname(file)));
};

const componentDependencies = {
  BackToTopButton: ['Button', 'LoadingSpinner'],
  Button: ['LoadingSpinner'],
  Calendar: ['Button', 'LoadingSpinner'],
  Checkbox: ['Label', 'Tooltip'],
  DatePicker: ['Button', 'Calendar', 'Popover', 'Label', 'Tooltip', 'LoadingSpinner'],
  Dialog: ['Button', 'LoadingSpinner'],
  Drawer: ['Button', 'LoadingSpinner'],
  Input: ['Button', 'LoadingSpinner'],
  Label: ['Tooltip'],
  Loader: ['LoadingSpinner', 'LoadingLinear'],
  Pagination: ['Button', 'LoadingSpinner', 'Input'],
  SearchBar: ['TextField', 'Input', 'Label', 'Tooltip', 'Button', 'LoadingSpinner'],
  Select: ['Button', 'LoadingSpinner', 'Label', 'Tooltip', 'Popover'],
  Switch: ['Label', 'Tooltip'],
  TextField: ['Input', 'Label', 'Tooltip'],
};

const addComponentWithDependencies = async (name, language) => {
  await addComponent(name, language);
  if (componentDependencies[name]) {
    for (const dependency of componentDependencies[name]) {
      await addComponent(dependency, language);
    }
  }
};

program
  .version('1.0.0')
  .command('init')
  .description('Initialize UI kit with Tailwind CSS')
  .action(initializeTailwindConfig);

program
  .command('add [componentName]')
  .description('Add a new component')
  .action(async (componentName) => {
    const { languageChoice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'languageChoice',
        message: 'Select the language for the component:',
        choices: ['JavaScript', 'TypeScript']
      }
    ]);

    if (componentName) {
      await addComponentWithDependencies(componentName, languageChoice);
    } else {
      const availableComponents = await getAvailableComponents();
      if (availableComponents.length === 0) {
        console.error('No components found in the source directory');
        return;
      }

      const { componentChoice } = await inquirer.prompt([
        {
          type: 'list',
          name: 'componentChoice',
          message: 'Select a component to add:',
          choices: availableComponents
        }
      ]);

      await addComponentWithDependencies(componentChoice, languageChoice);
    }
  });

program.parse(process.argv);
