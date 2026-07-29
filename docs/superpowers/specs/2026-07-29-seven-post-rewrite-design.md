# Seven-Post Rewrite Design

Date: 2026-07-29
Status: Approved design; publication requires per-post editorial approval

## Purpose

Rewrite seven promising security articles as evidence-first field notes that strengthen NetworkShard's portfolio without reviving the generic tutorial archive or repeating unsupported claims from the old versions. The rewrites must be technically useful, candid about uncertainty, and explicit about the difference between an observation, an inference, a validated result, and an outcome that remains unknown.

This work covers only the seven article drafts listed below. It does not publish them, change their public URLs, choose publication dates, add redirects, or alter unrelated posts or site behavior.

## Editorial direction and non-imitation policy

The approved direction is **evidence-first field notes**. Each post should open with what happened, establish scope, present observations and validation, state limitations, describe disclosure or remediation only to the extent documented, and close with lessons that changed the author's methodology.

The rewrite may draw only on high-level traits observed at `mll.sh`: direct openings, short sections, clear evidence, candid uncertainty, occasional restrained dry humor, and an absence of filler. It must not copy phrases, sentence structures, recurring rhetorical devices, titles, transitions, signature expressions, or the site's exact voice. The result must sound like NetworkShard and the author, not like an imitation of another writer.

## Content inventory and publication state

All seven slugs are fixed. A restored source file must use the matching filename under `src/content/blog/`; no replacement slug, alias, or redirect is part of this work.

| Slug and preserved URL | Working title | Canonical category | Source state at design time |
|---|---|---|---|
| `google-dorks-guide` — `/blog/google-dorks-guide/` | **What Google Can Reveal About Your Attack Surface—and What It Cannot** | `guides` | Deleted; recover factual leads from Git history |
| `from-shodan-to-sqli` — `/blog/from-shodan-to-sqli/` | **From an Exposed Service to a SQL Injection Finding** | `research` | Deleted; recover factual leads from Git history |
| `subdomain-takeover` — `/blog/subdomain-takeover/` | **I Thought I Found a Subdomain Takeover. I Had Not.** | `research` | Deleted; recover factual leads from Git history |
| `from-dorks-to-defense` — `/blog/from-dorks-to-defense/` | **From Search Results to Two CERT-In Recognitions** | `research` | Retained draft |
| `business-logic-broken` — `/blog/business-logic-broken/` | **Five Findings That Looked Small Until I Followed the State** | `research` | Retained draft |
| `why-idors-are-everywhere` — `/blog/why-idors-are-everywhere/` | **The Invoice Number Changed. The Authorization Decision Did Not.** | `research` | Retained draft |
| `xss-meets-idor` — `/blog/xss-meets-idor/` | **When Object Authorization and Output Encoding Fail Together** | `research` | Retained draft |

Every file must remain `draft: true` throughout rewriting and editorial review. Draft exclusion must continue to prevent routes, search entries, RSS items, sitemap entries, category/tag listings, related-post links, post navigation, and OG routes from exposing these articles.

No publication date is chosen or updated during the rewrite. Existing frontmatter dates are not approval to publish and must not be presented as new publication dates. At the final review for an individual post, the reviewer sets that post's date to its actual publication date immediately before changing `draft: true`; the other six remain drafts with no newly assigned publication date. If the content schema requires a date while a post is a draft, retain its recovered or existing value only as internal compatibility metadata until that post's publication review.

## Shared evidence, disclosure, and style standard

### Evidence standard

Each factual assertion must be supported by at least one reviewable source: a sanitized request or response, a contemporaneous note, a report or acknowledgement, a reproducible controlled test, source code or configuration from an authorized environment, authoritative documentation, or another cited primary source. Old article prose is a lead to investigate, not independent proof.

Every article must distinguish these states in plain language:

- **Observation:** what the author directly saw in a response, interface, record, or controlled test.
- **Inference:** the explanation suggested by that observation but not independently established.
- **Validation:** the minimal action and resulting evidence that confirmed a narrowly stated behavior.
- **Unresolved:** what was not tested, could not be reproduced, or lacks documentary support.

Do not turn absence of evidence into a positive claim. Missing proof must produce narrower prose, an explicit limitation, removal of the assertion, or continued draft status—not a stronger narrative.

