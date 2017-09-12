/**
 * 页面到达底部，加载更多
 */
export const loadMoreMehod = (scrollObj, element, callBack, otherCallBack) => {
  scrollObj.on('scroll', (pos) => {
    // 监听无限加载滚动
    let scrollTop = Math.abs(Math.round(pos.y))
    const scrollBox = element
    let scrollBoxHeight = scrollBox.offsetHeight
    let innerBoxHeight = scrollBox.children[0].clientHeight
    if (scrollTop + scrollBoxHeight >= innerBoxHeight) {
      callBack()
    }
    // 监听滚动事件回调函数
    if (otherCallBack) {
      otherCallBack(pos, scrollTop)
    }
  })
}
/**
 * $emit 公共实例
 */
import Vue from 'vue'

export const bus = new Vue()

/**
 * 获取storeInfo
 */

export const getStoreInfo = (_this) => {
  _this.post('/first/getFirst', {
    cityId: localStorage.getItem('m-cityId'),
    areaId: localStorage.getItem('m-areaId'),
    villageId: localStorage.getItem('m-villageId'),
    source: 1
  }).then((res) => {
    if (res.data.code === 100) {
      _this.$store.commit('increment', res.data.firstInfo.totalBuyCount)
      /* 店铺数据 */
      var storeList = res.data.firstInfo.storeList
      _this.$store.commit('saveStoreInfo', storeList)
      _this.$router.replace(_this.$store.state.selectVillagePath)
      window.location.reload()
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
/**
 * 判断服务范围
 */
export const judgeServeRange = (_this, curVillage) => {
  if (_this.$store.state.serveRangeList === '') {
    _this.$store.dispatch('saveServeRange', _this)
  }
  var flag = false
  var sVillageList = _this.$store.state.serveRangeList
  for (let i = 0; i < sVillageList.length; i++) {
    if (sVillageList[i].villageId === curVillage) {
      flag = true
      break
    }
  }
  return flag
}
