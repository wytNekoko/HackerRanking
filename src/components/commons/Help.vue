<template>
  <div class="mask">
    <div class="help-card">
      <h2>Help</h2>
      <div v-bar="{ preventParentScroll: true, scrollThrottle: 30,}"> <!-- el1 -->
        <div class="rules-box"> <!-- el2 -->
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
                <p>your dust amount and the order of you participating in building other
                  planets determine your building return</p>
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
                <p>The system will provide 88dust three times per day for investment,
                  which will become invalid if not taken</p>
              </li>
              <p>You can convert your dust to real digital currency. In other words, dust is money</p>
            </ol>
        </div>
        <!-- dragger will be automatically added here -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Help'
}
</script>

<style lang="stylus" scoped>
.mask
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  background-color #000A
  z-index 6
.rules-box
  height 400px
  padding 0 10px
  overflow hidden
.rules-cont
  margin 0
  img
    display block
    margin 1em 0
.vb
  & > .vb-dragger
    z-index 5
    width 12px
    right 0
    & > .vb-dragger-styler
      -webkit-backface-visibility hidden
      backface-visibility hidden
      -webkit-transform rotate3d(0,0,0,0)
      transform rotate3d(0,0,0,0)
      -webkit-transition background-color 100ms ease-out,
      margin 100ms ease-out,
      height 100ms ease-out
      transition background-color 100ms ease-out,
      margin 100ms ease-out,
      height 100ms ease-out
      background-color rgba(48, 121, 244,.1)
      margin 5px 5px 5px 0
      border-radius 20px
      height calc(100% - 10px)
      display block
    &:hover
      & > .vb-dragger-styler
        background-color rgba(48, 121, 244,.5)
        margin 0px
        height 100%
  &.vb-scrolling-phantom
    & > .vb-dragger
      & > .vb-dragger-styler
        background-color rgba(48, 121, 244,.3)
  &.vb-dragging
    & > .vb-dragger
      & > .vb-dragger-styler
        background-color rgba(48, 121, 244,.5)
        margin 0px
        height 100%
</style>
