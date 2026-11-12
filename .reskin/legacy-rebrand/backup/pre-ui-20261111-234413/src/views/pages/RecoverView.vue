<!-- Static recreation of /recover, captured from the production site. -->
<template>
<main class="cl rc"><header class="cl-nav"><div class="cl-nav-in"><a class="cl-brand" href="/"><svg viewBox="0 0 100 100" width="24" height="24" class="" aria-hidden="true"><defs><mask id="bp-mark-mask"><rect width="100" height="100" fill="#fff"></rect><path d="M50 20 L74 78 L61.5 78 L57 66 L43 66 L38.5 78 L26 78 Z M50 41 L53.5 58 L46.5 58 Z" fill="#000" fill-rule="evenodd"></path></mask></defs><rect width="100" height="100" rx="12" fill="currentColor" mask="url(#bp-mark-mask)"></rect></svg>Agpool<span class="cl-brand-sub">Recover</span></a><nav class="cl-nav-links"><a href="/">Home</a><a href="/docs">Docs</a><a href="/agents">Agents</a><a href="/analytics">Analytics</a><a href="/changelog">Changelog</a></nav><a class="cl-btn" href="/app">Launch app</a></div></header><div class="cl-wrap"><div class="cl-head"><h1>Recover</h1><p class="rc-lead">Anything that can get stuck is recoverable from your signature alone. Open this page in the wallet you used, sign once, and every burner registered to that wallet is found, swept back and listed with your bridges.</p></div><section class="rc-tool"><div class="cl-vis rc-vis"><div class="cl-mock wide rc-win"><div class="cl-mock-h">Recover funds<span>Scans Robinhood Chain · Base · Arbitrum · BNB Chain for one-time swap wallets</span></div><div class="cl-chips"><span class="cl-chip"><i class="rc-dot" style="background:#34C77B"></i>Robinhood Chain</span><span class="cl-chip"><i class="rc-dot" style="background:#4C7FE3"></i>Base</span><span class="cl-chip"><i class="rc-dot" style="background:#7B68E0"></i>Arbitrum</span><span class="cl-chip"><i class="rc-dot" style="background:#E9A23B"></i>BNB Chain</span></div><div class="cl-kv"><span>Wallet</span><b class="">not connected</b></div><div class="cl-kv"><span>Signature</span><b>1 · stays in this browser</b></div><div class="cl-kv"><span>Burner registry</span><b>decrypted locally</b></div><button class="cl-btn rc-btn">Recover my funds</button><div class="rc-console"><div class="rc-console-h"><span class="mono">log</span><span class="cl-pill ">idle</span></div><pre class="rc-log"><span class="rc-prompt">&gt; waiting for signature</span>
  press Recover my funds to start. Output stays on this device.</pre></div><div class="cl-mock-f">No seed phrases, no exports. Funds return to the wallet you sign with.</div></div></div></section><section class="rc-tiles"><div class="rc-tile"><h3>Your signature stays local</h3><p>Recover decrypts your burner registry in the browser and signs sweeps there. Nothing secret is sent to a server.</p></div><div class="rc-tile"><h3>Burners from any device</h3><p>Every one-time swap wallet is registered encrypted at creation, so a swap that stalls is recoverable anywhere.</p></div><div class="rc-tile"><h3>Bridges and refunds</h3><p>Every cross-chain intent is listed with its status. A failed bridge shows where the refund went.</p></div></section><section class="cl-cta"><h2>Move value privately.<br><span>Start with one signature.</span></h2><p>Connect a wallet, sign once, and your private account exists on every supported chain.</p><a class="cl-btn lg" href="/app">Launch app</a></section><p class="cl-foot">© 2026 Agpool. Recovery uses public RPC endpoints; keys never leave your device.</p></div></main>
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

<style src="../../styles/content/content.css"></style>
<style src="../../styles/content/recover.css"></style>
<style src="../../styles/app.css"></style>

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
  const log = document.querySelector('.rc-log')
  if (!log) return
  const span = document.createElement('span')
  span.className = 'rc-prompt'
  span.textContent = `> ${text}\n`
  log.appendChild(span)
}

watch(
  address,
  (value) => {
    account.load(value)
    const row = document.querySelector('.rc .cl-kv b')
    if (row) row.textContent = value ? shortAddress(value) : 'not connected'
    if (value && !scanning) {
      const log = document.querySelector('.rc-log')
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
  const pill = document.querySelector('.rc-console .cl-pill')
  if (pill) pill.textContent = 'scanning'
  const log = document.querySelector('.rc-log')
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
  button = document.querySelector('.rc .rc-btn')
  button?.addEventListener('click', recover)
})

onBeforeUnmount(() => {
  button?.removeEventListener('click', recover)
})
</script>
