<template>
  <div class="box">
    <div class="logo">
      <img width="141" height="29" :src="require('@/assets/logoWhite.png')" alt="logo">
    </div>
    <div class="head"></div>
    <div class="planet" @click="goPlanets" :class="{'on': this.$route.name === 'HelloPage'}" >Planets</div>
    <div class="hunter" @click="goHunter" :class="{'on': this.$route.name === 'Hunter'}">Bounty Hunter</div>
  </div>
</template>

<script>
export default {
  name: 'Fringe',
  methods: {
    goPlanets () {
      this.$router.push('/')
    },
    goHunter () {
      this.$router.push('/Hunter')
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  position absolute
  left 32.2%
  display inline-flex
  .head
    width 498.4px
    height 60px
    z-index 3
    background-image linear-gradient(136deg, rgba(46,40,40,0.95) 0%, rgba(0,0,0,0.94) 100%)
    transform perspective(10px) rotateX(178.5deg)
    -webkit-transform perspective(10px) rotateX(178.5deg); /* Safari 3-8  */
    box-shadow 0 2px 16px 0 rgba(0,0,0,0.50)
    border-top-left-radius 23.38px
    border-top-right-radius 23.38px
  .planet
    position absolute
    color white
    font-family Allerta-Stencil
    font-size 14px
    top 25px
    left 240px
    z-index 5
    cursor pointer
    .on
      background: rgba(255,255,255,0.20);
      border-radius: 65px;
      width 100px
      height 30px
      z-index 4
  .hunter
    position absolute
    color white
    font-family Allerta-Stencil
    font-size 14px
    top 25px
    left 340px
    z-index 5
    cursor pointer
    .on
      background: rgba(255,255,255,0.20);
      border-radius: 65px;
      width 100px
      height 30px
      z-index 4
  .logo
    position absolute
    left 10%
    top 12px
    width 141px
    height 29px
    z-index 5


</style>
