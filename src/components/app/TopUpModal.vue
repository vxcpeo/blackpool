<template>
  <Teleport to="body">
    <div class="pop-overlay" @click.self="onBackdrop">
      <div class="pop-modal" role="dialog" aria-modal="true" aria-label="Top up private balance">
        <div class="pop-modal-head">
          <div class="pop-modal-title">Top up private balance</div>
          <button v-if="canClose" type="button" class="pop-close" aria-label="Close" @click="$emit('close')">✕</button>
        </div>
        <p class="pop-sub">Add funds to your private balance so you're able to send privately.</p>

        <div class="cash-box" :class="{ 'pop-disabled': stage !== 'form' }">
          <div class="cash-opt">
            <div class="cash-max" @click="useMax">MAX</div>
            <div>
              <div class="coin-switch">
                <div class="coin-switch-on">
                  <img :src="asset.logo" :alt="asset.symbol" /><span>{{ asset.symbol }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="cash-main">
            <input
              ref="input"
              v-model="amountText"
              class="cash-input"
              placeholder="0.00"
              inputmode="decimal"
              :disabled="stage !== 'form'"
              @keydown.enter.prevent="submit"
            />
          </div>
          <div class="cash-conv"><span class="cash-conv-txt">{{ conversion }}</span></div>
        </div>

        <p class="pop-balance-line">
          Wallet balance: {{ formatAmount(walletBalance) }} {{ asset.symbol }}
          <template v-if="asset.native"> · MAX keeps 0.0001 {{ asset.symbol }} for gas</template>
        </p>

        <p v-if="stage === 'form' && amount > maxSpend" class="pop-error">Not enough {{ asset.symbol }} in this wallet.</p>

        <div v-if="stage === 'proving' || stage === 'confirming'" class="pop-balance-line">
          <span class="pop-spin"></span>{{ stage === 'proving' ? 'Generating proof on this device…' : 'Confirming deposit…' }}
        </div>

        <div v-if="stage === 'done'" class="pop-success">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
          <div>
            <b>{{ formatAmount(depositAmount) }} {{ asset.symbol }}</b> added to your private balance.
            <div class="pop-hash">tx {{ hash }}</div>
          </div>
        </div>

        <button
          type="button"
          class="push push-fill"
          :class="{ 'pop-disabled': stage === 'form' && !canDeposit }"
         
          :disabled="stage === 'proving' || stage === 'confirming' || (stage === 'form' && !canDeposit)"
          @click="submit"
        >
          <span v-if="stage === 'form'">Deposit</span>
          <span v-else-if="stage === 'done'">Done</span>
          <span v-else><span class="pop-spin"></span>Depositing</span>
        </button>

        <p v-if="error" class="pop-error">{{ error }}</p>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { formatAmount, parseAmount } from '../../utils/format'

const props = defineProps({
  asset: { type: Object, required: true },
  walletBalance: { type: Number, default: 0 },
  price: { type: Number, default: 1 },
  stage: { type: String, default: 'form' },
  depositAmount: { type: Number, default: 0 },
  hash: { type: String, default: '' },
  error: { type: String, default: '' },
})

const emit = defineEmits(['close', 'deposit'])

const amountText = ref('')
const input = ref(null)

const reserve = computed(() => (props.asset.native ? 0.0001 : 0))
const maxSpend = computed(() => Math.max(0, props.walletBalance - reserve.value))
const amount = computed(() => parseAmount(amountText.value))
const canDeposit = computed(() => amount.value > 0 && amount.value <= maxSpend.value)
const canClose = computed(() => props.stage === 'form' || props.stage === 'done')

function formatNumber(value, decimals = 6) {
  return Number(value.toFixed(decimals)).toString()
}

const conversion = computed(() => {
  if (!amount.value) return '$0'
  const usd = amount.value * props.price
  return props.price === 1 ? `$${formatNumber(usd, 2)}` : `$${usd.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
})

function useMax() {
  if (!maxSpend.value) return
  amountText.value = formatNumber(maxSpend.value)
}

function submit() {
  if (props.stage === 'done') {
    emit('close')
    return
  }
  if (props.stage !== 'form') return
  if (!canDeposit.value) return
  emit('deposit', amount.value)
}

const onBackdrop = () => {
  if (canClose.value) emit('close')
}

const onKey = (event) => {
  if (event.key === 'Escape' && canClose.value) emit('close')
}

onMounted(async () => {
  document.addEventListener('keydown', onKey)
  document.body.style.overflow = 'hidden'
  await nextTick()
  input.value?.focus()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>
