# Seven-Post Evidence Restoration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the concrete, safe, evidence-bounded technical chronology of seven draft security posts and their exact 37 first-party evidence assets without publishing the drafts or changing unrelated site behavior.

**Architecture:** Treat `bf4f644` as the immutable binary and historical-sequence source, and treat the current drafts plus the approved design as the claim-boundary source. Restore and verify assets first, then reconstruct independent article groups with local images, sanitized technical literals, adjacent captions/caveats, and finally validate localhost-only draft rendering and production exclusion.

**Tech Stack:** Astro 7.1.5 content collections, Markdown, Node.js >=22.12.0, npm, Git object plumbing, POSIX shell, Python 3, `sha256sum`, `file`, `curl`, and local browser developer tools.

## Global Constraints

- Modify only the seven files listed below and the exact 37 files listed in the asset manifest; do not change slugs, routes, categories, dates, layouts, components, configuration, unrelated posts, or site behavior.
- Keep `draft: true` in all seven sources; do not assign new publication dates or treat restoration as publication approval.
- Preview only through the existing development-only `/drafts/<slug>/` route on localhost; do not add a deployed preview, public draft URL, bypass header, feature flag, middleware exception, or production exception.
- Commit `bf4f644` (`Self-host blog images from Medium CDN`) is the canonical binary source; never download replacements, rename, recompress, convert, or substitute assets.
- Restore only the matrix's 37 assets. Do not restore or reference decorative GIFs, memes, reaction images, title cards, author graphics, decorative hacker images, or any historical image outside the manifest.
- Inspect every selected image at readable size before use. Redact only secrets, personal data, live hostnames, email addresses, tokens, cookies, unique user identifiers, and operationally reusable target details; never obscure the technical observation used as evidence or invent pixels.
- Before any redaction, verify byte identity against `bf4f644`. Preserve each exact public path after an approved redaction and record every changed binary during factual review; an edited public image is intentionally expected to differ from the canonical checksum.
- Every selected image needs descriptive alt text and an adjacent visible caption that identifies its sequence position, visible observation, evidence type, narrow proof boundary, and material non-proof boundary.
- Reconstructed snippets must be valid, line-broken, language-labelled (`http`, `json`, `text`, `bash`, `dns`, or `html` as appropriate), internally consistent, and labelled **Sanitized reconstruction** when reconstructed from an image or historical prose.
- Use inert values consistently: `target.example`, `USER-A`, `USER-B`, `OBJECT-001`, `OBJECT-002`, `[session omitted]`, and `[redacted]`. Never expose a live payload host, working credential, cookie, personal record, vulnerable endpoint, XSS Hunter URL, or `js.rip` URL.
- Preserve useful original chronology, endpoint/parameter shapes, response transitions, UI states, collaboration credits, guidance credits, CERT-In recognition, and supported organization names, but rewrite in original NetworkShard prose rather than copying old Medium prose or imitating `mll.sh`.
- Keep each limitation adjacent to the claim, image, or sequence it qualifies. Do not let screenshots or snippets imply SQL injection, takeover, authorization bypass, XSS reach, financial loss, recognition scope, remediation, or retest beyond the observed fact.
- No active testing of historical targets, provider-resource claims, data enumeration, account access, or new validation is permitted.
- Do not commit or push. All commands in this plan stop at working-tree verification.

---

## File Structure

- Create: `public/images/blog/from-shodan-to-sqli/` — six restored discovery, navigation, error, and rendered-state captures.
- Create: `public/images/blog/subdomain-takeover/` — two restored scanner and manual-DNS captures.
- Create: `public/images/blog/from-dorks-to-defense/` — four technical captures plus September and October 2025 CERT-In recognition records.
- Create: `public/images/blog/business-logic-broken/` — thirteen captures spanning four state-transition findings.
- Create: `public/images/blog/why-idors-are-everywhere/` — baseline and changed-invoice records.
- Create: `public/images/blog/xss-meets-idor/` — eight captures separating storage, object access, and controlled execution.
- Modify: `src/content/blog/google-dorks-guide.md` — method-led defensive indexed-exposure workflow with no images.
- Modify: `src/content/blog/from-shodan-to-sqli.md` — service → directory → login → error → dashboard chronology.
- Modify: `src/content/blog/subdomain-takeover.md` — scanner lead disproved by manual DNS evidence.
- Modify: `src/content/blog/from-dorks-to-defense.md` — search-led technical evidence and two separate CERT-In recognition sections.
- Modify: `src/content/blog/business-logic-broken.md` — four evidence-backed client/server state sequences, despite the retained title's count.
- Modify: `src/content/blog/why-idors-are-everywhere.md` — controlled own-object versus changed-object invoice comparison.
- Modify: `src/content/blog/xss-meets-idor.md` — distinct display-name storage, BlogID access, execution sink, and chain-prerequisite analysis.

### Task 1: Restore and Verify the Canonical 37-Asset Set

**Files:**
- Create: `public/images/blog/from-shodan-to-sqli/` and the six manifest files below
- Create: `public/images/blog/subdomain-takeover/` and the two manifest files below
- Create: `public/images/blog/from-dorks-to-defense/` and the six manifest files below
- Create: `public/images/blog/business-logic-broken/` and the thirteen manifest files below
- Create: `public/images/blog/why-idors-are-everywhere/` and the two manifest files below
- Create: `public/images/blog/xss-meets-idor/` and the eight manifest files below

**Interfaces:**
- Consumes: Git commit `bf4f644` and the approved 37-path matrix.
- Produces: exactly 37 first-party evidence paths for Tasks 3–6, with canonical pre-redaction SHA-256 and MIME identity verified.

- [ ] **Step 1: Confirm the canonical commit and create exactly the six post directories**

Run from the repository root:

```bash
git cat-file -e bf4f644^{commit}
mkdir -p \
  public/images/blog/from-shodan-to-sqli \
  public/images/blog/subdomain-takeover \
  public/images/blog/from-dorks-to-defense \
  public/images/blog/business-logic-broken \
  public/images/blog/why-idors-are-everywhere \
  public/images/blog/xss-meets-idor
```

Expected: `git cat-file` exits 0; all six directories exist. There is deliberately no `public/images/blog/google-dorks-guide/` creation command because that post restores zero assets.

- [ ] **Step 2: Restore all 37 exact paths directly from the canonical commit**

Run this exact command; it names every allowed path and no omitted decorative asset:

