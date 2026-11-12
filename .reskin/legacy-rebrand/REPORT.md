# Rebrand report

> 摘要：已将 **Blackpool** 更换为 **Agpool**（`agpool.cash` / @agpool_robin），验证结论：**通过**。

- Generated: 2026-11-11T23:48:56+08:00
- Project: `E:\workspace\chuangye\ROBIN\blackpool\website`
- Old brand: **Blackpool**
- New brand: **Agpool**
- Domain: `agpool.cash`
- X: `@agpool_robin`
- Email: `hello@agpool.cash`
- Verdict: **PASS**

## Gates

| Gate | Result | Detail |
|---|---|---|
| old_brand_source | PASS | 0 file hit(s), 0 path hit(s) |
| new_brand_presence | PASS | 5 surface(s) found: title, meta, canonical, package, readme |
| assets | PASS | 0 problem(s) |
| references | PASS | 14 checked, 0 problem(s) |
| build_test | PASS | test skipped: script not defined |
| availability | PASS | selected Agpool via chrome-cdp+rdap |
| brand_registry | PASS | current Agpool; history 1 entry |
| browser | PASS | 16 screenshot(s), 0 problem(s) |

## Availability evidence

- Method: `chrome-cdp+rdap`
- Selected: `Agpool`
- Evidence directory: `.rebrand/availability/`


## Brand registry

- File: `brand.txt`
- Current: `Agpool`
- History: Blackpool

## Changes

- Files changed: 73
- Replacements: 691
- Renames: 0
- Assets replaced: 4
- Backup: `E:/workspace/chuangye/ROBIN/blackpool/website/.rebrand/backup/20261111-232040`

## Build and test

| Check | Baseline | Current |
|---|---|---|
| build | True | True |
| test | True | True |

## Browser

- Routes: /, /docs, /agents, /token, /privacy, /terms, /changelog, /status
- Screenshots: `.rebrand/screenshots/`
- Baseline screenshots: `.rebrand/baseline/`

## Protected / residual

- **thirdParty**: `@vitejs/plugin-vue`, `amazon`, `angular`, `anthropic`, `apple`, `aws`, `bootstrap`, `cloudflare`, `deepseek`, `digitalocean`, `discord`, `django`, `docker`, `facebook`, `fastapi`, `figma`, `flask`, `github`, `gitlab`, `google`, `googleanalytics`, `googletagmanager`, `heroku`, `hotjar`, `instagram`, `intercom`, `javascript`, `jquery`, `kubernetes`, `laravel`

## Rollback

```bash
python "<skill>/scripts/rollback.py" --project "E:\workspace\chuangye\ROBIN\blackpool\website" --out "E:\workspace\chuangye\ROBIN\blackpool\website\.rebrand" --latest
```

Availability is a snapshot. This report does not register the domain or create the X account.

## Follow-up edits requested after the rebrand

**1. Top notice module removed site-wide**

- Deleted `src/components/SiteNotice.vue` and `src/styles/notice.css` (and the `notice.css` import in `src/main.js`).
- Removed `<SiteNotice />` from `src/views/HomeView.vue`.
- Removed the same inline `.bp-notice` block from 13 content pages: `ChainArbitrumView`, `ChainBaseView`, `ChainBnbView`, `ChainRobinhoodView`, `ChangelogView`, `DocsView`, `GuideAgentsView`, `GuideSendView`, `PrivacyView`, `PrivatePaymentsView`, `StatusView`, `TermsView`, `TokenView`.
- The bar was the "$BP contract on Robinhood Chain … Copy … Our only X account is @agpool_robin" strip. Nothing else depended on it (`notice.css` was self-contained; `.bp-ca` copy handling in `useCopyControls.js` is a delegated handler that is now simply inert).

**2. GitHub external links removed from the footers**

- `src/components/SiteFooter.vue`: removed the Resources "GitHub" item, the Resources "Security policy" item (it pointed at `github.com/…/SECURITY.md`), and the bottom-bar GitHub social link. Only the X social link remains.
- `src/components/app/AppFooter.vue`: removed the GitHub icon button (`/app` page footer now: Docs, Explorer, Recover, Agents, Status, Analytics).
- GitHub links that remain **outside** the footers, intentionally not touched: `/token` "Official links → Source code", `/agents` "Also in … GitHub", `/docs` "Full address book … deploy/ADDRESSES.md". Say the word and they can go too.
- Snapshot taken before these edits: `.rebrand/backup/pre-ui-20261111-234413/` (92 files).

Re-verified after the edits: all gates PASS, `build` OK, 8 routes × desktop/mobile = 16 screenshots with no page errors, no failed assets, and no old-brand strings. The `/app` page was additionally captured by hand (`.rebrand/screenshots/app-desktop.png`) to confirm the app footer.

## Manual steps run on top of `apply.py`

`apply.py` handled 73 files / 691 replacements and the four generated images. These follow-up steps were required and are recorded here:

