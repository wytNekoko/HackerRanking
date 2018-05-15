<template>
  <div id="app">
    <transition name="fade">
      <router-view @view="view" @setUp="setUp" @update="update"/>
    </transition>
    <fringe></fringe>
    <!--
    <div class="user" @click="openProfile" :class="{
      'user-open': this.$route.name === 'Profile',
      'user-hide': this.$route.name === 'Ranking' || this.$route.name === 'Register'
    }">
      <div v-if="user">
        <p class="name">{{user.name}}</p>
        <p class="posi">{{user.postion}}</p>
        <p class="id">No. {{user.id}}</p>
      </div>
      <p v-else class="login">Login</p>
    </div>
    <div class="ranking" @click="toggleRanking"  :class="{
      'ranking-open': this.$route.name === 'Ranking',
      'ranking-hide': this.$route.name === 'Profile' || this.$route.name === 'Register'
    }">{{this.$route.name === 'Ranking' ? '&lt; Back' : 'Ranking'}}</div>
    <div class="back" @click="closeProfile" :class="{
      'hide': this.$route.name !== 'Profile'
    }">Back ></div>
              -->
    <div class="mask build-mask" v-if="registerIsOpen">
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
            <div class="button" @click="register_auth('github')">Sign up with Github</div>
            <!--<div class="button" @click="register_auth('facebook')">Sign up with Facebook</div>-->
          </li>
        </ul>
      </div>
    </div>
    <user-bar v-if="user" :username="user.name" :id="user.id"></user-bar>
    <settle-bar v-else @register="openRegister"></settle-bar>
    <receiving-station></receiving-station>
    <!--<hunter-bar v-if="this.$route.name!=='Hunter'"></hunter-bar>-->

  </div>
</template>

<script>
import api from '@/api'
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
      viewPro: {
        title: 'DoraDust',
        intro: `Please pay attention to Galaxy Convention to get more resident policy.
        We will work hard to create galactic welfare all the time.
        Welcome to contact us to better serve the resident.`,
        demo: 'http://sdflakdflakdflakldfklakd.com',
        git: '',
        team: '',
        rank: 1
      },
      registerIsOpen: false,
      git_state: ''
    }
  },
  created () {
    if (window.cookieStorage.getItem('token')) {
      this.user = {
        name: window.cookieStorage.getItem('name'),
        id: window.cookieStorage.getItem('id')
      }
    }
    // window.fbAsyncInit = function() {
    //   FB.init({
    //     appId      : '{your-app-id}',
    //     cookie     : true,
    //     xfbml      : true,
    //     version    : '{latest-api-version}'
    //   });
    //
    //   FB.AppEvents.logPageView();
    //
    // }
    //
    // (function(d, s, id){
    //   var js, fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) { return; }
    //   js = d.createElement(s); js.id = id;
    //   js.src = "https://connect.facebook.net/en_US/sdk.js";
    //   fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'))
  },
  methods: {
    makestate() {
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
    login_auth (provider) {
      // this.$auth.authenticate(provider).then(function (response) {
      //   console.log(response)
      //   this.registerIsOpen = false
      //   // Execute application logic after successful social authentication
      // })
    },
    register_auth (provider) {
      this.$auth.authenticate(provider).then(function (response) {
        console.log(response)
        this.registerIsOpen = false
        // Execute application logic after successful social authentication
      })
    },
    view (item) {
      // this.viewIsOpen = true
      // this.viewPro = item
      this.$router.push({name: 'PlanetView', query: {name: item}})
    },
    setUp () {
      this.setIsOpen = true
    },
    openRegister () {
      this.registerIsOpen = true
    },
    closeRegister () {
      this.registerIsOpen = false
    },
    sendFeedback () {
      // TODO
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
      } else {
        this.$router.push('/')
        this.user = null
        window.cookieStorage.setItem('token', 'anyValue', {expires: d})
        window.cookieStorage.setItem('name', 'anyValue', {expires: d})
        window.cookieStorage.setItem('id', 'anyValue', {expires: d})
      }
    },
  }
}

</script>

