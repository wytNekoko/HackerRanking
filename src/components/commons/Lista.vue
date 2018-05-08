<template>
  <div class="lista">
    <div class="box">
      <p class="rank">Rank #{{orgData.rank}}</p>
      <h1 class="title">{{orgData.title}}</h1>
      <p class="intro">{{orgData.intro}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lista',
  props: ['dx', 'dy', 'orgData', 'show', 'window']

}
</script>

<style lang="stylus" scoped>
.lista
  position relative
  width 460px
  height 180px
  .box
    border-radius 8px
    background rgba(19,29,64,0.6)
    box-shadow: 0 3px 11px 0 rgba(0,0,0,0.20)
  .rank
    position absolute
    top 0
    right 0
    background rgba(43,45,81,0.8)
    text-align center
    font-size 16px
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20)
  .title
    font-family: Ubuntu-Medium
    font-size: 27.01px
    color: #FFFFFF
    letter-spacing: 0
    line-height 31px

  .intro
    font-family: PingFangSC-Regular
    font-size: 14px
    color: #FFFFFF
    letter-spacing: 0
    line-height: 20px

</style>
