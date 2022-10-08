import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRouters,constantRoutes,anyRouter } from '@/router'
import router from '@/router'
const getDefaultState = () => { //返回state
  return {
    token: getToken(),
    name: '',
    avatar: '',
    //服务器返回的菜单信息【根据不同的角色，返回的标记信息，数组里面的元素是字符串】
    routes: [],
    buttons: [], //按钮权限的信息
    roles: [], //角色信息
    //对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的路由】
    resultAsyncRoutes: [],
    resultAllRoutes:[] //最终合并的全部路由
  }
}

const state = getDefaultState()

const mutations = {
  //重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  //存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.name = userInfo.name//用户名
    state.avatar = userInfo.avatar//用户头像
    state.routes = userInfo.routes //用户菜单权限标记
    state.buttons = userInfo.buttons //按钮权限标记
    state.roles = userInfo.roles //用户角色信息
  },
  SET_RESULTASYNCROUTES: (state, asyncRouters) => {
    //保存当前用户的异步路由，但是需要注意一个用户需要展示多个路由：常量路由，异步路由，任意路由
    state.resultAsyncRoutes = asyncRouters
    state.resultAllRoutes =  constantRoutes.concat(state.resultAsyncRoutes,anyRouter)
    //给路由器添加新的路由
    router.addRoutes(state.resultAllRoutes)
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    if (result.code == 20000) {
      //存储token
      commit('SET_TOKEN', result.data.token)
      //本地持久化存储token
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },

  // get user info
  async getInfo({ commit, state }) {
    let result = await getInfo(state.token)
    if (!result.data) {
      return reject('Verification failed, please Login again.')
    }
    if (result.code == 20000) {
      //获取用户的信息：返回的数据包含用户名name,用户头像avatar,routes【返回的标志：不同的用户应该展示哪些菜单的标记】，roles[用户角色信息],buttons[按钮的信息，按钮权限用的标记]
      const userInfo = result.data
      commit('SET_USERINFO', userInfo)
      commit('SET_RESULTASYNCROUTES', computerAsyncRouters(asyncRouters, userInfo.routes))
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },

  // user logout
  async logout({ commit, state }) {
    let result = await logout(state.token)
    if (result.code == 20000) {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      return 'ok'
    } else {
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
    if (result.code == 20000) {
      commit('RESET_STATE')
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }
}

//定义一个函数，两个数组进行对比，对比出当前用户到底显示哪些异步路由
const computerAsyncRouters = (asyncRouters, routes) => {
  //过滤出当前用户【超级管理元|普通员工】需要展示的异步路由
  return asyncRouters.filter( item => {
    //数组当中没有这个元素返回-1,有的话返回索引值
    //但注意asyncRouters里面还有children路由，需要进行深层次的判断，由此需要用到递归
    if(routes.indexOf(item.name)!=-1) {
      //递归children的路由
      if(item.children&&item.children.length) {
        item.children = computerAsyncRouters(item.children, routes)
      }
      return true
    }
  })
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

