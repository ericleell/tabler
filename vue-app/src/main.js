import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* Tabler core CSS */
import '../../core/dist/css/tabler.css'

/* ExtJS Classic theme overrides */
import './assets/extjs-classic.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
