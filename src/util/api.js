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
  url: 'http://121.41.122.141/slowbuy' // 老蒋
  // url: 'http://192.168.0.133:8099/slowbuy'
  // url: 'http://192.168.0.134:8099/slowbuy'
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
  weichatPost: function (attach, totalFee, orderList) {
    var urlencode = require('urlencode')
    var outTradeNno = orderList.join('a')
    let appid = 'wxe036b2f554dd76c8'
    let redirectUri = `http://www.kmilife.com/slowbuy/wx/toPay?attach=${attach}&totalFee=${totalFee}&out_trade_no=${outTradeNno}&body=1&orderId=1`
    redirectUri = urlencode(redirectUri)
    //   let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}
    // &response_type=code&scope=snsapi_base&state=1234#wechat_redirect`
    return Vue.http.post('https://open.weixin.qq.com/connect/oauth2/authorize', {
      appid: appid,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'snsapi_base',
      state: 'abs#wechat_redirect'
    })
  }
}
