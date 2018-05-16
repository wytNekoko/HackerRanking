<template>
  <div class="poster" >
    <div class="reward">{{post.company_name}}</div>
    <p class="title">{{post.name}}</p>
    <!--<p>{{post.description}}</p>-->
  </div>
</template>

<script>
export default {
  name: 'Poster',
  props: ['post']
}
</script>

<style lang="stylus" scoped>
.poster
  position relative
  width 265px
  height 250px
  background rgba(27,23,22,0.6)
  box-shadow 0 3px 12px 0 rgba(0,0,0,0.20)
  border-radius 5.84px
  margin-right 20px
  margin-bottom 20px
  .reward
    position absolute
    top 0
    height 13.4%
    width 100%
    background rgba(29,22,19,0.8)
    font-size 10px
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
