import Vue from 'vue'
import Router from 'vue-router'
import HelloPage from '@/components/HelloPage'
import Profile from '@/components/Profile'
import Ranking from '@/components/Ranking'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloPage',
      component: HelloPage
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/ranking',
      name: 'Ranking',
      component: Ranking
    }
  ]
})
