// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

function filterSidebarItems(items) {
  const result = items.filter(item => {
    return item.label !== 'api'
  })

  return result
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Cord.js',
  tagline: 'Simple, unopinionated, Discord Bot framework.',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'lukadev-0', // Usually your GitHub org/user name.
  projectName: 'cord.js', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  url: 'https://cord.js.org/',
  baseUrl: '/',
  trailingSlash: false,

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/lukadev-0/cord.js/edit/main/website/',

          sidebarItemsGenerator: async function ({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args)
            return filterSidebarItems(sidebarItems)
          },

          remarkPlugins: [
            require('@docusaurus/remark-plugin-npm2yarn'),
            { sync: true },
          ],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        pages: {
          remarkPlugins: [require('@docusaurus/remark-plugin-npm2yarn')],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{ name: 'theme-color', content: '#3578e5' }],
      image: 'img/cordjs.png',

      navbar: {
        title: 'Cord.js',
        logo: {
          alt: 'Cord.js Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo-dark.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'getting-started',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'doc',
            docId: 'api/index',
            position: 'left',
            label: 'API',
          },
          {
            href: 'https://github.com/lukadev-0/cord.js',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started',
              },
              {
                label: 'API Reference',
                to: '/docs/api/index',
              },
              {
                label: 'Middleware',
                to: '/docs/topics/middleware',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} LukaDev`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