Use minimal-impact validation. Do not include live secrets, access tokens, personal data, sensitive records, reusable payload infrastructure, unredacted targets, or instructions that invite testing outside owned or explicitly authorized scope. Requests, responses, identifiers, and diagrams must be sanitized without changing the technical fact they demonstrate.

### Authorization, disclosure, remediation, and impact

Keep organization and platform names already present in the source where naming is factually necessary and disclosure permits it; examples include CERT-In and organizations named in existing acknowledgements. Do not invent a new organizational association or use an existing name to imply authorization, endorsement, validation of every technical claim, remediation, or impact.

A post may say an assessment was authorized only when the review packet contains evidence of the relevant scope and timeframe. It may say a finding was reported, acknowledged, remediated, or retested only when the corresponding event is documented. Recognition proves only the recognition described by its source; it does not by itself prove authorization, exploitability, severity, remediation, or the complete chronology.

State demonstrated impact separately from hypothetical impact. Label plausible consequences as conditional and include them only when they clarify the security boundary. Do not claim account takeover, financial loss, mass exposure, successful exploitation, durable state change, privilege escalation, cookie theft, or an end-to-end vulnerability chain unless the retained evidence demonstrates that exact result.

Each draft includes a concise **Scope and disclosure** note stating:

1. the test environment or authorized scope that can safely be disclosed;
2. whether the evidence is controlled, real-target, or reconstructed from contemporaneous records;
3. the reporting status and remediation/retest status, using `not confirmed` where documentation is absent; and
4. the redactions or omissions made to protect users and systems.

Unresolved factual questions belong in the private editorial review record, not as speculation presented confidently in public prose.

### Text-first presentation

The rewrites are text-first. Remove all old Medium/CDN hotlinks, hero images, screenshots, reaction GIFs, memes, decorative animations, emoji-led section furniture, author-boilerplate blocks, promotional endings, and unrelated platform links. Do not carry old media into a rewrite merely because it exists in the source.

Prefer concise prose, valid fenced request/response snippets, tables, and text-based flow or trust-boundary diagrams. A sanitized image may be introduced later only when it proves something that cannot be represented accurately in text, its provenance and disclosure status have been reviewed, it contains no sensitive data, and it is stored as a first-party site asset rather than hotlinked. Removing old media must not remove contributor credit or a necessary factual acknowledgement; preserve those as restrained text when supported.

### Writing standard

Every draft must use:

- a direct first-person opening tied to the actual observation;
- short paragraphs and restrained, descriptive headings;
- enough context to understand the system boundary, without a generic "what is X?" preamble unless required;
- valid and readable request/response examples rather than malformed imported snippets;
- precise terminology, including object-level authorization/BOLA where appropriate;
- explicit limits on what a test did and did not prove;
- no unsupported severity labels, superlatives, sensational framing, or assumed exploit chains;
- no copied phrasing or exact voice imitation from `mll.sh` or another source;
- no emojis in titles and no decorative emoji headings;
- no operational secrets, tokens, personal data, or live exploit targets; and
- a concise closing that records what changed in the author's future testing or reporting method.

## Post specifications

### 1. `google-dorks-guide`

**Working title:** What Google Can Reveal About Your Attack Surface—and What It Cannot  
**Category:** `guides` — Guides & Fundamentals  
**Angle:** A defensive search-index exposure audit performed only against controlled or clearly authorized scope. This post teaches a review method rather than serving as a sensational query list.

#### Detailed section outline

1. **Search engines are not a backdoor** — Define indexed exposure and explain that a result reflects what a crawler found, not privileged access or proof of a vulnerability.
2. **Defining scope before writing queries** — Establish owned or explicitly authorized domains, approved test boundaries, handling rules, and stop conditions before searching.
3. **Operators that still work in 2026** — Explain only current, defensible operators verified against current Google documentation; describe limitations and unstable behavior.
4. **Why `site:` is not an asset inventory** — Cover incomplete indexing, stale results, canonicalization, subdomain gaps, regional variation, and false confidence from result counts.
5. **Separating indexed content from actual vulnerabilities** — Triage public-by-design pages, stale copies, metadata leakage, access-control failures, and false positives without assuming impact.
6. **A repeatable review workflow** — Define query logging, deduplication, manual verification, reproducibility, severity restraint, and stop/escalation decisions.
7. **Evidence handling and responsible disclosure** — Preserve the minimum evidence needed, avoid collecting sensitive content, record timestamps and redactions, and report through the correct channel.
8. **Defensive controls** — Distinguish robots directives and de-indexing from real access control; cover authentication, storage policy, cache removal, and post-fix verification.

