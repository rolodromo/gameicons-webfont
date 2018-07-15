import Vue from 'vue'
import Vuetify from 'vuetify'
import VueClipboard from 'vue-clipboard2'

import store from './store'
import App from './App'

import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'
import 'vue-awesome/icons/github'

import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueClipboard)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
