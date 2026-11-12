<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { useCopyControls } from './composables/useCopyControls'
import { useLinkInterception } from './composables/useLinkInterception'

useLinkInterception()
useCopyControls()
</script>
