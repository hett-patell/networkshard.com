# networkshard.com

Personal site and blog of Het Patel — cybersecurity engineer focused on penetration testing, VAPT, and security research.

Live at [networkshard.com](https://networkshard.com).

## Stack

- [Astro 4](https://astro.build/) static site generator
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Satori](https://github.com/vercel/satori) + [sharp](https://sharp.pixelplumbing.com/) for OG image generation
- [giscus](https://giscus.app/) for post comments (GitHub Discussions)
- [GoatCounter](https://www.goatcounter.com/) for cookieless analytics
- Deployed to GitHub Pages via GitHub Actions (see `.github/workflows/deploy.yml`)

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start local dev server at `localhost:4321`  |
| `npm run build`   | Build the production site to `./dist/`      |
| `npm run preview` | Preview the production build locally        |

## Project layout

```
src/
├── content/blog/          Markdown blog posts (schema in content/config.ts)
├── layouts/BaseLayout.astro
├── pages/
│   ├── index.astro        Home (bento grid)
│   ├── about.astro        Bio, Hall of Fame, CVEs, site stats
│   ├── projects.astro     Project list
│   ├── blog/              Blog index, post template, tags, pagination, search
│   ├── categories/        Category archives
│   ├── tags/              Tag archives
│   ├── og/[...slug].png.ts   Per-post Open Graph images
│   └── rss.xml.ts         RSS feed
├── styles/global.css      Theme tokens, bento cards, prose, neo buttons
└── env.d.ts
public/                    Fonts, favicon, photos, CV, CNAME
```

## Writing a post

Drop a Markdown file in `src/content/blog/`. Frontmatter:

```yaml
---
title: "Post title"
description: "Short summary used in meta tags and social cards"
date: 2026-04-20
tags: ["tag-one", "tag-two"]
readTime: "5 min read"        # optional
category: "Web Security"      # optional; falls back to first tag
pinned: false                 # optional; pins to top of blog index
draft: false                  # optional; hides from listings and RSS
---
```

OG images are generated at build time from the title, tags, and date — no manual image work needed.

## Deploying

Every push to `main` triggers a build and deploy to GitHub Pages. The deploy workflow sets `PUBLIC_COMMIT_SHA` so the footer shows the live commit.