```bash
git restore --source=bf4f644 -- \
  public/images/blog/from-shodan-to-sqli/1_Cl2IrfAiJoOR9jfZf-maWA.png \
  public/images/blog/from-shodan-to-sqli/1_VWcHFyy6JiBbMCnefzWX5w.png \
  public/images/blog/from-shodan-to-sqli/1_j5SQexw4h8RuJ4kqRYhvjw.png \
  public/images/blog/from-shodan-to-sqli/1_AUm2rqX_fxkcEf8bpALKpA.png \
  public/images/blog/from-shodan-to-sqli/1_LZ02PKRCZHqgRjI1dlmu5Q.png \
  public/images/blog/from-shodan-to-sqli/1_lwKIbkv_c5dRnE3HtLsBlw.png \
  public/images/blog/subdomain-takeover/1_stBzv0SOC1jbQJFOrxpHqQ.png \
  public/images/blog/subdomain-takeover/1_076ZcP-S1SucdfUyhwY1-w.png \
  public/images/blog/from-dorks-to-defense/1_p0iY_bLGcryt7loqJ2s12Q.png \
  public/images/blog/from-dorks-to-defense/1_5d4F_vbMcVmiJidEqPK91Q.jpeg \
  public/images/blog/from-dorks-to-defense/1_GbClUe79xPv9M3own-G4jQ.png \
  public/images/blog/from-dorks-to-defense/1_CwwUwpGMYV0yHRDyBAVjvQ.png \
  public/images/blog/from-dorks-to-defense/1_3vdr2a9sNeUeRmFGYdS9bw.jpeg \
  public/images/blog/from-dorks-to-defense/1_oT6i9Y-R4OfGCkdW_3e4Sw.jpeg \
  public/images/blog/business-logic-broken/1_ISlZNs5U8yhWUcYqQ53hJA.png \
  public/images/blog/business-logic-broken/1_X1WTxTOoDBUhR-gQQ3KS4Q.png \
  public/images/blog/business-logic-broken/1_-jCinslcxVfUcUe5HnmM3w.png \
  public/images/blog/business-logic-broken/1__5KiJYxi6IGomC71-Xi8SA.png \
  public/images/blog/business-logic-broken/1_3xHhbSWjzCG7U4h__Ft6iw.png \
  public/images/blog/business-logic-broken/1_NY0xBDOplm6UryRAO7dwFA.png \
  public/images/blog/business-logic-broken/1_J-RfkqTIfbZVjgCw4kyaEw.png \
  public/images/blog/business-logic-broken/1_Op1wySX9A6LJ526vt5tzUQ.png \
  public/images/blog/business-logic-broken/1_nsKwQTnOBSCpAzGjznbOdw.png \
  public/images/blog/business-logic-broken/1_kL9iuOuwK-2WNXx130-Giw.png \
  public/images/blog/business-logic-broken/1_pzllGmbVBjXo5OLoO7nx_A.png \
  public/images/blog/business-logic-broken/1_d2PqU5MjQMfPVS3k2VbvFA.png \
  public/images/blog/business-logic-broken/1_R0In7t2awqNoIebmU9uRuA.png \
  public/images/blog/why-idors-are-everywhere/1_QiG3-3uCdmdeR9J5xOAHNw.png \
  public/images/blog/why-idors-are-everywhere/1_6pz8TufSLIgbyl6L2znOtw.png \
  public/images/blog/xss-meets-idor/1_qD1T7WsNoTNQ_vjk-7FOGw.png \
  public/images/blog/xss-meets-idor/1_dDLYp9D9VyWbUJ6TTujrGQ.png \
  public/images/blog/xss-meets-idor/1_8l28WFqP2t2sXStcoz27Ow.png \
  public/images/blog/xss-meets-idor/1_Ts-QklEQHbd8VxUyS4BmAA.png \
  public/images/blog/xss-meets-idor/1_UUZy1MlsHL3uf5B2O7D1Gg.png \
  public/images/blog/xss-meets-idor/1_fs4cebCQwdhbZLPNjtAS4g.png \
  public/images/blog/xss-meets-idor/1_EL66xFbcSV0Mrf56XnYm7Q.png \
  public/images/blog/xss-meets-idor/1_YJm-tFIO2E7D2w7e_Lr2tQ.png
```

Expected: command exits 0 and restores only the named files.

- [ ] **Step 3: Assert exact pre-redaction SHA-256 identity for every asset**

Run:

```bash
sha256sum -c <<'SHA256'
2cf4af6dbf242ddbcae137bb073b311fd4911e9767f90971bfd7899008ad7065  public/images/blog/from-shodan-to-sqli/1_Cl2IrfAiJoOR9jfZf-maWA.png
eabf0bd17e484196646b52b532171d91fb9b172e5815e6ee9437f849c87bfaaa  public/images/blog/from-shodan-to-sqli/1_VWcHFyy6JiBbMCnefzWX5w.png
cd78987e43cc77c229340d39f79660654b1f4710ab7e8a39a510a9928a884a8f  public/images/blog/from-shodan-to-sqli/1_j5SQexw4h8RuJ4kqRYhvjw.png
ee0b3488610699753bff752bc5f319b491a039d30620d750192c4e9ff2f74cf7  public/images/blog/from-shodan-to-sqli/1_AUm2rqX_fxkcEf8bpALKpA.png
332624903d70c0a01a476d793a75ca763d7f298694c61a109003035cd134dbc5  public/images/blog/from-shodan-to-sqli/1_LZ02PKRCZHqgRjI1dlmu5Q.png
69143a65ce1126104d3b2a31094bd821bf62cc8089207664b4943c04cd517ee5  public/images/blog/from-shodan-to-sqli/1_lwKIbkv_c5dRnE3HtLsBlw.png
5a43a2c3cf862f3e7923977f8def913ee94d02ac50a71cec77ad593038a4b91f  public/images/blog/subdomain-takeover/1_stBzv0SOC1jbQJFOrxpHqQ.png
ead3d3944488fb813600b2963a0f90912be420a2498ffef379e1171396469404  public/images/blog/subdomain-takeover/1_076ZcP-S1SucdfUyhwY1-w.png
fa934de2acb17d2c58e724b5c5bb26287c00e1174b6580d3af56c26bb1dd4254  public/images/blog/from-dorks-to-defense/1_p0iY_bLGcryt7loqJ2s12Q.png
9444650e34e9c800bce69ace53ccbfbce0606993447f9028a999f3b8f65ced09  public/images/blog/from-dorks-to-defense/1_5d4F_vbMcVmiJidEqPK91Q.jpeg
01214c13e7e6489dc2167361a5c5e900eb202eb6c1dfeef07da2b6dc08142997  public/images/blog/from-dorks-to-defense/1_GbClUe79xPv9M3own-G4jQ.png
0c910fd9d4328b033943d25117fbcefda6b21fc9ba33e9f895614de3919a2765  public/images/blog/from-dorks-to-defense/1_CwwUwpGMYV0yHRDyBAVjvQ.png
05788179bffcd66ed33d1320deade20e807b9c99fc5f10cefb158b47f18d2dbd  public/images/blog/from-dorks-to-defense/1_3vdr2a9sNeUeRmFGYdS9bw.jpeg
de33cd78db711ebdf722ec542deb624513f2d1984b725683cc5eb7cde72fb711  public/images/blog/from-dorks-to-defense/1_oT6i9Y-R4OfGCkdW_3e4Sw.jpeg
3543bee70355aea556af97a937ff4c882e50e47beada6e492245e6685a326d1b  public/images/blog/business-logic-broken/1_ISlZNs5U8yhWUcYqQ53hJA.png
677c5d27b8b690c875207b60f2ec7e4972c1faef2d0cae9f3b0181401da7de6c  public/images/blog/business-logic-broken/1_X1WTxTOoDBUhR-gQQ3KS4Q.png
3536bca46c81e6ac28f6bf9fafef778aafca76f24d92297d2a622428c234b74f  public/images/blog/business-logic-broken/1_-jCinslcxVfUcUe5HnmM3w.png
68c31d71b779ca133b0d35e27e8580328ee63c944d540b59b2fc8ff07a885085  public/images/blog/business-logic-broken/1__5KiJYxi6IGomC71-Xi8SA.png
6f023c1202934f8f9365df74abacdae860948593fc52d436f95774fb8d8d19cb  public/images/blog/business-logic-broken/1_3xHhbSWjzCG7U4h__Ft6iw.png
a63c9b37bc2bb6b44ef1c9aa5d3a19def081f4caab46c122c347b662da56156d  public/images/blog/business-logic-broken/1_NY0xBDOplm6UryRAO7dwFA.png
12adf6e37bcc1bad7601869a1867d0c7df65cfd8fb86d80a429a15e888d70f56  public/images/blog/business-logic-broken/1_J-RfkqTIfbZVjgCw4kyaEw.png
83df13d4c49b2fd4908e3c59f0c4e5344584ffcca5389cbd3619c14adc71128d  public/images/blog/business-logic-broken/1_Op1wySX9A6LJ526vt5tzUQ.png
7ddb274d3ba543e4c04529433455e87345660a876268b3bb62f46b656dbc506d  public/images/blog/business-logic-broken/1_nsKwQTnOBSCpAzGjznbOdw.png
209fe0eda72cebb8223e7408355856cdf39bc45dd45e543340fe3734682bb322  public/images/blog/business-logic-broken/1_kL9iuOuwK-2WNXx130-Giw.png
c9ab9891882bbfd01c164b1ee537b0df4620a6cfc150d2bd1ea248847077ea85  public/images/blog/business-logic-broken/1_pzllGmbVBjXo5OLoO7nx_A.png
bb3b2766dd8aa96a21c10c26b65332e90fc4e4b1f2056a7ee4dbf71897db85ad  public/images/blog/business-logic-broken/1_d2PqU5MjQMfPVS3k2VbvFA.png
f99e43cb1a33db933c6ce8ae78e4bafa29542040f9952699c9f6e56d5f637cfa  public/images/blog/business-logic-broken/1_R0In7t2awqNoIebmU9uRuA.png
5853aca9d49f95d1482f987ec98a207ab8cd547a519f7afcc72030ddecace1bc  public/images/blog/why-idors-are-everywhere/1_QiG3-3uCdmdeR9J5xOAHNw.png
4ee9b0441a14c7e5613247fea73bc17644bf7e516f624bd78d9d707bba05045f  public/images/blog/why-idors-are-everywhere/1_6pz8TufSLIgbyl6L2znOtw.png
4df05b078504790d35d7f796bdcc1191d077c71a7cbd9a0380df3987c99379d5  public/images/blog/xss-meets-idor/1_qD1T7WsNoTNQ_vjk-7FOGw.png
56ed16eccbcdf03a6b92cffe1f0445e72149667934cf964af3bdaac643cc614c  public/images/blog/xss-meets-idor/1_dDLYp9D9VyWbUJ6TTujrGQ.png
e2e5a09cd2178e4d1bdf39111c8a0d0edbe5a127558cb68bed7b5e860b7bf34d  public/images/blog/xss-meets-idor/1_8l28WFqP2t2sXStcoz27Ow.png
2c65767a12b34af46ff8ba2bbcda44326514bb7bdcf5737116190e6182ff2028  public/images/blog/xss-meets-idor/1_Ts-QklEQHbd8VxUyS4BmAA.png
2f853fbcd8454e4cee82aed69637d8b7771b7573d5cd0923f9536e1ac52b419a  public/images/blog/xss-meets-idor/1_UUZy1MlsHL3uf5B2O7D1Gg.png
81dc256c351df5c9694801a1806143c2a4f0090403f2fe9672deec9b346f473a  public/images/blog/xss-meets-idor/1_fs4cebCQwdhbZLPNjtAS4g.png
855d7c94b5cbb5e679046ca56491a7e46e88e806c9adc442e935d6f6ce2df43f  public/images/blog/xss-meets-idor/1_EL66xFbcSV0Mrf56XnYm7Q.png
09baff9f143ac25be0037155e331e95a8e0cd7cc3ab9b4837e5f3f1ab27138dc  public/images/blog/xss-meets-idor/1_YJm-tFIO2E7D2w7e_Lr2tQ.png
SHA256
```

