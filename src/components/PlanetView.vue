<template>
  <div class="planet-view">
    <img class="bg" :src="require('@/assets/4.png')">
    <div class="back-btn">
      <img width="7px" height="12px" :src="require('@/assets/symbols-backarrow.png')">
      <span>Back to Galaxy</span>
    </div>
    <div class="main-box">
      <h1>{{pinfo.name}}</h1>
      <p>{{pinfo.description}}</p>
      <h3>Email</h3>
      <h5>{{pinfo.email}}</h5>
      <h3>Github url</h3>
      <h5>{{pinfo.github_url}}</h5>
      <h3>Demo url</h3>
      <h5>{{pinfo.demo_url}}</h5>
      <h3>Team information</h3>
      <p>{{pinfo.team_intro}}</p>
    </div>
    <div class="num-info">
      <!--<div class="num">{{pinfo.builder_num}}</div>-->
      <div class="num">0</div>
      <p>Builders</p>
      <div class="num">{{pinfo.dust_num}}</div>
      <p>Dusts</p>
      <!--<div class="num">#{{pinfo.rank}}</div>-->
      <div class="num">#0</div>
      <p>Rank</p>
    </div>
    <div class="build-btn"></div>
    <div class="spy-btn"></div>
    <div class="next"></div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'PlanetView',
  data () {
    return {
      pinfo: null
    }
  },
  created () {
    // router.push({path:'/planet-view', query:{'thisname':'private',''nextname':''}})
    api.planets_one(this.$route.query.name).then((res) => {
      const d = res.data
      if (d.errcode) {
        alert(d.errmsg)
      } else {
        this.pinfo = d
      }
    })
  },
  methods: {
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
  }
}
</script>

<style lang="stylus" scoped>
.planet-view
  position absolute
  width 100%
  height 100%
  overflow hidden
  font-family Ubuntu-Medium
  color white
  .bg
    width 100%
    height 100%
  .back-btn
    position absolute
    left 5%
    top 17.5%
    width 10%
    height 5%
    background rgba(43,45,81,0.8)
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
    border-radius: 4px;
    display flex
    img
      position absolute
      left 12%
      top 40%
    span
      position absolute
      left 12%
      top 35%
      font-size 14px
      color white
      line-height 14px
  .main-box
    background rgba(43,45,81,0.8)
    position absolute
    left 16.4%
    top 17.5%
    width 44.3%
    height 75%
    font-family PingFangSC-Medium
    h1
      margin 10% 10% 6% 10%
      font-size 24px
    h3
      color #9B9B9B
      font-size 14px
      margin 5% auto 2% 10%
    h5
      font-size 14px
      margin-left 10%
    p
      font-size 14px
      line-height 21px
  .num-info
    position absolute
    left 64%
    top 17.5%
    width 10%
    height 32.5%
    background rgba(43,45,81,0.8)
    .num

</style>
