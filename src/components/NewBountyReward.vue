<template>
  <div class="page">
    <img class="bg" :src="require('@/assets/3.png')">
    <div class="mask"></div>
    <div class="create-btn" @click="post"><span>Create</span></div>
    <div class="quit-btn" @click="quit"><span>Quit and Delete</span></div>
    <div class="remind">We don’t save drafts, so make sure the content you’re edting is copied at somewhere safe.</div>
    <div class="card">
      <p class="bigtitle">Create a new bounty reward</p>
      <input type="text" class="name" v-model="setUpInfo.name">
      <div class="inline">
        <input type="text" class="text" v-model="setUpInfo.company_name">
        <input type="text" class="text" v-model="setUpInfo.email">
      </div>
      <p class="title">Keywords</p>
      <input type="text" class="text" v-model="setUpInfo.keywords">
      <p class="title">Digital currency rewards</p>
      <input type="text" class="text" v-model="setUpInfo.reward">
      <p class="title">Problem background</p>
      <textarea rows="3" class="text" v-model="setUpInfo.background"></textarea>
      <p class="title">Question details</p>
      <textarea rows="9" class="text" v-model="setUpInfo.description"></textarea>

    </div>
  </div>
</template>

<script>
import api from '@/api'
import Fringe from './commons/Fringe'

export default {
  components: { Fringe },
  name: 'NewBountyReward',
  data () {
    return {
      setUpInfo: {
        name: 'Name',
        company_name: 'Company/Organization Name',
        description: 'e.g. We want you to help us to resolve...',
        background: '',
        email: 'Email',
        keywords: '',
        reward: 0
      }
    }
  },
  methods: {
    post () {
      if (!window.cookieStorage.getItem('token')) {
        alert('Login required')
        return
      }
      api.bounty_setup(this.setUpInfo).then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else {
          alert('success')
          for (const i in this.setUpInfo) {
            if (i === 'name') {
              this.setUpInfo[i] = 'Name'
            } else if (i === 'description') {
              this.setUpInfo[i] = 'e.g. X service that allows users to do sth or ...'
            } else {
              this.setUpInfo[i] = ''
            }
          }
        }
      })
    },
    quit () {
      this.$router.push('/hunter')
    }
  }

}
</script>

<style lang="stylus" scoped>
.mask
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  background-color rgba(176,114,80,0.3)
  z-index 0.5
//mix-blend-mode soft-light;      //柔光
.page
  position absolute
  //background  url(../assets/bg-hunter.jpg) no-repeat
  width 100%
  height 100%
  overflow hidden
  top 0
  left 0
  .bg
    width 100%
    height 100%
  .create-btn
    position absolute
    width 11.4%
    height 5%
    left 9.35%
    top 15%
    background-color rgba(255,113,62,0.8)
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
    border-radius: 5.84px;
    cursor pointer
    span
      position absolute
      //display table
      top 30%
      left 35%
      color white
      font-size 14px
      text-align center
  .quit-btn
    position absolute
    width 11.4%
    height 5%
    top 23%
    left 9.35%
    background-color rgba(103,104,131,0.8)
    color white
    font-size 14px
    font-family Ubuntu-Medium
    text-align center
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
    border-radius: 5.84px;
    cursor pointer
    span
      position absolute
      top 30%
      left 18%
      color white
      font-size 14px
      text-align center
  .remind
    position relative
    top 22%
    left 9.35%
    width 160px
    height 80px
    font-family: Ubuntu;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 20px;
  .card
    position absolute
    left 22.2%
    top 14%
    width 55.6%
    height 80%
    padding 0 5%
    box-sizing border-box
    box-shadow: 0 3px 12px 0 rgba(0,0,0,0.20);
    border-radius: 4px
    background rgba(19,29,64,0.65)
    .text
      padding-left 1.5%
    >input
      height 35px
      width 98.5%
      background: rgba(0,0,0,0.57);
      border-radius: 3px;
      border 0
      font-size 14px
      color rgba(255,255,255,0.30)
      text-align justify
      margin 0 0 1% 0
    textarea
      width 98.5%
      background: rgba(0,0,0,0.57);
      border-radius: 3px;
      border 0
      font-size 14px
      color rgba(255,255,255,0.30)
      text-align justify
    .bigtitle
      font-family Ubuntu-Medium
      font-size 20px
      color white
    .title
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #9B9B9B
      letter-spacing: 0;
      text-align: justify;
      line-height: 5px;
    .name
      font-size 14px
      color rgba(255,255,255,0.30)
      padding-left 1.5%
    .inline
      display flex
      height 35px
      width 100%
      >input
        background: rgba(0,0,0,0.57);
        width 100%
        border 0
        border-radius: 3px;
        font-size 14px
        color rgba(255,255,255,0.30)
        text-align justify
        &:first-child
          margin-right 10px
</style>
