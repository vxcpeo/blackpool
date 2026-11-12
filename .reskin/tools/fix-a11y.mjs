import fs from 'node:fs';

const main = `import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './styles/toybox/base.css'
import './styles/toybox/home.css'
import './styles/toybox/pages.css'
import './styles/toybox/polish.css'

createApp(App).use(router).mount('#app')
`;
fs.writeFileSync('src/main.js', main, 'utf8');

const notFound = `<template>
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
`;
fs.writeFileSync('src/views/NotFoundView.vue', notFound, 'utf8');

const appFile = 'src/views/pages/AppView.vue';
let app = fs.readFileSync(appFile, 'utf8');
const additions = [
  ['<input v-model="rawInput" class="cash-input" placeholder="0.00"', '<input v-model="rawInput" class="cash-input" aria-label="Private amount" placeholder="0.00"'],
  ['<input v-model="recipient" spellcheck="false" class="entry" placeholder="Recipient address" />', '<input v-model="recipient" spellcheck="false" class="entry" aria-label="Recipient address" placeholder="Recipient address" />'],
  ['<input v-model="recipient2" spellcheck="false" class="entry" placeholder="Second recipient address" />', '<input v-model="recipient2" spellcheck="false" class="entry" aria-label="Second recipient address" placeholder="Second recipient address" />'],
  ['<input v-model="recipient" spellcheck="false" class="entry" :placeholder="`Recipient ${bridgeTarget.label} address`" />', '<input v-model="recipient" spellcheck="false" class="entry" aria-label="Bridge recipient address" :placeholder="`Recipient ${bridgeTarget.label} address`" />'],
];
for (const [from, to] of additions) {
  if (!app.includes(from)) console.log('MISS input', from.slice(0, 60));
  app = app.replace(from, to);
}
fs.writeFileSync(appFile, app, 'utf8');
console.log('patched');
