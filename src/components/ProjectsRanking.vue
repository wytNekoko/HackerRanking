<template>
  <div class="hello">
    <img class="bg" :src="require('@/assets/4.png')">
    <div class="loading" v-if="!projects"><span>Loading...</span></div>
    <div class="ctn-box">
      <div class="inline">
        <h4>Projects Ranking</h4>
        <h4>Project</h4>
        <h4>Total Gift</h4>
      </div>
      <div class="size" v-bar="{ preventParentScroll: true, scrollThrottle: 30,}" > <!-- el1  -->
        <div class="display"> <!-- el2 -->
          <!-- your scrollable content -->
          <li v-for="item in projects" @click="view(item)">
            <p>{{item.rank}}</p>
            <p>{{item.name}}</p>
            <p>{{item.dust_num}}</p>
            <p>{{item.keywords}}</p>
            <div class="btn">invest</div>
          </li>
        </div>
        <!-- dragger will be automatically added here -->
      </div>
    </div>
    <feedback v-if="feedbackIsOpen" @closeFeedback="closeFeedback"></feedback>
    <tool-bar @feedback="openFeedback"></tool-bar>
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
      projects: []
    }
  },
  created () {
    api.planet_list().then((res) => {
      // console.log(res)
      this.projects = res.data
    })
  },
  methods: {
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
      text-align center
      color white
      >li
        line-height 40px
        border-bottom 1px solid rgba(255,255,255,0.20);
      p
        font-size 12px
      .btn
        width 100px
        height 35px
        font-size 12px
        line-height 1.5
        border-radius 5px
        background-color #2e2828

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