Expected: 37 `OK` lines and no `FAILED` line. Save the terminal output in the implementation review record before editing any binary.

- [ ] **Step 4: Assert exact path count, extension, and file type**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
roots = {
    'from-shodan-to-sqli': 6,
    'subdomain-takeover': 2,
    'from-dorks-to-defense': 6,
    'business-logic-broken': 13,
    'why-idors-are-everywhere': 2,
    'xss-meets-idor': 8,
}
files = []
for slug, expected in roots.items():
    current = sorted(p for p in Path('public/images/blog', slug).iterdir() if p.is_file())
    assert len(current) == expected, (slug, len(current), expected)
    assert not any(p.suffix.lower() == '.gif' for p in current), slug
    files.extend(current)
assert len(files) == 37, len(files)
print('exact asset count: 37')
PY

while IFS= read -r path; do
  mime=$(file -b --mime-type "$path")
  case "$path:$mime" in
    *.png:image/png|*.jpeg:image/jpeg) ;;
    *) printf 'unexpected type: %s -> %s\n' "$path" "$mime" >&2; exit 1 ;;
  esac
done < <(find \
  public/images/blog/from-shodan-to-sqli \
  public/images/blog/subdomain-takeover \
  public/images/blog/from-dorks-to-defense \
  public/images/blog/business-logic-broken \
  public/images/blog/why-idors-are-everywhere \
  public/images/blog/xss-meets-idor \
  -maxdepth 1 -type f -print | sort)
```

Expected: `exact asset count: 37`; every `.png` is `image/png`, every `.jpeg` is `image/jpeg`, and the loop exits 0.

- [ ] **Step 5: Inspect all 37 images at readable size and decide redactions before article editing**

Open each directory in an image viewer at 100% zoom, compare its position against `git show bf4f644:src/content/blog/<slug>.md`, and record for each file: visible technical fact, sensitive regions, intended alt text, caption boundary, and `unchanged` or `redacted`. The review must explicitly examine live hosts/IPs, server paths, query text, organization names, email addresses, cookies/tokens, user IDs, invoice/customer fields, and callback data.

Redaction decisions must preserve the visible status code, method, parameter, response field, DNS result, UI transition, distinct-record evidence, execution origin/context, or recognition entry that the caption cites. Use opaque filled rectangles rather than blur; retain the exact filename, dimensions, and format. Do not redact CERT-In's organization name or the author's recognition entry merely because it is a name selected for retention.

Expected: every image has an explicit inspection decision; no image is used as an uncaptioned hero or stacked without transition prose.

- [ ] **Step 6: Re-run structural assertions after approved redactions**

Run the Step 4 count/type assertions again. Run the Step 3 checksum assertion once more and interpret results strictly: every unchanged file must remain `OK`; every checksum difference must correspond exactly to an image recorded as `redacted` in author review. For each redacted image, compare `git show bf4f644:<path>` with the public image side by side to confirm that only sensitive regions changed and the relied-upon evidence remains visible.

Expected: 37 files remain at their exact paths and original MIME formats; there are no unexplained checksum changes.

### Task 2: Reconstruct the Method Guide and False-Positive Investigation

**Files:**
- Modify: `src/content/blog/google-dorks-guide.md`
- Modify: `src/content/blog/subdomain-takeover.md`
- Use: `public/images/blog/subdomain-takeover/1_stBzv0SOC1jbQJFOrxpHqQ.png`
- Use: `public/images/blog/subdomain-takeover/1_076ZcP-S1SucdfUyhwY1-w.png`

**Interfaces:**
- Consumes: Task 1's verified local assets and the historical Markdown at `bf4f644` for chronology only.
- Produces: one image-free defensive guide and one two-image false-positive case study, both remaining local-only drafts.

- [ ] **Step 1: Reconstruct `google-dorks-guide.md` as a complete authorized workflow**

Retain exactly the approved title `What Google Can Reveal About Your Attack Surface—and What It Cannot`, category `guides`, existing date/slug/tags unless prose accuracy requires read-time adjustment, and `draft: true`. Keep the direct owned-page opening, then cover this exact flow in order:

1. owned or explicitly authorized domain, reviewer, handling rules, and stop conditions;
2. narrow current-primary-documentation examples for `site:`, exact phrase, `-` exclusion, `filetype:`, `before:`, and `after:`;
3. a query/timestamp evidence log;
4. triage into public-by-design, stale, metadata exposure, access-control concern, and false positive;
5. permitted live-response verification with status/content comparison;
6. minimal evidence retention and the correct internal/disclosure channel; and
7. separate search removal, `noindex`, and `robots.txt` from authentication/authorization fixes.

Include these inert, readable examples rather than historical query-card images:

```text
site:docs.example.com filetype:pdf "release notes"
site:docs.example.com "internal use" -template
site:docs.example.com after:2025-01-01 before:2026-01-01
```

Include a compact evidence-log table with concrete example values: UTC timestamp `2026-07-29T10:00:00Z`, scoped host `docs.example.com`, exact query, result URL `https://docs.example.com/release-notes.pdf`, triage state `Public by design`, live verification `200; owner confirmed public`, and retention action `URL/query/timestamp only`. State beside `site:` that it is not exhaustive and beside result interpretation that indexing does not prove vulnerability, privileged access, exploitation, or a complete asset inventory.

Remove every image reference and avoid credential-hunting query lists. Retain only links to current primary Google documentation used by the draft.

- [ ] **Step 2: Reconstruct `subdomain-takeover.md` through the false-positive stop decision**

