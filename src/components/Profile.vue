<template>
  <div id="profile">
    <div class="container">
      <div class="dust">
        <div class="left">
          <div class="center">
            <h2>Your Total Dusts</h2>
            <div class="totla-dust">{{totalDust}}</div>
            <div class="button">withdraw</div>
          </div>
        </div>
        <div class="right">
          <div class="center">
            <ul class="infos">
              <li v-for="item in info" :key="info.indexOf(item)">
                <span class="time">{{item.time}}</span>
                <span>发起{{item.name}}星球建设获得{{item.fame}}声誉值</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="set-up">
        <div class="center">
          <h2>Planets You Set up</h2>
          <ul class="lists">
            <li v-for="item in setUp" :key="setUp.indexOf(item)">
              <span class="name">{{item.name}}</span>
              <span class="dust">got {{item.dust}} Dusts</span>
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
              <span class="dust">got {{item.dust}} Dusts</span>
              <span class="button" @click="viewSetUp(item)">view</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const setUp = [
  { name: 'asdfg', dust: 232 },
  { name: 'asd', dust: 21 },
  { name: 'asdfga asd', dust: 22 },
  { name: 'asdfg a', dust: 232 }
]
const contributed = [
  { name: 'sdkjf ljflai ', dust: 32 },
  { name: 'sdkjf ljflai ', dust: 32 },
  { name: 'sdkjf ljflai ', dust: 32 },
  { name: 'sdkjf ljflai ', dust: 32 }
]
const totalDust = 3523
const info = [
  { time: '2018-10-23 12:22:33', name: 'asdf', fame: 3 },
  { time: '2018-10-23 12:22:33', name: 'asdf', fame: 5 },
  { time: '2018-10-23 12:22:33', name: 'asdf', fame: 5 },
  { time: '2018-10-23 12:22:33', name: 'asdf', fame: 5 }
]

export default {
  name: 'Profile',
  data () {
    return {
      setUp,
      contributed,
      totalDust,
      info
    }
  },
  methods: {
    viewSetUp (item) {
      console.log(item)
    }
  }
}
</script>

<style lang="stylus" scoped>
#profile
  width 100%
  height 100%
  position absolute
.container
  position absolute
  height 90%
  width 65%
  top 5%
  left 10%
  z-index 100
  color #FFF
  >div
    background-color #FFF1
    border-radius 16px
    position absolute
    box-sizing border-box
    overflow hidden
  .dust
    width 100%
    height 48%
    top 0
    left 0
    >div
      width 48%
      height 100%
      position relative
    >.left
      float left
    >.right
      float right
    .button
      margin auto
      display table
      border-radius 20px
      line-height 36px
      padding 0 30px
      border solid 2px #FFF
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
    font-size 16px
    color #FFF
    text-align center
    margin 0 0 50px
.center
  position absolute
  top 50%
  left 10%
  width 80%
  transform translate3d(0, -50%, 0)
.infos
  font-size 12px
  li
    margin 10px 0
  .time
    opacity 0.4
    margin-right 1em
.lists
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
.totla-dust
  font-size 30px
  margin 30px
  text-align center
</style>
