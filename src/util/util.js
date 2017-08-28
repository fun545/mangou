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
      console.log('daodile')
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
      console.log(res.data, 'test')
      _this.$store.commit('increment', res.data.firstInfo.totalBuyCount)
      /* 店铺数据 */
      var storeList = res.data.firstInfo.storeList
      _this.$store.commit('saveStoreInfo', storeList)
      localStorage.setItem('m-depotId', storeList[0].storeId)
      localStorage.setItem('m-shopId', storeList[1].storeId)
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
 *wx.config 微信sdk
 */
// import wx from 'weixin-js-sdk'
// export const wxConfig = (timestamp, nonceStr, prepayId, paySign, callBall) => {
//   // let appid = 'wxe036b2f554dd76c8'
//   wx.chooseWXPay({
//     timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
//     nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
//     package: prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
//     signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
//     paySign: paySign, // 支付签名
//     success: function (res) {
//       // 支付成功后的回调函数
//       // console.log(res)
//       callBall(res)
//     }
//   })
// }

