<template>
  <div class="box" @click="toggleRegister">
    <div class="settle">
      <div class="icon">
        <img width="32" height="32" :src="require('@/assets/symbols-settle-in-galaxy.png')" alt="">
      </div>
      <span class="slogan">Settle in Galaxy</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettleBar',
  methods: {
    toggleRegister () {
      if (!window.cookieStorage.getItem('token')) {
        this.$router.push('/register')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  position fixed
  left -27.8px
  top 87.425%
  z-index 1
  cursor pointer
  .settle
    width 192.5px
    height 79.1px
    background url(../../assets/symbols-mothership.png) no-repeat left, linear-gradient(-136deg, rgba(46,40,40,0.95) 0%, rgba(0,0,0,0.94) 100%)
    border 0.5px solid rgba(255,255,255,0.35)
    box-shadow 0 2px 16px 0 rgba(0,0,0,0.50)
    border-radius 3.49px
  .icon
    position absolute
    left 88PX
    top 16px
    z-index 2
  .slogan
    position absolute
    left 65.4px
    top 56.9px
    color white
    font-family Ubuntu-Medium
    font-size 10px
    letter-spacing 0
    text-align center
    text-shadow 0 2px 2px black
</style>