Retain exactly the approved title `I Thought I Found a Subdomain Takeover. I Had Not.`, category `research`, existing date/slug/tags, and `draft: true`. Keep the business-news context only as motivation, preserve Kaif Shah/Shah Kaif's collaborator credit with one consistent spelling after author review, and narrate: enumeration → S3-labelled scanner warning → manual `CNAME`/`TXT` checks → absent expected provider routing chain → TXT limitation → dangling DNS/missing binding/external claimability distinction → stop without provider claim.

Immediately after the scanner setup, insert:

```markdown
![Redacted takeover-scanner results listing an S3-labelled candidate host](/images/blog/subdomain-takeover/1_stBzv0SOC1jbQJFOrxpHqQ.png)
*Original evidence, discovery step: the scanner flagged redacted hostnames, including an S3-labelled candidate. This is a lead only; it does not establish DNS delegation, provider ownership, a missing resource, external claimability, or takeover.*
```

Beside the manual-DNS artifact, include a visibly labelled reconstruction:

```markdown
**Sanitized reconstruction**

```dns
$ dig CNAME asset.target.example
;; status: NOERROR
;; ANSWER: no CNAME record

$ dig TXT asset.target.example
;; status: NOERROR
asset.target.example. 300 IN TXT "[redacted verification value]"
```
```

Then insert:

```markdown
![Redacted manual DNS output showing no expected CNAME chain and a TXT result](/images/blog/subdomain-takeover/1_076ZcP-S1SucdfUyhwY1-w.png)
*Original evidence, manual-check step: the captured output did not show the expected takeover CNAME chain and did show TXT data. It does not prove TXT universally prevents takeover, exclude every other record or historical state, or establish provider-side claimability.*
```

Do not include bucket, application, repository, or provider-claim commands. End affirmatively with the documented false-positive conclusion, not a generic exploitation tutorial.

- [ ] **Step 3: Run content-boundary checks for this article group**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
posts = [Path('src/content/blog/google-dorks-guide.md'), Path('src/content/blog/subdomain-takeover.md')]
for p in posts:
    text = p.read_text()
    assert 'draft: true' in text, p
    assert 'miro.medium.com' not in text and 'cdn-images' not in text, p
    assert 'js.rip' not in text and 'xss' + 'hunter' not in text.lower(), p
assert '![' not in posts[0].read_text(), 'Google guide must have zero images'
sub = posts[1].read_text()
assert sub.count('/images/blog/subdomain-takeover/') == 2
assert '1_stBzv0SOC1jbQJFOrxpHqQ.png' in sub
assert '1_076ZcP-S1SucdfUyhwY1-w.png' in sub
print('method/false-positive boundaries: OK')
PY
npm run check
```

Expected: `method/false-positive boundaries: OK` and Astro check exits 0.

### Task 3: Reconstruct the Shodan and CERT-In Evidence Narratives

**Files:**
- Modify: `src/content/blog/from-shodan-to-sqli.md`
- Modify: `src/content/blog/from-dorks-to-defense.md`
- Use: all six files in `public/images/blog/from-shodan-to-sqli/`
- Use: all six files in `public/images/blog/from-dorks-to-defense/`

**Interfaces:**
- Consumes: Task 1's verified assets, historical image order, and current claim boundaries.
- Produces: two chronological research drafts with twelve local images, evidence-specific snippets, and bounded reporting/recognition outcomes.

- [ ] **Step 1: Restore the complete service-to-dashboard chronology in `from-shodan-to-sqli.md`**

Set the approved title exactly to `From an Exposed Service to a SQL Injection Finding`, retain category `research`, existing date/slug/tags, and `draft: true`. Replace the uncertainty-only treatment with nearly all useful original technical chronology while refusing unsupported breadth:

1. captured Shodan Apache service result;
2. HTTP navigation to a reachable directory index;
3. traversal to the login form;
4. invalid-login baseline;
5. one syntax-relevant username variation and visible database error;
6. one minimal sanitized validation limited to captured behavior;
7. authenticated-looking dashboard rendering;
8. distinct internal panel/data rendering; and
9. reporting, acknowledgement, remediation, and retest remain unknown absent separate records.

Place and caption the six images in this exact sequence:

| Asset | Placement and required caption boundary |
|---|---|
| `1_Cl2IrfAiJoOR9jfZf-maWA.png` | After discovery; captured Shodan/Apache metadata and banner at that time, not ownership, authorization, patch state, exploitability, or SQL injection. |
| `1_VWcHFyy6JiBbMCnefzWX5w.png` | After HTTP navigation; rendered directory listing with named entries, not sensitive-file/database access or proof that every path relates to login. |
| `1_j5SQexw4h8RuJ4kqRYhvjw.png` | Immediately after directory traversal; reached login form, not valid credentials, backend technology, or bypass. |
| `1_AUm2rqX_fxkcEf8bpALKpA.png` | Beside baseline/variation; visible database error after tested input, not repeatability, full query control, extraction, or bypass by itself. |
| `1_LZ02PKRCZHqgRjI1dlmu5Q.png` | After minimal validation; authenticated-looking dashboard rendered, not account identity, durable access, database compromise, scope, or impact. |
| `1_lwKIbkv_c5dRnE3HtLsBlw.png` | Following dashboard; distinct internal-looking panel/data view displayed, not exfiltration, modification, administrator privilege, persistence, or remediation. |

Every image must use `/images/blog/from-shodan-to-sqli/<filename>` and a descriptive alt string naming the visible UI/evidence rather than “screenshot.” Redact host, organization, server path, and target-identifying query details while preserving the visible banner, listing, form, error class, and UI transitions.

Include a readable pair explicitly marked **Sanitized reconstruction**. Preserve the login parameter shape shown by source review, but use inert values and a non-working syntax marker rather than the historical authentication-bypass payload:

```http
POST /login HTTP/1.1
Host: target.example
Content-Type: application/x-www-form-urlencoded
Cookie: [session omitted]

username=USER-A&password=[redacted]
```

```http
HTTP/1.1 200 OK
Content-Type: text/html

Invalid username or password
```

```http
POST /login HTTP/1.1
Host: target.example
Content-Type: application/x-www-form-urlencoded
Cookie: [session omitted]

