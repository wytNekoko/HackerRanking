<template>
   <div class="bg">
     <li>
       <img :src="require('@/assets/dorahacks.jpeg')" width="300" height="60">
     </li>
     <li>
       <span>Invitation Code</span>
     </li>
     <li style="margin-top: 10px">
       <input type="text" v-model="invitation" style="width: 300px">
     </li>
     <li>
       <span>Your KCash Address</span>
     </li>
    <li style="margin-top: 10px">
        <input type="text" v-model="address">
    </li>
     <li>
       <div v-if="enable" class="able-button" @click="auth">Signup with Github and Get Extra 50 CNY</div>
       <div v-else class="unable-button">Signup with Github and Get Extra 50 CNY</div>
     </li>
   </div>
</template>

<script>
import api from '@/api'
import OAuthPopup from '../utils/popup'

export default {
  name: 'KCash',
  data () {
    return {
      address: null,
      invitation: null,
      redirect_uri: 'https://ranking.dorahacks.com/',
      // redirect_uri: 'http://localhost:8080/'
    }
  },
  computed: {
    enable: function () {
      if (this.address) {
        return true
      }
      return false
    }
  },
  methods: {
    auth () {
      const provider = 'github'
      const url = 'https://github.com/login/oauth/authorize?client_id=ae68a17db805afccb892&scope=repo user'//ae68a17db805afccb892
      const popupOptions = { width: 1020, height: 618 }
      const redirect = this.redirect_uri
      this.oauthPopup = new OAuthPopup(url, provider, popupOptions)
      this.oauthPopup.open(redirect, false).then((res) => {
        console.log(res.code)
        api.register_kcash(res.code, this.address, this.invitation).then((response) => {
          const dd = response.data
          if (dd.errcode) {
            alert(dd.errmsg)
          } else {
            alert('Register success')
            this.$emit('update', dd)
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.bg
  width 100%
  height 100%
  align-items center
  text-align center
  li
    margin-top: 30px;
    position: relative;
    //margin-left: 170px;
    span
      color rgba(255,255,255,0.5)
      font-size 16px
      width 160px
      height 50px
      align-items center
      text-align center
    input
      border none
      width 500px
      height 50px
      background-color white
      color black
      border-radius 25px
      outline none
      box-sizing border-box
      padding 0 30px
      font-size 18px
  .able-button
    width 350px
    height 40px
    line-height 40px
    text-align center
    border solid 1px #fff
    color white
    border-radius 6px
    margin 20px auto
    cursor pointer
  .unable-button
    width 350px
    height 40px
    line-height 40px
    text-align center
    border solid 1px gray
    color gray
    border-radius 6px
    margin 20px auto
</style>