#### Claim boundary

Search results may be described only as indexed exposure. They are not proof of unauthorized access, complete asset inventory, vulnerability, exploitation, or impact. Examples must use controlled or clearly authorized assets. Verify operator behavior against current primary documentation before publication. Exclude credential-hunting examples, exposed-camera queries, unsupported breach anecdotes, and other sensational targets. CERT-In experience may appear only as a narrowly sourced lesson and must not make this article duplicate `from-dorks-to-defense`, which is the case study.

### 2. `from-shodan-to-sqli`

**Working title:** From an Exposed Service to a SQL Injection Finding  
**Category:** `research` — Research & Findings  
**Angle:** A restrained case study showing how an internet-wide discovery signal led to manual, minimal-impact validation.

#### Detailed section outline

1. **What Shodan showed** — Record the observable service, timestamp, and metadata that prompted review.
2. **What Shodan did not prove** — State that indexing did not establish ownership, authorization, SQL injection, exploitability, severity, or impact.
3. **Narrowing the target surface** — Explain how the relevant application and input were identified without broad scanning or speculative exploitation.
4. **Establishing the injection point** — Compare a baseline request with the smallest safe variation and identify the response difference.
5. **Minimal-impact validation** — Describe the limited confirmation method, stop condition, and why data extraction or destructive testing was unnecessary.
6. **Evidence boundaries** — List the sanitized evidence retained and the facts it supports, while separating inferred backend behavior.
7. **What remains unverified** — State whether database contents, privilege, data volume, exploit chain, and business impact were not tested or confirmed.
8. **Reporting and remediation status** — Give only documented dates and outcomes; otherwise state that acknowledgement, remediation, or retest is not confirmed.

#### Claim boundary

Shodan is an initial signal only. Manual evidence must support the narrow SQL-injection finding independently. State authorization or disclosure context only when documented. Do not claim data access, compromise, organizational impact, remediation, retesting, or any other outcome absent from the review packet. Existing target or organization names may remain when disclosure permits, but naming does not relax this evidence standard. If lawful testing or disclosure context cannot be established for the real-target account, the post cannot be published in that form and must remain a draft or be rebuilt around a controlled lab.

### 3. `subdomain-takeover`

**Working title:** I Thought I Found a Subdomain Takeover. I Had Not.  
**Category:** `research` — Research & Findings  
**Angle:** A false-positive investigation that explains why suspicious DNS evidence did not establish a claimable resource.

#### Detailed section outline

1. **The initial signal** — Describe the condition that suggested a possible takeover and why it warranted investigation.
2. **The DNS chain** — Reconstruct the relevant DNS records and resolution path with timestamps and sanitized output.
3. **Why “no CNAME” changed the conclusion** — Explain why the absence of the expected delegation weakened or defeated the original hypothesis.
4. **TXT records versus provider verification** — Separate domain-verification artifacts from routing and resource-ownership proof.
5. **Dangling DNS versus claimable resources** — Define the additional provider-side conditions required before takeover can be established.
6. **A modern takeover decision tree** — Give a safe, text-first sequence from DNS observation through provider fingerprint, claimability, authorization, and stop conditions.
7. **How to report uncertainty correctly** — Show how to report a suspected configuration issue without labeling it a confirmed takeover.
8. **What I would test differently now** — Record improvements in evidence capture, provider research, validation restraint, and conclusion wording.

#### Claim boundary

The explicit conclusion is that the suspected takeover was **not established**. A dangling record, TXT verification record, provider fingerprint, error page, or initial scanner result is not proof that an external party could claim the backing resource. Do not describe successful takeover, control of content, or impact. Any statement about the real target remains draft-only until the DNS evidence, provider behavior at the relevant time, authorization, and disclosure history are confirmed.

### 4. `from-dorks-to-defense`

**Working title:** From Search Results to Two CERT-In Recognitions  
**Category:** `research` — Research & Findings  
**Angle:** A first-person account of turning reconnaissance observations into responsible reports and two documented recognitions.

#### Detailed section outline