<style lang="stylus" scoped>
  /*
@font-face
  font-family: "Allerta-Stencil";
  src: url("http://developer.mozilla.org/@api/deki/files/2934/=VeraSeBd.ttf")
@font-face
  font-family: "Ubuntu-Medium";
  src: url("http://developer.mozilla.org/@api/deki/files/2934/=VeraSeBd.ttf")
@font-face
  font-family "Ubuntu"
  src url("")
  */
#app
  width 100vw
  height 100vh
  overflow hidden
  background-color rgba(0,0,0,0.95)
  position relative
  font-family 'Ubuntu'
.user
  position fixed
  top 50%
  left 0
  width 120px
  height 120px
  transform translate3d(0, -50%, 0)
  background-color #1B0033
  box-shadow 0 2px 16px #0008
  color #FFF
  text-align center
  box-sizing border-box
  padding 24px 14px
  z-index 99
  cursor pointer
  transition 1s
  .name
    line-height 22px
    font-size 16px
    margin 0 0 14px
  .posi, .id
    line-height 18px
    font-size 12px
    margin 0
  .login
    line-height 72px
    font-size 16px
    margin 0
.user-open
  left 80%
  transform translate3d(0, -50%, 0) scale(1.5)
  box-shadow none
.user-hide
  transform translate3d(-200%, -50%, 0)
.ranking
  position fixed
  top 50%
  right 0
  width 120px
  height 120px
  transform translate3d(0, -50%, 0)
  background-color #1B0033
  box-shadow 0 2px 16px #0008
  color #FFF
  text-align center
  box-sizing border-box
  padding 24px
  z-index 70
  line-height 72px
  cursor pointer
  transition 1s
.ranking-open
  right 100%
  transform translate3d(120px, -50%, 0)
  box-shadow none
.ranking-hide
  transform translate3d(200%, -50%, 0)
.back
  position fixed
  font-size 20px
  top 50px
  right 40px
  color #fff
  transition opacity 1s
  cursor pointer
.hide
  opacity 0

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

.card
  width 800px
  height 100%
  background-color #FFF
  margin 80px auto
  border-radius 16px
  padding 100px 120px
  box-sizing border-box
  position relative
  .close
    position absolute
    right 30px
    top 30px
    cursor pointer
    font-weight 400
  h2
    font-size 30px
    margin 0 0 30px
    text-align center
  .intro
    font-size 16px
    line-height 30px
    text-align justify
  .number
    font-size 24px
    line-height 40px
    padding-left 16px
    background-color #F5F5F5
    margin-bottom 30px
  textarea
    width 100%
    font-size 16px
    padding 6px 16px
    line-height 30px
    outline none
    border none
    background-color #F5F5F5
    margin 0px
    resize none
    box-sizing border-box
  .title
    padding-left 16px
    line-height 20px
    margin 6px 0
  input
    width 100%
    font-size 16px
    line-height 20px
    padding 6px 16px
    outline none
    border none
    background-color #F5F5F5
    margin 0px
    resize none
    box-sizing border-box
  .build
    position absolute
    bottom 130px
    left 50%
    transform translate3d(-50%, 0, 0)
    .button
      width 180px
      height 50px
      background-color #FF0082
      border-radius 25px
      line-height 50px
      text-align center
      font-family 'Ubuntu'
      color #FFF
      cursor pointer
      margin-bottom 16px
    .set
      background-color #62B100
      margin-bottom 0
    p
      margin 0
      line-height 18px
      font-family 'Ubuntu'
      text-align center
.spy-mask
  z-index 120
.spy
  position absolute
  left 50%
  top 60%
  width 160px
  transform rotate(90deg) translate3d(0,-340px,0)
  height 70px
  text-align center
  line-height 50px
  font-weight 400
  border-radius 8px
  background-color #ffdc00
  cursor pointer
.set-up
  z-index 100
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  transform translate3d(0, 100%, 0)
  transition transform 0.8s
.view-show
  transform translate3d(0, 0, 0)
.build-mask
  z-index 120
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
    height 200px
    border solid 1px #fff4
    border-radius 6px
    margin 10px auto
    padding 25px
    box-sizing border-box
    background-image linear-gradient(left, #301B0F, #1E0618)
    &:first-child
      height 240px
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
