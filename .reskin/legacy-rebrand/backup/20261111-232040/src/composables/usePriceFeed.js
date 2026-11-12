import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Live ETH / SOL / BNB price feed shared by every quote on the page.
 *
 * The prices come from the Blackpool price endpoint, with Coinbase as a fallback,
 * and the values refresh once a minute. When the endpoints are unreachable the
 * design-time fallbacks keep quotes stable.
 */
const ETH_FALLBACK = 2268.4
const SOL_FALLBACK = 156.2
const BNB_FALLBACK = 640

const eth = ref(ETH_FALLBACK)
const sol = ref(SOL_FALLBACK)
const bnb = ref(BNB_FALLBACK)

const canUseNativeApi =
  typeof window !== 'undefined' && /(^|\.)blackpool\.cash$/.test(window.location.hostname)

let subscribers = 0
let timer = null

async function fetchJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(3500) })
  return response.json()
}

async function refresh() {
  let updated = false
  if (canUseNativeApi) {
    try {
      const data = await fetchJson('https://api.blackpool.cash/api/price?symbols=ETH,SOL')
      if (typeof data?.prices?.ETH === 'number') {
        eth.value = data.prices.ETH
        updated = true
        if (typeof data.prices.SOL === 'number') {
          sol.value = data.prices.SOL
        } else {
          try {
            const spot = await fetchJson('https://api.coinbase.com/v2/prices/SOL-USD/spot')
            const value = parseFloat(spot?.data?.amount)
            if (value > 0) sol.value = value
          } catch {}
        }
      }
    } catch {}
  }

  if (!updated) {
    try {
      const [ethSpot, solSpot, bnbSpot] = await Promise.all(
        ['ETH', 'SOL', 'BNB'].map((symbol) => fetchJson(`https://api.coinbase.com/v2/prices/${symbol}-USD/spot`)),
      )
      const ethValue = parseFloat(ethSpot?.data?.amount)
      const solValue = parseFloat(solSpot?.data?.amount)
      const bnbValue = parseFloat(bnbSpot?.data?.amount)
      if (ethValue > 0) eth.value = ethValue
      if (solValue > 0) sol.value = solValue
      if (bnbValue > 0) bnb.value = bnbValue
    } catch {}
  } else if (bnb.value === BNB_FALLBACK) {
    try {
      const spot = await fetchJson('https://api.coinbase.com/v2/prices/BNB-USD/spot')
      const value = parseFloat(spot?.data?.amount)
      if (value > 0) bnb.value = value
    } catch {}
  }
}

function start() {
  subscribers += 1
  if (subscribers > 1) return
  refresh()
  timer = setInterval(refresh, 60000)
}

function stop() {
  subscribers = Math.max(0, subscribers - 1)
  if (subscribers === 0 && timer) {
    clearInterval(timer)
    timer = null
  }
}

export function usePriceFeed() {
  onMounted(start)
  onBeforeUnmount(stop)

  const format = (value, decimals = 2) =>
    value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

  const quote = (amount, fee, unit, decimals, prefix = '') =>
    `${prefix}${format(amount * eth.value * (1 - fee), decimals)} ${unit}`.trim()

  const usd = (amount) => `≈ $${format(amount * eth.value, 0)}`

  const priceOf = (symbol) => {
    if (symbol === 'ETH') return eth.value
    if (symbol === 'BNB') return bnb.value
    return 1
  }

  return { eth, sol, bnb, format, quote, usd, priceOf }
}
