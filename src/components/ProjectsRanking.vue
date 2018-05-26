<template>
  <div class="hello">
    <img class="bg" :src="require('@/assets/4.png')">
    <div class="slogan" v-html="slogan"></div>
    <div class="loading" v-if="!projects"><span>Loading...</span></div>
    <div class="arrow-box" v-if="showHint">Do invest to share bonus</div>
    <div class="ctn-box">
      <div class="inline">
        <h4>Monthly Ranking</h4>
        <h4>Project</h4>
        <h4>Total Gift</h4>
        <h4>Keywords</h4>
      </div>
      <div class="size" v-bar="{ preventParentScroll: true, scrollThrottle: 30,}" > <!-- el1  -->
        <div> <!-- el2 -->
          <!-- your scrollable content -->
          <tr v-for="item in projects" :key="projects.indexOf(item)">
            <p v-if="projects.indexOf(item)<=9">+{{bonus[projects.indexOf(item)]}} Gift</p>
            <td @click="view(item)">{{item.rank}}</td>
            <td @click="view(item)">{{item.name}}</td>
            <td @click="view(item)">{{item.dust_num}}</td>
            <td @click="view(item)">{{item.keywords}}</td>
            <div class="invest-btn" @click="invest(item.name)">Invest</div>
          </tr>
        </div>
        <!-- dragger will be automatically added here -->
      </div>
    </div>
    <div class="mask" v-if="buildIsOpen">
      <div class="build-card">
        <span class="close" @click="closeBuild">X</span>
        <h3>Amount of investment</h3>
        <input type="text" v-model="buildNum"><span class="dust">Gift</span>
        <div class="button" @click="confirmBuild()">Confirm</div>
      </div>
    </div>
    <div class="down-arrow" v-if="projects">
      <img v-if="projects.length>8" :src="require('@/assets/symbols-downarrow.png')" width="20" height="20">
    </div>
    <feedback v-if="feedbackIsOpen" @closeFeedback="closeFeedback"></feedback>
    <tool-bar @feedback="openFeedback" @got="got"></tool-bar>
  </div>
</template>

<script>
import api from '@/api'
import ToolBar from './commons/ToolBar'
import Feedback from './commons/Feedback'

export default {
  name: 'ProjectsRanking',
  components: { ToolBar, Feedback },
  data () {
    return {
      feedbackIsOpen: false,
      projects: null,
      showHint: true,
      buildIsOpen: false,
      buildNum: 10,
      investedName: null,
      bonus: [5000, 4000, 3000, 1500, 1500, 1000, 1000, 1000, 1000, 1000],
      slogan: 'Upload top project to win bonus. Invest potential project to share bonus.<br>The only way to get Gift which is the limited cryptocurrency.'
    }
  },
  created () {
    api.planet_list().then((res) => {
      // console.log(res)
      this.projects = res.data
    })
    // setTimeout(() => {
    //   this.showHint = false
    // }, 5000)
  },
  methods: {
    invest (name) {
      if (!window.cookieStorage.getItem('token')) {
        alert('Login required.')
        return
      }
      this.showHint = false
      this.buildIsOpen = true
      this.investedName = name
    },
    closeBuild () {
      console.log('close')
      this.buildIsOpen = false
    },
    confirmBuild () {
      const num = parseInt(this.buildNum, 10)
      console.log(num)
      if (!num) {
        alert('Invalid number')
        this.buildNum = 10
        return
      }
      if (num < 1) {
        alert('At least 1 dust')
        this.buildNum = 1
        return
      }
      this.buildNum = num
      if (!this.investedName) {
        alert('error')
      }
      api.build(this.investedName, num).then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else {
          alert('Invest success')
          this.buildIsOpen = false
        }
        this.investedName = null
      })
    },
    got () {
      console.log('got')
      this.$emit('got')
    },
    openFeedback () {
      this.feedbackIsOpen = true
    },
    closeFeedback () {
      this.feedbackIsOpen = false
    },
    view (orgData) {
      this.$router.push({'name':'PlanetView', query:{name:orgData.name, rank:orgData.rank}})
    }
  }
}
</script>

