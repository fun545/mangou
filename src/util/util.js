/**
 * 页面到达底部，加载更多
 */
export const loadMore = (scrollObj, element, callBack) => {
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
  })
}
