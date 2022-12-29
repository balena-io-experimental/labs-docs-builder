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
const defaultBranch = process.env.DEFAULT_BRANCH;

const docsPath = process.env.DOCS_PATH || "docs";
const githubRepoOwner = process.env.GITHUB_REPOSITORY_OWNER;
const repoName = process.env.REPO_NAME;
const ymlConfig = yaml.load(
  fs.readFileSync(`${docsPath}/docusaurus-config.yml`, "utf8")
);

// Check if balena.yml exists, and read the yml file
let balenaYml;
try {
  balenaYml = yaml.load(fs.readFileSync(`${docsPath}/../balena.yml`, "utf8"));
} catch (err) {
  console.log("balena.yml file not found. Continuing without.");
}

// Configure URLs
const editUrl = `https://github.com/${githubRepoOwner}/${repoName}/edit/${defaultBranch}/`;
const siteUrl = `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io`;

// If theme files are missing, replace with defaults
let favicon;
let logo;
let logoPath;

const defaultIco = "favicon.ico";
if (fs.existsSync("static/" + defaultIco)) {
  favicon = defaultIco;
} else if (
  githubRepoOwner == "balena-labs-projects" ||
  githubRepoOwner == "balena-labs-research"
) {
  favicon =
    "https://github.com/balena-labs-projects/.github/raw/main/favicon.ico";
}

const defaultHeader = "primary-header-logo.png";
if (fs.existsSync("static/" + defaultHeader)) {
  logoPath = defaultHeader;
} else if (balenaYml?.assets?.logo?.data?.url) {
  logoPath = balenaYml.assets.logo.data.url;
} else if (
  githubRepoOwner == "balena-labs-projects" ||
  githubRepoOwner == "balena-labs-research"
) {
  logoPath =
    "https://github.com/balena-labs-projects/.github/raw/main/labs-logo.png";
}

if (logoPath) {
  logo = {
    alt: ymlConfig.project.name,
    src: logoPath,
  };
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
          path: docsPath,
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
        logo,
        hideOnScroll: true,
      },
      footer: {
        copyright: ymlConfig.project.name,
        style: "dark",
        links: [],
      },
      metadata: [{ name: "keywords", content: ymlConfig.project.name }],
      // This would become <meta name="keywords" content="cooking, blog"> in the generated HTML
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