username=USER-A%5BSYNTAX-MARKER%5D&password=[redacted]
```

```text
Database syntax error [diagnostic details redacted]
```

Explain that the exact inert marker represents one syntax-relevant variation and is not a working bypass payload or byte-for-byte capture. Preserve Shah Kaif's collaborator credit without assigning unsupported individual actions.

- [ ] **Step 2: Restore technical findings and both recognition records in `from-dorks-to-defense.md`**

Retain exactly `From Search Results to Two CERT-In Recognitions`, category `research`, existing date/slug/tags/pinned state, and `draft: true`. Reconstruct this order:

1. scoped search-led reconnaissance on indexed Indian government-domain pages without presenting `*.gov.in` as blanket authorization;
2. triage of parameterized endpoints;
3. minimal baseline/input variation and captured diagnostic behavior;
4. separate first PHP/runtime configuration exposure;
5. second distinct PHP/runtime configuration capture only as a separate captured host/page, not automatically a second accepted report;
6. supported report-submission chronology only from retained records;
7. `CERT-In recognition — September 2025` with its required image;
8. `CERT-In recognition — October 2025` with its required image; and
9. a local explanation of what each recognition establishes and does not establish.

Place and caption all six assets:

| Asset | Placement and required caption boundary |
|---|---|
| `1_p0iY_bLGcryt7loqJ2s12Q.png` | After indexed endpoint introduction; redacted terminal/request validation and visible response, not authorization, severity, data access, or CERT-In acceptance. |
| `1_5d4F_vbMcVmiJidEqPK91Q.jpeg` | Adjacent response/error artifact; diagnostic behavior for tested input, not a second independent SQL injection or extracted data. |
| `1_GbClUe79xPv9M3own-G4jQ.png` | First PHP exposure subsection; public `phpinfo()` runtime fields, not code execution, useful secrets, compromise, or continued exposure. |
| `1_CwwUwpGMYV0yHRDyBAVjvQ.png` | Immediately after first configuration capture; a distinct configuration page/host confirmed by visual review, not independent report acceptance or present exposure. |
| `1_3vdr2a9sNeUeRmFGYdS9bw.jpeg` | Under the separate September 2025 heading; author's shown CERT-In listing, not exact finding attribution, blanket authorization, severity, remediation, or retest. |
| `1_oT6i9Y-R4OfGCkdW_3e4Sw.jpeg` | Under the separate October 2025 heading; author's shown CERT-In listing, not acceptance of every historical claim, remediation, or retest. |

Use exact sanitized request/response pairs only where readable artifact review confirms the method, parameter, and response shape. Otherwise provide a `text` reconstruction limited to the visible difference and label it **Sanitized reconstruction**; never manufacture an endpoint or payload from memory. Retain CERT-In and selected government-domain terminology, redact vulnerable hosts, and keep technical findings separate from recognition outcomes.

- [ ] **Step 3: Assert required sequences, image counts, and recognition separation**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
shodan = Path('src/content/blog/from-shodan-to-sqli.md').read_text()
dorks = Path('src/content/blog/from-dorks-to-defense.md').read_text()
assert 'draft: true' in shodan and 'draft: true' in dorks
assert shodan.count('/images/blog/from-shodan-to-sqli/') == 6
for name in ['1_Cl2IrfAiJoOR9jfZf-maWA.png','1_VWcHFyy6JiBbMCnefzWX5w.png','1_j5SQexw4h8RuJ4kqRYhvjw.png','1_AUm2rqX_fxkcEf8bpALKpA.png','1_LZ02PKRCZHqgRjI1dlmu5Q.png','1_lwKIbkv_c5dRnE3HtLsBlw.png']:
    assert shodan.count(name) == 1, name
assert dorks.count('/images/blog/from-dorks-to-defense/') == 6
assert 'CERT-In recognition — September 2025' in dorks
assert 'CERT-In recognition — October 2025' in dorks
assert dorks.index('1_3vdr2a9sNeUeRmFGYdS9bw.jpeg') < dorks.index('1_oT6i9Y-R4OfGCkdW_3e4Sw.jpeg')
for text in (shodan, dorks):
    lower = text.lower()
    assert 'miro.medium.com' not in lower and 'cdn-images' not in lower
    assert 'js.rip' not in lower and 'xss hunter' not in lower
print('Shodan/CERT-In sequences: OK')
PY
npm run check
```

Expected: `Shodan/CERT-In sequences: OK`; Astro check exits 0.

### Task 4: Reconstruct the Four Business-Logic State Sequences

**Files:**
- Modify: `src/content/blog/business-logic-broken.md`
- Use: all thirteen files in `public/images/blog/business-logic-broken/`

**Interfaces:**
- Consumes: Task 1's thirteen verified images and historical request/UI sequence.
- Produces: one draft containing exactly four evidence-backed findings and no unsupported fifth/PDF finding.

- [ ] **Step 1: Establish the article-level claim and metadata boundaries**

Retain the approved frontmatter title `Five Findings That Looked Small Until I Followed the State`, category `research`, existing date/slug/tags, and `draft: true`; do not rename during restoration. State near the opening that the retained evidence supports four reconstructed sequences and the body does not claim five demonstrated findings. Preserve Shah Kaif's collaboration credit without assigning individual steps.

Order sections as: OTP attempts → wallet workflow → SVG upload/rendering → mobile verification. For every section use baseline → one controlled client/input change → request/response → rendered state → minimal stop → what it proves → what it does not prove. Explicitly distinguish browser continuation/UI display from backend acceptance and persistence.

- [ ] **Step 2: Reconstruct OTP and wallet sequences with seven ordered assets**

For OTP, include a **Sanitized reconstruction** with an inert test account and repeated invalid attempts:

```http
POST /api/verify-otp HTTP/1.1
Host: target.example
Content-Type: application/json
Cookie: [session omitted]

{"user":"USER-A","otp":"000000"}
```

```json
{"status":"invalid_otp"}
```

State that multiple attempts in the captured window lacked a visible rate-limit response; do not generalize to unlimited attempts, absence of all server controls, arbitrary-account takeover, or completed pre-account takeover. Place `1_ISlZNs5U8yhWUcYqQ53hJA.png` immediately after the sequence with that exact boundary in its caption.

For wallet, narrate zero-balance UI → insufficient-balance server response → client-visible manipulation → follow-on transaction request → operation-result response → changed test-account UI. Include internally consistent inert snippets:

```http
POST /api/wallet/request HTTP/1.1
Host: target.example
Content-Type: application/json
Cookie: [session omitted]

{"user":"USER-A","amount":100,"transactionType":"credit"}
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{"status":"error","message":"Insufficient balance"}
```

```json
{"status":"success","user":"USER-A","amount":100,"transactionType":"credit"}
```

Label the snippets **Sanitized reconstruction** and explain which response was server-captured versus client-altered. Place these assets in order with these boundaries:

1. `1_X1WTxTOoDBUhR-gQQ3KS4Q.png`: zero-balance UI and request workflow, not server-side manipulation or loss;
2. `1_-jCinslcxVfUcUe5HnmM3w.png`: insufficient-balance response, not proof that client changes alter server state;
3. `1__5KiJYxi6IGomC71-Xi8SA.png`: follow-on request fields, not persistence without response/readback;
4. `1_3xHhbSWjzCG7U4h__Ft6iw.png`: visible operation result, not cash value, withdrawal, purchase, company loss, or broader impact; and
5. `1_NY0xBDOplm6UryRAO7dwFA.png`: changed test-account display, not ledger integrity, persistence, convertibility, or loss.

- [ ] **Step 3: Reconstruct SVG upload and mobile verification with six ordered assets**

For SVG, show an inert non-networking example rather than a reusable exfiltration payload:

```html
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="controlled test">
  <text x="10" y="20">CONTROLLED-SVG-TEST</text>
</svg>
```

Include a **Sanitized reconstruction** of the upload request preserving only the reviewed filename/content-type transition. Place `1_J-RfkqTIfbZVjgCw4kyaEw.png` beside that request: SVG-shaped body accepted/processed through the image path, not execution, victim reach, storage, or origin. Place `1_Op1wySX9A6LJ526vt5tzUQ.png` after the controlled render/alert state: execution/rendering in the shown test browser context, not admin/HR execution, cookie theft, cross-user reach, or PDF XSS.

For mobile verification, narrate baseline profile/mobile UI → invalid OTP rejection → client receives manipulated success-shaped response → `/api/update-user-data` request → response fields → visible `Phone Verified` state. Use inert, consistent **Sanitized reconstruction** snippets:

```http
POST /api/verify-mobile HTTP/1.1
Host: target.example
Content-Type: application/json
Cookie: [session omitted]

{"user":"USER-A","mobile":"+1-555-0100","otp":"000000"}
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{"status":"error","message":"Invalid OTP"}
```

```http
POST /api/update-user-data HTTP/1.1
Host: target.example
Content-Type: application/json
Cookie: [session omitted]

{"user":"USER-A","mobile":"+1-555-0100","verificationState":"client-success"}
```

Place assets in order: `1_nsKwQTnOBSCpAzGjznbOdw.png` (workflow baseline, not bypass/durable state), `1_kL9iuOuwK-2WNXx130-Giw.png` (server rejection, not bypass), `1_pzllGmbVBjXo5OLoO7nx_A.png` (follow-on update request, not server acceptance), `1_d2PqU5MjQMfPVS3k2VbvFA.png` (material fields/response, not identity ownership or cross-account takeover), and `1_R0In7t2awqNoIebmU9uRuA.png` (visible verified state, not backend semantics, persistence, privilege, or broader impact).

Do not claim arbitrary-user takeover, real-money creation, withdrawal, purchases, company loss, admin/HR execution, cookie theft, or a PDF-XSS finding.

