import { defineConfig } from 'dumi';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  ssr: isProd ? {} : false,
  exportStatic: isProd ? {} : false,
  title: 'Pansy Theme',
  mode: 'site',
  locales: [
    ['zh', '中文'],
    ['en', 'English'],
  ],
  favicon:
    'https://imagesd.tuyaus.com/tyims/rms-static/c118f100-7bd1-11ea-be8a-afe9921c3d8a-1586595140625.ico?tyName=tuya_favicon.ico',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  theme: {
    'primary-color': '#2B6DE5',
  },
  themeConfig: {
    repository: {
      url: 'https://github.com/pansy/dumi-theme-pansy',
      branch: 'master',
      platform: 'github',
      dir: '/site'
    },
  },
  logo:
    'https://imagesd.tuyaus.com/tyims/rms-static/c118f100-7bd1-11ea-be8a-afe9921c3d8a-1586595140625.ico?tyName=tuya_favicon.ico',
  navs: {
    zh: [
      null,
      {
        title: 'Github',
        path: 'https://github.com/pansyjs/dumi-theme-pansy',
      },
    ],
    en: [
      null,
      {
        title: 'Github',
        path: 'https://github.com/pansyjs/dumi-theme-pansy',
      },
    ],
  },
  resolve: {
    passivePreview: true,
  },
  hash: isProd,
  publicPath: isProd
    ? '//cdn.jsdelivr.net/gh/pansyjs/dumi-theme-pansy@gh-pages/'
    : '/',
});
