import './assets/main.css'

import { createApp } from 'vue'
import Home from './Home.vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import store from './store/store'
import CustomTailwind from './tailwind-custom';
import router from './routes'

let app = createApp(Home)
    .use(router)
    .use(PrimeVue, { pt: CustomTailwind })
    .use(store)
    .use(ToastService)
    .mount('#app');
