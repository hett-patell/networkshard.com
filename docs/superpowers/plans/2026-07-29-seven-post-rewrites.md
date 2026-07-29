# Seven-Post Rewrites Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recover three deleted article sources as factual leads, replace all seven specified posts with evidence-first text-only drafts, and provide a localhost-only review surface that produces no draft routes or artifacts in a production build.

**Architecture:** Keep `getPublishedPosts()` as the sole public-content boundary and keep every rewritten entry `draft: true`. Add one optional catch-all Astro page whose development-only `getStaticPaths()` emits both `/drafts/` index mode and `/drafts/<slug>/` detail paths; an empty production path list guarantees that `astro build` emits no draft-preview files. The preview uses `BaseLayout` and `astro:content` rendering directly, but deliberately omits published-article metadata, sharing, comments, public taxonomy links, related posts, and public post navigation.

**Tech Stack:** Astro 7.1.5 static output, Astro Content Collections, TypeScript 6.0.3, Markdown, Tailwind CSS 4.3.3, Node.js >=22.12.0, `@astrojs/rss`, and `@astrojs/sitemap`.

## Global Constraints

- Do not commit, push, stage, reset, restore, stash, or discard any work. This repository already has unrelated working-tree changes; preserve them exactly.
- During implementation, modify only the seven named files under `src/content/blog/` and create `src/pages/drafts/[...slug].astro`. Do not edit public routes, `src/lib/posts.ts`, layouts, components, configuration, dependencies, generated `dist/`, or unrelated posts.
- Keep exactly these slugs and intended public URLs: `google-dorks-guide`, `from-shodan-to-sqli`, `subdomain-takeover`, `from-dorks-to-defense`, `business-logic-broken`, `why-idors-are-everywhere`, and `xss-meets-idor`.
- Keep all seven entries `draft: true` through rewrite and review. This work does not publish a post, add a redirect, change a public URL, or select a new publication date.
- Date policy is exact: retain `2025-04-24`, `2025-08-28`, and `2025-07-05` from the recovered sources, and retain the existing `2025-11-25`, `2025-07-19`, `2025-06-15`, and `2025-06-19` values for the four retained drafts. These dates are schema-compatibility metadata only and must not be displayed as new publication dates in draft preview. A reviewer replaces the date with the actual publication date only immediately before approving and publishing that individual post.
- Use the approved titles and categories verbatim. `google-dorks-guide` is `guides`; the other six are `research`.
- Completely replace each file's frontmatter and body. Do not edit imported prose in place, restore a historical blob wholesale, or retain old editorial wording merely because it exists.
- Treat historical and retained article prose only as leads. A material factual assertion must map to a reviewable primary source or be narrowed, explicitly bounded, removed, or left unpublished.
- Keep sensitive evidence packets outside the repository. Do not create evidence, backup, scratch, or review-packet files under the project; do not copy from `dist/`, web caches, or ad hoc backups.
- All seven drafts are text-only: no image syntax, HTML image tags, Medium/CDN hotlinks, screenshots, GIFs, memes, decorative animations, emoji furniture, live payload hosts, promotional endings, author boilerplate, or unrelated platform links.
- Preserve contributor and organization names only when their spelling, role, disclosure permission, and factual relevance are supported. A name must not imply authorization, endorsement, remediation, severity, or impact.
- Every real-target article must contain a visible `## Scope and disclosure` section covering scope/environment, evidence type, reporting/remediation/retest status, and redactions. Use the literal phrase `not confirmed` wherever the review packet lacks documentation.
- Every request/response example must be sanitized, syntactically readable, internally consistent, and followed by what it proves and what it does not prove. Never include secrets, personal data, operational targets, reusable payload infrastructure, or instructions for testing systems outside owned or explicitly authorized scope.
- Distinguish observation, inference, validation, and unresolved facts in plain language. Do not convert missing evidence into a positive claim.
- Do not imitate `mll.sh` or imported Medium prose. Allowed high-level traits are direct openings, short sections, clear evidence, candid uncertainty, restrained dry humor, and no filler; phrases, sentence structures, titles, transitions, recurring devices, and exact voice must remain original NetworkShard writing.
- Production output must contain no `/drafts/` index or detail route and no route, blog listing, search record, RSS item, sitemap entry, category/tag listing, related-post link, post-navigation link, or OG image for any of the seven drafts.

---

## File Structure

- Create `src/content/blog/google-dorks-guide.md`: recovered-slug defensive indexed-exposure field note; compatibility date `2025-04-24`; category `guides`.
- Create `src/content/blog/from-shodan-to-sqli.md`: recovered-slug exposed-service-to-SQLi case study; compatibility date `2025-08-28`; category `research`.
- Create `src/content/blog/subdomain-takeover.md`: recovered-slug false-positive DNS/takeover investigation; compatibility date `2025-07-05`; category `research`.
- Replace `src/content/blog/from-dorks-to-defense.md`: evidence-bounded CERT-In recognition case study; compatibility date `2025-11-25`; category `research`.
- Replace `src/content/blog/business-logic-broken.md`: five state/trust-boundary findings; compatibility date `2025-07-19`; category `research`.
- Replace `src/content/blog/why-idors-are-everywhere.md`: controlled BOLA/invoice authorization case study; compatibility date `2025-06-15`; category `research`.
- Replace `src/content/blog/xss-meets-idor.md`: object-authorization and output-encoding chain analysis; compatibility date `2025-06-19`; category `research`.
- Create `src/pages/drafts/[...slug].astro`: a development-only optional catch-all that emits the drafts index and seven review pages only when `import.meta.env.DEV`, renders draft Markdown with `BaseLayout`, shows a publication warning, and links among all seven drafts.
- Verify, but do not modify, `src/lib/posts.ts`, `src/pages/blog/[...slug].astro`, `src/pages/blog/index.astro`, `src/pages/blog/search.json.ts`, `src/pages/rss.xml.ts`, `src/pages/og/[...slug].png.ts`, category/tag routes, related-post navigation, and sitemap integration.

---

### Task 1: Freeze Scope and Recover the Three Historical Sources Reproducibly

**Files:**
- Research input only: Git blobs for `src/content/blog/google-dorks-guide.md`, `src/content/blog/from-shodan-to-sqli.md`, and `src/content/blog/subdomain-takeover.md`
- Do not modify files in this task.

**Interfaces:**
- Consumes: repository Git object database and the approved design specification.
- Produces: three reproducible source references, each fixed to commit `41f956b214dac4b3bdd9d8757c21227f6a1a219b`, plus an external/private claim ledger used by Tasks 2–8.

