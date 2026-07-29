# Blog Curation and Categories Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Curate the blog to five published posts and four hidden rewrite drafts, then expose those published posts through one stable, three-category editorial taxonomy across pages and generated metadata.

**Architecture:** Keep `getPublishedPosts()` as the publication boundary, and add `src/lib/taxonomy.ts` as the only source of category IDs, order, labels, descriptions, URLs, and safe lookup behavior. Content schema validation makes a canonical category mandatory; category-aware pages and artifacts consume the typed taxonomy rather than deriving categories from tags. Static path generation continues to start from published posts, so drafts and retired content cannot leak into article, tag, category, sitemap, related/navigation, or OG outputs.

**Tech Stack:** Astro 7.1.5 static output, Astro Content Collections with `astro:content`/`astro/zod`, TypeScript 6.0.3, Tailwind CSS 4.3.3, Node.js >=22.12.0, `@astrojs/rss`, and `@astrojs/sitemap`.

## Global Constraints

- Do not commit or push implementation work; every task ends with an explicit scoped diff review instead of a commit.
- Preserve the existing local Astro 7 migration and design changes; do not reset, overwrite, stage, or otherwise disturb unrelated working-tree changes.
- The only valid category IDs are exactly `research`, `guides`, and `threat-intel`, in that canonical order.
- Categories are required and single-valued; tags remain optional and many-to-many.
- Keep exactly 9 source posts: 5 published and 4 drafts; delete exactly the 13 retired source files named in Task 2.
- Do not rewrite draft article bodies, change any retained post URL or tag URL, add redirects, add client-side category filtering, or add dependencies/test frameworks.
- Continue using `getPublishedPosts(): Promise<Post[]>` as the central newest-first publication filter.
- Drafts and retired posts must be absent from article routes, `/blog`, categories, tags, search JSON, RSS, sitemap, related posts, previous/next navigation, and post OG image routes.
- Preserve the current editorial rule-based styling, semantic ordered lists, responsive behavior, keyboard focus treatment, and light/dark themes.
- OG category display is optional and is deliberately omitted from this implementation to avoid crowding the existing template; published-only OG generation remains mandatory.
- Keep local preview available at `http://localhost:4321` during browser validation.

---

## File Structure

- Create `src/lib/taxonomy.ts`: canonical category tuple, types, ordered definitions, URLs, type guard, and safe lookup helpers.
- Modify `src/content.config.ts`: require one canonical category on every blog entry.
- Modify 9 retained files under `src/content/blog/`: assign canonical categories; set `draft: true` on the four rewrite-queue posts only.
- Delete 13 retired files under `src/content/blog/`: remove weak/outdated posts from the content source entirely.
- Modify `src/pages/blog/index.astro`: replace year grouping with ordered category sections while preserving optional pinned treatment and compact post rows.
- Modify `src/pages/categories/index.astro`: list only used canonical categories in taxonomy order with canonical labels, URLs, and counts.
- Modify `src/pages/categories/[category].astro`: generate only used canonical category IDs and render their published posts newest-first.
- Modify `src/pages/blog/[...slug].astro`: link the canonical category in the article header and emit its label as JSON-LD `articleSection`.
- Modify `src/pages/blog/search.json.ts`: add the category ID and display label to each of exactly five search records.
- Modify `src/pages/rss.xml.ts`: prepend the category display label to RSS item categories while preserving tags.
- Do not modify `src/lib/posts.ts`, tag pages, navigation/related components, About, sitemap configuration, or OG generation: they already consume `getPublishedPosts()` and must be verified rather than duplicated.

---

### Task 1: Add the Typed Canonical Taxonomy and Required Schema

**Files:**
- Create: `src/lib/taxonomy.ts`
- Modify: `src/content.config.ts:1-18`

**Interfaces:**
- Consumes: Astro's `z.enum()` content schema and the existing `Post = CollectionEntry<'blog'>` inference.
- Produces: `CATEGORY_IDS`, `CategoryId`, `CategoryDefinition`, `CATEGORIES`, `isCategoryId(value: string | undefined): value is CategoryId`, `getCategory(value: string | undefined): CategoryDefinition | undefined`, and `getCategoryLabel(value: string | undefined): string`.
- Produces schema field: `category: z.enum(CATEGORY_IDS)`, inferred as `Post['data']['category'] = 'research' | 'guides' | 'threat-intel'` and no longer optional.

- [ ] **Step 1: Record the pre-change schema failure condition with a content assertion**

Run:

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const source = fs.readFileSync('src/content.config.ts', 'utf8');
if (/category:\s*z\.enum\(CATEGORY_IDS\)/.test(source)) throw new Error('expected required taxonomy schema to be absent before implementation');
if (!/category:\s*z\.string\(\)\.optional\(\)/.test(source)) throw new Error('unexpected baseline category schema');
console.log('BASELINE: category is still an optional free-form string');
NODE
```

Expected: prints `BASELINE: category is still an optional free-form string`.

- [ ] **Step 2: Create the canonical taxonomy module**

Create `src/lib/taxonomy.ts` with exactly this public contract and copy:

```ts
export const CATEGORY_IDS = ['research', 'guides', 'threat-intel'] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export interface CategoryDefinition {
  id: CategoryId;
  label: string;
  description: string;
  href: `/categories/${CategoryId}/`;
}

export const CATEGORIES: readonly CategoryDefinition[] = [
  {
    id: 'research',
    label: 'Research & Findings',
    description: 'Firsthand findings, case studies, validation, and engineering retrospectives.',
    href: '/categories/research/',
  },
  {
    id: 'guides',
    label: 'Guides & Fundamentals',
    description: 'First-party operational guides and durable technical explanations.',
    href: '/categories/guides/',
  },
  {
    id: 'threat-intel',
    label: 'Threat Intelligence & Operations',
    description: 'Honeypots, attacker telemetry, campaigns, malware observation, and defensive operations.',
    href: '/categories/threat-intel/',
  },
];

export function isCategoryId(value: string | undefined): value is CategoryId {
  return CATEGORY_IDS.some((id) => id === value);
}

export function getCategory(value: string | undefined): CategoryDefinition | undefined {
  return isCategoryId(value) ? CATEGORIES.find((category) => category.id === value) : undefined;
}

