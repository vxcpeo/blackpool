
<template>
<div id="product" ref="windowEl" class="toy-window" :data-scene="scene" :data-step="String(step)" :data-cycle="cycle" :data-started="step > 0 ? '' : null" :style="{ '--k': String(scale) }"><div class="toy-stage"><div class="toy-console" aria-hidden="true"><div class="toy-sb"><div class="toy-sb-brand"><svg class="logo-mark" viewBox="0 0 48 48" width="26" height="26" aria-hidden="true" focusable="false"><rect x="3" y="3" width="42" height="42" rx="15" fill="currentColor"/><path d="M24 11.5 34 33.5h-6.2l-1.9-4.6h-3.8l-1.9 4.6h-6.2L24 11.5Zm0 8.8-1.5 4.9h3L24 20.3Z" fill="#FBF6E9"/><circle cx="35.5" cy="12.5" r="3.4" fill="#FFC94A"/></svg>Agpool</div><div class="toy-sb-h">Views</div><div class="toy-sb-item" data-k=""><i></i>Overview</div><div class="toy-sb-item" data-k="shield"><i></i>Shield</div><div class="toy-sb-item" data-k="send"><i></i>Private send</div><div class="toy-sb-item" data-k="swap"><i></i>Swap</div><div class="toy-sb-item" data-k="bridge"><i></i>Private bridge</div><div class="toy-sb-item" data-k="recover"><i></i>Recovery</div><div class="toy-sb-h">Chains</div><div class="toy-sb-item"><i></i>Base</div><div class="toy-sb-item"><i></i>Robinhood Chain</div><div class="toy-sb-item"><i></i>Arbitrum</div><div class="toy-sb-item"><i></i>BNB Chain</div></div><div class="toy-main"><div class="toy-main-h"><b>Private account</b><span class="leaf-live"><i></i>Live</span></div><div class="toy-main-s">4 chains · <b data-count="notes">{{ notes }}</b> shielded notes · last sync <b data-sync="true">{{ syncSeconds }}</b> s ago</div><div class="toy-blocks"><div class="toy-block"><span>Private balance</span><b>3.232 ETH</b><small><span data-usd="3.232">{{ usd(3.232) }}</span> · across 4 chains</small></div><div class="toy-block"><span>Shielded notes</span><b data-count="notes">{{ notes }}</b><small>2 spent · <b data-count="unspent">{{ notes - 2 }}</b> unspent</small></div><div class="toy-block"><span>Pending intents</span><b><em class="leaf-n0">0</em><em class="leaf-n1">1</em></b><small><b data-r="from">{{ route.from }}</b> → <b data-r="to">{{ route.to }}</b> · 1Click</small></div><div class="toy-block"><span>Relayer fees paid</span><b>0.0042 ETH</b><small>flat fee · taken from notes</small></div></div><div class="toy-boards"><div class="toy-board toy-chart"><div class="leaf-ph"><b>Shielded notes over time</b><span class="tag">All time ▾</span></div><div class="leaf-ps">Since Sep 2026 · all pools</div><div class="leaf-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="leaf-ax"><span>Sep 3</span><span>Oct 1</span><span>Nov 1</span></div></div><div class="toy-board toy-bychain"><div class="leaf-ph"><b>Private balance by chain</b></div><div class="leaf-ps">Encrypted locally · visible only to you</div><div class="leaf-r"><i></i><span>Robinhood Chain</span><b class="num">1.300 ETH</b><u><em></em></u></div><div class="leaf-r"><i></i><span>Base</span><b class="num">0.812 ETH</b><u><em></em></u></div><div class="leaf-r"><i></i><span>BNB Chain</span><b class="num">0.600 ETH</b><u><em></em></u></div><div class="leaf-r"><i></i><span>Arbitrum</span><b class="num">0.520 ETH</b><u><em></em></u></div></div></div></div></div><div class="toy-win-grid toy-scenario" data-scene="send"><div class="toy-flow"><div class="toy-node"><div class="leaf-t">Shield <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">confirming…</span><span class="leaf-d">confirmed</span></em></div><div class="leaf-d">1.000 ETH joined the Base pool as an encrypted note.</div></div><div class="toy-node"><div class="leaf-t">Prove <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">building groth16…</span><span class="leaf-d">1.4 s</span></em></div><div class="leaf-d">Your browser builds the proof. Keys never leave it.</div></div><div class="toy-node"><div class="leaf-t">Relay <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">submitting…</span><span class="leaf-d">gas paid</span></em></div><div class="leaf-d">The relayer submits the transaction, so your wallet never touches it.</div></div><div class="toy-node"><div class="leaf-t">Deliver <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">settling…</span><span class="leaf-d">settled</span></em></div><div class="leaf-d">The recipient receives plain ETH. Nothing on-chain links the two.</div></div></div><div class="toy-slab"><h4>Send privately</h4><div class="leaf-sub">Private balance · 0.812 ETH on Base</div><div class="toy-field"><label>Recipient</label><div class="num"><span class="leaf-type">0x9f3c…41e7</span><i class="leaf-caret" aria-hidden="true"></i></div></div><div class="toy-field"><label>Amount</label><div>0.25 ETH<i class="leaf-hatch" aria-hidden="true"></i></div></div><div class="toy-field"><label>Network fee</label><div>0.00015 ETH · paid from the pool<i class="leaf-hatch" aria-hidden="true"></i></div></div><div class="leaf-prog"><i></i></div><div class="leaf-go"><span class="leaf-g0">Send privately</span><span class="leaf-g1">Sending privately…</span><span class="leaf-g2">Sent · nothing to trace</span></div></div><div class="toy-mini toy-link"><b>Unlinkable</b><span>the paying wallet is the relayer, never yours</span><div class="leaf-q"><em class="num">0x12ab…9c01</em><i class="leaf-ln"><u>✕</u></i><em class="num">0x9f3c…41e7</em></div><div class="leaf-found">no on-chain edge between the two</div></div></div><div class="toy-win-grid toy-scenario" data-scene="bridge"><div class="toy-flow"><div class="toy-node"><div class="leaf-t">Shield <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">confirming…</span><span class="leaf-d">confirmed</span></em></div><div class="leaf-d"><b data-r="shield">{{ route.shield }}</b> joined the <b data-r="from">{{ route.from }}</b> pool as an encrypted note.</div></div><div class="toy-node"><div class="leaf-t">Prove <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">building groth16…</span><span class="leaf-d">1.6 s</span></em></div><div class="leaf-d">Your browser proves the note and pays a one-time burner. Your wallet is never involved.</div></div><div class="toy-node"><div class="leaf-t">Intent <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">quoting 1Click…</span><span class="leaf-d">deposit funded</span></em></div><div class="leaf-d">NEAR Intents returns a one-off deposit address. The burner pays it; the origin chain never sees <b data-r="to">{{ route.to }}</b>.</div></div><div class="toy-node"><div class="leaf-t">Deliver <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">solvers settling…</span><span class="leaf-d">delivered</span></em></div><div class="leaf-d"><b data-r="toAsset">{{ route.toAsset }}</b> lands in the <b data-r="to">{{ route.to }}</b> wallet. Neither chain can see the other side.</div></div></div><div class="toy-slab"><h4>Bridge privately</h4><div class="leaf-sub">From <b data-r="from">{{ route.from }}</b> · private <b data-r="asset">{{ route.asset }}</b></div><div class="toy-field"><label>To</label><div><img class="leaf-ico" data-r="toLogo" :src="route.toLogo" alt=""/><b data-r="to">{{ route.to }}</b> · <b data-r="toAsset">{{ route.toAsset }}</b><i class="leaf-hatch" aria-hidden="true"></i></div></div><div class="toy-field"><label>Recipient</label><div class="num"><span class="leaf-type" data-r="recipient">{{ route.recipient }}</span><i class="leaf-caret" aria-hidden="true"></i></div></div><div class="toy-field"><label>You receive</label><div>≈ <b data-r="out">{{ routeOut }}</b> · NEAR Intents quote<i class="leaf-hatch" aria-hidden="true"></i></div></div><div class="leaf-prog"><i></i></div><div class="leaf-go"><span class="leaf-g0">Bridge privately</span><span class="leaf-g1">Bridging via NEAR Intents…</span><span class="leaf-g2">Delivered on <b data-r="to">{{ route.to }}</b> · no trail</span></div></div></div><div class="toy-win-grid toy-scenario" data-scene="shield"><div class="toy-flow"><div class="toy-node"><div class="leaf-t">Approve <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">signing…</span><span class="leaf-d">signed</span></em></div><div class="leaf-d">One wallet signature authorises the deposit. Nothing else ever leaves your wallet.</div></div><div class="toy-node"><div class="leaf-t">Encrypt <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">building note…</span><span class="leaf-d">note built</span></em></div><div class="leaf-d">Amount, owner and blinding are sealed into a note only your key can open.</div></div><div class="toy-node"><div class="leaf-t">Commit <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">adding to tree…</span><span class="leaf-d">leaf 4 821</span></em></div><div class="leaf-d">The commitment joins the Merkle tree. The chain sees a hash, never an amount.</div></div><div class="toy-node"><div class="leaf-t">Confirm <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">confirming…</span><span class="leaf-d">confirmed</span></em></div><div class="leaf-d">Your private balance updates. Any amount, withdrawable whenever you want.</div></div></div><div class="toy-slab"><h4>Shield privately</h4><div class="leaf-sub">Robinhood Chain · wallet 2.418 ETH</div><div class="toy-field"><label>Asset</label><div>ETH · Robinhood Chain<i class="leaf-hatch" aria-hidden="true"></i></div></div><div class="toy-field"><label>Amount</label><div><span class="leaf-type">1.000 ETH</span><i class="leaf-caret" aria-hidden="true"></i></div></div><div class="toy-field"><label>Fee</label><div>0.0003 ETH · relayer<i class="leaf-hatch" aria-hidden="true"></i></div></div><div class="leaf-prog"><i></i></div><div class="leaf-go"><span class="leaf-g0">Shield privately</span><span class="leaf-g1">Shielding…</span><span class="leaf-g2">Shielded · +1.000 ETH private</span></div></div><div class="toy-mini toy-tree"><b>Merkle tree</b><span>new leaf → root · 4 levels</span><div class="leaf-r leaf-r3"><i></i><i></i><i></i><i></i><i></i><i class="leaf-p"></i><i></i><i></i></div><div class="leaf-r leaf-r2"><i></i><i></i><i class="leaf-p"></i><i></i></div><div class="leaf-r leaf-r1"><i></i><i class="leaf-p"></i></div><div class="leaf-r leaf-r0"><i class="leaf-p"></i></div></div></div><div class="toy-win-grid toy-scenario" data-scene="swap"><div class="toy-flow"><div class="toy-node"><div class="leaf-t">Prove <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">building groth16…</span><span class="leaf-d">1.4 s</span></em></div><div class="leaf-d">Your browser proves you own a note worth 0.500 ETH. No address is revealed.</div></div><div class="toy-node"><div class="leaf-t">Burner <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">funding…</span><span class="leaf-d">funded</span></em></div><div class="leaf-d">A one-time burner receives the ETH. It has never transacted before.</div></div><div class="toy-node"><div class="leaf-t">Route <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">Uniswap V3…</span><span class="leaf-d"><span data-q-amt="0.5" data-q-fee="0.003" data-q-unit="USDG" data-q-dec="2" data-q-prefix="">{{ quote(0.5, 0.003, 'USDG', 2) }}</span></span></em></div><div class="leaf-d">The burner swaps on Uniswap V3 at the public price. 1% slippage cap.</div></div><div class="toy-node"><div class="leaf-t">Re-shield <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">re-shielding…</span><span class="leaf-d">note updated</span></em></div><div class="leaf-d">The USDG goes straight back into the pool as a fresh note.</div></div></div><div class="toy-slab"><h4>Swap privately</h4><div class="leaf-sub">Private balance · 1.300 ETH on Robinhood Chain</div><div class="toy-field"><label>From</label><div>0.500 ETH<i class="leaf-hatch" aria-hidden="true"></i></div></div><div class="toy-field"><label>To</label><div><span data-q-amt="0.5" data-q-fee="0.003" data-q-unit="USDG" data-q-dec="2" data-q-prefix="≈ ">{{ quote(0.5, 0.003, 'USDG', 2, '≈ ') }}</span><i class="leaf-hatch" aria-hidden="true"></i></div></div><div class="toy-field"><label>Price</label><div><span data-q-amt="1" data-q-fee="0" data-q-unit="USDG / ETH" data-q-dec="2" data-q-prefix="">{{ quote(1, 0, 'USDG / ETH', 2) }}</span> · 1% slippage<i class="leaf-hatch" aria-hidden="true"></i></div></div><div class="leaf-prog"><i></i></div><div class="leaf-go"><span class="leaf-g0">Swap privately</span><span class="leaf-g1">Swapping…</span><span class="leaf-g2">Re-shielded · nothing links the trade</span></div></div><div class="toy-mini toy-quote-mock"><b>Quote</b><span>Uniswap V3 · refreshes every 5 s</span><div class="leaf-q"><em data-tick="2268.40">{{ swapPrice }}</em><small>USDG / ETH</small><i class="leaf-spin">⇄</i></div><svg viewBox="0 0 272 40" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,34 18,30 36,32 54,24 72,26 90,20 108,22 126,16 144,18 162,12 180,14 198,10 216,12 234,6 252,8 272,4"></polyline></svg></div></div><div class="toy-win-grid toy-scenario" data-scene="recover"><div class="toy-flow"><div class="toy-node"><div class="leaf-t">Derive <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">deriving…</span><span class="leaf-d">128 burners</span></em></div><div class="leaf-d">Every burner key you ever used is re-derived from your signature. No backup needed.</div></div><div class="toy-node"><div class="leaf-t">Scan <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">checking chains…</span><span class="leaf-d">4 chains</span></em></div><div class="leaf-d">Each burner is checked on every pool chain for stranded funds.</div></div><div class="toy-node"><div class="leaf-t">Sweep <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">sweeping…</span><span class="leaf-d">0.25 ETH swept</span></em></div><div class="leaf-d">Stranded funds are swept back into your private balance.</div></div><div class="toy-node"><div class="leaf-t">Intents <em class="leaf-st"><span class="leaf-p">queued</span><span class="leaf-a">verifying…</span><span class="leaf-d">3 verified</span></em></div><div class="leaf-d">Every bridge intent in your encrypted registry is re-checked with 1Click.</div></div></div><div class="toy-slab"><h4>Recover</h4><div class="leaf-sub">Scanning 4 chains · 3 intents in registry</div><div class="toy-field"><label>burner 0x4a1e…c0d2</label><div class="num">0.25 ETH stranded<i class="leaf-hatch" aria-hidden="true"></i></div></div><div class="toy-field"><label>burner 0x77b0…9e1f</label><div class="num">empty<i class="leaf-hatch" aria-hidden="true"></i></div></div><div class="toy-field"><label>bridge → Solana · 1Click</label><div class="num">delivered<i class="leaf-hatch" aria-hidden="true"></i></div></div><div class="leaf-prog"><i></i></div><div class="leaf-go"><span class="leaf-g0">Recover</span><span class="leaf-g1">Scanning…</span><span class="leaf-g2">Swept to private balance</span></div></div><div class="toy-mini toy-scan"><b>Scanning from signature</b><span>burners derived · 4 chains · intent registry</span><div class="leaf-q"><em><b data-counter="true">{{ recoverCount }}</b> / 128</em><small>burners checked</small></div><u><em></em></u><div class="leaf-found">1 stranded burner found · 3 intents verified</div></div></div><div class="toy-term" aria-hidden="true"><div class="leaf-td"><i></i><i></i><i></i></div><div class="leaf-tset" data-for="bridge"><div class="leaf-tl leaf-l0"><span class="leaf-c">$</span> agpool bridge --from <b data-r="fromSlug">{{ fromSlug }}</b> --to <b data-r="toSlug">{{ toSlug }}</b> --amount <b data-r="shield">{{ route.shield }}</b></div><div class="leaf-tl leaf-l1">proof     groth16 · 1.6 s · built on your device</div><div class="leaf-tl leaf-l2">intent    1Click deposit <b data-r="recipient">{{ route.recipient }}</b> funded by one-time burner</div><div class="leaf-tl leaf-l3 good">status    delivered · <b data-r="out">{{ routeOut }}</b> · no trail</div></div><div class="leaf-tset" data-for="shield"><div class="leaf-tl leaf-l0"><span class="leaf-c">$</span> agpool shield --chain robinhood --amount 1 ETH</div><div class="leaf-tl leaf-l1">note      commitment 0x8f3a…c21e</div><div class="leaf-tl leaf-l2">tree      leaf 4 821 · root updated</div><div class="leaf-tl leaf-l3 good">status    shielded · private balance +1.000 ETH</div></div><div class="leaf-tset" data-for="send"><div class="leaf-tl leaf-l0"><span class="leaf-c">$</span> agpool send --to 0x9f3c…41e7 --amount 0.25 ETH</div><div class="leaf-tl leaf-l1">proof     groth16 · 1.4 s · built on your device</div><div class="leaf-tl leaf-l2">relayer   submitted · gas paid from the note</div><div class="leaf-tl leaf-l3 good">status    delivered · nothing to trace</div></div><div class="leaf-tset" data-for="swap"><div class="leaf-tl leaf-l0"><span class="leaf-c">$</span> agpool swap --from eth --to usdg --amount 0.5</div><div class="leaf-tl leaf-l1">burner    one-time 0x77b0…9e1f funded</div><div class="leaf-tl leaf-l2">router    Uniswap V3 · <span data-q-amt="0.5" data-q-fee="0.003" data-q-unit="USDG" data-q-dec="2" data-q-prefix="">{{ quote(0.5, 0.003, 'USDG', 2) }}</span> out</div><div class="leaf-tl leaf-l3 good">status    re-shielded · nothing links the trade</div></div><div class="leaf-tset" data-for="recover"><div class="leaf-tl leaf-l0"><span class="leaf-c">$</span> agpool recover --scan</div><div class="leaf-tl leaf-l1">registry  128 burners decrypted</div><div class="leaf-tl leaf-l2">found     0x4a1e…c0d2 · 0.25 ETH stranded</div><div class="leaf-tl leaf-l3 good">status    swept to private balance</div></div></div></div><div class="toy-win-tag"><i></i>Live · Private bridge</div><div class="toy-done"><span class="good">Run complete</span><button type="button" class="toy-replay" @click="replay">Replay</button></div></div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { usePriceFeed } from '../composables/usePriceFeed'

