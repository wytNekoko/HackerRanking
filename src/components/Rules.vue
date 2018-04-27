<template>
  <div id="register">
    <div class="register-box">
      <h2>Rules</h2>
      <div class="submit" @click="submit">Set up your 1st Planet !</div>
      <img class="register-bg" width="400"
        :src="require('@/assets/symbols-buildplanet.png')"
      alt="buildplanet">
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'Register',
  data () {
    return {
      hello: 'world'
    }
  },
  methods: {
    submit () {
      this.$router.push('/')
      this.$emit('setUp')
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
.register-box
  position absolute
  left 50%
  width 720px
  top 50%
  transform translate3d(-50%, -50%, 0)
  background-color #1B0033
  border-radius 60px
  transition 0.8s
  font-family 'Ubuntu'
  color #fff
  h2
    margin 50px 0 60px
    text-align center
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
.submit
  font-size 20px
  background-color #62B100
  color #FFF
  margin 50px auto
  width 340px
  height 60px
  line-height 60px
  text-align center
  border-radius 30px
  cursor pointer
</style>
