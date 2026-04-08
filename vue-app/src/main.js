import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* Tabler core CSS */
import '../../core/dist/css/tabler.css'

/* Theme CSS files */
import './assets/themes/classic.css'
import './assets/themes/neptune.css'
import './assets/themes/triton.css'
import './assets/themes/aria.css'

/* ExtJS Classic theme overrides (base component styles) */
import './assets/extjs-classic.css'

/* Initialize theme store (applies saved theme on load) */
import './store/theme.js'

const app = createApp(App)
app.use(router)
app.mount('#app')