1. **Why I started with search-index exposure** — Open with the research question and explain why search was a low-impact starting point.
2. **Defining government-domain scope** — State the applicable published scope or reporting framework only as documented, along with constraints and stop conditions.
3. **Triage and false positives** — Show how indexed results were deduplicated and separated from public-by-design pages, stale results, and unsupported suspicions.
4. **The findings that were reportable** — Describe only the SQL-injection, XSS, or information-exposure observations supported by retained evidence, without collapsing separate findings into one impact claim.
5. **Evidence preservation** — Explain sanitized reproduction notes, timestamps, request/response capture, and avoidance of unnecessary data access.
6. **Reporting to CERT-In** — Present the documented submission or acknowledgement path and chronology without filling gaps from memory.
7. **What the recognitions do—and do not—prove** — Tie the two recognition facts to their sources and separate recognition from authorization, severity, remediation, and endorsement.
8. **Lessons for future research** — Close with improvements to scoping, triage, evidence quality, and report language.

#### Claim boundary

The article may state two CERT-In recognitions only when the review packet verifies the identity and dates. It must not infer from those recognitions that every described issue was validated, that testing was authorized beyond a documented policy, that every issue was patched, or that a particular impact occurred. Exact remediation chronology must be omitted or marked unconfirmed unless documented. Retain government and CERT-In names already present when factually supported, but redact vulnerable hosts and sensitive parameters. Do not turn this into another operator catalogue; `google-dorks-guide` owns the reusable methodology.

### 5. `business-logic-broken`

**Working title:** Five Findings That Looked Small Until I Followed the State  
**Category:** `research` — Research & Findings  
**Angle:** A multi-finding assessment organized around server-side state and trust boundaries rather than dramatic labels.

#### Detailed section outline

1. **The application and assessment context** — Describe the platform function, test account, collaboration credit, known scope, and evidence limitations without implying authorization that is not documented.
2. **Finding 1: response handling versus server-side authorization** — Separate a client-visible response modification from a server-accepted state transition and identify which one the evidence actually shows.
3. **Finding 2: OTP challenge binding** — Examine OTP length, rate controls, expiry, challenge/session binding, and the specific flow tested; distinguish theoretical brute force from demonstrated bypass.
4. **Finding 3: wallet or credit state** — Trace request, response, and persisted state; separate UI display changes from durable server-side balance or transaction changes.
5. **Finding 4: document rendering boundaries** — Treat PDF and SVG uploads by storage, content type, delivery headers, rendering origin, and execution context rather than assuming every uploaded script executes.
6. **Finding 5: what could not be proven** — Identify unverified mobile-number state, victim/admin rendering, persistence, cross-user reach, purchase use, and end-to-end account compromise.
7. **Shared root causes** — Discuss server-side validation, state-machine enforcement, authorization, challenge binding, file handling, and output isolation only where the observations support them.
8. **Reporting and evidence limitations** — State what was reported, acknowledged, fixed, or retested only from documentation and record the remaining gaps.

#### Claim boundary

Do not claim pre-account takeover, account takeover, arbitrary wallet credit, financial loss, purchase abuse, stored PDF/SVG script execution in another user's context, mobile-verification bypass, or durable backend state change unless evidence demonstrates that exact outcome. Changing a proxied response from `400` to `200` proves only client behavior unless a subsequent server-side effect is independently verified. Preserve collaborator and organization/platform names already present when accurate and disclosure-safe, but do not let attribution imply authorization or validation.

### 6. `why-idors-are-everywhere`

**Working title:** The Invoice Number Changed. The Authorization Decision Did Not.  
**Category:** `research` — Research & Findings  
**Angle:** A focused object-level authorization case study using modern BOLA terminology rather than a broad claim that IDORs are universal.

#### Detailed section outline

1. **The smallest possible test** — Begin with the owned invoice baseline and the single identifier change that tested an authorization boundary.
2. **Two accounts, one object identifier** — Use two controlled accounts or equivalent authorized fixtures to demonstrate owner/non-owner behavior without accessing unrelated users' data.
3. **Authentication is not authorization** — Explain why a valid session does not establish permission to the requested object.
4. **What data was exposed** — Enumerate only fields observed in controlled or reviewed evidence and redact all personal or payment data.
5. **How far I tested—and where I stopped** — State the sample size, stop condition, and actions deliberately not performed.
6. **Root cause** — Locate the missing ownership or policy decision at the server boundary without overgeneralizing from predictable identifiers alone.
7. **Correct server-side authorization** — Describe subject-object-action checks, opaque identifiers as defense in depth, and safe denial behavior.
8. **Regression tests developers can keep** — Specify owner, non-owner, unauthenticated, role-boundary, read, and mutation test cases.

