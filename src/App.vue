<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
    <div class="user" @click="openProfile" :class="{
      'user-open': this.$route.name === 'Profile',
      'user-hide': this.$route.name === 'Ranking' || this.$route.name === 'Register'
    }">
      <p class="name">{{user.name}}</p>
      <p class="posi">{{user.postion}}</p>
      <p class="id">No. {{user.id}}</p>
    </div>
    <div class="ranking" @click="toggleRanking"  :class="{
      'ranking-open': this.$route.name === 'Ranking',
      'ranking-hide': this.$route.name === 'Profile' || this.$route.name === 'Register'
    }">{{this.$route.name === 'Ranking' ? '&lt; Back' : 'Ranking'}}</div>
    <div class="back" @click="closeProfile" :class="{
      'hide': this.$route.name !== 'Profile'
    }">Back ></div>
  </div>
</template>

<script>
const user = {
  name: 'Loslo',
  postion: 'Builder',
  id: '0192'
}

export default {
  name: 'App',
  data () {
    return {
      user
    }
  },
  methods: {
    openProfile () {
      this.$router.push('/profile')
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
</style>
