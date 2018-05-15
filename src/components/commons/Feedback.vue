<template>
  <div class="mask">
    <div class="feedback-card">
      <h3>Feedback</h3>
      <input type="text"  v-model="feedbackInfo.email">
      <input type="text"  v-model="feedbackInfo.title">
      <div class="choice">
        <input type="checkbox" id="feedbackChoice1"
               v-model="feedbackInfo.advice">
        <label for="feedbackChoice1">Advice</label>
        <input type="checkbox" id="feedbackChoice2"
               v-model="feedbackInfo.cooperation">
        <label for="feedbackChoice2">Cooperation</label>
        <input type="checkbox" id="feedbackChoice3"
               v-model="feedbackInfo.others">
        <label for="feedbackChoice3">Others</label>
      </div>
      <textarea rows="10" v-model="feedbackInfo.comment"></textarea>
      <div class="create-btn" @click="sendFeedback"><span>Send</span></div>
      <div class="quit-btn" @click="closeFeedback"><span>Quit and Delete</span></div>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'Feedback',
  data () {
    return {
      feedbackInfo: {
        email: ' Your Email Address',
        title: ' Title',
        advice: false,
        cooperation: false,
        others: false,
        comment: ' Comment text'
      },
    }
  },
  methods: {
    sendFeedback () {
      // TODO
      // this.feedbackIsOpen = false
      const info = {
        email: this.feedbackInfo.email,
        title: this.feedbackInfo.title,
        comment: this.feedbackInfo.comment,
        type: this.cooperation ? 'cooperation' : 'advice'
      }
      if (this.feedbackInfo.others) {
        info.type = 'others'
      }
      api.send_feedback(info).then((res) => {
        const d = res.data
        if (d.errcode) {
          alert(d.errmsg)
        } else {
          alert('We\'ve received your feedback. Thank you!')
        }
      })
      this.$emit('closeFeedback')
    },
    closeFeedback () {
      this.$emit('closeFeedback')
    }
  }
}
</script>

<style lang="stylus" scoped>
.feedback-card
  position absolute
  top 98px
  left 52%
  transform translate3d(-50%, 0, 0)
  width 778px
  height 550px
  background-color rgba(35,39,53,1)
  border-radius 4px
  transition 0.8s
  .choice
    display flex
    margin 15px  370px 10px 84px
    >label
      color white
      margin-top 8px
      margin-left 15px
      margin-right 80px
    >input
      margin 10px 0
      background-color rgba(255,255,255,0.11)
  >input
    height 40px
    width 80%
    background: rgba(0,0,0,0.57);
    border-radius: 3px;
    border 0
    font-size 14px
    color rgba(255,255,255,0.30)
    text-align justify
    margin 15px 76px 5px 78px
  textarea
    width 80%
    background: rgba(0,0,0,0.57);
    border-radius: 3px;
    border 0
    font-size 14px
    color rgba(255,255,255,0.30)
    margin 10px 76px 25px 78px
    text-align justify
  h3
    margin 40px 344px 15px 344px
    font-size 20px
    color white
  .create-btn
    position absolute
    left 81px
    width 160px
    height 40px
    background-color rgba(255,113,62,0.8)
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
    border-radius: 5.84px;
    cursor pointer
    span
      position absolute
      top 30%
      left 40%
      color white
      font-size 14px
      text-align center
  .quit-btn
    position absolute
    left 281px
    width 160px
    height 40px
    //margin 459px 37px 59px 281px
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
.mask
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  background-color #000A
  z-index 6
</style>
