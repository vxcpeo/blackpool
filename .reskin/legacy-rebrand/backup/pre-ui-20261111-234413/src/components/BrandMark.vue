<!-- The Agpool mark: a rounded tile masked with the brand glyph. -->
<template>
  <svg viewBox="0 0 100 100" :width="size" :height="size" aria-hidden="true"><defs><mask id="bp-mark-mask"><rect width="100" height="100" fill="#fff"></rect><path d="M50 20 L74 78 L61.5 78 L57 66 L43 66 L38.5 78 L26 78 Z M50 41 L53.5 58 L46.5 58 Z" fill="#000" fill-rule="evenodd"></path></mask></defs><rect width="100" height="100" rx="12" fill="currentColor" mask="url(#bp-mark-mask)"></rect></svg>
</template>

<script setup>
defineProps({
  size: { type: Number, default: 26 },
})
</script>
