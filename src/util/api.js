/**
 * Created by xiaobin on 2017/6/20.
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import { md5 } from 'vux'
Vue.http.options.emulateJSON = true
const config = {
  secret: '4f1da0c72ccaaed85eaac488b19795ba',
  url: 'http://121.41.122.141:8090/slowbuy' // 老蒋
  // url: 'http://121.41.122.141/slowbuy' // 老蒋
  // url: 'http://192.168.0.134:8099/slowbuy'
  // url: '/api'
  // url: 'http://www.kmilife.com/slowbuy'
  // url: 'http://www.zhaimangou.com/slowbuy'
  // url: 'http://www.jiangmoxuan.cn'
}
function getAppkey (data) {
  var res = ''
  var sorted = []
  var temp = []
  for (let i in data) {
    temp.push(i + data[i] + '')
  }
  sorted = temp.sort()
  for (let i in sorted) {
    res += sorted[i]
  }
  res = md5(config.secret + res + config.secret).toUpperCase()
  return res
}

export default {
  post: function (path, data) {
    data.phoneType = 2
    data.versionCode = 9
    data.appKey = getAppkey(data)
    return Vue.http.post(config.url + path, data)
  },
  weixinPay (attach, totalFee, outTradenNo, _this) {
    // 服务器接口
    var url = config.url
    var path = '/wx/toPay'
    // 公众号appid
    var appId = 'wxe036b2f554dd76c8'
    // 获取URL信息
    function getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }

    // 转行成字符串
    var outTradeNno = outTradenNo.join('a')
    // 向本地服务器发起支付请求
    Vue.http.post(url + path, {
      openid: getQueryString('openid'),
      attach: attach,
      out_trade_no: outTradeNno,
      totalFee: totalFee
    }).then((res) => {
      console.log(res, '1')
      console.log(res.data.weixinxiaochengxu, 'canshu')
      if (res.data.code === 100) {
        var weixinxiaochengxu = res.data.weixinxiaochengxu
        // 调起微信浏览器内置支付方法
        /* eslint-disable no-undef */
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            'appId': appId,     // 公众号名称，由商户传入
            'timeStamp': weixinxiaochengxu.timeStamp,         // 时间戳，自1970年以来的秒数
            'nonceStr': weixinxiaochengxu.nonceStr, // 随机串
            'package': 'prepay_id=' + weixinxiaochengxu.prepayid,
            'signType': 'MD5',         // 微信签名方式
            'paySign': weixinxiaochengxu.paySign // 微信签名
          }, function (res) {
            console.log(res, '2')
            /* eslint-disable eqeqeq */
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
              _this.$store.commit('saveTotalPay', totalFee)
              _this.$store.commit('saveOkPayBackPath', '/OrderPayList')
              _this.$router.replace('/okPay')
            }
            /* eslint-disable eqeqeq */
            if (res.err_msg == 'get_brand_wcpay_request:cancel') {
              _this.$router.replace('/order_pay_list')
            }
            /* eslint-disable eqeqeq */
            if (res.err_msg == 'get_brand_wcpay_request:fail') {
              _this.$router.replace('/order_pay_list')
            }
            // _this.$vux.toast.text(res.err_msg, 'bottom')
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠
          })
        // if (typeof WeixinJSBridge === 'undefined') {
        //   if (document.addEventListener) {
        //     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
        //   } else if (document.attachEvent) {
        //     document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
        //     document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
        //   }
        // } else {
        //   onBridgeReady()
        // }
      }
    })
    // }
  }
}
