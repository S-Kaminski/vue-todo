import Vue from 'vue'
import Vuex from 'vuex'
import { Task } from '../types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [] as Task[]
  },
  getters: {
    tasks (state) {
      return state.tasks;
    },
  },
  mutations: {
    addNewTask(state, newTask) {
      state.tasks.push({
        id: newTask.id,
        description: newTask.description,
        important: newTask.important
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
