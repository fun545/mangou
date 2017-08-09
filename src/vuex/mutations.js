export default {
  increment (state, count) {
    // vuex储存m-totalBuyCount
    localStorage.setItem('m-totalBuyCount', count)
    // 变更状态
    state.totalBuyCount = count
    console.log(state.totalBuyCount)
  }
}
