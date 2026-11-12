import { computed, ref, shallowRef } from 'vue'
import { CHAINS, getChain } from '../data/chains'
import { randomAddress, wait } from '../utils/format'

/**
 * Wallet connection for the private account.
 *
 * Injected wallets are discovered through EIP-6963 (with a `window.ethereum`
 * fallback). When no extension is available the app offers a Browser Wallet:
 * an account created and kept in this browser, which is how the site lets
 * people try the app without installing anything.
 */

const SESSION_KEY = 'blackpool.session.v1'
const BROWSER_KEY = 'blackpool.browser.v1'
const SIGNED_KEY = 'blackpool.signature.v1'
const CHAIN_KEY = 'blackpool.chain.v1'
const DISCONNECTED_KEY = 'blackpool.disconnected.v1'

const address = ref(null)
const walletKind = ref(null)
const walletChainId = ref(null)
const chainId = ref(readStoredChain())
const connecting = ref(false)
const connectingId = ref(null)
const signing = ref(false)
const error = ref('')
const wallets = shallowRef([])
const initialized = ref(false)
const providerRef = shallowRef(null)

let activeProvider = null
let activeInfo = null
let initStarted = false
let boundProvider = null

function readJson(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

function removeKey(key) {
  try {
    localStorage.removeItem(key)
  } catch {}
}

function readStoredChain() {
  const stored = Number(readJson(CHAIN_KEY))
  return CHAINS.some((chain) => chain.id === stored) ? stored : 4663
}

function isSupportedChain(id) {
  return CHAINS.some((chain) => chain.id === Number(id))
}

function currentChain() {
  return getChain(chainId.value)
}

function markSigned(account) {
  const signed = readJson(SIGNED_KEY) || {}
  signed[account.toLowerCase()] = Date.now()
  writeJson(SIGNED_KEY, signed)
}

function hasSigned(account) {
  const signed = readJson(SIGNED_KEY) || {}
  return Boolean(signed[account.toLowerCase()])
}

function messageFor(account) {
  const nonce = Math.random().toString(36).slice(2, 10)
  const issued = new Date().toISOString()
  return [
    'Welcome to Blackpool',
    '',
    'Sign this message to derive your private account keys on this device.',
    '',
    `Wallet: ${account}`,
    `Chain: ${currentChain().label}`,
    `Issued: ${issued}`,
    `Nonce: ${nonce}`,
    '',
    'This request does not send a transaction and costs no gas.',
  ].join('\n')
}

function toHexMessage(message) {
  const bytes = new TextEncoder().encode(message)
  return `0x${Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')}`
}

async function requestSignature(force = false) {
  if (walletKind.value !== 'injected' || !activeProvider || !address.value) return null
  if (!force && hasSigned(address.value)) return null
  signing.value = true
  try {
    const signature = await activeProvider.request({
      method: 'personal_sign',
      params: [toHexMessage(messageFor(address.value)), address.value],
    })
    if (signature) markSigned(address.value)
    return signature
  } catch {
    return null
  } finally {
    signing.value = false
  }
}

function readChainId(provider) {
  return provider
    .request({ method: 'eth_chainId' })
    .then((value) => Number.parseInt(value, 16))
    .catch(() => null)
}

function attachEvents(provider) {
  if (!provider?.on || boundProvider === provider) return
  boundProvider = provider
  provider.on('accountsChanged', (accounts) => {
    if (!accounts || !accounts.length) {
      disconnect()
      return
    }
    if (accounts[0].toLowerCase() !== address.value?.toLowerCase()) {
      address.value = accounts[0]
      const session = readJson(SESSION_KEY)
      if (session) writeJson(SESSION_KEY, { ...session, address: accounts[0] })
      requestSignature()
    }
  })
  provider.on('chainChanged', (value) => {
    const id = Number.parseInt(value, 16)
    walletChainId.value = id
    if (isSupportedChain(id)) {
      chainId.value = id
      writeJson(CHAIN_KEY, id)
    }
  })
  provider.on('disconnect', () => disconnect())
}

async function hydrateInjected(wallet, account, { silent = false } = {}) {
  activeProvider = wallet.provider
  providerRef.value = wallet.provider
  activeInfo = wallet.info
  address.value = account
  walletKind.value = 'injected'
  attachEvents(wallet.provider)
  const walletChain = await readChainId(wallet.provider)
  walletChainId.value = walletChain
  chainId.value = isSupportedChain(walletChain) ? walletChain : readStoredChain()
  writeJson(CHAIN_KEY, chainId.value)
  writeJson(SESSION_KEY, {
    kind: 'injected',
    address: account,
    rdns: wallet.info?.rdns || null,
    chainId: chainId.value,
  })
  removeKey(DISCONNECTED_KEY)
  if (!hasSigned(account)) requestSignature()
  if (silent) initialized.value = true
}

function hydrateBrowser(account) {
  activeProvider = null
  providerRef.value = null
  activeInfo = null
  address.value = account
  walletKind.value = 'browser'
  walletChainId.value = null
  chainId.value = readStoredChain()
  writeJson(SESSION_KEY, { kind: 'browser', address: account, chainId: chainId.value })
  removeKey(DISCONNECTED_KEY)
  markSigned(account)
  initialized.value = true
}

function discover(entry) {
  if (!entry?.info || !entry.provider) return
  if (wallets.value.some((item) => item.info.uuid === entry.info.uuid || item.provider === entry.provider)) return
  wallets.value = [...wallets.value, entry]
}

function discoverLegacy() {
  const legacy = typeof window !== 'undefined' ? window.ethereum : null
  if (!legacy) return
  if (wallets.value.some((item) => item.provider === legacy)) return
  const name = legacy.isRabby
    ? 'Rabby'
    : legacy.isCoinbaseWallet
      ? 'Coinbase Wallet'
      : legacy.isMetaMask
        ? 'MetaMask'
        : 'Browser Extension'
  discover({
    info: { uuid: `legacy:${name}`, name, icon: null, rdns: null },
    provider: legacy,
  })
}

async function restore() {
  const session = readJson(SESSION_KEY)
  if (session?.kind === 'browser' && session.address) {
    hydrateBrowser(session.address)
    return
  }
  if (session?.kind === 'injected' && session.address) {
    const wallet =
      wallets.value.find((item) => session.rdns && item.info.rdns === session.rdns) || wallets.value[0]
    if (wallet) {
      try {
        const accounts = await wallet.provider.request({ method: 'eth_accounts' })
        const match = accounts?.find((item) => item.toLowerCase() === session.address.toLowerCase())
        if (match) {
          await hydrateInjected(wallet, match, { silent: true })
          return
        }
      } catch {}
    }
    removeKey(SESSION_KEY)
  }
  if (readJson(DISCONNECTED_KEY)) {
    initialized.value = true
    return
  }
  for (const wallet of wallets.value) {
    try {
      const accounts = await wallet.provider.request({ method: 'eth_accounts' })
      if (accounts?.length) {
        await hydrateInjected(wallet, accounts[0], { silent: true })
        return
      }
    } catch {}
  }
  initialized.value = true
}

function init() {
  if (initStarted) return
  initStarted = true
  if (typeof window === 'undefined') return
  window.addEventListener('eip6963:announceProvider', (event) => discover(event.detail))
  window.dispatchEvent(new Event('eip6963:requestProvider'))
  setTimeout(() => {
    discoverLegacy()
    restore()
  }, 260)
}

function connectionError(cause) {
  if (cause?.code === 4001) return 'Connection request rejected.'
  if (cause?.code === -32002) return 'A wallet request is already pending.'
  return 'Could not connect. Open your wallet and try again.'
}

async function connectInjected(wallet) {
  if (!wallet) return
  error.value = ''
  connecting.value = true
  connectingId.value = wallet.info.uuid
  try {
    const accounts = await wallet.provider.request({ method: 'eth_requestAccounts' })
    if (!accounts?.length) throw new Error('No account')
    await hydrateInjected(wallet, accounts[0])
  } catch (cause) {
    error.value = connectionError(cause)
  } finally {
    connecting.value = false
    connectingId.value = null
  }
}

let browserConnectDelay = 700

async function connectBrowser() {
  error.value = ''
  connecting.value = true
  connectingId.value = 'browser'
  await wait(browserConnectDelay)
  let account = readJson(BROWSER_KEY)
  if (!account?.address) {
    account = { address: randomAddress(), createdAt: Date.now() }
    writeJson(BROWSER_KEY, account)
  }
  hydrateBrowser(account.address)
  connecting.value = false
  connectingId.value = null
}

function disconnect() {
  address.value = null
  walletKind.value = null
  walletChainId.value = null
  activeProvider = null
  providerRef.value = null
  activeInfo = null
  signing.value = false
  removeKey(SESSION_KEY)
  writeJson(DISCONNECTED_KEY, true)
}

function selectChain(chain) {
  if (!chain) return
  chainId.value = chain.id
  writeJson(CHAIN_KEY, chain.id)
  if (walletKind.value === 'injected' && activeProvider) {
    activeProvider
      .request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.hex }] })
      .catch(() => {})
  }
}

const connected = computed(() => Boolean(address.value))
const activeProviderName = computed(() => activeInfo?.name || (walletKind.value === 'browser' ? 'Browser Wallet' : ''))
const activeChain = computed(() => currentChain())
const chainLabel = computed(() => currentChain().label)

export function useWallet() {
  return {
    address,
    walletKind,
    walletChainId,
    chainId,
    chainLabel,
    activeChain,
    connected,
    connecting,
    connectingId,
    signing,
    error,
    wallets,
    initialized,
    providerName: activeProviderName,
    provider: providerRef,
    init,
    connectInjected,
    connectBrowser,
    disconnect,
    selectChain,
    requestSignature,
    chains: CHAINS,
  }
}
