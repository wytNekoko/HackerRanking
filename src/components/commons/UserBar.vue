<template>
  <div class="box" @click="toggleProfile">
    <div class="bar">
      <div class="icon">
        <img width="33" height="33" :src="require('@/assets/symbols-profile.png')" alt="">
      </div>
      <div class="name">{{username}}</div>
      <div class="id">id: {{id}}</div>
      <div class="slogan"><span>Control Center</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserBar',
  props: ['username', 'id'],
  methods: {
    toggleProfile () {
      if (!window.cookieStorage.getItem('token')) {
        this.$router.push('/register')
      }
      this.$router.push('/profile')
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
    .bar
      width 192.5px
      height 79.1px
      background linear-gradient(-136deg, rgba(46,40,40,0.95) 0%, rgba(0,0,0,0.94) 100%)
      border 0.5px solid rgba(255,255,255,0.35)
      box-shadow 0 2px 16px 0 rgba(0,0,0,0.50)
      border-radius 3.49px
    .icon
      position absolute
      left 37.8px
      top 9.6px
      z-index 2
      border-radius 6px
      overflow hidden
    .name
      position absolute
      left 81.8px
      top 10.6px
      font-family Ubuntu-Medium
      color white
      font-size 14px
    .id
      position absolute
      left 81.8px
      top 28px
      font-family Ubuntu
      font-size 12px
      color rgba(255,255,255,0.6)
    .slogan
      position absolute
      background rgba(0,0,0,0.8)
      width 164.7px
      height 30.5px
      left 27.8px
      top 48.6px
      span
        position absolute
        top 8px
        left 38px
        color white
        font-family Allerta-Stencil
        font-size 12px
        letter-spacing 0
        text-shadow 0 2px 2px black
</style>
