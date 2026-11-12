<template>
  <div class="user_panel_menu" role="dialog" aria-label="Account and bridges">
    <div class="up-grab" aria-hidden="true"><span></span></div>
    <div class="up-head">
      <div style="min-width: 0">
        <div class="up-kicker">Connected · {{ chainLabel }}</div>
        <div style="font-size: 15px; color: var(--color-fg1); font-family: var(--font-mono); font-weight: 500">{{ shortAddress(address) }}</div>
      </div>
      <div style="display: flex; gap: 4px">
        <button type="button" class="up-icon" title="Copy address" aria-label="Copy address" @click="copyAddress">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2"></rect>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
          </svg>
        </button>
        <a
          v-if="explorer"
          class="up-icon"
          :href="explorerUrl"
          target="_blank"
          rel="noopener noreferrer"
          :title="`View on ${explorerName}`"
          :aria-label="`View on ${explorerName}`"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
            <path d="M15 3h6v6"></path>
            <path d="M10 14L21 3"></path>
          </svg>
        </a>
      </div>
    </div>

    <div class="up-section">
      <div class="up-section-h"><span class="up-kicker" style="margin: 0">Private bridges</span></div>
      <template v-if="bridges.length">
        <div v-for="bridge in bridges.slice(0, 4)" :key="bridge.id" class="up-bridge" :class="{ live: bridge.status === 'delivered' }">
          <div class="up-l1">
            <span class="up-route"><b>{{ formatAmount(bridge.amount) }} {{ bridge.fromSymbol }}</b> → <b>{{ bridge.toLabel }}</b></span>
            <span class="up-pill" :style="pillStyle(bridge)">{{ bridge.status === 'delivered' ? 'Delivered' : 'Bridging' }}</span>
          </div>
          <div class="up-l2">
            <span class="up-detail">{{ shortHash(bridge.hash) }}</span>
            <span>{{ timeAgo(bridge.time) }}</span>
          </div>
        </div>
      </template>
      <div v-else class="up-empty">No private bridges yet.</div>
    </div>

    <div class="up-foot">
      <a href="/recover" class="up-row" style="color: var(--color-fg2)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 12a9 9 0 1 0 3-6.7L3 8"></path>
          <path d="M3 3v5h5"></path>
          <path d="M12 7v5l3 2"></path>
        </svg>
        <span style="flex: 1 1 0%">History &amp; recovery</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="#6e7074" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>
      </a>
      <button type="button" class="up-row" style="color: #ff8d8d" @click="$emit('disconnect')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
          <path d="M16 17l5-5-5-5"></path>
          <path d="M21 12H9"></path>
        </svg>
        <span style="flex: 1 1 0%">Disconnect</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatAmount, shortAddress, shortHash } from '../../utils/format'

const props = defineProps({
  address: { type: String, required: true },
  chainLabel: { type: String, default: 'Base' },
  explorer: { type: String, default: '' },
  bridges: { type: Array, default: () => [] },
})

const emit = defineEmits(['disconnect', 'copied'])

const explorerUrl = computed(() => (props.explorer ? `${props.explorer}/address/${props.address}` : '#'))
const explorerName = computed(() => {
  if (!props.explorer) return 'Explorer'
  try {
    return new URL(props.explorer).hostname.replace('www.', '').split('.')[0]
  } catch {
    return 'Explorer'
  }
})

function pillStyle(bridge) {
  if (bridge.status === 'delivered') {
    return { background: '#34c77b1f', color: '#34c77b', border: '1px solid #34c77b33' }
  }
  return { background: '#5b8def1f', color: '#5b8def', border: '1px solid #5b8def33' }
}

function timeAgo(time) {
  const seconds = Math.max(1, Math.floor((Date.now() - Number(time || Date.now())) / 1000))
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

async function copyAddress() {
  try {
    await navigator.clipboard.writeText(props.address)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = props.address
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
    } catch {}
    textarea.remove()
  }
  emit('copied')
}
</script>
