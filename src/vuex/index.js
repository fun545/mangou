import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

const state = {
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  cartList: {}, // 加入购物车的商品列表
  shopDetail: null, // 店铺详情信息
  userInfo: null, // 用户信息
  storeId: null, // 商铺id
  orderDetail: null, // 订单详情
  login: false, // 是否登录
  removeAddress: [], // 移除地址
  addAddress: '', // 新增地址
  token: '', // token
  depotId: '',
  shopId: ''
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
