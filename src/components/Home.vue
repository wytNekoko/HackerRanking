<template>
  <div>
    <!--================banner Area =================-->
    <section class="banner-area">
      <div class="banner-words">
        <h4>San Jose, June 26th - 27th</h4>
        <h3 class="title">BLOCKCHAIN FOR FUTURE <br>HACKATHON</h3>
        <a href="#" class="btn-join btn-hover-two">JOIN US NOW!</a>
      </div>
      <div class="banner-bg">
        <img :src="require('@/assets/poster.png')" class="banner-bg-img">
      </div>
      <div class="clear"></div>
    </section>
    <div class="cohost">
      <div class="cohost-content">
        <div class="cohost-dl">
          <div class="cohost-dl-block">
            <img :src="require('@/assets/truechain.jpeg')" class="cohost-img">
            <div class="cohost-dl-block-card">
              TrueChain Incentive Plan
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="stylus" scoped>
//a
//  color #e84545
//  text-decoration none
//a:hover, a:focus
//  text-decoration none
//  -moz-transition background-color, color, 0.3s
//  -o-transition background-color, color, 0.3s
//  -webkit-transition background-color, color, 0.3s
//  transition background-color, color, 0.3s
.section
  box-sizing border-box
.no-padding
  padding 0
.no-gutter
  [class*=col-]
    padding-right 0
    padding-left 0
.d-flex
  display flex
.btn-join
  font-size 14px
  line-height 30px
  color #fff
  background-color: rgb(56, 192, 191)
  font-weight 500
  padding 4px 40px
  display inline-block
  border 0.3px solid rgb(56, 192, 191)
  transition all 0.3s linear
  text-transform uppercase
  border-radius 6px
  box-shadow none

  &:hover
    background #00c8e6
    color #fff
.view-btn
  background #fff
  &:hover
    border-color #222222
    background #222222
.btn-hover-two
  color #fff
  border-color #fff
  &:hover
    background transparent
    color #00c8e6
.banner-area
  min-height 70vh
  width 100%
  position relative
  background linear-gradient(to right, rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7))
  background-size cover
.banner-words
  width 100%
  max-width 1140px
  position relative
  text-align left
  display inline-block
  box-sizing border-box
  margin-top 180px
  margin-bottom 100px
  padding: 0 11vw;
  color #fff
  z-index: 4
  h4
    font-size 20px
    color #b9b9bc
    line-height 0
    font-weight normal
  h3
    font-size 28px
  .btn-hover-two
    margin-top 15px
.banner-bg
  min-height 70vh
  height 100%
  width 100%
  position absolute
  left 0
  top 0
  z-index 2
  text-align center
  overflow hidden
.banner-bg-img
  position absolute
  right: 6vw;
  top: 0vw;
  width: 50vw;
  height: 50vw;
  z-index 20
  min-height 400px
  min-width 400px
  max-width 600px
  max-height 600px
.cohost
  width 100%
  background #fa
  text-align center
  position relative
  padding 80px 0
  .cohost-content
    width 100%
    max-width 1440px
    display inline-block
    text-align center
  .cohost-dl
    width 90%
    max-width 1200px
    margin auto
    >div
      float left
    .cohost-dl-block
      text-align center
      width 50%
      box-sizing border-box
      margin 60px 0
      padding 20px 0
      .cohost-dl-block-card
        width 70%
        height 100%
        background #fff
    .cohost-img
      width 70px
      height 70px
      border-radius 3px
      float left
</style>
