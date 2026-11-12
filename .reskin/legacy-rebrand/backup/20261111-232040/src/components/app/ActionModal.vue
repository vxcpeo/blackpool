<template>
  <Teleport to="body">
    <div class="bp-overlay" @click.self="onBackdrop">
      <div class="bp-modal" role="dialog" aria-modal="true" :aria-label="flow.done ? flow.doneTitle : flow.title">
        <div class="bp-modal-head">
          <div class="bp-modal-title">{{ flow.done ? flow.doneTitle : flow.title }}</div>
          <button v-if="flow.done" type="button" class="bp-close" aria-label="Close" @click="$emit('close')">✕</button>
        </div>

        <template v-if="!flow.done">
          <p class="bp-sub">{{ flow.subtitle }}</p>
          <div class="bp-steps">
            <div v-for="(step, index) in flow.steps" :key="index" class="bp-step" :class="step.state">
              <span class="bp-step-dot">
                <svg v-if="step.state === 'done'" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                <span v-else-if="step.state === 'active'" class="bp-spin" style="width: 10px; height: 10px; border-width: 1.5px"></span>
              </span>
              <span>{{ step.label }}</span>
            </div>
          </div>
          <div class="bp-progress"><i :style="{ width: `${flow.progress}%` }"></i></div>
        </template>

        <template v-else>
          <div class="bp-success">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
            <div>
              <div>{{ flow.summary }}</div>
              <div v-if="flow.hash" class="bp-hash">tx {{ flow.hash }}</div>
            </div>
          </div>
          <button type="button" class="btn btn-primary" style="width: 100%; margin-top: 14px" @click="$emit('close')">Done</button>
        </template>

        <p v-if="flow.error" class="bp-error">{{ flow.error }}</p>
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
