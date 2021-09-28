import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const app = createApp(App)
app.use(router)

app.directive('focus', {
    mounted(el) {
        el.focus()
    },
})

app.mount('#app')
