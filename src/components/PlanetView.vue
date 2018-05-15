<template>
  <div class="planet-view">
    <img class="bg" :src="require('@/assets/4.png')">
    <div class="back-btn" @click="back">
      <img width="18px" height="18px" :src="require('@/assets/symbols-backarrow.png')">
      <span>Back to Galaxy</span>
    </div>
    <div class="main-box">
      <h1>{{pinfo.name}}</h1>
      <p>{{pinfo.description}}</p>
      <h3>Github url</h3>
      <span>{{pinfo.github_url}}</span>
      <h3>Demo url</h3>
      <p>{{pinfo.demo_url}}</p>
      <h3>Team information</h3>
      <p>{{pinfo.team_intro}}</p>
    </div>
    <div class="num-info">
      <div class="num">{{pinfo.builder_num}}</div>
      <p>Builders</p>
      <div class="num">{{pinfo.dust_num}}</div>
      <p>Dusts</p>
      <!--<div class="num">#{{pinfo.rank}}</div>-->
      <div class="num">#{{rank}}</div>
      <p>Rank</p>
    </div>
    <div class="build-btn" @click="openBuild">
      <img width="60" height="60" :src="require('@/assets/symbols-build2.png')">
      <h1>Build this planet</h1>
      <p>{{time_left}} days remained</p>
    </div>
    <div class="spy-btn" @click="spyView">
      <img width="33" height="40" :src="require('@/assets/symbols-spy.png')">
      <p>Spy the team</p>
    </div>
    <div class="spy-box" v-if="sent || paybox">
      <div class="pay" v-if="paybox">
        <p class="msg">{{getMsg}}</p>
        <div class="btn" @click="spyPay"><span>Pay 1000 Dusts</span></div>
        <div class="cancel" @click="cancel">Cancel</div>
      </div>
      <div class="sent" v-if="sent">
        <p class="msg">{{sentMsg}}</p>
        <div class="btn" v-if="closeUnable"><span>Close ( {{countdown}}s )</span></div>
        <div class="btn" v-if="!closeUnable" @click="cancel" style="cursor: pointer;"><span>Close</span></div>
      </div>
    </div>
    <div class="next">
      <img width="20" height="20" :src="require('@/assets/symbols-backarrow.png')">
      <p>Next Planet:</p>
    </div>
    <div class="mask" v-if="buildIsOpen">
      <div class="build-card">
        <span class="close" @click="closeBuild">X</span>
        <h3>Amount of investment</h3>
        <input type="text" v-model="buildNum"><span class="dust">Dust</span>
        <div class="button" @click="confirmBuild">Confirm</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'PlanetView',
  data () {
    return {
      pinfo: null,
      time_left: 0,
      paybox: false,
      sent: false,
      leaderEmail: null,
      closeUnable: true,
      buildIsOpen: false,
      buildNum: 88,
      sentMsg: 'This Captain’s information will be ' +
    'sent to you as soon as the information is collected.\n' +
    'Please pay attention to your Receiving Station.',
      getMsg: '   Get me this Captain’s Infomation,\n' +
      'I need to talk to him/her.',
      countdown: 5,
      rank: ''
    }
  },
  created () {
    api.planets_one(this.$route.query.name).then((res) => {
      const d = res.data
      if (d.errcode) {
        alert(d.errmsg)
      } else {
        this.pinfo = d
        this.time_left = this.getLeft(d.created_at)
      }
    })
    if (this.$route.query.rank) {
      this.rank = this.$route.query.rank
    }
  },
  watch: {
    sent: function (val, oldVal) {
      if (val) {
        // TODO set a timer and enable close
        this.closeUnable = true
        let that = this;
        let countdown = that.countdown;
        // 倒计时
        let interval = window.setInterval(() => {
          if (--that.countdown <= 0) {
            that.countdown = countdown;
            that.closeUnable = false;
            window.clearInterval(interval);
          }
        }, 1000);
      }
    }
  },
  methods: {
    back () {
      this.$router.push('/')
    },
    getLeft (ctime) {
      const now = new Date()
      const s = ctime.substring(0, 10)
      const start = new Date(s)
      const delta = 30 * 24 * 3600 * 1000
      const end = start.getTime() + delta
      const left = new Date(end - now.getTime())
      if (left < 0) {
        return 0
      }
      return (left / (3600 * 1000 * 24)).toFixed(1)
    },
    closeBuild () {
      console.log('close')
      this.buildIsOpen = false
    },
    openBuild () {
      if (!window.cookieStorage.getItem('token')) {
        alert('Login required.')
        return
      }
      this.buildIsOpen = true
    },
    confirmBuild () {
      console.log('build')
      const num = parseInt(this.buildNum, 10)
      console.log(num)
      if (!num) {
        alert('Invalid number')
        this.buildNum = 10
        return
      }
      if (num < 1) {
        alert('At least 1 dust')
        this.buildNum = 1
        return
      }
      this.buildNum = num
      api.build(this.pinfo.name, num).then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else {
          alert('Build success')
          this.buildIsOpen = false
        }
      })
      api.planets_one(this.$route.query.name).then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else {
          this.pinfo = d
          this.time_left = this.getLeft(d.created_at)
        }
      })
    },
    spyView () {
      if (this.leaderEmail) {
        this.sent = true
      } else {
        this.paybox = true
      }
    },
    cancel () {
      this.paybox = false
      this.sent = false
    },
    spyPay () {
      if (!window.cookieStorage.getItem('token')) {
        alert('Login required.')
        return
      }
      if (this.leaderEmail) {
        this.sent = true
        this.paybox = false
        return
      }
      const answer = confirm('Pay now?')
      if (!answer) {
        return
      }
      api.spy(this.pinfo.name).then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else {
          console.log('success')
          this.$emit('notify')
          this.sent = true
          this.paybox = false
        }
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
.planet-view
  position absolute
  width 100%
  height 100%
  overflow hidden
  font-family Ubuntu
  color white
  .bg
    width 100%
    height 100%
  .back-btn
    position absolute
    left 70px
    top 140px
    width 140px
    height 40px
    background rgba(43,45,81,0.8)
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
    border-radius: 4px;
    display flex
    cursor pointer
    img
      position absolute
      left 10px
      top 10px
    span
      position absolute
      left 30px
      top 12px
      font-size 14px
      color white
      line-height 14px
  .main-box
    background rgba(19,29,64,0.59)
    position absolute
    left 230px
    top 140px
    width 620px
    height 597px
    font-family PingFangSC-Regular
    h1
      font-family PingFangSC-Medium
      margin 10% 10% 6% 10%
      font-size 24px
    h3
      color #9B9B9B
      font-size 14px
      margin 5% auto 0 10%
    span
      margin 0 60px
      font-size 14px
      line-height 14px
      width 480px
    p
      margin-left 60px
      margin-right 60px
      font-size 14px
      line-height 21px
  .num-info
    position absolute
    left 870px
    top 140px
    width 136px
    height 260px
    background rgba(19,29,64,0.59)
    border-radius: 5.84px
    .num
      margin 15% auto 0 15%
      font-size 32px
    p
      margin-left 20px
      margin-top 0
      font-size 14px
  .build-btn
    position absolute
    top 420px
    left 870px
    background-image: linear-gradient(45deg, rgba(105,157,0,0.8) 0%, rgba(67,128,0, 0.8) 100%);
    border-radius: 5.84px;
    height 60px
    width 260px
    cursor pointer
    img
      position absolute
      left 15px
      top 3px
    h1
      position absolute
      top 4px
      left 80px
      font-size 18px
    p
      position absolute
      top 46%
      left 80px
      color #224100
      font-size 12px
  .spy-btn
    position absolute
    top 500px
    left 870px
    color black
    background-image: linear-gradient(45deg, rgba(255,176,135,0.8) 0%, rgba(238,190,0,0.8) 100%);
    border-radius: 5.84px;
    height 60px
    width 260px
    cursor pointer
    img
      position absolute
      top 10px
      left 44px
    p
      font-size 16px
      position absolute
      top 4px
      left 40%
  .next
    position absolute
    top 580px
    left 870px
    background: rgba(43,45,81,0.8)
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
    border-radius: 5.84px;
    width 260px
    height 120px
    cursor pointer
    img
      position absolute
      right 10px
      top 49.9px
      transform: rotateY(180deg)
    p
      margin-top 25.9px
      margin-left 20px
      font-size 14px
      color rgba(155,155,155,1)
      line-height 17.53px
  .spy-box
    position absolute
    top 140px
    left 870px
    width 260px
    height 340px
    background-image: linear-gradient(-45deg, #FFB087 0%, #EEBE00 100%);
    border-radius: 8px;
    .pay
      .btn
        background black
        border-radius 8px
        width 180px
        height 56px
        text-align center
        margin 20px 40px
        cursor pointer
        span
          line-height 4
          font-size 14px
      .msg
        margin 103px 20px 80px 20px
        font-size 14px
        text-align justify
      .cancel
        color black
        cursor pointer
        text-align center
    .sent
      .btn
        background black
        border-radius 8px
        width 180px
        height 56px
        text-align center
        margin 20px 40px
        span
          line-height 4
          font-size 14px
      .msg
        margin 100px 30px 70px 30px
        font-size 14px
        text-align justify
  .build-card
    width 400px
    background-image linear-gradient(45deg, rgba(105,157,0,0.9) 0%, rgba(67,128,0, 0.9) 100%);
    border-radius 8px
    position absolute
    top 50%
    left 40%
    transform translate3d(-50%, -50%, 0)
    text-align center
    padding 40px
    box-sizing border-box
    font-size 16px
  input
    border none
    text-align center
    margin-right 10px
    width 140px
    height 50px
    background-color fbga(255,255,255,0.6)
    border-radius 10px
    outline none
    box-sizing border-box
    padding 0 30px
    font-size 18px
  h3
    font-size 24px
    margin 24px 0
  .close
    position absolute
    top 15px
    right 20px
    font-size 14px
    cursor pointer
  .button
    width 184px
    height 50px
    background rgba(105,157,0,1)
    color white
    border-radius 10px
    line-height 50px
    text-align center
    cursor pointer
    margin 30px auto 0
    font-family Ubuntu-Medium
.mask
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  background-color #000A
  z-index 80
</style>
