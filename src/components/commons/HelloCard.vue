<template>
  <div class="hello-card" :style="{
    'transform': `translate3d(${transX}px, ${transY}px, 0)`
  }">
    <div class="board" :style="{'transform': `scale(${scale}) rotateY(${rotate}deg)`}">
      <p class="rank">Rank #{{orgData.rank}}</p>
      <h1 class="title">{{orgData.title}}</h1>
      <p class="intro">{{orgData.intro}}</p>
      <pink-silk
        :y="y"
        :isShow="showPinkSilk"
        :name="orgData.title"
        :time="orgData.time"
        v-on="$listeners">
      </pink-silk>
      <blue-silk :y="y" :isShow="showBlueSilk" v-on="$listeners"></blue-silk>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import PinkSilk from './PinkSilk'
import BlueSilk from './BlueSilk'

export default {
  name: 'HelloCard',
  props: ['dx', 'dy', 'orgData', 'show', 'window'],
  data () {
    return {
      toY: 0,
      y: 0,
      toRotate: 0,
      rotate: 0,
      showBlueSilk: false,
      showPinkSilk: false,
      scale: 1,
      onHover: false,
      maskInfo: []
    }
  },
  computed: {
    needUpdate () {
      return (this.showBlueSilk ? 1 : 0) + (this.showPinkSilk ? 2 : 0)
    },
    transX () {
      return (this.orgData.x * 340) - 150
    },
    transY () {
      return (this.orgData.y * 440) - 200 - this.orgData.x * 80
    }
  },
  watch: {
    needUpdate () {
      new gsap.TimelineLite()
        .to(this, 0.2, { scale: 1.02, ease: window.Quad.easeOut })
        .to(this, 0.2, { scale: 1, ease: window.Quad.easeIn })
    }
  },
  created () {
    let totalLinesNum = 9
    while (totalLinesNum > 0) {
      const hasNewPara = Math.random() < totalLinesNum / 9
      if (!hasNewPara) {
        break
      }
      const lineNum = Math.ceil(Math.random() * totalLinesNum)
      const leftLineWidth = Math.round(Math.random() * 60) + 20
      this.maskInfo.push({
        line: lineNum,
        left: leftLineWidth
      })
      totalLinesNum -= lineNum + 1
    }
  },
  mounted () {
    requestAnimationFrame(this.render)
    this.$el.addEventListener('mousemove', (e) => {
      const hw = this.window.w / 2
      const hh = this.window.h / 2
      const left = hw + this.transX + this.dx
      const top = hh + this.transY + this.dy
      const x = e.pageX - left
      const y = e.pageY - top
      if (this.isIn([x, y], [0, 0, 300, 400])) {
        if (!this.showPinkSilk) {
          this.showPinkSilk = true
        }
      } else if (this.showPinkSilk) {
        this.showPinkSilk = false
      }
      if (this.isIn([x, y], [0, 0, 300, 400])) {
        if (!this.showBlueSilk) {
          this.showBlueSilk = true
        }
      } else if (this.showBlueSilk) {
        this.showBlueSilk = false
      }
      let dy = y - 30
      dy = dy < 0 ? 0 : dy
      dy = dy > 330 ? 330 : dy
      this.toY = dy
      this.toRotate = (x - 150) / 10
      this.onHover = true
    })
    this.$el.addEventListener('mouseleave', () => {
      this.showPinkSilk = false
      this.showBlueSilk = false
      this.toRotate = 0
      this.onHover = false
    })
  },
  methods: {
    isIn (pos, b) {
      const trueX = pos[0]
      const trueY = pos[1]
      let judge = true
      judge = judge && trueX >= b[0] && trueX < b[0] + b[2]
      judge = judge && trueY >= b[1] && trueY < b[1] + b[3]
      return judge
    },
    render () {
      const dy = this.toY - this.y
      if (Math.abs(dy) > 0.1) {
        this.y += dy * 0.1
      }
      const dRotate = this.toRotate - this.rotate
      if (Math.abs(dRotate) > 0.1) {
        this.rotate += dRotate * 0.08
      } else if (Math.abs(this.rotate) < 0.1) {
        this.rotate = 0
      }
      requestAnimationFrame(this.render)
    }
  },
  components: {
    PinkSilk,
    BlueSilk
  }
}
</script>

<style lang="stylus" scoped>
.hello-card
  width 300px
  height 400px
  position relative
  perspective 1000px
  .board
    width 300px
    height 400px
    border-radius 4.93px
    background-color rgba(19,29,64,0.6)
    position absolute
    top 0
    left 0
    box-shadow 0 2px 10px 0
  .rank
    height 50px
    margin 0
    background-color rgba(43,45,81,0.8)
    color #FFF
    text-align center
    font-size 20px
    line-height 50px
    border-radius 4.93px 4.93px 0 0
  .title
    font-size 30px
    margin 16px 24px 18px
    line-height 36px
    color #FFF
  .intro
    font-size 16px
    margin 18px 24px
    line-height 22px
    text-align justify
    color #FFF
    font-family PingFangSC-Regular
.mask
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  border-radius 6px
  transition opacity .4s
  .mask-top
    width 100%
    height 100px
    border-radius 6px 6px 0 0
    background-color #fffd
  .mask-bottom
    width 100%
    height 300px
    background-color #fff
    padding 20px 24px
    box-sizing border-box
    border-radius 0 0 6px 6px
    .lines div
      background-color #eee
      margin-top 18px
      width 100%
      height 4px
</style>
