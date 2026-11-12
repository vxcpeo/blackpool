/**
 * Navigation content, mirroring the product navigation used across the site.
 */
export const navGroups = [
  {
    title: 'Private payments',
    items: [
      {
        icon: 'shield',
        color: '#4C63D2',
        title: 'Shield',
        description: 'Move ETH, USDC, USDG or BNB into your private balance.',
        href: '/app',
      },
      {
        icon: 'send',
        color: '#FF7A63',
        title: 'Private send',
        description: 'Pay any address. The relayer pays the gas.',
        href: '/app?tab=send',
      },
      {
        icon: 'swap',
        color: '#FFC94A',
        title: 'Private swap',
        description: 'Swap between the native coin and the stablecoin inside the pool.',
        href: '/app?tab=swap',
      },
      {
        icon: 'intents',
        color: '#8FE3C0',
        title: 'Private bridge',
        description: 'Move value across four EVM chains and Solana.',
        href: '/app?tab=bridge',
      },
    ],
  },
  {
    title: 'Tools',
    items: [
      {
        icon: 'cli',
        color: '#9CD7F2',
        title: 'Agents & CLI',
        description: 'Pay from scripts and AI agents. MCP server included.',
        href: '/agents',
      },
      {
        icon: 'recover',
        color: '#FF7A63',
        title: 'Recovery',
        description: 'Bring funds on a one-time burner back to your balance.',
        href: '/recover',
      },
      {
        icon: 'chart',
        color: '#8FE3C0',
        title: 'Analytics',
        description: 'Public pool volume and activity by day.',
        href: '/analytics',
      },
      {
        icon: 'pulse',
        color: '#9CD7F2',
        title: 'Status',
        description: 'Live health of the API, the indexer and every chain.',
        href: '/status',
      },
    ],
  },
  {
    title: 'Learn',
    items: [
      {
        icon: 'route',
        color: '#4C63D2',
        title: 'Private payments by chain',
        description: 'Pools, fees and minimums on every chain.',
        href: '/private-payments',
      },
      {
        icon: 'docs',
        color: '#FF7A63',
        title: 'Send crypto privately',
        description: 'Pay without exposing your wallet.',
        href: '/guides/send-crypto-privately',
      },
      {
        icon: 'cli',
        color: '#FFC94A',
        title: 'Payments for AI agents',
        description: 'Give an agent a private wallet over MCP.',
        href: '/guides/private-payments-for-ai-agents',
      },
    ],
  },
]

export const navLinks = [
  { label: 'Chains', href: '#chains' },
  { label: 'How it works', href: '#how' },
  { label: 'Recover', href: '/recover' },
  { label: 'Docs', href: '/docs' },
  { label: 'Agents', href: '/agents' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Changelog', href: '/changelog' },
]
