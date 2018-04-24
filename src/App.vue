<template>
  <div id="app">
    <transition name="fade">
      <router-view @view="view" @setUp="setUp" @update="update"/>
    </transition>
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
    <div class="mask" v-if="viewIsOpen || setIsOpen"></div>
    <div class="view" :class="{'view-show': viewIsOpen}">
      <div class="spy" @click="openSpy">Spy the Team</div>
      <div class="card">
        <span class="close" @click="closeView">X 关闭</span>
        <h2>{{viewPro.title}}</h2>
        <p class="intro">{{viewPro.intro}}</p>
        <p v-if="viewPro.demo">demo地址：<a :href="viewPro.demo">{{viewPro.demo}}</a></p>
        <p v-if="viewPro.git">git地址：<a :href="viewPro.git">{{viewPro.git}}</a></p>
        <p>团队：{{viewPro.team}}</p>
        <div class="build">
          <div class="button">Build it!</div>
          <p>{{viewPro.builder}}Builders</p>
          <p>{{viewPro.dust}}Dusts</p>
          <p>Rank #{{viewPro.rank}}</p>
        </div>
      </div>
    </div>
    <div class="set-up" :class="{'view-show': setIsOpen}">
      <div class="card">
        <span class="close" @click="closeSet">X 关闭</span>
        <div class="number">Planet No.3224</div>
        <textarea rows="4" v-model="setUpInfo.intro"></textarea>
        <p class="title">Email</p>
        <input type="text">
        <p class="title">Demo URL</p>
        <input type="text">
        <p class="title">Github URL</p>
        <input type="text">
        <p class="title">Team Introduction</p>
        <textarea rows="4" v-model="setUpInfo.team"></textarea>
        <div class="build">
          <div class="button set">Set it up</div>
        </div>
      </div>
    </div>
    <div class="mask" v-if="spyIsOpen">
      <div class="spy-card">
        <span class="close" @click="closeSpy">X 关闭</span>
        <img height="80" :src="require('@/assets/symbols-spy.png')" alt="">
        <h3>Spy the Team</h3>
        <p>拿到{{leader}}队长联系方式</p>
        <div class="button">{{pay}} Gift</div>
      </div>
    </div>
  </div>
</template>

<script>
// const user = {
//   name: 'Loslo',
//   postion: 'Builder',
//   id: '0192123'
// }
export default {
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
      leader: 'Alabama',
      pay: 32,
      setUpInfo: {
        intro: 'Description',
        team: '',
        email: ''
      }
    }
  },
  created () {
    if (!window.cookieStorage.getItem('token')) {
      this.$router.push('/register')
    }
  },
  methods: {
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
      this.pay = 32
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
    update (data) {
      const d = new Date()
      if (data) {
        d.setMinutes(d.getMinutes + 30)
        window.cookieStorage.setItem('token', data.token, { expires: d })
      } else {
        window.cookieStorage.setItem('token', 'anyValue', { expires: d })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#app
  width 100vw
  height 100vh
  overflow hidden
  background-color #1B0033
  position relative
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
  padding 24px
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
  z-index 99
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
.view
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  transform translate3d(0, 100%, 0)
  transition transform 0.8s
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
    color #B7B7B7
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
    width 170px
    height 50px
    line-height 50px
    font-size 24px
    margin auto
    cursor pointer
</style>
