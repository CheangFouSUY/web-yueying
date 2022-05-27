import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import $ from 'jquery'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
// axios.defaults.baseURL = 'http://123.12.123.12:8000';
axios.defaults.baseURL = 'http://127.0.0.1:8000'
window.jQuery = $
window.$ = $

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
