<template>
  <Teleport to="body">
    <div class="pop-overlay" @click.self="onBackdrop">
      <div class="pop-modal" role="dialog" aria-modal="true" :aria-label="flow.done ? flow.doneTitle : flow.title">
        <div class="pop-modal-head">
          <div class="pop-modal-title">{{ flow.done ? flow.doneTitle : flow.title }}</div>
          <button v-if="flow.done" type="button" class="pop-close" aria-label="Close" @click="$emit('close')">✕</button>
        </div>

        <template v-if="!flow.done">
          <p class="pop-sub">{{ flow.subtitle }}</p>
          <div class="pop-steps">
            <div v-for="(step, index) in flow.steps" :key="index" class="pop-step" :class="step.state">
              <span class="pop-step-dot">
                <svg v-if="step.state === 'done'" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                <span v-else-if="step.state === 'active'" class="pop-spin"></span>
              </span>
              <span>{{ step.label }}</span>
            </div>
          </div>
          <div class="pop-progress"><i :style="{ width: `${flow.progress}%` }"></i></div>
        </template>

        <template v-else>
          <div class="pop-success">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
            <div>
              <div>{{ flow.summary }}</div>
              <div v-if="flow.hash" class="pop-hash">tx {{ flow.hash }}</div>
            </div>
          </div>
          <button type="button" class="push push-fill" @click="$emit('close')">Done</button>
        </template>

        <p v-if="flow.error" class="pop-error">{{ flow.error }}</p>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

const props = defineProps({
  flow: { type: Object, required: true },
})

const emit = defineEmits(['close'])

const onBackdrop = () => {
  if (props.flow.done) emit('close')
}

const onKey = (event) => {
  if (event.key === 'Escape' && props.flow.done) emit('close')
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
