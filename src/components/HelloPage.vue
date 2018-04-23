<template>
  <div class="hello">
    <div class="move-bg" :style="{'transform': `translate3d(${pos.x}px, ${pos.y}px ,0)`}">
      <div class="box center-1"></div>
      <div class="box center-2"></div>
      <div class="box ll-1"></div>
      <div class="box ll-2"></div>
      <div class="box rr-1"></div>
      <div class="box rr-2"></div>
      <hello-card class="rr" :dx="pos.x" :dy="pos.y" :orgData="building[5]"
        v-on:childView="view(building[5])" v-on="$listeners"
      ></hello-card>
      <hello-card class="right-1" :dx="pos.x" :dy="pos.y" :orgData="building[3]"
        v-on:childView="view(building[3])" v-on="$listeners"
      ></hello-card>
      <hello-card class="center" :dx="pos.x" :dy="pos.y" :orgData="building[0]"
        v-on:childView="view(building[0])" v-on="$listeners"
      ></hello-card>
      <hello-card class="left-1" :dx="pos.x" :dy="pos.y" :orgData="building[1]"
        v-on:childView="view(building[1])" v-on="$listeners"
      ></hello-card>
      <hello-card class="left-2" :dx="pos.x" :dy="pos.y" :orgData="building[2]"
        v-on:childView="view(building[2])" v-on="$listeners"
      ></hello-card>
      <hello-card class="ll" :dx="pos.x" :dy="pos.y" :orgData="building[4]"
        v-on:childView="view(building[4])" v-on="$listeners"
      ></hello-card>
      <div class="logo">
        <img :style="{
          'transform': `translate3d(${-pos.x / 2}px, ${-pos.y / 2}px ,0)`
        }" width="300" :src="require('@/assets/symbols-logo.png')" alt="logo">
      </div>
    </div>
    <div class="build-button build-num">{{buildNum}} Planets remained to build today</div>
    <div class="build-button build-new" @click="setUp">Set up a new planet</div>
  </div>
</template>

<script>
import HelloCard from './commons/HelloCard'

const building = [
  {
    title: 'DoraDust',
    intro: `在DoraDust中可以看到DoraHacks Hacker们做的有趣项目，每一个用户都是Dora的建设者，
每个人手里都有一定的筹码，可以选择自己看好的项目“投资”，每个投资者的投资额会根据他的“信誉”值变化，
信誉值对应的是项目贡献能力和项目评估能力。DoraDust 的项目会根据“投资”情况进行排名。`,
    rank: 1
  },
  {
    title: 'DoraDust',
    intro: `在DoraDust中可以看到DoraHacks Hacker们做的有趣项目，每一个用户都是Dora的建设者，
每个人手里都有一定的筹码，可以选择自己看好的项目“投资”，每个投资者的投资额会根据他的“信誉”值变化，
信誉值对应的是项目贡献能力和项目评估能力。DoraDust 的项目会根据“投资”情况进行排名。`,
    rank: 2
  },
  {
    title: 'DoraDust',
    intro: `在DoraDust中可以看到DoraHacks Hacker们做的有趣项目，每一个用户都是Dora的建设者，
每个人手里都有一定的筹码，可以选择自己看好的项目“投资”，每个投资者的投资额会根据他的“信誉”值变化，
信誉值对应的是项目贡献能力和项目评估能力。DoraDust 的项目会根据“投资”情况进行排名。`,
    rank: 3
  },
  {
    title: 'DoraDust',
    intro: `在DoraDust中可以看到DoraHacks Hacker们做的有趣项目，每一个用户都是Dora的建设者，
每个人手里都有一定的筹码，可以选择自己看好的项目“投资”，每个投资者的投资额会根据他的“信誉”值变化，
信誉值对应的是项目贡献能力和项目评估能力。DoraDust 的项目会根据“投资”情况进行排名。`,
    rank: 4
  },
  {
    title: 'DoraDust',
    intro: `在DoraDust中可以看到DoraHacks Hacker们做的有趣项目，每一个用户都是Dora的建设者，
每个人手里都有一定的筹码，可以选择自己看好的项目“投资”，每个投资者的投资额会根据他的“信誉”值变化，
信誉值对应的是项目贡献能力和项目评估能力。DoraDust 的项目会根据“投资”情况进行排名。`,
    rank: 5
  }
]
const buildNum = 3

export default {
  name: 'HelloPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      toPos: { x: 0, y: 0 },
      pos: { x: 0, y: 0 },
      boundingInfo: null,
      buildNum,
      building
    }
  },
  mounted () {
    requestAnimationFrame(this.render)
    window.addEventListener('resize', () => {
      this.boundingInfo = this.$el.getBoundingClientRect()
    })
    this.boundingInfo = this.$el.getBoundingClientRect()
    this.$el.addEventListener('mousemove', (e) => {
      const x = e.pageX - (this.boundingInfo.width / 2)
      const y = e.pageY - (this.boundingInfo.height / 2)
      this.toPos = {
        x: -x / 30,
        y: -y / 30
      }
    })
  },
  methods: {
    render () {
      const dx = this.toPos.x - this.pos.x
      if (Math.abs(dx) > 0.1) {
        this.pos.x += dx * 0.05
      }
      const dy = this.toPos.y - this.pos.y
      if (Math.abs(dy) > 0.1) {
        this.pos.y += dy * 0.05
      }
      requestAnimationFrame(this.render)
    },
    view (item) {
      this.$emit('view', item)
    },
    setUp () {
      this.$emit('setUp')
    }
  },
  components: {
    HelloCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.hello
  width 100%
  height 100%
  background-color #441D66
  position absolute
  overflow hidden
.box
  width 300px
  height 400px
  background-color #FFF
  border-radius 8px
.center
  transform translate3d(-150px, -200px, 0)
.left-1
  transform translate3d(-490px, -440px, 0)
.left-2
  transform translate3d(-490px, 40px, 0)
.right-1
  transform translate3d(190px, -440px, 0)
.center-1
  transform translate3d(-150px, -680px, 0)
.center-2
  transform translate3d(-150px, 280px, 0)
.ll
  transform translate3d(-830px, -200px, 0)
.ll-1
  transform translate3d(-830px, -680px, 0)
.ll-2
  transform translate3d(-830px, 280px, 0)
.rr
  transform translate3d(530px, -200px, 0)
.rr-1
  transform translate3d(530px, -680px, 0)
.rr-2
  transform translate3d(530px, 280px, 0)
.move-bg
  width 100%
  height 100%
  &>div
    position absolute
    top 50%
    left 50%
.logo
  width 300px
  position absolute
  top 50%
  left 50%
  transform translate3d(190px, 200px, 0)
.build-num
  top 40px
  background-color #FF0082
  cursor default
.build-new
  top 106px
  background-color #62B100
  cursor pointer
.build-button
  position absolute
  left 40px
  height 50px
  line-height 22px
  border-radius 25px
  padding 14px 30px
  color #FFF
  font-size 16px
  box-sizing border-box
  box-shadow 0 1px 4px #0008
</style>
