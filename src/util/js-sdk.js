// 检测是否是微信浏览器
const isWeiXin = () => {
  var ua = window.navigator.userAgent.toLowerCase()
  /* eslint-disable eqeqeq */
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}
export const isWeiXinFlag = isWeiXin()
import { config } from './config'
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
import wx from 'weixin-js-sdk'
var url = window.location.href
var configObj = {}
Vue.http.post(`${config.url}/wechat/wechatParam`, {url: url}).then(res => {
  if (res.data.code === 100) {
    configObj = res.data.wechatParam
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: configObj.appid, // 必填，公众号的唯一标识
      timestamp: configObj.timestamp, // 必填，生成签名的时间戳
      nonceStr: configObj.nonceStr, // 必填，生成签名的随机串
      signature: configObj.signature, // 必填，签名，见附录1
      jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
  }
})
export const wxObj = wx

