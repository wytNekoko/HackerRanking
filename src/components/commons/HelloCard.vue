<template>
  <div class="hello-card" @mouseover="onmouseover" @mouseout="onmouseout">
    <div class="action left-part"></div>
    <div class="action right-part"></div>
    <div class="test">
      <div class="content" :style="{
        'transform': `translate3d(${k < 30 ? 23 * k / 30 - 23 : -16 * (k - 30) / 70}px, 0, 0)`
      }"></div>
      </div>
    <div class="right-silk" :style="{
        'transform': `translate3d(${16 - 16 * (k - 30) / 70}px, ${16 * (k - 30) / 70 - 16}px, 0)`
      }">
      <div class="content" :style="{
        'transform': `translate3d(${k < 30 ? 100 : 100 - (k - 30) / 70 * 100}%, 0, 0)`
      }">Submit!</div>
    </div>
  </div>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'

export default {
  name: 'HelloCard',
  data () {
    return {
      y: 0,
      k: 0,
      tweenAni: null
    }
  },
  created () {
    requestAnimationFrame(this.animate)
  },
  methods: {
    animate (time) {
      requestAnimationFrame(this.animate)
      TWEEN.update(time)
    },
    onmouseover () {
      this.tweenAni = new TWEEN.Tween(this)
        .to({ k: 100 }, 500)
        .start()
    },
    onmouseout () {
      this.tweenAni = new TWEEN.Tween(this)
        .to({ k: 0 }, 500)
        .start()
    }
  }
}
</script>

<style lang="stylus">
.hello-card
  width 300px
  height 400px
  border-radius 8px
  background-color #fff
  position relative
  .action
    content ''
    position absolute
    width 50%
    height 100%
    top 0
    transition .3s
    &:hover
      background-color #eee
  .left-part
    border-radius 8px 0 0 8px
    left 0
  .right-part
    border-radius 0 8px 8px 0
    right 0
  .right-silk
    position absolute
    top 8px
    right -8px
    height 44px
    width 100px
    overflow hidden
    .content
      width 100%
      height 100%
      background-color #FF0082
      color #fff
      line-height 44px
      box-sizing border-box
      padding-left 20px
      cursor pointer
      // transform translate3d(0, 0, 0)
  .test
    position absolute
    top 4px
    right -24px
    width 24px
    height 44px
    transform skewY(-45deg) translate3d(0, 0, 0)
    overflow hidden
    .content
      width 100%
      height 100%
      background-color #C32F8E
      // transform translate3d(-36px, 0, 0)
</style>
