/**
 * Chains and assets used by the private account.
 * Every entry mirrors a live Agpool pool: one native coin and one or more
 * stablecoins per chain.
 */
export const CHAINS = [
  {
    id: 4663,
    key: 'robinhood',
    label: 'Robinhood',
    fullLabel: 'Robinhood Chain',
    logo: '/token_logos/robinhood.png?v=2',
    hex: '0x1237',
    explorer: 'https://robin.etherscan.io',
    assets: ['ETH', 'USDG'],
    rpc: null,
  },
  {
    id: 8453,
    key: 'base',
    label: 'Base',
    fullLabel: 'Base',
    logo: '/token_logos/base.png',
    hex: '0x2105',
    explorer: 'https://basescan.org',
    assets: ['ETH', 'USDC'],
    rpc: 'https://mainnet.base.org',
  },
  {
    id: 42161,
    key: 'arbitrum',
    label: 'Arbitrum',
    fullLabel: 'Arbitrum',
    logo: '/token_logos/arbitrum.png',
    hex: '0xa4b1',
    explorer: 'https://arbiscan.io',
    assets: ['ETH', 'USDC'],
    rpc: 'https://arb1.arbitrum.io/rpc',
  },
  {
    id: 56,
    key: 'bnb',
    label: 'BNB Chain',
    fullLabel: 'BNB Chain',
    logo: '/token_logos/bsc.png',
    hex: '0x38',
    explorer: 'https://bscscan.com',
    assets: ['BNB', 'USDC', 'USDT'],
    rpc: 'https://bsc-dataseed.binance.org',
  },
]

export const ASSETS = {
  ETH: {
    symbol: 'ETH',
    name: 'Ether',
    decimals: 18,
    logo: '/token_logos/eth.png',
    native: true,
    priceKey: 'eth',
  },
  BNB: {
    symbol: 'BNB',
    name: 'BNB',
    decimals: 18,
    logo: '/token_logos/bnb.png',
    native: true,
    priceKey: 'bnb',
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: { 56: 18, default: 6 },
    logo: '/token_logos/usdc.png',
    stable: true,
    contracts: {
      8453: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      42161: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    },
  },
  USDG: {
    symbol: 'USDG',
    name: 'Global Dollar',
    decimals: 6,
    logo: '/token_logos/usdg.png',
    stable: true,
    contracts: {},
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 18,
    logo: '/token_logos/usdt.png',
    stable: true,
    contracts: {
      56: '0x55d398326f99059fF775485246999027B3197955',
    },
  },
}

export function getChain(id) {
  return CHAINS.find((chain) => chain.id === Number(id)) || CHAINS[0]
}

export function getAsset(symbol) {
  return ASSETS[symbol] || ASSETS.ETH
}

export function assetDecimals(symbol, chainId) {
  const asset = getAsset(symbol)
  if (typeof asset.decimals === 'number') return asset.decimals
  return asset.decimals[chainId] ?? asset.decimals.default
}

export function assetContract(symbol, chainId) {
  return getAsset(symbol).contracts?.[chainId] || null
}

/**
 * Bridge destinations. `chainId` of 1 marks the Ethereum rail, which has no
 * private pool UI but is still a valid delivery destination.
 */
export const BRIDGE_DESTINATIONS = [
  {
    key: 'ethereum',
    label: 'Ethereum',
    chainId: 1,
    logo: '/token_logos/ethereum.png',
    assets: ['USDC', 'ETH'],
  },
  {
    key: 'robinhood',
    label: 'Robinhood',
    chainId: 4663,
    logo: '/token_logos/robinhood.png?v=2',
    assets: ['ETH', 'USDG'],
  },
  {
    key: 'base',
    label: 'Base',
    chainId: 8453,
    logo: '/token_logos/base.png',
    assets: ['ETH', 'USDC'],
  },
  {
    key: 'arbitrum',
    label: 'Arbitrum',
    chainId: 42161,
    logo: '/token_logos/arbitrum.png',
    assets: ['USDC', 'ETH'],
  },
  {
    key: 'bnb',
    label: 'BNB Chain',
    chainId: 56,
    logo: '/token_logos/bsc.png',
    assets: ['USDT', 'BNB'],
  },
]

export function defaultBridgeDestination(sourceChainId) {
  if (Number(sourceChainId) === 4663) return BRIDGE_DESTINATIONS[0]
  return BRIDGE_DESTINATIONS.find((destination) => destination.chainId === 4663)
}