const SCENES = ['shield', 'send', 'swap', 'bridge', 'recover']

// How long each stage of a scene stays on screen, in ms (step 0 … step 5).
const TIMINGS = {
  shield: [600, 1400, 1500, 1600, 1300, 3000],
  send: [600, 1300, 1500, 1300, 1400, 3000],
  swap: [600, 1400, 1300, 1800, 1500, 3000],
  bridge: [600, 1300, 1600, 1700, 1800, 3400],
  recover: [600, 1500, 1900, 1500, 1500, 3000],
}

const ETH_FALLBACK = 2268.4

const format = (value, decimals = 2) =>
  value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
const formatAmount = (amount, decimals) => format(amount, decimals)

// Private bridge routes rotate every time the bridge scene is played.
const ROUTES = [
  {
    shield: '1.000 ETH',
    from: 'Robinhood Chain',
    asset: 'ETH',
    to: 'Solana',
    toAsset: 'USDC',
    toLogo: '/token_logos/solana.png',
    recipient: '7Gx4…kQ2m',
    out: (eth) => `${formatAmount(1 * eth * (1 - 0.004), 2)} USDC`,
  },
  {
    shield: '500 USDC',
    from: 'Base',
    asset: 'USDC',
    to: 'Arbitrum',
    toAsset: 'USDC',
    toLogo: '/token_logos/arbitrum.png',
    recipient: '0x4a1e…c0d2',
    out: () => '498.90 USDC',
  },
  {
    shield: '0.500 ETH',
    from: 'Arbitrum',
    asset: 'ETH',
    to: 'Base',
    toAsset: 'ETH',
    toLogo: '/token_logos/base.png',
    recipient: '0x77b0…9e1f',
    out: () => '0.4987 ETH',
  },
  {
    shield: '1,200 USDT',
    from: 'BNB Chain',
    asset: 'USDT',
    to: 'Ethereum',
    toAsset: 'USDT',
    toLogo: '/token_logos/ethereum.png',
    recipient: '0x3c9d…f21a',
    out: () => '1,194.60 USDT',
  },
  {
    shield: '0.400 ETH',
    from: 'Base',
    asset: 'ETH',
    to: 'Robinhood Chain',
    toAsset: 'USDG',
    toLogo: '/token_logos/robinhood.png?v=2',
    recipient: '0x9f3c…41e7',
    out: (eth) => `${formatAmount(0.4 * eth * (1 - 0.004), 2)} USDG`,
  },
  {
    shield: '300 USDG',
    from: 'Robinhood Chain',
    asset: 'USDG',
    to: 'Solana',
    toAsset: 'SOL',
    toLogo: '/token_logos/solana.png',
    recipient: '9Hq2…vT8c',
    out: (_eth, sol) => `${formatAmount(298.8 / sol, 3)} SOL`,
  },
]

