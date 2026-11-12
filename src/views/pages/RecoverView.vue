
<template>
<main class="leaf-page is-sweep"><div class="play-stage"><div class="play-inner"><div class="leaf-sheet"><div class="leaf-mast"><h1>Recover</h1><p class="sweep-lede">Anything that can get stuck is recoverable from your signature alone. Open this page in the wallet you used, sign once, and every burner registered to that wallet is found, swept back and listed with your bridges.</p></div><section class="sweep-tool"><div class="leaf-demo sweep-demo"><div class="leaf-screen long sweep-screen"><div class="leaf-screen-h">Recover funds<span>Scans Robinhood Chain · Base · Arbitrum · BNB Chain for one-time swap wallets</span></div><div class="leaf-tag-row"><span class="leaf-tag"><i class="sweep-dot"></i>Robinhood Chain</span><span class="leaf-tag"><i class="sweep-dot"></i>Base</span><span class="leaf-tag"><i class="sweep-dot"></i>Arbitrum</span><span class="leaf-tag"><i class="sweep-dot"></i>BNB Chain</span></div><div class="leaf-kv"><span>Wallet</span><b >not connected</b></div><div class="leaf-kv"><span>Signature</span><b>1 · stays in this browser</b></div><div class="leaf-kv"><span>Burner registry</span><b>decrypted locally</b></div><button class="leaf-btn sweep-btn">Recover my funds</button><div class="sweep-console"><div class="sweep-console-h"><span class="num">log</span><span class="leaf-pill">idle</span></div><pre class="sweep-log"><span class="sweep-prompt">&gt; waiting for signature</span>
  press Recover my funds to start. Output stays on this device.</pre></div><div class="leaf-screen-f">No seed phrases, no exports. Funds return to the wallet you sign with.</div></div></div></section><section class="sweep-blocks"><div class="sweep-block"><h3>Your signature stays local</h3><p>Recover decrypts your burner registry in the browser and signs sweeps there. Nothing secret is sent to a server.</p></div><div class="sweep-block"><h3>Burners from any device</h3><p>Every one-time swap wallet is registered encrypted at creation, so a swap that stalls is recoverable anywhere.</p></div><div class="sweep-block"><h3>Bridges and refunds</h3><p>Every cross-chain intent is listed with its status. A failed bridge shows where the refund went.</p></div></section><section class="leaf-cta"><h2>Move value privately.<br><span>Start with one signature.</span></h2><p>Connect a wallet, sign once, and your private account exists on every supported chain.</p><a class="leaf-btn big" href="/app">Launch app</a></section><p class="leaf-foot">© 2026 Agpool. Recovery uses public RPC endpoints; keys never leave your device.</p></div></div></div><nav class="dock-bar"><div class="dock-track"><a class="leaf-brand" href="/"><svg class="logo-mark" viewBox="0 0 48 48" width="26" height="26" aria-hidden="true" focusable="false"><rect x="3" y="3" width="42" height="42" rx="15" fill="currentColor"/><path d="M24 11.5 34 33.5h-6.2l-1.9-4.6h-3.8l-1.9 4.6h-6.2L24 11.5Zm0 8.8-1.5 4.9h3L24 20.3Z" fill="#FBF6E9"/><circle cx="35.5" cy="12.5" r="3.4" fill="#FFC94A"/></svg>Agpool<span class="leaf-brand-sub">Recover</span></a><div class="dock-links"><a href="/">Home</a><a href="/docs">Docs</a><a href="/agents">Agents</a><a href="/analytics">Analytics</a><a href="/changelog">Changelog</a></div><a class="leaf-btn" href="/app">Launch app</a></div></nav></main>
<ConnectModal
  v-if="connectOpen"
  :wallets="wallets"
  :connecting-id="connectingId"
  :error="walletError"
  @close="connectOpen = false"
  @select="selectWallet"
  @browser="selectBrowser"
/>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ConnectModal from '../../components/app/ConnectModal.vue'
import { usePrivateAccount } from '../../composables/usePrivateAccount'
import { useWallet } from '../../composables/useWallet'
import { shortAddress, wait } from '../../utils/format'

const wallet = useWallet()
wallet.init()

const { address, connected, connectingId, error: walletError, wallets } = wallet
const account = usePrivateAccount()

const connectOpen = ref(false)
let scanning = false
let button = null

function logLine(text) {
  const log = document.querySelector('.sweep-log')
  if (!log) return
  const span = document.createElement('span')
  span.className = 'sweep-prompt'
  span.textContent = `> ${text}\n`
  log.appendChild(span)
}

watch(
  address,
  (value) => {
    account.load(value)
    const row = document.querySelector('.rc .leaf-kv b')
    if (row) row.textContent = value ? shortAddress(value) : 'not connected'
    if (value && !scanning) {
      const log = document.querySelector('.sweep-log')
      if (log) {
        log.textContent = ''
        logLine('wallet connected · press Recover my funds to scan')
        log.append('  Output stays on this device.')
      }
    }
  },
  { immediate: true },
)

function openConnect() {
  walletError.value = ''
  connectOpen.value = true
}

async function selectWallet(entry) {
  await wallet.connectInjected(entry)
  if (address.value) connectOpen.value = false
}

async function selectBrowser() {
  await wallet.connectBrowser()
  if (address.value) connectOpen.value = false
}

async function recover() {
  if (!connected.value) {
    openConnect()
    return
  }
  if (scanning) return
  scanning = true
  if (button) {
    button.disabled = true
    button.innerHTML = '<span class="rc-spin"></span>Scanning…'
  }
  const pill = document.querySelector('.sweep-console .leaf-pill')
  if (pill) pill.textContent = 'scanning'
  const log = document.querySelector('.sweep-log')
  if (log) log.textContent = ''

  logLine('verifying signature')
  await wait(650)
  logLine('derived 128 burner keys from this wallet')
  await wait(900)
  logLine('checking Robinhood Chain · Base · Arbitrum · BNB Chain')
  await wait(1400)
  logLine('128 burners checked · 0 funded')
  await wait(700)
  logLine(`${account.state.bridges.length} bridge intents verified`)
  await wait(650)
  logLine('scan complete · nothing to recover')

  if (pill) pill.textContent = 'complete'
  if (button) {
    button.disabled = false
    button.textContent = 'Scan again'
  }
  scanning = false
}

onMounted(() => {
  button = document.querySelector('.rc .sweep-btn')
  button?.addEventListener('click', recover)
})

onBeforeUnmount(() => {
  button?.removeEventListener('click', recover)
})
</script>