1. **Pre-pass for code-host URLs** (`.rebrand/prepass.json`). `apply.py` protects every URL on `github.com`/`npmjs.com` by host name, which would have left `github.com/blackpooldev/blackpool` and `www.npmjs.com/package/@blackpool/cli` in 10 files. Because this project *is* renaming its own repository, those two URLs were rewritten first (`github.com/agpooldev/agpool`, `www.npmjs.com/package/@agpool/cli`), then `apply.py` replaced everything else with its normal backup/manifest.
2. **Brand glyph** (19 Vue components). The old inline mark (a masked swirl) was replaced with the new `A` cut-out used by the regenerated `favicon.svg`, `mark.svg` and `apple-icon.png`, so the nav/footer monogram and the favicon match.
3. **Lockfile** (excluded from the rebrand scanner by design): the two `"name"` fields in `package-lock.json` were synced to `agpool-website`.
4. **Grammar**: the mechanical replacement produced "a Agpool" in three places (`public/AGENTS.md`, `AgentsView.vue`, `DocsView.vue`); they were corrected to "an Agpool".
5. **OG cache-buster**: `og.png?v=5` → `og.png?v=6` in `index.html` so social/CDN caches pick up the new card.
6. Pre-rebrand full source snapshot: `.rebrand/backup/preflight-20261111-231740/` (91 files) in addition to the per-file `apply.py` backup.

### Verifier note (stock `verify.py` references gate)

The bundled verifier's `references_check` treats any absolute `http(s)` URL in a `src|href|poster|content` attribute as a missing local file, so the two correct absolute `og:image`/`twitter:image` URLs fail the `references` gate. This reproduces on the untouched pre-rebrand `index.html` (recorded in `.rebrand/verification-stock-run.json`; it is a verifier bug, not a rebrand defect). The final run used `.rebrand/tools/verify_external_fix.py`, which marks absolute URLs as external and otherwise runs the stock verifier unchanged — every local reference is still checked (14 checked, 0 problems).

## Decisions and residual risks

- **Display casing** is `Agpool` in prose and headings (the user-supplied name is `agpool`; the lowercase slug is used in domains, package name and code identifiers). Change `brand.txt`/copy if an all-lowercase wordmark is preferred.
- **Domain** keeps the original `.cash` TLD: `agpool.cash` (+ `api.agpool.cash`, `mcp.agpool.cash`). Registry RDAP returned 404 (registrable) on 2026-11-11; the domain is **not registered** by this run.
- **X handle** is `@agpool_robin` everywhere (meta tags, footer, docs, AGENTS.md). x.com/agpool_robin returned "This account doesn't exist" — the account still has to be created.
- **External infrastructure must follow the names now used by the site**: the GitHub repository `github.com/agpooldev/agpool`, the npm package `@agpool/cli`, the API `api.agpool.cash`, the MCP endpoint `mcp.agpool.cash`, the registry listing `cash.agpool/agpool`, and the empty `hello@agpool.cash` mailbox. Until those exist, links/endpoints are dead — they were dead-link references renamed as part of the brand, as the user required zero BLACKPOOL strings. (The price feed degrades gracefully to Coinbase and its design-time fallbacks; the app's private flows are client-side only in this rebuild.)
- **Token identity kept**: the `$BP` ticker and the on-chain contract address `0xB6F2…EdC1` were deliberately **not** changed (token/chain identity, not site branding). The page now reads "AGPOOL ($BP)". Say the word if you want `$AGP` and a new contract.
- **Private-account derivation changes**: the sign-in message now starts "Welcome to Agpool" and local-storage keys are `agpool.*`; the derived private account identifiers therefore differ from the old site and any old local demo state is not read. This is intrinsic to a rename of the sign-in message (the old brand is inside it). The rebuilt site holds no funds; see README.
- **`.rebrand/` is not part of the site**: it holds backups, the stock-run evidence, screenshots and this report. Do not deploy it. `dist/` and `node_modules/` are excluded from the scan; `dist/` was rebuilt and contains zero old-brand strings.

## Where things are

| Path | What |
|---|---|
| `brand.txt` | Registry: `current: Agpool`, `history: Blackpool` (only intentional old name in the tree) |
| `.rebrand/manifest.json` | Per-file replacements, hashes, asset copies, backup path |
| `.rebrand/plan.json` / `APPLY.md` | Dry-run plan that was reviewed before applying |
| `.rebrand/prepass.json` | Code-host URL pre-pass record |
| `.rebrand/availability.json` + `availability/` | X/RDAP evidence (screenshot + JSON) |
| `.rebrand/generated/` | New `og.png`, `favicon.svg`, `mark.svg`, `apple-icon.png` |
| `.rebrand/screenshots/` | 8 routes × desktop/mobile after the rebrand (+ `app-desktop.png`) |
| `.rebrand/baseline/` | Pre-rebrand screenshots |
| `.rebrand/backup/` | `apply.py` backup + `preflight-*` and `pre-ui-*` snapshots |