- [ ] **Step 1: Capture the existing dirty-worktree baseline without changing it**

Run:

```bash
cd /home/het/Personal/networkshard.com
git status --short
git diff --name-status
```

Expected: the pre-existing changes are visible, including the three deleted post paths. Save this output in the implementation session notes, not in a repository file, so final scope checks can distinguish pre-existing changes from this plan's edits.

- [ ] **Step 2: Confirm the last repository commit containing each deleted source**

Run:

```bash
cd /home/het/Personal/networkshard.com
for path in \
  src/content/blog/google-dorks-guide.md \
  src/content/blog/from-shodan-to-sqli.md \
  src/content/blog/subdomain-takeover.md
do
  printf '\n== %s ==\n' "$path"
  git log --all --format='%H %cs %s' -- "$path"
  git cat-file -e "41f956b214dac4b3bdd9d8757c21227f6a1a219b:$path"
done
```

Expected: history is printed for all three paths and every `git cat-file -e` exits successfully. `41f956b214dac4b3bdd9d8757c21227f6a1a219b` is the exact blob-bearing commit to cite in each private review packet.

- [ ] **Step 3: Read each exact source blob without restoring or copying it**

Run each command in a terminal whose output is treated as sensitive review material:

```bash
cd /home/het/Personal/networkshard.com
git show '41f956b214dac4b3bdd9d8757c21227f6a1a219b:src/content/blog/google-dorks-guide.md'
git show '41f956b214dac4b3bdd9d8757c21227f6a1a219b:src/content/blog/from-shodan-to-sqli.md'
git show '41f956b214dac4b3bdd9d8757c21227f6a1a219b:src/content/blog/subdomain-takeover.md'
```

Expected: each historical article is readable from Git. Do not redirect output to a file, run `git restore`, or copy the article into a backup.

- [ ] **Step 4: Build a private per-post claim ledger outside the repository**

For each of the seven posts, record these columns in the authorized private review system: `claim`, `state (observation|inference|validation|unresolved)`, `source`, `what source proves`, `what source does not prove`, `scope/timeframe`, `disclosure status`, `redaction`, and `article disposition (include|narrow|omit|block publication)`. For each recovered post also record the exact commit and path from Step 2.

Apply these deterministic rules:

1. Historical or retained prose alone goes in `source` only as `lead—not evidence`.
2. A report, acknowledgement, authorized-scope record, sanitized request/response, contemporaneous note, controlled reproduction, source/configuration from an authorized environment, or current authoritative documentation can support only the fact it directly shows.
3. Missing authorization evidence blocks a real-target publication form; use a controlled-lab framing or keep the article draft-only.
4. Missing acknowledgement, remediation, or retest documentation requires the public status `not confirmed`.
5. Missing support for a material claim sets disposition to `narrow`, `omit`, or `block publication`, never `include`.
6. Sensitive evidence remains outside the article and repository even when it supports a sanitized sentence.

- [ ] **Step 5: Confirm this research task made no working-tree changes**

Run:

```bash
cd /home/het/Personal/networkshard.com
git status --short
```

Expected: output is identical to the Step 1 baseline. Do not stage or commit.

---

### Task 2: Replace `google-dorks-guide` with a Defensive Indexed-Exposure Draft

**Files:**
- Create: `src/content/blog/google-dorks-guide.md`

**Interfaces:**
- Consumes: the private claim ledger, current primary Google Search documentation, and historical blob `41f956b214dac4b3bdd9d8757c21227f6a1a219b:src/content/blog/google-dorks-guide.md` as leads only.
- Produces: content entry ID `google-dorks-guide`, category `guides`, and a draft preview candidate at `/drafts/google-dorks-guide/`.

- [ ] **Step 1: Create completely new frontmatter**

Use exactly these keys and values; do not carry over the old title, description, or inferred publication status:

```yaml
---
title: "What Google Can Reveal About Your Attack Surface—and What It Cannot"
description: "A defensive method for reviewing indexed exposure within authorized scope while separating search results from verified security findings."
date: 2025-04-24
category: "guides"
draft: true
tags: ["google-dorks", "recon", "osint"]
---
```

`2025-04-24` is internal compatibility metadata recovered from Git, not a new publication date. Do not mention it in the body.

- [ ] **Step 2: Write the evidence-first body in this exact subject order**

Use these H2 headings, with short paragraphs and no generic history of “Google dorking”:

1. `## Search engines are not a backdoor` — open in first person with a controlled or clearly authorized indexed result; define it only as crawler-visible exposure.
2. `## Scope and disclosure` — state the owned/authorized domain boundary, controlled versus real-target evidence, reporting/remediation/retest status, and redactions; if the exercise is purely controlled, say so directly.
3. `## Defining scope before writing queries` — list approved domains, handling rules, stop conditions, and escalation channel before operators.
4. `## Operators that still work in 2026` — include only operators verified against current Google primary documentation; cite the documentation and state that behavior and result counts are unstable.
5. `## Why site: is not an asset inventory` — cover incomplete indexing, stale results, canonicalization, subdomain gaps, regional variation, and unreliable counts.
6. `## Separating indexed content from vulnerabilities` — distinguish public-by-design pages, stale copies, metadata leakage, access-control failures, and false positives.
7. `## A repeatable review workflow` — specify timestamped query logging, deduplication, manual verification, minimum evidence, severity restraint, and stop/escalation decisions.
8. `## Evidence handling and responsible disclosure` — explain minimum collection, timestamps, redactions, safe retention, and correct reporting channels.
9. `## Defensive controls` — distinguish `robots.txt`, robots meta directives, and de-indexing from authentication/authorization; cover storage policy, cache removal, and post-fix verification.
10. `## What changed in my method` — close with a concise first-person change to scoping, evidence capture, and wording.

- [ ] **Step 3: Enforce the post-specific claim boundary**

Exclude credential-hunting examples, exposed-camera queries, breach anecdotes, operational targets, exhaustive “dork lists,” and any statement that a result proves unauthorized access, complete inventory, vulnerability, exploitation, or impact. If CERT-In experience is mentioned, constrain it to one sourced methodological lesson and leave the case chronology to `from-dorks-to-defense`.

