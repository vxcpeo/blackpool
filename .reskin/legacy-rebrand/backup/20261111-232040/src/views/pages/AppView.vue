<!-- App shell: private account with wallet connection, top up, send, swap and bridge. -->
<template>
  <div class="container" style="min-height: 100vh; position: relative">
    <RaysBackground />

    <div class="navbar" style="position: fixed">
      <a href="/" style="font-weight: 700; font-size: 20px; color: white; letter-spacing: 0.5px; text-decoration: none; cursor: pointer; display: flex; align-items: center; gap: 8px" title="BLACKPOOL home">
        <img src="/mark.svg" alt="" style="width: 24px; height: 24px; flex-shrink: 0" /><span class="brand_text">Blackpool</span>
      </a>
      <div class="top_right">
        <div style="position: relative" class="bp-chain-wrap">
          <button
            type="button"
            class="chain_btn"
            aria-haspopup="listbox"
            :aria-expanded="chainMenuOpen"
            :aria-label="`Network: ${activeChain.label}`"
            title="Network"
            style="min-width: 100px; padding: 7px 14px; border: 1px solid var(--color-border); border-radius: var(--radius-pill); cursor: pointer; font-size: 12px; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: -0.02em; background: var(--color-bg3); color: var(--color-fg2); display: flex; align-items: center; justify-content: space-between; gap: 8px; user-select: none"
            @click="chainMenuOpen = !chainMenuOpen"
          >
            <span style="display: flex; align-items: center; gap: 6px">
              <img :src="activeChain.logo" style="width: 16px; height: 16px; flex-shrink: 0" alt="" /><span class="chain_name">{{ activeChain.label }}</span>
            </span>
            <div :style="{ width: '16px', height: '16px', transform: chainMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.7 14.7a1 1 0 01-1.4 0l-5-5a1 1 0 011.4-1.4L12 12.6l4.3-4.3a1 1 0 011.4 1.4l-5 5z"></path></svg>
            </div>
          </button>

          <div
            v-if="chainMenuOpen"
            class="chain_menu"
            role="listbox"
            aria-label="Network"
            style="position: absolute; top: 100%; left: 0; margin-top: 6px; background: var(--color-bg1); border: 1px solid var(--color-border); border-radius: var(--radius-card); box-shadow: 0 8px 24px rgba(0, 0, 31, 0.6); z-index: 99; padding: 6px; min-width: 190px"
          >
            <div
              v-for="chain in chains"
              :key="chain.id"
              class="wallet-item"
              role="option"
              :aria-selected="chain.id === chainId"
              :style="{
                padding: '8px 12px',
                background: chain.id === chainId ? 'var(--color-primary)' : 'transparent',
                borderRadius: 'var(--radius-pill)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: chain.id === chainId ? 'var(--color-on-primary)' : 'var(--color-fg2)',
                cursor: 'pointer',
              }"
              @click="chooseChain(chain)"
            >
              <img :src="chain.logo" :alt="chain.label" style="width: 18px; height: 18px" /><span style="font-size: 14px">{{ chain.label }}</span>
              <span v-if="chain.id === chainId" style="margin-left: auto; color: rgb(145, 255, 163); font-size: 12px">●</span>
            </div>
          </div>
        </div>

        <button v-if="!connected" type="button" class="btn btn-primary btn-sm" @click="openConnect">
          <div class="icon">
            <svg fill="currentColor" viewBox="0 0 36 36" aria-hidden="true">
              <path d="M32,15H31V9a1,1,0,0,0-1-1H6a1,1,0,0,1-1-.82V6.82A1,1,0,0,1,6,6H29.58a1,1,0,0,0,0-2H6A3,3,0,0,0,3,7a3.08,3.08,0,0,0,0,.36V27.93A4.1,4.1,0,0,0,7.13,32H30a1,1,0,0,0,1-1V25h1a1,1,0,0,0,1-1V16A1,1,0,0,0,32,15ZM29,30H7.13A2.11,2.11,0,0,1,5,27.93V9.88A3.11,3.11,0,0,0,6,10H29v5H22a5,5,0,0,0,0,10h7Zm2-7H22a3,3,0,0,1,0-6H31Z"></path>
            </svg>
          </div>
          <span>Connect Wallet</span>
        </button>

        <div v-else style="position: relative" class="bp-account-wrap">
          <button
            type="button"
            class="user_panel_btn"
            title="Account"
            aria-haspopup="dialog"
            :aria-expanded="accountOpen"
            style="cursor: pointer; gap: 6px; padding: 5px 10px"
            @click="accountOpen = !accountOpen"
          >
            <span style="color: rgb(145, 255, 163)">●</span>
            <span class="addr_long">{{ shortAddress(address) }}</span>
            <span class="addr_short">{{ shortAddressTight(address) }}</span>
            <div :style="{ width: '14px', height: '14px', transform: accountOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s', display: 'flex' }">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.7 14.7a1 1 0 01-1.4 0l-5-5a1 1 0 011.4-1.4L12 12.6l4.3-4.3a1 1 0 011.4 1.4l-5 5z"></path></svg>
            </div>
          </button>
        </div>
      </div>
    </div>

    <main class="app_main" style="display: flex; justify-content: center; align-items: center; flex: 1; padding-top: 130px; padding-bottom: 40px; position: relative; z-index: 1">
      <div class="card" style="position: relative; min-width: min(350px, 100%)">
        <div style="position: absolute; top: -41px; left: 0">
          <div role="tablist" aria-label="Action" class="app_tabs" style="display: flex; gap: 5px; padding-left: 20px; align-items: flex-end">
            <div
              v-for="(tab, index) in tabs"
              :key="tab"
              role="tab"
              tabindex="0"
              :aria-selected="activeTab === index ? 'true' : 'false'"
              :class="activeTab === index ? 'withdraw_card_head_active' : 'withdraw_card_head_inactive'"
              style="cursor: pointer"
              @click="setTab(index)"
              @keydown.enter.prevent="setTab(index)"
              @keydown.space.prevent="setTab(index)"
            >
              {{ tab }}
            </div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px; padding-top: 5px">
          <div class="tab-col">
            <div style="display: flex; gap: 8px; align-items: center">
              <span style="font-size: 0.75em; color: var(--color-muted); font-family: var(--font-mono); text-transform: uppercase; letter-spacing: -0.02em">Private asset:</span>
              <div style="display: inline-flex; gap: 3px; background: var(--color-bg3); border-radius: var(--radius-pill); padding: 3px; border: 1px solid var(--color-border)">
                <div v-for="option in chainAssets" :key="option.symbol" :style="assetTabStyle(option)" @click="selectAsset(option.symbol)">
                  <img :src="option.logo" style="width: 16px; height: 16px; border-radius: 8px" :alt="option.symbol" /><span>{{ option.symbol }}</span>
                </div>
              </div>
            </div>

            <div>
              <div class="balance-row">
                <span v-if="!connected" style="color: var(--color-muted)">Connect wallet to see your private balance</span>
                <span v-else>Private: {{ formatAmount(privateBalance) }} {{ activeSymbol }} ({{ privateUtxos }} UTXO{{ privateUtxos === 1 ? '' : 's' }})</span>
                <div v-if="activeTab === 1" style="position: relative" class="bp-slippage">
                  <button
                    type="button"
                    title="Adjust slippage tolerance"
                    style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer; border: 1px solid rgb(51, 59, 74); background: rgba(31, 41, 55, 0.5); color: rgb(199, 207, 219); border-radius: 8px; padding: 5px 9px; font-size: 12.5px; line-height: 1; transition: border-color .15s, color .15s"
                    @click="slippageOpen = !slippageOpen"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                    <span>{{ slippageLabel }}</span>
                  </button>
                  <div v-if="slippageOpen" class="bp-asset-menu" style="right: 0; min-width: 160px">
                    <div v-for="option in slippageOptions" :key="option.value" class="bp-asset-option" :class="{ on: slippage === option.value }" @click="setSlippage(option.value)">
                      {{ option.label }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="field-col">
                <div class="amount_box">
                  <div class="amount_box_opt">
                    <div class="withdraw_max" @click="useMax">MAX</div>
                    <div style="position: relative">
                      <div class="token_switch" style="cursor: pointer" @click="cycleAsset">
                        <div class="token_switch_option_selected">
                          <img :src="activeAsset.logo" :alt="activeAsset.symbol" /><span>{{ activeAsset.symbol }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="amount_box_main">
                    <input v-model="rawInput" class="amount_box_input" placeholder="0.00" inputmode="decimal" spellcheck="false" @input="sanitizeAmount" />
                  </div>
                  <div class="amount_box_conv">
                    <span class="amount_box_conv_txt">{{ conversion }}</span>
                    <button
                      type="button"
                      class="amount_box_swap"
                      :title="usdMode ? 'Switch to token input' : 'Switch to USD input'"
                      style="cursor: pointer; opacity: 1"
                      @click="toggleUsdMode"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-fg2)" aria-hidden="true">
                        <path d="M7 4v16M7 4l-3 3M7 4l3 3"></path>
                        <path d="M17 20V4M17 20l-3-3M17 20l3-3"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="connected" style="display: flex; justify-content: flex-end; margin-top: 4px; position: relative; z-index: 1">
                <span class="withdraw_max" style="cursor: pointer; padding: 2px 6px" @click="openTopUp">+ Top up {{ activeSymbol }}</span>
              </div>
            </div>

            <template v-if="activeTab === 0">
              <div>
                <div style="margin-top: 0; display: flex; gap: 5px">
                  <input v-model="recipient" spellcheck="false" class="input" placeholder="Recipient address" />
                  <button class="btn btn-sm" title="Add second recipient (max 2)" type="button" @click="toggleSecondRecipient">
                    <div class="icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M4 12H20M12 4V20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </div>
                  </button>
                </div>
                <div v-if="showSecondRecipient" style="margin-top: 5px">
                  <input v-model="recipient2" spellcheck="false" class="input" placeholder="Second recipient address" />
                </div>
              </div>
            </template>

            <template v-if="activeTab === 1">
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; margin: 8px 0; padding: 10px 12px; border-radius: 10px; border: 1px solid rgb(75, 85, 99)">
                <div style="color: rgb(153, 153, 153)">Swap to private {{ swapTarget.symbol }}</div>
                <div style="display: flex; align-items: center; gap: 6px; font-weight: 600; color: rgb(204, 204, 204)">
                  <img :src="swapTarget.logo" alt="" style="width: 20px; height: 20px" /><span>{{ swapTarget.symbol }}</span>
                </div>
              </div>
              <div style="font-size: 0.78em; color: rgb(139, 147, 161); padding: 0 2px 4px; line-height: 1.4">
                Result stays private - {{ swapTarget.symbol }} lands in your private balance via a one-time burner wallet. No recipient needed.
              </div>
            </template>

            <template v-if="activeTab === 2">
              <div style="margin-bottom: 0; border-radius: 8px; border: 1px solid rgb(75, 85, 99); display: flex; justify-content: space-between; align-items: center; padding-left: 15px">
                <div style="color: rgb(153, 153, 153)">Privately bridge to {{ bridgeTarget.label }}</div>
                <div class="asset_dropdown bp-bridge-asset" style="position: relative">
                  <div
                    style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 8px 14px; border-radius: var(--radius-pill); background: var(--color-bg3); border: 1px solid var(--color-border); font-family: var(--font-mono); font-size: 13px; text-transform: uppercase; letter-spacing: -0.02em; transition: background .2s, border-color .2s"
                    @click="bridgeMenuOpen = !bridgeMenuOpen"
                  >
                    <div class="bp-asset-icons">
                      <img class="main" :src="bridgeAsset.logo" :alt="bridgeAsset.symbol" /><img class="badge" :src="bridgeTarget.logo" :alt="bridgeTarget.label" />
                    </div>
                    <span style="font-weight: 500; color: var(--color-fg1)">{{ bridgeAsset.symbol }}</span>
                    <div class="icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"></path>
                      </svg>
                    </div>
                  </div>
                  <div v-if="bridgeMenuOpen" class="bp-asset-menu" style="right: 0">
                    <div v-for="destination in bridgeOptions" :key="destination.key" class="bp-asset-option" :class="{ on: destination.key === bridgeTarget.key }" @click="chooseBridgeDestination(destination)">
                      <div class="bp-asset-icons">
                        <img class="main" :src="getAsset(destination.assets[0]).logo" alt="" /><img class="badge" :src="destination.logo" alt="" />
                      </div>
                      <span>{{ destination.label }} · {{ destination.assets[0] }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div style="margin-bottom: 0">
                <input v-model="recipient" spellcheck="false" class="input" :placeholder="`Recipient ${bridgeTarget.label} address`" />
              </div>
            </template>

            <button type="button" class="btn btn-primary" @click="onPrimary">
              <template v-if="!connected">
                <div class="icon">
                  <svg fill="currentColor" viewBox="0 0 36 36" aria-hidden="true">
                    <path d="M32,15H31V9a1,1,0,0,0-1-1H6a1,1,0,0,1-1-.82V6.82A1,1,0,0,1,6,6H29.58a1,1,0,0,0,0-2H6A3,3,0,0,0,3,7a3.08,3.08,0,0,0,0,.36V27.93A4.1,4.1,0,0,0,7.13,32H30a1,1,0,0,0,1-1V25h1a1,1,0,0,0,1-1V16A1,1,0,0,0,32,15ZM29,30H7.13A2.11,2.11,0,0,1,5,27.93V9.88A3.11,3.11,0,0,0,6,10H29v5H22a5,5,0,0,0,0,10h7Zm2-7H22a3,3,0,0,1,0-6H31Z"></path>
                  </svg>
                </div>
                <span>Connect Wallet</span>
              </template>
              <span v-else>{{ actionLabel }}</span>
            </button>

            <div v-if="connected && insufficient" class="bp-inline-hint">
              Insufficient private balance
              <button type="button" @click="openTopUp">Top up</button>
            </div>

            <div class="spacer-10"></div>
          </div>
        </div>
      </div>
    </main>

    <div class="spacer-10"></div>
    <AppFooter />

    <Teleport to="body">
      <div v-if="accountOpen" class="user_panel_scrim" @click="accountOpen = false"></div>
      <AccountMenu
        v-if="accountOpen"
        class="bp-account-menu"
        :address="address"
        :chain-label="activeChain.label"
        :explorer="walletKind === 'injected' ? activeChain.explorer : ''"
        :bridges="account.state.bridges"
        @copied="toast('Address copied')"
        @disconnect="onDisconnect"
      />
    </Teleport>

    <ConnectModal
      v-if="connectOpen"
      :wallets="wallets"
      :connecting-id="connectingId"
      :error="walletError"
      @close="connectOpen = false"
      @select="selectWallet"
      @browser="selectBrowser"
    />

    <TopUpModal
      v-if="topUpOpen"
      :asset="activeAsset"
      :wallet-balance="walletBalance"
      :price="priceOf(activeSymbol)"
      :stage="topUpStage"
      :deposit-amount="topUpAmount"
      :hash="topUpHash"
      @close="closeTopUp"
      @deposit="deposit"
    />

    <ActionModal v-if="flow" :flow="flow" @close="closeFlow" />

    <div class="bp-toasts">
      <div v-for="item in toasts" :key="item.id" class="bp-toast" :class="{ error: item.type === 'error' }">
        <svg v-if="item.type === 'error'" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v5"></path><path d="M12 16h.01"></path></svg>
        <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34c77b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
        <span>{{ item.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import RaysBackground from '../../components/RaysBackground.vue'
import AccountMenu from '../../components/app/AccountMenu.vue'
import ActionModal from '../../components/app/ActionModal.vue'
import AppFooter from '../../components/app/AppFooter.vue'
import ConnectModal from '../../components/app/ConnectModal.vue'
import TopUpModal from '../../components/app/TopUpModal.vue'
import { useBalances } from '../../composables/useBalances'
import { usePriceFeed } from '../../composables/usePriceFeed'
import { usePrivateAccount } from '../../composables/usePrivateAccount'
import { useWallet } from '../../composables/useWallet'
import { BRIDGE_DESTINATIONS, CHAINS, defaultBridgeDestination, getAsset, getChain } from '../../data/chains'
import {
  formatAmount,
  formatUsd,
  isValidAddress,
  parseAmount,
  randomBetween,
  randomHex,
  shortAddress,
  shortAddressTight,
  wait,
} from '../../utils/format'

const tabs = ['Send Privately', 'Swap', 'Private bridge']
const TAB_BY_QUERY = { send: 0, swap: 1, bridge: 2 }

const route = useRoute()
const wallet = useWallet()
wallet.init()

const { address, chainId, chains, connected, connectingId, error: walletError, walletKind, wallets } = wallet
const account = usePrivateAccount()
const balances = useBalances(wallet)
const prices = usePriceFeed()

const activeTab = ref(TAB_BY_QUERY[route.query.tab] ?? 0)
const chainMenuOpen = ref(false)
const accountOpen = ref(false)
const connectOpen = ref(false)
const topUpOpen = ref(false)
const bridgeMenuOpen = ref(false)
const slippageOpen = ref(false)

const activeChain = computed(() => getChain(chainId.value))
const chainAssets = computed(() => activeChain.value.assets.map(getAsset))
const activeSymbol = ref(activeChain.value.assets[0])
const activeAsset = computed(() => getAsset(activeSymbol.value))

const rawInput = ref('')
const usdMode = ref(false)
const recipient = ref('')
const recipient2 = ref('')
const showSecondRecipient = ref(false)

const bridgeTarget = ref(defaultBridgeDestination(chainId.value))
const bridgeSymbol = ref(bridgeTarget.value.assets[0])
const bridgeAsset = computed(() => getAsset(bridgeSymbol.value))
const bridgeOptions = computed(() => BRIDGE_DESTINATIONS.filter((destination) => destination.chainId !== activeChain.value.id))

const slippage = ref('smart')
const slippageOptions = [
  { value: 'smart', label: 'Smart slippage' },
  { value: 0.5, label: '0.5%' },
  { value: 1, label: '1%' },
  { value: 2, label: '2%' },
]
const slippageLabel = computed(() => (slippage.value === 'smart' ? 'Smart slippage' : `${slippage.value}%`))

const toasts = ref([])
let toastId = 0
function toast(message, type = 'info') {
  const id = ++toastId
  toasts.value.push({ id, message, type })
  setTimeout(() => {
    toasts.value = toasts.value.filter((item) => item.id !== id)
  }, 3800)
}

function priceOf(symbol) {
  if (symbol === 'ETH') return prices.eth.value
  if (symbol === 'BNB') return prices.bnb.value
  return 1
}

const entered = computed(() => parseAmount(rawInput.value))
const assetAmount = computed(() => {
  if (!entered.value) return 0
  return usdMode.value ? entered.value / priceOf(activeSymbol.value) : entered.value
})
const usdValue = computed(() => assetAmount.value * priceOf(activeSymbol.value))

const conversion = computed(() => {
  if (!entered.value) return '$0'
  if (usdMode.value) return `${formatAmount(assetAmount.value)} ${activeSymbol.value}`
  return formatUsd(usdValue.value)
})

const privateBalance = computed(() => account.balance(chainId.value, activeSymbol.value))
const privateUtxos = computed(() => account.utxos(chainId.value, activeSymbol.value))
const walletBalance = computed(() => {
  const base = Number(balances.balances.value[activeSymbol.value] || 0)
  return Math.max(0, base - account.spent(chainId.value, activeSymbol.value))
})

const swapTarget = computed(() => {
  const list = chainAssets.value
  const stable = list.find((item) => item.stable) || list[0]
  const native = list.find((item) => item.native) || list[0]
  return activeAsset.value.stable ? native : stable
})

const swapNet = computed(() => {
  const percent = slippage.value === 'smart' ? 0.5 : Number(slippage.value)
  return 1 - 0.003 - percent / 100
})

const bridgeRate = computed(() => (priceOf(activeSymbol.value) * (1 - 0.004)) / priceOf(bridgeAsset.value.symbol))
const insufficient = computed(() => assetAmount.value > 0 && assetAmount.value > privateBalance.value)

const recipientsValid = computed(() => {
  if (!isValidAddress(recipient.value)) return false
  if (showSecondRecipient.value && recipient2.value.trim() && !isValidAddress(recipient2.value)) return false
  return true
})

const canSubmit = computed(() => {
  if (!connected.value) return true
  if (assetAmount.value <= 0) return false
  if (insufficient.value) return false
  if (activeTab.value === 0) return recipientsValid.value
  if (activeTab.value === 1) return true
  return isValidAddress(recipient.value) && bridgeTarget.value.chainId !== activeChain.value.id
})

const actionLabel = computed(() => {
  if (activeTab.value === 0) return 'Send Privately'
  if (activeTab.value === 1) return `Swap to private ${swapTarget.value.symbol}`
  return 'Private bridge'
})

function assetTabStyle(option) {
  const on = option.symbol === activeSymbol.value
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    padding: '5px 12px',
    borderRadius: 'var(--radius-pill)',
    background: on ? 'var(--color-primary)' : 'transparent',
    color: on ? 'var(--color-on-primary)' : 'var(--color-muted)',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    transition: 'background .2s ease, color .2s ease',
  }
}

function sanitizeAmount() {
  rawInput.value = rawInput.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
}

function toggleUsdMode() {
  const value = entered.value
  if (value > 0) {
    if (usdMode.value) rawInput.value = String(Number((value * priceOf(activeSymbol.value)).toFixed(6)))
    else rawInput.value = String(Number((value / priceOf(activeSymbol.value)).toFixed(6)))
  }
  usdMode.value = !usdMode.value
}

function useMax() {
  const max = privateBalance.value
  if (!max) return
  rawInput.value = String(Number((usdMode.value ? max * priceOf(activeSymbol.value) : max).toFixed(6)))
}

function resetInputs() {
  rawInput.value = ''
  usdMode.value = false
  recipient.value = ''
  recipient2.value = ''
  showSecondRecipient.value = false
}

function selectAsset(symbol) {
  if (!chainAssets.value.some((item) => item.symbol === symbol)) return
  activeSymbol.value = symbol
  rawInput.value = ''
  usdMode.value = false
  bridgeMenuOpen.value = false
}

function cycleAsset() {
  const list = chainAssets.value
  const index = list.findIndex((item) => item.symbol === activeSymbol.value)
  selectAsset(list[(index + 1) % list.length].symbol)
}

function setTab(index) {
  activeTab.value = index
  rawInput.value = ''
  usdMode.value = false
}

function toggleSecondRecipient() {
  if (!showSecondRecipient.value) {
    showSecondRecipient.value = true
    return
  }
  showSecondRecipient.value = false
  recipient2.value = ''
}

function setSlippage(value) {
  slippage.value = value
  slippageOpen.value = false
}

function chooseChain(chain) {
  wallet.selectChain(chain)
  chainMenuOpen.value = false
}

function chooseBridgeDestination(destination) {
  bridgeTarget.value = destination
  bridgeSymbol.value = destination.assets[0]
  bridgeMenuOpen.value = false
}

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

function onDisconnect() {
  wallet.disconnect()
  accountOpen.value = false
  toast('Wallet disconnected')
}

const topUpStage = ref('form')
const topUpAmount = ref(0)
const topUpHash = ref('')

function openTopUp() {
  if (!address.value) {
    openConnect()
    return
  }
  topUpStage.value = 'form'
  topUpAmount.value = 0
  topUpHash.value = ''
  topUpOpen.value = true
}

function closeTopUp() {
  topUpOpen.value = false
  topUpStage.value = 'form'
  topUpHash.value = ''
}

async function deposit(value) {
  if (!value || value <= 0) return
  topUpAmount.value = value
  topUpStage.value = 'proving'
  await wait(randomBetween(1500, 2100))
  topUpStage.value = 'confirming'
  const hash = randomHex(32)
  await wait(randomBetween(1100, 1600))
  topUpHash.value = hash
  account.deposit(chainId.value, activeSymbol.value, value)
  topUpStage.value = 'done'
  toast(`${formatAmount(value)} ${activeSymbol.value} added to your private balance`)
}

const flow = ref(null)

function makeFlow(kind) {
  const copy = {
    send: {
      title: 'Sending privately',
      subtitle: 'Your browser builds the proof; the relayer submits it and pays the gas.',
      doneTitle: 'Payment delivered',
      steps: ['Building proof on this device', 'Submitting to the relayer', 'Delivering to the recipient'],
    },
    swap: {
      title: 'Swapping privately',
      subtitle: 'A one-time burner trades at the public price, then the result is re-shielded.',
      doneTitle: 'Swap complete',
      steps: ['Building proof on this device', 'Funding a one-time burner', 'Swapping on Uniswap V3', 'Re-shielding the result'],
    },
    bridge: {
      title: 'Bridging privately',
      subtitle: 'NEAR Intents quotes the route and a solver delivers on the destination chain.',
      doneTitle: 'Bridge delivered',
      steps: ['Building proof on this device', 'Requesting a 1Click quote', 'Funding the solver deposit', 'Delivering on the destination'],
    },
  }[kind]
  return reactive({
    kind,
    title: copy.title,
    subtitle: copy.subtitle,
    doneTitle: copy.doneTitle,
    steps: copy.steps.map((label, index) => ({ label, state: index === 0 ? 'active' : 'pending' })),
    progress: 6,
    done: false,
    summary: '',
    hash: '',
    error: '',
  })
}

async function runFlow(kind, amount) {
  const current = makeFlow(kind)
  flow.value = current
  const hash = randomHex(32)
  for (let index = 0; index < current.steps.length; index += 1) {
    current.steps[index].state = 'active'
    await wait(index === 0 ? randomBetween(1450, 2100) : randomBetween(850, 1350))
    current.steps[index].state = 'done'
    current.progress = Math.round(((index + 1) / current.steps.length) * 100)
    if (index + 1 < current.steps.length) current.steps[index + 1].state = 'pending'
  }
  await wait(450)
  current.hash = hash

  if (kind === 'send') {
    const recipients = [recipient.value.trim()]
    if (showSecondRecipient.value && recipient2.value.trim()) recipients.push(recipient2.value.trim())
    account.send(chainId.value, activeSymbol.value, amount, recipients)
    current.summary =
      recipients.length > 1
        ? `${formatAmount(amount)} ${activeSymbol.value} sent to ${recipients.length} recipients.`
        : `${formatAmount(amount)} ${activeSymbol.value} sent to ${shortAddress(recipients[0])}.`
    current.doneTitle = 'Payment delivered'
  }

  if (kind === 'swap') {
    const received = (amount * priceOf(activeSymbol.value) * swapNet.value) / priceOf(swapTarget.value.symbol)
    account.swap(chainId.value, activeSymbol.value, swapTarget.value.symbol, amount, received)
    current.summary = `${formatAmount(amount)} ${activeSymbol.value} swapped for ${formatAmount(received)} ${swapTarget.value.symbol}.`
    current.doneTitle = 'Swap complete'
  }

  if (kind === 'bridge') {
    const received = amount * bridgeRate.value
    const target = bridgeTarget.value
    const targetPool = CHAINS.some((chain) => chain.id === target.chainId)
    account.bridge({
      id: hash.slice(2, 12),
      fromChainId: chainId.value,
      fromSymbol: activeSymbol.value,
      toChainId: targetPool ? target.chainId : null,
      toSymbol: bridgeAsset.value.symbol,
      toLabel: target.label,
      amount,
      received,
      to: recipient.value.trim(),
      hash,
      time: Date.now(),
      status: 'delivered',
    })
    current.summary = `${formatAmount(amount)} ${activeSymbol.value} bridged · ${formatAmount(received)} ${bridgeAsset.value.symbol} delivered on ${target.label}.`
    current.doneTitle = 'Bridge delivered'
  }

  current.done = true
}

function closeFlow() {
  flow.value = null
  resetInputs()
}

async function onPrimary() {
  if (!connected.value) {
    openConnect()
    return
  }
  if (!canSubmit.value) {
    if (insufficient.value) toast('Insufficient private balance', 'error')
    else if (activeTab.value === 0 || activeTab.value === 2) toast('Enter a valid recipient address', 'error')
    else toast('Enter an amount', 'error')
    return
  }
  const kind = activeTab.value === 0 ? 'send' : activeTab.value === 1 ? 'swap' : 'bridge'
  await runFlow(kind, assetAmount.value)
}

watch(
  address,
  (value) => {
    account.load(value)
    if (value) connectOpen.value = false
  },
  { immediate: true },
)

watch(chainId, () => {
  const chain = getChain(chainId.value)
  if (!chain.assets.includes(activeSymbol.value)) activeSymbol.value = chain.assets[0]
  bridgeTarget.value = defaultBridgeDestination(chainId.value)
  bridgeSymbol.value = bridgeTarget.value.assets[0]
  resetInputs()
})

watch(
  () => route.query.tab,
  (tab) => {
    const index = TAB_BY_QUERY[tab]
    if (index !== undefined) activeTab.value = index
  },
)

function onDocumentPointerDown(event) {
  const target = event.target
  if (!(target instanceof Element)) return
  if (chainMenuOpen.value && !target.closest('.bp-chain-wrap')) chainMenuOpen.value = false
  if (accountOpen.value && !target.closest('.bp-account-wrap') && !target.closest('.bp-account-menu')) accountOpen.value = false
  if (bridgeMenuOpen.value && !target.closest('.bp-bridge-asset')) bridgeMenuOpen.value = false
  if (slippageOpen.value && !target.closest('.bp-slippage')) slippageOpen.value = false
}

function onKey(event) {
  if (event.key !== 'Escape') return
  chainMenuOpen.value = false
  accountOpen.value = false
  bridgeMenuOpen.value = false
  slippageOpen.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
  document.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  document.removeEventListener('keydown', onKey)
})
</script>

<style src="../../styles/app.css"></style>