export function getCategoryLabel(value: string | undefined): string {
  return getCategory(value)?.label ?? 'Uncategorized';
}
```

The descriptions are one sentence each, and the final punctuation is intentional for direct rendering on `/blog`.

- [ ] **Step 3: Make category required and enum-backed in the content schema**

In `src/content.config.ts`, import `CATEGORY_IDS` and replace the optional free-form field:

```ts
import { CATEGORY_IDS } from './lib/taxonomy';
```

```ts
category: z.enum(CATEGORY_IDS),
```

Do not alter `draft`, `pinned`, tags, dates, or other schema fields.

- [ ] **Step 4: Verify taxonomy order, lookups, and schema wiring using source assertions**

Run:

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const taxonomy = fs.readFileSync('src/lib/taxonomy.ts', 'utf8');
const schema = fs.readFileSync('src/content.config.ts', 'utf8');
const ids = [...taxonomy.matchAll(/^\s+id: '([^']+)',$/gm)].map((match) => match[1]);
const labels = [...taxonomy.matchAll(/^\s+label: '([^']+)',$/gm)].map((match) => match[1]);
const hrefs = [...taxonomy.matchAll(/^\s+href: '([^']+)',$/gm)].map((match) => match[1]);
if (JSON.stringify(ids) !== JSON.stringify(['research', 'guides', 'threat-intel'])) throw new Error(`bad category order: ${ids}`);
if (JSON.stringify(labels) !== JSON.stringify(['Research & Findings', 'Guides & Fundamentals', 'Threat Intelligence & Operations'])) throw new Error(`bad labels: ${labels}`);
if (JSON.stringify(hrefs) !== JSON.stringify(['/categories/research/', '/categories/guides/', '/categories/threat-intel/'])) throw new Error(`bad hrefs: ${hrefs}`);
if (!/category:\s*z\.enum\(CATEGORY_IDS\)/.test(schema)) throw new Error('schema does not use CATEGORY_IDS');
if (/category:\s*z\.string\(\)\.optional\(\)/.test(schema)) throw new Error('optional free-form category remains');
for (const symbol of ['CategoryId', 'CategoryDefinition', 'CATEGORIES', 'isCategoryId', 'getCategory', 'getCategoryLabel']) {
  if (!taxonomy.includes(symbol)) throw new Error(`missing taxonomy symbol: ${symbol}`);
}
console.log('PASS: canonical taxonomy and required schema are wired');
NODE
```

Expected: prints `PASS: canonical taxonomy and required schema are wired`.

- [ ] **Step 5: Do not commit; review only this task's diff**

Run:

```bash
cd /home/het/Personal/networkshard.com
git diff -- src/content.config.ts
git diff --no-index -- /dev/null src/lib/taxonomy.ts || test $? -eq 1
git diff --check -- src/content.config.ts
```

Expected: the tracked diff shows only the schema change; the no-index diff shows the complete new taxonomy module and returns the expected diff status without failing the shell; `git diff --check` exits 0. Do not run `git add`, `git commit`, or `git push`.

---

### Task 2: Curate Retained, Draft, and Retired Content

**Files:**
- Modify: `src/content/blog/shardlure-the-dashboard-was-lying.md:1-8`
- Modify: `src/content/blog/deploy-your-own-ssh-honeypot.md:1-7`
- Modify: `src/content/blog/ssh-brute-force-telemetry.md:1-8`
- Modify: `src/content/blog/ssh-honeypot-48-hours.md:1-8`
- Modify: `src/content/blog/shardlure-five-days.md:1-8`
- Modify: `src/content/blog/business-logic-broken.md:1-7`
- Modify: `src/content/blog/from-dorks-to-defense.md:1-8`
- Modify: `src/content/blog/why-idors-are-everywhere.md:1-7`
- Modify: `src/content/blog/xss-meets-idor.md:1-7`
- Delete: `src/content/blog/flashcrawler-v2.md`
- Delete: `src/content/blog/google-dorks-guide.md`
- Delete: `src/content/blog/html-injection-chatbot.md`
- Delete: `src/content/blog/mastering-nmap.md`
- Delete: `src/content/blog/nosql-injection.md`
- Delete: `src/content/blog/rate-limiting-guide.md`
- Delete: `src/content/blog/reverse-dns-guide.md`
- Delete: `src/content/blog/shellshock-bash-bug.md`
- Delete: `src/content/blog/sqlmap-ultimate-guide.md`
- Delete: `src/content/blog/ssrf-server-side-request-forgery.md`
- Delete: `src/content/blog/subdomain-takeover.md`
- Delete: `src/content/blog/sweet-security-disaster.md`
- Delete: `src/content/blog/from-shodan-to-sqli.md`

**Interfaces:**
- Consumes: required `category: CategoryId` content schema and existing optional `draft`/`pinned` flags.
- Produces: 9 schema-valid content entries: 5 with `draft` absent/false and 4 with `draft: true`; published category counts `research=1`, `guides=1`, `threat-intel=3`.

- [ ] **Step 1: Run a baseline inventory that demonstrates curation is not yet applied**

