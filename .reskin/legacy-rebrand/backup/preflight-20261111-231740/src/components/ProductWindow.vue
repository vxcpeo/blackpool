<!-- Interactive product demo: a mock private-account console, the five private flows
     (shield, send, swap, bridge, recover) and a typewriter terminal that play on a loop. -->
<template>
<div id="product" ref="windowEl" class="lp-window" :data-scene="scene" :data-step="String(step)" :data-cycle="cycle" :data-started="step > 0 ? '' : null" :style="{ '--k': String(scale) }"><div class="lp-stage"><div class="lp-console" aria-hidden="true"><aside class="lp-sb"><div class="lp-sb-brand"><svg viewBox="0 0 100 100" width="18" height="18" class="" aria-hidden="true"><defs><mask id="bp-mark-mask"><rect width="100" height="100" fill="#fff"></rect><circle cx="58.0" cy="57.0" r="14.5" fill="#000"></circle><path d="M29.78 7.00 L29.78 7.86 L29.81 8.73 L29.86 9.60 L29.93 10.49 L30.01 11.37 L30.11 12.27 L30.23 13.17 L30.37 14.07 L30.53 14.97 L30.70 15.88 L30.89 16.78 L31.09 17.69 L31.31 18.60 L31.55 19.50 L31.80 20.40 L32.07 21.30 L32.35 22.19 L32.64 23.08 L32.95 23.97 L33.27 24.84 L33.61 25.71 L33.96 26.57 L34.33 27.42 L34.70 28.26 L35.09 29.09 L35.49 29.91 L35.90 30.71 L36.33 31.51 L36.76 32.28 L37.21 33.05 L37.67 33.79 L38.13 34.52 L38.61 35.23 L39.10 35.93 L39.60 36.60 L40.10 37.26 L40.62 37.89 L41.15 38.50 L41.68 39.09 L42.23 39.65 L42.78 40.19 L43.34 40.71 L43.92 41.20 L44.50 41.66 L45.08 42.10 L45.68 42.50 L46.29 42.88 L46.90 43.22 L47.52 43.53 L48.16 43.81 L48.80 44.06 L49.44 44.27 L50.10 44.44 L50.76 44.57 L51.44 44.66 L52.11 44.72 L52.80 44.73 L53.49 44.69 L54.18 44.61 L54.85 44.49 L54.43 42.54 L53.83 42.69 L53.27 42.79 L52.70 42.86 L52.14 42.90 L51.57 42.89 L51.00 42.86 L50.43 42.78 L49.86 42.67 L49.28 42.53 L48.71 42.35 L48.14 42.14 L47.56 41.89 L46.99 41.61 L46.42 41.30 L45.85 40.95 L45.28 40.58 L44.72 40.18 L44.16 39.74 L43.61 39.28 L43.06 38.79 L42.52 38.27 L41.98 37.73 L41.45 37.17 L40.93 36.57 L40.41 35.96 L39.91 35.32 L39.41 34.67 L38.92 33.99 L38.44 33.29 L37.97 32.58 L37.51 31.84 L37.06 31.09 L36.62 30.33 L36.20 29.54 L35.78 28.75 L35.38 27.94 L34.99 27.12 L34.61 26.29 L34.24 25.45 L33.89 24.60 L33.56 23.74 L33.23 22.87 L32.92 22.00 L32.63 21.12 L32.35 20.24 L32.09 19.35 L31.84 18.46 L31.61 17.56 L31.40 16.67 L31.20 15.77 L31.02 14.88 L30.86 13.99 L30.71 13.10 L30.58 12.21 L30.48 11.32 L30.39 10.45 L30.32 9.57 L30.27 8.71 L30.24 7.85 L30.22 7.00 Z" fill="#000"></path><path d="M13.84 16.19 L14.39 16.65 L14.94 17.15 L15.50 17.67 L16.06 18.22 L16.63 18.79 L17.21 19.39 L17.78 20.01 L18.36 20.66 L18.95 21.32 L19.54 22.00 L20.13 22.70 L20.73 23.41 L21.33 24.14 L21.93 24.88 L22.54 25.63 L23.15 26.39 L23.76 27.15 L24.37 27.93 L24.98 28.71 L25.60 29.49 L26.22 30.27 L26.84 31.06 L27.46 31.84 L28.08 32.62 L28.70 33.40 L29.33 34.17 L29.95 34.93 L30.58 35.69 L31.20 36.43 L31.83 37.17 L32.45 37.89 L33.08 38.60 L33.70 39.29 L34.33 39.96 L34.95 40.62 L35.58 41.26 L36.20 41.87 L36.83 42.47 L37.45 43.03 L38.07 43.58 L38.70 44.09 L39.32 44.58 L39.94 45.04 L40.57 45.47 L41.19 45.86 L41.82 46.22 L42.45 46.55 L43.08 46.83 L43.72 47.08 L44.36 47.28 L45.00 47.44 L45.65 47.55 L46.30 47.61 L46.96 47.61 L47.61 47.56 L48.27 47.45 L48.92 47.28 L49.57 47.04 L50.21 46.75 L50.81 46.41 L49.65 44.54 L49.16 44.87 L48.70 45.13 L48.24 45.34 L47.78 45.51 L47.31 45.63 L46.82 45.71 L46.33 45.75 L45.82 45.74 L45.30 45.69 L44.77 45.60 L44.23 45.47 L43.67 45.30 L43.10 45.09 L42.53 44.84 L41.94 44.54 L41.34 44.22 L40.74 43.85 L40.14 43.45 L39.52 43.02 L38.91 42.55 L38.28 42.06 L37.66 41.54 L37.03 40.98 L36.40 40.41 L35.76 39.81 L35.13 39.19 L34.49 38.55 L33.85 37.89 L33.21 37.21 L32.57 36.51 L31.93 35.80 L31.28 35.08 L30.64 34.35 L30.00 33.60 L29.36 32.85 L28.72 32.10 L28.08 31.33 L27.44 30.57 L26.81 29.80 L26.17 29.03 L25.54 28.26 L24.91 27.49 L24.28 26.73 L23.66 25.97 L23.03 25.22 L22.41 24.48 L21.80 23.75 L21.18 23.03 L20.57 22.32 L19.97 21.63 L19.37 20.95 L18.77 20.29 L18.18 19.65 L17.59 19.03 L17.00 18.43 L16.42 17.85 L15.85 17.30 L15.28 16.77 L14.72 16.28 L14.16 15.81 Z" fill="#000"></path><path d="M7.94 32.27 L8.69 32.44 L9.43 32.64 L10.17 32.87 L10.91 33.13 L11.66 33.43 L12.41 33.75 L13.15 34.10 L13.90 34.47 L14.65 34.87 L15.40 35.29 L16.14 35.73 L16.89 36.19 L17.63 36.66 L18.37 37.16 L19.11 37.66 L19.85 38.18 L20.59 38.71 L21.32 39.25 L22.05 39.80 L22.78 40.35 L23.50 40.91 L24.22 41.47 L24.94 42.04 L25.65 42.60 L26.36 43.16 L27.06 43.72 L27.76 44.28 L28.45 44.83 L29.14 45.37 L29.82 45.90 L30.50 46.43 L31.17 46.94 L31.83 47.44 L32.49 47.92 L33.15 48.39 L33.79 48.84 L34.43 49.27 L35.07 49.67 L35.70 50.06 L36.32 50.42 L36.94 50.76 L37.55 51.07 L38.15 51.35 L38.76 51.60 L39.36 51.82 L39.95 52.01 L40.54 52.15 L41.14 52.26 L41.73 52.33 L42.31 52.35 L42.90 52.32 L43.48 52.24 L44.06 52.10 L44.62 51.91 L45.18 51.66 L45.72 51.34 L46.24 50.97 L46.74 50.54 L47.22 50.05 L47.66 49.54 L45.85 48.12 L45.51 48.60 L45.18 48.99 L44.85 49.33 L44.51 49.63 L44.17 49.88 L43.81 50.08 L43.44 50.25 L43.06 50.38 L42.65 50.48 L42.23 50.54 L41.79 50.56 L41.32 50.55 L40.84 50.50 L40.34 50.42 L39.81 50.30 L39.28 50.14 L38.72 49.95 L38.15 49.73 L37.57 49.48 L36.97 49.19 L36.36 48.88 L35.74 48.54 L35.11 48.18 L34.47 47.79 L33.82 47.38 L33.16 46.95 L32.50 46.50 L31.82 46.04 L31.14 45.56 L30.45 45.06 L29.76 44.56 L29.06 44.04 L28.35 43.51 L27.63 42.98 L26.92 42.44 L26.19 41.90 L25.46 41.35 L24.73 40.81 L23.99 40.26 L23.25 39.72 L22.51 39.18 L21.76 38.64 L21.01 38.11 L20.26 37.60 L19.50 37.09 L18.75 36.59 L17.99 36.11 L17.23 35.64 L16.46 35.18 L15.70 34.75 L14.94 34.33 L14.17 33.94 L13.41 33.57 L12.64 33.22 L11.88 32.90 L11.11 32.60 L10.34 32.34 L9.58 32.10 L8.82 31.90 L8.06 31.73 Z" fill="#000"></path><path d="M8.01 49.25 L8.81 49.22 L9.60 49.21 L10.39 49.24 L11.19 49.29 L11.99 49.37 L12.78 49.47 L13.58 49.60 L14.37 49.75 L15.16 49.92 L15.95 50.11 L16.74 50.31 L17.53 50.53 L18.31 50.77 L19.09 51.03 L19.87 51.29 L20.64 51.57 L21.41 51.85 L22.17 52.15 L22.93 52.45 L23.68 52.75 L24.42 53.07 L25.16 53.38 L25.89 53.70 L26.62 54.02 L27.33 54.33 L28.04 54.65 L28.74 54.96 L29.43 55.26 L30.12 55.56 L30.79 55.85 L31.45 56.14 L32.11 56.41 L32.75 56.67 L33.39 56.92 L34.01 57.15 L34.62 57.37 L35.23 57.58 L35.82 57.76 L36.40 57.92 L36.97 58.07 L37.54 58.19 L38.09 58.28 L38.63 58.35 L39.16 58.39 L39.69 58.40 L40.21 58.38 L40.71 58.32 L41.21 58.23 L41.70 58.09 L42.17 57.90 L42.63 57.67 L43.07 57.39 L43.49 57.07 L43.89 56.69 L44.26 56.27 L44.60 55.80 L44.92 55.29 L45.20 54.73 L45.46 54.12 L45.69 53.50 L43.59 52.84 L43.43 53.41 L43.27 53.91 L43.09 54.36 L42.89 54.76 L42.68 55.12 L42.46 55.43 L42.22 55.71 L41.97 55.96 L41.70 56.17 L41.41 56.36 L41.10 56.52 L40.76 56.65 L40.41 56.76 L40.02 56.84 L39.61 56.89 L39.18 56.92 L38.73 56.92 L38.25 56.90 L37.75 56.85 L37.23 56.77 L36.69 56.67 L36.14 56.55 L35.57 56.41 L34.98 56.25 L34.38 56.07 L33.76 55.87 L33.13 55.66 L32.49 55.43 L31.83 55.19 L31.16 54.94 L30.48 54.67 L29.79 54.40 L29.09 54.12 L28.38 53.84 L27.66 53.55 L26.94 53.25 L26.20 52.96 L25.46 52.66 L24.71 52.37 L23.95 52.07 L23.19 51.78 L22.42 51.50 L21.64 51.22 L20.86 50.95 L20.07 50.68 L19.28 50.43 L18.49 50.19 L17.69 49.96 L16.89 49.75 L16.09 49.55 L15.28 49.37 L14.47 49.21 L13.66 49.07 L12.85 48.95 L12.04 48.85 L11.23 48.78 L10.42 48.73 L9.61 48.71 L8.79 48.71 L7.99 48.75 Z" fill="#000"></path><path d="M19.11 67.20 L19.71 66.86 L20.31 66.56 L20.91 66.29 L21.52 66.04 L22.13 65.82 L22.74 65.62 L23.35 65.44 L23.97 65.29 L24.58 65.16 L25.20 65.05 L25.81 64.95 L26.42 64.88 L27.04 64.82 L27.65 64.77 L28.25 64.74 L28.86 64.72 L29.46 64.72 L30.06 64.72 L30.65 64.74 L31.24 64.76 L31.82 64.80 L32.39 64.83 L32.96 64.88 L33.52 64.92 L34.08 64.97 L34.62 65.03 L35.16 65.08 L35.69 65.13 L36.21 65.18 L36.71 65.23 L37.21 65.28 L37.70 65.32 L38.18 65.35 L38.64 65.38 L39.10 65.40 L39.54 65.41 L39.97 65.40 L40.39 65.39 L40.80 65.36 L41.20 65.32 L41.59 65.26 L41.96 65.18 L42.32 65.07 L42.67 64.95 L43.01 64.79 L43.33 64.61 L43.64 64.40 L43.92 64.15 L44.18 63.87 L44.42 63.56 L44.62 63.22 L44.80 62.84 L44.95 62.44 L45.07 62.01 L45.16 61.55 L45.22 61.06 L45.25 60.55 L45.25 60.00 L45.23 59.42 L45.18 58.82 L43.29 59.05 L43.38 59.60 L43.44 60.10 L43.48 60.56 L43.49 60.98 L43.48 61.36 L43.45 61.71 L43.40 62.02 L43.33 62.30 L43.24 62.56 L43.14 62.78 L43.02 62.99 L42.89 63.18 L42.73 63.35 L42.56 63.51 L42.36 63.65 L42.14 63.79 L41.89 63.91 L41.62 64.01 L41.32 64.11 L41.00 64.19 L40.66 64.25 L40.30 64.31 L39.92 64.35 L39.52 64.38 L39.10 64.40 L38.66 64.41 L38.21 64.41 L37.75 64.40 L37.27 64.39 L36.77 64.37 L36.27 64.34 L35.75 64.32 L35.22 64.29 L34.68 64.26 L34.13 64.23 L33.57 64.20 L33.01 64.17 L32.43 64.15 L31.85 64.13 L31.26 64.11 L30.66 64.11 L30.06 64.11 L29.45 64.12 L28.84 64.14 L28.23 64.17 L27.61 64.22 L26.99 64.28 L26.36 64.35 L25.74 64.44 L25.11 64.55 L24.48 64.67 L23.85 64.82 L23.22 64.98 L22.60 65.17 L21.97 65.38 L21.35 65.61 L20.73 65.87 L20.11 66.15 L19.50 66.47 L18.89 66.80 Z" fill="#000"></path></mask></defs><rect width="100" height="100" rx="12" fill="currentColor" mask="url(#bp-mark-mask)"></rect></svg>Blackpool</div><div class="lp-sb-h">Views</div><div class="lp-sb-it" data-k=""><i style="background:#6E7074"></i>Overview</div><div class="lp-sb-it" data-k="shield"><i style="background:#34C77B"></i>Shield</div><div class="lp-sb-it" data-k="send"><i style="background:#5B8DEF"></i>Private send</div><div class="lp-sb-it" data-k="swap"><i style="background:#8F7BF2"></i>Swap</div><div class="lp-sb-it" data-k="bridge"><i style="background:#E9A23B"></i>Private bridge</div><div class="lp-sb-it" data-k="recover"><i style="background:#EF5B5B"></i>Recovery</div><div class="lp-sb-h">Chains</div><div class="lp-sb-it"><i style="background:#4C7FE3"></i>Base</div><div class="lp-sb-it"><i style="background:#27A563"></i>Robinhood Chain</div><div class="lp-sb-it"><i style="background:#7B68E0"></i>Arbitrum</div><div class="lp-sb-it"><i style="background:#C2842A"></i>BNB Chain</div></aside><div class="lp-main"><div class="lp-main-h"><b>Private account</b><span class="live"><i></i>Live</span></div><div class="lp-main-s">4 chains · <b data-count="notes">{{ notes }}</b> shielded notes · last sync <b data-sync="true">{{ syncSeconds }}</b> s ago</div><div class="lp-tiles"><div class="lp-tile"><span>Private balance</span><b>3.232 ETH</b><small><span data-usd="3.232">{{ usd(3.232) }}</span> · across 4 chains</small></div><div class="lp-tile"><span>Shielded notes</span><b data-count="notes">{{ notes }}</b><small>2 spent · <b data-count="unspent">{{ notes - 2 }}</b> unspent</small></div><div class="lp-tile"><span>Pending intents</span><b><em class="n0">0</em><em class="n1">1</em></b><small><b data-r="from">{{ route.from }}</b> → <b data-r="to">{{ route.to }}</b> · 1Click</small></div><div class="lp-tile"><span>Relayer fees paid</span><b>0.0042 ETH</b><small>flat fee · taken from notes</small></div></div><div class="lp-panels"><div class="lp-panel lp-chart"><div class="ph"><b>Shielded notes over time</b><span class="chip">All time ▾</span></div><div class="ps">Since Sep 2026 · all pools</div><div class="bars"><i style="height:18px;opacity:0.55;--i:0"></i><i style="height:22px;opacity:0.5666666666666668;--i:1"></i><i style="height:20px;opacity:0.5833333333333334;--i:2"></i><i style="height:30px;opacity:0.6000000000000001;--i:3"></i><i style="height:26px;opacity:0.6166666666666667;--i:4"></i><i style="height:34px;opacity:0.6333333333333334;--i:5"></i><i style="height:40px;opacity:0.65;--i:6"></i><i style="height:38px;opacity:0.6666666666666667;--i:7"></i><i style="height:52px;opacity:0.6833333333333333;--i:8"></i><i style="height:44px;opacity:0.7000000000000001;--i:9"></i><i style="height:60px;opacity:0.7166666666666667;--i:10"></i><i style="height:58px;opacity:0.7333333333333334;--i:11"></i><i style="height:72px;opacity:0.75;--i:12"></i><i style="height:66px;opacity:0.7666666666666667;--i:13"></i><i style="height:80px;opacity:0.7833333333333334;--i:14"></i><i style="height:74px;opacity:0.8;--i:15"></i><i style="height:92px;opacity:0.8166666666666667;--i:16"></i><i style="height:88px;opacity:0.8333333333333334;--i:17"></i><i style="height:104px;opacity:0.8500000000000001;--i:18"></i><i style="height:98px;opacity:0.8666666666666667;--i:19"></i><i style="height:118px;opacity:0.8833333333333333;--i:20"></i><i style="height:112px;opacity:0.9;--i:21"></i><i style="height:126px;opacity:0.9166666666666667;--i:22"></i><i style="height:120px;opacity:0.9333333333333333;--i:23"></i><i style="height:134px;opacity:0.9500000000000001;--i:24"></i><i style="height:128px;opacity:1;--i:25"></i><i style="height:142px;opacity:1;--i:26"></i><i style="height:138px;opacity:1;--i:27"></i><i style="height:146px;opacity:1;--i:28"></i><i style="height:150px;opacity:1;--i:29"></i></div><div class="ax"><span>Sep 3</span><span>Oct 1</span><span>Nov 1</span></div></div><div class="lp-panel lp-bychain"><div class="ph"><b>Private balance by chain</b></div><div class="ps">Encrypted locally · visible only to you</div><div class="r"><i style="background:#27A563"></i><span>Robinhood Chain</span><b class="mono">1.300 ETH</b><u><em style="width:100%;background:#27A563"></em></u></div><div class="r"><i style="background:#4C7FE3"></i><span>Base</span><b class="mono">0.812 ETH</b><u><em style="width:62%;background:#4C7FE3"></em></u></div><div class="r"><i style="background:#C2842A"></i><span>BNB Chain</span><b class="mono">0.600 ETH</b><u><em style="width:46%;background:#C2842A"></em></u></div><div class="r"><i style="background:#7B68E0"></i><span>Arbitrum</span><b class="mono">0.520 ETH</b><u><em style="width:40%;background:#7B68E0"></em></u></div></div></div></div></div><div class="lp-win-grid lp-scene" data-scene="send"><div class="lp-flow"><div class="lp-node"><div class="t">Shield <em class="st"><span class="p">queued</span><span class="a">confirming…</span><span class="d">confirmed</span></em></div><div class="d">1.000 ETH joined the Base pool as an encrypted note.</div></div><div class="lp-node"><div class="t">Prove <em class="st"><span class="p">queued</span><span class="a">building groth16…</span><span class="d">1.4 s</span></em></div><div class="d">Your browser builds the proof. Keys never leave it.</div></div><div class="lp-node"><div class="t">Relay <em class="st"><span class="p">queued</span><span class="a">submitting…</span><span class="d">gas paid</span></em></div><div class="d">The relayer submits the transaction, so your wallet never touches it.</div></div><div class="lp-node"><div class="t">Deliver <em class="st"><span class="p">queued</span><span class="a">settling…</span><span class="d">settled</span></em></div><div class="d">The recipient receives plain ETH. Nothing on-chain links the two.</div></div></div><div class="lp-card"><h4>Send privately</h4><div class="sub">Private balance · 0.812 ETH on Base</div><div class="lp-field"><label>Recipient</label><div class="mono"><span class="type">0x9f3c…41e7</span><i class="caret" aria-hidden="true"></i></div></div><div class="lp-field"><label>Amount</label><div>0.25 ETH<i class="hatch" aria-hidden="true"></i></div></div><div class="lp-field"><label>Network fee</label><div>0.00015 ETH · paid from the pool<i class="hatch" aria-hidden="true"></i></div></div><div class="prog"><i></i></div><div class="go"><span class="g0">Send privately</span><span class="g1">Sending privately…</span><span class="g2">Sent · nothing to trace</span></div></div><div class="lp-mini lp-link"><b>Unlinkable</b><span>the paying wallet is the relayer, never yours</span><div class="q"><em class="mono">0x12ab…9c01</em><i class="ln"><u>✕</u></i><em class="mono">0x9f3c…41e7</em></div><div class="found">no on-chain edge between the two</div></div></div><div class="lp-win-grid lp-scene" data-scene="bridge"><div class="lp-flow"><div class="lp-node"><div class="t">Shield <em class="st"><span class="p">queued</span><span class="a">confirming…</span><span class="d">confirmed</span></em></div><div class="d"><b data-r="shield">{{ route.shield }}</b> joined the <b data-r="from">{{ route.from }}</b> pool as an encrypted note.</div></div><div class="lp-node"><div class="t">Prove <em class="st"><span class="p">queued</span><span class="a">building groth16…</span><span class="d">1.6 s</span></em></div><div class="d">Your browser proves the note and pays a one-time burner. Your wallet is never involved.</div></div><div class="lp-node"><div class="t">Intent <em class="st"><span class="p">queued</span><span class="a">quoting 1Click…</span><span class="d">deposit funded</span></em></div><div class="d">NEAR Intents returns a one-off deposit address. The burner pays it; the origin chain never sees <b data-r="to">{{ route.to }}</b>.</div></div><div class="lp-node"><div class="t">Deliver <em class="st"><span class="p">queued</span><span class="a">solvers settling…</span><span class="d">delivered</span></em></div><div class="d"><b data-r="toAsset">{{ route.toAsset }}</b> lands in the <b data-r="to">{{ route.to }}</b> wallet. Neither chain can see the other side.</div></div></div><div class="lp-card"><h4>Bridge privately</h4><div class="sub">From <b data-r="from">{{ route.from }}</b> · private <b data-r="asset">{{ route.asset }}</b></div><div class="lp-field"><label>To</label><div><img class="ico" data-r="toLogo" :src="route.toLogo" alt=""/><b data-r="to">{{ route.to }}</b> · <b data-r="toAsset">{{ route.toAsset }}</b><i class="hatch" aria-hidden="true"></i></div></div><div class="lp-field"><label>Recipient</label><div class="mono"><span class="type" data-r="recipient">{{ route.recipient }}</span><i class="caret" aria-hidden="true"></i></div></div><div class="lp-field"><label>You receive</label><div>≈ <b data-r="out">{{ routeOut }}</b> · NEAR Intents quote<i class="hatch" aria-hidden="true"></i></div></div><div class="prog"><i></i></div><div class="go"><span class="g0">Bridge privately</span><span class="g1">Bridging via NEAR Intents…</span><span class="g2">Delivered on <b data-r="to">{{ route.to }}</b> · no trail</span></div></div></div><div class="lp-win-grid lp-scene" data-scene="shield"><div class="lp-flow"><div class="lp-node"><div class="t">Approve <em class="st"><span class="p">queued</span><span class="a">signing…</span><span class="d">signed</span></em></div><div class="d">One wallet signature authorises the deposit. Nothing else ever leaves your wallet.</div></div><div class="lp-node"><div class="t">Encrypt <em class="st"><span class="p">queued</span><span class="a">building note…</span><span class="d">note built</span></em></div><div class="d">Amount, owner and blinding are sealed into a note only your key can open.</div></div><div class="lp-node"><div class="t">Commit <em class="st"><span class="p">queued</span><span class="a">adding to tree…</span><span class="d">leaf 4 821</span></em></div><div class="d">The commitment joins the Merkle tree. The chain sees a hash, never an amount.</div></div><div class="lp-node"><div class="t">Confirm <em class="st"><span class="p">queued</span><span class="a">confirming…</span><span class="d">confirmed</span></em></div><div class="d">Your private balance updates. Any amount, withdrawable whenever you want.</div></div></div><div class="lp-card"><h4>Shield privately</h4><div class="sub">Robinhood Chain · wallet 2.418 ETH</div><div class="lp-field"><label>Asset</label><div>ETH · Robinhood Chain<i class="hatch" aria-hidden="true"></i></div></div><div class="lp-field"><label>Amount</label><div><span class="type">1.000 ETH</span><i class="caret" aria-hidden="true"></i></div></div><div class="lp-field"><label>Fee</label><div>0.0003 ETH · relayer<i class="hatch" aria-hidden="true"></i></div></div><div class="prog"><i></i></div><div class="go"><span class="g0">Shield privately</span><span class="g1">Shielding…</span><span class="g2">Shielded · +1.000 ETH private</span></div></div><div class="lp-mini lp-tree"><b>Merkle tree</b><span>new leaf → root · 4 levels</span><div class="r r3"><i></i><i></i><i></i><i></i><i></i><i class="p"></i><i></i><i></i></div><div class="r r2"><i></i><i></i><i class="p"></i><i></i></div><div class="r r1"><i></i><i class="p"></i></div><div class="r r0"><i class="p"></i></div></div></div><div class="lp-win-grid lp-scene" data-scene="swap"><div class="lp-flow"><div class="lp-node"><div class="t">Prove <em class="st"><span class="p">queued</span><span class="a">building groth16…</span><span class="d">1.4 s</span></em></div><div class="d">Your browser proves you own a note worth 0.500 ETH. No address is revealed.</div></div><div class="lp-node"><div class="t">Burner <em class="st"><span class="p">queued</span><span class="a">funding…</span><span class="d">funded</span></em></div><div class="d">A one-time burner receives the ETH. It has never transacted before.</div></div><div class="lp-node"><div class="t">Route <em class="st"><span class="p">queued</span><span class="a">Uniswap V3…</span><span class="d"><span data-q-amt="0.5" data-q-fee="0.003" data-q-unit="USDG" data-q-dec="2" data-q-prefix="">{{ quote(0.5, 0.003, 'USDG', 2) }}</span></span></em></div><div class="d">The burner swaps on Uniswap V3 at the public price. 1% slippage cap.</div></div><div class="lp-node"><div class="t">Re-shield <em class="st"><span class="p">queued</span><span class="a">re-shielding…</span><span class="d">note updated</span></em></div><div class="d">The USDG goes straight back into the pool as a fresh note.</div></div></div><div class="lp-card"><h4>Swap privately</h4><div class="sub">Private balance · 1.300 ETH on Robinhood Chain</div><div class="lp-field"><label>From</label><div>0.500 ETH<i class="hatch" aria-hidden="true"></i></div></div><div class="lp-field"><label>To</label><div><span data-q-amt="0.5" data-q-fee="0.003" data-q-unit="USDG" data-q-dec="2" data-q-prefix="≈ ">{{ quote(0.5, 0.003, 'USDG', 2, '≈ ') }}</span><i class="hatch" aria-hidden="true"></i></div></div><div class="lp-field"><label>Price</label><div><span data-q-amt="1" data-q-fee="0" data-q-unit="USDG / ETH" data-q-dec="2" data-q-prefix="">{{ quote(1, 0, 'USDG / ETH', 2) }}</span> · 1% slippage<i class="hatch" aria-hidden="true"></i></div></div><div class="prog"><i></i></div><div class="go"><span class="g0">Swap privately</span><span class="g1">Swapping…</span><span class="g2">Re-shielded · nothing links the trade</span></div></div><div class="lp-mini lp-quote"><b>Quote</b><span>Uniswap V3 · refreshes every 5 s</span><div class="q"><em data-tick="2268.40">{{ swapPrice }}</em><small>USDG / ETH</small><i class="spin">⇄</i></div><svg viewBox="0 0 272 40" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,34 18,30 36,32 54,24 72,26 90,20 108,22 126,16 144,18 162,12 180,14 198,10 216,12 234,6 252,8 272,4"></polyline></svg></div></div><div class="lp-win-grid lp-scene" data-scene="recover"><div class="lp-flow"><div class="lp-node"><div class="t">Derive <em class="st"><span class="p">queued</span><span class="a">deriving…</span><span class="d">128 burners</span></em></div><div class="d">Every burner key you ever used is re-derived from your signature. No backup needed.</div></div><div class="lp-node"><div class="t">Scan <em class="st"><span class="p">queued</span><span class="a">checking chains…</span><span class="d">4 chains</span></em></div><div class="d">Each burner is checked on every pool chain for stranded funds.</div></div><div class="lp-node"><div class="t">Sweep <em class="st"><span class="p">queued</span><span class="a">sweeping…</span><span class="d">0.25 ETH swept</span></em></div><div class="d">Stranded funds are swept back into your private balance.</div></div><div class="lp-node"><div class="t">Intents <em class="st"><span class="p">queued</span><span class="a">verifying…</span><span class="d">3 verified</span></em></div><div class="d">Every bridge intent in your encrypted registry is re-checked with 1Click.</div></div></div><div class="lp-card"><h4>Recover</h4><div class="sub">Scanning 4 chains · 3 intents in registry</div><div class="lp-field"><label>burner 0x4a1e…c0d2</label><div class="mono">0.25 ETH stranded<i class="hatch" aria-hidden="true"></i></div></div><div class="lp-field"><label>burner 0x77b0…9e1f</label><div class="mono">empty<i class="hatch" aria-hidden="true"></i></div></div><div class="lp-field"><label>bridge → Solana · 1Click</label><div class="mono">delivered<i class="hatch" aria-hidden="true"></i></div></div><div class="prog"><i></i></div><div class="go"><span class="g0">Recover</span><span class="g1">Scanning…</span><span class="g2">Swept to private balance</span></div></div><div class="lp-mini lp-scan"><b>Scanning from signature</b><span>burners derived · 4 chains · intent registry</span><div class="q"><em><b data-counter="true">{{ recoverCount }}</b> / 128</em><small>burners checked</small></div><u><em></em></u><div class="found">1 stranded burner found · 3 intents verified</div></div></div><div class="lp-term" aria-hidden="true"><div class="td"><i></i><i></i><i></i></div><div class="tset" data-for="bridge"><div class="tl l0"><span class="c">$</span> blackpool bridge --from <b data-r="fromSlug">{{ fromSlug }}</b> --to <b data-r="toSlug">{{ toSlug }}</b> --amount <b data-r="shield">{{ route.shield }}</b></div><div class="tl l1">proof     groth16 · 1.6 s · built on your device</div><div class="tl l2">intent    1Click deposit <b data-r="recipient">{{ route.recipient }}</b> funded by one-time burner</div><div class="tl l3 ok">status    delivered · <b data-r="out">{{ routeOut }}</b> · no trail</div></div><div class="tset" data-for="shield"><div class="tl l0"><span class="c">$</span> blackpool shield --chain robinhood --amount 1 ETH</div><div class="tl l1">note      commitment 0x8f3a…c21e</div><div class="tl l2">tree      leaf 4 821 · root updated</div><div class="tl l3 ok">status    shielded · private balance +1.000 ETH</div></div><div class="tset" data-for="send"><div class="tl l0"><span class="c">$</span> blackpool send --to 0x9f3c…41e7 --amount 0.25 ETH</div><div class="tl l1">proof     groth16 · 1.4 s · built on your device</div><div class="tl l2">relayer   submitted · gas paid from the note</div><div class="tl l3 ok">status    delivered · nothing to trace</div></div><div class="tset" data-for="swap"><div class="tl l0"><span class="c">$</span> blackpool swap --from eth --to usdg --amount 0.5</div><div class="tl l1">burner    one-time 0x77b0…9e1f funded</div><div class="tl l2">router    Uniswap V3 · <span data-q-amt="0.5" data-q-fee="0.003" data-q-unit="USDG" data-q-dec="2" data-q-prefix="">{{ quote(0.5, 0.003, 'USDG', 2) }}</span> out</div><div class="tl l3 ok">status    re-shielded · nothing links the trade</div></div><div class="tset" data-for="recover"><div class="tl l0"><span class="c">$</span> blackpool recover --scan</div><div class="tl l1">registry  128 burners decrypted</div><div class="tl l2">found     0x4a1e…c0d2 · 0.25 ETH stranded</div><div class="tl l3 ok">status    swept to private balance</div></div></div></div><div class="lp-win-tag"><i></i>Live · Private bridge</div><div class="lp-win-done"><span class="ok">Run complete</span><button type="button" class="lp-replay" @click="replay">Replay</button></div></div>
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
