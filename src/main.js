import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios);

Vue.component("FooterSocial",require('./components/FooterSocial').default)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
