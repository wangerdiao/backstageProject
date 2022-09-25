import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    if(result.code==20000) {
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    }else {
      return Promise.reject(new Error('fail'))
    }
  },

  // get user info
  async getInfo({ commit, state }) {
    let result = await  getInfo(state.token)
    if (!result.data) {
      return reject('Verification failed, please Login again.')
    }
    if(result.code==20000) {
      const { name, avatar } = result.data
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      return 'ok'
    }else {
      return Promise.reject(new Error('fail'))
    }
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response

    //     if (!data) {
    //       return reject('Verification failed, please Login again.')
    //     }

    //     const { name, avatar } = data

    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout
  async logout({ commit, state }) {
    let result = await logout(state.token)
    if(result.code==20000) {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      return 'ok'
    }else {
      return Promise.reject(new Error('fail'))
    }
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit('RESET_STATE')
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  async resetToken({ commit }) {
    let result = await removeToken()
    if(result.code == 20000) {
      commit('RESET_STATE')
      return 'ok'
    }else {
      return Promise.reject(new Error('fail'))
    }
    // return new Promise(resolve => {
    //   removeToken() // must remove  token  first
    //   commit('RESET_STATE')
    //   resolve()
    // })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

