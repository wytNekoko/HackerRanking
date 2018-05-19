<template>
  <div id="app">
    <transition name="fade">
      <router-view @view="view" @update="update" @notify="notify"/>
    </transition>
    <fringe></fringe>
    <div class="mask" v-if="registerIsOpen">
      <div class="register-card">
        <span class="close" @click="closeRegister">
          <span></span><span></span>
        </span>
        <ul>
          <li>
            <h2>Signed Resident:</h2>
            <div class="button" @click="login">Login with Cryptoname</div>
            <div class="button" @click="login_auth('github')">Login with Github</div>
            <!--<div class="button" @click="login_auth('facebook')">Login with Facebook</div>-->
          </li>
          <li>
            <h2>New Resident:</h2>
            <div class="button" @click="register">Sign up with Email</div>
            <div class="button" @click="register_auth('github')">Sign up with Github</div>
            <!--<div class="button" @click="register_auth('facebook')">Sign up with Facebook</div>-->
          </li>
        </ul>
      </div>
    </div>
    <div class="hint" v-if="showHint">You can get 10 Gift today</div>
    <user-bar v-if="user" :username="user.name" :id="user.id"></user-bar>
    <settle-bar v-else @register="openRegister"></settle-bar>
    <receiving-station :notifications="notifications"></receiving-station>

  </div>
</template>

<script>
import api from '@/api'
import OAuthPopup from './utils/popup'
import Fringe from './components/commons/Fringe'
import SettleBar from './components/commons/SettleBar'
import UserBar from './components/commons/UserBar'
import ToolBar from './components/commons/ToolBar'
import HunterBar from './components/commons/HunterBar'
import ReceivingStation from './components/commons/ReceivingStation'

export default {
  components: {
    UserBar,
    Fringe,
    SettleBar,
    ToolBar,
    HunterBar,
    ReceivingStation },
  name: 'App',
  data () {
    return {
      user: null,
      registerIsOpen: false,
      git_state: '',
      redirect_uri: 'https://dust.dorahacks.com/',
      notifications: [],
      showHint: true
    }
  },
  created () {
    if (window.cookieStorage.getItem('token')) {
      this.user = {
        name: window.cookieStorage.getItem('name'),
        id: window.cookieStorage.getItem('id')
      }
    }
    this.notify()
  },
  methods: {
    makestate () {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (let i = 0; i < 10; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text;
    },
    login () {
      this.closeRegister()
      this.$router.push('/login')
    },
    register () {
      this.closeRegister()
      this.$router.push('/register')
    },
    login_auth (provider) {
      const url = 'https://github.com/login/oauth/authorize?client_id=&scope=user'
      const popupOptions = { width: 1020, height: 618 }
      const redirect = this.redirect_uri
      this.oauthPopup = new OAuthPopup(url, provider, popupOptions)
      this.oauthPopup.open(redirect, false).then((res) => {
        api.login_auth(res.code).then((response) => {
          const dd = response.data
          if (dd.errcode) {
            alert(dd.errmsg)
            return
          }
          this.registerIsOpen = false
          this.update(dd)
        })
      })
    },
    register_auth (provider) {
      const url = 'https://github.com/login/oauth/authorize?client_id=&scope=user'
      const popupOptions = { width: 1020, height: 618 }
      const redirect = this.redirect_uri
      this.oauthPopup = new OAuthPopup(url, provider, popupOptions)
      this.oauthPopup.open(redirect, false).then((res) => {
        api.register_auth_git(res.code).then((response) => {
          const dd = response.data
          if (dd.errcode) {
            alert(dd.errmsg)
            return
          }
          this.registerIsOpen = false
          this.update(dd)
        })
      })
    },
    view (item) {
      this.$router.push({ name: 'PlanetView', query: { name: item } })
    },
    notify () {
      api.notification().then((res) => {
        const d = res.data
        this.notifications = d
      })
    },
    openRegister () {
      this.registerIsOpen = true
    },
    closeRegister () {
      this.registerIsOpen = false
    },
    update (data) {
      const d = new Date()
      if (data) {
        this.$router.push('/')
        d.setSeconds(d.getSeconds() + data.expires_in)
        this.user = {
          name: data.user_info.username,
          id: data.user_info.id
        }
        window.cookieStorage.setItem('token', data.auth_token, {expires: d})
        window.cookieStorage.setItem('name', data.user_info.username, {expires: d})
        window.cookieStorage.setItem('id', data.user_info.id, {expires: d})
        this.notify()
      } else {
        this.$router.push('/')
        this.user = null
        window.cookieStorage.setItem('token', 'anyValue', {expires: d})
        window.cookieStorage.setItem('name', 'anyValue', {expires: d})
        window.cookieStorage.setItem('id', 'anyValue', {expires: d})
        this.notifications = []
      }
    },
  }
}

</script>

<style lang="stylus" scoped>
@font-face
  font-family: "Allerta-Stencil";
  src: url("./assets/allerta_stencil.ttf")
@font-face
  font-family: "Ubuntu-Medium";
  src: url("./assets/Ubuntu-M.ttf")
@font-face
  font-family "Ubuntu"
  src: url("./assets/Ubuntu-R.ttf")

#app
  width 100vw
  height 100vh
  overflow hidden
  background-color rgba(0,0,0,0.95)
  position relative
  font-family 'Ubuntu'
  .hint
    position absolute
    top 80%
    left 40%
    width 250px
    height 50px
    border-radius 20px
    background-color rgba(255,255,255,1)
    color black
    text-align center
    line-height 3
    font-family Ubuntu-Medium
.fade-enter-active, .fade-leave-active
  transition opacity 1s
.fade-enter, .fade-leave-to
  opacity 0

.mask
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  background-color #000A
  z-index 80
.register-card
  color #fff
  position absolute
  top 45%
  left 50%
  transform translate3d(-50%, -50%, 0)
  h2
    font-size 20px
    font-weight 400
    display block
    width 420px
    margin auto
  li
    width 540px
    height 240px
    border solid 1px #fff4
    border-radius 6px
    margin 10px auto
    padding 25px
    box-sizing border-box
    background-image linear-gradient(left, #301B0F, #1E0618)
    &:first-child
      background-image linear-gradient(left, #2E2828, #000000)
//    &:last-child
//      background-color linear-gradient(left, #301B0F, #1E0618)
  .button
    width 420px
    height 60px
    line-height 60px
    text-align center
    border solid 1px #fff
    border-radius 6px
    margin 20px auto
    cursor pointer
  .close
    position absolute
    right -50px
    top 10px
    width 40px
    height 40px
    border solid 1px #fff4
    border-radius 6px
    background-image linear-gradient(left, #2E2828, #000000)
    cursor pointer
    span
      width 20px
      height 1px
      background-color #fff
      display block
      position absolute
      top 50%
      left 50%
      &:first-child
        transform translate3d(-50%, -50%, 0) rotate(-45deg)
      &:last-child
        transform translate3d(-50%, -50%, 0) rotate(45deg)

</style>
