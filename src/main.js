// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import Router from './router'
import store from './vuex/index'
import { AlertPlugin, ToastPlugin, ConfirmPlugin } from 'vux'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
import scroll from 'components/scroll'
Vue.component('scroll', scroll)
// 懒加载插件
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/no-img.png'),
  loading: require('./assets/no-img.png'),
  attempt: 2
  // listenEvents: [ 'scroll' ]
})
import api from './util/api'
Vue.prototype.post = api.post
Vue.prototype.weixinPay = api.weixinPay
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

