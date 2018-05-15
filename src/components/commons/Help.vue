<template>
  <div class="mask">
    <div class="help-card">
    <img :src="require('@/assets/symbols-close.png')" width="18" height="18" @click="closeHelp">
    <h1 class="help-title">Help</h1>
    <div class="nav">
      <div class="tab">Universe Convention</div>
    </div>
    <div class="ctn-box">
      <div class="size" v-bar="{ preventParentScroll: true, scrollThrottle: 30,}" > <!-- el1   -->
        <!--<div> &lt;!&ndash; el2 &ndash;&gt;-->
          <!-- your scrollable content -->
          <div class="rules-cont">
              <p>Welcome to dora galaxy</p>
              <p>The galaxy is booming with the efforts of many inhabitants</p>
              <p>If you like to share brain waves</p>
              <p>If you want to explore the wider universe</p>
              <p>If you are committed to building a better world</p>
              <p>Come to be a galaxy resident</p>
              <p>You will get support from the GIftchain Foundation</p>
              <p>So you can convert your DoraDust to real digital currency</p>
              <p>Let’s go to know more galaxy benefits</p>
              <p>1. Once you become a resident, you will have 5000 DoraDust  as the original fund to build our galaxy.</p>
              <p>2. The galaxy will provide 88 DoraDust three times per day to support the growth of residents, which will become invalid if not taken.</p>
              <p>3. The galaxy encourages residents to share and create, so setting up a new planet will receive 500 DoraDust.</p>
              <p>4. If your planet contributes a lot to the galaxy, you can get extra bonus when it enters the ranking.</p>
              <p>NO.1：+10000 DoraDust</p>
              <p>NO.2：+8000 DoraDust</p>
              <p>NO.3：+6000 DoraDust</p>
              <p>NO.4 - NO.5 ：+3000 DoraDust</p>
              <p>NO.6 - NO.10：+1000 DoraDust</p>
              <p>The planet ranking will be published at 12:00 on the last day of every month</p>
              <p>5.If you use your ability earlier to help other planets grow, you will gain more energy.</p>
              <img width="200" height="80" :src="require('@/assets/favicon_1.png')" alt="">
              <img width="200" height="50" :src="require('@/assets/favicon_2.png')" alt="">
              <img width="200" height="90" :src="require('@/assets/favicon_3.png')" alt="">
              <p>rk: return factor</p>
              <p>Qn: total investment</p>
              <p>qi: single investment</p>
              <p>B: bonus</p>
              <p>Rk: Return per deal</p>
              <p>500: To create an new planet will receive 500 dust investment by DustWold</p>
              <p>6. We will support residents who play their responsibility to make galaxy better.
                Return for FMP(founding members of the planet)= (bonus+ investment)*40%.</p>
              <p>7.In order to promote the healthy development of the galaxy,getting in contact with the planet’s owner will cost 1000 DoraDust per time.</p>
              <p>Please pay attention to Galaxy Convention to get more resident policy.</p>
              <p>We will work hard to create galactic welfare all the time.</p>
              <p>Welcome to contact us to better serve the resident.</p>
          </div>
        <!--</div>-->
        <!-- dragger will be automatically added here -->
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Help',
  methods: {
    closeHelp () {
      this.$emit('closeHelp')
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
  background-color #000A
  z-index 6
.help-card
  position absolute
  top 98px
  left 50%
  width 780px
  height 600px
  font-family Ubuntu
  transform translate3d(-50%, 0, 0)
  transition 0.8s
  color white
  background: #232735;
  box-shadow: 0 3px 12px 0 rgba(0,0,0,0.20);
  border-radius: 4px
  >img
    position absolute
    right 21px
    top 21px
    cursor pointer
  .help-title
    font-size 20px
    text-align center
    line-height 2.5
  .nav
    position absolute
    left 0
    top 80px
    width 240px
    .tab
      margin 20px 35px
  .ctn-box
    position absolute
    top 80px
    left 220px
    .size
      width 526px
      height 490px
    .rules-cont
      margin 0
      display flex
      align left
      img
        display flex
        margin 1em 0

</style>
