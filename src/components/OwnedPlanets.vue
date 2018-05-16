<template>
  <div class="all">
    <img class="bg" :src="require('@/assets/2.png')">
    <div class="container">
      <img @click="back" width="40px" height="40px" :src="require('@/assets/symbols-backarrow.png')">
      <div class="content">
        <h1>Owned Planets</h1>
        <ul>
          <li v-for="item in setup" :key="setup.indexOf(item)">
            <span class="name">{{item.name}}</span>
            <span class="desc">{{item.description}}</span>
            <span class="desc">{{item.dust_num}} Dusts Collected</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'OwnedPlantes',
  data() {
    return {
      setup: []
    }
  },
  created() {
    api.owned_planets().then((res) => {
      const d = res.data
      if (d.errcode) {
        alert(d.errmsg)
      } else {
        this.setup = d
      }
    })
  },
  methods: {
    back () {
      this.$router.push('/profile')
    }
  }
}
</script>

<style lang="stylus" scoped>
.all
  position absolute
  width 100%
  height 100%
  //background url(../assets/4.png) no-repeat
  overflow hidden
  .bg
    width 100%
    height 100%
  .container
    position absolute
    top 17.5%
    height 90%
    width 67.1%
    left 16.4%
    z-index 100
    color #FFF
    background: rgba(31,19,18,0.23);
    border: 0.5px solid rgba(255,255,255,0.35);
    box-shadow: 0 1px 23px 0 rgba(0,0,0,0.36);
    border-radius: 8px;
    >img
      position absolute
      top 13.5%
      left 10%
      opacity 0.8
      cursor pointer
    .content
      width 83%
      top 7.2%
      margin 7.2% 8.5%
      h1
        width 100%
        text-align center
        font-size 24px
        color white
        padding 3% 0
        border-top: 1px solid #979797;
        border-bottom: 1px solid #979797;
      li
        border-bottom: 0.5px solid #979797;
        .name
          font-size 20px
          margin-left 30px
        .desc
          font-size 12px
          margin-left 20px
</style>
