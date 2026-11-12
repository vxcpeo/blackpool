
<template>
  <nav class="dock-bar toy-dock" :data-scrolled="scrolled ? '' : null" :data-open="mobileOpen ? '' : null">
    <div class="toy-track toy-nav-in">
      <a class="toy-brand" href="/"><BrandMark :size="26" class="toy-mark-img" />Agpool</a>
      <div class="dock-links">
        <div ref="dropdown" class="toy-menu" :data-open="productOpen ? '' : null">
          <button
            ref="dropdownButton"
            type="button"
            class="toy-menu-btn"
            :aria-expanded="String(productOpen)"
            aria-controls="nav-product-menu"
            @click="productOpen = !productOpen"
          >
            Product<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.75l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </button>
          <div id="nav-product-menu" class="toy-menu-board" role="menu" :hidden="!productOpen">
            <div class="toy-menu-cols">
              <div v-for="group in navGroups" :key="group.title" class="toy-menu-col">
                <div class="toy-menu-h">{{ group.title }}</div>
                <a
                  v-for="item in group.items"
                  :key="item.title"
                  class="toy-menu-item"
                  role="menuitem"
                  :href="item.href"
                  @click="productOpen = false"
                ><NavIcon :k="item.icon" :color="item.color" :size="17" /><span><b>{{ item.title }}</b><small>{{ item.description }}</small></span></a>
              </div>
            </div>
            <div class="toy-menu-foot">
              <a href="#product" @click="productOpen = false">See it in action</a><a class="toy-menu-go" href="/app" @click="productOpen = false">Launch app <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
        <a v-for="link in navLinks" :key="link.label" :href="link.href">{{ link.label }}</a>
      </div>
      <div class="toy-nav-tools">
        <a class="toy-btn solid" href="/app">Launch app</a>
        <button type="button" class="toy-menu-btn" aria-label="Menu" :aria-expanded="String(mobileOpen)" @click="mobileOpen = !mobileOpen"><i></i><i></i></button>
      </div>
    </div>
    <div class="toy-drawer">
      <details class="toy-menu-m">
        <summary>Product<svg width="12" height="12" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.75l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></summary>
        <div v-for="group in navGroups" :key="group.title" class="toy-menu-mg">
          <div class="toy-menu-h">{{ group.title }}</div>
          <a v-for="item in group.items" :key="item.title" class="toy-menu-mi" :href="item.href" @click="closeMobile"><NavIcon :k="item.icon" :color="item.color" :size="15" /><span>{{ item.title }}</span></a>
        </div>
      </details>
      <a v-for="link in navLinks" :key="link.label" :href="link.href" @click="closeMobile">{{ link.label }}</a>
      <a class="toy-btn solid big" href="/app" @click="closeMobile">Launch app</a>
    </div>
  </nav>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BrandMark from './BrandMark.vue'
import NavIcon from './NavIcon.vue'
import { navGroups, navLinks } from '../data/nav'

const route = useRoute()
const dropdown = ref(null)
const dropdownButton = ref(null)
const productOpen = ref(false)
const mobileOpen = ref(false)
const scrolled = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}

const onPointerDown = (event) => {
  if (!productOpen.value) return
  if (dropdown.value && !dropdown.value.contains(event.target)) productOpen.value = false
}

const onKeyDown = (event) => {
  if (event.key !== 'Escape') return
  if (!productOpen.value && !mobileOpen.value) return
  productOpen.value = false
  mobileOpen.value = false
  dropdownButton.value?.focus()
}

const closeMobile = () => {
  mobileOpen.value = false
}

watch(
  () => route.fullPath,
  () => {
    productOpen.value = false
    mobileOpen.value = false
  },
)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKeyDown)
})
</script>
