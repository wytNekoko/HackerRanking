<template>
  <div class="hello">
    <img class="bg" :src="require('@/assets/4.png')">
    <div class="slogan" v-html="hint"></div>
    <div class="loading" v-if="!hackers"><span>Loading...</span></div>
    <div class="ctn-box">
      <div class="inline">
        <h4>Ranking</h4>
        <h4>Hacker</h4>
        <h4>Own Projects</h4>
        <h4>Total Project Gift</h4>
      </div>
      <div class="size" v-bar="{ preventParentScroll: true, scrollThrottle: 30,}" > <!-- el1  -->
        <div> <!-- el2 -->
          <!-- your scrollable content -->
          <tr v-for="item in hackers" :key="hackers.indexOf(item)" @click="viewHacker(item)">
            <td>{{hackers.indexOf(item) + 1}}</td>
            <td>{{item.hacker}}</td>
            <td>{{item.project_num}}</td>
            <td>{{item.gift}}</td>
          </tr>
        </div>
        <!-- dragger will be automatically added here -->
      </div>
    </div>
    <div class="down-arrow">
      <img :src="require('@/assets/symbols-downarrow.png')" width="20" height="20">
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
  name: 'HackersRanking',
  components: { ToolBar, Feedback },
  data () {
    return {
      feedbackIsOpen: false,
      hackers: null,
      showHint: true,
      hint: 'Upload top project to win bonus. Invest potential project to share bonus.<br>The only way to get Gift which is the limited cryptocurrency.'
    }
  },
  created () {
    api.rank_hacker().then((res) => {
      // console.log(res)
      this.hackers = res.data
    })
    setTimeout(() => {
      this.showHint = false
    }, 3000)
  },
  methods: {
    got () {
      this.$emit('got')
    },
    openFeedback () {
      this.feedbackIsOpen = true
    },
    closeFeedback () {
      this.feedbackIsOpen = false
    },
    viewHacker (it) {
      this.$router.push({
        'name': 'HackerView', query: { name: it.hacker }
      })
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
  .down-arrow
    position absolute
    top 85%
    left 48%
    animation twinkling 1s infinite ease-in-out
  .loading
    position absolute
    top 50%
    left 45%
    span
      font-size 40px
      text-align center
      color rgba(255,255,255,0.6)
  .ctn-box
    position absolute
    top 130px
    left 20%
    height 65%
    width 80%
    overflow hidden
    .inline
      display flex
      h4
        margin-right 8%
        margin-left 4.5%
        &:last-child
          margin-left 10px
    .size
      height 100%
      width 100%
      td
        border-bottom 1px solid rgba(255,255,255,0.20);
        cursor pointer
        width 26.5%
        font-size 16px
        line-height 3
        text-align center
        &:first-child
          width 160px
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
