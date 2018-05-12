import Vue from 'vue'
import Vuebar from 'vuebar'
import axios from 'axios'
import VueAuthenticate from 'vue-authenticate'
import { CookieStorage } from 'cookie-storage'
import App from './App'
import router from './router'
import './style.styl'

window.cookieStorage = new CookieStorage()
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(Vuebar)
Vue.use(VueAuthenticate, {
  baseUrl: 'https://dust.giftchain.org/api/',
  tokenType: 'No Auth',
  tokenHeader: 'X-Auth-Token',
  providers: {
    github: {
      clientId: process.env.GH_CLIENT_ID,
      redirect_uri: 'http://localhost:8080'
    },
    facebook: {
      clientId: '',
      redirect_uri: 'http://localhost:8080'
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

