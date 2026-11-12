<!-- Interactive product demo: a mock private-account console, the five private flows
     (shield, send, swap, bridge, recover) and a typewriter terminal that play on a loop. -->
<template>
<div id="product" ref="windowEl" class="lp-window" :data-scene="scene" :data-step="String(step)" :data-cycle="cycle" :data-started="step > 0 ? '' : null" :style="{ '--k': String(scale) }"><div class="lp-stage"><div class="lp-console" aria-hidden="true"><aside class="lp-sb"><div class="lp-sb-brand"><svg viewBox="0 0 100 100" width="18" height="18" class="" aria-hidden="true"><defs><mask id="bp-mark-mask"><rect width="100" height="100" fill="#fff"></rect><path d="M50 20 L74 78 L61.5 78 L57 66 L43 66 L38.5 78 L26 78 Z M50 41 L53.5 58 L46.5 58 Z" fill="#000" fill-rule="evenodd"></path></mask></defs><rect width="100" height="100" rx="12" fill="currentColor" mask="url(#bp-mark-mask)"></rect></svg>Agpool</div><div class="lp-sb-h">Views</div><div class="lp-sb-it" data-k=""><i style="background:#6E7074"></i>Overview</div><div class="lp-sb-it" data-k="shield"><i style="background:#34C77B"></i>Shield</div><div class="lp-sb-it" data-k="send"><i style="background:#5B8DEF"></i>Private send</div><div class="lp-sb-it" data-k="swap"><i style="background:#8F7BF2"></i>Swap</div><div class="lp-sb-it" data-k="bridge"><i style="background:#E9A23B"></i>Private bridge</div><div class="lp-sb-it" data-k="recover"><i style="background:#EF5B5B"></i>Recovery</div><div class="lp-sb-h">Chains</div><div class="lp-sb-it"><i style="background:#4C7FE3"></i>Base</div><div class="lp-sb-it"><i style="background:#27A563"></i>Robinhood Chain</div><div class="lp-sb-it"><i style="background:#7B68E0"></i>Arbitrum</div><div class="lp-sb-it"><i style="background:#C2842A"></i>BNB Chain</div></aside><div class="lp-main"><div class="lp-main-h"><b>Private account</b><span class="live"><i></i>Live</span></div><div class="lp-main-s">4 chains · <b data-count="notes">{{ notes }}</b> shielded notes · last sync <b data-sync="true">{{ syncSeconds }}</b> s ago</div><div class="lp-tiles"><div class="lp-tile"><span>Private balance</span><b>3.232 ETH</b><small><span data-usd="3.232">{{ usd(3.232) }}</span> · across 4 chains</small></div><div class="lp-tile"><span>Shielded notes</span><b data-count="notes">{{ notes }}</b><small>2 spent · <b data-count="unspent">{{ notes - 2 }}</b> unspent</small></div><div class="lp-tile"><span>Pending intents</span><b><em class="n0">0</em><em class="n1">1</em></b><small><b data-r="from">{{ route.from }}</b> → <b data-r="to">{{ route.to }}</b> · 1Click</small></div><div class="lp-tile"><span>Relayer fees paid</span><b>0.0042 ETH</b><small>flat fee · taken from notes</small></div></div><div class="lp-panels"><div class="lp-panel lp-chart"><div class="ph"><b>Shielded notes over time</b><span class="chip">All time ▾</span></div><div class="ps">Since Sep 2026 · all pools</div><div class="bars"><i style="height:18px;opacity:0.55;--i:0"></i><i style="height:22px;opacity:0.5666666666666668;--i:1"></i><i style="height:20px;opacity:0.5833333333333334;--i:2"></i><i style="height:30px;opacity:0.6000000000000001;--i:3"></i><i style="height:26px;opacity:0.6166666666666667;--i:4"></i><i style="height:34px;opacity:0.6333333333333334;--i:5"></i><i style="height:40px;opacity:0.65;--i:6"></i><i style="height:38px;opacity:0.6666666666666667;--i:7"></i><i style="height:52px;opacity:0.6833333333333333;--i:8"></i><i style="height:44px;opacity:0.7000000000000001;--i:9"></i><i style="height:60px;opacity:0.7166666666666667;--i:10"></i><i style="height:58px;opacity:0.7333333333333334;--i:11"></i><i style="height:72px;opacity:0.75;--i:12"></i><i style="height:66px;opacity:0.7666666666666667;--i:13"></i><i style="height:80px;opacity:0.7833333333333334;--i:14"></i><i style="height:74px;opacity:0.8;--i:15"></i><i style="height:92px;opacity:0.8166666666666667;--i:16"></i><i style="height:88px;opacity:0.8333333333333334;--i:17"></i><i style="height:104px;opacity:0.8500000000000001;--i:18"></i><i style="height:98px;opacity:0.8666666666666667;--i:19"></i><i style="height:118px;opacity:0.8833333333333333;--i:20"></i><i style="height:112px;opacity:0.9;--i:21"></i><i style="height:126px;opacity:0.9166666666666667;--i:22"></i><i style="height:120px;opacity:0.9333333333333333;--i:23"></i><i style="height:134px;opacity:0.9500000000000001;--i:24"></i><i style="height:128px;opacity:1;--i:25"></i><i style="height:142px;opacity:1;--i:26"></i><i style="height:138px;opacity:1;--i:27"></i><i style="height:146px;opacity:1;--i:28"></i><i style="height:150px;opacity:1;--i:29"></i></div><div class="ax"><span>Sep 3</span><span>Oct 1</span><span>Nov 1</span></div></div><div class="lp-panel lp-bychain"><div class="ph"><b>Private balance by chain</b></div><div class="ps">Encrypted locally · visible only to you</div><div class="r"><i style="background:#27A563"></i><span>Robinhood Chain</span><b class="mono">1.300 ETH</b><u><em style="width:100%;background:#27A563"></em></u></div><div class="r"><i style="background:#4C7FE3"></i><span>Base</span><b class="mono">0.812 ETH</b><u><em style="width:62%;background:#4C7FE3"></em></u></div><div class="r"><i style="background:#C2842A"></i><span>BNB Chain</span><b class="mono">0.600 ETH</b><u><em style="width:46%;background:#C2842A"></em></u></div><div class="r"><i style="background:#7B68E0"></i><span>Arbitrum</span><b class="mono">0.520 ETH</b><u><em style="width:40%;background:#7B68E0"></em></u></div></div></div></div></div><div class="lp-win-grid lp-scene" data-scene="send"><div class="lp-flow"><div class="lp-node"><div class="t">Shield <em class="st"><span class="p">queued</span><span class="a">confirming…</span><span class="d">confirmed</span></em></div><div class="d">1.000 ETH joined the Base pool as an encrypted note.</div></div><div class="lp-node"><div class="t">Prove <em class="st"><span class="p">queued</span><span class="a">building groth16…</span><span class="d">1.4 s</span></em></div><div class="d">Your browser builds the proof. Keys never leave it.</div></div><div class="lp-node"><div class="t">Relay <em class="st"><span class="p">queued</span><span class="a">submitting…</span><span class="d">gas paid</span></em></div><div class="d">The relayer submits the transaction, so your wallet never touches it.</div></div><div class="lp-node"><div class="t">Deliver <em class="st"><span class="p">queued</span><span class="a">settling…</span><span class="d">settled</span></em></div><div class="d">The recipient receives plain ETH. Nothing on-chain links the two.</div></div></div><div class="lp-card"><h4>Send privately</h4><div class="sub">Private balance · 0.812 ETH on Base</div><div class="lp-field"><label>Recipient</label><div class="mono"><span class="type">0x9f3c…41e7</span><i class="caret" aria-hidden="true"></i></div></div><div class="lp-field"><label>Amount</label><div>0.25 ETH<i class="hatch" aria-hidden="true"></i></div></div><div class="lp-field"><label>Network fee</label><div>0.00015 ETH · paid from the pool<i class="hatch" aria-hidden="true"></i></div></div><div class="prog"><i></i></div><div class="go"><span class="g0">Send privately</span><span class="g1">Sending privately…</span><span class="g2">Sent · nothing to trace</span></div></div><div class="lp-mini lp-link"><b>Unlinkable</b><span>the paying wallet is the relayer, never yours</span><div class="q"><em class="mono">0x12ab…9c01</em><i class="ln"><u>✕</u></i><em class="mono">0x9f3c…41e7</em></div><div class="found">no on-chain edge between the two</div></div></div><div class="lp-win-grid lp-scene" data-scene="bridge"><div class="lp-flow"><div class="lp-node"><div class="t">Shield <em class="st"><span class="p">queued</span><span class="a">confirming…</span><span class="d">confirmed</span></em></div><div class="d"><b data-r="shield">{{ route.shield }}</b> joined the <b data-r="from">{{ route.from }}</b> pool as an encrypted note.</div></div><div class="lp-node"><div class="t">Prove <em class="st"><span class="p">queued</span><span class="a">building groth16…</span><span class="d">1.6 s</span></em></div><div class="d">Your browser proves the note and pays a one-time burner. Your wallet is never involved.</div></div><div class="lp-node"><div class="t">Intent <em class="st"><span class="p">queued</span><span class="a">quoting 1Click…</span><span class="d">deposit funded</span></em></div><div class="d">NEAR Intents returns a one-off deposit address. The burner pays it; the origin chain never sees <b data-r="to">{{ route.to }}</b>.</div></div><div class="lp-node"><div class="t">Deliver <em class="st"><span class="p">queued</span><span class="a">solvers settling…</span><span class="d">delivered</span></em></div><div class="d"><b data-r="toAsset">{{ route.toAsset }}</b> lands in the <b data-r="to">{{ route.to }}</b> wallet. Neither chain can see the other side.</div></div></div><div class="lp-card"><h4>Bridge privately</h4><div class="sub">From <b data-r="from">{{ route.from }}</b> · private <b data-r="asset">{{ route.asset }}</b></div><div class="lp-field"><label>To</label><div><img class="ico" data-r="toLogo" :src="route.toLogo" alt=""/><b data-r="to">{{ route.to }}</b> · <b data-r="toAsset">{{ route.toAsset }}</b><i class="hatch" aria-hidden="true"></i></div></div><div class="lp-field"><label>Recipient</label><div class="mono"><span class="type" data-r="recipient">{{ route.recipient }}</span><i class="caret" aria-hidden="true"></i></div></div><div class="lp-field"><label>You receive</label><div>≈ <b data-r="out">{{ routeOut }}</b> · NEAR Intents quote<i class="hatch" aria-hidden="true"></i></div></div><div class="prog"><i></i></div><div class="go"><span class="g0">Bridge privately</span><span class="g1">Bridging via NEAR Intents…</span><span class="g2">Delivered on <b data-r="to">{{ route.to }}</b> · no trail</span></div></div></div><div class="lp-win-grid lp-scene" data-scene="shield"><div class="lp-flow"><div class="lp-node"><div class="t">Approve <em class="st"><span class="p">queued</span><span class="a">signing…</span><span class="d">signed</span></em></div><div class="d">One wallet signature authorises the deposit. Nothing else ever leaves your wallet.</div></div><div class="lp-node"><div class="t">Encrypt <em class="st"><span class="p">queued</span><span class="a">building note…</span><span class="d">note built</span></em></div><div class="d">Amount, owner and blinding are sealed into a note only your key can open.</div></div><div class="lp-node"><div class="t">Commit <em class="st"><span class="p">queued</span><span class="a">adding to tree…</span><span class="d">leaf 4 821</span></em></div><div class="d">The commitment joins the Merkle tree. The chain sees a hash, never an amount.</div></div><div class="lp-node"><div class="t">Confirm <em class="st"><span class="p">queued</span><span class="a">confirming…</span><span class="d">confirmed</span></em></div><div class="d">Your private balance updates. Any amount, withdrawable whenever you want.</div></div></div><div class="lp-card"><h4>Shield privately</h4><div class="sub">Robinhood Chain · wallet 2.418 ETH</div><div class="lp-field"><label>Asset</label><div>ETH · Robinhood Chain<i class="hatch" aria-hidden="true"></i></div></div><div class="lp-field"><label>Amount</label><div><span class="type">1.000 ETH</span><i class="caret" aria-hidden="true"></i></div></div><div class="lp-field"><label>Fee</label><div>0.0003 ETH · relayer<i class="hatch" aria-hidden="true"></i></div></div><div class="prog"><i></i></div><div class="go"><span class="g0">Shield privately</span><span class="g1">Shielding…</span><span class="g2">Shielded · +1.000 ETH private</span></div></div><div class="lp-mini lp-tree"><b>Merkle tree</b><span>new leaf → root · 4 levels</span><div class="r r3"><i></i><i></i><i></i><i></i><i></i><i class="p"></i><i></i><i></i></div><div class="r r2"><i></i><i></i><i class="p"></i><i></i></div><div class="r r1"><i></i><i class="p"></i></div><div class="r r0"><i class="p"></i></div></div></div><div class="lp-win-grid lp-scene" data-scene="swap"><div class="lp-flow"><div class="lp-node"><div class="t">Prove <em class="st"><span class="p">queued</span><span class="a">building groth16…</span><span class="d">1.4 s</span></em></div><div class="d">Your browser proves you own a note worth 0.500 ETH. No address is revealed.</div></div><div class="lp-node"><div class="t">Burner <em class="st"><span class="p">queued</span><span class="a">funding…</span><span class="d">funded</span></em></div><div class="d">A one-time burner receives the ETH. It has never transacted before.</div></div><div class="lp-node"><div class="t">Route <em class="st"><span class="p">queued</span><span class="a">Uniswap V3…</span><span class="d"><span data-q-amt="0.5" data-q-fee="0.003" data-q-unit="USDG" data-q-dec="2" data-q-prefix="">{{ quote(0.5, 0.003, 'USDG', 2) }}</span></span></em></div><div class="d">The burner swaps on Uniswap V3 at the public price. 1% slippage cap.</div></div><div class="lp-node"><div class="t">Re-shield <em class="st"><span class="p">queued</span><span class="a">re-shielding…</span><span class="d">note updated</span></em></div><div class="d">The USDG goes straight back into the pool as a fresh note.</div></div></div><div class="lp-card"><h4>Swap privately</h4><div class="sub">Private balance · 1.300 ETH on Robinhood Chain</div><div class="lp-field"><label>From</label><div>0.500 ETH<i class="hatch" aria-hidden="true"></i></div></div><div class="lp-field"><label>To</label><div><span data-q-amt="0.5" data-q-fee="0.003" data-q-unit="USDG" data-q-dec="2" data-q-prefix="≈ ">{{ quote(0.5, 0.003, 'USDG', 2, '≈ ') }}</span><i class="hatch" aria-hidden="true"></i></div></div><div class="lp-field"><label>Price</label><div><span data-q-amt="1" data-q-fee="0" data-q-unit="USDG / ETH" data-q-dec="2" data-q-prefix="">{{ quote(1, 0, 'USDG / ETH', 2) }}</span> · 1% slippage<i class="hatch" aria-hidden="true"></i></div></div><div class="prog"><i></i></div><div class="go"><span class="g0">Swap privately</span><span class="g1">Swapping…</span><span class="g2">Re-shielded · nothing links the trade</span></div></div><div class="lp-mini lp-quote"><b>Quote</b><span>Uniswap V3 · refreshes every 5 s</span><div class="q"><em data-tick="2268.40">{{ swapPrice }}</em><small>USDG / ETH</small><i class="spin">⇄</i></div><svg viewBox="0 0 272 40" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,34 18,30 36,32 54,24 72,26 90,20 108,22 126,16 144,18 162,12 180,14 198,10 216,12 234,6 252,8 272,4"></polyline></svg></div></div><div class="lp-win-grid lp-scene" data-scene="recover"><div class="lp-flow"><div class="lp-node"><div class="t">Derive <em class="st"><span class="p">queued</span><span class="a">deriving…</span><span class="d">128 burners</span></em></div><div class="d">Every burner key you ever used is re-derived from your signature. No backup needed.</div></div><div class="lp-node"><div class="t">Scan <em class="st"><span class="p">queued</span><span class="a">checking chains…</span><span class="d">4 chains</span></em></div><div class="d">Each burner is checked on every pool chain for stranded funds.</div></div><div class="lp-node"><div class="t">Sweep <em class="st"><span class="p">queued</span><span class="a">sweeping…</span><span class="d">0.25 ETH swept</span></em></div><div class="d">Stranded funds are swept back into your private balance.</div></div><div class="lp-node"><div class="t">Intents <em class="st"><span class="p">queued</span><span class="a">verifying…</span><span class="d">3 verified</span></em></div><div class="d">Every bridge intent in your encrypted registry is re-checked with 1Click.</div></div></div><div class="lp-card"><h4>Recover</h4><div class="sub">Scanning 4 chains · 3 intents in registry</div><div class="lp-field"><label>burner 0x4a1e…c0d2</label><div class="mono">0.25 ETH stranded<i class="hatch" aria-hidden="true"></i></div></div><div class="lp-field"><label>burner 0x77b0…9e1f</label><div class="mono">empty<i class="hatch" aria-hidden="true"></i></div></div><div class="lp-field"><label>bridge → Solana · 1Click</label><div class="mono">delivered<i class="hatch" aria-hidden="true"></i></div></div><div class="prog"><i></i></div><div class="go"><span class="g0">Recover</span><span class="g1">Scanning…</span><span class="g2">Swept to private balance</span></div></div><div class="lp-mini lp-scan"><b>Scanning from signature</b><span>burners derived · 4 chains · intent registry</span><div class="q"><em><b data-counter="true">{{ recoverCount }}</b> / 128</em><small>burners checked</small></div><u><em></em></u><div class="found">1 stranded burner found · 3 intents verified</div></div></div><div class="lp-term" aria-hidden="true"><div class="td"><i></i><i></i><i></i></div><div class="tset" data-for="bridge"><div class="tl l0"><span class="c">$</span> agpool bridge --from <b data-r="fromSlug">{{ fromSlug }}</b> --to <b data-r="toSlug">{{ toSlug }}</b> --amount <b data-r="shield">{{ route.shield }}</b></div><div class="tl l1">proof     groth16 · 1.6 s · built on your device</div><div class="tl l2">intent    1Click deposit <b data-r="recipient">{{ route.recipient }}</b> funded by one-time burner</div><div class="tl l3 ok">status    delivered · <b data-r="out">{{ routeOut }}</b> · no trail</div></div><div class="tset" data-for="shield"><div class="tl l0"><span class="c">$</span> agpool shield --chain robinhood --amount 1 ETH</div><div class="tl l1">note      commitment 0x8f3a…c21e</div><div class="tl l2">tree      leaf 4 821 · root updated</div><div class="tl l3 ok">status    shielded · private balance +1.000 ETH</div></div><div class="tset" data-for="send"><div class="tl l0"><span class="c">$</span> agpool send --to 0x9f3c…41e7 --amount 0.25 ETH</div><div class="tl l1">proof     groth16 · 1.4 s · built on your device</div><div class="tl l2">relayer   submitted · gas paid from the note</div><div class="tl l3 ok">status    delivered · nothing to trace</div></div><div class="tset" data-for="swap"><div class="tl l0"><span class="c">$</span> agpool swap --from eth --to usdg --amount 0.5</div><div class="tl l1">burner    one-time 0x77b0…9e1f funded</div><div class="tl l2">router    Uniswap V3 · <span data-q-amt="0.5" data-q-fee="0.003" data-q-unit="USDG" data-q-dec="2" data-q-prefix="">{{ quote(0.5, 0.003, 'USDG', 2) }}</span> out</div><div class="tl l3 ok">status    re-shielded · nothing links the trade</div></div><div class="tset" data-for="recover"><div class="tl l0"><span class="c">$</span> agpool recover --scan</div><div class="tl l1">registry  128 burners decrypted</div><div class="tl l2">found     0x4a1e…c0d2 · 0.25 ETH stranded</div><div class="tl l3 ok">status    swept to private balance</div></div></div></div><div class="lp-win-tag"><i></i>Live · Private bridge</div><div class="lp-win-done"><span class="ok">Run complete</span><button type="button" class="lp-replay" @click="replay">Replay</button></div></div>
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
