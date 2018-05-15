<template>
  <div class="hello">
    <img class="bg" :src="require('@/assets/4.png')">
    <div class="goto-rank">
      <p>Go to Rank:</p>
      <input type="text" v-model="toRank">
    </div>
    <div class="to-btn" @click="goto">
      <img width="10" height="10" :src="require('@/assets/symbols-rightarrow.png')">
    </div>
    <div class="loading" v-if="!planets"><span>Loading...</span></div>
    <div class="ctn-box">
      <div class="size" v-bar="{ preventParentScroll: true, scrollThrottle: 30,}" > <!-- el1   -->
        <div class="display"> <!-- el2 -->
        <!-- your scrollable content -->
        <!--<lista :orgData="test"></lista>-->
        <lista v-for="item in planets" :orgData="item" @view="view(item)"></lista>
        <!--@click="viewPlanet(item.name)"-->
        </div>
        <!-- dragger will be automatically added here -->
      </div>
    </div>
    <help v-if="helpIsOpen" @closeHelp="closeHelp"></help>
    <feedback v-if="feedbackIsOpen" @closeFeedback="closeFeedback"></feedback>
    <tool-bar :is-explore="false" :is-list="true" @feedback="openFeedback" @help="openHelp"></tool-bar>
  </div>
</template>

<script>
import api from '@/api'
import ToolBar from './commons/ToolBar'
import Feedback from './commons/Feedback'
import Help from './commons/Help'
import Lista from './commons/Lista'

export default {
  name: 'ListView',
  components: { ToolBar, Feedback, Lista, Help },
  data () {
    return {
      feedbackIsOpen: false,
      helpIsOpen: true,
      allplanets: [],
      planets: null,
      toRank: 1
    }
  },
  created () {
    api.planet_list().then((res) => {
      // console.log(res)
      this.allplanets = res.data
      this.planets = this.allplanets
    })
  },
  methods: {
    openFeedback () {
      this.feedbackIsOpen = true
    },
    closeFeedback () {
      this.feedbackIsOpen = false
    },
    openHelp () {
      console.log('open')
      this.helpIsOpen = true
    },
    closeHelp () {
      this.helpIsOpen = false
    },
    goto () {
      this.planets = this.allplanets.slice(this.toRank - 1)
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
  .bg
    width 100%
    height 100%
  .to-btn
    position absolute
    top 90px
    left 180px
    width 40px
    height 40px
    background-color rgba(43,45,81,0.8)
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20)
    border-radius: 2.92px
    img
      position absolute
      margin 15px
  .goto-rank
    position absolute
    top 90px
    left 63px
    height 40px
    width 107px
    background-color rgba(43,45,81,0.8)
    display flex
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
    border-radius: 2.92px;
    font-family Ubuntu
    p
      font-size 10px
      margin 14px auto 10px 10px
    input
      margin-right 5px
      margin-top 4px
      background-color rgba(41,39,55,1)
      border 0
      border-radius 2.19px
      width 30px
      height 30px
      color rgba(255,255,255,0.2)
      line-height 14px
      text-align center
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
