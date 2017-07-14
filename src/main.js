// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import Router from './router'
import Store from './vuex/'
import { AlertPlugin } from 'vux'
import api from './util/api'
import vueScroll from 'vue-scroll'
import VueLazyload from 'vue-lazyload'
import './common/style/index.less'
Vue.use(AlertPlugin)
Vue.use(vueScroll)
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: './assets/home_GoodsDefaultImg@2x.png',
  attempt: 1,
  listenEvents: ['scroll', 'mousewheel']
})

Vue.prototype.post = api.post
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app-box',
  template: '<App/>',
  components: {App},
  router: Router,
  Store
})

