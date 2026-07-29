# Seven-Post Evidence Restoration Design

Date: 2026-07-29  
Status: Approved design; implementation and publication require later review  
Supersedes: `docs/superpowers/specs/2026-07-29-seven-post-rewrite-design.md`

## Purpose

Restore the useful technical substance that the previous rewrite removed from seven security posts. The implementation must use the original articles and their first-party image artifacts as factual source material, then reconstruct each post cleanly: a chronological technical narrative, readable sanitized requests and responses, selected evidentiary screenshots, and claim-specific caveats beside the claims they qualify.

This is not a wholesale rollback. Imported Medium prose, malformed code fences, overstatement, sensitive values, decorative GIFs, memes, promotional endings, and unsupported conclusions remain excluded. The goal is a richer and more useful reconstruction, not the over-sanitized rewrite and not an uncritical restoration of the old copy.

This work covers only these draft sources and their evidence assets:

- `src/content/blog/google-dorks-guide.md`
- `src/content/blog/from-shodan-to-sqli.md`
- `src/content/blog/subdomain-takeover.md`
- `src/content/blog/from-dorks-to-defense.md`
- `src/content/blog/business-logic-broken.md`
- `src/content/blog/why-idors-are-everywhere.md`
- `src/content/blog/xss-meets-idor.md`
- the exact 37 files listed in the restoration matrix below, restored under `public/images/blog/`

No slug, route, category, publication date, unrelated post, layout, or site behavior changes as part of this restoration.

## Approved editorial direction

### Restore detail, reconstruct cleanly

The old articles are source records, not publishable copy. Recover their useful sequence, endpoint shape, parameter names, request/response behavior, UI state, collaboration credits, and screenshots, but rewrite the prose in the current NetworkShard voice. Technical literals may be retained after sanitization. Claims must be no broader than the evidence.

Each case-study post should follow the investigation in the order it occurred:

1. initial context or discovery signal;
2. baseline state;
3. one controlled change;
4. resulting request, response, or rendered state;
5. minimal validation and stop point;
6. what the evidence proves;
7. what it does not prove; and
8. reporting, recognition, or remediation status only where supported.

The Google guide is method-led rather than a single incident, but its examples must still proceed from scoped query to result triage, live verification, evidence handling, and defensive correction.

### Original voice without imitation

Use direct openings, short sections, concrete evidence, and restrained humor where natural. Do not copy wording, sentence patterns, recurring devices, titles, transitions, or the exact voice of `mll.sh`. No post should attempt to look or sound like `mll.sh`; this is NetworkShard writing using the author's own chronology and evidence.

### Existing names are retained

The user selected the existing organization and contributor names. Preserve names where they are already part of the record and contextually relevant, including CERT-In, Shah Kaif/Kaif Shah, Amish Patel, Lay Patel, Hacker4Help, and VulnInsights. Normalize a person's name consistently within a post after author review, but do not replace these names with generic labels merely to sanitize the article.

Naming does not imply authorization, endorsement, sole discovery, acceptance of every claim, remediation, or severity. State the narrow relationship the source supports: collaboration, guidance, reporting body, recognition, or historical project affiliation. Vulnerable organizations and live targets that were already redacted remain redacted.

### Caveats stay adjacent to claims

Do not front-load every uncertainty into a long disclaimer. Keep one short scope/disclosure note where needed, then place the material limitation next to the relevant statement, image, or sequence. Examples:

- beside a Shodan banner, say that it proves indexed service metadata at the captured time, not ownership or SQL injection;
- beside a successful UI state, say whether it is a client-rendered state or a confirmed server-side state change;
- beside CERT-In Hall of Fame images, say that they prove recognition in the shown month, not every technical label or remediation claim;
- beside an XSS callback image, state the observed origin and test session while withholding broader victim or account-takeover claims.

Use dedicated “What this proves / What this does not prove” passages when several adjacent artifacts establish one step. Avoid repetitive legalistic disclaimers and avoid using uncertainty to erase observable technical facts.

## Draft and preview constraints

All seven source files remain `draft: true`. This restoration does not approve any post for publication and does not assign new publication dates.

