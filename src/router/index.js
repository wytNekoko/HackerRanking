import Vue from 'vue'
import Router from 'vue-router'
import ListView from '@/components/ListView'
import Profile from '@/components/Profile'
import Ranking from '@/components/Ranking'
import RankHunters from '@/components/RankHunters'
import Register from '@/components/Register'
import NewPlanet from '@/components/NewPlanet'
import Hunter from '@/components/Hunter'
import PostedRewards from '@/components/PostedRewards'
import OwnedPlanets from '@/components/OwnedPlanets'
import BuiltPlanets from '@/components/BuiltPlanets'
import PlanetView from '@/components/PlanetView'
import NewBountyReward from '@/components/NewBountyReward'
import Login from '@/components/Login'
import ProjectsRanking from '@/components/ProjectsRanking'
import HackersRanking from '@/components/HackersRanking'
import HackerView from '@/components/HackerView'
import HackerOwnedProjects from '@/components/HackerOwnedProjects'
import HackerInvested from '@/components/HackerInvested'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProjectsRanking',
      component: ProjectsRanking
    },
    {
      path: '/hackers',
      name: 'HackersRanking',
      component: HackersRanking
    },
    {
      path: '/hacker',
      name: 'HackerView',
      component: HackerView
    },
    {
      path: '/hacker/owned-projects',
      name: 'HackerOwnedProjects',
      component: HackerOwnedProjects
    },
    {
      path: '/hacker/invested',
      name: 'HackerInvested',
      component: HackerInvested
    },
    {
      path: '/list',
      name: 'ListView',
      component: ListView
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/ranking/planets',
      name: 'Ranking',
      component: Ranking
    },
    {
      path: '/ranking/hunters',
      name: 'RankHunters',
      component: RankHunters
    },
    {
      path: '/setup-planet',
      name: 'NewPlanet',
      component: NewPlanet
    },
    {
      path: '/post-reward',
      name: 'NewBountyReward',
      component: NewBountyReward
    },
    {
      path: '/hunter',
      name: 'Hunter',
      component: Hunter
    },
    {
      path: '/profile/posted-rewards',
      name: 'PostedRewards',
      component: PostedRewards
    },
    {
      path: '/profile/owned-projects',
      name: 'OwnedPlanets',
      component: OwnedPlanets
    },
    {
      path: '/profile/invested',
      name: 'BuiltPlanets',
      component: BuiltPlanets
    },
    {
      path: '/project-view',
      name: 'PlanetView',
      component: PlanetView
    }
  ]
})
