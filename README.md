# Dancing with CRM

Source of [dancingwithcrm.com](https://www.dancingwithcrm.com), Oleksandr Olashyn's blog about
Power Pages and the Power Platform.

Built with [Astro](https://astro.build) (static output), MDX, SCSS and TypeScript, with
[Pagefind](https://pagefind.app) for search. Deployed to GitHub Pages by GitHub Actions on every
push to `master`.

## Getting started

Requires [Bun](https://bun.sh) and Node.js 22.12 or newer.

```bash
bun install
bun run dev        # local dev server at http://localhost:4321
```

| Command | What it does |
|---|---|
| `bun run dev` | Start the dev server (search isn't available in dev) |
| `bun run check` | Type-check Astro and TypeScript files |
| `bun run build` | Production build to `dist/`, including the search index |
| `bun run preview` | Build, then serve `dist/` locally |
| `bun run clean-vite` | Clear Vite's cache, if a build fails with `EBUSY` on Windows |

## Writing a post

Posts are `.mdx` files in `src/content/posts/`, named `YYYY-MM-DD-slug.mdx`. The URL is the slug
without the date: `/slug/`.

```yaml
---
title: My new post
date: "2026-10-20 09:00:00 -0400"
description: Summary for search engines, social previews, RSS and the newsletter.
cardDescription: Optional shorter text for the post card on the home page.
img: ../../assets/covers/2026-10-20-cover.jpg
image: /assets/img/2026-10-20-cover-rss.jpg
tags: ['PowerPages']
---
```

- `img` is the cover shown on the site. Put the file in `src/assets/covers/`; Astro optimizes it.
- `image` is the RSS / newsletter / social preview image. Put it in `public/assets/img/` so its
  URL never changes.
- Don't change `date` on a published post: the RSS feed's publish date drives the Mailchimp
  newsletter, and a new date can send the post to subscribers again.
- The frontmatter is validated by the schema in `src/content.config.ts`; the build fails with a
  clear message if a field is missing or wrong.

Callouts, videos and YouTube embeds are MDX components in `src/components/mdx/`.

## Project layout

```
src/
  assets/covers/   Post covers (optimized by Astro)
  components/      UI components (mdx/ holds components used inside posts)
  content/posts/   Blog posts
  data/feeds.ts    RSS feed (also used by the Mailchimp newsletter)
  layouts/         Page layouts
  pages/           Routes
  styles/          SCSS (theme colors in partials/_theme.scss)
  config.ts        Site-wide settings
  utils.ts         Shared helpers
public/            Files served as-is (RSS images, videos, icons)
```

See [AGENTS.md](AGENTS.md) for code conventions and more detail.
