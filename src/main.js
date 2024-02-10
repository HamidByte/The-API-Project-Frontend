import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as stores from './stores/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Register stores globally
Object.keys(stores).forEach((storeName) => {
  app.config.globalProperties[`$${storeName}`] = stores[storeName]()
})

app.mount('#app')
