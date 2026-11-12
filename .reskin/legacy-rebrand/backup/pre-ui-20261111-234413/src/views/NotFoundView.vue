<!-- The production site falls back to the framework's plain 404, reproduced here. -->
<template>
  <div class="next-404-page">
    <div>
      <h1 class="next-404-h1">404</h1>
      <div style="display: inline-block"><h2 class="next-404-h2">This page could not be found.</h2></div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

onMounted(() => document.body.classList.add('next-404'))
onBeforeUnmount(() => document.body.classList.remove('next-404'))
</script>

<style>
body.next-404 {
  margin: 0;
  color: #000;
  background: #fff;
  background-image: none;
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
}

.next-404-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.next-404-h1 {
  display: inline-block;
  margin: 0 20px 0 0;
  padding: 0 23px 0 0;
  font-size: 24px;
  font-weight: 500;
  vertical-align: top;
  line-height: 49px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
}

.next-404-h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 49px;
}

@media (prefers-color-scheme: dark) {
  body.next-404 {
    color: #fff;
    background: #000;
  }

  .next-404-h1 {
    border-right-color: rgba(255, 255, 255, 0.3);
  }
}
</style>
