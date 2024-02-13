import './assets/main.css'
import 'v-calendar/style.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
// import * as stores from './stores'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// Register stores globally
// Object.keys(stores).forEach((storeName) => {
//   app.config.globalProperties[`$${storeName}`] = stores[storeName]()
// })

app.use(router)

app.mount('#app')
