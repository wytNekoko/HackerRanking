<template>
  <div class="hello">
    <img class="bg" :src="require('@/assets/4.png')">
    <div class="move-bg" :style="{'transform': `translate3d(${pos.x}px, ${pos.y}px ,0)`}">
      <hello-card v-for="item in building" :key="item.index"
        :window="windowInfo"
        :dx="pos.x"
        :dy="pos.y"
        :orgData="item"
        v-on:childView="view(item.name)" v-on="$listeners"
      ></hello-card>
    </div>
    <div class="mask" v-if="feedbackIsOpen">
      <div class="feedback-card">
        <h3>Feedback</h3>
        <input type="text"  v-model="feedbackInfo.email">
        <input type="text"  v-model="feedbackInfo.title">
        <div class="choice">
          <input type="checkbox" id="feedbackChoice1"
                 v-model="feedbackInfo.advice">
          <label for="feedbackChoice1">Advice</label>
          <input type="checkbox" id="feedbackChoice2"
                 v-model="feedbackInfo.cooperation">
          <label for="feedbackChoice2">Cooperation</label>
          <input type="checkbox" id="feedbackChoice3"
                 v-model="feedbackInfo.others">
          <label for="feedbackChoice3">Others</label>
        </div>
        <textarea rows="10" v-model="feedbackInfo.comment"></textarea>
        <div class="create-btn" @click="sendFeedback"><span>Send</span></div>
        <div class="quit-btn" @click="closeFeedback"><span>Quit and Delete</span></div>
      </div>
    </div>
    <tool-bar :is-explore="true" :is-list="false" @feedback="openFeedback" @help="openHelp"></tool-bar>
  </div>
</template>

<script>
import api from '@/api'
import HelloCard from './commons/HelloCard'
import ToolBar from './commons/ToolBar'

export default {
  name: 'HelloPage',
  data () {
    return {
      lastPos: { x: 0, y: 0 },
      toPos: { x: 0, y: 0 },
      pos: { x: 0, y: 0 },
      feedbackIsOpen: false,
      feedbackInfo: {
        email: ' Your Email Address',
        title: ' Title',
        advice: false,
        cooperation: false,
        others: false,
        comment: ' Comment text'
      },
      helpIsOpen: false,
      boundingInfo: null,
      building: [],
      planets: [],
      planetsPos: 0,
      countIndex: 0,
      windowInfo: { w: 0, h: 0 },
      timer: 0,
      checkPlanetsTimer: 0
    }
  },
  created () {
    api.planet_all().then((res) => {
      this.planets = res.data.records
      this.checkPlanetsList(true)
    })
  },
  mounted () {
    requestAnimationFrame(this.render)
    window.addEventListener('resize', this.onwindowresize)
    this.onwindowresize()
    this.$el.addEventListener('mousedown', (e) => {
      this.$el.style.cursor = 'pointer'
      this.lastPos.x = e.pageX
      this.lastPos.y = e.pageY
      this.$el.addEventListener('mousemove', this.onmousemove)
    })
    this.$el.addEventListener('mouseup', () => {
      this.$el.style.cursor = 'default'
      this.$el.removeEventListener('mousemove', this.onmousemove)
    })
    this.$el.addEventListener('mouseleave', () => {
      this.$el.style.cursor = 'default'
      this.$el.removeEventListener('mousemove', this.onmousemove)
    })
    this.checkPlanetsList()
  },
  methods: {
    openFeedback () {
      console.log('working')
      this.feedbackIsOpen = true
    },
    sendFeedback () {
      // TODO
      // this.feedbackIsOpen = false
    },
    closeFeedback () {
      this.feedbackIsOpen = false
    },
    openHelp () {
      this.helpIsOpen = true
    },
    closeHelp () {
      this.helpIsOpen = false
    },
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
    checkPlanetsList (clearAll) {
      if (clearAll) {
        this.building = []
      }
      const hw = this.boundingInfo.width / 2
      const hh = this.boundingInfo.height / 2
      const minX = Math.floor((150 - this.pos.x - hw) / 340)
      const maxX = Math.ceil((hw - this.pos.x - 150) / 340)
      const minY = Math.floor((-this.pos.y - hh + minX * 80) / 440)
      const maxY = Math.ceil((-this.pos.y + hh + maxX * 80) / 440)
      const temp = {}
      for (let x = minX; x <= maxX; x += 1) {
        temp[x] = {}
        for (let y = minY; y <= maxY; y += 1) {
          temp[x][y] = false
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
                time: this.getLeft(newPlanet.created_at)
              }

              this.building.push(data)
            } else {
              this.building.push({
                index: this.countIndex,
                x,
                y,
                // title: `x:${x} y:${y}`
                title: '...'
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
    },
    getLeft (ctime) {
      const now = new Date()
      const s = ctime.substring(0,10)
      const start = new Date(s)
      const delta = 30*24*3600*1000
      const end = start.getTime() + delta
      const left = new Date(end - now.getTime())
      if (left < 0) {
        return 0
      }
      return (left / (3600 * 1000 * 24)).toFixed(1)
    }
  },
  components: {
    HelloCard,
    ToolBar
  }
}
</script>

<style lang="stylus" scoped>
.hello
  position absolute
  width 100%
  height 100%
  overflow hidden
  .bg
    width 100%
    height 100%
  .feedback-card
    position absolute
    top 98px
    left 52%
    transform translate3d(-50%, 0, 0)
    width 778px
    height 550px
    background-color rgba(35,39,53,1)
    border-radius 4px
    transition 0.8s
    .choice
      display flex
      margin 15px  370px 10px 84px
      >label
        color white
        margin-top 8px
        margin-left 15px
        margin-right 80px
      >input
        margin 10px 0
        background-color rgba(255,255,255,0.11)
    >input
      height 40px
      width 80%
      background: rgba(0,0,0,0.57);
      border-radius: 3px;
      border 0
      font-size 14px
      color rgba(255,255,255,0.30)
      text-align justify
      margin 15px 76px 5px 78px
    textarea
      width 80%
      background: rgba(0,0,0,0.57);
      border-radius: 3px;
      border 0
      font-size 14px
      color rgba(255,255,255,0.30)
      margin 10px 76px 25px 78px
      text-align justify
    h3
      margin 40px 344px 15px 344px
      font-size 20px
      color white
    .create-btn
      position absolute
      left 81px
      width 160px
      height 40px
      background-color rgba(255,113,62,0.8)
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
      border-radius: 5.84px;
      cursor pointer
      span
        position absolute
        top 30%
        left 40%
        color white
        font-size 14px
        text-align center
    .quit-btn
      position absolute
      left 281px
      width 160px
      height 40px
      //margin 459px 37px 59px 281px
      background-color rgba(103,104,131,0.8)
      color white
      font-size 14px
      font-family Ubuntu-Medium
      text-align center
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
      border-radius: 5.84px;
      cursor pointer
      span
        position absolute
        top 30%
        left 18%
        color white
        font-size 14px
        text-align center
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
  position absolute
  top 0
  left 0
  &>div
    position absolute
    top 50%
    left 50%
.mask
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  background-color #000A
  z-index 6

</style>
