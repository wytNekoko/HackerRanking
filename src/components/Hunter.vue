<template>
 <div class="bg">
  <img class="stretch" :src="require('@/assets/3.png')">
   <!--<div class="mask"></div>-->

  <div class="mainbox">
    <!--<span class="subtitle">Bounty Hunter</span>-->
    <span class="title1">Claim a Mission</span>
    <span class="title2">Get Dusts Reward</span>
  </div>
  <div class="blackbox" >
    <div class="reward">DoraDust</div>
    <p class="title">DoraDust</p>
  </div>
   <div class="ctn-box">
     <poster v-for="item in poster" :post="item"></poster>
   </div>
   <bounty-bar @feedback="feedback" @help="help" @post="openPost"></bounty-bar>
   <feedback v-if="openFeedback" @closeFeedback="closeFeedback"></feedback>
   <help v-if="openHelp" @closeHelp="closeHelp"></help>
 </div>
</template>

<script>
import api from '@/api'
import Feedback from './commons/Feedback'
import Help from './commons/Help'
import Poster from './commons/Poster'
import BountyBar from './commons/BountyBar'

export default {
  name: 'Hunter',
  components: { Feedback, Help, Poster, BountyBar },
  data () {
    return {
      openFeedback: false,
      openHelp: false,
      poster: []
    }
  },
  created () {
    api.bounty_show().then((res) => {
      console.log(res.data)
      this.poster = res.data
    })
  },
  methods: {
    openPost () {
      if (!window.cookieStorage.getItem('token')) {
        alert('Login required')
      } else {
        this.$router.push('/post-reward')
      }
    },
    feedback () {
      this.openFeedback = true
    },
    help () {
      this.openHelp = true
    },
    closeFeedback () {
      this.openFeedback = false
    },
    closeHelp () {
      this.openHelp = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.bg
  position absolute
  left 0
  top 0
  width 100%
  height 100%
  font-family Ubuntu-Medium
  .stretch
    width 100%
    height 100%
    opacity 0.5
  .ctn-box
    position absolute
    top 52%
    left 16.5%
    width 950px
    height 50%
    display flex
    flex-wrap wrap
  .mainbox
    position absolute
    top 15%
    left 16.5%
    width 550px
    height 250px
    background linear-gradient(135deg, rgba(6,46,87,0.95) 0%, rgba(90,69,83,0.69) 53%, rgba(107,46,46,0.94) 100%),url(../assets/bg-hunter.jpg) no-repeat
    background-size 100% 100%
    box-shadow: 0 3px 12px 0 rgba(0,0,0,0.20);
    border-radius: 5.84px;
    text-align: center;
    .subtitle
      position absolute
      top 27.7%
      left 35%
      font-family: Allerta-Stencil;
      font-size: 20px;
      color: #FFFFFF;
      letter-spacing: 0;
    .title1
      position absolute
      top 30%
      left 27.4%
      font-family Ubuntu-Medium
      font-size 35px
      color white
    .title2
      position absolute
      top 50%
      left 24%
      font-family Ubuntu-Medium
      font-size 35px
      color white
.blackbox
  position absolute
  left 61%
  top 15%
  width 265px
  height 250px
  background rgba(27,23,22,0.6)
  box-shadow 0 3px 12px 0 rgba(0,0,0,0.20)
  border-radius 5.84px
  .reward
    position absolute
    top 0
    height 13.4%
    width 100%
    background rgba(29,22,19,0.8)
    font-size 14px
    color white
    border-top-left-radius: 5.84px
    border-top-right-radius: 5.84px
    text-align center
    line-height 3
  .title
    position absolute
    top 12%
    left 6.7%
    text-align left
    font-size 20px
    color white
</style>
