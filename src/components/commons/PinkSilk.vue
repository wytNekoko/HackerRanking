<template>
  <div class="box" :style="{'transform': `translate3d(0, ${y}px, 0)`}">
    <div class="back-part">
      <div class="content" :style="{
        'transform': `translate3d(${k < 30 ? 24 * k / 30 - 24 : -16 * (k - 30) / 70}px, 0, 0)`
      }"></div>
      </div>
    <div class="front-part" :style="{
        'transform': `translate3d(${16 - 16 * (k - 30) / 70}px, ${16 * (k - 30) / 70 - 16}px, 0)`
      }">
      <div class="content" :style="{
        'transform': `translate3d(${k < 30 ? 100 : ((k - 90) * (k - 90) - 100) / 35}%, 0, 0)`
      }">
        <span>Build it!</span>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenLite } from 'gsap'

export default {
  name: 'PinkSilk',
  props: ['y', 'isShow'],
  data () {
    return {
      k: 0,
      mouseon: false,
      animation: null
    }
  },
  watch: {
    isShow (newValue) {
      if (this.animation) {
        if (newValue) {
          this.animation.play()
        } else {
          this.animation.reverse()
        }
      }
    }
  },
  mounted () {
    this.animation = TweenLite.to(this, 0.6, {
      k: 100,
      paused: true,
      ease: window.Power2.easeInOutt
    })
  }
}
</script>

<style lang="stylus" scoped>
.box
  position absolute
  top 0
  right 0
  z-index 5
.front-part
  position absolute
  top 8px
  right -8px
  height 44px
  width 140px
  overflow hidden
  .content
    width 100%
    height 100%
    position absolute
    right -40px
    top 0
    background-color #FF0082
    color #fff
    line-height 44px
    box-sizing border-box
    cursor pointer
  span
    padding-left 20px
    float left
.back-part
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
</style>
