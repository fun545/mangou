import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 从环境变量判断当前的运行模式
// const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)

const state = {
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  villageInfo: {},
  totalBuyCount: 0, // 购物车总数
  totalPrice: 0, // 购物车总价
  cartList: {}, // 加入购物车的商品列表
  shopDetail: null, // 店铺详情信息
  userInfo: null, // 用户信息
  storeId: null, // 商铺id
  hasThisShop: true,
  hasNextShop: true,
  orderDetail: null, // 订单详情
  login: false, // 是否登录
  removeAddress: [], // 移除地址
  addAddress: '', // 新增地址
  token: '', // token
  depotId: '', // 仓库storeId
  shopId: '',  // 店铺storeId
  depotInfo: {}, // 仓库相关信息
  shopInfo: {},   // 店铺相关信息
  shopStatus: 0, // 店铺状态：0 正常
  thisShop: '', // 购物车及时送相关信息
  nextShop: '', // 购物车次日达相关信息
  thisCartList: '', // 购物车及时送商品列表
  nextCartList: '', // 购物车次日达商品列表
  buyWay: '', // nomalBuy fastBuy
  serveRangeList: '', // 服务范围
  carOrderThisGoodsList: [], // 确认下单商品数组 即时送
  carOrderNextGoodsList: [], // 确认下单商品数组 次日达
  sendWay: '', // 次日达送货方式
  Thisfreight: '', // 运费 及时送
  Nextfreight: '', // 运费 次日达
  shippingInfo: '', // 收货相关信息
  orderTotalPrice: 0, // 订单合计
  selectedTotalCountThis: '', // 订单商品数 及时送
  selectedTotalCountNext: '',  // 订单商品数 次日达
  totalPriceThis: '',   // 确认订单商品总价 及时送
  totalPriceNext: '',    // 确认订单商品总价 次日达
  orderId: '', // 订单Id
  mapBackPath: '', // 进入地图回跳path
  orderDeletFlag: false, // 订单列表子组件删除事件触发
  addressInfo: {
    cityId: localStorage.getItem('m-cityId'),
    areaId: localStorage.getItem('m-areaId'),
    villageId: localStorage.getItem('m-villageId'),
    villageName: localStorage.getItem('m-villageName')
  }, // 编辑地址信息
  addAddressBackPath: '', // 添加地址回退path
  SearchVillagePath: '', // 搜索小区回退地址
  selectVillagePath: '', // 搜索选择小区跳转地址
  payOrder: {}, // 去支付订单
  totalPay: '', // 支付总金额
  oKPayBackPath: '' // 成功支付页面回跳地址(跳购物)
}

export default new Vuex.Store({
  // strict: debug,
  /* eslint-disable no-undef */
  // plugin: debug ? [createdLogger()] : [], // 调试模式加入日志插件
  state,
  getters,
  actions,
  mutations
})
