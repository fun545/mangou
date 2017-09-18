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
      jsApiList: ['scanQRCode', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareQZone']// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    wx.ready(function () {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      // 分享给朋友
      wx.onMenuShareAppMessage({
        title: '这家便利店会思考，更好玩，你要不要来试试？', // 分享标题
        desc: '仓库直送，最高节省40%，社区配送，29分钟送达', // 分享描述
        link: 'http://www.zhaimangou.com/?openid=ouL0Sv6q4auahViMerCVL5DE4zNE', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: require('../assets/logo.png'), // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
      // 分享给朋友圈
      wx.onMenuShareTimeline({
        title: '这家便利店会思考，更好玩，你要不要来试试？', // 分享标题
        link: 'http://www.zhaimangou.com/?openid=ouL0Sv6q4auahViMerCVL5DE4zNE', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: require('../assets/logo.png'), // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
      // 分享给QQ好友
      wx.onMenuShareQQ({
        title: '这家便利店会思考，更好玩，你要不要来试试？', // 分享标题
        desc: '仓库直送，最高节省40%，社区配送，29分钟送达', // 分享描述
        link: 'http://www.zhaimangou.com/?openid=ouL0Sv6q4auahViMerCVL5DE4zNE', // 分享链接
        imgUrl: require('../assets/logo.png'), // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
      // 分享到QQ空间
      wx.onMenuShareQZone({
        title: '这家便利店会思考，更好玩，你要不要来试试？', // 分享标题
        desc: '仓库直送，最高节省40%，社区配送，29分钟送达', // 分享描述
        link: 'http://www.zhaimangou.com/?openid=ouL0Sv6q4auahViMerCVL5DE4zNE', // 分享链接
        imgUrl: require('../assets/logo.png'), // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
    })
  }
})
export const wxObj = wx

