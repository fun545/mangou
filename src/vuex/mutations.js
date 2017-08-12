export default {
  // 购物车总数
  increment (state, count) {
    // vuex储存m-totalBuyCount
    localStorage.setItem('m-totalBuyCount', count)
    // 变更状态
    state.totalBuyCount = count
    // console.log(state.totalBuyCount)
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
  getUserInfo (state, val) {
    state.userInfo = val
    localStorage.setItem('m-userInfo', JSON.stringify(val))
  }
}