Run:

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const files = fs.readdirSync('src/content/blog').filter((name) => name.endsWith('.md'));
if (files.length !== 22) throw new Error(`expected 22 baseline source posts, found ${files.length}`);
const draftCount = files.filter((name) => /^draft:\s*true\s*$/m.test(fs.readFileSync(`src/content/blog/${name}`, 'utf8'))).length;
if (draftCount !== 0) throw new Error(`expected 0 baseline drafts, found ${draftCount}`);
console.log('BASELINE: 22 source posts and 0 drafts');
NODE
```

Expected: prints `BASELINE: 22 source posts and 0 drafts`.

- [ ] **Step 2: Assign the exact canonical categories to the five published posts**

Set these frontmatter values without changing titles, dates, tags, read times, or article bodies:

```text
shardlure-the-dashboard-was-lying.md -> category: "research"
deploy-your-own-ssh-honeypot.md     -> category: "guides"
ssh-brute-force-telemetry.md         -> category: "threat-intel"
ssh-honeypot-48-hours.md             -> category: "threat-intel"
shardlure-five-days.md               -> category: "threat-intel"
```

Replace the existing `category: "operations"` where present; insert the missing category immediately after `date` in `deploy-your-own-ssh-honeypot.md`.

- [ ] **Step 3: Mark the four rewrite-queue posts as research drafts**

For each of the following files, insert these two fields immediately after `date` while leaving the body and all existing fields intact:

```yaml
category: "research"
draft: true
```

Apply to:

```text
business-logic-broken.md
from-dorks-to-defense.md
why-idors-are-everywhere.md
xss-meets-idor.md
```

Leave `pinned: true` in `from-dorks-to-defense.md`; publication filtering makes it ineligible for the pinned feature while preserving the local editorial state.

- [ ] **Step 4: Delete exactly the 13 retired source files**

Run:

```bash
cd /home/het/Personal/networkshard.com
rm \
  src/content/blog/flashcrawler-v2.md \
  src/content/blog/google-dorks-guide.md \
  src/content/blog/html-injection-chatbot.md \
  src/content/blog/mastering-nmap.md \
  src/content/blog/nosql-injection.md \
  src/content/blog/rate-limiting-guide.md \
  src/content/blog/reverse-dns-guide.md \
  src/content/blog/shellshock-bash-bug.md \
  src/content/blog/sqlmap-ultimate-guide.md \
  src/content/blog/ssrf-server-side-request-forgery.md \
  src/content/blog/subdomain-takeover.md \
  src/content/blog/sweet-security-disaster.md \
  src/content/blog/from-shodan-to-sqli.md
```

Expected: all 13 files are removed; their recovery mechanism is existing Git history, not backup files or redirects.

- [ ] **Step 5: Assert exact source inventory, publication state, and category counts**

Run:

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const expectedPublished = new Map([
  ['deploy-your-own-ssh-honeypot.md', 'guides'],
  ['shardlure-five-days.md', 'threat-intel'],
  ['shardlure-the-dashboard-was-lying.md', 'research'],
  ['ssh-brute-force-telemetry.md', 'threat-intel'],
  ['ssh-honeypot-48-hours.md', 'threat-intel'],
]);
const expectedDrafts = new Map([
  ['business-logic-broken.md', 'research'],
  ['from-dorks-to-defense.md', 'research'],
  ['why-idors-are-everywhere.md', 'research'],
  ['xss-meets-idor.md', 'research'],
]);
const retired = [
  'flashcrawler-v2.md', 'google-dorks-guide.md', 'html-injection-chatbot.md', 'mastering-nmap.md',
  'nosql-injection.md', 'rate-limiting-guide.md', 'reverse-dns-guide.md', 'shellshock-bash-bug.md',
  'sqlmap-ultimate-guide.md', 'ssrf-server-side-request-forgery.md', 'subdomain-takeover.md',
  'sweet-security-disaster.md', 'from-shodan-to-sqli.md',
];
const dir = 'src/content/blog';
const files = fs.readdirSync(dir).filter((name) => name.endsWith('.md')).sort();
const expectedFiles = [...expectedPublished.keys(), ...expectedDrafts.keys()].sort();
if (JSON.stringify(files) !== JSON.stringify(expectedFiles)) throw new Error(`unexpected retained inventory: ${files}`);
const counts = { research: 0, guides: 0, 'threat-intel': 0 };
let drafts = 0;
for (const name of files) {
  const source = fs.readFileSync(`${dir}/${name}`, 'utf8');
  const category = source.match(/^category:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1];
  const isDraft = /^draft:\s*true\s*$/m.test(source);
  const expectedCategory = expectedPublished.get(name) ?? expectedDrafts.get(name);
  if (category !== expectedCategory) throw new Error(`${name}: category ${category}, expected ${expectedCategory}`);
  if (isDraft !== expectedDrafts.has(name)) throw new Error(`${name}: incorrect draft state`);
  if (isDraft) drafts += 1;
  else counts[category] += 1;
}
for (const name of retired) if (fs.existsSync(`${dir}/${name}`)) throw new Error(`retired file remains: ${name}`);
if (files.length !== 9 || drafts !== 4) throw new Error(`expected 9 retained/4 drafts; got ${files.length}/${drafts}`);
if (JSON.stringify(counts) !== JSON.stringify({ research: 1, guides: 1, 'threat-intel': 3 })) throw new Error(`bad published counts: ${JSON.stringify(counts)}`);
console.log('PASS: 9 retained, 5 published, 4 drafts, 13 retired; counts 1/1/3');
NODE
```

Expected: prints `PASS: 9 retained, 5 published, 4 drafts, 13 retired; counts 1/1/3`.

- [ ] **Step 6: Run Astro schema/type validation**

Run:

```bash
cd /home/het/Personal/networkshard.com
npm run check
```

Expected: Astro reports `0 errors`, `0 warnings`, and `0 hints`. Any missing or unknown retained category must fail here and be corrected in frontmatter, never hidden by relaxing the schema.

- [ ] **Step 7: Do not commit; review only the content curation diff**

Run:

```bash
cd /home/het/Personal/networkshard.com
git diff --stat -- src/content/blog
git diff --check -- src/content/blog
git diff -- src/content/blog/business-logic-broken.md src/content/blog/from-dorks-to-defense.md src/content/blog/why-idors-are-everywhere.md src/content/blog/xss-meets-idor.md
git diff -- src/content/blog/deploy-your-own-ssh-honeypot.md src/content/blog/shardlure-five-days.md src/content/blog/shardlure-the-dashboard-was-lying.md src/content/blog/ssh-brute-force-telemetry.md src/content/blog/ssh-honeypot-48-hours.md
```

Expected: stat shows 13 deletions and 9 frontmatter-only modifications; draft bodies have no edits; `git diff --check` exits 0. Do not stage or commit.

---

### Task 3: Replace the Blog Timeline with Canonical Category Sections

**Files:**
- Modify: `src/pages/blog/index.astro:1-48`

**Interfaces:**
- Consumes: `getPublishedPosts(): Promise<Post[]>`, `CATEGORIES: readonly CategoryDefinition[]`, `Post['data']['category']: CategoryId`, existing `PostList` props `{ posts: Post[]; variant?: 'compact' | 'detailed'; groupByYear?: boolean }`, and `getPostSlug()` for the optional pinned feature.
- Produces: ordered category view models `{ category: CategoryDefinition; posts: Post[]; publishedCount: number }[]`; no new exported interface.

