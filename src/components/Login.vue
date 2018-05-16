<template>
  <div id="register">
    <!--<div class="center">-->
    <!--<img class="logo"-->
    <!--:class="{'move-up': openBox}" width="300"-->
    <!--:src="require('@/assets/symbols-logo.png')" alt="logo">-->
    <!--<div class="button" @click="registeOnClick">Register / Login Here</div>-->
    <!--<p class="jump" @click="jump">Directly go to the Universe ></p>-->
    <!--</div>-->
    <div class="register-box"> <!--:class="{'open': openBox}">-->
      <h2>
        <span @click="login" :class="{'focus': !needRegister}">Login</span>
      </h2>
      <ul class="form">
        <li>
          <span>Cryptoname</span>
          <input type="text" v-model="username" @change="checkUsername">
          <p v-if="needRegister"
             :style="{'color': status[0] === 'OK' ? '#00BF08' : '#FF2100'}">{{status[0]}}</p>
        </li>
        <li>
          <span>Password</span>
          <input type="password" v-model="password" @change="checkPassword">
          <p v-if="needRegister"
             :style="{'color': status[1] === 'OK' ? '#00BF08' : '#FF2100'}">{{status[1]}}</p>
        </li>
      </ul>
      <div class="submit" @click="submit">Submit</div>
      <p class="notice" v-html="notice"></p>
      <!--
      <img class="register-bg" width="400"
        :src="require('@/assets/symbols-buildplanet.png')"
      alt="buildplanet">
      -->
      <div class="close" @click="jump">Close</div>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'Login',
  data () {
    return {
      needRegister: false,
      openBox: false,
      username: '',
      password: '',
      confirm: '',
      status: ['', '', ''],
      notice: ' '
    }
  },
  methods: {
    jump () {
      this.$router.push('/')
    },
    // registeOnClick () {
    //   this.openBox = true
    // },
    checkUsername () {
      this.status.splice(0, 1, 'OK')
    },
    checkPassword () {
      this.checkConfirm()
      this.status.splice(1, 1, 'OK')
    },
    checkConfirm () {
      if (this.password === this.confirm) {
        this.status.splice(2, 1, 'OK')
      } else if (this.confirm !== '') {
        this.status.splice(2, 1, 'Enter the password twice inconsistently')
      }
    },
    login () {
      this.confirm = ''
      this.status.splice(2, 1, '')
      this.needRegister = false
      this.setNotice('')
    },
    register () {
      this.needRegister = true
      this.setNotice('Please remember your cryptoname and passwords<br>or you will for ever lose your planet')
    },
    setNotice (text) {
      this.notice = text
    },
    submit () {
      if (this.needRegister) {
        if (this.status[2] !== 'OK') {
          return
        }
        api.register(this.username, this.password).then((res) => {
          const d = res.data
          if (d.errcode) {
            this.setNotice(d.errmsg)
          } else {
            this.sendLogin()
          }
        })
      } else {
        this.sendLogin()
      }
    },
    sendLogin () {
      api.login(this.username, this.password).then((res) => {
        const d = res.data
        if (d.errcode) {
          this.setNotice(d.errmsg)
        } else {
          // console.log(d)
          this.$emit('update', d)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  #register
    width 100%
    height 100%
    position absolute
    background  url(../assets/bg-home.jpg) no-repeat
    top 0
    left 0
    overflow hidden
  .logo
    display table
    margin auto
    transition transform 0.8s
  .move-up
    transform translate3d(0, -220px, 0)
  .button
    width 360px
    height 80px
    border solid 2px #fff
    border-radius 80px
    text-align center
    display table
    margin 150px auto 30px
    cursor pointer
    color #fff
    font-size 24px
    font-family 'Ubuntu'
    line-height 80px
  .center
    position absolute
    top 50%
    left 10%
    width 80%
    transform translate3d(0, -50%, 0)
  .jump
    display table
    margin auto
    color #fff
    cursor pointer
  .register-box
    position absolute
    top 20%
    left 50%
    transform translate3d(-50%, 0, 0)
    width 720px
    background-color rgba(0,0,0,0.8)
    border-radius 10px
    transition 0.8s
    font-family 'Ubuntu'
    h2
      margin 50px 0 60px
      text-align center
      span
        color white
        font-size 14px
        opacity 0.4
        cursor pointer
        transition 0.6s
      .focus
        font-size 24px
        opacity 1
        cursor default
    .register-bg
      position absolute
      z-index -1
      top -180px
      left 50%
      transform translate3d(-50%, 0, 0)
    .close
      color #fff
      position absolute
      bottom -50px
      left 50%
      transform translate3d(-50%, 0, 0)
      cursor pointer
  .form
    width 540px
    margin auto
    li
      height 50px
      margin 30px 0
      position relative
      span
        color rgba(255,255,255,0.5)
        font-size 20px
        width 90px
        height 50px
        display flex
        align-items center
        float left
        text-align center
        &:last-child
          color rgba(0,0,0,0.57)
      input
        border none
        width 420px
        height 50px
        background-color rgba(0,0,0,0.57)
        color white
        border-radius 25px
        float right
        outline none
        box-sizing border-box
        padding 0 30px
        font-size 18px
      p
        clear both
        text-align right
        padding 2px 25px
    .mask
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      background-color rgba(0,0,0,0.9)
  .submit
    font-size 20px
    color white
    margin 50px auto 0
    width 240px
    height 56px
    line-height 56px
    text-align center
    border-radius 30px
    border solid 2px white
    cursor pointer

  .notice
    color #FF2100
    font-size 20px
    width 80%
    margin 30px auto 40px
    text-align center
    height 24px
  .open
    top 50%
    transform translate3d(-50%, -50%, 0)
</style>
