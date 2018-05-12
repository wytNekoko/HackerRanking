<template>
  <div id="ranking">
    <img class="stretch" :src="require('@/assets/5.png')">
    <div class="center">
      <ul class="tables">
        <li>
          <div class="rank-title"><h2>Top Planets</h2></div>
          <ul class="list">
            <li class="no-data" v-if="planet.length === 0">loading...</li>
            <li style="cursor:pointer;" v-for="item in planet" :key="planet.indexOf(item)" @click="focus(item)">
              <span :class="{'name': planet.indexOf(item) < 3}">
              <!--<span class="name">-->
                {{planet.indexOf(item)+1}} {{item.name}}
              </span>
              <span class="dust">{{item.dust}}</span>
            </li>
          </ul>
        </li>
        <li>
          <div class="rank-title"><h2>Top Planet Owners</h2></div>
          <ul class="list">
            <li class="no-data" v-if="owner.length === 0">loading...</li>
            <li v-for="item in owner" :key="owner.indexOf(item)">
              <span :class="{'name': owner.indexOf(item) < 3}">
                {{owner.indexOf(item)+1}}  {{item.username}}
              </span>
              <span class="dust">{{item.dust}}</span>
            </li>
          </ul>
        </li>
        <li>
          <div class="rank-title"><h2>Top Builders</h2></div>
          <ul class="list">
            <li class="no-data" v-if="builder.length === 0">loading...</li>
            <li v-for="item in builder" :key="builder.indexOf(item)">
              <span :class="{'name': builder.indexOf(item) < 3}">
                {{builder.indexOf(item)+1}} {{item.username}}
              </span>
              <span class="dust">{{item.dust}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <feedback v-if="feedbackIsOpen" @closeFeedback="closeFeedback"></feedback>
    <tool-bar :is-explore="false" :is-list="false" @feedback="openFeedback" @help="openHelp"></tool-bar>
  </div>
</template>

<script>
import api from '@/api'
import ToolBar from "./commons/ToolBar";

export default {
  components: { ToolBar },
  name: 'Ranking',
  data () {
    return {
      planet: [],
      owner: [],
      builder: [],
      feedbackIsOpen: false,
      helpIsOpen: false,
    }
  },
  created () {
    api.rank_dashboards().then((res) => {
      const d = res.data
      if (d.errcode) {
        alert(d.errmsg)
      } else {
        this.planet = d.planets
        this.owner = d.owners
        this.builder = d.builders
      }
    })
  },
  methods: {
    focus (item) {
      this.$router.push({ 'name': 'PlanetView', query: { name: item.name}})
    },
    openFeedback () {
      this.feedbackIsOpen = true
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
  }
}
</script>

<style lang="stylus" scoped>
#ranking
  width 100%
  height 100%
  position absolute
  top 0
  left 0
  .stretch
    width 100%
    height 100%
    /*opacity 0.5*/

.center
  position absolute
  top 50%
  left 10%
  width 80%
  transform translate3d(0, -50%, 0)
.list
  margin 28px 40px
  font-size 20px
  color #B7B7B7
  li
    line-height 40px
    border-bottom 1px solid rgba(255,255,255,0.20);
  .name
    font-size 20px
    color white
  .dust
    color #B7B7B7
    float right

.tables
  width 100%
  margin auto
  >li
    width 30%
    margin-left 2.5%
    float left
    background-color rgba(27,23,22,0.6)
    box-shadow: 0 3px 12px 0 rgba(0,0,0,0.20);
    border-radius: 7px;
    height 571px
    .rank-title
      background-color rgba(29,22,19,0.8)
      border-top-right-radius 7px
      border-top-left-radius 7px
      height 60px
      h2
        font-size 25px
        margin 0 0 20px
        text-align center
        color white
        line-height 2.4
  .no-data
    opacity 0.5
    text-align center

</style>