Preview is localhost-only through the repository's current draft-preview mechanism, presently `/drafts/<slug>/` on the local development server. Do not create a deployed preview, public draft URL, bypass header, feature flag, or production exception. Production generation must continue excluding these posts from article routes, blog/category/tag listings, search JSON, RSS, sitemap, related posts, navigation, and OG routes.

## Evidence restoration rules

### Source and provenance

Commit `bf4f644` (`Self-host blog images from Medium CDN`) is the canonical binary source. Restore each required file from that commit at the exact repository-relative path in the matrix. Do not download a replacement from Medium, rename it, recompress it, convert its format, or substitute a visually similar file. Binary identity should match the `bf4f644` blob.

The historical Markdown at `bf4f644:src/content/blog/<slug>.md` supplies image order and investigation context. It does not independently validate all prose claims. The current draft supplies the modern claim boundaries and frontmatter. The reconstruction must reconcile both: recover observable facts and technical detail while retaining warranted limits.

### Image treatment

Before use, inspect every selected image at readable size. Redact only secrets, personal data, live hostnames, email addresses, tokens, cookies, unique user identifiers, or operationally reusable target details. Redaction must not obscure the status code, parameter, request method, response field, UI transition, record difference, origin, or recognition entry the caption relies on. If safe publication requires editing a selected binary, preserve the exact path, document the edit in review, and ensure the public image still proves the stated fact. Do not invent missing pixels or fabricate a screenshot.

Use descriptive alt text and a visible caption immediately below or semantically associated with each image. A caption must identify:

- where the image sits in the sequence;
- the relevant visible observation;
- whether it is original evidence, recognition documentation, or an explanatory state screenshot; and
- the narrow proof boundary.

Do not use an evidentiary screenshot as an uncaptioned hero. Avoid stacking images without prose that explains the transition between them.

### Snippet treatment

Reconstruct malformed imported blocks as valid fenced snippets. Use `http`, `json`, `text`, `bash`, `dns`, `html`, or another appropriate language identifier. Preserve material method names, parameter names, status transitions, headers, and response fields while replacing sensitive values consistently with obvious inert values such as `target.example`, `USER-A`, `OBJECT-002`, `[session omitted]`, and `[redacted]`.

A snippet reconstructed from an image or historical prose must be labelled `Sanitized reconstruction`; it must not be presented as a byte-for-byte capture. Request and response pairs must be internally consistent and visually readable without horizontal concatenation. Never include a live payload host, working credential, cookie, personal record, or real vulnerable endpoint.

## Exact restoration matrix — 37 evidentiary assets

Everything not listed in this matrix remains omitted. In particular, all historical `0_*.gif` files are decorative/reaction media and are not restored, even when the old article placed one near a technical step. Old title cards and decorative hero graphics are also omitted.

### `google-dorks-guide` — 0 assets

No historical image is evidentiary. Omit both the “Google Dork” title image and query-card graphic. Render scoped query examples as readable text fences and tables instead.

### `from-shodan-to-sqli` — 6 assets

| Exact path | Placement and caption requirement | Proves | Does not prove |
|---|---|---|---|
| `public/images/blog/from-shodan-to-sqli/1_Cl2IrfAiJoOR9jfZf-maWA.png` | After the discovery paragraph; caption as the captured Shodan/Apache service result, with visible host details redacted. | The capture displayed Apache HTTP metadata and a version/banner at that time. | Target ownership, authorization, active patch state, exploitability, or SQL injection. |
| `public/images/blog/from-shodan-to-sqli/1_VWcHFyy6JiBbMCnefzWX5w.png` | After navigating to the HTTP service; caption as an exposed directory-index view. | A directory listing was rendered and showed named entries. | Sensitive-file access, database access, or a relationship between every listed path and the login handler. |
| `public/images/blog/from-shodan-to-sqli/1_j5SQexw4h8RuJ4kqRYhvjw.png` | Immediately after the directory-listing step; caption as the login interface reached during traversal. | The browser reached a login form associated with the investigated service. | Valid credentials, backend technology, or bypass. |
| `public/images/blog/from-shodan-to-sqli/1_AUm2rqX_fxkcEf8bpALKpA.png` | Beside a sanitized baseline/quote variation pair; caption the visible database error and omit/redact server path and query details that identify the target. | The captured response visibly contained a database error after the tested input. | Repeatability by itself, full query control, data extraction, or authentication bypass. |
| `public/images/blog/from-shodan-to-sqli/1_LZ02PKRCZHqgRjI1dlmu5Q.png` | After the minimal validation step; caption as the resulting authenticated-looking dashboard state, with organization details redacted. | The captured browser state rendered a dashboard after the described sequence. | Whose account/session it represented, durable access, database compromise, scope, or broader impact without matching traffic evidence. |
| `public/images/blog/from-shodan-to-sqli/1_lwKIbkv_c5dRnE3HtLsBlw.png` | Follow the first dashboard image; caption the distinct internal panel/data view visible in the capture. | A second internal-looking application view was displayed in the test session. | Data exfiltration, modification, administrator privileges, persistence, or remediation. |

