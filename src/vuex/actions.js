export default {
  saveServeRange ({commit}, _this) {
    _this.post('/shipping/queryVillegeBystoreId', {
      token: localStorage.getItem('m-token'),
      villageId: localStorage.getItem('m-villageId')
    }).then((res) => {
      console.log(res.data, 'action')
      if (res.data.code === 100) {
        commit('saveServeRangeList', res.data.villageList)
      }
      if (res.data.code === 101) {
        _this.$vux.toast.text(res.data.msg, 'middle')
      }
      if (res.data.code === 102) {
        _this.$vux.toast.text(res.data.msg, 'middle')
        localStorage.removeItem('m-token')
      }
    })
  }
}