- [ ] **Step 4: Run the single-post structural and media gate**

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const path = 'src/content/blog/google-dorks-guide.md';
const s = fs.readFileSync(path, 'utf8');
const required = [
  'title: "What Google Can Reveal About Your Attack Surface—and What It Cannot"',
  'date: 2025-04-24', 'category: "guides"', 'draft: true',
  '## Search engines are not a backdoor', '## Scope and disclosure',
  '## Defining scope before writing queries', '## Operators that still work in 2026',
  '## Why site: is not an asset inventory', '## Separating indexed content from vulnerabilities',
  '## A repeatable review workflow', '## Evidence handling and responsible disclosure',
  '## Defensive controls', '## What changed in my method'
];
for (const item of required) if (!s.includes(item)) throw new Error(`${path}: missing ${item}`);
if (/!\[[^\]]*\]\(|<img\b|cdn-images|medium\.com|\.gif\b|[\u{1F300}-\u{1FAFF}]/u.test(s)) throw new Error(`${path}: forbidden media, imported link, or emoji`);
console.log('PASS google-dorks-guide structure');
NODE
```

Expected: `PASS google-dorks-guide structure`.

- [ ] **Step 5: Review only this file's implementation diff**

```bash
cd /home/het/Personal/networkshard.com
git diff -- src/content/blog/google-dorks-guide.md
git diff --check -- src/content/blog/google-dorks-guide.md
```

Expected: one wholly new evidence-first text draft with no copied historical body or media. Do not stage or commit.

---

### Task 3: Replace `from-shodan-to-sqli` with a Minimal-Impact Validation Draft

**Files:**
- Create: `src/content/blog/from-shodan-to-sqli.md`

**Interfaces:**
- Consumes: private scope/evidence records and historical blob `41f956b214dac4b3bdd9d8757c21227f6a1a219b:src/content/blog/from-shodan-to-sqli.md` as leads only.
- Produces: draft entry `from-shodan-to-sqli` in category `research`.

- [ ] **Step 1: Replace frontmatter exactly**

```yaml
---
title: "From an Exposed Service to a SQL Injection Finding"
description: "A bounded case study in turning an internet-wide discovery signal into a manually validated SQL injection finding without unnecessary data access."
date: 2025-08-28
category: "research"
draft: true
tags: ["sql-injection", "shodan", "pentesting"]
---
```

- [ ] **Step 2: Write the body using exactly these H2 sections**

1. `## What Shodan showed` — direct first-person observation with sanitized service metadata and timestamp.
2. `## Scope and disclosure` — disclose scope/timeframe evidence, real-target versus reconstructed evidence, report/acknowledgement/remediation/retest status, and redactions.
3. `## What Shodan did not prove` — explicitly bound ownership, authorization, SQLi, exploitability, severity, and impact.
4. `## Narrowing the target surface` — describe manual identification of the relevant application/input without broad scanning.
5. `## Establishing the injection point` — show a sanitized baseline request and the smallest safe variation, then the exact response difference.
6. `## Minimal-impact validation` — state validation method, stop condition, and why extraction/destructive tests were unnecessary.
7. `## Evidence boundaries` — map retained evidence to supported facts and label backend explanations as inference unless independently shown.
8. `## What remains unverified` — state database contents, privilege, data volume, exploit chain, and business impact as untested/not confirmed where applicable.
9. `## Reporting and remediation status` — use only documented dates/outcomes and literal `not confirmed` for gaps.
10. `## What changed in my method` — concise lesson about treating internet-wide indexing as a lead rather than a finding.

- [ ] **Step 3: Apply the publication blocker and claim boundary**

Do not claim data access, authentication bypass, compromise, organizational impact, remediation, or retesting unless the private ledger independently supports that exact result. If lawful testing scope or disclosure context for the historical real target cannot be established, write only the controlled-lab portions that evidence supports and state that the real-target account is not publishable; keep the draft unpublished.

- [ ] **Step 4: Verify structure and prohibited claims/media**

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const p = 'src/content/blog/from-shodan-to-sqli.md';
const s = fs.readFileSync(p, 'utf8');
for (const x of ['title: "From an Exposed Service to a SQL Injection Finding"','date: 2025-08-28','category: "research"','draft: true','## What Shodan showed','## Scope and disclosure','## What Shodan did not prove','## Narrowing the target surface','## Establishing the injection point','## Minimal-impact validation','## Evidence boundaries','## What remains unverified','## Reporting and remediation status','## What changed in my method']) if (!s.includes(x)) throw new Error(`${p}: missing ${x}`);
if (/!\[[^\]]*\]\(|<img\b|cdn-images|medium\.com|\.gif\b|[\u{1F300}-\u{1FAFF}]/u.test(s)) throw new Error(`${p}: forbidden media, imported link, or emoji`);
console.log('PASS from-shodan-to-sqli structure');
NODE
git diff --check -- src/content/blog/from-shodan-to-sqli.md
```

Expected: both commands pass. Do not stage or commit.

---

### Task 4: Replace `subdomain-takeover` with a False-Positive Investigation

**Files:**
- Create: `src/content/blog/subdomain-takeover.md`

**Interfaces:**
- Consumes: timestamped DNS/provider evidence and historical blob `41f956b214dac4b3bdd9d8757c21227f6a1a219b:src/content/blog/subdomain-takeover.md` as leads only.
- Produces: draft entry `subdomain-takeover` in category `research`, with the explicit conclusion that takeover was not established.

- [ ] **Step 1: Replace frontmatter exactly**

```yaml
---
title: "I Thought I Found a Subdomain Takeover. I Had Not."
description: "A false-positive investigation showing why suspicious DNS and verification records did not establish a claimable third-party resource."
date: 2025-07-05
category: "research"
draft: true
tags: ["subdomain-takeover", "dns", "web-security"]
---
```

- [ ] **Step 2: Write exactly these H2 sections**

1. `## The initial signal` — first-person observation and cautious hypothesis.
2. `## Scope and disclosure` — scope, evidence provenance, reporting/remediation/retest status, and target redactions.
3. `## The DNS chain` — timestamped sanitized DNS records and resolution path.
4. `## Why no CNAME changed the conclusion` — explain why missing expected delegation defeated or weakened the hypothesis.
5. `## TXT records versus provider verification` — separate verification artifacts from routing and resource ownership.
6. `## Dangling DNS versus claimable resources` — list additional provider-side facts required to establish claimability.
7. `## A modern takeover decision tree` — text-only sequence: DNS observation, provider fingerprint, claimability evidence, authorization check, minimal validation, stop/report.
8. `## Reporting uncertainty correctly` — demonstrate language for a suspected configuration issue without claiming takeover.
9. `## What I would test differently now` — close with evidence-capture, provider-research, restraint, and wording changes.

- [ ] **Step 3: State the conclusion without ambiguity**

Include the exact sentence `The evidence did not establish a subdomain takeover.` Do not describe successful claiming, content control, exploitation, or impact. A dangling record, TXT record, provider fingerprint, error page, or scanner result is an observation—not proof of claimability.

