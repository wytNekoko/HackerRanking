<template>
  <div class="box" :style="{'transform': `translate3d(0, ${y}px, 0)`}">
    <div class="back-part">
      <div class="content" :style="{
        'transform': `translate3d(${k < 30 ? 24 - 24 * k / 30 : 16 * (k - 30) / 70}px, 0, 0)`
      }"></div>
      </div>
    <div class="front-part" :style="{
        'transform': `translate3d(${16 * (k - 30) / 70 - 16}px, ${16 * (k - 30) / 70 - 16}px, 0)`
      }">
      <div class="content" :style="{
        'transform': `translate3d(${k < 30 ? -100 : -((k - 90) * (k - 90) - 100) / 35}%, 0, 0)`
      }" @click="onClick">
        <span>View</span>
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
      ease: window.Power2.easeInOut
    })
  },
  methods: {
    onClick () {
      this.$emit('childView')
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  position absolute
  top 0
  left 0
  z-index 5
.front-part
  position absolute
  top 8px
  left -8px
  height 44px
  width 140px
  overflow hidden
  .content
    width 100%
    height 100%
    position absolute
    left -40px
    top 0
    background-color #00ADFF
    color #fff
    line-height 44px
    box-sizing border-box
    cursor pointer
  span
    padding-right 20px
    float right
.back-part
  position absolute
  top 4px
  left -24px
  width 24px
  height 44px
  transform skewY(45deg) translate3d(0, 0, 0)
  overflow hidden
  .content
    width 100%
    height 100%
    background-color #2F4FC3
</style>