Omit `1_6WU29m2SWDro9AcCZ-RUCw.png` (title card) and all four GIFs (reaction/decorative media).

### `subdomain-takeover` — 2 assets

| Exact path | Placement and caption requirement | Proves | Does not prove |
|---|---|---|---|
| `public/images/blog/subdomain-takeover/1_stBzv0SOC1jbQJFOrxpHqQ.png` | After enumeration/scanner setup; caption as automated candidates, with all hostnames redacted consistently. | The tool flagged one or more hosts, including an S3-labelled candidate. | DNS delegation, provider ownership, a missing resource, external claimability, or takeover. |
| `public/images/blog/subdomain-takeover/1_076ZcP-S1SucdfUyhwY1-w.png` | Beside the sanitized `dig` sequence; caption the manual DNS output and visible TXT result. | Manual DNS inspection did not show the expected takeover chain and did show TXT data in the captured output. | That TXT universally prevents takeover, that no other record existed, historical DNS state, or provider-side claimability. |

Omit the title graphic and all reaction/meme GIFs. Do not include provider-claim commands as instructions; the narrative ends at the false-positive conclusion.

### `from-dorks-to-defense` — 6 assets, including both required CERT-In images

| Exact path | Placement and caption requirement | Proves | Does not prove |
|---|---|---|---|
| `public/images/blog/from-dorks-to-defense/1_p0iY_bLGcryt7loqJ2s12Q.png` | In the chronological findings section after the indexed endpoint is introduced; caption as a redacted terminal/request validation view. | The capture records technical testing against a redacted endpoint and visible response behavior. | Authorization, SQL injection severity, data access, or acceptance by CERT-In without corresponding records. |
| `public/images/blog/from-dorks-to-defense/1_5d4F_vbMcVmiJidEqPK91Q.jpeg` | Adjacent to the preceding validation artifact; caption the visible error/response evidence and sanitize target/path details. | A response associated with the tested input displayed diagnostic behavior. | A second independent vulnerability merely because the old article labelled “2 SQL Injection,” or any extracted data. |
| `public/images/blog/from-dorks-to-defense/1_GbClUe79xPv9M3own-G4jQ.png` | In a separate PHP configuration-exposure subsection; caption the first redacted `phpinfo()` page. | A publicly rendered page exposed PHP/runtime configuration fields at the captured endpoint. | Code execution, secret usefulness, system compromise, or continued exposure. |
| `public/images/blog/from-dorks-to-defense/1_CwwUwpGMYV0yHRDyBAVjvQ.png` | Immediately after the first configuration image; caption as a distinct captured configuration page/host, only if the artifact review confirms it is distinct. | A second capture shows PHP/runtime configuration information. | That it is an independently accepted report or remains exposed today. |
| `public/images/blog/from-dorks-to-defense/1_3vdr2a9sNeUeRmFGYdS9bw.jpeg` | In “CERT-In recognition — September 2025”; required, not optional. Caption the author's September 2025 Hall of Fame entry. | The shown CERT-In page lists the author in September 2025. | Which exact finding earned recognition, authorization for every test, severity, remediation, or retest. |
| `public/images/blog/from-dorks-to-defense/1_oT6i9Y-R4OfGCkdW_3e4Sw.jpeg` | In “CERT-In recognition — October 2025”; required, not optional. Caption the author's October 2025 Hall of Fame entry. | The shown CERT-In page lists the author in October 2025. | Which exact finding earned recognition, acceptance of every old claim, remediation, or retest. |