- [ ] **Step 4: Verify structure and the required conclusion**

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const p = 'src/content/blog/subdomain-takeover.md';
const s = fs.readFileSync(p, 'utf8');
for (const x of ['title: "I Thought I Found a Subdomain Takeover. I Had Not."','date: 2025-07-05','category: "research"','draft: true','## The initial signal','## Scope and disclosure','## The DNS chain','## Why no CNAME changed the conclusion','## TXT records versus provider verification','## Dangling DNS versus claimable resources','## A modern takeover decision tree','## Reporting uncertainty correctly','## What I would test differently now','The evidence did not establish a subdomain takeover.']) if (!s.includes(x)) throw new Error(`${p}: missing ${x}`);
if (/!\[[^\]]*\]\(|<img\b|cdn-images|medium\.com|\.gif\b|[\u{1F300}-\u{1FAFF}]/u.test(s)) throw new Error(`${p}: forbidden media, imported link, or emoji`);
console.log('PASS subdomain-takeover structure');
NODE
git diff --check -- src/content/blog/subdomain-takeover.md
```

Expected: both commands pass. Do not stage or commit.

---

### Task 5: Replace `from-dorks-to-defense` with a Recognition-Bounded Case Study

**Files:**
- Modify: `src/content/blog/from-dorks-to-defense.md`

**Interfaces:**
- Consumes: private CERT-In acknowledgement/recognition records, scope material, and retained prose only as leads.
- Produces: draft entry `from-dorks-to-defense` in category `research` without an operator catalogue.

- [ ] **Step 1: Replace the entire frontmatter exactly**

```yaml
---
title: "From Search Results to Two CERT-In Recognitions"
description: "An evidence-bounded account of turning search-index observations into responsible reports and two separately documented CERT-In recognitions."
date: 2025-11-25
category: "research"
draft: true
tags: ["bug-bounty", "CERT-IN", "recon"]
---
```

Remove the old `readTime` and `pinned` overrides; read time is computed and draft pinning has no public role.

- [ ] **Step 2: Replace the complete body with these H2 sections**

1. `## Why I started with search-index exposure`
2. `## Scope and disclosure`
3. `## Defining government-domain scope`
4. `## Triage and false positives`
5. `## The findings that were reportable`
6. `## Evidence preservation`
7. `## Reporting to CERT-In`
8. `## What the recognitions do—and do not—prove`
9. `## Lessons for future research`

Open with the actual low-impact research question. Keep separate findings separate; retain only sanitized, supported SQLi, XSS, or information-exposure observations. Provide documented chronology without filling memory gaps.

- [ ] **Step 3: Separate recognition from every other claim**

State two recognitions only if the private packet verifies identity and dates. Recognition alone must not imply broad authorization, validation of every issue, severity, remediation, endorsement, or impact. Retain `CERT-In` and government naming only where supported and disclosure-safe; redact hosts and sensitive parameters. If remediation/retest records are absent, state `remediation and retest are not confirmed`.

- [ ] **Step 4: Verify replacement and remove imported/promotional material**

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const p = 'src/content/blog/from-dorks-to-defense.md';
const s = fs.readFileSync(p, 'utf8');
for (const x of ['title: "From Search Results to Two CERT-In Recognitions"','date: 2025-11-25','category: "research"','draft: true','## Why I started with search-index exposure','## Scope and disclosure','## Defining government-domain scope','## Triage and false positives','## The findings that were reportable','## Evidence preservation','## Reporting to CERT-In','## What the recognitions do—and do not—prove','## Lessons for future research']) if (!s.includes(x)) throw new Error(`${p}: missing ${x}`);
if (/!\[[^\]]*\]\(|<img\b|cdn-images|medium\.com|vulninsights|About Me|Coffee Addict|\.gif\b|[\u{1F300}-\u{1FAFF}]/u.test(s)) throw new Error(`${p}: imported media, promotion, boilerplate, or emoji remains`);
console.log('PASS from-dorks-to-defense structure');
NODE
git diff --check -- src/content/blog/from-dorks-to-defense.md
```

Expected: both commands pass. Do not stage or commit.

---

### Task 6: Replace `business-logic-broken` with Five State-Boundary Findings

**Files:**
- Modify: `src/content/blog/business-logic-broken.md`

**Interfaces:**
- Consumes: private request/response/state evidence, collaborator attribution evidence, scope/disclosure records, and retained prose only as leads.
- Produces: draft entry `business-logic-broken` in category `research` with five independently bounded findings.

- [ ] **Step 1: Replace frontmatter exactly**

```yaml
---
title: "Five Findings That Looked Small Until I Followed the State"
description: "A five-part assessment separating client-visible behavior from server-accepted state across authorization, OTP, wallet, upload, and profile flows."
date: 2025-07-19
category: "research"
draft: true
tags: ["business-logic", "otp-bypass", "xss"]
---
```

- [ ] **Step 2: Write the complete body with these H2 sections**

1. `## The application and assessment context` — direct observation, test-account setup, supported collaboration credit, and evidence limits.
2. `## Scope and disclosure` — authorization basis or absence, evidence type, reporting/remediation/retest status, and redactions.
3. `## Finding 1: response handling versus server-side authorization` — distinguish a modified proxy response from a server-accepted transition.
4. `## Finding 2: OTP challenge binding` — OTP length, rate controls, expiry, session/challenge binding, tested flow, and theoretical versus demonstrated bypass.
5. `## Finding 3: wallet or credit state` — trace request, response, UI state, persisted state, and any later transaction evidence separately.
6. `## Finding 4: document rendering boundaries` — analyze PDF/SVG storage, declared and served content types, disposition, origin, and actual execution context.
7. `## Finding 5: what could not be proven` — mobile-number state, victim/admin rendering, persistence, cross-user reach, purchase use, and account compromise.
8. `## Shared root causes` — server validation, state-machine enforcement, authorization, challenge binding, file handling, and output isolation only where evidence supports them.
9. `## Reporting and evidence limitations` — exact reporting/acknowledgement/fix/retest status.
10. `## What changed in my method` — close with tracing server state rather than trusting UI behavior.

- [ ] **Step 3: Enforce the state-transition claim boundary**

Do not claim pre-account takeover, account takeover, arbitrary wallet credit, financial loss, purchase abuse, stored PDF/SVG execution in another user's context, mobile verification bypass, or durable backend state unless the evidence directly demonstrates that result. Use this exact rule in the prose where relevant: changing an intercepted response from `400` to `200` proves client behavior only until a subsequent server-side effect is independently verified.

Preserve collaborator credit as restrained text only if name, contribution, and disclosure are verified; omit profile promotion and biography boilerplate.

