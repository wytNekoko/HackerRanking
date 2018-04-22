<template>
  <div id="register">
    <div class="center">
      <img class="logo"
        :class="{'move-up': openBox}" width="300"
        :src="require('@/assets/symbols-logo.png')" alt="logo">
      <div class="button" @click="registeOnClick">Register Here</div>
      <p class="jump" @click="jump">Directly go to the Universe ></p>
    </div>
    <div class="register-box" :class="{'open': openBox}">
      <h2>Register</h2>
      <ul class="form">
        <li>
          <span>Username</span>
          <input type="text" v-model="username" @change="checkUsername">
          <p :style="{'color': status[0] === 'OK' ? '#00BF08' : '#FF2100'}">{{status[0]}}</p>
        </li>
        <li>
          <span>Password</span>
          <input type="password" v-model="password" @change="checkPassword">
          <p :style="{'color': status[1] === 'OK' ? '#00BF08' : '#FF2100'}">{{status[1]}}</p>
        </li>
        <li>
          <span>Password Confirm</span>
          <input type="password" v-model="confirm" @change="checkConfirm">
          <p :style="{'color': status[2] === 'OK' ? '#00BF08' : '#FF2100'}">{{status[2]}}</p>
        </li>
      </ul>
      <div class="submit">Submit</div>
      <p class="notice">You have to blablabla!</p>
      <img class="register-bg" width="400"
        :src="require('@/assets/symbols-buildplanet.png')"
      alt="buildplanet">
      <div class="close" @click="closeOnClick">Close X</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      openBox: false,
      username: '',
      password: '',
      confirm: '',
      status: ['', '', '']
    }
  },
  methods: {
    jump () {
      this.$router.push('/')
    },
    registeOnClick () {
      this.openBox = true
    },
    closeOnClick () {
      this.openBox = false
    },
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
    }
  }
}
</script>

<style lang="stylus" scoped>
#register
  width 100%
  height 100%
  position absolute
  background-color #441D66
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
  top 100%
  left 50%
  transform translate3d(-50%, 0, 0)
  width 720px
  background-color #FFF
  border-radius 60px
  transition 0.8s
  font-family 'Ubuntu'
  h2
    font-size 24px
    margin 50px 0 60px
    text-align center
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
    span
      font-size 20px
      width 90px
      height 50px
      display flex
      align-items center
      float left
      text-align center
    input
      border none
      width 430px
      height 50px
      background-color #F6F6F6
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
.submit
  font-size 20px
  color #4C1978
  margin 50px auto 0
  width 240px
  height 56px
  line-height 56px
  text-align center
  border-radius 30px
  border solid 2px #4C1978
  cursor pointer
.notice
  color #FF2100
  font-size 20px
  width 80%
  margin 30px auto 40px
  text-align center
.open
  top 50%
  transform translate3d(-50%, -50%, 0)
</style>
