import { defineConfig } from 'redbud';

export default defineConfig({
  esm: {
    output: 'es',
  },
  platform: 'browser',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ]
});
