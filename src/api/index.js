import axios from 'axios'

const url = 'http://localhost'

export default {
  login (username, password) {
    return axios.post(`${url}/login`, {
      username,
      password
    }, {
      headers: { 'content-type': 'application/json' }
    })
  },
  register (username, password) {
    return axios.post(`${url}/register`, {
      username,
      password
    }, {
      headers: { 'content-type': 'application/json' }
    })
  },
  setup_planet (name, description, demo, git, team, email) {
    return axios.post(`${url}/user/planet`, {
      name,
      description,
      demo_url: demo,
      github_url: git,
      team_intro: team,
      email
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
    return axios.post(`${url}/user/get-dust`, {
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
  rank_planets () {
    return axios.get(`${url}/rank/planets`, {
      headers: {
        'X-Auth-Token': window.cookieStorage.getItem('token')
      }
    })
  },
  rank_builders () {
    return axios.get(`${url}/rank/builders`, {
      headers: {
        'X-Auth-Token': window.cookieStorage.getItem('token')
      }
    })
  },
  rank_owners () {
    return axios.get(`${url}/rank/owners`, {
      headers: {
        'X-Auth-Token': window.cookieStorage.getItem('token')
      }
    })
  }
}
