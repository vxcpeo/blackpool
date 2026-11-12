<template>
  <Teleport to="body">
    <div class="bp-overlay" @click.self="onBackdrop">
      <div class="bp-modal" role="dialog" aria-modal="true" aria-label="Connect a wallet">
        <div class="bp-grab" aria-hidden="true"></div>
        <div class="bp-modal-head">
          <div class="bp-modal-title">Connect a wallet</div>
          <button type="button" class="bp-close" aria-label="Close" @click="$emit('close')">✕</button>
        </div>
        <p class="bp-sub">Choose how you want to connect to AGPOOL.</p>

        <div class="bp-wallet-list">
          <button
            v-for="wallet in wallets"
            :key="wallet.info.uuid"
            type="button"
            class="bp-wallet"
            :disabled="Boolean(connectingId)"
            @click="$emit('select', wallet)"
          >
            <span class="bp-wallet-icon">
              <img v-if="wallet.info.icon" :src="wallet.info.icon" alt="" />
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2" y="6" width="20" height="14" rx="3"></rect><path d="M16 13h2"></path><path d="M2 10h20"></path>
              </svg>
            </span>
            <span style="flex: 1; min-width: 0">
              <span style="display: block">{{ wallet.info.name }}</span>
            </span>
            <span v-if="connectingId === wallet.info.uuid" class="bp-spin"></span>
          </button>

          <button type="button" class="bp-wallet" :disabled="Boolean(connectingId)" @click="$emit('browser')">
            <span class="bp-wallet-icon">
              <svg width="20" height="20" viewBox="0 0 36 36" fill="currentColor" aria-hidden="true">
                <path d="M32,15H31V9a1,1,0,0,0-1-1H6a1,1,0,0,1-1-.82V6.82A1,1,0,0,1,6,6H29.58a1,1,0,0,0,0-2H6A3,3,0,0,0,3,7a3.08,3.08,0,0,0,0,.36V27.93A4.1,4.1,0,0,0,7.13,32H30a1,1,0,0,0,1-1V25h1a1,1,0,0,0,1-1V16A1,1,0,0,0,32,15ZM29,30H7.13A2.11,2.11,0,0,1,5,27.93V9.88A3.11,3.11,0,0,0,6,10H29v5H22a5,5,0,0,0,0,10h7Zm2-7H22a3,3,0,0,1,0-6H31Z"></path>
              </svg>
            </span>
            <span style="flex: 1; min-width: 0">
              <span style="display: block">Browser Wallet</span>
            </span>
            <span v-if="connectingId === 'browser'" class="bp-spin"></span>
          </button>
        </div>

        <p v-if="error" class="bp-error">{{ error }}</p>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

const props = defineProps({
  wallets: { type: Array, default: () => [] },
  connectingId: { type: String, default: null },
  error: { type: String, default: '' },
})

const emit = defineEmits(['close', 'select', 'browser'])

const onBackdrop = () => {
  if (!props.connectingId) emit('close')
}

const onKey = (event) => {
  if (event.key === 'Escape' && !props.connectingId) emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKey)
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>
