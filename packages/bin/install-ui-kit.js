#!/usr/bin/env node

const { Command } = require('commander');
const initConfig = require('../src/commands/init');
const addComponent = require('../src/commands/addComponent');

const program = new Command();

program
  .name('msi-ui-kit')
  .description('CLI tool for initializing and managing UI components with Tailwind CSS')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize Tailwind CSS configuration and index.css')
  .action(initConfig);

program
  .command('add <component>')
  .description('Add a specified component to the project')
  .action(addComponent);

program.parse(process.argv);