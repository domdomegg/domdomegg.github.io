# adamjones.me

> Info: this repository must be named `domdomegg.github.io` for project site redirects to work i.e. `adamjones.me/<repo name>`. For more info see the documentation on [project sites](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#types-of-github-pages-sites) and [how they work with custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages#supported-custom-domains).

This repository builds the static Next.js site available at [adamjones.me](https://adamjones.me).

The site is hosted with GitHub Pages. Some paths serve GitHub repositories, e.g. `adamjones.me/<repo name>`.

The domain is held in [Google Domains](https://domains.google.com/).

On 2023-03-07 this repository was made open-source. As I wasn't certain that there was nothing sensitive in the repo, I broke the Git history here. The old history is available in [domdomegg/domdomegg.github.io-archive](https://github.com/domdomegg/domdomegg.github.io-archive).

## Blog posts

Blog posts live in `pages/blog/*.mdx`, with images under `public/images/blog/<slug>/`.

- **`highvol` posts:** frontmatter `highvol: true` marks a post as published but not broadcast — it's excluded from the RSS feed, but still listed and indexable. [More on why](https://adamjones.me/blog/highvol-posts/).
- **[draft] prefix:** A `[draft]` filename prefix keeps a post out of the listing/RSS entirely (though it's still reachable at its URL in the static build).
- **Images:** before committing, **strip EXIF metadata** (especially GPS location) and **downscale to a reasonable web size** (~1400px wide, a few hundred KB). For example: `magick photo.jpg -resize 1400x -strip -quality 82 public/images/blog/<slug>/name.jpg`.

## Local development

`npm run start` runs the dev server; `npm run build` produces the static export in `dist/`.

Don't `build` while the dev server is running — they share the `dist/` output and Turbopack cache, and building corrupts the dev server's compiled CSS (a `Parsing CSS source code failed` 500). If that happens, stop the dev server, `rm -rf dist .next node_modules/.cache`, and restart.
