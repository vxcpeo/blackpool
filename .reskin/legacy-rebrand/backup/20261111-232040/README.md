# Blackpool website

A Vue 3 + Vite rebuild of [blackpool.cash](https://blackpool.cash/) — the zero-knowledge
privacy-payments landing page and its supporting pages.

## Run it

```bash
npm install
npm run dev      # http://127.0.0.1:5179
npm run build    # production bundle in dist/
npm run preview  # serve the production bundle
```

## What is inside

```
src/
  views/
    HomeView.vue              the landing page
    NotFoundView.vue          404
    pages/                    one component per route (/app, /docs, /token, …)
  components/
    SiteNotice.vue            contract-address notice bar
    SiteNav.vue               sticky header with the Product dropdown and mobile drawer
    HeroSection.vue           token pill, headline, CTAs and the chain marquee
    ProductWindow.vue         the live product demo (five flows, console, terminal)
    BentoSection.vue          "Introducing Blackpool" cards
    UseCasesSection.vue       "How people use Blackpool"
    PrinciplesSection.vue     design-principle quotes
    AgentsSection.vue         AGENTS.md / MCP section
    FaqSection.vue            native <details> FAQ
    CtaSection.vue            closing CTA
    SiteFooter.vue            footer + interactive wordmark
    ChangelogToast.vue        changelog announcement toast
    WordmarkCanvas.vue        particle wordmark rendered on <canvas>
    BrandMark.vue             the Blackpool mark
    NavIcon.vue               rounded icon tiles
    RaysBackground.vue        WebGL rays backdrop used by /app
  composables/
    useWallet.js              EIP-6963 wallet discovery, connection, chain selection
    usePrivateAccount.js      local private balances, notes and bridge registry
    useBalances.js            public balances read from the chain RPCs
    useLandingEffects.js      scroll reveals, bento replay, pointer glow
    usePriceFeed.js           shared ETH / SOL / BNB quote feed
    useLinkInterception.js    same-origin anchors → vue-router
    useCopyControls.js        clipboard controls across the content pages
    useChangelog.js           changelog filtering + pagination
    useStatusRefresh.js       "Check again" behaviour on /status
  data/                       chains, assets, navigation, agent hand-off prompt
  styles/
    base.css                  site-wide tokens and resets (from the original build)
    landing.css               landing-page design system
    notice.css                notice bar
    app.css                   app modals, progress and toasts
    content/                  content-page design systems (docs, token, analytics, …)
```

The app shell lives in `views/pages/AppView.vue` with its dialogs in `components/app/`:
connect, top up, action progress, account panel and footer.

## Wallet and account

- **Connect a wallet** uses EIP-6963 discovery with a `window.ethereum` fallback. Detected
  extensions are listed in the connect dialog; the first authorised wallet reconnects
  automatically on load.
- **Browser Wallet** creates an account inside the browser so the app can be used without an
  extension. The account address is kept locally and restored on the next visit.
- A single `personal_sign` request derives the private account, exactly as the app describes:
  the message is a login message and does not send a transaction.
- **Top up** credits the private balance and keeps the wallet balance in sync. **Send**,
  **Swap** and **Bridge** show proof, relay and settlement progress, write a transaction hash
  and update balances, notes and the bridge registry.
- Public balances are read from the chain RPCs (Base, Arbitrum, BNB Chain) when available;
  otherwise a stable per-address value keeps the account usable. Private balances, notes and
  history live in `localStorage` per address.

> The private flows run entirely in the browser: no transaction is broadcast and no funds
> move. The hashes, proofs and status messages are produced locally so the UI can be explored
> end to end without a backend.

## Notes

- The visual design is a faithful reproduction of the original site: the same design tokens,
  class names, layout, copy and assets are reused so the rendered pages line up with production.
- The landing page behaviour (auto-playing product demo, particle wordmark, sticky nav,
  dropdown, toast, scroll reveals, price-fed quotes) is reimplemented in Vue.
- `/app` keeps the animated rays backdrop (WebGL) and its three private flows switch client-side.
- Content pages are rendered from a snapshot of the production DOM and share the original
  page-level CSS. Prices fall back to a public spot feed when the private API is unavailable.
- Fonts (Inter) are self-hosted in `public/fonts`, so the site works without Google Fonts.

