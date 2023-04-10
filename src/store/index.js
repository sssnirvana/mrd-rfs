import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import tranfer from './modules/tranfer'
import userinfo from './modules/userinfo'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tranfer,
	userinfo
  },
  getters
})

export default store
