// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import i18n from './i18n/i18n'
import App from './Alone'
import Element from 'element-ui'
import axios from './util/http'
import promise from 'es6-promise'
// import store from "./vuex/store";
// import Vuex from "vuex";
// Vue.use(Vuex);
import VueRouter from 'vue-router'
import ELTable from './util/table'
import routes from './routes'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/framework/css/global.css'
import './assets/js/common/element-ui/index.css'
import './assets/css/style.css'
import './assets/css/bass.css'
import Enum from './util/enum'

import DateFormat from './util/date'
import * as socketApi from './util/websocket'
import * as validate from './util/validateUtil'

Vue.prototype.$ELTable = ELTable
Vue.prototype.$Enum = Enum
Vue.prototype.$DateFormat = DateFormat
Vue.prototype.$socketApi = socketApi
Vue.prototype.$validate = validate

promise.polyfill()
window.axios = axios

Vue.use(Element, { size: 'small', zIndex: 3000 })
Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // NProgress.start();
  console.log(to)
  if (to.path === '/loginAlone') {
    sessionStorage.removeItem('token')
  }
  let token = sessionStorage.getItem('token')
  console.log('token==' + token)
  if (!token && (to.path !== '/loginAlone')) {
    window.location.reload()
    console.log(to)
    next({
      path: '/loginAlone'
    })
  } else {
    next()
  }
  next()
})

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#alone')