- [ ] **Step 4: Verify structure and remove the imported article's sensational content**

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const p = 'src/content/blog/business-logic-broken.md';
const s = fs.readFileSync(p, 'utf8');
for (const x of ['title: "Five Findings That Looked Small Until I Followed the State"','date: 2025-07-19','category: "research"','draft: true','## The application and assessment context','## Scope and disclosure','## Finding 1: response handling versus server-side authorization','## Finding 2: OTP challenge binding','## Finding 3: wallet or credit state','## Finding 4: document rendering boundaries','## Finding 5: what could not be proven','## Shared root causes','## Reporting and evidence limitations','## What changed in my method']) if (!s.includes(x)) throw new Error(`${p}: missing ${x}`);
if (/!\[[^\]]*\]\(|<img\b|cdn-images|medium\.com|About the Authors|Happy Hacking|\.gif\b|[\u{1F300}-\u{1FAFF}]/u.test(s)) throw new Error(`${p}: imported media, boilerplate, or emoji remains`);
console.log('PASS business-logic-broken structure');
NODE
git diff --check -- src/content/blog/business-logic-broken.md
```

Expected: both commands pass. Do not stage or commit.

---

### Task 7: Replace `why-idors-are-everywhere` with a Controlled BOLA Case Study

**Files:**
- Modify: `src/content/blog/why-idors-are-everywhere.md`

**Interfaces:**
- Consumes: two controlled accounts or equivalent authorized fixtures, sanitized owner/non-owner responses, scope records, and retained prose only as leads.
- Produces: draft entry `why-idors-are-everywhere` in category `research` using precise object-level authorization/BOLA terminology.

- [ ] **Step 1: Replace frontmatter exactly**

```yaml
---
title: "The Invoice Number Changed. The Authorization Decision Did Not."
description: "A controlled invoice case study showing how one identifier change exposed a missing object-level authorization decision—and where validation stopped."
date: 2025-06-15
category: "research"
draft: true
tags: ["idor", "web-security", "bug-bounty"]
---
```

- [ ] **Step 2: Write exactly these H2 sections**

1. `## The smallest possible test` — owned baseline and one controlled identifier change.
2. `## Scope and disclosure` — controlled accounts/fixtures, authorization, evidence type, report/remediation/retest status, and redactions.
3. `## Two accounts, one object identifier` — owner and non-owner behavior without unrelated-user access.
4. `## Authentication is not authorization` — valid session versus subject-object-action decision.
5. `## What data was exposed` — only fields shown by controlled/reviewed evidence; no personal/payment values.
6. `## How far I tested—and where I stopped` — exact sample size and prohibited actions.
7. `## Root cause` — missing ownership/policy check, not predictable IDs alone.
8. `## Correct server-side authorization` — subject-object-action checks, opaque IDs as defense in depth, and safe denial.
9. `## Regression tests developers can keep` — owner, non-owner, unauthenticated, role-boundary, read, and mutation cases.
10. `## What changed in my method` — focus future tests on authorization decisions rather than identifier shape.

- [ ] **Step 3: Enforce the controlled-evidence condition**

The title is valid only if controlled or authorized evidence confirms a missing object-level check. If that evidence is absent, keep the post unpublished and revise the private ledger; do not substitute a guessed adjacent identifier. Exclude claims of thousands of invoices, payment-card exposure, account takeover, legal/regulatory outcomes, universal prevalence, write/delete behavior, or privilege escalation from a read-only observation.

- [ ] **Step 4: Verify structure and remove generic tutorial/sensational material**

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const p = 'src/content/blog/why-idors-are-everywhere.md';
const s = fs.readFileSync(p, 'utf8');
for (const x of ['title: "The Invoice Number Changed. The Authorization Decision Did Not."','date: 2025-06-15','category: "research"','draft: true','## The smallest possible test','## Scope and disclosure','## Two accounts, one object identifier','## Authentication is not authorization','## What data was exposed','## How far I tested—and where I stopped','## Root cause','## Correct server-side authorization','## Regression tests developers can keep','## What changed in my method']) if (!s.includes(x)) throw new Error(`${p}: missing ${x}`);
if (/!\[[^\]]*\]\(|<img\b|cdn-images|medium\.com|\.gif\b|[\u{1F300}-\u{1FAFF}]/u.test(s)) throw new Error(`${p}: forbidden media, imported link, or emoji`);
console.log('PASS why-idors-are-everywhere structure');
NODE
git diff --check -- src/content/blog/why-idors-are-everywhere.md
```

Expected: both commands pass. Do not stage or commit.

---

### Task 8: Replace `xss-meets-idor` with a Boundary-by-Boundary Chain Analysis

**Files:**
- Modify: `src/content/blog/xss-meets-idor.md`

**Interfaces:**
- Consumes: separate evidence for object access, each rendering sink, persistence, execution origin/session, cookies/CSP, scope, and disclosure; retained prose is leads only.
- Produces: draft entry `xss-meets-idor` in category `research` without claiming account takeover or a reliable chain.

- [ ] **Step 1: Replace frontmatter exactly**

```yaml
---
title: "When Object Authorization and Output Encoding Fail Together"
description: "A boundary-by-boundary analysis of object access and three rendering contexts, separating demonstrated execution from a hypothetical exploit chain."
date: 2025-06-19
category: "research"
draft: true
tags: ["xss", "idor", "bug-bounty"]
---
```

- [ ] **Step 2: Write exactly these H2 sections**

1. `## Why the chain mattered` — narrow hypothesis without announcing an outcome.
2. `## Scope and disclosure` — test context, evidence provenance, reporting/remediation/retest state, and redactions.
3. `## The object-access weakness` — object, action, role, identifier, missing check, and exact demonstrated access.
4. `## Three rendering contexts` — display-name, email-to-friend preview, and blog-history preview as independent sinks.
5. `## Stored versus reflected behavior` — persistence and later rendering versus suspected behavior.
6. `## Cookie and session constraints` — `HttpOnly`, `SameSite`, CSP, origin, privilege, and authenticated context.
7. `## What execution proved` — exact inert controlled JavaScript or callback evidence, origin, user context, and minimum retained proof.
8. `## What it did not prove` — account takeover, victim reach, cookie theft, auto-send, admin execution, cross-user persistence, and chain reliability.
9. `## Remediation by boundary` — object authorization, context-specific encoding, URL/HTML handling, CSP, cookie flags, and stored-content cleanup.
10. `## Lessons from chaining moderate findings` — require evidence for every prerequisite.

- [ ] **Step 3: Remove live infrastructure and unsupported chain claims**