- [ ] **Step 4: Assert the four-sequence and thirteen-image boundary**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
text = Path('src/content/blog/business-logic-broken.md').read_text()
assert 'draft: true' in text
assert text.count('/images/blog/business-logic-broken/') == 13
names = ['1_ISlZNs5U8yhWUcYqQ53hJA.png','1_X1WTxTOoDBUhR-gQQ3KS4Q.png','1_-jCinslcxVfUcUe5HnmM3w.png','1__5KiJYxi6IGomC71-Xi8SA.png','1_3xHhbSWjzCG7U4h__Ft6iw.png','1_NY0xBDOplm6UryRAO7dwFA.png','1_J-RfkqTIfbZVjgCw4kyaEw.png','1_Op1wySX9A6LJ526vt5tzUQ.png','1_nsKwQTnOBSCpAzGjznbOdw.png','1_kL9iuOuwK-2WNXx130-Giw.png','1_pzllGmbVBjXo5OLoO7nx_A.png','1_d2PqU5MjQMfPVS3k2VbvFA.png','1_R0In7t2awqNoIebmU9uRuA.png']
positions = [text.index(name) for name in names]
assert positions == sorted(positions), 'assets are not in prescribed chronology'
assert all(text.count(name) == 1 for name in names)
assert '.gif' not in text.lower()
assert 'pdf-xss finding' not in text.lower()
print('business-logic evidence sequence: OK')
PY
npm run check
```

Expected: `business-logic evidence sequence: OK`; Astro check exits 0.

### Task 5: Reconstruct the Invoice Two-Object Authorization Comparison

**Files:**
- Modify: `src/content/blog/why-idors-are-everywhere.md`
- Use: `public/images/blog/why-idors-are-everywhere/1_QiG3-3uCdmdeR9J5xOAHNw.png`
- Use: `public/images/blog/why-idors-are-everywhere/1_6pz8TufSLIgbyl6L2znOtw.png`

**Interfaces:**
- Consumes: Task 1's two redacted invoice artifacts and the retained one-identifier-change chronology.
- Produces: a concrete baseline/comparison BOLA case with a defensive ownership check and regression matrix.

- [ ] **Step 1: Rebuild the post around the concrete invoice observation**

Set the approved title exactly to `The Invoice Number Changed. The Authorization Decision Did Not.`, retain category `research`, existing date/slug/tags, and `draft: true`. Lead with the test rather than a generic IDOR lecture:

1. authenticate as the controlled test account;
2. request that account's own invoice baseline;
3. change only sequential invoice identifier `OBJECT-001` to `OBJECT-002`;
4. receive a structurally distinct invoice in the same session;
5. compare only minimally retained non-personal fields;
6. stop without adjacent-ID enumeration;
7. explain object-level authorization/BOLA; and
8. provide server-side ownership enforcement and regression cases.

Preserve the Amish Patel, Lay Patel, and Hacker4Help guidance credit as a narrow historical role, not authorization or validation.

- [ ] **Step 2: Add the baseline/comparison pair, evidence table, images, and proof boundaries**

Label this pair **Sanitized reconstruction**:

```http
GET /invoices/OBJECT-001 HTTP/1.1
Host: target.example
Cookie: session=[session omitted]
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"invoiceId":"OBJECT-001","accountMarker":"USER-A","total":"10.00","status":"issued"}
```

Then change only the object identifier:

```http
GET /invoices/OBJECT-002 HTTP/1.1
Host: target.example
Cookie: session=[session omitted]
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"invoiceId":"OBJECT-002","accountMarker":"[redacted different record]","total":"25.00","status":"issued"}
```

Place `1_QiG3-3uCdmdeR9J5xOAHNw.png` after the baseline with a caption saying the authenticated test account viewed its own sequentially identified invoice, not an authorization failure or exposure count. Place `1_6pz8TufSLIgbyl6L2znOtw.png` immediately after the one-ID change, stating which non-personal structure demonstrates a different record and that it does not prove thousands of invoices, universal access, unauthenticated access, card exposure, takeover, or current exposure.

Add a comparison table with rows `Requested object`, `Session`, `Visible record marker`, `Status`, and `Interpretation`; values must show `OBJECT-001` versus `OBJECT-002`, the same `USER-A` session, distinct redacted record markers, `200` versus `200`, and baseline-own-object versus distinct-object response. Do not reproduce personal, order, delivery, or payment data.

Retain a framework-neutral defensive rule equivalent to `policy_scope(current_user, invoices).find(requested_id)` followed by `require_allowed(current_user, "read", invoice)`, and regression cases for owner, authenticated non-owner, unauthenticated user, approved/unapproved roles, preview/download routes, mutations, and unknown identifiers.

- [ ] **Step 3: Assert the two-object evidence boundary**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
text = Path('src/content/blog/why-idors-are-everywhere.md').read_text()
assert 'title: "The Invoice Number Changed. The Authorization Decision Did Not."' in text
assert 'draft: true' in text
assert text.count('/images/blog/why-idors-are-everywhere/') == 2
assert text.count('1_QiG3-3uCdmdeR9J5xOAHNw.png') == 1
assert text.count('1_6pz8TufSLIgbyl6L2znOtw.png') == 1
assert text.index('OBJECT-001') < text.index('OBJECT-002')
assert 'miro.medium.com' not in text and '.gif' not in text.lower()
print('invoice comparison boundary: OK')
PY
npm run check
```

Expected: `invoice comparison boundary: OK`; Astro check exits 0.

### Task 6: Reconstruct Storage, Object Access, Execution, and Chain Analysis

**Files:**
- Modify: `src/content/blog/xss-meets-idor.md`
- Use: all eight files in `public/images/blog/xss-meets-idor/`

**Interfaces:**
- Consumes: Task 1's eight verified artifacts and the historical three-sequence chronology.
- Produces: a draft whose storage, BlogID access, controlled callback, and end-to-end prerequisites remain explicitly separate.

- [ ] **Step 1: Establish four distinct sections and supported credits**

Retain exactly `When Object Authorization and Output Encoding Fail Together`, category `research`, existing date/slug/tags, and `draft: true`. Preserve Shah Kaif's collaboration credit and Amish Patel/Lay Patel/Hacker4Help guidance credit without implying authorization, validation, endorsement, reporting, remediation, or sole credit.

Use these four article boundaries in order:

1. **Display-name storage:** frontend rejection → intercepted registration request → server acceptance → observed route/render result; call it stored HTML unless a specific executable sink is evidenced.
2. **Blog object access:** own `BlogID` baseline → change only the ID → distinct preview content; state that object ownership/privacy and automatic sending remain unknown.
3. **Execution sink:** controlled content storage → history/preview render → callback overview → sanitized origin/browser context.
4. **Chain analysis:** list each demonstrated prerequisite and each missing prerequisite; do not assert automatic email delivery or account takeover.

- [ ] **Step 2: Reconstruct display-name storage and BlogID access with six images**

Use an inert HTML value with no network callback or reusable payload:

```html
<strong>CONTROLLED-DISPLAY-NAME</strong>
```

Label the registration pair **Sanitized reconstruction**:

```http
POST /register HTTP/1.1
Host: target.example
Content-Type: application/json

{"displayName":"<strong>CONTROLLED-DISPLAY-NAME</strong>","email":"user-a@example.invalid"}
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"user":"USER-A","displayName":"<strong>CONTROLLED-DISPLAY-NAME</strong>"}
```

Place `1_qD1T7WsNoTNQ_vjk-7FOGw.png` at the frontend-rejection baseline (client blocked shown special characters, not server validation), `1_dDLYp9D9VyWbUJ6TTujrGQ.png` beside the modified request (request alteration, not storage/execution), and `1_8l28WFqP2t2sXStcoz27Ow.png` after forwarding (server accepted/displayed modified value, not script execution, cross-user rendering, or takeover).

For object access, place `1_Ts-QklEQHbd8VxUyS4BmAA.png` at the “Email to a Friend” action setup (UI action exists, not authorization behavior), then use this **Sanitized reconstruction** pair:

