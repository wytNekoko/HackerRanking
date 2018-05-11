<template>
  <div class="bar">
    <div class="post" @click="togglePost"><span>Post a reward</span></div>
    <div class="rank" @click="rank">
      <img class="icon" width="40%" height="40%" :src="require('@/assets/symbols-ranking.png')">
      <p class="text">Ranking</p>
    </div>
    <div class="feedback" @click="feedback">
      <img class="icon" width="40%" height="40%" :src="require('@/assets/symbols-feedback.png')">
      <p class="text">Feedback</p>
    </div>
    <div class="help" @click="help">
      <img class="icon" width="40%" height="40%" :src="require('@/assets/symbols-help.png')">
      <p class="text">Help</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BountyBar',
  methods: {
    togglePost () {
      this.$emit('post')
    },
    rank () {
      this.$router.push('/ranking/hunters')
    },
    feedback () {
      this.$emit('feedback')
    },
    help () {
      this.$emit('help')
    }
  }
}
</script>

<style lang="stylus" scoped>
.bar
  position fixed
  top 87.875%
  left 30%
  width 611px
  height 78.9px
  background linear-gradient(142deg, rgba(48,59,70,0.95) 47%, rgba(78,46,46,0.94) 99%)
  border: 0.3px solid rgba(255,255,255,0.35);
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.50);
  border-radius: 3.94px;
  color white
  cursor pointer
  .post
    position absolute
    left 0
    width 340px
    height 100%
    font-family Ubuntu-Medium
    font-size 20px
    color white
    border-right 0.3px solid rgba(255,255,255,0.35);
    span
      position absolute
      left 30%
      top 35.48%
  .rank
    position absolute
    left 340.3px
    width 86.8px
    height 100%
    border-right 0.3px solid rgba(255,255,255,0.35);
    .icon
      position absolute
      left 30%
      top 17%
    .text
      position absolute
      left 30%
      top 55%
      font-family Ubuntu-Medium
      font-size 10px
      text-shadow: 0 2px 2px #000000;
  .feedback
    position absolute
    left: 437.4px
    width 86.8px
    height 78.9px
    .icon
      position absolute
      left 30%
      top 17%
    .text
      position absolute
      left 23%
      top 55%
      font-family: Ubuntu-Medium;
      font-size: 10px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-shadow: 0 2px 2px #000000;
  .help
    position absolute
    left: 520px
    width 86.8px
    height 78.9px
    .icon
      position absolute
      left 30%
      top 17%
    .text
      position absolute
      left 38%
      top 55%
      font-family: Ubuntu-Medium;
      font-size: 10px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-shadow: 0 2px 2px #00000
</style>
