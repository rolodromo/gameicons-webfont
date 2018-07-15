import Vue from 'vue'
import Vuetify from 'vuetify'
import VueClipboard from 'vue-clipboard2'

import store from './store'
import App from './App'

import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueClipboard)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
