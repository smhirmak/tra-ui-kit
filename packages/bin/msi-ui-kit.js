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
  return files.filter(file => file.endsWith('.jsx') || file.endsWith('.tsx')).map(file => path.basename(file, path.extname(file)));
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
    if (componentName) {
      await addComponent(componentName);
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

      await addComponent(componentChoice);
    }
  });

program.parse(process.argv);