```http
GET /Articles/EmailToFriend.aspx?BlogID=OBJECT-001 HTTP/1.1
Host: target.example
Cookie: session=[session omitted]
```

```text
200 OK — preview content for controlled blog OBJECT-001
```

```http
GET /Articles/EmailToFriend.aspx?BlogID=OBJECT-002 HTTP/1.1
Host: target.example
Cookie: session=[session omitted]
```

```text
200 OK — distinct preview content for OBJECT-002 [author/email redacted]
```

Place `1_UUZy1MlsHL3uf5B2O7D1Gg.png` at the controlled-object baseline (preview tied to baseline ID, not other-user/private access or sending), and `1_fs4cebCQwdhbZLPNjtAS4g.png` immediately after the changed ID (distinct content in same interface, not ownership, enumeration, private-draft access, sending, or XSS by itself).

- [ ] **Step 3: Reconstruct the controlled execution sink and analyze the incomplete chain**

Describe a non-reusable inert execution concept without any historical collector host, cookie access, email, or payload syntax:

```text
controlled blog revision
        ↓ stored
history preview renders the revision
        ↓
controlled callback observed from the test browser
```

Place `1_EL66xFbcSV0Mrf56XnYm7Q.png` after this sequence, naming the exact rendering surface confirmed in author review; caption it as a controlled callback/report entry, not victim/admin execution, automatic sending, persistence across users, or takeover. Place `1_YJm-tFIO2E7D2w7e_Lr2tQ.png` next, retaining only sanitized origin/browser context required to identify the controlled execution; state that it does not prove reusable-cookie theft, session takeover, arbitrary victim reach, or a reliable IDOR-to-XSS chain.

Add a chain table with these exact prerequisite outcomes:

| Prerequisite | Evidence status |
|---|---|
| Modified display-name value accepted | Demonstrated in controlled registration flow |
| Script execution in display-name sink | Not demonstrated |
| Different `BlogID` content returned | Demonstrated in captured preview session |
| Different object belonged to an unauthorized/private user context | Not established |
| Automatic email delivery occurred | Not demonstrated |
| Controlled stored content executed in history preview | Demonstrated by callback in test session |
| Another user or administrator rendered it | Not demonstrated |
| Useful non-HttpOnly credential was captured | Not demonstrated |
| Session takeover or privileged action occurred | Not demonstrated |
| Reliable end-to-end IDOR/XSS chain | Not established |

Never include `js.rip`, XSS Hunter, a live payload domain, cookies, personal addresses, or reusable event-handler/exfiltration code.

- [ ] **Step 4: Assert sequence separation and forbidden-payload removal**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
text = Path('src/content/blog/xss-meets-idor.md').read_text()
lower = text.lower()
assert 'draft: true' in text
assert text.count('/images/blog/xss-meets-idor/') == 8
names = ['1_qD1T7WsNoTNQ_vjk-7FOGw.png','1_dDLYp9D9VyWbUJ6TTujrGQ.png','1_8l28WFqP2t2sXStcoz27Ow.png','1_Ts-QklEQHbd8VxUyS4BmAA.png','1_UUZy1MlsHL3uf5B2O7D1Gg.png','1_fs4cebCQwdhbZLPNjtAS4g.png','1_EL66xFbcSV0Mrf56XnYm7Q.png','1_YJm-tFIO2E7D2w7e_Lr2tQ.png']
positions = [text.index(name) for name in names]
assert positions == sorted(positions)
assert all(text.count(name) == 1 for name in names)
for forbidden in ['js.rip','xss hunter','miro.medium.com','cdn-images']:
    assert forbidden not in lower, forbidden
assert '.gif' not in lower
assert 'display-name storage' in lower
assert 'blog object access' in lower
assert 'execution sink' in lower
assert 'chain analysis' in lower
print('XSS/object-access boundaries: OK')
PY
npm run check
```

Expected: `XSS/object-access boundaries: OK`; Astro check exits 0.

### Task 7: Cross-Post Editorial, Asset, and Reference Review

**Files:**
- Review/Modify: `src/content/blog/google-dorks-guide.md`
- Review/Modify: `src/content/blog/from-shodan-to-sqli.md`
- Review/Modify: `src/content/blog/subdomain-takeover.md`
- Review/Modify: `src/content/blog/from-dorks-to-defense.md`
- Review/Modify: `src/content/blog/business-logic-broken.md`
- Review/Modify: `src/content/blog/why-idors-are-everywhere.md`
- Review/Modify: `src/content/blog/xss-meets-idor.md`
- Review: the exact 37 files under the six `public/images/blog/<slug>/` directories

**Interfaces:**
- Consumes: Tasks 1–6.
- Produces: an author-reviewed seven-post set with all references resolving and all claims bounded locally.

- [ ] **Step 1: Resolve every local image and prohibit remote/decorative references**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
import re
slugs = ['google-dorks-guide','from-shodan-to-sqli','subdomain-takeover','from-dorks-to-defense','business-logic-broken','why-idors-are-everywhere','xss-meets-idor']
expected = {'google-dorks-guide':0,'from-shodan-to-sqli':6,'subdomain-takeover':2,'from-dorks-to-defense':6,'business-logic-broken':13,'why-idors-are-everywhere':2,'xss-meets-idor':8}
total = 0
for slug in slugs:
    path = Path('src/content/blog', slug + '.md')
    text = path.read_text()
    refs = re.findall(r'!\[[^\]]+\]\(([^)]+)\)', text)
    local = [r for r in refs if r.startswith('/images/blog/')]
    assert len(local) == expected[slug], (slug, len(local), expected[slug])
    for ref in local:
        assert Path('public', ref.lstrip('/')).is_file(), (slug, ref)
    assert not any(r.startswith(('http://','https://')) for r in refs), (slug, refs)
    assert not any(r.lower().endswith('.gif') for r in refs), (slug, refs)
    total += len(local)
assert total == 37, total
print('37 local image references resolve; no remote/GIF references')
PY
```

Expected: exactly the printed success line.

- [ ] **Step 2: Scan all seven drafts for forbidden hosts, payloads, secrets, and missing draft flags**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
slugs = ['google-dorks-guide','from-shodan-to-sqli','subdomain-takeover','from-dorks-to-defense','business-logic-broken','why-idors-are-everywhere','xss-meets-idor']
forbidden = ['miro.medium.com','cdn-images','medium.com/@','js.rip','xsshunter','xss hunter']
for slug in slugs:
    p = Path('src/content/blog', slug + '.md')
    text = p.read_text()
    lower = text.lower()
    assert text.count('draft: true') == 1, slug
    for value in forbidden:
        assert value not in lower, (slug, value)
    assert 'cookie: session=redacted' not in lower, slug
    assert 'cookie: session=[session omitted]' not in lower, slug
print('seven draft flags and forbidden-link checks: OK')
PY
```

Expected: success. The cookie assertions ensure snippets do not resemble reusable raw cookie headers; use `Cookie: [session omitted]` or `Cookie: session=[session omitted]` consistently instead.

- [ ] **Step 3: Perform author factual review against both source layers**

For each post, compare `git show bf4f644:src/content/blog/<slug>.md`, the current reconstruction, and the approved spec. Review every chronological transition, retained name, endpoint/parameter shape, response field, report statement, recognition month, redaction, and caption. Confirm explicitly:

- no historical prose has been copied wholesale and the result is direct NetworkShard writing rather than `mll.sh` imitation;
- useful source chronology and concrete technical facts were not erased merely because broader impact is uncertain;
- names are consistent within each post and only claim collaboration, guidance, reporting body, recognition, or historical affiliation supported by the source;
- each **Sanitized reconstruction** is internally consistent and is not represented as byte-exact evidence;
- every image caption states its sequence role, evidence type, observation, and material non-proof boundary;
- Shodan metadata is not SQL-injection proof; dashboard UI is not server/session identity proof; CERT-In recognition is not finding-by-finding validation/remediation proof; callbacks are not victim execution/takeover proof;
- `business-logic-broken` claims four evidence-backed sequences in the body; and
- reporting, acknowledgement, remediation, and retest remain unknown wherever records do not establish them.

Any factual change made during this review stays within the seven Markdown files or the exact image path being redacted. Re-run Tasks 2–6 assertions after edits.

- [ ] **Step 4: Check Markdown fence structure and repository whitespace**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
slugs = ['google-dorks-guide','from-shodan-to-sqli','subdomain-takeover','from-dorks-to-defense','business-logic-broken','why-idors-are-everywhere','xss-meets-idor']
for slug in slugs:
    p = Path('src/content/blog', slug + '.md')
    lines = p.read_text().splitlines()
    fences = [line for line in lines if line.startswith('```')]
    assert len(fences) % 2 == 0, (slug, len(fences))
    for i in range(0, len(fences), 2):
        assert fences[i] in {'```http','```json','```text','```bash','```dns','```html'}, (slug, fences[i])
        assert fences[i + 1] == '```', (slug, fences[i + 1])
