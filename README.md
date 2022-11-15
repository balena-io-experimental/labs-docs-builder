# Labs Docs Builder

An experiment using Docusaurus to build docs based on a default template and publish to GitHub Pages.

Add the `docs` folder and the `build.yml` GitHub workflow from this repository to your own repo to use the builder.

Docs will be built on your own repo on the `gh_pages` branch, and can be published to GitHub pages by setting the branch deploy in Settings -> Pages on your GitHub repo.

In your repo, set the name of the project in `docs/docusaurus-config.yml` and then edit your documentation as usual through the `docs` folder.

Static assets go in your own repo in `docs/static`

To replace the default header image include your own in `docs/static` called `primary-header-logo.png`.
