export function MP () {
  var ak = 'yGgv4MB8lb5scmrfKIzD2ORG0B9X4uu9'
  return new Promise(function (resolve, reject) {
    window.init = function () {
      /* eslint-disable no-undef */
      resolve(BMap)
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://api.map.baidu.com/api?v=2.0&ak=' + ak + '&callback=init'
    script.onerror = reject
    document.head.appendChild(script)
  })
}
