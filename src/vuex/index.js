import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

const state = {
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  totalBuyCount: '', // 购物车总数
  cartList: {}, // 加入购物车的商品列表
  shopDetail: null, // 店铺详情信息
  userInfo: null, // 用户信息
  storeId: null, // 商铺id
  orderDetail: null, // 订单详情
  login: false, // 是否登录
  removeAddress: [], // 移除地址
  addAddress: '', // 新增地址
  token: '', // token
  depotId: '', // 仓库storeId
  shopId: '',  // 店铺storeId
  thisShop: '', // 购物车及时送相关信息
  nextShop: '', // 购物车次日达相关信息
  carOrderThisGoodsList: [], // 确认下单商品数组 即时送
  carOrderNextGoodsList: [], // 确认下单商品数组 次日达
  sendWay: '', // 次日达送货方式
  Thisfreight: '', // 运费 及时送
  Nextfreight: '', // 运费 次日达
  shippingInfo: '', // 收货相关信息
  selectedTotalCountThis: '', // 订单商品数 及时送
  selectedTotalCountNext: '',  // 订单商品数 次日达
  totalPriceThis: '',   // 确认订单商品总价 及时送
  totalPriceNext: '',    // 确认订单商品总价 次日达
  orderId: '' // 订单Id
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