The two CERT-In images are mandatory because they are primary visual evidence for the post's title and documented outcome. Omit the title card, reaction GIFs/memes, author image, and decorative hacker image.

### `business-logic-broken` — 13 assets

| Exact path | Placement and caption requirement | Proves | Does not prove |
|---|---|---|---|
| `public/images/blog/business-logic-broken/1_ISlZNs5U8yhWUcYqQ53hJA.png` | Finding 1, after a sanitized OTP request sequence; caption the repeated OTP attempts/no visible throttling in the captured test window. | Multiple OTP attempts were accepted during the captured sequence without a visible rate-limit response. | “Any account” takeover, no server-side control anywhere, unlimited attempts, or pre-account takeover without completed controlled validation. |
| `public/images/blog/business-logic-broken/1_X1WTxTOoDBUhR-gQQ3KS4Q.png` | Finding 2 baseline; caption the wallet UI at zero balance and the request action offered. | The UI showed a zero balance while exposing the wallet request workflow. | Server-side credit manipulation or financial loss. |
| `public/images/blog/business-logic-broken/1_-jCinslcxVfUcUe5HnmM3w.png` | After the baseline wallet request; caption the intercepted insufficient-balance response. | The captured transaction returned an insufficient-balance error. | That changing a client-visible response changes server state. |
| `public/images/blog/business-logic-broken/1__5KiJYxi6IGomC71-Xi8SA.png` | Beside the sanitized altered wallet request; caption the follow-on request and material fields. | The client issued a follow-on request containing user, amount, and transaction-type fields after the described manipulation. | That arbitrary values were persisted unless confirmed by a server response and later state view. |
| `public/images/blog/business-logic-broken/1_3xHhbSWjzCG7U4h__Ft6iw.png` | After the altered request; caption the captured response that indicated the operation result. | The server response visibly indicated the request outcome shown in the artifact. | Cash value, withdrawal, purchase, loss to the company, or impact beyond the test account. |
| `public/images/blog/business-logic-broken/1_NY0xBDOplm6UryRAO7dwFA.png` | Follow the response; caption the wallet UI after the controlled test. | The test account's displayed wallet state changed after the sequence. | Ledger integrity, persistence after reload/session change, convertibility, or financial loss unless separately demonstrated. |
| `public/images/blog/business-logic-broken/1_J-RfkqTIfbZVjgCw4kyaEw.png` | Finding 3, beside the sanitized upload request; caption filename/content-type manipulation for SVG upload. | The captured upload request accepted or processed an SVG-shaped body through the image upload path. | Script execution, victim reach, storage, or execution origin. |
| `public/images/blog/business-logic-broken/1_Op1wySX9A6LJ526vt5tzUQ.png` | Immediately after the upload response/render step; caption the controlled alert/render result and its test context. | Script-capable SVG content executed/rendered in the shown controlled browser context. | Admin/HR execution, cookie theft, cross-user reach, or PDF-based XSS. |
| `public/images/blog/business-logic-broken/1_nsKwQTnOBSCpAzGjznbOdw.png` | Finding 4 baseline; caption the profile/mobile-number update UI before verification. | The UI exposed the mobile update and verification workflow. | A bypass or durable verified state. |
| `public/images/blog/business-logic-broken/1_kL9iuOuwK-2WNXx130-Giw.png` | After invalid OTP submission; caption the intercepted failure response. | The server initially rejected the supplied verification value. | Bypass by itself. |
| `public/images/blog/business-logic-broken/1_pzllGmbVBjXo5OLoO7nx_A.png` | Beside the altered client-response step; caption the subsequent `/api/update-user-data` request with sensitive identifiers removed. | The client issued a profile update after the manipulated response flow. | That the server accepted a verified flag or changed durable account state. |
| `public/images/blog/business-logic-broken/1_d2PqU5MjQMfPVS3k2VbvFA.png` | Immediately after the update request; caption the material update payload/response fields. | The captured exchange shows the fields and response involved in the update. | Identity ownership, broad account takeover, or effect on another user's account. |
| `public/images/blog/business-logic-broken/1_R0In7t2awqNoIebmU9uRuA.png` | End of the mobile-verification sequence; caption the visible “Phone Verified” state. | The test account UI displayed a verified-phone state after the sequence. | Backend verification semantics, persistence, privileged access, or impact beyond the controlled account without corroboration. |