<style lang="stylus" scoped>
.hello
  position absolute
  width 100%
  height 100%
  overflow hidden
  font-family Ubuntu
  color white
  .arrow-box
    position: absolute;
    top 21%
    right 4%
    background: rgba(255,255,255,0.8);
    border-radius: 8px;
    height: 34px;
    width: 213px;
    line-height: 2.2;
    text-align: center;
    color: black;
    font-size 15px
    &:after
      top: 100%;
      left: 50%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      border-color: rgba(255, 255, 255, 0);
      border-top-color: rgba(255,255,255,0.8);
      border-width: 6px;
      margin-left: -30px;
  .hint-invest
    position absolute
    top 20%
    right 4%
    width 200px
    height 40px
    background-color rgba(255,255,255,0.5)
    color black
    text-align center
    line-height 2.5
    border-radius 8px
  .loading
    position absolute
    top 50%
    left 45%
    span
      font-size 40px
      text-align center
      color rgba(255,255,255,0.6)
  .down-arrow
    position absolute
    top 85%
    left 47%
    animation twinkling 1s infinite ease-in-out
  .ctn-box
    position absolute
    top 18%
    left 10%
    height 65%
    width 80%
    overflow hidden
    table-layout automatic
    .inline
      display flex
      margin-left 8%
      h4
        margin-right 12%
        &:first-child
          margin-right 8%
        &:last-child
          margin-left 5%
    .size
      height 90%
      width 100%
      p
        color red
        margin-right 0.05%
      td
        border-bottom 1px solid rgba(255,255,255,0.20);
        cursor pointer
        width 24%
        font-size 16px
        line-height 3
        text-align center
        &:first-of-type
          width 10%
        &:nth-child(4)
          width 10%
        &:last-of-type
          text-align center
          width 35%
      .invest-btn
        text-align center
        margin-left 1%
        width: 100px
        height: 35px
        line-height: 2;
        background #4D9003
        border-radius 5px
        color white
        cursor pointer
  .slogan
    position absolute
    left: 20%;
    top: 70px;
    width: 60%;
    height: 10%;
    font-size: 20px;
    text-align: center
    color rgba(255,255,255,0.5)
  .bg
    width 100%
    height 100%
  .build-card
    width 400px
    background-image linear-gradient(45deg, rgba(105,157,0,0.9) 0%, rgba(67,128,0, 0.9) 100%);
    border-radius 8px
    position absolute
    top 50%
    left 50%
    transform translate3d(-50%, -50%, 0)
    text-align center
    padding 40px
    box-sizing border-box
    font-size 16px
  input
    border none
    text-align center
    margin-right 10px
    width 140px
    height 50px
    background-color fbga(255,255,255,0.6)
    border-radius 10px
    outline none
    box-sizing border-box
    padding 0 30px
    font-size 18px
  h3
    font-size 24px
    margin 24px 0
  .close
    position absolute
    top 15px
    right 20px
    font-size 14px
    cursor pointer
  .button
    width 184px
    height 50px
    background rgba(105,157,0,1)
    color white
    border-radius 10px
    line-height 50px
    text-align center
    cursor pointer
    margin 30px auto 0
    font-family Ubuntu-Medium
.mask
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  background-color #000A
  z-index 80
.vb
  & > .vb-dragger
    z-index 5
    width 12px
    right 0
    & > .vb-dragger-styler
      -webkit-backface-visibility hidden
      backface-visibility hidden
      -webkit-transform rotate3d(0,0,0,0)
      transform rotate3d(0,0,0,0)
      -webkit-transition background-color 100ms ease-out,
      margin 100ms ease-out,
      height 100ms ease-out
      transition background-color 100ms ease-out,
      margin 100ms ease-out,
      height 100ms ease-out
      background-color rgba(48, 121, 244,.1)
      margin 5px 5px 5px 0
      border-radius 20px
      height calc(100% - 10px)
      display block
    &:hover
      & > .vb-dragger-styler
        background-color rgba(48, 121, 244,.5)
        margin 0px
        height 100%
  &.vb-scrolling-phantom
    & > .vb-dragger
      & > .vb-dragger-styler
        background-color rgba(48, 121, 244,.3)
  &.vb-dragging
    & > .vb-dragger
      & > .vb-dragger-styler
        background-color rgba(48, 121, 244,.5)
        margin 0px
        height 100%
@keyframes twinkling
  0%
    opacity:0
  100%
    opacity:1
</style>
