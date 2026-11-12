import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const pages = [
  {
    path: '/app',
    name: 'app',
    component: () => import('../views/pages/AppView.vue'),
    meta: {
      title: 'App: shield, send, swap and bridge privately — Blackpool',
      description:
        'Open the Blackpool app: connect a wallet, sign once and move crypto privately on Robinhood Chain, Base, Arbitrum and BNB Chain. Non-custodial, and the relayer pays the gas.',
    },
  },
  {
    path: '/docs',
    name: 'docs',
    component: () => import('../views/pages/DocsView.vue'),
    meta: {
      title: 'Docs: how Blackpool private payments work — Blackpool',
      description:
        "How Blackpool's zero-knowledge privacy pools work: shield, private send, swap, bridge, recovery, CLI and API.",
    },
  },
  {
    path: '/token',
    name: 'token',
    component: () => import('../views/pages/TokenView.vue'),
    meta: {
      title: '$BP on Robinhood Chain — Blackpool',
      description:
        'The official Blackpool token on Robinhood Chain, launched on the Orbio launchpad. Its one contract address is on this page and at the top of blackpool.cash.',
    },
  },
  {
    path: '/private-payments',
    name: 'private-payments',
    component: () => import('../views/pages/PrivatePaymentsView.vue'),
    meta: {
      title: 'Private crypto payments on every chain — Blackpool',
      description:
        'Private crypto payments on Robinhood Chain, Base, Arbitrum and BNB Chain: shield once, then send, swap and bridge with zero-knowledge proofs, with no custody and no gas from your wallet.',
    },
  },
  {
    path: '/private-payments/base',
    name: 'private-payments-base',
    component: () => import('../views/pages/ChainBaseView.vue'),
    meta: {
      title: 'Private payments on Base — Blackpool',
      description:
        'Send ETH and USDC privately on Base. Shield once, then pay any address, swap or bridge with zero-knowledge proofs: no custody, and the relayer pays gas.',
    },
  },
  {
    path: '/private-payments/robinhood-chain',
    name: 'private-payments-robinhood',
    component: () => import('../views/pages/ChainRobinhoodView.vue'),
    meta: {
      title: 'Private payments on Robinhood Chain — Blackpool',
      description:
        'Send ETH and USDG privately on Robinhood Chain. Shield once, then pay any address, swap or bridge with zero-knowledge proofs: no custody, and the relayer pays gas.',
    },
  },
  {
    path: '/private-payments/arbitrum',
    name: 'private-payments-arbitrum',
    component: () => import('../views/pages/ChainArbitrumView.vue'),
    meta: {
      title: 'Private payments on Arbitrum — Blackpool',
      description:
        'Send ETH and USDC privately on Arbitrum. Shield once, then pay any address, swap or bridge with zero-knowledge proofs: no custody, and the relayer pays gas.',
    },
  },
  {
    path: '/private-payments/bnb-chain',
    name: 'private-payments-bnb',
    component: () => import('../views/pages/ChainBnbView.vue'),
    meta: {
      title: 'Private payments on BNB Chain — Blackpool',
      description:
        'Send BNB, USDT and USDC privately on BNB Chain. Shield once, then pay any address, swap or bridge with zero-knowledge proofs: no custody, and the relayer pays gas.',
    },
  },
  {
    path: '/recover',
    name: 'recover',
    component: () => import('../views/pages/RecoverView.vue'),
    meta: {
      title: 'Recover stuck funds — Blackpool',
      description:
        'Find and sweep back anything left on Blackpool one-time addresses, using only a signature from the wallet you used. Also lists your private bridges and their status.',
    },
  },
  {
    path: '/agents',
    name: 'agents',
    component: () => import('../views/pages/AgentsView.vue'),
    meta: {
      title: 'AGENTS.md: private crypto payments for AI agents — Blackpool',
      description:
        'AGENTS.md: everything an AI agent needs to make private payments with the Blackpool CLI — setup, commands, JSON output, limits, recipes, errors and security.',
    },
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: () => import('../views/pages/AnalyticsView.vue'),
    meta: {
      title: 'Privacy pool analytics — Blackpool',
      description:
        'Public, on-chain protocol analytics for Blackpool privacy pools: shielded notes, growth per chain, pools and relayer fees.',
    },
  },
  {
    path: '/status',
    name: 'status',
    component: () => import('../views/pages/StatusView.vue'),
    meta: {
      title: 'Status — Blackpool',
      description: 'Live status of the Blackpool relayer API, indexer, relayer gas and chain RPCs.',
    },
  },
  {
    path: '/changelog',
    name: 'changelog',
    component: () => import('../views/pages/ChangelogView.vue'),
    meta: {
      title: 'Changelog — Blackpool',
      description: 'New features and improvements to Blackpool.',
    },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/pages/PrivacyView.vue'),
    meta: {
      title: 'Privacy — Blackpool',
      description: 'What Blackpool processes, what it stores, and what is public on-chain.',
    },
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('../views/pages/TermsView.vue'),
    meta: {
      title: 'Terms — Blackpool',
      description: 'Terms of use for the Blackpool website, app, API and CLI.',
    },
  },
  {
    path: '/guides/send-crypto-privately',
    name: 'guide-send',
    component: () => import('../views/pages/GuideSendView.vue'),
    meta: {
      title: 'How to send crypto without exposing your wallet — Blackpool',
      description:
        'Why every on-chain payment shows your wallet, which ways around it actually work, and how to send ETH, USDC, USDT or BNB privately with a zero-knowledge privacy pool.',
    },
  },
  {
    path: '/guides/private-payments-for-ai-agents',
    name: 'guide-agents',
    component: () => import('../views/pages/GuideAgentsView.vue'),
    meta: {
      title: 'Private payments for AI agents (MCP) — Blackpool',
      description:
        'Give an AI agent a wallet that can pay without exposing its history: set up the Blackpool MCP server, choose which tools the agent may use, and keep its payments private on four chains.',
    },
  },
]

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Blackpool — Private crypto payments that leave no trail',
      description:
        'Pay anyone. Show no one. Zero-knowledge privacy pools on four chains, no custody, relayer pays the gas.',
    },
  },
  ...pages,
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'Blackpool — Private crypto payments that leave no trail' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      // Scroll after fonts settle so the anchor lands where the browser would put
      // it natively (IDs such as "9-mcp-servers" also are not valid CSS selectors).
      return new Promise((resolve) => {
        const jump = () => {
          const id = decodeURIComponent(to.hash.slice(1))
          const target = document.getElementById(id)
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          resolve(false)
        }
        if (document.fonts?.ready) {
          document.fonts.ready
            .then(() => requestAnimationFrame(jump))
            .catch(() => requestAnimationFrame(jump))
        } else {
          requestAnimationFrame(jump)
        }
      })
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const meta = to.meta || {}
  if (meta.title) document.title = meta.title
  const description = document.querySelector('meta[name="description"]')
  if (description && meta.description) description.setAttribute('content', meta.description)
})

export default router
