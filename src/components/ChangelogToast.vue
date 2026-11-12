
<template>
  <div class="toy-toast" role="status" :data-show="shown ? '' : null" :data-hide="hidden ? '' : null">
    <button type="button" class="leaf-x" aria-label="Dismiss" @click="dismiss">✕</button><a href="/changelog">See new features from Agpool<span>View changelog ›</span></a>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const shown = ref(false)
const hidden = ref(false)
let timer

function dismiss() {
  hidden.value = true
}

onMounted(() => {
  timer = setTimeout(() => (shown.value = true), 1400)
})

onBeforeUnmount(() => clearTimeout(timer))
</script>
