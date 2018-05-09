<template>
 <div class="bg">
  <img class="stretch" :src="require('@/assets/bg-hunter.jpg')">
   <div class="mask"></div>
   <div class="mainbox">
     <span class="subtitle">Bounty Hunter</span>
     <span class="title1">Claim a Mission</span>
     <span class="title2">Get Dusts Reward</span>
   </div>
   <div class="blackbox" >
     <div class="reward"><span>300 Dusts Reward</span></div>
     <p class="title">DoraDust</p>
   </div>
   <div class="bar">
     <div class="post" @click="togglePost"><span>Post a reward</span></div>
     <div class="feedback" @click="feedBack">
       <img class="icon" width="40%" height="40%" :src="require('@/assets/symbols-feedback.png')">
       <p class="text">Feedback</p>
     </div>
     <div class="help" @click="help">
       <img class="icon" width="40%" height="40%" :src="require('@/assets/symbols-help.png')">
       <p class="text">Help</p>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  name: 'Hunter',
  methods: {
    togglePost () {

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
  .mask
    width 100%
    height 100%
    background-color linear-gradient(180deg, rgba(88,66,101,0.83) 80%, rgba(76,37,37,0.71) 100%);
    z-index 0.5
  .mainbox
    position absolute
    top 17.5%
    left 16.5%
    width 44.3%
    height 37.5%
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
      top 41.3%
      left 27.4%
      font-family Ubuntu-Medium
      font-size 35px
      color white
    .title2
      position absolute
      top 56.3%
      left 24%
      font-family Ubuntu-Medium
      font-size 35px
      color white
  .blackbox
    position absolute
    left 62.1%
    top 17.5%
    width 21.4%
    height 37.5%
    background rgba(27,23,22,0.6)
    box-shadow: 0 3px 12px 0 rgba(0,0,0,0.20)
    border-radius: 5.84px
    .reward
      position absolute
      top 0
      height 13.4%
      width 100%
      background rgba(29,22,19,0.8)
      font-size 10px
      color white
      span
        position absolute
        left 35%
        top 32.5%
    .title
      position absolute
      top 12%
      left 6.7%
      text-align left
      font-size 20px
      color white
  .bar
    position fixed
    top 87.875%
    left 34.7%
    width 36.6%
    height 9.86%
    background linear-gradient(142deg, rgba(48,59,70,0.95) 47%, rgba(78,46,46,0.94) 99%)
    border: 0.3px solid rgba(255,255,255,0.35);
    box-shadow: 0 2px 16px 0 rgba(0,0,0,0.50);
    border-radius: 3.94px;
    .post
      position absolute
      left 0
      width 66%
      height 100%
      font-family Ubuntu-Medium
      font-size 20px
      color white
      border-right 0.3px solid rgba(255,255,255,0.35);
      span
        position absolute
        left 30%
        top 35.48%
    .feedback
      position absolute
      left: 66%
      width 16.8%
      height 78.9px
      .icon
        position absolute
        left 30%
        top 17%
      .text
        position absolute
        left 23%
        top 55%
        //font-family: Ubuntu-Medium;
        font-size: 10px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-shadow: 0 2px 2px #000000;
    .help
      position absolute
      left: 82.8%
      width 16.8%
      height 78.9px
      .icon
        position absolute
        left 30%
        top 17%
      .text
        position absolute
        left 35%
        top 55%
        //font-family: Ubuntu-Medium;
        font-size: 10px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-shadow: 0 2px 2px #00000
</style>
