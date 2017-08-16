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
 *wx.config
 */
// import VueResource from 'vue-resource'
// Vue.use(VueResource)
// export const getWeichatCode = (attach, totalFee, orderList) => {
//   var urlencode = require('urlencode')
//   var outTradeNno = orderList.join('a')
//   let appid = 'wxe036b2f554dd76c8'
//   let redirectUri = `http://www.kmilife.com/slowbuy/wx/toPay?attach=${attach}&totalFee=${totalFee}&out_trade_no=${outTradeNno}&body=1&orderId=1`
//   redirectUri = urlencode(redirectUri)
//   let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}
//   &response_type=code&scope=snsapi_base&state=1234#wechat_redirect`
//   return url
// }
import wx from 'weixin-js-sdk'
export const wxConfig = (timestamp, nonceStr, prepayId, paySign, callBall) => {
  // let appid = 'wxe036b2f554dd76c8'
  wx.chooseWXPay({
    timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
    package: prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    paySign: paySign, // 支付签名
    success: function (res) {
      // 支付成功后的回调函数
      // console.log(res)
      callBall(res)
    }
  })
}
