# Labs Docs Builder

An experiment using Docusaurus to build docs based on a default template and publish to GitHub Pages.

Add the `docs` folder and the `build.yml` GitHub workflow from this repository to your own project repo to use the builder.

Docs will be built and deployed to a branch called `gh_pages`. From there, the docs can be published to GitHub pages by selecting the `Deploy from a branch` mode in `Settings -> Pages`, choosing the `gh_pages` branch and `/` as the source folder.

## Start Editing

The easiest way to get started editing your docs is to use the local development environment. From within your own project repo where your docs are stored, run:

```
git clone --depth 1 https://github.com/balena-io-experimental/labs-docs-builder.git
npm i --prefix labs-docs-builder
DOCS_PATH="../docs" npm start --prefix labs-docs-builder
```

A browser window will open and display how your docs will look when deployed. Changes made to the files in `docs/` will be seen in realtime.

You can set the name of your project in `docs/docusaurus-config.yml`. This will change the title in the header of the docs.

To change the order of items in the sidebars amend the section at the top of each file to specify where it should be in the list:

```
---
sidebar_position: 1
---
```

Static assets such as images go in `docs/static` and can be referenced as `/your-asset.jpeg` in the docs.

To replace the default header image include your own in `docs/static` called `primary-header-logo.png`.

Enjoy!
