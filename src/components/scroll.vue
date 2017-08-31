<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import JRoll from 'jroll'
  export default {
    components: {
      JRoll
    },
    props: {
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
      /**
       * 列表的数据
       */
      data: {
        type: Array,
        default: null
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 20
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullUp: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pullDown: {
        type: Boolean,
        default: false
      },
    },
    mounted () {
      // 保证在DOM渲染完毕后初始化better-scroll
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll () {
        let _this = this
        if (!this.$refs.wrapper) {
          return
        }
        // better-scroll的初始化
        this.scroll = new JRoll(this.$refs.wrapper, {
          scrollX: this.scrollX
        })
        // 是否派发滚动事件
        if (this.listenScroll) {
          this.scroll.on('scroll', function () {
            _this.$emit('scroll', this)
          })
        }
        if (this.pullDown) {

        }
        this.scroll.on("scrollEnd", function () {
          if (this.y === this.maxScrollY) {
            console.log("已滑动到底部")
            _this.$emit('scrollToEnd')
          }
        })
      },
      refresh() {
        // 代理jRoll的refresh方法
        this.scroll && this.scroll.refresh()
      },
      watch: {
        // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
        data () {
          setTimeout(() => {
            this.refresh()
          }, this.refreshDelay)
        }
      }
    }
  }
</script>

