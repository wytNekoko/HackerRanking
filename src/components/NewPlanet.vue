<template>
  <div class="page">
    <div class="mask"></div>
    <div class="create-btn" @click="setupPlanet"><span>Create</span></div>
    <div class="quit-btn"><span>Quit and Delete</span></div>
    <div class="remind">We don’t save drafts, so make sure the content you’re edting is copied at somewhere safe.</div>
      <div class="card">
        <p class="bigtitle" @click="quit">Create a new planet</p>
        <input type="text" class="name" v-model="setUpInfo.name">
        <p class="title">Description</p>
        <textarea rows="4" v-model="setUpInfo.description"></textarea>
        <p class="title">Email</p>
        <input type="text" v-model="setUpInfo.email">
        <p class="title">Demo URL</p>
        <input type="text" v-model="setUpInfo.demo">
        <p class="title">Github URL</p>
        <input type="text" v-model="setUpInfo.git">
        <p class="title">Team Introduction</p>
        <textarea rows="4" v-model="setUpInfo.team"></textarea>
      </div>
  </div>
</template>

<script>
import api from '@/api'
import Fringe from './commons/Fringe'

export default {
  components: { Fringe },
  name: 'NewPlanet',
  data () {
    return {
      setUpInfo: {
        name: 'Name',
        description: 'e.g. X service allows users to do sth or ...',
        email: '',
        demo: 'http://',
        git: 'http://',
        team: ''
      }
    }
  },
  methods: {
    setupPlanet () {
      api.setup_planet(this.setUpInfo).then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else {
          this.setIsOpen = false
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
      this.setUpInfo.name = 'Name'
      this.setUpInfo.description = 'e.g. X service allows users to do sth or ...'
      this.setUpInfo.email = ''
      this.setUpInfo.demo = 'http://'
      this.setUpInfo.git ='http://'
      this.setUpInfo.team = ''
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
  background  url(../assets/bg-home.jpg) no-repeat
  width 100%
  height 100%
  overflow hidden
  top 0
  left 0
  .create-btn
    position relative
    width 160px
    height 40px
    left 9.35%
    top 17.5%
    /*width 11.4%*/
    /*height 5%*/
    background-color rgba(255,113,62,0.8)
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
    border-radius: 5.84px;
    span
      position absolute
      top 30%
      left 35%
      color white
      font-size 14px
      font-family Ubuntu-Medium
      text-align center
  .quit-btn
    position relative
    width 160px
    height 40px
    top 20%
    left 9.35%
    /*width 11.4%*/
    /*height 5%*/
    background-color rgba(103,104,131,0.8)
    color white
    font-size 14px
    font-family Ubuntu-Medium
    text-align center
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
    border-radius: 5.84px;
    span
      position absolute
      top 30%
      left 18%
      color white
      font-size 14px
      font-family Ubuntu-Medium
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
    top 17.5%
    width 55.6%
    height 80%
    box-shadow: 0 3px 12px 0 rgba(0,0,0,0.20);
    border-radius: 4px
    background rgba(19,29,64,0.65)
    input
      height 40px
      width 623px
      left 79px
      background: rgba(0,0,0,0.57);
      border-radius: 3px;
      border 0
      font-size 14px
      color rgba(255,255,255,0.30)
    textarea
      width 623px
      left 79px
      background: rgba(0,0,0,0.57);
      border-radius: 3px;
      border 0
      font-size 14px
      color rgba(255,255,255,0.30)
    .bigtitle
      padding-left 79px
      font-family Ubuntu-Medium
      font-size 20px
      color white
    .title
      padding-left 79px
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #9B9B9B
      letter-spacing: 0;
      text-align: justify;
      line-height: 28px;
    .name
      font-size 14px
      color rgba(255,255,255,0.30)

</style>
