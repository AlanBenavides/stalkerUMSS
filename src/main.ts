import Vue from 'vue'
import router from './router'
import store from './Store/index'

import App from './App.vue'

Vue.config.productionTip = true

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')
