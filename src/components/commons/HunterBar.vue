<template>
  <div class="box" @click="toggleHunter">
    <img class="icon" width="55" height="40" :src="require('@/assets/symbols-hunter.png')" alt="">
    <span class="slogan">Bounty Hunter Mission</span>
  </div>
</template>

<script>
export default {
  name: 'HunterBar',
  methods: {
    toggleHunter () {
      this.$router.push('/hunter')
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  position fixed
  right -27.8px
  top 87.5%
  z-index 1
  width 289.3px
  height 60px
  background-image: linear-gradient(142deg, rgba(48,59,70,0.95) 47%, rgba(78,46,46,0.94) 99%);
  border: 0.3px solid rgba(255,255,255,0.35);
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.50);
  border-radius: 3.94px;
  .icon
    position absolute
    left 5%
    top 15%
  .slogan
    position absolute
    left 27%
    top 40%
    font-size 14px
    font-family Allerta-Stencil
    color white
    text-align center
</style>