- [ ] **Step 1: Assert the old year-grouped call is still present before replacement**

Run:

```bash
cd /home/het/Personal/networkshard.com
rg -n 'groupByYear|Blog Posts by Year' src/pages/blog/index.astro
```

Expected: finds the year-group comment and/or `groupByYear` prop in `src/pages/blog/index.astro`.

- [ ] **Step 2: Build ordered category groups from published posts**

Import `CATEGORIES`, retain the current `pinned` lookup, and replace `regularPosts`-only timeline preparation with:

```ts
const pinned = posts.find((post) => post.data.pinned);
const regularPosts = posts.filter((post) => post.id !== pinned?.id);
const categorySections = CATEGORIES.map((category) => ({
  category,
  posts: regularPosts.filter((post) => post.data.category === category.id),
  publishedCount: posts.filter((post) => post.data.category === category.id).length,
})).filter(({ publishedCount }) => publishedCount > 0);
```

`publishedCount` includes a future pinned article in its canonical category, while `posts` avoids rendering that article twice. In the approved initial state, `pinned` is undefined because the only `pinned: true` source is a draft.

- [ ] **Step 3: Render category sections in canonical order**

Keep the existing page header and conditional pinned block. Replace the `Blog Posts by Year` section with a single archive section containing `categorySections.map(...)`. For each category section, render:

- a two-digit index via `String(index + 1).padStart(2, '0')`;
- an `<h2>` containing `<a href={category.href}>{category.label}</a>`;
- `{publishedCount} post/posts` with correct singular/plural;
- `<p>{category.description}</p>`;
- `<PostList posts={categoryPosts} variant="compact" />` when `categoryPosts.length > 0`.

Use a semantic outer `<section aria-label="Articles by category">`; each child `<section aria-labelledby={`category-${category.id}`}>` must have the matching heading ID. Use existing border, typography, hover, `focus-visible`, and responsive Tailwind utilities; do not add a script, filter controls, or `groupByYear`.

- [ ] **Step 4: Preserve the empty-state and conditional pinned behavior**

Keep `{pinned && (...)}` as the only pinned-region guard and `{posts.length === 0 && (...)}` as the empty-state guard. Verify no static `Pinned` wrapper exists outside the condition and no category fallback reads tags.

- [ ] **Step 5: Run page-structure assertions and Astro check**

