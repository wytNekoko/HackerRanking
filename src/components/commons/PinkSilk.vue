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
      }" @mousedown="onMousedown" @mouseleave="onMouseleave">
        <span :class="{'hide': onbuilding}">Hold to build</span>
        <div class="progress" :class="{'show': onbuilding}">
          <div :class="{'move': onbuilding}"></div>
        </div>
      </div>
    </div>
    <img class="block"
      :class="{'block-animation': onbuilding}"
      :src="require('@/assets/symbols-blocks.png')" alt="">
    <img class="hammer"
      :class="{'hammer-animation': onbuilding}"
      :src="require('@/assets/symbols-hammer.png')" alt="">
    <div class="time" :class="{'time-show': isShow}">3d 24:30:3</div>
  </div>
</template>

<script>
import { TweenLite } from 'gsap'
import api from '@/api'

export default {
  name: 'PinkSilk',
  props: ['y', 'isShow', 'name'],
  data () {
    return {
      k: 0,
      mouseon: false,
      animation: null,
      onbuilding: false,
      timer: 0
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
    document.addEventListener('mouseup', () => {
      this.onbuilding = false
    })
    this.animation = TweenLite.to(this, 0.6, {
      k: 100,
      paused: true,
      ease: window.Power2.easeInOutt
    })
  },
  methods: {
    onClick () {
      this.$emit('build')
    },
    onMousedown () {
      this.onbuilding = true
      this.timer = setTimeout(this.build, 2000)
    },
    onMouseleave () {
      clearTimeout(this.timer)
      this.onbuilding = false
    },
    build () {
      api.build(this.name, 22).then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else {
          alert('success')
        }
      })
    }
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
    overflow hidden
  span
    user-select none
    transition transform 0.2s
    font-size 14px
    padding-left 10px
    float left
  .hide
    transform translate3d(100px, 0, 0)
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
.progress
  width 80px
  height 4px
  position absolute
  top 18px
  left 8px
  overflow hidden
  border solid 2px #FFF
  transform translate3d(-100px, 0, 0)
  transition 0.2s
  div
    width 100%
    height 100%
    background-color #FFF
    transform translate3d(-100%, 0, 0)
  .move
    transform translate3d(0, 0, 0) !important
    transition transform 2s linear
.show
  transform translate3d(0, 0, 0)
.block
  position absolute
  top -7px
  right 16px
  transform-origin 50% 100%
  transform scale(0)
.block-animation
  transform scale(1)
  transition transform 0.2s 1.9s
.hammer
  position absolute
  top 14px
  right 0
  transform matrix(-0.5446, -0.8386, 0.8386, -0.5446, 6, -61)
  z-index -1
  opacity 0
.hammer-animation
  opacity 1
  animation boom 2s
.time
  width 100px
  height 16px
  line-height 16px
  font-size 12px
  color #FFF
  text-align center
  background-color #FF0082
  position absolute
  top 56px
  left -92px
  transition 0.5s
  opacity 0
  transform translate3d(0, 10px, 0)
.time-show
  opacity 1
  transform translate3d(0, 0, 0)
@keyframes boom
  0%
    transform matrix(1, 0, 0, 1, 0, 0)
    opacity 0
  70%
    transform matrix(1, 0, 0, 1, 100, -100)
    opacity 1
  85%
    transform matrix(1, 0, 0, 1, 100, -100)
    opacity 1
  100%
    transform matrix(-0.5446, -0.8386, 0.8386, -0.5446, 6, -61)
    opacity 1
</style>
