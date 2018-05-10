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

    <div class="mask" v-if="viewIsOpen || setIsOpen"></div>
    <div class="view" :class="{'view-show': viewIsOpen}">
      <div class="spy" @click="openSpy">Spy the Team</div>
      <div class="card">
        <span class="close" @click="closeView">Close X</span>
        <h2>{{viewPro.title}}</h2>
        <p class="intro">{{viewPro.intro}}</p>
        <p v-if="viewPro.demo">Demo URL：<a :href="viewPro.demo">{{viewPro.demo}}</a></p>
        <p v-if="viewPro.git">Git URL：<a :href="viewPro.git">{{viewPro.git}}</a></p>
        <p>Team: {{viewPro.team}}</p>
        <div class="build">
          <div class="button" @click="buildIt">Build it!</div>
          <p>{{viewPro.builder}}Builders</p>
          <p>{{viewPro.dust}}Dusts</p>
          <p>Rank #{{viewPro.rank}}</p>
        </div>
      </div>
    </div>
    <div class="set-up" :class="{'view-show': setIsOpen}">
      <div class="card">
        <span class="close" @click="closeSet">Close X</span>
        <input type="text" class="number" v-model="setUpInfo.name">
        <textarea rows="4" v-model="setUpInfo.description"></textarea>
        <p class="title">Email</p>
        <input type="text" v-model="setUpInfo.email">
        <p class="title">Demo URL</p>
        <input type="text" v-model="setUpInfo.demo">
        <p class="title">Github URL</p>
        <input type="text" v-model="setUpInfo.git">
        <p class="title">Team Introduction</p>
        <textarea rows="4" v-model="setUpInfo.team"></textarea>
        <div class="build">
          <div class="button set" @click="setupPlanet">Set it up</div>
        </div>
      </div>
    </div>
    <div class="mask spy-mask" v-if="spyIsOpen">
      <div class="spy-card">
        <span class="close" @click="closeSpy">Close X</span>
        <img height="80" :src="require('@/assets/symbols-spy.png')" alt="">
        <h3>Spy the Team</h3>
        <p>Get the way to contact the captain</p>
        <div class="button" @click="spy">{{leaderEmail ? leaderEmail : `${pay} Gift`}}</div>
      </div>
    </div>
    <div class="mask build-mask" v-if="buildIsOpen">
      <div class="build-card">
        <span class="close" @click="closeBuild">Close X</span>
        <h3>Amount of investment</h3>
        <input type="text" v-model="buildNum"><span class="dust">Dust</span>
        <div class="button" @click="confirmBuild">Confirm</div>
      </div>
    </div>
    <div class="mask build-mask" v-if="registerIsOpen">
      <div class="register-card">
        <span class="close" @click="closeRegister">
          <span></span><span></span>
        </span>
        <ul>
          <li>
            <h2>Signed Resident:</h2>
            <div class="button" @click="login">Login with cryptoname</div>
            <div class="button">Login with Github</div>
            <div class="button">Login with Facebook</div>
          </li>
          <li>
            <h2>New Resident:</h2>
            <div class="button">Sign up with Github</div>
            <div class="button">Sign up with Facebook</div>
          </li>
        </ul>
      </div>
    </div>
    <user-bar v-if="user" :username="user.name" :id="user.id"></user-bar>
    <settle-bar v-else @register="openRegister"></settle-bar>
    <tool-bar v-if="this.$route.name!=='Hunter'" :is-explore="true" :is-list="false"></tool-bar>
    <receiving-station></receiving-station>
    <hunter-bar v-if="this.$route.name!=='Hunter'"></hunter-bar>

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
        intro: `在DoraDust中可以看到DoraHacks Hacker们做的有趣项目，每一个用户都是Dora的建设者，
每个人手里都有一定的筹码，可以选择自己看好的项目“投资”，每个投资者的投资额会根据他的“信誉”值变化，
信誉值对应的是项目贡献能力和项目评估能力。DoraDust 的项目会根据“投资”情况进行排名。`,
        demo: 'http://sdflakdflakdflakldfklakd.com',
        git: '',
        team: '',
        rank: 1
      },
      viewIsOpen: false,
      spyIsOpen: false,
      setIsOpen: false,
      buildIsOpen: false,
      registerIsOpen: false,
      buildNum: 10,
      leader: 'Alabama',
      pay: 1000,
      leaderEmail: '',
      setUpInfo: {
        name: 'Name',
        description: 'Description',
        email: '',
        demo: '',
        git: '',
        team: ''
      }
    }
  },
  created () {
    if (window.cookieStorage.getItem('token')) {
      this.user = {
        name: window.cookieStorage.getItem('name'),
        id: window.cookieStorage.getItem('id')
      }
    }
  },
  methods: {
    login () {
      this.closeRegister()
      this.$router.push('/register')
    },
    openProfile () {
      if (!window.cookieStorage.getItem('token')) {
        this.$router.push('/register')
      } else {
        this.$router.push('/profile')
      }
    },
    closeProfile () {
      this.$router.push('/')
    },
    toggleRanking () {
      if (this.$route.name === 'Ranking') {
        this.$router.push('/')
      } else {
        this.$router.push('/ranking')
      }
    },
    view (item) {
      this.viewIsOpen = true
      this.viewPro = item
    },
    closeView () {
      this.viewIsOpen = false
    },
    openSpy () {
      this.leader = 'Alabama'
      this.leaderEmail = ''
      this.pay = 1000
      this.spyIsOpen = true
    },
    closeSpy () {
      this.spyIsOpen = false
    },
    setUp () {
      this.setIsOpen = true
    },
    closeSet () {
      this.setIsOpen = false
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
          postion: 'Builder',
          id: data.user_info.id
        }
        window.cookieStorage.setItem('token', data.auth_token, { expires: d })
        window.cookieStorage.setItem('name', data.user_info.username, { expires: d })
        window.cookieStorage.setItem('id', data.user_info.id, { expires: d })
      } else {
        this.$router.push('/')
        this.user = null
        window.cookieStorage.setItem('token', 'anyValue', { expires: d })
        window.cookieStorage.setItem('name', 'anyValue', { expires: d })
        window.cookieStorage.setItem('id', 'anyValue', { expires: d })
      }
    },
    setupPlanet () {
      api.setup_planet(this.setUpInfo).then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else {
          this.setIsOpen = false
          for (const i in this.setUpInfo) {
            if (i === 'name') {
              this.setUpInfo[i] = 'Name'
            } else if (i === 'description') {
              this.setUpInfo[i] = 'Description'
            } else {
              this.setUpInfo[i] = ''
            }
          }
        }
      })
    },
    buildIt () {
      this.buildIsOpen = true
    },
    confirmBuild () {
      const num = parseInt(this.buildNum, 10)
      if (!num) {
        alert('Invalid number')
        this.buildNum = 10
        return
      }
      if (num < 1) {
        alert('At least 1dust')
        this.buildNum = 1
        return
      }
      this.buildNum = num
      api.build(this.viewPro.title, num).then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else {
          alert('success')
          this.buildIsOpen = false
        }
      })
    },
    closeBuild () {
      this.buildIsOpen = false
    },
    spy () {
      if (this.leaderEmail) {
        return
      }
      api.spy(this.viewPro.title).then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else {
          this.leaderEmail = d
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
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
.view
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  transform translate3d(0, 100%, 0)
  transition transform 0.8s
  z-index 100
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
.spy-card
  width 470px
  height 370px
  background-color #FFDC00
  border-radius 8px
  position absolute
  top 50%
  left 50%
  transform translate3d(-50%, -50%, 0)
  text-align center
  padding 40px
  box-sizing border-box
  h3
    font-size 24px
    margin 18px 0
  .close
    position absolute
    top 24px
    right 24px
    cursor pointer
  p
    margin 28px 0
    font-size 24px
  .button
    color #FFF
    background-color #FF2929
    border-radius 8px
    height 50px
    line-height 50px
    font-size 24px
    margin auto
    cursor pointer
    display table
    padding 0 50px
.build-mask
  z-index 120
.build-card
  width 400px
  background-color #fff
  border-radius 8px
  position absolute
  top 50%
  left 50%
  transform translate3d(-50%, -50%, 0)
  text-align center
  padding 40px
  box-sizing border-box
  font-size 16px
  input
    border none
    text-align center
    margin-right 10px
    width 140px
    height 50px
    background-color #f6f6f6
    border-radius 25px
    outline none
    box-sizing border-box
    padding 0 30px
    font-size 18px
  h3
    font-size 24px
    margin 24px 0
  .close
    position absolute
    top 24px
    right 24px
    cursor pointer
  .button
    width 184px
    height 50px
    background-color #FF0082
    border-radius 25px
    line-height 50px
    text-align center
    font-family 'Ubuntu'
    color #FFF
    cursor pointer
    margin 30px auto 0
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
    &:first-child
      height 340px
      background-image linear-gradient(left, #2E2828, #000000)
    &:last-child
      background-image linear-gradient(left, #301B0F, #1E0618)
  .button
    width 420px
    height 60px
    line-height 60px
    text-align center
    border solid 1px #fff
    border-radius 6px
    margin 20px auto
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
