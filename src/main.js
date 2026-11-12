import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './styles/toybox/base.css'
import './styles/toybox/home.css'
import './styles/toybox/pages.css'
import './styles/toybox/polish.css'

createApp(App).use(router).mount('#app')
