<template>
  <div class="hello-card">
    <div class="board" :style="{'transform': `scale(${scale}) rotateY(${rotate}deg)`}">
      <p class="rank">Rank #1</p>
      <h1 class="title">{{title}}</h1>
      <p class="intro">{{intro}}</p>
      <pink-silk :y="y" :isShow="showPinkSilk"></pink-silk>
      <blue-silk :y="y" :isShow="showBlueSilk"></blue-silk>
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
      intro
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
  mounted () {
    requestAnimationFrame(this.render)
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
      this.toRotate = (x / 20) - 7.5
    })
    this.$el.addEventListener('mouseleave', () => {
      this.showPinkSilk = false
      this.showBlueSilk = false
      this.toRotate = 0
    })
  },
  methods: {
    isIn (pos, b) {
      let judge = true
      judge = judge && pos[0] >= b[0] && pos[0] < b[0] + b[2]
      judge = judge && pos[1] >= b[1] && pos[1] < b[1] + b[3]
      return judge
    },
    render () {
      const dy = this.toY - this.y
      if (Math.abs(dy) > 0.1) {
        this.y += dy * 0.1
      }
      const dRotate = this.toRotate - this.rotate
      if (Math.abs(dRotate) > 0.1) {
        this.rotate += dRotate * 0.05
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
</style>
