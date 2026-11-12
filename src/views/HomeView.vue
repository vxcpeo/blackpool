<template>
  <main ref="root" class="playground"><div class="play-stage"><div class="play-inner">
    <div class="toy-confetti" aria-hidden="true"></div>
<div class="toy-track">
      <HeroSection />
      <ProductWindow />
      <BentoSection />
      <UseCasesSection />
      <PrinciplesSection />
      <AgentsSection />
      <FaqSection />
      <CtaSection />
      <ChangelogToast />
      <SiteFooter />
      <SiteNav />
    </div>
  </div></div></main>
</template>

<script setup>
import { ref } from 'vue'
import SiteNav from '../components/SiteNav.vue'
import HeroSection from '../components/HeroSection.vue'
import ProductWindow from '../components/ProductWindow.vue'
import BentoSection from '../components/BentoSection.vue'
import UseCasesSection from '../components/UseCasesSection.vue'
import PrinciplesSection from '../components/PrinciplesSection.vue'
import AgentsSection from '../components/AgentsSection.vue'
import FaqSection from '../components/FaqSection.vue'
import CtaSection from '../components/CtaSection.vue'
import ChangelogToast from '../components/ChangelogToast.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { useLandingEffects } from '../composables/useLandingEffects'

const root = ref(null)
useLandingEffects(root)
</script>
