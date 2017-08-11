export default {
  // 购物车总数
  increment (state, count) {
    // vuex储存m-totalBuyCount
    localStorage.setItem('m-totalBuyCount', count)
    // 变更状态
    state.totalBuyCount = count
    // console.log(state.totalBuyCount)
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
