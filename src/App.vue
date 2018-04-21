<template>
  <div id="app">
    <router-view/>
    <div class="user">
      <p class="name">{{user.name}}</p>
      <p class="posi">{{user.postion}}</p>
      <p class="id">No.{{user.id}}</p>
    </div>
    <div class="ranking">Ranking</div>
  </div>
</template>

<script>
const user = {
  name: 'Lowlow',
  postion: 'Builder',
  id: '0192'
}

export default {
  name: 'App',
  data () {
    return {
      user
    }
  }
}
</script>

<style lang="stylus" scoped>
#app
  width 100vw
  height 100vh
  overflow hidden
.user
  position fixed
  top 50%
  left 0
  width 120px
  height 120px
  transform translate3d(0, -50%, 0)
  background-color #1B0033
  box-shadow 0 2px 16px #0008
  color #FFF
  text-align center
  box-sizing border-box
  padding 24px
  z-index 99
  cursor pointer
  .name
    line-height 22px
    font-size 16px
    margin 0 0 14px
  .posi, .id
    line-height 18px
    font-size 12px
    margin 0
.ranking
  position fixed
  top 50%
  right 0
  width 120px
  height 120px
  transform translate3d(0, -50%, 0)
  background-color #1B0033
  box-shadow 0 2px 16px #0008
  color #FFF
  text-align center
  box-sizing border-box
  padding 24px
  z-index 99
  line-height 72px
  cursor pointer
</style>