const SLUGS = { 'Robinhood Chain': 'robinhood', 'BNB Chain': 'bsc' }

const { eth: priceEth, sol: priceSol, quote, usd } = usePriceFeed()

const windowEl = ref(null)
const scene = ref(SCENES[0])
const sceneIndex = ref(0)
const step = ref(0)
const cycle = ref(null)
const scale = ref(1)
const notes = ref(12)
const syncSeconds = ref(4)
const routeIndex = ref(0)
const recoverCount = ref(0)
const swapPrice = ref(format(ETH_FALLBACK))

const route = computed(() => ROUTES[routeIndex.value])
const routeOut = computed(() => route.value.out(priceEth.value, priceSol.value))
const fromSlug = computed(() => SLUGS[route.value.from] || route.value.from.toLowerCase())
const toSlug = computed(() => SLUGS[route.value.to] || route.value.to.toLowerCase())

let stepTimer
let syncTimer
let tickTimer
let recoverTimer
let resizeObserver

function schedule(ms) {
  clearTimeout(stepTimer)
  stepTimer = setTimeout(advance, ms)
}

function advance() {
  if (step.value === 5) {
    sceneIndex.value = (sceneIndex.value + 1) % SCENES.length
    scene.value = SCENES[sceneIndex.value]
    step.value = 0
    if (scene.value === 'bridge') {
      routeIndex.value = (routeIndex.value + 1) % ROUTES.length
    }
  } else {
    step.value += 1
  }

  if (step.value === 5) {
    notes.value += 1
    cycle.value = cycle.value === 'b' ? 'a' : 'b'
  }

  schedule(TIMINGS[scene.value][step.value])
}