Reconstruct four evidence-backed findings, not the old article's inconsistent “five” count: OTP rate-limit weakness, wallet-state manipulation, SVG upload/rendering, and mobile verification-state manipulation. Do not restore the PDF-XSS assertion unless separate primary evidence is found; none of the 37 selected assets substantiates it. Preserve Shah Kaif's collaboration credit in text. Omit the vulnerability-summary graphic and all reaction/decorative GIFs.

### `why-idors-are-everywhere` — 2 assets

| Exact path | Placement and caption requirement | Proves | Does not prove |
|---|---|---|---|
| `public/images/blog/why-idors-are-everywhere/1_QiG3-3uCdmdeR9J5xOAHNw.png` | Baseline step; caption the author's own order/invoice view with all personal fields treated as test data or redacted. | The authenticated test account could view its own sequentially identified order/invoice. | An authorization failure or exposure count. |
| `public/images/blog/why-idors-are-everywhere/1_6pz8TufSLIgbyl6L2znOtw.png` | Immediately after changing one invoice identifier; caption the distinct invoice record and the fields that demonstrate cross-object access, with personal data redacted. | The captured session displayed a different invoice after the object identifier changed. | Thousands of invoices, every record, unauthenticated access, card-data exposure, account takeover, or current exposure. |

Preserve the guidance credit to Amish Patel, Lay Patel, and Hacker4Help as restrained text. Omit the title card and reaction/loading GIFs.

### `xss-meets-idor` — 8 assets

| Exact path | Placement and caption requirement | Proves | Does not prove |
|---|---|---|---|
| `public/images/blog/xss-meets-idor/1_qD1T7WsNoTNQ_vjk-7FOGw.png` | Sequence 1 baseline; caption frontend rejection/validation of special characters in the registration form. | Client-side input handling blocked the direct form entry shown. | Server-side validation. |
| `public/images/blog/xss-meets-idor/1_dDLYp9D9VyWbUJ6TTujrGQ.png` | Beside the sanitized intercepted registration request; caption the modified display-name value. | The request could be altered after client-side validation. | Storage or execution until the later response/render evidence. |
| `public/images/blog/xss-meets-idor/1_8l28WFqP2t2sXStcoz27Ow.png` | After forwarding registration; caption the server response and stored/displayed name field. | The application accepted the modified value in the captured account-creation flow. | JavaScript execution, cross-user rendering, or account takeover. |
| `public/images/blog/xss-meets-idor/1_Ts-QklEQHbd8VxUyS4BmAA.png` | Sequence 2 setup; caption the blog action menu containing “Email to a Friend.” | The tested blog UI exposed that action for a blog object. | Object authorization behavior. |
| `public/images/blog/xss-meets-idor/1_UUZy1MlsHL3uf5B2O7D1Gg.png` | Baseline BlogID step; caption the email-preview form for the author's controlled blog object. | The endpoint rendered a preview tied to the baseline BlogID. | Access to another user's private object or automatic email sending. |
| `public/images/blog/xss-meets-idor/1_fs4cebCQwdhbZLPNjtAS4g.png` | Immediately after changing `BlogID`; caption the changed object content shown in the same interface, with author/email data redacted. | The captured interface returned content for a different BlogID in the test session. | Ownership of that object, broad enumeration, private-draft access, send action, or XSS execution by itself. |
| `public/images/blog/xss-meets-idor/1_EL66xFbcSV0Mrf56XnYm7Q.png` | Sequence 3 validation; caption the controlled XSS-report/callback entry and state which rendering surface triggered it. | A callback/report was recorded after the tested content rendered. | Victim/admin execution, automatic sending, persistence across users, or account takeover. |
| `public/images/blog/xss-meets-idor/1_YJm-tFIO2E7D2w7e_Lr2tQ.png` | Follow the callback overview; caption only the sanitized callback details needed to show origin/context. | The retained callback details identify the captured origin/browser context and data visible in that controlled execution. | Reusable cookie theft, session takeover, arbitrary victim reach, or a reliable IDOR-to-XSS chain unless every prerequisite is separately established. |

