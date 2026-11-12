# Reskin verification — FAIL

Generated: 2026-11-12T09:33:34.925Z

- Project: **agpool-website**
- URL: http://127.0.0.1:4317/
- Original skeleton: `bento-canvas` (spatial)
- New skeleton: `marketing-stack` (editorial)
- Accent: #4f46e5 -> #4c63d2 (31.25 ΔE; min 30)
- Source contract: intact (`b26b281dc7ca`)

| Route | Result | DOM similarity | Landmark similarity | Axe serious | Screenshot |
|---|---|---:|---:|---:|---|
| `/` | PASS | 0.209 | 0.5 | 0 | [desktop](current/home-desktop.png) |
| `/agents` | PASS | 0.097 | 0.429 | 0 | [desktop](current/agents-desktop.png) |
| `/AGENTS.md` | FAIL | 1 | 1 | 0 | [desktop](current/AGENTS-md-desktop.png) |
| `/analytics` | PASS | 0.118 | 0.667 | 0 | [desktop](current/analytics-desktop.png) |
| `/app` | PASS | 0.26 | 0.5 | 0 | [desktop](current/app-desktop.png) |
| `/changelog` | PASS | 0.241 | 0.5 | 0 | [desktop](current/changelog-desktop.png) |
| `/docs` | PASS | 0.082 | 0.429 | 0 | [desktop](current/docs-desktop.png) |
| `/guides/private-payments-for-ai-agents` | PASS | 0.125 | 0.6 | 0 | [desktop](current/guides-private-payments-for-ai-agents-desktop.png) |
| `/guides/send-crypto-privately` | PASS | 0.154 | 0.6 | 0 | [desktop](current/guides-send-crypto-privately-desktop.png) |
| `/llms.txt` | PASS | 0.118 | 0 | 0 | [desktop](current/llms-txt-desktop.png) |
| `/privacy` | PASS | 0.145 | 0.6 | 0 | [desktop](current/privacy-desktop.png) |
| `/private-payments` | PASS | 0.188 | 0.6 | 0 | [desktop](current/private-payments-desktop.png) |
| `/private-payments/arbitrum` | PASS | 0.126 | 0.6 | 0 | [desktop](current/private-payments-arbitrum-desktop.png) |
| `/private-payments/base` | PASS | 0.126 | 0.6 | 0 | [desktop](current/private-payments-base-desktop.png) |
| `/private-payments/bnb-chain` | PASS | 0.126 | 0.6 | 0 | [desktop](current/private-payments-bnb-chain-desktop.png) |
| `/private-payments/robinhood-chain` | PASS | 0.126 | 0.6 | 0 | [desktop](current/private-payments-robinhood-chain-desktop.png) |
| `/recover` | PASS | 0.185 | 0.667 | 0 | [desktop](current/recover-desktop.png) |
| `/status` | PASS | 0.118 | 0.6 | 0 | [desktop](current/status-desktop.png) |
| `/terms` | PASS | 0.161 | 0.6 | 0 | [desktop](current/terms-desktop.png) |
| `/token` | PASS | 0.157 | 0.6 | 0 | [desktop](current/token-desktop.png) |

## Blocking issues

- /AGENTS.md: skeleton too similar: DOM fingerprint 1 > 0.5
- /AGENTS.md: landmark layout too similar: 1 > 0.68
- /AGENTS.md: CSS class reuse too high: 1 > 0.1
- /AGENTS.md: mobile: route navigation is not reachable (no visible links or menu toggle)

## Warnings

- attributes: "href=/" count increased 35 -> 36
- attributes: "href=/app" count increased 49 -> 50
- links: "href:/" count increased 35 -> 36
- links: "href:/app" count increased 49 -> 50
- /: numeric token count changed: 36 -> 37 (dynamic values may differ)
- /: mobile nav: 1 baseline target(s) no longer visible (/private-payments)
- /AGENTS.md: desktop: empty document title
- /AGENTS.md: desktop: no h1
- /AGENTS.md: mobile: empty document title
- /AGENTS.md: mobile: no h1
- /app: aria attribute added: aria-label=Private amount
- /app: aria attribute added: aria-label=Recipient address
- /app: desktop: no h1
- /app: mobile: no h1
- /llms.txt: aria attribute added: aria-label=Agpool home
- /llms.txt: aria attribute added: aria-label=Launch the Agpool app
- /llms.txt: aria attribute added: aria-label=Ways back
- /llms.txt: link target added: /
- /llms.txt: link target added: /app

## Thresholds

- DOM fingerprint similarity <= 0.5
- Landmark sequence similarity <= 0.68
- CSS class overlap <= 0.1
- Accent distance >= 30 ΔE
- Contrast failures <= 0
- Axe serious/critical <= 0

All content is compared as a multiset of visible words plus rendered attribute values. Reordering is allowed, rewriting/removing/adding visible copy is not. Dynamic numeric values are reported as warnings, never silently accepted.
