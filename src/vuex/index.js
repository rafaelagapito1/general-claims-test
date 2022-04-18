import { createStore } from 'vuex'

export default createStore({
  state: {
    DataStorage: localStorage.getItem("@database") || "[]",
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
