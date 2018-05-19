<template>
  <div class="box">
    <div class="logo">
      <img width="141" height="29" :src="require('@/assets/logo_white.png')" alt="logo">
    </div>
    <div class="head"></div>
    <div class="planet" @click="projects" :class="{'on': this.$route.name === 'HelloPage'}" >Projects Ranking</div>
    <div class="hunter" @click="hackers" :class="{'on': this.$route.name === 'Hunter'}">Hackers Ranking</div>
  </div>
</template>

<script>
export default {
  name: 'Fringe',
  methods: {
    projects () {
      this.$router.push('/')
    },
    hackers () {
      this.$router.push('/hackers')
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  position absolute
  left 30.1%
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
