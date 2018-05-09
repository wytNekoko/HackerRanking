<template>
  <div id="profile">
    <p id="title">Control Center</p>
    <div class="container">
          <div class="left">
            <img width="100" height="100" :src="require('@/assets/symbols-profile.png')">
            <div class="total-dust">{{totalDust}}</div>
            <div class="line">
              <h2 style="height:20px width:93px">Total Dusts</h2>
              <img width="10" height="10" :src="require('@/assets/symbols-dusts.png')"></div>
            <div class="button" @click="withdraw">withdraw</div>
            <div class="line" @click="getDust">
              <img width="16" height="24" :src="require('@/assets/symbols-getdusts.png')">
              <h3>Get dusts</h3>
            </div>
          </div>
          <div class="right">
            <!--
            <ul class="infos">
              <li v-for="item in info" :key="info.indexOf(item)">
                <span class="time">{{item.created_at}}</span>
                <span>Build the planet {{item.name}} to get {{item.reward}} dust</span>
              </li>
            </ul>
            -->
          </div>
      </div>
      <!--
      <div class="set-up">
        <div class="center">
          <h2>Planets You Set up</h2>
          <ul class="lists">
            <li v-for="item in setUp" :key="setUp.indexOf(item)">
              <span class="name">{{item.name}}</span>
              <span class="dust">got {{item.dust_num}} Dusts</span>
              <span class="button" @click="viewSetUp(item)">view</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="contributed">
        <div class="center">
          <h2>Planets You Contributed to</h2>
          <ul class="lists">
            <li v-for="item in contributed" :key="contributed.indexOf(item)">
              <span class="name">{{item.name}}</span>
              <span class="dust">got {{item.reward_dust}} Dusts</span>
              <span class="button" @click="viewSetUp(item)">view</span>
            </li>
          </ul>
        </div>
      </div>
      -->
  </div>
</template>

<script>
import api from '@/api'

// const setUp = [
//   { name: 'asdfg', dust: 232 },
//   { name: 'asd', dust: 21 },
//   { name: 'asdfga asd', dust: 22 },
//   { name: 'asdfg a', dust: 232 }
// ]
// const contributed = [
//   { name: 'sdkjf ljflai ', dust: 32 },
//   { name: 'sdkjf ljflai ', dust: 32 },
//   { name: 'sdkjf ljflai ', dust: 32 },
//   { name: 'sdkjf ljflai ', dust: 32 }
// ]
const info = [
  { created_at: '2018-10-23 12:22:33', name: 'asdf', reward: 3 }
]

export default {
  name: 'Profile',
  data () {
    return {
      setUp: [],
      contributed: [],
      totalDust: 0,
      info
    }
  },
  created () {
    api.profile_main().then((res) => {
      const d = res.data
      this.totalDust = d.total_dust
      this.info = d.planets
    })
    api.owned_planets().then((res) => {
      const d = res.data
      if (d.errcode) {
        alert(d.errmsg)
      } else {
        this.setUp = d
      }
    })
    api.builded_planets().then((res) => {
      const d = res.data
      if (d.errcode) {
        alert(d.errmsg)
      } else {
        this.contributed = d
      }
    })
  },
  methods: {
    viewSetUp (item) {
      api.planets_one(item.name).then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else {
          const data = {
            title: d.name,
            intro: d.description,
            demo: d.demo_url,
            git: d.github_url,
            team: d.team_intro,
            rank: 0
          }
          this.$emit('view', data)
        }
      })
    },
    withdraw () {
      // this.$emit('update')
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
  background  url(../assets/bg-home.jpg) no-repeat
  overflow hidden
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
      margin-left 30%
      margin-bottom 5%
    .total-dust
      font-size 30px
      text-align center
    .line
      margin-left 30%
      display flex
      align-items center
      >img
        margin-left 2%
    .button
      margin auto
      display table
      width 17%
      border-radius 8px
      line-height 36px
      padding 0 30px
      border solid 1px #FFF
      cursor pointer
  .right
    position absolute
    left 32.21%
    width 67.8%
    flex-direction column

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