Delete every live third-party payload/callback URL. Use inert examples such as `https://callback.invalid/xss-review` only when needed to explain a sanitized request, and label it as a non-resolving replacement. HTML storage plus a broken profile route does not prove stored XSS. A controlled callback proves execution only in its documented origin, session, and rendering context. Do not claim account takeover, cookie exfiltration, victim/admin execution, malicious-email delivery, or a reliable compound exploit without separate evidence for each prerequisite.

Preserve collaborator/guidance credit only when factually verified and disclosure-safe, as restrained text without promotional links or biographies.

- [ ] **Step 4: Verify structure and eliminate live payload/media residue**

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const p = 'src/content/blog/xss-meets-idor.md';
const s = fs.readFileSync(p, 'utf8');
for (const x of ['title: "When Object Authorization and Output Encoding Fail Together"','date: 2025-06-19','category: "research"','draft: true','## Why the chain mattered','## Scope and disclosure','## The object-access weakness','## Three rendering contexts','## Stored versus reflected behavior','## Cookie and session constraints','## What execution proved','## What it did not prove','## Remediation by boundary','## Lessons from chaining moderate findings']) if (!s.includes(x)) throw new Error(`${p}: missing ${x}`);
if (/!\[[^\]]*\]\(|<img\b|cdn-images|medium\.com|js\.rip|xsshunter|trufflesecurity|About the Authors|\.gif\b|[\u{1F300}-\u{1FAFF}]/u.test(s)) throw new Error(`${p}: live payload host, imported media, boilerplate, or emoji remains`);
console.log('PASS xss-meets-idor structure');
NODE
git diff --check -- src/content/blog/xss-meets-idor.md
```

Expected: both commands pass. Do not stage or commit.

---

### Task 9: Add a Localhost-Only Draft Index and Rendered Preview

**Files:**
- Create: `src/pages/drafts/[...slug].astro`
- Reuse without modification: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Consumes: `getCollection('blog')`, `getPostSlug(post)`, `render(post)`, `computeReadTime(body, override)`, `getCategoryLabel(category)`, `BaseLayout`, and `import.meta.env.DEV`.
- Produces in `astro dev` only: `/drafts/` and `/drafts/<one-of-seven-slugs>/`.
- Produces in `astro build`: an empty static path list and therefore no `dist/drafts` route or artifact.

- [ ] **Step 1: Define the fixed review set and development-only paths**

Create `src/pages/drafts/[...slug].astro`. Use a literal, typed review order:

```ts
const REVIEW_SLUGS = [
  'google-dorks-guide',
  'from-shodan-to-sqli',
  'subdomain-takeover',
  'from-dorks-to-defense',
  'business-logic-broken',
  'why-idors-are-everywhere',
  'xss-meets-idor',
] as const;
```

Implement `getStaticPaths()` with this behavior:

1. Return `[]` immediately when `!import.meta.env.DEV`.
2. Load `getCollection('blog', ({ data }) => data.draft)`.
3. Filter to `REVIEW_SLUGS` using `getPostSlug()`; do not expose unrelated drafts.
4. Throw an error listing missing IDs unless all seven entries exist and are drafts.
5. Preserve `REVIEW_SLUGS` order rather than date order.
6. Return one optional-catch-all index path `{ params: { slug: undefined }, props: { mode: 'index', posts } }` plus one detail path per post `{ params: { slug }, props: { mode: 'detail', post, posts } }`.

Using the optional catch-all for index mode is required: a fixed `src/pages/drafts/index.astro` would always be emitted by static production builds, violating the no-artifact requirement.

- [ ] **Step 2: Render the development-only index mode**

For `mode === 'index'`, wrap content in:

```astro
<BaseLayout
  title="Draft previews — local review only"
  description="Local-only editorial previews; these articles are not published."
>
```

Render:

- a prominent banner whose exact visible text is `Draft preview — not published`;
- a sentence that the page exists only under `astro dev` and is not a publication queue or approval signal;
- an ordered list of exactly seven links to `/drafts/<slug>/` showing title and canonical category label;
- no public `/blog/<slug>/` links, publication dates, Article JSON-LD, OG post image, social sharing, comments, related posts, or public post navigation.

Add component-scoped CSS in this page for a high-contrast bordered banner and readable list using existing CSS custom properties (`--border`, `--foreground`, `--muted-foreground`, and `--primary`). Do not modify global styles.

- [ ] **Step 3: Render detail mode with the real content renderer**

For detail mode:

```ts
const { Content, headings } = await render(post);
const readTime = computeReadTime(post.body ?? '', post.data.readTime);
```

Reuse `BaseLayout` and render `<Content />` inside `<div class="prose max-w-none">`. The preview header must include:

- exact banner text `Draft preview — not published`;
- title, computed read time, and category label;
- text `Internal compatibility date: <formatted date> — not a publication date` rather than a normal published `<time>` presentation;
- a link back to `/drafts/`;
- previous/next links based on `REVIEW_SLUGS`, wrapping first-to-last and last-to-first so every preview links among the seven drafts;
- a compact all-seven link list so reviewers can jump directly to any draft.

Use `TableOfContents` only if practical with the returned `headings`; do not use `PostNav` or `RelatedPosts` because those components intentionally construct public `/blog/` links. Do not provide Article JSON-LD, an OG article image, sharing links, Giscus, or a canonical public-blog URL.

- [ ] **Step 4: Add a direct source guard against accidental production paths**

Run:

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const p = 'src/pages/drafts/[...slug].astro';
const s = fs.readFileSync(p, 'utf8');
for (const x of ['import.meta.env.DEV','return []','Draft preview — not published','params: { slug: undefined }','mode: \'index\'','mode: \'detail\'','<Content />','BaseLayout']) if (!s.includes(x)) throw new Error(`${p}: missing ${x}`);
for (const slug of ['google-dorks-guide','from-shodan-to-sqli','subdomain-takeover','from-dorks-to-defense','business-logic-broken','why-idors-are-everywhere','xss-meets-idor']) if (!s.includes(`'${slug}'`)) throw new Error(`${p}: missing review slug ${slug}`);
if (/href=[^\n]*[`'"]\/blog\//.test(s)) throw new Error(`${p}: public blog link found in draft preview`);
console.log('PASS development-only draft preview source guard');
NODE
npm run check
```

Expected: source guard prints `PASS development-only draft preview source guard`; Astro check exits 0 with no errors.

- [ ] **Step 5: Review the preview diff only**

```bash
cd /home/het/Personal/networkshard.com
git diff -- src/pages/drafts/'[...slug].astro'
git diff --check -- src/pages/drafts/'[...slug].astro'
```

Expected: only the development-gated optional catch-all is added. Do not stage or commit.

---

### Task 10: Run Cross-Draft Editorial, Evidence, Disclosure, and Safety Gates

**Files:**
- Review/modify as corrections require: all seven `src/content/blog/<slug>.md` files
- Do not create an in-repository review packet.

**Interfaces:**
- Consumes: seven draft entries and seven private claim ledgers.
- Produces: seven separately reviewed decisions: `approve draft for technical preview`, `return for named corrections`, or `keep indefinitely as draft`. This task does not produce publication approval.

- [ ] **Step 1: Run a machine-checkable seven-file inventory/frontmatter/date gate**

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
const expected = {
  'google-dorks-guide': ['What Google Can Reveal About Your Attack Surface—and What It Cannot','2025-04-24','guides'],
  'from-shodan-to-sqli': ['From an Exposed Service to a SQL Injection Finding','2025-08-28','research'],
  'subdomain-takeover': ['I Thought I Found a Subdomain Takeover. I Had Not.','2025-07-05','research'],
  'from-dorks-to-defense': ['From Search Results to Two CERT-In Recognitions','2025-11-25','research'],
  'business-logic-broken': ['Five Findings That Looked Small Until I Followed the State','2025-07-19','research'],
  'why-idors-are-everywhere': ['The Invoice Number Changed. The Authorization Decision Did Not.','2025-06-15','research'],
  'xss-meets-idor': ['When Object Authorization and Output Encoding Fail Together','2025-06-19','research'],
};
for (const [slug, [title, date, category]] of Object.entries(expected)) {
  const p = `src/content/blog/${slug}.md`;
  if (!fs.existsSync(p)) throw new Error(`missing ${p}`);
  const s = fs.readFileSync(p, 'utf8');
  for (const x of [`title: "${title}"`,`date: ${date}`,`category: "${category}"`,'draft: true']) if (!s.includes(x)) throw new Error(`${p}: missing ${x}`);
}
console.log('PASS seven draft slugs, titles, compatibility dates, categories, and draft flags');
NODE
```