Replace historical live payload hosts with inert controlled examples. Preserve Shah Kaif's collaboration credit and the Amish Patel/Lay Patel/Hacker4Help guidance credit in text. Omit the title image and all reaction/meme GIFs.

## Per-post reconstruction specifications

### 1. `google-dorks-guide`

**Title:** What Google Can Reveal About Your Attack Surface—and What It Cannot  
**Category:** `guides`

Build a practical defensive workflow, not a generic operator encyclopedia or credential-hunting list:

1. establish an owned or explicitly authorized domain and handling rules;
2. run narrow `site:`, exact-phrase, exclusion, `filetype:`, `before:`, and `after:` examples supported by current primary Google documentation;
3. record query and timestamp;
4. triage a result as public-by-design, stale, metadata exposure, access-control concern, or false positive;
5. verify the live response only when scope allows;
6. preserve minimal evidence and report through the correct channel; and
7. separate de-indexing/robots controls from authentication and authorization.

Use sanitized query fences and a compact evidence-log example. Explain next to `site:` that it is not exhaustive and next to each result that indexing is not proof of vulnerability, privileged access, exploitation, or a complete asset inventory. No image assets are restored for this post.

### 2. `from-shodan-to-sqli`

**Title:** From an Exposed Service to a SQL Injection Finding  
**Category:** `research`

Restore the historical technical sequence without turning a Shodan result into proof:

1. captured Shodan Apache result;
2. reachable directory index;
3. login page discovery;
4. invalid-login baseline;
5. one syntax-relevant username variation and visible database error;
6. a minimal sanitized validation request, only to the extent supported by the captures;
7. the resulting dashboard and internal panel views; and
8. reporting/remediation status stated as unknown unless separate records support it.

Include a readable sanitized HTTP request/response pair around the login parameter and database error. Do not restore working authentication-bypass payloads verbatim; retain the input shape and the response difference needed to understand the finding. The dashboard images permit describing the rendered state reached in the captured session, while account identity, data access, compromise, persistence, authorization, reporting, and remediation require separate proof. Preserve Shah Kaif's collaborator credit without assigning unsupported individual steps.

### 3. `subdomain-takeover`

**Title:** I Thought I Found a Subdomain Takeover. I Had Not.  
**Category:** `research`

Keep the false-positive narrative and restore the two technical screenshots:

1. business-news context as motivation, not evidence;
2. subdomain enumeration;
3. scanner S3 warning;
4. manual `CNAME` and `TXT` checks;
5. absence of the expected provider routing chain;
6. explanation that TXT is not universal takeover protection;
7. distinction among dangling DNS, missing provider binding, and external claimability; and
8. the stop decision without claiming provider infrastructure.

Reconstruct the relevant `dig` output as a sanitized `dns` or `text` fence. State immediately after the scanner image that it is a lead, and immediately after the DNS image that the evidence did not establish takeover. Do not restore bucket/app/repository claim commands or generic exploitation instructions.

### 4. `from-dorks-to-defense`

**Title:** From Search Results to Two CERT-In Recognitions  
**Category:** `research`

Restore both the technical evidence and recognition chronology:

1. scoped search-led reconnaissance of indexed Indian government-domain pages;
2. triage of parameterized endpoints;
3. minimal request/response comparisons for the captured injection-like behavior;
4. separate PHP configuration-exposure captures;
5. report submission chronology only where records exist;
6. mandatory September 2025 CERT-In Hall of Fame image;
7. mandatory October 2025 CERT-In Hall of Fame image; and
8. a precise account of what recognition establishes.

