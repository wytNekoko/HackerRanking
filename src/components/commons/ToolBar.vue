<template>
  <div class="box">
    <div class="newplanet" @click="togglePlanet">
      <img class="icon" width="40%" height="40%" :src="require('@/assets/symbols-newplanet.png')">
      <p class="text">New Project</p>
    </div>
    <div class="getdust" @click="getDust">
      <img class="icon" width="40%" height="40%" :src="require('@/assets/symbols-getdusts.png')">
      <p class="text">Get Gift</p>
    </div>
    <div class="feedback" @click="feedBack">
      <img class="icon" width="40%" height="40%" :src="require('@/assets/symbols-feedback.png')">
      <p class="text">Feedback</p>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'ToolBar',
  methods: {
    togglePlanet () {
      if (!window.cookieStorage.getItem('token')) {
        alert('Login required')
      } else {
        this.$router.push('/setup-planet')
      }
    },
    getDust () {
      // console.log(window.cookieStorage.getItem('token'))
      api.get_dust().then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else if (parseInt(d, 10)) {
          console.log(d)
          alert('88 dusts got.')
          // this.numActive = true
          // setTimeout(() => {
          //   this.numActive = false
          // }, 1000)
        } else {
          alert(d)
        }
      })
    },
    feedBack () {
      this.$emit('feedback')
    },
    help () {
      this.$emit('help')
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  position fixed
  left 40%
  top 87.425%
  width 240px
  height 78.9px
  z-index 1
  background-image: linear-gradient(136deg, rgba(46,40,40,0.95) 0%, rgba(0,0,0,0.94) 100%);
  border: 0.3px solid rgba(255,255,255,0.35);
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.50);
  border-radius: 3.94px;
  .newplanet
    position absolute
    width 33.3%
    height 78.9px
    border-right 0.5px solid rgba(255,255,255,0.35)
    cursor pointer
    .icon
      position absolute
      left 30%
      top 20%
    .text
      position absolute
      left 60%
      top 35%
      font-family: Ubuntu;
      font-size: 12px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-shadow: 0 2px 2px #000000;
  .getdust
    position absolute
    left: 33.4%
    width 33.3%
    height 78.9px
    border-right 0.5px solid rgba(255,255,255,0.35)
    cursor pointer
    .icon
      position absolute
      left 30%
      top 17%
    .text
      position absolute
      left 20%
      top 55%
      font-family: Ubuntu;
      font-size: 10px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-shadow: 0 2px 2px #000000;
  .feedback
    position absolute
    left: 66.7%
    width 33.3%
    height 78.9px
    cursor pointer
    .icon
      position absolute
      left 30%
      top 17%
    .text
      position absolute
      left 23%
      top 55%
      font-family: Ubuntu;
      font-size: 10px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-shadow: 0 2px 2px #000000
</style>
