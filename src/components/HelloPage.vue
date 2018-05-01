<template>
  <div class="hello">
    <div class="move-bg" :style="{'transform': `translate3d(${pos.x}px, ${pos.y}px ,0)`}">
      <hello-card v-for="item in building" :key="item.index"
        :window="windowInfo"
        :dx="pos.x"
        :dy="pos.y"
        :orgData="item"
        v-on:childView="view(item)" v-on="$listeners"
      ></hello-card>
      <div class="logo">
        <img :style="{
          'transform': `translate3d(${-pos.x * 0.1}px, ${-pos.y * 0.1}px ,0)`
        }" width="300" :src="require('@/assets/symbols-logo.png')" alt="logo">
      </div>
    </div>
    <div class="build-button build-num" @click.self="getDust">
      Get Dust
      <div class="build-num-plus" :class="{'build-num-plus-active': numActive}">+88</div>
    </div>
    <div class="build-button build-new" @click="setUp">Set up a new planet</div>
  </div>
</template>

<script>
import api from '@/api'
import HelloCard from './commons/HelloCard'

export default {
  name: 'HelloPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      lastPos: { x: 0, y: 0 },
      toPos: { x: 0, y: 0 },
      pos: { x: 0, y: 0 },
      boundingInfo: null,
      building: [],
      planets: [],
      numActive: false,
      planetsPos: 0,
      countIndex: 0,
      windowInfo: { w: 0, h: 0 },
      timer: 0,
      checkPlanetsTimer: 0
    }
  },
  created () {
    api.planets_show().then((res) => {
      this.planets = res.data
    })
  },
  mounted () {
    requestAnimationFrame(this.render)
    window.addEventListener('resize', this.onwindowresize)
    this.onwindowresize()
    this.$el.addEventListener('mousedown', (e) => {
      this.lastPos.x = e.pageX
      this.lastPos.y = e.pageY
      this.$el.addEventListener('mousemove', this.onmousemove)
    })
    this.$el.addEventListener('mouseup', () => {
      this.$el.removeEventListener('mousemove', this.onmousemove)
    })
    this.$el.addEventListener('mouseleave', () => {
      this.$el.removeEventListener('mousemove', this.onmousemove)
    })
    this.checkPlanetsList()
  },
  methods: {
    onwindowresize () {
      this.windowInfo = {
        w: window.innerWidth,
        h: window.innerHeight
      }
      this.boundingInfo = this.$el.getBoundingClientRect()
      this.checkPlanetsList()
    },
    onmousemove (e) {
      e.preventDefault()
      const x = e.pageX - this.lastPos.x
      const y = e.pageY - this.lastPos.y
      this.lastPos = {
        x: e.pageX,
        y: e.pageY
      }
      this.toPos.x += x
      this.toPos.y += y
    },
    checkPlanetsList () {
      console.log(1)
      const hw = this.boundingInfo.width / 2
      const hh = this.boundingInfo.height / 2
      const minX = Math.floor((150 - this.pos.x - hw) / 340)
      const maxX = Math.ceil((hw - this.pos.x - 150) / 340)
      const minY = Math.floor((-this.pos.y - hh) / 480)
      const maxY = Math.ceil((-this.pos.y + hh) / 480)
      const temp = {}
      for (let x = minX; x <= maxX; x += 1) {
        temp[x] = {}
        for (let y = minY; y <= maxY; y += 1) {
          if (!(x === 1 && y === 1) && !((x % 2) && y === 0)) {
            temp[x][y] = false
          }
        }
      }
      for (let i = 0; i < this.building.length; i += 1) {
        const item = this.building[i]
        const x = item.x
        const y = item.y
        if (temp[x] === undefined || temp[x][y] === undefined) {
          this.building.splice(i, 1)
          i -= 1
        } else {
          temp[x][y] = true
        }
      }
      for (let x = minX; x <= maxX; x += 1) {
        for (let y = minY; y <= maxY; y += 1) {
          if (temp[x][y] === false) {
            const newPlanet = this.planets[this.planetsPos]
            this.planetsPos += 1
            this.countIndex += 1
            if (this.planetsPos >= this.planets.length) {
              this.planetsPos = 0
            }
            if (newPlanet) {
              const data = {
                index: this.countIndex,
                x,
                y,
                title: newPlanet.name,
                intro: newPlanet.description,
                rank: 0,
                git: newPlanet.git,
                demo: newPlanet.demo,
                team: newPlanet.team,
                time: newPlanet.created_at
              }
              this.building.push(data)
            } else {
              this.building.push({
                index: this.countIndex,
                x,
                y,
                title: `x:${x} y:${y}`
              })
            }
          }
        }
      }
    },
    render (timer) {
      let isMove = false
      const dx = this.toPos.x - this.pos.x
      if (Math.abs(dx) > 0.1) {
        this.pos.x += dx * 0.05
        isMove = true
      }
      const dy = this.toPos.y - this.pos.y
      if (Math.abs(dy) > 0.1) {
        this.pos.y += dy * 0.05
        isMove = true
      }
      if (isMove) {
        const dt = Math.min(timer - this.timer, 100)
        this.checkPlanetsTimer += dt
        if (this.checkPlanetsTimer > 200) {
          this.checkPlanetsTimer -= 200
          this.checkPlanetsList()
        }
        this.timer = timer
      }
      requestAnimationFrame(this.render)
    },
    getDust () {
      api.get_dust().then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else if (parseInt(d, 10)) {
          this.numActive = true
          setTimeout(() => {
            this.numActive = false
          }, 1000)
        } else {
          alert(d)
        }
      })
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
  cursor pointer
.build-new
  top 106px
  background-color #62B100
  cursor pointer
.build-num-plus
  position absolute
  line-height 50px
  top 0
  right -60px
  color #FF0082
  font-size 30px
  opacity 0
  transform translate3d(0, 10px, 0)
.build-num-plus-active
  opacity 1
  transform translate3d(0, 0, 0)
  transition .6s
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
