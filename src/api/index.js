import axios from 'axios'

const url = 'https://ranking.dorahacks.com/api'

export default {
  login (username, password) {
    return axios.post(`${url}/login`, {
      username,
      password
    }, {
      headers: { 'content-type': 'application/json' }
    })
  },
  logout () {
    return axios.post(`${url}/logout`, {
      headers: {
        'content-type': 'application/json',
        'X-Auth-Token': window.cookieStorage.getItem('token') }
    })
  },
  register (username, email, password) {
    return axios.post(`${url}/register`, {
      username,
      password,
      email
    }, {
      headers: { 'content-type': 'application/json' }
    })
  },
  login_auth (code) {
    return axios.post(`${url}/auth-login/github`, { code: code },
      { headers: { 'content-type': 'application/json' } })
  },
  register_auth_git (code) {
    return axios.post(`${url}/register/github`, { code: code },
      { headers: { 'content-type': 'application/json' } })
  },
  register_kcash (code, addr, invitation) {
    return axios.post(`${url}/register/kcash`, { code: code, addr: addr, invite: invitation },
      { headers: { 'content-type': 'application/json' } })
  },
  setup_planet (option) {
    return axios.post(`${url}/user/planet`, {
      name: option.name,
      description: option.description,
      demo_url: option.demo,
      github_url: option.git,
      team_intro: option.team,
      email: option.email,
      keywords: option.keywords
    }, {
      headers: {
        'content-type': 'application/json',
        'X-Auth-Token': window.cookieStorage.getItem('token')
      }
    })
  },
  send_feedback (option) {
    return axios.post(`${url}/feedback`, {
      content: option.comment,
      title: option.title,
      type: option.type,
      email: option.email
    }, {
      headers: {
        'content-type': 'application/json',
        'X-Auth-Token': window.cookieStorage.getItem('token')
      }
    })
  },
  build (pname, dnum) {
    return axios.post(`${url}/user/build`, {
      planet_name: pname,
      dust_num: dnum
    }, {
      headers: {
        'content-type': 'application/json',
        'X-Auth-Token': window.cookieStorage.getItem('token')
      }
    })
  },
  get_dust () {
    return axios.post(`${url}/user/get-dust`, null, {
      headers: {
        'X-Auth-Token': window.cookieStorage.getItem('token')
      }
    })
  },
  spy (name) {
    return axios.get(`${url}/user/spy/${name}`, {
      headers: {
        'X-Auth-Token': window.cookieStorage.getItem('token')
      }
    })
  },
  notification (uid) {
    return axios.get(`${url}/notifications/${uid}`, {
      headers: {
        'X-Auth-Token': window.cookieStorage.getItem('token')
      }
    })
  },
  rank_winners () {
    return axios.get(`${url}/rank/winners`)
  },
  rank_dashboards () {
    return axios.get(`${url}/rank/dashboard`)
  },
  rank_bounty () {
    return axios.get(`${url}/rank/bounty`)
  },
  rank_hacker () {
    return axios.get(`${url}/rank/hacker`)
  },
  owned_planets (name) {
    return axios.get(`${url}/hacker/owned-planets/${name}`, {
      headers: {
        'X-Auth-Token': window.cookieStorage.getItem('token')
      }
    })
  },
  builded_planets (name) {
    return axios.get(`${url}/hacker/builded-planets/${name}`, {
      headers: {
        'X-Auth-Token': window.cookieStorage.getItem('token')
      }
    })
  },
  posted_rewards () {
    return axios.get(`${url}/hacker/posted-rewards`, {
      headers: {
        'X-Auth-Token': window.cookieStorage.getItem('token')
      }
    })
  },
  planets_show () {
    return axios.get(`${url}/planets/show`)
  },
  profile_main () {
    return axios.get(`${url}/profile/main`, {
      headers: {
        'X-Auth-Token': window.cookieStorage.getItem('token')
      }
    })
  },
  hacker (name) {
    return axios.get(`${url}/hacker/${name}`)
  },
  planets_one (name) {
    return axios.get(`${url}/planets/one/${name}`, {
      headers: {
        'X-Auth-Token': window.cookieStorage.getItem('token')
      }
    })
  },
  planet_all () {
    return axios.get(`${url}/planets/all`)
  },
  planet_list () {
    return axios.get(`${url}/planets/ranklist`)
  },
  bounty_show () {
    return axios.get(`${url}/bounty/show`)
  },
  bounty_setup (option) {
    return axios.post(`${url}/user/bounty`, {
      name: option.name,
      description: option.description,
      keywords: option.keywords,
      email: option.email
    }, {
      headers: {
        'content-type': 'application/json',
        'X-Auth-Token': window.cookieStorage.getItem('token')
      }
    })
  },
}
