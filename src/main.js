import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"

Vue.config.productionTip = false
import { BootstrapVue, IconsPlugin, BVToastPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(BVToastPlugin);
Vue.use(require('vue-moment'));
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexChart', VueApexCharts)
axios.defaults.baseURL = 'http://127.0.0.1:5000';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
