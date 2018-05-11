<template>
  <div class="lista"  @click="viewPlanet">
    <div class="box">
      <div class="rank"><span>Rank #{{orgData.rank}}</span></div>
      <h1 class="title">{{orgData.name}}</h1>
      <p class="intro">{{orgData.description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lista',
  props: ['orgData', 'show'],
  methods: {
    viewPlanet () {
      console.log('sent')
      this.$emit('view', this.orgData)
    }
  }
}
</script>

<style lang="stylus" scoped>
.lista
  position relative
  margin-bottom 15px
  margin-right 15px
  cursor pointer
  .box
    width 460px
    height 180px
    border-radius 8px
    background rgba(19,29,64,0.6)
    box-shadow: 0 3px 11px 0 rgba(0,0,0,0.20)
  .rank
    margin 0 0 0 349px
    background rgba(43,45,81,0.8)
    width 111px
    height 51px
    text-align center
    font-size 16px
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20)
    border-top-right-radius 8px
    span
      line-height 3
  .title
    font-family: Ubuntu-Medium
    font-size: 27.01px
    color: #FFFFFF
    letter-spacing: 0
    line-height 31px
    margin-top -20px
    margin-left 30px
    margin-right 30px
  .intro
    font-family: PingFangSC-Regular
    font-size: 14px
    color: #FFFFFF
    letter-spacing: 0
    line-height: 20px
    margin-left 30px
    margin-right 30px
    overflow hidden
    height 80px
</style>
