<template>
  <div class="hello">
    <hello-card class="center"></hello-card>
  </div>
</template>

<script>
import HelloCard from './commons/HelloCard'

export default {
  name: 'HelloPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    HelloCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.hello
  width 100%
  height 100%
  background-color #441D66
  position relative
.center
  position absolute
  top 50%
  left 50%
  transform translate3d(-50%, -50%, 0)
</style>
