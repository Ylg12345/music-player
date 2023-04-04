import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

export default store