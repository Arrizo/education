import config from '@/config/client'
import Storage from '@/utils/Storage_Cookie'
import * as TypeConfig from '../mutationTypes'
const state = {
  clientData: config.CLIENT,
  userInfo: Storage.getCookie(TypeConfig.LOGIN_INFO) ? JSON.parse(Storage.getCookie(TypeConfig.LOGIN_INFO)) : {}
}

const actions = {
  loginInfo ({commit, state}, params) {
    Storage.setCookie(TypeConfig.LOGIN_INFO, params, 1)
    commit(TypeConfig.LOGIN_INFO, params)
  },
  logOut ({commit, state}) {
    Storage.removeCookie(TypeConfig.LOGIN_INFO)
    commit(TypeConfig.LOGOUT_INFO)
  }
}
const mutations = {
  [TypeConfig.LOGIN_INFO] (state, params) {
    state.userInfo = params
  },
  [TypeConfig.LOGOUT_INFO] (state, params) {
    state.userInfo = {}
  }
}
export default{
  state,
  actions,
  mutations
}
