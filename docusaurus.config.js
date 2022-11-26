// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const yaml = require("js-yaml");
const fs = require("fs");

const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const lightCodeTheme = require("prism-react-renderer/themes/github");

// Import external variables
const baseUrl = `/${process.env.REPO_NAME}/`;
const branch = process.env.GITHUB_BASE_REF || "main";
const githubRepoOwner = process.env.GITHUB_REPOSITORY_OWNER;
const path = process.env.DOCS_PATH || "docs";
const repoName = process.env.REPO_NAME;

const editUrl = `https://github.com/${githubRepoOwner}/${repoName}/edit/${branch}`;
const siteUrl = `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io`;
const ymlConfig = yaml.load(
  fs.readFileSync(path + "/docusaurus-config.yml", "utf8")
);

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: ymlConfig.project.name,
  url: siteUrl,
  baseUrl: baseUrl,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: githubRepoOwner, // Usually your GitHub org/user name.
  projectName: repoName, // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  // Third party local search plugin.
  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexBlog: false,
      },
    ],
  ],

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/", // Serve the docs at the site's root
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: editUrl,
          breadcrumbs: false,
          path: path,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: ymlConfig.project.name,
        logo: {
          alt: ymlConfig.project.name,
          src: "img/primary-header-logo.png",
        },
        hideOnScroll: true,
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Forums - update link",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
              },
              {
                label: "Blog - update link",
                href: "https://discordapp.com/invite/docusaurus",
              },
            ],
          },
        ],
        copyright: `MIT License applied to all content (${new Date().getFullYear()})`,
      },
      metadata: [{ name: "keywords", content: "balena, balenaLabs" }],
      // This would become <meta name="keywords" content="cooking, blog"> in the generated HTML
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
