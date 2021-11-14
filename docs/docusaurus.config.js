// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

function filterSidebarItems(items) {
  const result = items.map(item => {
    if (item.type === 'category') {
      return { ...item, items: filterSidebarItems(item.items) }
    }
    return item
  })

  return result.filter(doc => !doc.id?.startsWith('api'))
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
  url: 'https://lukadev-0.github.io/',
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
          editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',

          sidebarItemsGenerator: async function ({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args)
            return filterSidebarItems(sidebarItems)
          },
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
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Cord.js',
        logo: {
          alt: 'Cord.js Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'quickstart',
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
                label: 'Quickstart',
                to: '/docs/quickstart',
              },
              {
                label: 'API Reference',
                to: '/docs/api/index',
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
