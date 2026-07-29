# Mobile Blog Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/blog` compact and readable below 640px while preserving the current categorized desktop layout.

**Architecture:** Use responsive Astro markup and component-scoped CSS only. The page will render separate mobile/desktop introduction copy, hide category descriptions on mobile, compress category headers into one row, and tighten compact post rows without adding JavaScript.

**Tech Stack:** Astro 7.1.5, Tailwind CSS 4.3.3, component-scoped CSS.

## Global Constraints

- Preserve all five published posts and category counts `1 / 1 / 3`.
- Preserve canonical taxonomy, routes, metadata, semantic landmarks, ordered lists, focus states, and both themes.
- Do not add client-side filtering, accordions, or JavaScript.
- Do not commit or push.

---

### Task 1: Compact responsive blog header and categories

**Files:**
- Modify: `src/pages/blog/index.astro:18-60`

**Interfaces:**
- Consumes: `categorySections` with `id`, `label`, `description`, `href`, `publishedCount`, and `posts`.
- Produces: unchanged semantic category sections with responsive copy visibility.

- [ ] **Step 1: Confirm current mobile problems**

At a 390px viewport, verify the long introduction and category descriptions are visible and globally justified.

- [ ] **Step 2: Add responsive introduction copy**

Keep the current sentence for `sm` and above. Add mobile copy `Research and security engineering notes.` below `sm`. Give both copies left-aligned metadata classes that override global paragraph justification, hyphenation, and aggressive wrapping.

- [ ] **Step 3: Compress category headers on mobile**

Use a three-column mobile grid `2rem minmax(0,1fr) auto` for number, title, and count. Keep the existing wider desktop grid. Hide category descriptions below `sm`, retain them at `sm` and above, and reduce mobile vertical padding.

- [ ] **Step 4: Reduce mobile section spacing**

Use approximately `gap-8` below `md`, retaining the current spacious desktop gap at `md` and above.

- [ ] **Step 5: Review scoped diff**

Run:

```bash
git diff --check -- src/pages/blog/index.astro
git diff -- src/pages/blog/index.astro
```

Expected: no whitespace errors; only responsive presentation changes.

### Task 2: Tighten compact mobile post rows

**Files:**
- Modify: `src/components/PostList.astro:31-42`

**Interfaces:**
- Consumes: unchanged `Post[]` and `variant` props.
- Produces: unchanged semantic ordered list and links with more compact mobile layout.

- [ ] **Step 1: Update mobile row grid**

Below 560px, narrow the date column to approximately `3rem`, reduce the gap, and keep title plus arrow columns fluid.

- [ ] **Step 2: Normalize mobile date styling**

Apply uppercase text and restrained letter spacing to dates on mobile while preserving the full date value and desktop styling.

- [ ] **Step 3: Tighten mobile row padding and title rhythm**

Reduce vertical padding slightly and use a readable compact line height. Keep read time hidden below 560px.

- [ ] **Step 4: Review scoped diff**

Run:

```bash
git diff --check -- src/components/PostList.astro
git diff -- src/components/PostList.astro
```

Expected: no whitespace errors; no data or route changes.

### Task 3: Validate behavior and visuals

**Files:**
- Verify: `src/pages/blog/index.astro`
- Verify: `src/components/PostList.astro`

**Interfaces:**
- Consumes: final source changes.
- Produces: validated local preview.

- [ ] **Step 1: Run static validation**

```bash
git diff --check
npm run check
npm run build
```

Expected: zero Astro diagnostics and successful 42-page build.

- [ ] **Step 2: Verify content invariants**

Confirm `/blog` still shows exactly five posts in category counts `1 / 1 / 3`.

- [ ] **Step 3: Browser-check mobile**

At 390×844 verify:

- short introduction visible;
- long introduction hidden;
- category descriptions hidden;
- number/title/count share one row;
- no large justified word gaps;
- dates, titles, and arrows do not collide;
- all five links remain usable.

- [ ] **Step 4: Browser-check desktop**

At 1280×720 verify the long introduction and all three category descriptions remain visible and the current spacious layout is preserved.

- [ ] **Step 5: Check both themes**

Toggle light/dark and confirm text, rules, and focus states remain readable.

- [ ] **Step 6: Leave preview running**

Keep `http://localhost:4321/blog/` available for user review. Do not commit or push.
