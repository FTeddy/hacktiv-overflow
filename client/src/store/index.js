import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// const baseAxios = axios.create({
//   baseURL: 'http://localhost:3000/'
// })

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    jwt: '',
    userId: ''
  },
  mutations: {
    loginCredMut (state, data) {
      state.jwt = data.token
      state.userId = data.userId
    }
  },
  actions: {
    loginCredAct ({commit}, data) {
      commit('loginCredMut', data)
    }
  }
})

export default store