#### Claim boundary

A sequential ID is an indicator, not a vulnerability. Publish the real-target case only if controlled or authorized evidence confirms cross-object access and disclosure review permits it; otherwise rebuild the examples entirely with controlled accounts and describe no real users. Do not claim thousands of invoices, payment-card exposure, account takeover, legal or regulatory consequences, prevalence across applications, or write/delete/privilege-escalation impact from a read-only observation. The title's "authorization decision did not" must refer to a verified missing object-level check, not merely a guessed adjacent ID.

### 7. `xss-meets-idor`

**Working title:** When Object Authorization and Output Encoding Fail Together  
**Category:** `research` — Research & Findings  
**Angle:** A vulnerability-chain analysis that treats object access and each rendering context separately and does not equate coexisting findings with account takeover.

#### Detailed section outline

1. **Why the chain mattered** — State the narrow hypothesis connecting unauthorized object access with unsafe rendering, without announcing the outcome in advance.
2. **The object-access weakness** — Establish which object, action, role, and identifier lacked an authorization check and what access was actually demonstrated.
3. **Three rendering contexts** — Analyze the display-name path, email-to-friend preview, and blog-history preview as separate sinks with separate encoders and trust boundaries.
4. **Stored versus reflected behavior** — Identify where input was persisted, where it was later rendered, and which behavior was only suspected.
5. **Cookie and session constraints** — Account for `HttpOnly`, `SameSite`, CSP, origin, privilege, and authenticated context before discussing session impact.
6. **What execution proved** — Describe the exact controlled JavaScript or network callback observed, its origin and user context, and the minimal retained evidence.
7. **What it did not prove** — Bound account takeover, victim reach, cookie theft, automatic sending, administrative execution, persistence across users, and chain reliability.
8. **Remediation by boundary** — Separate object-level authorization, context-specific output encoding, safe URL/HTML handling, CSP, cookie flags, and stored-content cleanup.
9. **Lessons from chaining moderate findings** — Explain why chains require every prerequisite to be demonstrated and how future validation will record each boundary.

#### Claim boundary

Do not infer account takeover, cookie exfiltration, victim/admin execution, malicious-email delivery, or a reliable compound exploit merely because IDOR and XSS-like behavior appear in the same application. HTML storage, a broken profile route, and hypothetical rendering elsewhere do not prove stored XSS. Any callback proves only execution in the documented origin, session, and rendering context. Claims about authorization, disclosure, remediation, the identity of affected users, or chain impact require their own evidence. Remove live third-party payload URLs and replace them with inert, controlled examples.

## Factual source handling for deleted files

The deleted source files are recovered from Git history solely as research inputs; they are not restored wholesale and their prose is not presumed true. Use the repository-relative paths:

- `src/content/blog/google-dorks-guide.md`
- `src/content/blog/from-shodan-to-sqli.md`
- `src/content/blog/subdomain-takeover.md`

For each file, identify the last commit in which it existed, then read that exact blob with `git log --all -- <path>` and `git show <commit>:<path>`. Record the commit hash used in the private review packet so reviewers can reproduce the source extraction. Do not create backup Markdown files, copy content from generated `dist/` output, or restore old media.

Treat recovered titles, dates, names, requests, screenshots, and outcome statements as leads requiring corroboration. Cross-check them against retained local evidence, reports, acknowledgements, primary vendor or program records, and current authoritative documentation. Preserve wording from a recovered source only when it is an unavoidable technical literal—such as a sanitized header, parameter name, or response—and not imported editorial prose. If a fact cannot be corroborated, narrow it, label the uncertainty where useful, omit it, or keep the post unpublished.

The four retained drafts are subject to the same standard. Their presence in the working tree and their existing media or prose do not confer evidentiary status.

## Acceptance criteria

The rewrite set is editorially complete only when all of the following are true:

