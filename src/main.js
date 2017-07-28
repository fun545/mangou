// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import Router from './router'
import store from './vuex/index'
import { AlertPlugin } from 'vux'
import api from './util/api'
import VueLazyload from 'vue-lazyload'
import './common/style/index.less'
Vue.use(AlertPlugin)
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

// 时间戳格式化过滤器
Vue.filter('formatTime', (value) => {
  function add0 (m) {
    return m < 10 ? '0' + m : m
  }
  var time = new Date(parseInt(value))
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var i = time.getMinutes()
  var s = time.getSeconds()
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(i) + ':' + add0(s)
})

/* eslint-disable no-new */
new Vue({
  el: '#app-box',
  template: '<App/>',
  components: {App},
  router: Router,
  store
})

