import { reactive } from 'vue'
import { assetDecimals, getAsset } from '../data/chains'

/**
 * Locally kept private account: private balances, notes (UTXOs), the bridge
 * registry and deposited totals used to keep the wallet balance in sync.
 * Everything is scoped to the connected address and survives a reload.
 */

const PREFIX = 'blackpool.account.v1.'

function key(chainId, symbol) {
  return `${chainId}:${symbol}`
}

function emptyState() {
  return { balances: {}, utxos: {}, spent: {}, activity: [], bridges: [] }
}

const state = reactive(emptyState())
let current = null

function storageKey(account) {
  return `${PREFIX}${account.toLowerCase()}`
}

function persist() {
  if (!current) return
  try {
    localStorage.setItem(storageKey(current), JSON.stringify(state))
  } catch {}
}

function reset() {
  Object.assign(state, emptyState())
}

export function usePrivateAccount() {
  function load(account) {
    if (!account) {
      current = null
      reset()
      return
    }
    if (current === account) return
    current = account
    reset()
    try {
      const raw = localStorage.getItem(storageKey(account))
      if (raw) {
        const saved = JSON.parse(raw)
        Object.assign(state, emptyState(), saved)
      }
    } catch {}
  }

  const balance = (chainId, symbol) => Number(state.balances[key(chainId, symbol)] || 0)
  const utxos = (chainId, symbol) => Number(state.utxos[key(chainId, symbol)] || 0)
  const spent = (chainId, symbol) => Number(state.spent[key(chainId, symbol)] || 0)

  function normalizeNotes(id) {
    if (Number(state.balances[id] || 0) > 0 && Number(state.utxos[id] || 0) < 1) {
      state.utxos[id] = 1
    }
  }

  function credit(chainId, symbol, amount, { notes = 1, silent = false } = {}) {
    if (!amount || amount <= 0) return
    const id = key(chainId, symbol)
    state.balances[id] = Number(state.balances[id] || 0) + amount
    state.utxos[id] = Number(state.utxos[id] || 0) + notes
    normalizeNotes(id)
    if (!silent) record('receive', { chainId, symbol, amount })
    persist()
  }

  function debit(chainId, symbol, amount, { notes = 1 } = {}) {
    if (!amount || amount <= 0) return
    const id = key(chainId, symbol)
    state.balances[id] = Math.max(0, Number(state.balances[id] || 0) - amount)
    state.utxos[id] = Math.max(0, Number(state.utxos[id] || 0) - notes)
    normalizeNotes(id)
    persist()
  }

  function addSpent(chainId, symbol, amount) {
    if (!amount || amount <= 0) return
    const id = key(chainId, symbol)
    state.spent[id] = Number(state.spent[id] || 0) + amount
    persist()
  }

  function record(type, payload) {
    state.activity.unshift({ type, time: Date.now(), ...payload })
    if (state.activity.length > 40) state.activity.length = 40
    persist()
  }

  function recordBridge(bridge) {
    state.bridges.unshift(bridge)
    if (state.bridges.length > 20) state.bridges.length = 20
    persist()
  }

  function updateBridge(id, patch) {
    const bridge = state.bridges.find((item) => item.id === id)
    if (!bridge) return
    Object.assign(bridge, patch)
    persist()
  }

  function deposit(chainId, symbol, amount) {
    credit(chainId, symbol, amount, { notes: 1, silent: true })
    addSpent(chainId, symbol, amount)
    record('deposit', { chainId, symbol, amount })
  }

  function send(chainId, symbol, amount, recipients) {
    const id = key(chainId, symbol)
    const before = Number(state.balances[id] || 0)
    const beforeUtxos = Number(state.utxos[id] || 0)
    state.balances[id] = Math.max(0, before - amount)
    state.utxos[id] = state.balances[id] > 0 ? beforeUtxos : Math.max(0, beforeUtxos - 1)
    record('send', { chainId, symbol, amount, recipients })
    persist()
  }

  function swap(chainId, fromSymbol, toSymbol, fromAmount, toAmount) {
    debit(chainId, fromSymbol, fromAmount, { notes: 1 })
    credit(chainId, toSymbol, toAmount, { notes: 1, silent: true })
    record('swap', { chainId, fromSymbol, toSymbol, fromAmount, toAmount })
  }

  function bridge(bridge) {
    debit(bridge.fromChainId, bridge.fromSymbol, bridge.amount, { notes: 1 })
    if (bridge.targetChainId) {
      credit(bridge.targetChainId, bridge.toSymbol, bridge.received, { notes: 1, silent: true })
    }
    recordBridge(bridge)
    record('bridge', bridge)
  }

  function tokenAmount(chainId, symbol, amount) {
    const decimals = assetDecimals(symbol, chainId)
    const asset = getAsset(symbol)
    return { decimals, symbol: asset.symbol, amount }
  }

  return {
    state,
    load,
    balance,
    utxos,
    spent,
    credit,
    debit,
    addSpent,
    record,
    recordBridge,
    updateBridge,
    deposit,
    send,
    swap,
    bridge,
    tokenAmount,
    persist,
  }
}
