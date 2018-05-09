<template>
  <div class="box">
    <div class="newplanet" @click="togglePlanet">
      <img class="icon" width="40%" height="40%" :src="require('@/assets/symbols-newplanet.png')">
      <p class="text">New Planet</p>
    </div>
    <div class="getdust" @click="getDust">
      <img class="icon" width="40%" height="40%" :src="require('@/assets/symbols-getdusts.png')">
      <p class="text">Get Dusts</p>
    </div>
    <div class="exploreview" @click="exploreView">
      <img class="icon"  v-if="isExplore" width="40%" height="40%" :src="require('@/assets/exploreview.png')">
      <img class="icon"  v-else width="40%" height="40%" :src="require('@/assets/exploreview uncheck.png')">
      <p class="text">Explore view</p>
    </div>
    <div class="listview" @click="listView">
      <img class="icon" v-if="isList" width="40%" height="40%" :src="require('@/assets/symbols-listview.png')">
      <img class="icon"  v-else width="40%" height="40%" :src="require('@/assets/symbols-listview-uncheck.png')">
      <p class="text">List view</p>
    </div>
    <div class="ranking" @click="gotoRanking">
      <img class="icon" width="40%" height="40%" :src="require('@/assets/symbols-ranking.png')">
      <p class="text">Ranking</p>
    </div>
    <div class="feedback" @click="feedBack">
      <img class="icon" width="40%" height="40%" :src="require('@/assets/symbols-feedback.png')">
      <p class="text">Feedback</p>
    </div>
    <div class="help" @click="help">
      <img class="icon" width="40%" height="40%" :src="require('@/assets/symbols-help.png')">
      <p class="text">Help</p>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'ToolBar',
  props: ['isExplore', 'isList'],
  methods: {
    togglePlanet () {
      if (!window.cookieStorage.getItem('token')) {
        this.$router.push('/register')
      }
      this.$router.push('/setup-planet')
    },
    getDust () {
      api.get_dust().then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else if (parseInt(d, 10)) {
          this.numActive = true
          setTimeout(() => {
            this.numActive = false
          }, 1000)
        } else {
          alert(d)
        }
      })
    },
    exploreView () {
      this.$router.push('/')
    },
    listView () {

    },
    gotoRanking () {
      this.$router.push('/ranking')
    },
    feedBack () {
    },
    help () {

    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  position fixed
  left 29.4%
  top 87.425%
  width 575.3px
  height 78.9px
  z-index 1
  background-image: linear-gradient(136deg, rgba(46,40,40,0.95) 0%, rgba(0,0,0,0.94) 100%);
  border: 0.3px solid rgba(255,255,255,0.35);
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.50);
  border-radius: 3.94px;
  .newplanet
    position absolute
    width 14.28%
    height 78.9px
    border-right 0.5px solid rgba(255,255,255,0.35)
    .icon
      position absolute
      left 30%
      top 20%
    .text
      position absolute
      left 15%
      top 55%
      font-family: Ubuntu-Medium;
      font-size: 10px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-shadow: 0 2px 2px #000000;
  .getdust
    position absolute
    left: 14.29%
    width 14.28%
    height 78.9px
    border-right 0.5px solid rgba(255,255,255,0.35)
    .icon
      position absolute
      left 30%
      top 17%
    .text
      position absolute
      left 20%
      top 55%
      font-family: Ubuntu-Medium;
      font-size: 10px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-shadow: 0 2px 2px #000000;
  .exploreview
    position absolute
    left 28.57%
    width 14.28%
    height 78.9px
    .icon
      position absolute
      left 30%
      top 17%
    .text
      position absolute
      left 15%
      top 55%
      font-family: Ubuntu-Medium;
      font-size: 10px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-shadow: 0 2px 2px #000000;
  .listview
    position absolute
    left: 42.85%
    width 14.28%
    height 78.9px
    border-right 0.5px solid rgba(255,255,255,0.35)
    .icon
      position absolute
      left 30%
      top 17%
    .text
      position absolute
      left 25%
      top 55%
      font-family: Ubuntu-Medium;
      font-size: 10px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-shadow: 0 2px 2px #000000;
  .ranking
    position absolute
    left: 57.14%
    width 14.28%
    height 78.9px
    border-right 0.5px solid rgba(255,255,255,0.35)
    .icon
      position absolute
      left 30%
      top 17%
    .text
      position absolute
      left 28%
      top 55%
      font-family: Ubuntu-Medium;
      font-size: 10px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-shadow: 0 2px 2px #000000;
  .feedback
    position absolute
    left: 71.42%
    width 14.28%
    height 78.9px
    .icon
      position absolute
      left 30%
      top 17%
    .text
      position absolute
      left 23%
      top 55%
      font-family: Ubuntu-Medium;
      font-size: 10px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-shadow: 0 2px 2px #000000;
  .help
    position absolute
    left: 85.7%
    width 14.28%
    height 78.9px
    .icon
      position absolute
      left 30%
      top 17%
    .text
      position absolute
      left 35%
      top 55%
      font-family: Ubuntu-Medium;
      font-size: 10px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-shadow: 0 2px 2px #00000
</style>
