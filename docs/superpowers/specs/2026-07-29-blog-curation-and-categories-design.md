# Blog Curation and Categories Design

Date: 2026-07-29
Status: Approved design, pending implementation plan

## Purpose

Turn `/blog` from a broad imported tutorial archive into a small, evidence-led portfolio of original research, tooling, and operations writing. Retain promising firsthand case studies as unpublished drafts for later revision, retire weak or outdated material, and introduce a stable editorial category system.

## Editorial outcome

### Published posts

Five posts remain published.

#### Research & Findings (`research`)

1. `shardlure-the-dashboard-was-lying.md`

#### Guides & Fundamentals (`guides`)

1. `deploy-your-own-ssh-honeypot.md`

#### Threat Intelligence & Operations (`threat-intel`)

1. `ssh-brute-force-telemetry.md`
2. `ssh-honeypot-48-hours.md`
3. `shardlure-five-days.md`

Each section is sorted newest-first at render time.

### Rewrite queue

Keep these files in `src/content/blog/`, add `draft: true`, and assign category `research`:

1. `business-logic-broken.md`
2. `from-dorks-to-defense.md`
3. `why-idors-are-everywhere.md`
4. `xss-meets-idor.md`

Drafts must not appear in generated blog routes, the `/blog` panel, search JSON, RSS, sitemap, categories, tags, related posts, post navigation, or OG image routes. Their source remains available locally for later rewriting.

### Retired posts

Delete these source files. Git history remains the recovery mechanism.

1. `flashcrawler-v2.md`
2. `google-dorks-guide.md`
3. `html-injection-chatbot.md`
4. `mastering-nmap.md`
5. `nosql-injection.md`
6. `rate-limiting-guide.md`
7. `reverse-dns-guide.md`
8. `shellshock-bash-bug.md`
9. `sqlmap-ultimate-guide.md`
10. `ssrf-server-side-request-forgery.md`
11. `subdomain-takeover.md`
12. `sweet-security-disaster.md`
13. `from-shodan-to-sqli.md`

## Taxonomy

### Canonical categories

The only valid category IDs are:

| ID | Display label | Purpose |
|---|---|---|
| `research` | Research & Findings | Firsthand findings, case studies, validation, and engineering retrospectives |
| `guides` | Guides & Fundamentals | First-party operational guides and durable technical explanations |
| `threat-intel` | Threat Intelligence & Operations | Honeypots, attacker telemetry, campaigns, malware observation, and defensive operations |

Tags remain the detailed, many-to-many taxonomy. Categories are a required, single-value editorial classification.

### Schema

Change `category` in `src/content.config.ts` from an optional string to a required enum:

```ts
category: z.enum(['research', 'guides', 'threat-intel'])
```

Every retained published or draft post must define exactly one valid category. A missing or unknown category must fail `astro check` and the production build.

### Shared taxonomy module

Create `src/lib/taxonomy.ts` as the single source of truth for:

- category ID type;
- ordered category definitions;
- display labels;
- descriptions;
- category URLs;
- safe label lookup.

The canonical order is `research`, `guides`, `threat-intel`.

No route may infer a category from the first tag. Remove all `post.data.category || post.data.tags?.[0] || 'General'` fallback behavior.

## `/blog` panel

Replace the current year-grouped timeline with category-grouped sections.

Page order:

1. Existing page header and description.
2. Optional pinned feature only when a published post has `pinned: true`.
3. Research & Findings section.
4. Guides & Fundamentals section.
5. Threat Intelligence & Operations section.

Initial state has no published pinned post because `from-dorks-to-defense.md` moves to drafts. The page must not render an empty pinned region.

Each category section contains:

- two-digit section index;
- linked category display label;
- published post count;
- one-sentence category description;
- compact post rows sorted newest-first.

Each row retains:

- publication date;
- title;
- read time;
- arrow/link affordance.

The current editorial rule-based style, responsive behavior, keyboard focus, dark/light themes, and semantic ordered lists remain intact. Do not add client-side filtering.

## Category routes

### `/categories/`

Render exactly the canonical categories that contain published posts, in taxonomy order rather than count order. Initially show counts:

- Research & Findings: 1
- Guides & Fundamentals: 1
- Threat Intelligence & Operations: 3

### `/categories/[category]/`

Generate routes only for used canonical category IDs and show published posts newest-first. Legacy one-post category routes such as `/categories/sqlmap/`, `/categories/idor/`, and `/categories/operations/` are not generated.

Unknown category IDs resolve to the existing 404 behavior.

## Post and feed metadata

Expose the canonical category consistently:

- Post header: linked display label.
- Article JSON-LD: `articleSection` uses the display label.
- Search JSON: include category ID and display label.
- RSS: include the category display label in item categories while preserving tags.
- OG generation: continue generating images only for published posts; category display is optional and should be added only if it fits the existing template without crowding.

Post URLs, tag URLs, and the URLs of the five published articles do not change.

## Draft and retirement behavior

`getPublishedPosts()` remains the central draft filter. Every route and generated artifact must consume published posts through that helper or apply the same explicit draft exclusion where the Astro content API requires all entries for path generation.

Retired and draft posts must be absent from:

- generated HTML routes;
- `/blog`;
- `/categories/` and category detail pages;
- `/blog/tags/` and tag detail pages;
- `/blog/search.json`;
- `/rss.xml`;
- sitemap output;
- related-post suggestions;
- previous/next navigation;
- post OG image routes.

## Counts and invariants

After implementation:

- retained source posts: 9;
- published posts: 5;
- draft posts: 4;
- retired source posts: 13;
- published category counts: `research=1`, `guides=1`, `threat-intel=3`;
- published total across categories: 5;
- no published post belongs to zero or multiple categories.

The About page’s dynamic published-post count must become 5 automatically.

## Validation

1. Run `git diff --check`.
2. Run `npm run check`; expect zero errors, warnings, and hints.
3. Run `npm run build`.
4. Run `npm audit --omit=dev`; expect zero known production vulnerabilities.
5. Confirm only the five published post routes and five post OG routes are generated.
6. Confirm no route exists for any draft or retired slug.
7. Confirm category counts are 1, 1, and 3.
8. Confirm search JSON and RSS contain exactly five posts.
9. Confirm sitemap does not list retired or draft posts.
10. Browser-test `/blog`, `/categories/`, all three category routes, all five published articles, search, RSS retrieval, light/dark themes, and mobile layouts.
11. Confirm the local preview remains available at `http://localhost:4321`.

## Scope boundaries

This work does not rewrite the four draft case studies. It only preserves them for a future editorial pass. It does not redirect retired URLs, because the current site has no redirect layer and static GitHub Pages cannot express server redirects directly. A custom static 404 redirect map may be designed separately if required.

Do not commit or push implementation work unless explicitly requested. The existing design and Astro 7 migration changes remain local.
