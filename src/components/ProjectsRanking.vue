<template>
  <div class="hello">
    <img class="bg" :src="require('@/assets/4.png')">
    <div class="loading" v-if="!projects"><span>Loading...</span></div>
    <table class="ctn-box">
      <tr class="inline">
        <h4>Ranking</h4>
        <h4>Project</h4>
        <h4>Total Gift</h4>
        <h4>Keywords</h4>
      </tr>
      <div class="size" v-bar="{ preventParentScroll: true, scrollThrottle: 30,}" > <!-- el1  -->
        <div> <!-- el2 -->
          <!-- your scrollable content -->
          <tr v-for="item in projects" :key="projects.indexOf(item)" @click="view(item)" class="display">
            <!--<p class="rank">{{item.rank}}</p>-->
            <!--<p class="name">{{item.name}}</p>-->
            <!--<p class="gift">{{item.dust_num}}</p>-->
            <!--<p class="keywords">{{item.keywords}}</p>-->
            <p>{{item.rank}}</p>
            <p>{{item.name}}</p>
            <span>{{item.dust_num}}</span>
            <span>{{item.keywords}}</span>
          </tr>
        </div>
        <!-- dragger will be automatically added here -->
      </div>
    </table>
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
    height 600px
    width 1000px
    overflow hidden
    table-layout automatic
    .inline
      display flex
      h4
        margin-right 120px
    .size
      height 600px
      width 800px
    .display
      display -webkit-flex
      display flex
      text-align center
      color white
      line-height 40px
      border-bottom 1px solid rgba(255,255,255,0.20);
      cursor pointer
      overflow hidden
      p
        font-size 16px
        padding 0 120px 0 30px
        display table
      span
        line-height 4.5
        margin-right 80px
        /*
      .rank
        position relative
        left 30px
      .name
        position relative
        left 170px
      .gift
        position: relative;
        left: 300px;
        line-height: 4.5;
      .keywords
        position relative
        left 430px
        //line-height: 4.5;
        */
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