1. Exactly the seven listed slugs exist as rewrite drafts at their preserved paths; no slug or intended `/blog/<slug>/` URL has changed.
2. Every one of the seven has `draft: true`, the specified canonical category, its approved working title, a concise description consistent with demonstrated facts, and no newly selected publication date.
3. The three deleted sources were consulted through reproducible Git-history references, not copied from `dist/`, web caches, or ad hoc backup files.
4. Every draft follows its detailed section outline or documents an editorially approved consolidation that preserves every required subject and claim boundary.
5. Every material factual claim maps to reviewable evidence or an authoritative citation; observation, inference, validation, and unresolved uncertainty are distinguishable.
6. Every real-target draft includes a scope-and-disclosure note. Authorization, acknowledgement, remediation, retest, recognition, and impact language matches the available documentation exactly.
7. Existing organization and contributor names are preserved where accurate and disclosure-safe, while no name is used to imply unsupported authorization, endorsement, remediation, severity, or impact.
8. The post-specific claim boundaries in this specification are honored. Unsupported account-takeover, financial-loss, mass-exposure, successful-exploitation, durable-state-change, and completed-remediation claims are absent.
9. All Medium/CDN hotlinks, old screenshots, GIFs, memes, decorative media, promotional endings, malformed imported snippets, and live third-party payload links are removed. Any newly admitted image satisfies the first-party, sanitized-evidence exception.
10. The prose is original NetworkShard writing: no copied phrases, title patterns, or exact voice imitation from `mll.sh`; the allowed influence is limited to the high-level traits stated in this specification.
11. Requests and responses are syntactically readable, sanitized, internally consistent, and accompanied by enough context to show what they prove and what they do not.
12. No draft contains secrets, personal data, operational target details, or instructions that encourage testing outside owned or explicitly authorized scope.
13. Draft filtering remains effective: none of the seven appears in generated routes, `/blog`, search JSON, RSS, sitemap, category/tag listings, related posts, post navigation, or OG routes before individual publication approval.
14. Repository validation for the eventual rewrite change passes `git diff --check`, `npm run check`, and `npm run build`, with no unrelated file changes included in the rewrite set.
15. Each post receives a separate factual, disclosure, safety, copy, and publication-date review; passing review for one post does not authorize publication of another.

## Review workflow before publication

Publication is per post, never an all-seven batch assumption.

1. **Rewrite locally:** Build the article from the approved outline while keeping `draft: true`, using recovered prose only as a fact lead and excluding old media.
2. **Assemble the private evidence packet:** For each material claim, record its source, what it proves, what it does not prove, relevant scope, disclosure status, redactions, and any Git commit/blob used. Keep sensitive evidence outside public article content.
3. **Author factual review:** The author confirms technical sequence, dates of events, organization and contributor names, authorization scope, observed results, and unresolved facts. Unsupported statements are narrowed or removed.
4. **Disclosure and safety review:** Confirm that naming is permitted, vulnerable details are appropriately redacted, no personal data or reusable secrets remain, and publication will not expose an unresolved live target. A missing authorization or disclosure basis blocks a real-target version from publication.
5. **Claim-boundary review:** Check the draft against the shared standard and its post-specific boundary. Conditional impact must be labelled; recognition, reporting, remediation, and retest statements must have separate support.
6. **Media and source review:** Confirm all old media is gone, every retained quotation or technical literal has provenance, citations use primary/current sources where available, and any exceptional new image is first-party, sanitized, and necessary.
7. **Copy and non-imitation review:** Verify the article is concise, technically readable, free of promotional filler and sensational framing, and does not reproduce phrases or the exact voice of `mll.sh` or the imported Medium article.
8. **Technical preview:** Run repository checks and inspect the draft locally without exposing it through published collections. Confirm frontmatter validity, code-block rendering, links, redactions, responsive text layout, and continued draft exclusion from all generated artifacts.
9. **Publication decision:** The reviewer either (a) approves the specific post, (b) returns it for stated corrections, or (c) keeps it indefinitely as a draft. Unresolved evidence or disclosure questions always select (b) or (c).
10. **Set publication metadata last:** Only after explicit approval, assign the actual publication date and change that one post from `draft: true` to published. Re-run checks and generated-output review before deployment. Do not alter the dates or draft state of the other posts.
11. **Post-publication verification:** Confirm the preserved URL resolves, metadata and feeds include only the newly approved post, redactions render correctly, and no sibling draft has become visible. Record later remediation updates as dated amendments rather than silently rewriting the original chronology.

The governing rule is: rewrite everything locally, review factual claims and evidence with the author, and publish only the individual posts whose evidence and disclosure boundaries are confirmed.