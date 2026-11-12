<template>
  <main class="lost-page"><div class="play-stage"><div class="play-inner">
    <div>
      <h1 class="lost-big">404</h1>
      <div><h2 class="lost-line">This page could not be found.</h2></div>
      <nav class="lost-links" aria-label="Ways back">
        <a href="/" aria-label="Agpool home">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5"></path><path d="M5.5 10v9h13v-9"></path><path d="M10 19v-5h4v5"></path></svg>
        </a>
        <a href="/app" aria-label="Launch the Agpool app">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13"></path><path d="M13 6l6 6-6 6"></path></svg>
        </a>
      </nav>
    </div>
  </div></div></main>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

onMounted(() => document.body.classList.add('lost-body'))
onBeforeUnmount(() => document.body.classList.remove('lost-body'))
</script>
