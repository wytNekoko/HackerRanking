<template>
  <div id="profile">
    <img class="bg" :src="require('@/assets/2.png')">
    <div class="container">
      <div class="left">
        <img width="100" height="100" :src="require('@/assets/symbols-profile.png')">
        <div class="total-dust">{{property}}</div>
        <div class="line">
          <h2 style="height:20px width:93px">Total Gift</h2>
          <img width="10" height="10" :src="require('@/assets/symbols-dusts.png')"></div>
        <!--<div class="button" @click="withdraw">withdraw</div>-->
      </div>
      <div class="right">
        <h1>{{name}}</h1>
        <h1>Projects</h1>
        <div class="box" @click="toOwnedPlanets"><p>Owned Projects: {{projects}}</p></div>
        <div class="box" @click="toBuiltPlanets"><p>Invested Projects</p></div>
        <!--<h1>Bounty Hunter</h1>-->
        <!--<div class="box" @click="toPostedRewards"><p>Posted Rewards</p></div>-->
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'HackerView',
  data () {
    return {
      property: 0,
      name: this.$route.query.name,
      projects: 0,
    }
  },
  created () {
    api.hacker(this.$route.query.name).then((res) => {
      const d = res.data
      this.property = d.property
      this.projects = d.projects
    })
  },
  methods: {
    toOwnedPlanets () {
      this.$router.push({
        'name': 'HackerOwnedProjects', query: { name: this.$route.query.name }
      })
    },
    toBuiltPlanets () {
      this.$router.push({
        'name': 'HackerInvested', query: { name: this.$route.query.name }
      })
    },
    withdraw () {
      alert('Under construction...')
    },
    getDust () {
      api.get_dust().then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else if (parseInt(d, 10)) {
          this.numActive = true
          setTimeout(() => {
            this.numActive = false
          }, 1000)
        } else {
          alert(d)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  #profile
    width 100%
    height 100%
    position absolute
    display table
    //background  url(../assets/2.png) no-repeat
    overflow hidden
    .bg
      width 100%
      height 100%
    #title
      top 7%
      left 43.5%
      position absolute
      font-family Allerta-Stencil
      font-size 30px
      letter-spacing 0
      color white
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
    .left
      position absolute
      top 7.5%
      left 0
      width 32.2%
      flex-direction column
      >img
        display table
        margin auto
      //margin-left 30%
      //margin-bottom 5%
      .total-dust
        margin-top 2%
        font-size 30px
        text-align center
      .line
        line-height 3%
        margin-left 30%
        margin-bottom 3%
        display flex
        align-items center
        >img
          margin-left 2%
      .button
        margin auto
        margin-bottom 5%
        display table
        width 17%
        border-radius 8px
        line-height 36px
        padding 0 30px
        border solid 1px #FFF
        cursor pointer

    .right
      position absolute
      top 7.5%
      left 32.21%
      width 67.8%
      flex-direction column
      h1
        font-size 30px
        color white
        line-height 7%
        //margin-top 12%
        margin-top 20%
        margin-bottom 5%
        &:first-child
          margin-top 3%
      >p
        font-size 14px
        color #9B9B9B
        letter-spacing 0
        line-height 5%
        margin-bottom 3%
      .box
        display flex
        width 65%
        height 6%
        border-top: 1px solid #979797;
        border-bottom: 1px solid #979797;
        cursor pointer
        &:first-child
          border-bottom 0
        >p
          display table
          font-size 14px
          color #9B9B9B
          letter-spacing 0
          margin 3% auto
          text-align center
      .button-logout
        position absolute
        top 5%
        right 20%
        //margin auto
        width 10%
        border-radius 8px
        line-height 36px
        padding 0 30px
        border solid 1px #FFF
        text-align center
        cursor pointer
    .set-up
      width 48%
      height 48%
      bottom 0
      left 0
    .contributed
      width 48%
      height 48%
      bottom 0
      right 0
    h2
      font-size 18px
      color #FFF
      text-align center
    h3
      font-size 16px
      color white
      text-align center
      margin-left 5%
  .infos
    font-size 12px
    li
      margin 10px 0
    .time
      opacity 0.4
      margin-right 1em
  .lists
    height 234px
    overflow hidden
    li
      font-size 16px
      line-height 24px
      margin 30px auto 10px
    .dust
      padding-left 1em
      opacity 0.5
      font-size 12px
    .button
      color #FF573E
      float right
      cursor pointer

</style>
