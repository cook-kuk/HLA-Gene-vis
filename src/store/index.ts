import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mainColor: '#0F4C81',
  },
  getters: {
    mainColor: (state) => state.mainColor,
  },
  mutations: {},
  actions: {},
  modules: {},
});
