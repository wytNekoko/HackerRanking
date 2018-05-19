<template>
  <div class="hello">
    <img class="bg" :src="require('@/assets/4.png')">
    <feedback v-if="feedbackIsOpen" @closeFeedback="closeFeedback"></feedback>
    <tool-bar @feedback="openFeedback"></tool-bar>
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
      hackers: []
    }
  },
  created () {
    api.rank_hacker().then((res) => {
      // console.log(res)
      this.hackers = res.data
    })
  },
  methods: {
    openFeedback () {
      this.feedbackIsOpen = true
    },
    closeFeedback () {
      this.feedbackIsOpen = false
    },
  }
}
</script>

<style lang="stylus" scoped>
.hello
  position absolute
  width 100%
  height 100%
  overflow hidden
  font-family Ubuntu-Medium
  color white
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
    top 90px
    left 230px
    .size
      height 750px
      width 950px
    .display
      display -webkit-flex
      display flex !important
      flex-wrap wrap !important
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
</style>
