# Reskin wireframe — Toybox / Gallery Scroll

Commitment written before implementation. Style DNA: Paper Protocol (cream paper, ink rules, cobalt accent) reinterpreted as a hand-inked cartoon playground, per the explicit request for a cartoon, lively direction.

## Shell

- **Name:** Toybox / `gallery-scroll`
- **New landmarks:** one `main`, one `footer` (help pages), one floating `nav` dock at the end of the document. No top bar, no sidebar, no per-route header.
- **Navigation:** a bottom-fixed sticker dock (`.dock-bar`) with the route chips, brand lockup and launch action. On phones it wraps into two sticker rows; the home dock collapses its duplicate link chips and opens the drawer.
- **Page frame:** `main > .play-stage > .play-inner` (new depth), then a route sheet (`.leaf-sheet`, `.book-body`, `.chart-body`, `.pod`) holding the existing content.
- **Scenes:** each route is a sequence of framed scenes. Home uses full-viewport intro, a moving chain rail and generous scene padding; content routes use large rounded panels (`.leaf-beat`, `.chart-slab`, `.leaf-entry`) with snap-scrolling rails for quotes, the docs index and the agent manual index.
- **Removed from the render path:** old global stylesheets (`base.css`, `landing.css`, `app.css`, `styles/content/*`), the old top header in every view, the docs/agents sidebars (now chip rails), all old class names and all old design tokens.

## Route mapping

| Route | New composition |
|---|---|
| `/` | intro scene (headline + speech bubble + mascot) → chain rail → product dashboard window → sticker collage → use-case chip wall → quote rail → agent terminal scene → FAQ grid → CTA panel → ink colophon → dock |
| `/docs` | chapter chip rail at the top of the sheet → full-width article prose with framed concept cards, steps and code panels → colophon → dock |
| `/agents` | masthead with action chips and fact chips → three sticker start cards → chip index rail above the long manual → colophon → dock |
| `/analytics` | eyebrow masthead → four stat stickers → chart panel → ranked bars panel → two data tables → footnote → dock |
| `/status` | masthead → status pill → services table panel → chains table panel → footnote → dock |
| `/recover` | masthead → recovery console panel (screen + key/value rows + dark log) → three advice stickers → dock |
| `/changelog` | masthead → filter chip row → diary cards (date rail + entry body) → pager stickers → closing sun panel → dock |
| `/token` | masthead with stamp → address panel → action chips → spec table → links → dock |
| `/app` | framed app pod: tab row, asset switch, amount shell, recipient row, primary action; floating dock carries brand, network, account |
| `/private-payments/*`, `/privacy`, `/terms`, `/guides/*` | masthead → stacked scene panels (prose, tables, snippets, notes) → colophon → dock |
| 404 / `/llms.txt` | oversized 404 sticker with two icon-only escape links |

## Presentation system

- **Tokens:** `--paper`, `--surface`, `--ink`, `--accent` (`#4C63D2`), `--sun`, `--coral`, `--mint`, `--sky`, `--round-*`, `--stroke`, `--drop`, `--face-*`.
- **Type:** bundled Fredoka (display) + Nunito (body), system fallbacks. Numerals use Courier New.
- **Shape language:** 2.5px ink outlines, hard offset shadows, 20–40px radii, pill controls, dashed separators, sticker labels.
- **Breakpoints:** 1080 / 1040 / 900 / 820 / 760 / 720 / 680 / 640 px. The dock wraps instead of overflowing; tables scroll inside their panels; grids collapse to `minmax(0, 1fr)`.
- **Motion:** drift on the chain rail, bob on the mascot, springy hover lifts; all wrapped in `prefers-reduced-motion: no-preference`, reduced-motion guard kills animation/transition.
- **Accessibility:** focus-visible rings on every control, one `h1` per route, labels/aria names for fields, 4.5:1 body contrast, wraps instead of hidden content.

## Content rule

No copy was rewritten. Templates were moved and re-classed; the product scene that the original page framed (the shield flow) stays the visible scene so the rendered word set is unchanged.
