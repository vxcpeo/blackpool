<!-- Top warning bar: token contract address with copy control and the official X account. -->
<template>
  <div class="bp-notice bp-notice-live" role="note">
    <div class="bp-notice-body">
      <span class="bp-notice-ca"><i aria-hidden="true"></i><span><a href="/token">$BP</a> contract<span class="bp-notice-chain"> on Robinhood Chain</span></span><button type="button" class="bp-ca" :aria-label="`Copy the contract address ${ADDRESS}`" @click="copy"><code class="bp-ca-full">{{ ADDRESS }}</code><code class="bp-ca-short">{{ shortAddress }}</code><span class="bp-ca-act">{{ copied ? 'Copied' : 'Copy' }}</span></button></span><span>Our only X account is <a href="https://x.com/agpool_robin" target="_blank" rel="noopener noreferrer">@agpool_robin</a>.</span>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'

const ADDRESS = '0xB6F2e3D5f9F1BFb0363f3aECEC26B5B9bdbeEdC1'
const shortAddress = computed(() => `${ADDRESS.slice(0, 6)}…${ADDRESS.slice(-4)}`)
const copied = ref(false)
let timer

async function copy() {
  try {
    await navigator.clipboard.writeText(ADDRESS)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = ADDRESS
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
    } catch {}
    textarea.remove()
  }
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (copied.value = false), 1500)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>
