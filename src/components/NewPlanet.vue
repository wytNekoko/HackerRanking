<template>
  <div class="page">
    <div class="mask"></div>
    <div class="create-btn" @click="setupPlanet"><span>Create</span></div>
    <div class="quit-btn" @click="quit"><span>Quit and Delete</span></div>
    <div class="remind">We don’t save drafts, so make sure the content you’re edting is copied at somewhere safe.</div>
    <div class="card">
        <p class="bigtitle">Create a new project</p>
        <input type="text" class="name" v-model="setUpInfo.name" @change="checkName">
        <input type="text" class="email" v-model="setUpInfo.email" @change="checkEmail">
        <span :style="{'color': status[0] === 'OK' ? '#00BF08' : '#FF2100'}">{{status[0]}}</span>
        <span class="checkemail" :style="{'color': status[1] === 'OK' ? '#00BF08' : '#FF2100'}">{{status[1]}}</span>
        <p class="title">Keywords</p>
        <!--<div class="inline">-->
          <!--<input type="text" class="text" v-model="keys[0]" @change="checkKeywords(0)">-->
          <!--<input type="text" class="text" v-model="keys[1]" @change="checkKeywords(1)">-->
          <!--<input type="text" class="text" v-model="keys[2]" @change="checkKeywords(2)">-->
        <!--</div>-->
      <table style="table-layout: fixed">
        <tr>
          <td><input type="text" class="text" v-model="keys[0]" @change="checkKeywords(0)"></td>
          <td><input type="text" class="text" v-model="keys[1]" @change="checkKeywords(1)"></td>
          <td><input type="text" class="text" v-model="keys[2]" @change="checkKeywords(2)"></td>
        </tr>
        <tr>
          <td :style="{'color': status[2] === 'OK' ? '#00BF08' : '#FF2100'}">{{status[2]}}</td>
          <td :style="{'color': status[3] === 'OK' ? '#00BF08' : '#FF2100'}">{{status[3]}}</td>
          <td :style="{'color': status[4] === 'OK' ? '#00BF08' : '#FF2100'}">{{status[4]}}</td>
        </tr>
      </table>

        <p class="title">Description</p>
        <textarea rows="6" class="text" v-model="setUpInfo.description"></textarea>
        <p class="title">Demo URL</p>
        <input type="text" class="text" v-model="setUpInfo.demo" @change="checkDemo">
        <span :style="{'color': status[5] === 'OK' ? '#00BF08' : '#FF2100'}">{{status[5]}}</span>
        <p class="title">Github URL</p>
        <input type="text" class="text" v-model="setUpInfo.git" @change="checkGit">
        <span :style="{'color': status[6] === 'OK' ? '#00BF08' : '#FF2100'}">{{status[6]}}</span>
      <p class="title">Team Introduction (Optional)</p>
        <textarea rows="5" class="text" v-model="setUpInfo.team"></textarea>
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
        name: 'Project Name (<= 30 char)',
        description: 'What problem we are committed to solving. What approach do we take. What we have already done.',
        keywords: 'Keywords',
        email: 'Email',
        demo: 'http://',
        git: 'http://',
        team: ''
      },
      keys: ['<=10char', '<=10char','<=10char'],
      status: ['', '', '', '', '', '', ''],
    }
  },
  methods: {
    checkName () {
      if (this.setUpInfo.name.length > 30) {
        this.status.splice(0, 1, 'Name should be less than 30 characters')
      } else if (!this.setUpInfo.name) {
        this.status.splice(0, 1, 'Name can\'t be empty')
      } else {
        this.status.splice(0, 1, 'OK')
      }
    },
    checkEmail () {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(this.setUpInfo.email).toLowerCase())) {
        this.status.splice(1, 1, 'OK')
      } else {
        this.status.splice(1, 1, 'Invalid email')
      }
    },
    checkKeywords (index) {
      if (this.keys[index].length > 10) {
        this.status.splice(index + 2, 1, 'Keyword is too long')
      } else {
        this.status.splice(index + 2, 1, 'OK')
      }
    },
    checkDemo () {
      if (this.checkUrl(String(this.setUpInfo.demo))) {
        this.status.splice(5, 1, 'OK')
      } else {
        this.status.splice(5, 1, 'Invalid demo url')
      }
    },
    checkGit () {
      if (this.checkUrl(String(this.setUpInfo.git))) {
        this.status.splice(6, 1, 'OK')
      } else {
        this.status.splice(6, 1, 'Invalid Github url')
      }
    },
    checkUrl (str) {
      const pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
      return pattern.test(str)
    },
    setupPlanet () {
      for (let i = 0; i <= 6; i += 1) {
        if (status[i] !== 'OK') {
          alert('Invalid information exits. Please check the form again.')
          return
        }
      }
      this.setUpInfo.keywords = this.keys.join(' ')
      console.log(this.setUpInfo.keywords)
      api.setup_planet(this.setUpInfo).then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else {
          alert('Create success')
          for (const i in this.setUpInfo) {
            if (i === 'name') {
              this.setUpInfo[i] = 'Name'
            } else if (i === 'description') {
              this.setUpInfo[i] = 'e.g. X service that allows users to do sth or ...'
            } else if (i === 'keywords') {
              this.setUpInfo[i] = 'Keywords'
            } else if (i === 'email') {
              this.setUpInfo[i] = 'Email'
            } else this.setUpInfo[i] = ''
          }
        }
      })
    },
    quit () {
      this.$router.push('/')
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
    width 11.4%
    height 5%
    left 9.35%
    top 17.5%
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
    position relative
    width 11.4%
    height 5%
    top 20%
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
    top 13%
    width 55.6%
    height 90%
    padding 0 5%
    box-sizing border-box
    box-shadow: 0 3px 12px 0 rgba(0,0,0,0.20);
    border-radius: 4px
    background rgba(19,29,64,0.65)
    .text
      padding-left 1.5%
    .email
      padding-left 1.5%
      width 49%
      margin-left 2%
    .name
      font-size 14px
      color rgba(255,255,255,0.30)
      padding-left 1.5%
      width 45%
    input
      height 40px
      width 100%
      background: rgba(0,0,0,0.57);
      border-radius: 3px;
      border 0
      font-size 14px
      color rgba(255,255,255,0.30)
      text-align justify
      margin 0 0 1% 0
    span
      clear both
      text-align right
      font-size 12px
    .checkemail
      padding-left 47%
    textarea
      width 100%
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
    .inline
      display flex
      width 101.5%
      >input
        height 40px
        width 50%
        background: rgba(0,0,0,0.57);
        border-radius: 3px;
        border 0
        font-size 14px
        color rgba(255,255,255,0.30)
        text-align justify
        margin-right 10px
        &:last-child
          margin-right 0
    tr
      width 100%
      text-align left
    td
      width 33%
      font-size 12px
      padding-right 6%
</style>
