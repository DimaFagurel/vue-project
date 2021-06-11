import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// Vue.axios.defaults.baseUrl = "";

export default new Vuex.Store({
  state: {
    packages: [],
    currentPackage: {}
  },
  getters:{
    getPackages:state => state.packages,
    getCurrentPackage:state => state.currentPackage,
  },
  mutations: {
    SAVE_PACKAGES(state, packages) {
      state.packages = packages;
    },
    SAVE_CURRENT_PACKAGES(state, currentPackage) {
      state.currentPackage = currentPackage;
    },
  },
  actions: {
    loadPackages({ commit }) {
      Vue.axios.get("https://data.jsdelivr.com/v1/stats/packages?limit=250").then(result => {
        commit('SAVE_PACKAGES', result.data)
    }).catch(console.log);
    },
    async loadPackageDetail({ commit }, payload) {
      let _package = `${payload.type}/${payload.name}`;
      let result = await Vue.axios.get(`https://data.jsdelivr.com/v1/package/${_package}/stats`);
      commit('SAVE_CURRENT_PACKAGES', result.data);
    },
  }
})
