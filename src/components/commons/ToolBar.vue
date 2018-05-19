<template>
  <div class="box">
    <div class="newplanet" @click="togglePlanet">
      <img class="icon" width="35" height="35" :src="require('@/assets/symbols-newplanet.png')">
      <p class="text">New Project</p>
    </div>
    <div class="getdust" @click="getDust">
      <img class="icon" width="35" height="35" :src="require('@/assets/symbols-getdusts.png')">
      <p class="text">Get Gift</p>
    </div>
    <div class="feedback" @click="feedBack">
      <img class="icon" width="27" height="27" :src="require('@/assets/symbols-feedback.png')">
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
  left 36%
  top 89%
  width 378px
  height 60px
  z-index 1
  background-image: linear-gradient(136deg, rgba(46,40,40,0.95) 0%, rgba(0,0,0,0.94) 100%);
  border: 0.3px solid rgba(255,255,255,0.35);
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.50);
  border-radius: 3.94px;
  .newplanet
    position absolute
    width 33.3%
    height 60px
    border-right 0.5px solid rgba(255,255,255,0.35)
    cursor pointer
    .icon
      position absolute
      left 7%
      top 25%
    .text
      position absolute
      left 37%
      top 23%
      font-family: Ubuntu;
      font-size: 12px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-shadow: 0 2px 2px #000000;
  .getdust
    position absolute
    left: 33.4%
    width 33.3%
    height 60px
    border-right 0.5px solid rgba(255,255,255,0.35)
    cursor pointer
    .icon
      position absolute
      left 15%
      top 21%
    .text
      position absolute
      left 47%
      top 24%
      font-family: Ubuntu;
      font-size: 12px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-shadow: 0 2px 2px #000000;
  .feedback
    position absolute
    left: 66.7%
    width 33.3%
    height 60px
    cursor pointer
    .icon
      position absolute
      left: 15%;
      top: 33%;
    .text
      position absolute
      left 43%
      top 24%
      font-family: Ubuntu;
      font-size: 12px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-shadow: 0 2px 2px #000000
</style>
