export function formatAmount(value, maxDecimals = 6) {
  const number = typeof value === 'string' ? Number(value) : value
  if (!Number.isFinite(number)) return '0'
  const absolute = Math.abs(number)
  const decimals = absolute >= 1000 ? 2 : absolute >= 1 ? 4 : maxDecimals
  return number.toLocaleString('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  })
}

export function formatUsd(value) {
  const number = Number(value)
  if (!Number.isFinite(number) || number <= 0) return '$0'
  const decimals = number >= 1000 ? 0 : number >= 1 ? 2 : 4
  return `$${number.toLocaleString('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  })}`
}

export function shortAddress(address, head = 6, tail = 4) {
  if (!address) return ''
  return `${address.slice(0, head)}...${address.slice(-tail)}`
}

export function shortAddressTight(address) {
  if (!address) return ''
  return `${address.slice(0, 4)}…${address.slice(-4)}`
}

export function shortHash(hash) {
  if (!hash) return ''
  return `${hash.slice(0, 10)}…${hash.slice(-6)}`
}

export function randomHex(bytes = 32) {
  const data = new Uint8Array(bytes)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) crypto.getRandomValues(data)
  else for (let i = 0; i < bytes; i++) data[i] = Math.floor(Math.random() * 256)
  return `0x${Array.from(data, (byte) => byte.toString(16).padStart(2, '0')).join('')}`
}

export function randomAddress() {
  return randomHex(20)
}

export function isValidAddress(value) {
  return typeof value === 'string' && /^0x[a-fA-F0-9]{40}$/.test(value.trim())
}

export function parseAmount(value) {
  const number = Number.parseFloat(String(value ?? '').replace(/,/g, ''))
  return Number.isFinite(number) && number > 0 ? number : 0
}

export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}
