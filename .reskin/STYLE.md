# Reskin art direction — Paper Protocol

> Selected automatically. Do not ask the user to confirm or choose another direction.

- **Style DNA:** `ethereum-paper` (crypto-editorial)
- **Skeleton:** `gallery-scroll` (spatial)
- **Seed:** `272466044c508b933059740258df87ee17121490487a0ce1fbbee0732f8c0d8c`
- **Source DNA:** [https://ethereum.org](https://ethereum.org)
- **Live sampled:** no — offline-safe catalog used
- **Original:** dashboard-shell / dark / accent #34c77b

## Why this direction

The selector sampled 4/10 blockchain references, scored every direction for perceptual distance from the original accent (#34c77b) and background (#0b0c0e), added a deterministic seed jitter, and chose Paper Protocol because it is 122 ΔE away from the original accent and pairs with Gallery Scroll, a spatial skeleton rather than the original dashboard-shell.

## Live reference sampling

| Style | URL | Result | Accent sampled | Ground sampled |
|---|---|---|---|---|
| solana-spectrum | https://solana.com | failed: HTTP 429 | — | — |
| ethereum-paper | https://ethereum.org | failed: timeout | — | — |
| polygon-agora | https://polygon.technology | ok (9109 ms) | #670de5 | #000000 |
| base-cobalt | https://www.base.org | ok (9397 ms) | #0000ff | #dde3e9 |
| optimism-poster | https://www.optimism.io | failed: timeout | — | — |
| arbitrum-signal | https://arbitrum.io | failed: HTTP 403 | — | — |
| uniswap-bubblegum | https://uniswap.org | failed: timeout | — | — |
| aave-abyss | https://aave.com | ok (7973 ms) | #ff0000 | #000000 |
| sui-tidal | https://sui.io | failed: timeout | — | — |
| cosmos-orbit | https://cosmos.network | ok (14247 ms) | #40b3ff | #000000 |

Live sampling is evidence, not a copy target. Never download or reuse a reference site's logo, imagery, copy, or code. Use only the abstract tokens below.

## Candidate ranking

| Candidate | Score | Accent ΔE from original | Layout | Live |
|---|---:|---:|---|---|
| Paper Protocol | 0.9521 | 121.9 | gallery-scroll | no |
| Bubblegum Exchange | 0.9419 | 129.4 | bento-canvas | no |
| Cobalt Blueprint | 0.916 | 194.7 | split-stage | yes |
| Poster Optimism | 0.9126 | 120.7 | ticker-stage | no |
| Spectrum Terminal | 0.8501 | 111.7 | ticker-stage | no |
| Tidal Sui | 0.8459 | 111.2 | split-stage | no |
| Agora Violet | 0.7976 | 164.6 | bento-canvas | yes |
| Cosmos Orbit | 0.7806 | 88.2 | gallery-scroll | yes |
| Abyss Liquidity | 0.7247 | 142.3 | terminal-console | yes |
| Signal Navy | 0.6977 | 80 | command-rail | no |

## Skeleton brief

**Gallery Scroll** — full-viewport panels with generous negative space; horizontal scroll-snap for related panels; minimal floating dock navigation; each route is a sequence of framed scenes; large imagery/typography and very few borders.

Navigation: Floating dock at the bottom (icons + accessible names) and a vertical dot index for sections; no conventional header.

Structure:
1. opening panel with brand and route count
1. scene panels with snap points
1. horizontal data rail
1. closing panel with form/action
1. floating dock

Content mapping: Group each route's content into 2-4 scenes. Keep metrics as large typographic facts. Tables become horizontal snap rails with one record per panel on mobile. Forms become the closing scene.

Recipe: `.scene{min-height:100svh;display:grid;place-content:center;padding:clamp(24px,6vw,96px);scroll-snap-align:start}.rail{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:16px}.rail>*{scroll-snap-align:start;flex:0 0 min(86vw,520px)}.dock{position:fixed;bottom:18px;left:50%;translate:-50% 0;display:flex;gap:6px;border-radius:999px}`

Risks: full-viewport panels can hide content below the fold; provide visible scroll cues; horizontal rails need keyboard and touch support

## Design tokens

```css
:root {
  --bg: #F7F5EF;
  --surface: #FFFDF8;
  --surface-alt: #EDE9DF;
  --ink: #1B1B1B;
  --muted: #6B675F;
  --accent: #4C63D2;
  --accent-safe: #3D51B8;
  --accent-2: #8B9DFF;
  --line: #D9D3C7;
  --success: #2F6B4F;
  --danger: #A83A2A;
  --warning: #8A5A00;

  --font-display: "Iowan Old Style", "Palatino Linotype", Georgia, serif;
  --font-body: "Charter", "Georgia", "Segoe UI", serif;
  --font-mono: "Courier New", ui-monospace, monospace;
  --display-weight: 500;
  --display-tracking: -0.025em;
  --label-tracking: 0.12em;

  --radius-sm: 0px;
  --radius-md: 2px;
  --radius-lg: 4px;
  --border: 1px solid var(--line);
  --shadow: none;

  --motion-duration: 300ms;
  --motion-ease: ease-out;
  --space-1: clamp(4px, .35vw, 6px);
  --space-2: clamp(8px, .7vw, 12px);
  --space-3: clamp(14px, 1.2vw, 20px);
  --space-4: clamp(22px, 2vw, 32px);
  --space-5: clamp(36px, 3.4vw, 56px);
  --space-6: clamp(56px, 5vw, 88px);
  --page-pad: clamp(18px, 4vw, 64px);
  --max-width: 1440px;
}
```

## Component grammar

- Surface: 1px solid var(--line); radius 2px; shadow none.
- Type: display **"Iowan Old Style", "Palatino Linotype", Georgia, serif** at weight 500, tracking -0.025em; body **"Charter", "Georgia", "Segoe UI", serif**; numerals and micro-labels **"Courier New", ui-monospace, monospace**.
- Texture: newsprint rules, drop caps, marginalia labels, ether gradient wash.
- Motion: quiet, 300ms, ease-out. Always wrap non-essential motion in `@media (prefers-reduced-motion: no-preference)`.
- Density: comfortable. Keep body text >= 14px and body contrast >= 4.5:1.
- Use `--accent-safe` for text and icons on `--bg`; use `--accent` for fills and large shapes.

## Originality guard

The replacement must satisfy all of these:

1. The source inventory archetype is `dashboard-shell`; the new skeleton is `gallery-scroll`. Do not fall back to the old shell during implementation.
2. Do not reuse any original class name, CSS selector, design token name, or original accent family.
3. Rewrite templates, not only CSS. Every route must visibly use the new skeleton.
4. Keep every token in `.reskin/content-contract.json`; move it, never rewrite it.
5. Run `node scripts/verify.mjs check` and do not stop until content, structure, accessibility and responsive checks pass.

## Commit statement

Use this sentence in the final report: "The UI was rebuilt around Paper Protocol / Gallery Scroll; the original dashboard-shell shell and palette were removed while the content contract stayed byte-for-byte intact."
