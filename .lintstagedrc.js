module.exports = {
  '**/*.{ts,tsx,js,json,css,md}': ['prettier --write'],
  'cli/src/**/*.ts': () => './cli/node_modules/.bin/tsc.cmd --noEmit -p cli/tsconfig.json',
  'core/registry/**/*.{ts,tsx}': () =>
    './core/node_modules/.bin/tsc.cmd --noEmit -p core/tsconfig.app.json',
  'core/src/**/*.{ts,tsx}': () =>
    './core/node_modules/.bin/tsc.cmd --noEmit -p core/tsconfig.app.json',
};
