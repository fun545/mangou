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
  url: 'http://121.41.122.141:8090/slowbuy'
  // url: 'http://192.168.0.133:8099/slowbuy'
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
  }
}
