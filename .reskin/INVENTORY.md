# Reskin inventory — agpool-website

Generated: 2026-11-12T09:07:05.091Z

## Project

| Field | Value |
|---|---|
| Root | `E:/workspace/chuangye/ROBIN/blackpool/website` |
| Vue | ^3.5.13 |
| Package manager | npm |
| Nuxt | no |
| CSS frameworks | none detected |
| Files scanned | 55 (40 SFCs) |

## Original skeleton

- Archetype: **bento-canvas** (spatial)
- Traits: cards, hero, table, tabs, modal, charts, terminal, bento
- Max template depth: 14
- Top-level tags: routerview, section, section, svg, div, section, section, section, svg, div, i, section, div, canvas, footer, nav, section, div, div, teleport, div, teleport, teleport, main, main, main, main, div, main, main, main, main, main, main, main, main, main, main, main, connectmodal, main, main, main

The replacement skeleton must not be `bento-canvas` and must not be in the same family (`spatial`).

## Routes

- `/`
- `/agents`
- `/AGENTS.md`
- `/analytics`
- `/app`
- `/changelog`
- `/docs`
- `/guides/private-payments-for-ai-agents`
- `/guides/send-crypto-privately`
- `/llms.txt`
- `/privacy`
- `/private-payments`
- `/private-payments/arbitrum`
- `/private-payments/base`
- `/private-payments/bnb-chain`
- `/private-payments/robinhood-chain`
- `/recover`
- `/status`
- `/terms`
- `/token`

## Palette (most used first)

_No colors found._

## Content lock

- Static visible text tokens: **3765**
- Binding expressions: **139**
- Event handlers: **49**
- Contract hash: `49300fe510a9d3d185544bbc45be04ad8ab022f42a8b14ea7fb137fd7a629c30`

Everything in `.reskin/content-contract.json` is immutable: visible copy, placeholders, labels, routes, link targets, asset sources, bindings, handlers, API endpoints and i18n values. A reskin may move these tokens to new markup but may not rewrite, remove or hide them.

## Next

```bash
node scripts/choose-style.mjs --project "E:/workspace/chuangye/ROBIN/blackpool/website" --out .reskin
node scripts/verify.mjs baseline --project "E:/workspace/chuangye/ROBIN/blackpool/website" --out .reskin
```

Then rewrite the UI and run `verify.mjs check`.
