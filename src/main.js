import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import { authService } from './firebase/config'

let app

authService.onAuthStateChanged(() => {
  if(!app){
    app = createApp(App).use(router).mount('#app')
  }
})