import { createApp } from 'vue'
import App from './App.vue'
import 'alga-css/dist/alga.min.css'
import router from './router'

console.log(router);

createApp(App).use(router).mount('#app')
