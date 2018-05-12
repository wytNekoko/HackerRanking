<template>
  <div class="window">
    <div class="station">
      <div class="bg"></div>
      <img width="49.1" height="19.4" class="sign"
           :src="require('@/assets/symbols-receiving.png')"
           alt="">
      <span class="text">Receiving Station</span>
    </div>
    <div class="split">
        <img class="arrow" width="8" height="4" :src="require('@/assets/symbols-up.png')">
    </div>
    <div class="messagebox"></div>
  </div>
</template>

<script>
export default {
  name: 'ReceivingStation',
  props: ['notifications']
}
</script>

<style lang="stylus" scoped>
.window
  position fixed
  right 0
  width 262.1px
  top 83%
  z-index 1
  .station
    width 0
    left 0
    right 29.4px
    height 38px
    perspective 200px
    position relative
    .bg
      position absolute
      height 38px
      width 232.6px
      background-image: linear-gradient(-136deg, rgba(46,40,40,0.95) 0%, rgba(0,0,0,0.94) 100%)
      border: 0.3px solid rgba(255,255,255,0.2)
      box-shadow: 0 2px 16px 0 rgba(0,0,0,0.50)
      border-radius: 3.51px
      transform-origin 50% 100%
      transform rotateX(30deg)
      border-bottom 0
      left 0
      bottom 0
    .sign
      position absolute
      top 12.5px
    .text
      position absolute
      padding-left 20px
      padding-top 15px
      font-family Allerta-Stencil
      font-size 14px
      color white
      letter-spacing 0
      text-align center
      width 200px
      height 17px
  .split
    position absolute
    top 32px
    width 262.1px
    height 20px
    border: 0.3px solid rgba(255,255,255,0.2);
    border-bottom 0
    background-color rgba(0,0,0,0.8)
    .arrow
      position absolute
      left 48%
      top 45%
  .messagebox
    position absolute
    top 51px
    left 0
    width 262.1px
    height 84.3px
    background-image: linear-gradient(-136deg, rgba(46,40,40,0.95) 0%, rgba(0,0,0,0.94) 100%);
    border: 0.3px solid rgba(255,255,255,0.2);
    border-top 0
    border-right 0
    box-shadow: 0 2px 16px 0 rgba(0,0,0,0.50)
    border-radius: 3.51px;

</style>