print('fence structure: OK')
PY
git diff --check
```

Expected: `fence structure: OK`; `git diff --check` emits no output and exits 0.

### Task 8: Localhost Draft Preview and Production-Exclusion Verification

**Files:**
- Test only: the seven drafts, existing `/drafts/[...slug].astro`, and generated `dist/`
- Do not modify preview routes, production routes, configuration, or filtering code

**Interfaces:**
- Consumes: the fully reviewed draft/content set.
- Produces: evidence that drafts render only in local development and are absent from production output.

- [ ] **Step 1: Run the final content/type check**

Run:

```bash
npm run check
```

Expected: Astro reports no errors and exits 0.

- [ ] **Step 2: Start the local development server without exposing it externally**

Run in a dedicated terminal:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Astro reports a local URL under `http://127.0.0.1:<port>/`; do not use `--host 0.0.0.0`.

- [ ] **Step 3: Assert all seven localhost draft routes respond**

With `PORT` set to the port printed by Astro, run:

```bash
PORT=4321
for slug in \
  google-dorks-guide \
  from-shodan-to-sqli \
  subdomain-takeover \
  from-dorks-to-defense \
  business-logic-broken \
  why-idors-are-everywhere \
  xss-meets-idor
do
  test "$(curl -sS -o /dev/null -w '%{http_code}' "http://127.0.0.1:${PORT}/drafts/${slug}/")" = 200 || exit 1
done
```

Expected: loop exits 0. If Astro chose another port, set `PORT` to that exact number rather than restarting with a network-exposed host.

- [ ] **Step 4: Inspect every draft at desktop and narrow viewport widths**

Using a local browser, visit each `/drafts/<slug>/` route at 1440×900 and 390×844. For every post, verify title/frontmatter rendering, chronology, headings, captions immediately following their images, readable images at full available width, non-clipped fences with usable horizontal overflow, tables, links, alt text in accessibility inspection, and no missing-image icon. Also verify that the draft banner says the article is not published.

For `from-dorks-to-defense`, visibly confirm separate September and October recognition headings/images. For `business-logic-broken`, confirm all thirteen images are separated by prose. For `xss-meets-idor`, confirm storage, BlogID, callback, and chain sections do not visually merge. Stop the dev server after review.

Expected: all seven are readable at both viewport sizes; no production/public preview mechanism was introduced.

- [ ] **Step 5: Build production output**

Run:

```bash
npm run build
```

Expected: Astro build exits 0.

- [ ] **Step 6: Assert the seven drafts have no production article or draft routes**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
slugs = ['google-dorks-guide','from-shodan-to-sqli','subdomain-takeover','from-dorks-to-defense','business-logic-broken','why-idors-are-everywhere','xss-meets-idor']
dist = Path('dist')
for slug in slugs:
    forbidden = [dist/'blog'/slug/'index.html', dist/'drafts'/slug/'index.html', dist/'og'/f'{slug}.png']
    for path in forbidden:
        assert not path.exists(), path
assert not (dist/'drafts'/'index.html').exists(), 'production draft index exists'
print('no production article/draft/OG routes for seven drafts')
PY
```

Expected: success line. Static evidence images may exist under `dist/images/blog/`; production exclusion applies to article/listing/search/feed/sitemap/navigation/OG routes, not to unlinked public binaries.

- [ ] **Step 7: Assert exclusion from every generated textual discovery surface**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
slugs = ['google-dorks-guide','from-shodan-to-sqli','subdomain-takeover','from-dorks-to-defense','business-logic-broken','why-idors-are-everywhere','xss-meets-idor']
scan_suffixes = {'.html','.json','.xml','.txt'}
for path in Path('dist').rglob('*'):
    if not path.is_file() or path.suffix.lower() not in scan_suffixes:
        continue
    text = path.read_text(errors='ignore')
    for slug in slugs:
        assert f'/blog/{slug}' not in text, (path, slug)
        assert f'/drafts/{slug}' not in text, (path, slug)
print('draft slugs absent from production HTML, search JSON, RSS, sitemap, listings, navigation, and text manifests')
PY
```

Expected: success. This generated-output scan independently covers article links, blog/category/tag listings, search JSON, RSS, sitemap, related posts, navigation, and textual route manifests rather than assuming filtering from frontmatter.

- [ ] **Step 8: Verify final scope and leave the working tree uncommitted**

Run:

```bash
git diff --check
git status --short
git diff -- \
  src/content/blog/google-dorks-guide.md \
  src/content/blog/from-shodan-to-sqli.md \
  src/content/blog/subdomain-takeover.md \
  src/content/blog/from-dorks-to-defense.md \
  src/content/blog/business-logic-broken.md \
  src/content/blog/why-idors-are-everywhere.md \
  src/content/blog/xss-meets-idor.md
```

Expected: no whitespace errors; restoration changes are limited to the seven drafts and exact 37 assets. Because the repository already contains unrelated working-tree changes, compare final `git status --short` against the pre-execution status and ensure this work added no other path. Do not run `git add`, `git commit`, `git push`, or any PR command.

## Self-Review Against the Approved Spec

- [ ] **Spec coverage:** Confirm Tasks 1–8 cover all 37 exact paths; canonical-source identity and MIME assertions; safe full-size inspection/redaction; seven per-post chronologies; all prescribed placements/captions/proof boundaries; retained names; valid sanitized snippets; adjacent caveats; localhost preview; production exclusion; `astro check`; build; and unrelated-edit prohibition.
- [ ] **Article-specific outcomes:** Confirm the Google post has zero images and a scoped defensive workflow; Shodan follows service → directory → login → error → dashboard; takeover ends as a false positive; CERT-In contains technical evidence plus separate September/October records; business logic has only four demonstrated sequences; invoice authorization uses one two-object comparison; and XSS/IDOR keeps storage, object access, execution, and chain prerequisites distinct.
- [ ] **Asset allowlist:** Confirm the six post directories contain 6 + 2 + 6 + 13 + 2 + 8 = 37 files, with no GIF/title/decorative asset, and every Markdown reference resolves to exactly one allowlisted first-party file.
- [ ] **Safety and proof:** Confirm redactions hide reusable/sensitive data without hiding cited evidence; no Medium or payload hotlink remains; every reconstructed capture is labelled; no screenshot or recognition record silently broadens a claim.
- [ ] **Draft/publication boundary:** Confirm all seven retain `draft: true`, dates/slugs/categories remain prescribed, localhost draft routes work, and generated production output excludes all seven from every required discovery and route surface.
- [ ] **Placeholder scan:** Search this plan and the implemented drafts for unfinished-work markers and unqualified placeholder prose; remove any accidental planning residue while retaining deliberate sanitized literals `[redacted]`, `[session omitted]`, and reserved inert identifiers.
- [ ] **Consistency review:** Confirm `USER-A`, `USER-B`, `OBJECT-001`, `OBJECT-002`, endpoints, methods, fields, status codes, titles, image filenames, and section names remain internally consistent within each article.
- [ ] **Final validation:** Re-run `git diff --check`, `npm run check`, `npm run build`, the local-reference script, and the generated-output exclusion script; record actual output for author review and leave all work uncommitted and unpushed.