function replay() {
  if (scene.value === 'bridge') {
    routeIndex.value = (routeIndex.value + 1) % ROUTES.length
  }
  clearTimeout(stepTimer)
  step.value = 0
  stepTimer = setTimeout(advance, 400)
}

function fit() {
  const el = windowEl.value
  if (!el) return
  const designWidth = parseFloat(getComputedStyle(el).getPropertyValue('--sw')) || 1180
  scale.value = el.clientWidth / designWidth
}

onMounted(() => {
  fit()
  resizeObserver = new ResizeObserver(fit)
  if (windowEl.value) resizeObserver.observe(windowEl.value)

  schedule(2600)

  syncTimer = setInterval(() => {
    syncSeconds.value = syncSeconds.value >= 9 ? 1 : syncSeconds.value + 1
  }, 1000)

  tickTimer = setInterval(() => {
    const price = priceEth.value
    if (scene.value === 'swap' && step.value >= 1 && step.value <= 3) {
      swapPrice.value = format(
        price + Math.sin(Date.now() / 900) * price * 0.0014 + (Math.random() - 0.5) * price * 0.0005,
        2,
      )
    } else {
      swapPrice.value = format(price, 2)
    }
  }, 160)

  recoverTimer = setInterval(() => {
    if (scene.value !== 'recover') return
    if (step.value === 0) recoverCount.value = 0
    else if (step.value === 1) recoverCount.value = Math.min(86, recoverCount.value + 7)
    else recoverCount.value = Math.min(128, recoverCount.value + 9)
  }, 160)
})

onBeforeUnmount(() => {
  clearTimeout(stepTimer)
  clearInterval(syncTimer)
  clearInterval(tickTimer)
  clearInterval(recoverTimer)
  resizeObserver?.disconnect()
})
</script>