Run:

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const source = fs.readFileSync('src/pages/blog/index.astro', 'utf8');
for (const required of ['CATEGORIES', 'categorySections', 'publishedCount', 'category.description', 'category.href', "padStart(2, '0')", 'aria-labelledby']) {
  if (!source.includes(required)) throw new Error(`blog index missing ${required}`);
}
for (const forbidden of ['groupByYear', 'Blog Posts by Year', "data.tags?.[0]", "|| 'General'"]) {
  if (source.includes(forbidden)) throw new Error(`blog index retains forbidden fallback/grouping: ${forbidden}`);
}
if (!/\{pinned\s*&&\s*\(/.test(source)) throw new Error('pinned region is not conditional');
console.log('PASS: blog uses ordered taxonomy sections and conditional pinning');
NODE
npm run check
```

Expected: assertion prints `PASS: blog uses ordered taxonomy sections and conditional pinning`; Astro reports zero errors, warnings, and hints.

- [ ] **Step 6: Do not commit; review the blog page diff**

Run:

```bash
cd /home/het/Personal/networkshard.com
git diff -- src/pages/blog/index.astro
git diff --check -- src/pages/blog/index.astro
```

Expected: only category grouping replaces year grouping; the header, optional pin, empty state, and compact `PostList` rows remain. Do not stage or commit.

---

### Task 4: Rebuild Category Index and Detail Routes from the Taxonomy

**Files:**
- Modify: `src/pages/categories/index.astro:1-46`
- Modify: `src/pages/categories/[category].astro:1-34`

**Interfaces:**
- Consumes: `CATEGORIES`, `CategoryDefinition`, `getCategory()`, `getPublishedPosts()`, required `post.data.category`, and `PostList` detailed variant.
- Produces index entries `{ category: CategoryDefinition; count: number }[]` in canonical order and static paths `{ params: { category: CategoryId }; props: { category: CategoryDefinition } }[]` only for used categories.

- [ ] **Step 1: Demonstrate that legacy tag-derived category fallback still exists**

Run:

```bash
cd /home/het/Personal/networkshard.com
rg -n "tags\?\.\[0\]|slugify|General|sort\(\(a, b\) => b\.count" src/pages/categories
```

Expected: finds tag fallback/slugification and count sorting in the existing category routes.

- [ ] **Step 2: Build `/categories/` entries in canonical order**

In `src/pages/categories/index.astro`, remove `slugify`, `categoryMap`, and count-based sorting. Import `CATEGORIES` and derive:

```ts
const categories = CATEGORIES.map((category) => ({
  category,
  count: posts.filter((post) => post.data.category === category.id).length,
})).filter(({ count }) => count > 0);
```

Update the template to use `category.href`, `category.label`, `category.id`, and `count`. Preserve the existing ordered list, two-digit indexes, archive header, responsive grid, and singular/plural count. The initial rendered order and counts must be Research & Findings (1), Guides & Fundamentals (1), Threat Intelligence & Operations (3).

- [ ] **Step 3: Generate only used canonical detail paths**

In `src/pages/categories/[category].astro`, remove `slugify`, `CatPost`, `categoryOf`, and every tag/`General` fallback. Import `CATEGORIES`, `type CategoryDefinition`, and `getPublishedPosts`. Implement `getStaticPaths()` as:

```ts
export async function getStaticPaths() {
  const posts = await getPublishedPosts();
  return CATEGORIES
    .filter((category) => posts.some((post) => post.data.category === category.id))
    .map((category) => ({
      params: { category: category.id },
      props: { category },
    }));
}
```

This produces exactly `/categories/research/`, `/categories/guides/`, and `/categories/threat-intel/` for the approved initial content and no legacy one-post category paths.

- [ ] **Step 4: Render canonical detail metadata and newest-first posts**

Type and consume route props, then filter the already newest-first helper result:

```ts
const { category } = Astro.props as { category: CategoryDefinition };
const posts = (await getPublishedPosts()).filter(
  (post) => post.data.category === category.id,
);
```

Use `category.label` in the page title, description, and `<h1>`; use `category.id` in the route eyebrow; keep the back link, count, and `<PostList posts={posts} variant="detailed" />`. Do not derive display copy from URL text. Because this is static output and only used IDs are returned by `getStaticPaths`, unknown IDs retain the existing generated-site 404 behavior.

- [ ] **Step 5: Assert category routes have no fallback and preserve canonical order**

Run:

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const index = fs.readFileSync('src/pages/categories/index.astro', 'utf8');
const detail = fs.readFileSync('src/pages/categories/[category].astro', 'utf8');
for (const [name, source] of [['index', index], ['detail', detail]]) {
  for (const forbidden of ['tags?.[0]', "|| 'General'", 'slugify']) {
    if (source.includes(forbidden)) throw new Error(`${name} retains ${forbidden}`);
  }
}
for (const required of ['CATEGORIES.map', 'category.href', 'category.label', 'category.id']) {
  if (!index.includes(required)) throw new Error(`category index missing ${required}`);
}
for (const required of ['CATEGORIES', 'posts.some', 'params: { category: category.id }', 'props: { category }', 'CategoryDefinition']) {
  if (!detail.includes(required)) throw new Error(`category detail missing ${required}`);
}
console.log('PASS: category routes are canonical, ordered, and published-only');
NODE
npm run check
```

Expected: assertion passes; Astro reports zero errors, warnings, and hints.

- [ ] **Step 6: Do not commit; review category route diffs**

Run:

```bash
cd /home/het/Personal/networkshard.com
git diff -- src/pages/categories/index.astro 'src/pages/categories/[category].astro'
git diff --check -- src/pages/categories/index.astro 'src/pages/categories/[category].astro'
```

Expected: no tag-derived category logic or count ordering remains; only used canonical IDs generate routes. Do not stage or commit.

---

### Task 5: Expose Canonical Category Metadata on Articles, Search, and RSS

**Files:**
- Modify: `src/pages/blog/[...slug].astro:1-100`
- Modify: `src/pages/blog/search.json.ts:1-21`
- Modify: `src/pages/rss.xml.ts:1-49`

**Interfaces:**
- Consumes: `getCategory(post.data.category): CategoryDefinition | undefined`, `getCategoryLabel(post.data.category): string`, required category IDs, and published-only post arrays.
- Produces article JSON-LD `articleSection: string`; search record field `category: { id: CategoryId; label: string }`; RSS `categories: string[]` containing the display label followed by existing tags.

- [ ] **Step 1: Assert required metadata is absent before implementation**

Run:

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const article = fs.readFileSync('src/pages/blog/[...slug].astro', 'utf8');
const search = fs.readFileSync('src/pages/blog/search.json.ts', 'utf8');
const rss = fs.readFileSync('src/pages/rss.xml.ts', 'utf8');
if (article.includes('articleSection')) throw new Error('unexpected baseline articleSection');
if (/category:\s*\{/.test(search)) throw new Error('unexpected baseline search category object');
if (rss.includes('getCategoryLabel')) throw new Error('unexpected baseline RSS category label');
console.log('BASELINE: canonical category metadata is not yet exposed');
NODE
```

Expected: prints `BASELINE: canonical category metadata is not yet exposed`.

- [ ] **Step 2: Add linked category and `articleSection` to article pages**

In `src/pages/blog/[...slug].astro`, import `getCategory` and resolve the required post category after props are read:

```ts
const category = getCategory(post.data.category);
if (!category) throw new Error(`Unknown category for ${post.id}: ${post.data.category}`);
```

Add this JSON-LD property beside the other Article fields:

```ts
"articleSection": category.label,
```

In the article header metadata row, add a separator and linked display label:

```astro
<span class="text-muted-foreground/50">&middot;</span>
<a href={category.href} class="transition-colors hover:text-primary">{category.label}</a>
```

Keep publication date, read time, and tags intact. The category link must not reuse `slugify` because its URL comes from the canonical definition.

- [ ] **Step 3: Add category ID and label to every search record**

In `src/pages/blog/search.json.ts`, import `getCategoryLabel` and add:

```ts
category: {
  id: post.data.category,
  label: getCategoryLabel(post.data.category),
},
```

Keep existing fields unchanged. `BaseLayout.astro` need not change: the current client search ignores additional JSON properties safely, while downstream consumers receive both required forms.

- [ ] **Step 4: Add canonical display label to RSS while preserving tags**

In `src/pages/rss.xml.ts`, import `getCategoryLabel` and replace the existing item category assignment with:

```ts
categories: [getCategoryLabel(post.data.category), ...(post.data.tags ?? [])],
```

Do not replace or remove tags; category label appears first and every RSS item remains sourced from `getPublishedPosts()`.

- [ ] **Step 5: Assert exact metadata shapes and publication boundary usage**

Run:

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const article = fs.readFileSync('src/pages/blog/[...slug].astro', 'utf8');
const search = fs.readFileSync('src/pages/blog/search.json.ts', 'utf8');
const rss = fs.readFileSync('src/pages/rss.xml.ts', 'utf8');
for (const required of ['getCategory(post.data.category)', 'articleSection', 'category.label', 'category.href']) {
  if (!article.includes(required)) throw new Error(`article missing ${required}`);
}
for (const required of ['getPublishedPosts', 'category:', 'id: post.data.category', 'label: getCategoryLabel(post.data.category)']) {
  if (!search.includes(required)) throw new Error(`search missing ${required}`);
}
for (const required of ['getPublishedPosts', 'getCategoryLabel(post.data.category)', '...(post.data.tags ?? [])']) {
  if (!rss.includes(required)) throw new Error(`RSS missing ${required}`);
}
console.log('PASS: article, search, and RSS expose canonical category metadata');
NODE
npm run check
```

Expected: assertion passes; Astro reports zero errors, warnings, and hints.

- [ ] **Step 6: Do not commit; review metadata diffs**

Run:

```bash
cd /home/het/Personal/networkshard.com
git diff -- 'src/pages/blog/[...slug].astro' src/pages/blog/search.json.ts src/pages/rss.xml.ts
git diff --check -- 'src/pages/blog/[...slug].astro' src/pages/blog/search.json.ts src/pages/rss.xml.ts
```

Expected: article category is linked and present in JSON-LD; search has `{ id, label }`; RSS preserves tags after the category label. Do not stage or commit.

---

### Task 6: Build and Assert All Generated Content Invariants

**Files:**
- Verify only: `src/lib/posts.ts`
- Verify only: `src/pages/blog/tags/index.astro`
- Verify only: `src/pages/blog/tags/[tag].astro`
- Verify only: `src/pages/og/[...slug].png.ts`
- Verify only: `src/pages/about.astro`
- Verify generated: `dist/`

**Interfaces:**
- Consumes: all earlier tasks, `getPublishedPosts()` publication filter, Astro static build, RSS/search/sitemap output.
- Produces: a static site containing exactly five published article routes, five post OG routes, three category detail routes, five search records, and five RSS items; no source edits in this task.

- [ ] **Step 1: Confirm every relevant source consumer uses the publication helper**

Run:

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const consumers = [
  'src/pages/index.astro',
  'src/pages/about.astro',
  'src/pages/blog/index.astro',
  'src/pages/blog/[...slug].astro',
  'src/pages/blog/search.json.ts',
  'src/pages/blog/tags/index.astro',
  'src/pages/blog/tags/[tag].astro',
  'src/pages/categories/index.astro',
  'src/pages/categories/[category].astro',
  'src/pages/og/[...slug].png.ts',
  'src/pages/rss.xml.ts',
];
for (const file of consumers) {
  const source = fs.readFileSync(file, 'utf8');
  if (!source.includes('getPublishedPosts')) throw new Error(`${file} bypasses getPublishedPosts`);
}
const tree = fs.readdirSync('src/pages', { recursive: true }).filter((name) => /\.(astro|ts)$/.test(String(name)));
for (const name of tree) {
  const file = `src/pages/${name}`;
  const source = fs.readFileSync(file, 'utf8');
  if (/getCollection\(\s*['"]blog['"]/.test(source)) throw new Error(`${file} reads the blog collection directly`);
}
console.log('PASS: all blog consumers use the central publication helper');
NODE
```

Expected: prints `PASS: all blog consumers use the central publication helper`. If it fails, update the offending existing consumer to use `getPublishedPosts()` as part of the earlier task that owns that file; do not introduce a second publication helper.

- [ ] **Step 2: Run whitespace, type/content, production build, and dependency validation**

Run:

```bash
cd /home/het/Personal/networkshard.com
git diff --check
npm run check
npm run build
npm audit --omit=dev
```

Expected: `git diff --check` exits 0; Astro check reports zero errors, warnings, and hints; build exits 0; audit reports zero known production vulnerabilities. Do not change dependency versions to address unrelated audit output without separate approval.

- [ ] **Step 3: Assert generated article, OG, and category route sets exactly**

Run:

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const published = [
  'deploy-your-own-ssh-honeypot',
  'shardlure-five-days',
  'shardlure-the-dashboard-was-lying',
  'ssh-brute-force-telemetry',
  'ssh-honeypot-48-hours',
].sort();
const drafts = ['business-logic-broken', 'from-dorks-to-defense', 'why-idors-are-everywhere', 'xss-meets-idor'];
const retired = [
  'flashcrawler-v2', 'google-dorks-guide', 'html-injection-chatbot', 'mastering-nmap', 'nosql-injection',
  'rate-limiting-guide', 'reverse-dns-guide', 'shellshock-bash-bug', 'sqlmap-ultimate-guide',
  'ssrf-server-side-request-forgery', 'subdomain-takeover', 'sweet-security-disaster', 'from-shodan-to-sqli',
];
const articleDirs = fs.readdirSync('dist/blog', { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== 'tags')
  .map((entry) => entry.name).sort();
if (JSON.stringify(articleDirs) !== JSON.stringify(published)) throw new Error(`article routes: ${articleDirs}`);
const nonPostOg = new Set(['about.png', 'blog.png', 'home.png', 'projects.png']);
const postOg = fs.readdirSync('dist/og').filter((name) => name.endsWith('.png') && !nonPostOg.has(name)).map((name) => name.replace(/\.png$/, '')).sort();
if (JSON.stringify(postOg) !== JSON.stringify(published)) throw new Error(`post OG routes: ${postOg}`);
const categoryDirs = fs.readdirSync('dist/categories', { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
if (JSON.stringify(categoryDirs) !== JSON.stringify(['guides', 'research', 'threat-intel'])) throw new Error(`category routes: ${categoryDirs}`);
for (const slug of [...drafts, ...retired]) {
  if (fs.existsSync(`dist/blog/${slug}`)) throw new Error(`hidden article route exists: ${slug}`);
  if (fs.existsSync(`dist/og/${slug}.png`)) throw new Error(`hidden OG route exists: ${slug}`);
}
for (const legacy of ['sqlmap', 'idor', 'operations']) {
  if (fs.existsSync(`dist/categories/${legacy}`)) throw new Error(`legacy category route exists: ${legacy}`);
}
console.log('PASS: exactly 5 article routes, 5 post OG routes, and 3 canonical category routes');
NODE
```

Expected: prints the PASS message; no draft, retired, or legacy category route exists.

- [ ] **Step 4: Assert search JSON and rendered search metadata**

Run:

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const expected = new Map([
  ['deploy-your-own-ssh-honeypot', ['guides', 'Guides & Fundamentals']],
  ['shardlure-five-days', ['threat-intel', 'Threat Intelligence & Operations']],
  ['shardlure-the-dashboard-was-lying', ['research', 'Research & Findings']],
  ['ssh-brute-force-telemetry', ['threat-intel', 'Threat Intelligence & Operations']],
  ['ssh-honeypot-48-hours', ['threat-intel', 'Threat Intelligence & Operations']],
]);
const items = JSON.parse(fs.readFileSync('dist/blog/search.json', 'utf8'));
if (items.length !== 5) throw new Error(`search item count: ${items.length}`);
for (const item of items) {
  const wanted = expected.get(item.slug);
  if (!wanted) throw new Error(`unexpected search slug: ${item.slug}`);
  if (item.category?.id !== wanted[0] || item.category?.label !== wanted[1]) throw new Error(`bad search category for ${item.slug}`);
}
console.log('PASS: search JSON has exactly five correctly categorized posts');
NODE
```

Expected: prints `PASS: search JSON has exactly five correctly categorized posts`.

- [ ] **Step 5: Assert RSS item count, category labels, tags, and article JSON-LD**

Run:

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const rss = fs.readFileSync('dist/rss.xml', 'utf8');
const items = rss.match(/<item>/g) ?? [];
if (items.length !== 5) throw new Error(`RSS item count: ${items.length}`);
for (const label of ['Research &amp; Findings', 'Guides &amp; Fundamentals', 'Threat Intelligence &amp; Operations']) {
  if (!rss.includes(`<category>${label}</category>`)) throw new Error(`RSS missing ${label}`);
}
if (!rss.includes('<category>ssh</category>')) throw new Error('RSS no longer preserves post tags');
const pages = [
  ['shardlure-the-dashboard-was-lying', 'Research & Findings'],
  ['deploy-your-own-ssh-honeypot', 'Guides & Fundamentals'],
  ['ssh-brute-force-telemetry', 'Threat Intelligence & Operations'],
  ['ssh-honeypot-48-hours', 'Threat Intelligence & Operations'],
  ['shardlure-five-days', 'Threat Intelligence & Operations'],
];
for (const [slug, label] of pages) {
  const html = fs.readFileSync(`dist/blog/${slug}/index.html`, 'utf8');
  if (!html.includes(`\"articleSection\":\"${label}\"`)) throw new Error(`${slug} missing JSON-LD articleSection`);
  if (!html.includes(`href=\"/categories/`)) throw new Error(`${slug} missing linked category`);
}
console.log('PASS: RSS and article metadata expose categories while retaining tags');
NODE
```

Expected: prints the PASS message.

- [ ] **Step 6: Assert category counts/order, About count, and no empty pinned region in HTML**

Run:

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const categoryIndex = fs.readFileSync('dist/categories/index.html', 'utf8');
const blog = fs.readFileSync('dist/blog/index.html', 'utf8');
const about = fs.readFileSync('dist/about/index.html', 'utf8');
const ordered = ['Research &amp; Findings', 'Guides &amp; Fundamentals', 'Threat Intelligence &amp; Operations'];
let prior = -1;
for (const label of ordered) {
  const position = categoryIndex.indexOf(label);
  if (position < 0 || position <= prior) throw new Error(`category missing/out of order: ${label}`);
  prior = position;
}
for (const [id, count] of [['research', 1], ['guides', 1], ['threat-intel', 3]]) {
  const html = fs.readFileSync(`dist/categories/${id}/index.html`, 'utf8');
  if (!html.includes(`>${count} ${count === 1 ? 'post' : 'posts'}<`)) throw new Error(`${id} count is not ${count}`);
}
if (blog.includes('Pinned / 01') || blog.includes('aria-label=\"Pinned article\"')) throw new Error('empty/hidden pinned region rendered');
if (!/>5<\/p>/.test(about)) throw new Error('About page does not render dynamic count 5');
console.log('PASS: category order/counts, About count, and initial no-pin state are correct');
NODE
```

Expected: prints the PASS message. If the About selector is too broad after unrelated local design changes, inspect the existing `postCount` stat markup and tighten this assertion without hard-coding a second count in source.

- [ ] **Step 7: Assert sitemap excludes all draft and retired slugs**

Run:

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const sitemap = fs.readdirSync('dist').filter((name) => /^sitemap.*\.xml$/.test(name)).map((name) => fs.readFileSync(`dist/${name}`, 'utf8')).join('\n');
const published = ['deploy-your-own-ssh-honeypot', 'shardlure-five-days', 'shardlure-the-dashboard-was-lying', 'ssh-brute-force-telemetry', 'ssh-honeypot-48-hours'];
const hidden = ['business-logic-broken', 'from-dorks-to-defense', 'why-idors-are-everywhere', 'xss-meets-idor', 'flashcrawler-v2', 'google-dorks-guide', 'html-injection-chatbot', 'mastering-nmap', 'nosql-injection', 'rate-limiting-guide', 'reverse-dns-guide', 'shellshock-bash-bug', 'sqlmap-ultimate-guide', 'ssrf-server-side-request-forgery', 'subdomain-takeover', 'sweet-security-disaster', 'from-shodan-to-sqli'];
for (const slug of published) if (!sitemap.includes(`/blog/${slug}/`)) throw new Error(`sitemap missing published ${slug}`);
for (const slug of hidden) if (sitemap.includes(slug)) throw new Error(`sitemap leaks hidden ${slug}`);
console.log('PASS: sitemap contains all five published posts and no hidden posts');
NODE
```

Expected: prints the PASS message.

- [ ] **Step 8: Do not commit; review the complete feature diff and file scope**

Run:

```bash
cd /home/het/Personal/networkshard.com
git diff --check
git diff --stat -- src/content.config.ts src/lib/taxonomy.ts src/content/blog src/pages/blog/index.astro 'src/pages/blog/[...slug].astro' src/pages/blog/search.json.ts src/pages/categories/index.astro 'src/pages/categories/[category].astro' src/pages/rss.xml.ts
git diff -- src/content.config.ts src/lib/taxonomy.ts src/pages/blog/index.astro 'src/pages/blog/[...slug].astro' src/pages/blog/search.json.ts src/pages/categories/index.astro 'src/pages/categories/[category].astro' src/pages/rss.xml.ts
```

Expected: the feature diff is limited to the files declared in Tasks 1–5; generated `dist/` remains ignored/untracked according to existing repository behavior. Do not stage, commit, or push.

---

### Task 7: Preview and Browser-Validate the Editorial Experience

**Files:**
- Verify generated site only; no source edits unless a failure maps back to the owning task.

**Interfaces:**
- Consumes: successful Task 6 production build and Astro preview server.
- Produces: manual/GUI confirmation of routing, layout, interaction, accessibility basics, themes, mobile behavior, search, RSS retrieval, and 404 behavior.

- [ ] **Step 1: Start the production preview on the required stable URL**

Run in a dedicated terminal and leave it running through validation:

```bash
cd /home/het/Personal/networkshard.com
npm run preview -- --host 127.0.0.1 --port 4321
```

Expected: Astro reports the preview at `http://localhost:4321` (or equivalent `127.0.0.1:4321`) and remains running.

- [ ] **Step 2: Smoke-test HTTP status and artifact retrieval with curl**

Run in another terminal:

```bash
cd /home/het/Personal/networkshard.com
for path in \
  /blog/ \
  /categories/ \
  /categories/research/ \
  /categories/guides/ \
  /categories/threat-intel/ \
  /blog/shardlure-the-dashboard-was-lying/ \
  /blog/deploy-your-own-ssh-honeypot/ \
  /blog/ssh-brute-force-telemetry/ \
  /blog/ssh-honeypot-48-hours/ \
  /blog/shardlure-five-days/ \
  /blog/search.json \
  /rss.xml \
  /sitemap-index.xml; do
  code=$(curl -sS -o /dev/null -w '%{http_code}' "http://localhost:4321${path}")
  printf '%-55s %s\n' "$path" "$code"
  test "$code" = 200
done
for path in \
  /blog/business-logic-broken/ \
  /blog/from-dorks-to-defense/ \
  /blog/flashcrawler-v2/ \
  /categories/operations/ \
  /categories/sqlmap/ \
  /categories/idor/ \
  /categories/not-a-category/; do
  code=$(curl -sS -o /dev/null -w '%{http_code}' "http://localhost:4321${path}")
  printf '%-55s %s\n' "$path" "$code"
  test "$code" = 404
done
```

Expected: every published/index/artifact URL returns 200; representative draft, retired, legacy category, and unknown category URLs return 404.

- [ ] **Step 3: Browser-test `/blog` on desktop in both themes**

Open `http://localhost:4321/blog/` at approximately 1440×900. Confirm:

- existing `/blog` header and description remain first;
- no pinned feature or blank pinned spacing appears;
- sections appear as `01` Research & Findings, `02` Guides & Fundamentals, `03` Threat Intelligence & Operations;
- section counts are 1, 1, and 3, descriptions are one sentence, labels link to canonical routes;
- all five compact rows show date, title, read time, and arrow, newest-first within each category;
- keyboard Tab shows a visible focus ring on category and post links;
- theme toggle renders readable borders, text, hover/focus states, and primary links in both light and dark modes.

Expected: all checks pass without horizontal overflow, missing content, duplicate pinned content, or client-side filtering UI.

- [ ] **Step 4: Browser-test category index and all three detail routes**

Visit `/categories/`, `/categories/research/`, `/categories/guides/`, and `/categories/threat-intel/`. Confirm the index is in taxonomy order rather than count order, labels/URLs/counts are exact, each detail heading uses the display label, each list is newest-first, and every post link resolves. Enter `/categories/operations/` and `/categories/not-a-category/` directly and confirm the existing 404 page appears.

Expected: three canonical category routes work; legacy/unknown routes do not resolve to category content.

- [ ] **Step 5: Browser-test all five article pages and navigation boundaries**

Visit each published article listed in Step 2. Confirm the header has a linked canonical display label, tags still link to tag pages, and related posts plus previous/next navigation contain only the five published slugs. Use page source or DevTools Elements on one article from each category to confirm JSON-LD `articleSection` equals its display label.

Expected: no draft or retired title appears in related suggestions, previous/next navigation, tags, breadcrumbs, metadata, or links.

- [ ] **Step 6: Browser-test search and direct RSS retrieval**

Open search with its header button and with Ctrl+K, type terms matching each category's posts, and verify results include only the five published articles and navigate correctly. Fetch `http://localhost:4321/rss.xml` directly in the browser and confirm it loads; inspect the response text to confirm five `<item>` elements, canonical display labels, and retained tags.

Expected: search excludes all draft/retired titles; RSS is retrievable and category/tag metadata is present.

- [ ] **Step 7: Browser-test mobile layouts and interaction**

Resize to approximately 390×844 and repeat `/blog`, `/categories/`, each category detail page, one article from each category, and search. Confirm indexes/counts remain legible, long `Threat Intelligence & Operations` labels wrap without collision, compact rows remain usable, no horizontal scrolling occurs, mobile navigation works, search fits the viewport, and both themes retain readable contrast.

Expected: responsive presentation and interactions remain intact at mobile width.

- [ ] **Step 8: Stop preview only after validation, then do the final no-commit review**

Stop the preview with Ctrl+C after all browser checks. Then run:

```bash
cd /home/het/Personal/networkshard.com
git status --short
git diff --check
```

Expected: preview stops cleanly; `git diff --check` exits 0; implementation remains uncommitted and unpushed. Review `git status` against the pre-existing dirty working tree and ensure the feature added/changed only the files declared in Tasks 1–5 plus the requested plan file—do not claim unrelated pre-existing changes as feature work.

---

## Final Spec-Coverage Review

- [ ] **Editorial inventory:** 5 exact published posts, 4 exact research drafts, 13 exact deletions, and 9 retained sources are asserted.
- [ ] **Taxonomy/schema:** only three IDs, required enum, canonical order, labels, descriptions, URLs, safe lookup, and no tag fallback are asserted.
- [ ] **Blog panel:** unchanged header, conditional pin, no initial empty pin, category order/count/description/index, compact rows, newest-first behavior, semantics, focus, responsive layouts, and themes are validated.
- [ ] **Category routes:** used canonical categories only, taxonomy order, counts 1/1/3, newest-first posts, and 404 behavior for legacy/unknown IDs are validated.
- [ ] **Metadata/artifacts:** linked article category, JSON-LD `articleSection`, search `{ id, label }`, RSS label plus tags, published-only OG, sitemap, tags, related posts, navigation, and About count 5 are validated.
- [ ] **Scope:** no draft rewrites, redirects, dependency additions, test-framework invention, OG-template crowding, client filtering, commits, or pushes are included.
- [ ] **Quality gates:** source assertions, `git diff --check`, `npm run check`, `npm run build`, `npm audit --omit=dev`, generated-artifact scripts, curl, and browser checks all have explicit expected outcomes.
