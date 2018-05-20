<template>
  <div class="all">
    <img class="bg" :src="require('@/assets/2.png')">
    <div class="container">
      <img @click="back" width="40px" height="40px" :src="require('@/assets/symbols-backarrow.png')">
      <div class="content">
        <h1>Owned Projects</h1>
        <table>
          <tr v-for="item in setup" :key="setup.indexOf(item)">
            <td class="name">{{item.name}}</td>
            <td class="desc">{{item.description}}</td>
            <td class="gift">{{item.dust_num}} Gift Collected</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'HackerOwnedProjects',
  data() {
    return {
      setup: []
    }
  },
  created() {
    api.owned_planets(this.$route.query.name).then((res) => {
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
      this.$router.push({
        'name': 'HackerView', query: { name: this.$route.query.name }
      })
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
      top 80px
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
      table
        table-layout fixed
      tr
        width 100%
        .name
          font-size 20px
          margin-left 30px
          width 20%
          border-bottom 0.5px solid rgba(255,255,255,0.20)
        .desc
          font-size 14px
          margin-left 20px
          width 73%
          overflow hidden
          border-bottom 0.5px solid rgba(255,255,255,0.20)
        .gift
          font-size 14px
          width 20%
          border-bottom 0.5px solid rgba(255,255,255,0.20)
</style>
