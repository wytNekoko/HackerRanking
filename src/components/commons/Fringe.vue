<template>
  <div class="box">
    <div class="logo">
      <img width="141" height="29" :src="require('@/assets/logoWhite.png')" alt="logo">
    </div>
    <div class="head"></div>

    <!--<div class="child"></div>-->
  </div>
</template>

<script>
export default {
  name: 'Fringe',
  props: ['page']
}
</script>

<style lang="stylus" scoped>
.box
  position absolute
  left 32.2%
  .head
    width 498.4px
    height 60px
    z-index 3
    background-image linear-gradient(136deg, rgba(46,40,40,0.95) 0%, rgba(0,0,0,0.94) 100%)
    transform perspective(10px) rotateX(178.5deg)
    -webkit-transform perspective(10px) rotateX(178.5deg); /* Safari 3-8  */
    box-shadow 0 2px 16px 0 rgba(0,0,0,0.50)
    border-top-left-radius 23.38px
    border-top-right-radius 23.38px
  .logo
    position absolute
    left 35.7%
    top 20px
    width 141px
    height 29px
    z-index 5
  .child
    position absolute
    left 178px
    width 412.3px
    height 41px
    z-index 0
    background rgba(0,0,0,0.94)
    transform perspective(10px) rotateX(178.5deg)
    -webkit-transform perspective(10px) rotateX(178.5deg); /* Safari 3-8  */
    border 0.5px solid rgba(255,255,255,0.35)
    box-shadow 0 2px 16px 0 rgba(0,0,0,0.50)
    border-top-left-radius 23.38px
    border-top-right-radius 23.38px

</style>
