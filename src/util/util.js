/**
 * 页面到达底部，加载更多
 */
export const loadMore = (scrollObj, element, callBack, otherCallBack) => {
  scrollObj.on('scroll', (pos) => {
    // 监听滚动事件回调函数
    if (otherCallBack) {
      otherCallBack(pos)
    }
    // 监听无限加载滚动
    let scrollTop = Math.abs(Math.round(pos.y))
    const scrollBox = element
    let scrollBoxHeight = scrollBox.offsetHeight
    let innerBoxHeight = scrollBox.children[0].clientHeight
    if (scrollTop + scrollBoxHeight >= innerBoxHeight) {
      console.log('daodile')
      callBack()
    }
  })
}
/**
 * $emit 公共实例
 */
import Vue from 'vue'
export const bus = new Vue()
