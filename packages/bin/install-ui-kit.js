#!/usr/bin/env node

const { Command } = require('commander');
const initConfig = require('../src/commands/init');
const add = require('../src/commands/add');

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
  .action(add);

program.parse(process.argv);
