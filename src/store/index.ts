import Vue from 'vue'
import Vuex from 'vuex'
import { Task } from '../types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [] as Task[]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