Use existing CERT-In and government-domain names as selected, while redacting vulnerable hosts. Do not reproduce a broad `*.gov.in` query list as implied blanket authorization. Keep each technical finding distinct; do not infer “two SQL injections,” validation, patching, or retest solely from the old labels. If the artifact and report review supports exact sanitized requests, include them as readable pairs; otherwise narrate only the visible response facts. CERT-In recognition is a documented outcome, not a substitute for each finding's evidence.

### 5. `business-logic-broken`

**Title:** Five Findings That Looked Small Until I Followed the State  
**Category:** `research`

The evidence matrix supports four reconstructed sequences, so the implementation must reconcile the current working title before any eventual publication. During this restoration retain the approved frontmatter title to avoid unrelated metadata churn, but the article body must not claim five demonstrated findings. Editorial review must either rename it to reflect four findings or admit a fifth only when separate primary evidence is supplied.

Organize the body chronologically by state transition:

1. **OTP attempts:** baseline OTP request, repeated attempts in the captured window, observed absence of a throttle response, and bounded takeover implications;
2. **Wallet workflow:** zero-balance UI, insufficient-balance response, client-response manipulation, follow-on transaction request, server response, and changed test-account UI;
3. **SVG upload:** altered filename/content type, upload processing, and controlled render/alert result;
4. **Mobile verification:** invalid OTP rejection, manipulated client response, follow-on profile update, response, and visible verified-phone state.

For every sequence, include sanitized JSON/HTTP snippets reconstructed from the screenshots and place the corresponding assets at each transition. Distinguish a browser/UI state from backend persistence. Do not claim arbitrary-user takeover, real-money creation, withdrawal, purchases, company loss, admin/HR execution, cookie theft, or a PDF-XSS finding without additional evidence. Preserve Shah Kaif's collaboration credit.

### 6. `why-idors-are-everywhere`

**Title:** The Invoice Number Changed. The Authorization Decision Did Not.  
**Category:** `research`

Lead with the concrete invoice test rather than a generic IDOR lecture:

1. authenticate to the controlled test account;
2. request the account's own invoice as a baseline;
3. change only the sequential invoice identifier;
4. receive a distinct invoice in the same session;
5. compare only enough redacted fields to show it is a different object;
6. stop without enumeration;
7. explain object-level authorization/BOLA; and
8. show the correct server-side ownership check and regression cases.

Include a sanitized baseline/comparison HTTP pair using inert IDs, followed by a response-field comparison table. The two screenshots must retain enough non-personal structure to show distinct records. Do not claim thousands of invoices, full database exposure, unauthenticated access, payment-card exposure, account takeover, modification, deletion, or present-day exposure. Preserve the Amish Patel, Lay Patel, and Hacker4Help guidance credit.

### 7. `xss-meets-idor`

**Title:** When Object Authorization and Output Encoding Fail Together  
**Category:** `research`

Keep three boundaries separate before discussing any relationship:

1. **Display-name storage:** frontend rejection, intercepted registration request, server acceptance, and the observed routing/render result; call this stored HTML unless script execution in that sink is evidenced.
2. **Blog object access:** own `BlogID` baseline, one changed ID, and the distinct content returned in the email-preview interface; state what is known and unknown about object ownership/privacy.
3. **Execution sink:** controlled payload storage, history/preview rendering path, callback overview, and sanitized origin/context details.
4. **Chain analysis:** enumerate the prerequisites actually demonstrated and the missing prerequisites rather than asserting automatic email delivery or account takeover.

Provide sanitized request/response snippets for registration and BlogID comparison plus an inert HTML example. Never restore the historical `js.rip` or XSS Hunter URLs, cookies, email address, or reusable payload. A callback supports controlled execution in the documented context; it does not independently prove victim/admin execution, cookie usefulness, session takeover, automatic sending, persistence across users, or a reliable end-to-end IDOR/XSS chain. Preserve the collaboration and guidance credits.

## Implementation and review workflow

