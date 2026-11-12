import fs from 'node:fs';

let css = fs.readFileSync('src/styles/toybox/pages.css', 'utf8');
css = css
  .replace(/var\(--radius-l, 26px\)/g, 'var(--round-lg)')
  .replace(/var\(--radius-xl, 36px\)/g, 'var(--round-xl)')
  .replace(/var\(--radius-m, 18px\)/g, 'var(--round-md)')
  .replace(/var\(--radius-l, 26px\)/g, 'var(--round-lg)')
  .replace(/var\(--radius-m\)/g, 'var(--round-md)');
fs.writeFileSync('src/styles/toybox/pages.css', css, 'utf8');

const main = `import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './styles/toybox/base.css'
import './styles/toybox/home.css'
import './styles/toybox/pages.css'

createApp(App).use(router).mount('#app')
`;
fs.writeFileSync('src/main.js', main, 'utf8');

for (const file of ['src/styles/toybox/base.css', 'src/styles/toybox/home.css', 'src/styles/toybox/pages.css']) {
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(/--radius-/g, '--round-');
  fs.writeFileSync(file, text, 'utf8');
}
console.log('css tokens normalised');
