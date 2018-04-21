<template>
  <div class="hello">
    <div class="move-bg" :style="{'transform': `translate3d(${pos.x}px, ${pos.y}px ,0)`}">
      <hello-card class="center" :dx="pos.x" :dy="pos.y"></hello-card>
      <hello-card class="left-1" :dx="pos.x" :dy="pos.y"></hello-card>
      <hello-card class="left-2" :dx="pos.x" :dy="pos.y"></hello-card>
      <div class="logo">
        <img :style="{'transform': `translate3d(${-pos.x / 2}px, ${-pos.y / 2}px ,0)`}" width="300" :src="require('@/assets/logo.svg')" alt="logo">
      </div>
    </div>
    <div class="user">
      <p class="name">{{user.name}}</p>
      <p class="posi">{{user.postion}}</p>
      <p class="id">No.{{user.id}}</p>
    </div>
    <div class="ranking">排行榜</div>
  </div>
</template>

<script>
import HelloCard from './commons/HelloCard'

const user = {
  name: '张喽喽',
  postion: '建造者',
  id: '0192'
}
const building = {

}

export default {
  name: 'HelloPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user,
      toPos: { x: 0, y: 0 },
      pos: { x: 0, y: 0 },
      boundingInfo: null
    }
  },
  mounted () {
    requestAnimationFrame(this.render)
    window.addEventListener('resize', () => {
      this.boundingInfo = this.$el.getBoundingClientRect()
    })
    this.boundingInfo = this.$el.getBoundingClientRect()
    this.$el.addEventListener('mousemove', (e) => {
      const x = e.pageX - this.boundingInfo.width / 2
      const y = e.pageY - this.boundingInfo.height / 2
      this.toPos = {
        x: -x / 20,
        y: -y / 20
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
  position relative
.center
  position absolute
  top 50%
  left 50%
  transform translate3d(-50%, -50%, 0)
.left-1
  position absolute
  top 50%
  left 50%
  transform translate3d(-160%, -105%, 0)
.left-2
  position absolute
  top 50%
  left 50%
  transform translate3d(-160%, 5%, 0)
.move-bg
  width 100%
  height 100%
.logo
  width 300px
  position absolute
  top 50%
  left 50%
  transform translate3d(60%, 72px, 0)
.user
  position fixed
  top 50%
  left 0
  width 120px
  height 120px
  transform translate3d(0, -50%, 0)
  background-color #1B0033
  box-shadow 0 2px 16px #0008
  color #FFF
  text-align center
  box-sizing border-box
  padding 24px
  z-index 99
  cursor pointer
  .name
    line-height 22px
    font-size 16px
    margin 0 0 14px
  .posi, .id
    line-height 18px
    font-size 12px
    margin 0
.ranking
  position fixed
  top 50%
  right 0
  width 120px
  height 120px
  transform translate3d(0, -50%, 0)
  background-color #1B0033
  box-shadow 0 2px 16px #0008
  color #FFF
  text-align center
  box-sizing border-box
  padding 24px
  z-index 99
  line-height 72px
  cursor pointer
</style>