1. Restore the exact 37 binary paths from `bf4f644` and verify their blob/source identity before any necessary redaction.
2. Inspect each selected asset at full size, record the visible fact it can safely support, and redact only sensitive material.
3. Reconstruct each article from the historical sequence and current claim boundaries; do not copy old prose wholesale.
4. Add sanitized, syntactically valid request/response/code blocks for the material transitions.
5. Insert images at the specified sequence points with descriptive alt text and captions that state the proof boundary.
6. Keep caveats adjacent to the relevant claims and remove repetitive blanket disclaimers.
7. Preview all seven only on localhost through `/drafts/<slug>/`, checking desktop and narrow layouts for image, caption, and fence readability.
8. Verify production build exclusion independently from localhost draft rendering.
9. Conduct an author factual review of chronology, names, scope, reporting, recognition, and any redactions before considering publication. Publication remains a separate per-post decision.

## Acceptance criteria

The restoration is complete only when all of the following are true:

1. The exact 37 matrix paths exist under `public/images/blog/`; path spelling, case, extension, and post directory match this specification and commit `bf4f644`.
2. Both required CERT-In images exist and appear in `from-dorks-to-defense` under separate September 2025 and October 2025 recognition sections.
3. No decorative GIF, meme, reaction image, title card, author graphic, or other image outside the 37-file matrix is restored or referenced by the seven drafts.
4. Every local image reference resolves to an existing first-party file. None of the seven Markdown files contains a `miro.medium.com`, `medium.com` image, Medium CDN, XSS Hunter, `js.rip`, or other remote image/payload hotlink.
5. Each selected image appears at the required chronological step with descriptive alt text and an adjacent visible caption stating what it proves and, where material, what it does not prove.
6. Redaction removes secrets, personal data, live vulnerable hostnames, emails, tokens, cookies, and reusable operational details without erasing the visible technical behavior cited by the prose.
7. Each post contains substantial technical material appropriate to its subject: chronological observations, baseline/comparison logic, relevant endpoint or parameter shapes, response/state changes, and defensive interpretation. None is reduced to a generic lesson or uncertainty-only essay.
8. All request, response, command, JSON, DNS, and HTML fences are syntactically valid, line-broken, language-labelled where useful, internally consistent, and readable at desktop and narrow localhost preview widths.
9. Reconstructed snippets are labelled as sanitized reconstructions when not direct text captures; no snippet is falsely represented as byte-exact evidence.
10. Claims and caveats are paired locally. Images and snippets are not allowed to imply SQL injection, takeover, authorization bypass, XSS reach, financial loss, recognition scope, remediation, or retest beyond the exact observed fact.
11. Existing selected organization and contributor names are retained in their supported roles; names do not imply unsupported authorization, endorsement, validation, sole credit, severity, or remediation.
12. The prose is original NetworkShard writing and does not imitate the exact design, phrasing, title patterns, rhetorical mannerisms, or voice of `mll.sh`.
13. All seven files retain `draft: true`; no new publication date is assigned, and restoration of one draft does not publish or approve any other draft.
14. All seven render through the current localhost-only `/drafts/<slug>/` preview while the development server is running. No publicly deployable draft-preview mechanism is introduced.
15. A production build excludes all seven from public article routes, blog/category/tag listings, search JSON, RSS, sitemap, related posts, post navigation, and OG routes. Draft production exclusion is verified from generated output, not assumed from frontmatter alone.
16. `from-shodan-to-sqli` includes the service → directory → login → error → dashboard sequence; `subdomain-takeover` ends as a documented false positive; `from-dorks-to-defense` includes technical evidence and both CERT-In records; `business-logic-broken` presents only evidence-backed sequences; `why-idors-are-everywhere` uses a two-object comparison; and `xss-meets-idor` keeps storage, object access, execution, and chain prerequisites distinct.
17. Repository validation passes `git diff --check`, the project's content/type checks, and the production build. The implementation change contains no unrelated edits.

## Out of scope

- publishing any of the seven posts;
- selecting publication dates or changing slugs;
- exact `mll.sh` imitation or a site redesign;
- restoring every historical image;
- downloading assets from Medium or another CDN;
- fabricating missing requests, responses, dates, authorization, reports, remediation, or retest evidence;
- active testing of historical targets;
- provider-resource claims, data enumeration, account access, or other new validation; and
- edits unrelated to the seven drafts and exact evidence assets.

The governing principle is: restore the concrete technical record, make it readable and safe, and put each caveat beside the claim it limits—without stripping the posts of the evidence that makes them useful.