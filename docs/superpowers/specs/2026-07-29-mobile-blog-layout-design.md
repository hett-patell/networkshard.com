# Mobile Blog Layout Design

Date: 2026-07-29
Status: Approved

## Goal

Make the categorized `/blog` panel compact and readable on narrow screens without changing its desktop structure or adding client-side behavior.

## Problem

Global paragraph justification creates large word gaps in the short blog introduction and category descriptions. Category headers stack the section number, title, description, and count vertically, consuming excessive space before each small post list.

## Mobile layout

Below 640px:

- Use the shorter page introduction: “Research and security engineering notes.”
- Left-align the page introduction and disable justification, hyphenation, and aggressive word breaking for it.
- Hide category descriptions.
- Render category number, linked title, and post count in one compact grid row.
- Keep the category title allowed to wrap normally when necessary.
- Reduce category-to-category spacing from the desktop value to approximately 2rem.
- Reduce category-header vertical padding.
- Keep article rows immediately below each category header.
- Keep read time hidden in compact rows.
- Use a narrower uppercase date column and retain the arrow affordance.

At 640px and above:

- Preserve the current longer page description.
- Preserve category descriptions.
- Preserve the existing spacious category header and desktop post-row structure.

## Accessibility and behavior

- Preserve semantic section headings, linked category names, ordered post lists, and the “Articles by category” landmark.
- Do not add accordions, filtering, or JavaScript.
- Preserve keyboard focus, light/dark themes, and reduced-motion behavior.

## Files

- `src/pages/blog/index.astro`: responsive introductory copy and category header layout.
- `src/components/PostList.astro`: tighter mobile date/row presentation.

## Validation

- `git diff --check`
- `npm run check`
- `npm run build`
- Browser inspection at 390×844 and 1280×720.
- Confirm mobile descriptions are hidden while desktop descriptions remain visible.
- Confirm all five posts and counts 1/1/3 remain unchanged.
- Confirm light and dark themes remain readable.

No commit or push is permitted.
