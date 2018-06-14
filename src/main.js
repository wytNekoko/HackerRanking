import Vue from 'vue'
import Vuebar from 'vuebar'
import axios from 'axios'
// import VueAuthenticate from 'vue-authenticate'
import { CookieStorage } from 'cookie-storage'
import App from './App'
import router from './router'
import './style.styl'
import web3 from './web3'

window.cookieStorage = new CookieStorage()
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(Vuebar)
Vue.use(web3)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

