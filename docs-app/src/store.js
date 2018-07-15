import Vuex from 'vuex'
import Vue from 'vue'

import axios from 'axios'

Vue.use(Vuex)

const SAVE_DATA = 'SAVE_DATA'
const SELECT_ICON = 'SELECT_ICON'

const store = new Vuex.Store({
  state: {
    selectedIcon: '',
    data: {
      categories: [],
      names: [],
      icons: {}
    }
  },
  getters: {
    categories(state) {
      return state.data.categories
    },
    names(state) {
      return state.data.names
    },
    icons(state) {
      return state.data.icons
    }
  },
  mutations: {
    [SAVE_DATA](state, payload) {
      state.data.categories = payload.categories
      state.data.names = payload.names
      state.data.icons = payload.icons
    },
    [SELECT_ICON](state, icon) {
      state.selectedIcon = icon
    }
  },
  actions: {
    async loadData({ commit }) {
      const data = await axios.get('//gameicon-names.glitch.me/data.json', { json: true }).then(res => res.data)
      commit(SAVE_DATA, data)
    },
    selectIcon({ commit }, icon) {
      commit(SELECT_ICON, icon)
    }
  }
})

export default store
