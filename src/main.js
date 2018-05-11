import Vue from 'vue'
import { CookieStorage } from 'cookie-storage'
import App from './App'
import router from './router'
import Vuebar from 'vuebar'
import './style.styl'

window.cookieStorage = new CookieStorage()
Vue.config.productionTip = false
Vue.use(Vuebar)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