Expected: the PASS line prints. A date mismatch is a failure; do not “fix” it by inventing a newer date.

- [ ] **Step 2: Run text-only, secret-pattern, and external-media gates**

```bash
cd /home/het/Personal/networkshard.com
files=(
  src/content/blog/google-dorks-guide.md
  src/content/blog/from-shodan-to-sqli.md
  src/content/blog/subdomain-takeover.md
  src/content/blog/from-dorks-to-defense.md
  src/content/blog/business-logic-broken.md
  src/content/blog/why-idors-are-everywhere.md
  src/content/blog/xss-meets-idor.md
)
if rg -n '!\[[^]]*\]\(|<img\b|cdn-images|medium\.com|\.gif\b|js\.rip|xsshunter|trufflesecurity|AKIA[0-9A-Z]{16}|-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----|(?i)(access[_-]?token|api[_-]?key|client[_-]?secret)\s*[:=]\s*["'"'][^"'"']{8,}' "${files[@]}"; then
  echo 'FAIL: forbidden media, live infrastructure, or secret-like content found' >&2
  exit 1
fi
printf 'PASS text-only and secret-pattern gate\n'
```

Expected: `PASS text-only and secret-pattern gate`. Treat any match as a manual-review blocker even if it appears to be an example; replace it with an inert, unmistakably fake value or explanatory prose.

- [ ] **Step 3: Perform a separate factual review for each post**

For each draft, walk every material sentence against its private ledger and record one of four dispositions: supported as observation, explicitly identified inference, narrowly validated result, or unresolved/removed. Confirm technical sequence, event dates, names, tested identities/roles, sample size, stop conditions, and exact observed responses. A sentence with no ledger mapping must be narrowed or removed before that post passes.

- [ ] **Step 4: Perform a separate disclosure and safety review for each post**

Confirm for each draft:

1. scope and timeframe evidence exists for any authorization statement;
2. organization/platform/contributor naming is permitted and accurate;
3. no redaction can be reversed from surrounding detail;
4. no personal data, secrets, vulnerable host, sensitive parameter value, or reusable payload host remains;
5. report, acknowledgement, remediation, retest, and recognition each have separate support;
6. unresolved live-target exposure blocks publication;
7. the `Scope and disclosure` section states controlled/real/reconstructed evidence and uses `not confirmed` for undocumented status.

- [ ] **Step 5: Perform a post-specific claim-boundary review**

Use these exact rejection tests:

- `google-dorks-guide`: reject search result = access/inventory/vulnerability/impact and sensational target examples.
- `from-shodan-to-sqli`: reject Shodan = SQLi, unsupported authorization, data access, compromise, impact, remediation, or retest.
- `subdomain-takeover`: reject any confirmed/claimable/successful takeover or impact statement.
- `from-dorks-to-defense`: reject recognition = authorization/validation/severity/remediation/endorsement/impact.
- `business-logic-broken`: reject client response manipulation = server state and unsupported takeover/wallet/loss/upload/mobile claims.
- `why-idors-are-everywhere`: reject sequential ID = BOLA and unsupported scale/card/ATO/legal/mutation/privilege claims.
- `xss-meets-idor`: reject coexisting IDOR/XSS-like behavior = reliable chain/ATO/cookie theft/victim/admin execution/delivery.

- [ ] **Step 6: Perform media, source, copy, and non-imitation review per post**

Confirm no imported prose survived except unavoidable sanitized technical literals; citations prefer current primary sources; every fenced request/response parses visually and explains both support and limits; headings are descriptive and emoji-free; opening is direct and first-person; paragraphs are short; ending records a concrete methodological change; no promotional CTA, unsupported severity, superlative, sensational framing, or recognizable phrase/voice imitation remains.

- [ ] **Step 7: Record independent draft-review outcomes outside the repository**

For each slug, record reviewer, date, factual result, disclosure/safety result, claim-boundary result, media/source result, copy result, unresolved corrections, and one decision: `technical preview approved`, `returned for corrections`, or `remain draft`. Passing one post has no effect on the other six and does not authorize publication or date changes.

---

### Task 11: Verify Production Exclusion and Local Browser Review

**Files:**
- Verify all implementation files and generated output.
- Do not modify or commit generated `dist/` output.

**Interfaces:**
- Consumes: complete seven-draft rewrite, development preview route, all existing public publication filters.
- Produces: command evidence that production has no draft artifacts and browser evidence that localhost preview renders all seven drafts correctly.

- [ ] **Step 1: Run repository validation**

```bash
cd /home/het/Personal/networkshard.com
git diff --check
npm run check
rm -rf dist
npm run build
```

