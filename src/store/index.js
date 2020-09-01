import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    options: [],
    activeIndex: '',
    userInfo: {},
    blogInfo: {},
    getData: {}
  },
  mutations: {
    addTabs (state, data) {
      this.state.options.push(data)
    },
    deleteTabs (state, index) {
      this.state.options.splice(index, 1)
    },
    setActiveIndex (state, index) {
      this.state.activeIndex = index
    },
    saveDetailInfo (state, info) {
      this.state.userInfo = info
    },
    deleteAllTabs (state) {
      this.state.options = []
    },
    deleteUserInfo (state) {
      this.state.userInfo = {}
    },
    saveBolgInfo (sate, info) {
      this.state.blogInfo = info
    }
  },
  actions: {
  },
  modules: {
  }
})
