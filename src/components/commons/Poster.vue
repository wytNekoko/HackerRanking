<template>
  <div class="blackbox" >
    <div class="reward"><span>{{post.reward}} Dusts Reward</span></div>
    <p class="title">{{post.name}}</p>
  </div>
</template>

<script>
export default {
  name: 'Poster',
  props: ['post']
}
</script>

<style lang="stylus" scoped>
// TODO debug for import error
.blackbox
  position relative
  width 300px
  height 300px
//  left 62.1%
//  top 17.5%
//  width 21.4%
//  height 37.5%
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

</style>
