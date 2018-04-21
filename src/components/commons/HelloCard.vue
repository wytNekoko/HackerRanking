<template>
  <div class="hello-card">
    <div class="board" :style="{'transform': `scale(${scale}) rotateY(${rotate}deg)`}">
      <p class="rank">Rank #1</p>
      <h1 class="title">{{title}}</h1>
      <p class="intro">{{intro}}</p>
      <pink-silk :y="y" :isShow="showPinkSilk"></pink-silk>
      <blue-silk :y="y" :isShow="showBlueSilk"></blue-silk>
      <div class="mask" :style="{'opacity': onHover || show ? 0 : 1}">
        <div class="mask-top"></div>
        <div class="mask-bottom">
          <div class="lines" v-for="item in maskInfo" :key="maskInfo.indexOf(item)">
            <div v-for="n in item.line" :key="n"></div>
            <div :style="{'width': `${item.left}%`}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import PinkSilk from './PinkSilk'
import BlueSilk from './BlueSilk'

const title = 'DoraDust'
const intro = `在DoraDust中可以看到DoraHacks Hacker们做的有趣项目，每一个用户都是Dora的建设者，
每个人手里都有一定的筹码，可以选择自己看好的项目“投资”，每个投资者的投资额会根据他的“信誉”值变化，
信誉值对应的是项目贡献能力和项目评估能力。DoraDust 的项目会根据“投资”情况进行排名。 `

export default {
  name: 'HelloCard',
  props: ['dx', 'dy', 'show'],
  data () {
    return {
      toY: 0,
      y: 0,
      toRotate: 0,
      rotate: 0,
      boundingInfo: null,
      showBlueSilk: false,
      showPinkSilk: false,
      scale: 1,
      title,
      intro,
      onHover: false,
      maskInfo: []
    }
  },
  computed: {
    needUpdate () {
      return (this.showBlueSilk ? 1 : 0) + (this.showPinkSilk ? 2 : 0)
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
    window.addEventListener('resize', () => {
      this.boundingInfo = this.$el.getBoundingClientRect()
    })
    this.boundingInfo = this.$el.getBoundingClientRect()
    this.$el.addEventListener('mousemove', (e) => {
      const x = e.pageX - this.boundingInfo.left
      const y = e.pageY - this.boundingInfo.top
      if (this.isIn([x, y], [208, 0, 92, 400])) {
        if (!this.showPinkSilk) {
          this.showPinkSilk = true
        }
      } else if (this.showPinkSilk) {
        this.showPinkSilk = false
      }
      if (this.isIn([x, y], [0, 0, 92, 400])) {
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
      this.toRotate = (x / 10) - 15
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
      const trueX = pos[0] - this.dx
      const trueY = pos[1] - this.dy
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

<style lang="stylus">
.hello-card
  width 300px
  height 400px
  position relative
  perspective 1000px
  .board
    width 300px
    height 400px
    border-radius 8px
    background-color #FFF
    position absolute
    top 0
    left 0
    box-shadow 0 2px 8px #0001
  .rank
    height 20px
    margin 0
    background-color #FF4A4A
    color #FFF
    text-align center
    font-size 12px
    line-height 20px
    border-radius 8px 8px 0 0
  .title
    font-size 30px
    margin 36px 24px 28px
    line-height 36px
    color #333
  .intro
    font-size 16px
    margin 24px
    line-height 22px
    text-align justify
    color #666
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
      background-color #ddd
      margin-top 18px
      width 100%
      height 4px
</style>
