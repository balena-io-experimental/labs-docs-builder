// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// Required imports for handling variables
const fs = require("fs");
const yaml = require("js-yaml");

// Docusaurus themes
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const lightCodeTheme = require("prism-react-renderer/themes/github");

// Configure required variables
const baseUrl = process.env.REPO_NAME ? `/${process.env.REPO_NAME}/` : "/";
const branch = process.env.GITHUB_BASE_REF || "main";
let favicon = "favicon.ico";
const githubRepoOwner = process.env.GITHUB_REPOSITORY_OWNER;
let logo = "primary-header-logo.png";
const path = process.env.DOCS_PATH || "docs";
const repoName = process.env.REPO_NAME;
const ymlConfig = yaml.load(
  fs.readFileSync(path + "/docusaurus-config.yml", "utf8")
);

// Configure URLs
const editUrl = `https://github.com/${githubRepoOwner}/${repoName}/edit/${branch}`;
const siteUrl = `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io`;

// If files are missing, replace with defaults
if (!fs.existsSync("static/" + favicon)) {
  favicon =
    "https://github.com/balena-labs-projects/.github/raw/main/favicon.ico";
}

if (!fs.existsSync("static/" + logo)) {
  logo =
    "https://github.com/balena-labs-projects/.github/raw/main/labs-logo.png";
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: ymlConfig.project.name,
  url: siteUrl,
  baseUrl: baseUrl,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: favicon,

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
          src: logo,
        },
        hideOnScroll: true,
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Balena",
            items: [
              {
                label: "What is Balena?",
                href: "https://www.balena.io/what-is-balena",
              },
              {
                label: "Pricing",
                href: "https://www.balena.io/pricing",
              },
            ],
          },
          {
            title: "Products",
            items: [
              {
                label: "Balena Labs",
                href: "https://github.com/balena-labs-projects",
              },
              {
                label: "Balena Cloud",
                href: "https://www.balena.io/cloud",
              },
              {
                label: "Balena Etcher",
                href: "https://www.balena.io/etcher",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Balena Docs",
                href: "https://www.balena.io/docs",
              },
              {
                label: "Blog",
                href: "https://www.balena.io/blog",
              },
              {
                label: "Forums",
                href: "https://forums.balena.io",
              },
            ],
          },
        ],
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
