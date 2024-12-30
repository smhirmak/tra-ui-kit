const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

async function updateTailwindConfig() {
  const currentDir = process.cwd();
  console.log('Current working directory:', currentDir);

  const configPath = path.join(currentDir, 'tailwind.config.js');
  console.log('Config path:', configPath);

  if (!fs.existsSync(configPath)) {
    console.error('tailwind.config.js dosyası bulunamadı.');
    process.exit(1);
  }

  let config;

  try {
    const configUrl = pathToFileURL(configPath).href;
    config = await import(configUrl);
    config = config.default;
  } catch (error) {
    console.error('tailwind.config.js dosyası yüklenemedi:', error);
    process.exit(1);
  }

  const uiKitConfig = {
    theme: {
      extend: {
        colors: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          // Diğer renkleri ekleyin
        },
      },
    },
    // Diğer yapılandırmaları ekleyin
  };

  config = {
    ...config,
    theme: {
      ...config.theme,
      extend: {
        ...config.theme?.extend,
        ...uiKitConfig.theme.extend,
      },
    },
  };

  fs.writeFileSync(configPath, `export default ${JSON.stringify(config, null, 2)}`);
  console.log('Tailwind yapılandırması güncellendi.');
}

module.exports = updateTailwindConfig;