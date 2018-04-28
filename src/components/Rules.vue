<template>
  <div id="register">
    <div class="register-box">
      <h2>Rules</h2>
      <div class="rules-box">
        <ol class="rules-cont" :style="{'transform': `translate3d(0, ${offsetY}px, 0)`}">
          <li>
            <p>The planet ranking will be published at 12:00 on the last day of every month</p>
            <p>NO.1：+10000</p>
            <p>NO.2：+8000</p>
            <p>NO.3：+6000</p>
            <p>NO.4 - NO.5 ：+3000</p>
            <p>NO.6 - NO.10：+1000</p>
          </li>
          <li>
            <p>your dust amount and the order of you participating in building other planets determine your building return</p>
            <img :src="require('@/assets/favicon_1.png')" alt="">
            <img :src="require('@/assets/favicon_2.png')" alt="">
            <img :src="require('@/assets/favicon_3.png')" alt="">
            <p>rk: return factor</p>
            <p>Qn: total investment</p>
            <p>qi: single investment</p>
            <p>B: bonus</p>
            <p>Rk: Return per deal</p>
            <p>500: To create an new planet will receive 500dust investment by DustWold</p>
          </li>
          <li>
            <p>Return for FMP(founding members of the planet) ∂= (bonus + investment) * 40%</p>
          </li>
          <li>
            <p>To becone a member of HackerDust (+5000dust)</p>
          </li>
          <li>
            <p>To get in contact with the planet ownerwill cost 1000 dust per time</p>
          </li>
          <li>
            <p>The system will provide 88dust three times per day for investment, which will become invalid if not taken</p>
          </li>
          <p>You can convert your dust to real digital currency. In other words, dust is money</p>
        </ol>
      </div>
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
      hello: 'world',
      offsetY: 0
    }
  },
  mounted () {
    const cont = this.$el.querySelector('.rules-cont')
    const box = this.$el.querySelector('.rules-box')
    const rect = cont.getBoundingClientRect()
    const offsetLimit = 200 - rect.height
    box.addEventListener('mousewheel', (e) => {
      if (e.deltaY > 0) {
        const temp = this.offsetY - 30
        this.offsetY = Math.max(offsetLimit, temp)
      } else {
        const temp = this.offsetY + 30
        this.offsetY = Math.min(0, temp)
      }
    })
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
.rules-box
  height 400px
  padding 0 10px
  overflow hidden
.rules-cont
  margin 0
  img
    display block
    margin 1em 0
</style>