Expected: all commands exit 0. The clean rebuild is necessary so stale preview files cannot affect exclusion checks.

- [ ] **Step 2: Prove production has no `/drafts` route or files**

```bash
cd /home/het/Personal/networkshard.com
if find dist -path '*/drafts' -o -path '*/drafts/*' | grep -q .; then
  echo 'FAIL: production draft preview artifact exists' >&2
  find dist -path '*/drafts' -o -path '*/drafts/*'
  exit 1
fi
printf 'PASS no production /drafts artifacts\n'
```

Expected: `PASS no production /drafts artifacts`.

- [ ] **Step 3: Prove production has no seven-slug blog, OG, search, RSS, or sitemap references**

```bash
cd /home/het/Personal/networkshard.com
node --input-type=module <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
const slugs = ['google-dorks-guide','from-shodan-to-sqli','subdomain-takeover','from-dorks-to-defense','business-logic-broken','why-idors-are-everywhere','xss-meets-idor'];
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p); else files.push(p);
  }
}
walk('dist');
for (const slug of slugs) {
  const forbiddenPaths = [`dist/blog/${slug}/index.html`, `dist/og/${slug}.png`];
  for (const p of forbiddenPaths) if (fs.existsSync(p)) throw new Error(`draft artifact exists: ${p}`);
  for (const p of files) {
    if (!/\.(?:html|json|xml|txt|js|map)$/i.test(p)) continue;
    const text = fs.readFileSync(p, 'utf8');
    if (text.includes(slug)) throw new Error(`draft slug ${slug} leaked into ${p}`);
  }
}
console.log('PASS no draft blog/OG/search/RSS/sitemap/listing/navigation references in production output');
NODE
```

Expected: the PASS line prints. This broad text scan also covers `/blog`, category/tag listings, related links, post navigation, search JSON, RSS, sitemap, and other generated textual artifacts.

- [ ] **Step 4: Start the development server for local-only review**

Run in a dedicated terminal:

```bash
cd /home/het/Personal/networkshard.com
npm run dev -- --host 127.0.0.1 --port 4321
```

Expected: Astro reports a local URL at `http://127.0.0.1:4321/`. Binding explicitly to `127.0.0.1` prevents LAN exposure.

- [ ] **Step 5: Smoke-test all development preview routes from the command line**

Run in another terminal:

```bash
cd /home/het/Personal/networkshard.com
for route in \
  drafts/ \
  drafts/google-dorks-guide/ \
  drafts/from-shodan-to-sqli/ \
  drafts/subdomain-takeover/ \
  drafts/from-dorks-to-defense/ \
  drafts/business-logic-broken/ \
  drafts/why-idors-are-everywhere/ \
  drafts/xss-meets-idor/
do
  body=$(curl --fail --silent --show-error "http://127.0.0.1:4321/$route") || exit 1
  printf '%s' "$body" | grep -Fq 'Draft preview — not published' || {
    printf 'missing draft banner on /%s\n' "$route" >&2
    exit 1
  }
  printf 'PASS /%s\n' "$route"
done
```

Expected: eight PASS lines, one index and seven detail pages.

- [ ] **Step 6: Perform desktop browser review at 1440 × 900**

Using browser automation or a normal browser, open `http://127.0.0.1:4321/drafts/` and then each seven-draft link. For every page verify:

1. exact banner `Draft preview — not published` is visible without scrolling;
2. title and category are correct;
3. compatibility date is explicitly labelled not a publication date;
4. rendered Markdown headings, tables, blockquotes, fenced requests/responses, inline code, and links are readable;
5. no broken image placeholder or external old-media request appears;
6. back, previous, next, and all-seven navigation remain under `/drafts/`;
7. no public sharing, comments, related-post, public post navigation, or published-article metadata UI appears;
8. browser console contains no errors;
9. network log contains no Medium CDN, GIF, live payload/callback, or sensitive target request.

- [ ] **Step 7: Perform mobile and theme browser review**

Resize to 390 × 844, review the index and all seven detail pages, and test both light and dark themes. Verify no horizontal page overflow, pre/code blocks scroll within their container, long sanitized URLs wrap or scroll safely, banner text remains visible, focus indicators are visible during keyboard navigation, and previous/next/all-draft links remain usable. Repeat one representative page at 768 × 1024 to catch tablet layout regressions.

- [ ] **Step 8: Confirm public routes still exclude drafts while dev preview works**

In the same development server, open `/blog/`, `/categories/research/`, `/categories/guides/`, `/blog/search.json`, `/rss.xml`, and `/og/<each-seven-slug>.png`. Verify none of the seven appears in blog/category/search/RSS; each draft public `/blog/<slug>/` and `/og/<slug>.png` route returns 404. Tag pages and published post related/previous/next links must also contain none of the seven.

- [ ] **Step 9: Stop the server and run final scoped diff review**

Stop Astro with `Ctrl-C`, then run:

```bash
cd /home/het/Personal/networkshard.com
git diff --check
git status --short
git diff -- \
  src/content/blog/google-dorks-guide.md \
  src/content/blog/from-shodan-to-sqli.md \
  src/content/blog/subdomain-takeover.md \
  src/content/blog/from-dorks-to-defense.md \
  src/content/blog/business-logic-broken.md \
  src/content/blog/why-idors-are-everywhere.md \
  src/content/blog/xss-meets-idor.md \
  src/pages/drafts/'[...slug].astro'
```

Expected: only the eight planned implementation files differ from their starting state; pre-existing unrelated work remains untouched. Confirm no `dist/` file is tracked or staged. Do not commit or push.

---

## Per-Post Publication Gate (Not Part of This Rewrite Implementation)

The implementation ends with all seven posts as drafts. When a reviewer later considers one post for publication, perform these actions for that post only:

1. Re-run its factual, authorization, disclosure, safety, claim-boundary, media/source, and copy reviews against the private evidence packet.
2. Resolve every correction or choose to keep it indefinitely as a draft.
3. After explicit approval, replace only that post's compatibility date with its actual publication date and then change only that post to `draft: false` (or remove the draft flag according to the repository convention).
4. Re-run `git diff --check`, `npm run check`, `rm -rf dist && npm run build`, and generated-output review.
5. Confirm its preserved `/blog/<slug>/` route, metadata, OG image, search record, RSS item, sitemap entry, category/tag listings, and navigation are correct while all six sibling drafts remain absent.
6. Record later remediation facts as dated amendments supported by evidence; do not silently rewrite chronology.

Passing technical preview or editorial review for one post never approves another post and never authorizes an all-seven publication batch.
