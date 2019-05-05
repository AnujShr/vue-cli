import Vue from 'vue'
import Vuex from 'Vuex'
import sourceData from '@/data'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: sourceData
})
export default store
