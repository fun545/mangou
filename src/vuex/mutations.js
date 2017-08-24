export default {
  // 储存次日达和即时送storeInfo
  saveStoreInfo (state, storeList) {
    state.depotInfo = storeList[0]
    state.shopInfo = storeList[1]
  },
  // 购物车总数
  increment (state, count) {
    // vuex储存m-totalBuyCount
    localStorage.setItem('m-totalBuyCount', count)
    // 变更状态
    state.totalBuyCount = count
    // console.log(state.totalBuyCount)
  },
  // 改变购物车总价
  changeTotalPrice (state, val) {
    state.totalPrice = val
  },
  // 减少购物车数量
  totalBuyCountReduce (state, count) {
    state.totalBuyCount = state.totalBuyCount - count
    localStorage.setItem('m-totalBuyCount', state.totalBuyCount)
  },
  // 增加购物车数量
  totalBuyCountPlus (state, count) {
    state.totalBuyCount = state.totalBuyCount + count
    localStorage.setItem('m-totalBuyCount', state.totalBuyCount)
  },
  // 确认订单列表
  saveOrderNumList (state, val) {
    state.orderNumList = val
  },
  // 储存购物车及时送相关信息
  saveThisShop (state, val) {
    state.thisShop = val
  },
  // 储存购物车次日达相关信息
  saveNextShop (state, val) {
    state.nextShop = val
  },
  // 储存购物车shippingInfo
  saveShippingInfo (state, val) {
    state.shippingInfo = val
  },
  // 存储用户信息
  getUserInfo (state, val) {
    state.userInfo = val
    localStorage.setItem('m-userInfo', JSON.stringify(val))
  },
  // 快速购买info
  getFastBuyInfo (state, val) {
    state.fastBuyInfo = val
  },
  // 保存新增编辑地址
  saveAddress (state, val) {
    state.addressInfo = val
  },
  // 保存地图回退地址
  saveMapBackPath (state, val) {
    state.mapBackPath = val
  },
  // 编辑地址
  edtAddress (state, val) {
    state.addressInfo.cityId = val.cityId
    state.addressInfo.areaId = val.areaId
    state.addressInfo.villageId = val.villageId
    state.addressInfo.villageName = val.villageName
  },
  // 保存新增回退地址
  saveAddAddress (state, val) {
    state.addAddressBackPath = val
  },
  // 保存小区搜索回退地址
  saveSearchVillagePath (state, val) {
    state.SearchVillagePath = val
  },
  // 保存选择小区回跳地址
  saveSelectVillagePath (state, val) {
    state.selectVillagePath = val
  },
  // 储存支付地订单
  savePayOrder (state, val) {
    state.payOrder = val
  },
  // 储存支付总金额
  saveTotalPay (state, val) {
    state.totalPay = val
  },
  saveOkPayBackPath (state, val) {
    state.oKPayBackPath = val
  }
}
