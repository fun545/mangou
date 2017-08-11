<template>
  <div class="ball-box">
    <div class="ball-container">
      <transition
        name="drop"
        @before-enter="beforeDrop"
        @enter="dropping"
        @after-enter="afterDrop"
        :css="false"
      >
        <div class="ball" v-show="ball.show" ref="endBall" :class="{'detail':type===2}">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import { bus } from '../util/util'
  import { Badge } from 'vux'
  export default {
    components: {
      bus,
      Badge
    },
    props: {
      goods: Object,
      type: Number
    },
    data () {
      return {
        element: '',
        ball: {
          show: false,
          el: ''
        }
      }
    },
    mounted () {
      bus.$on('drop', (el) => {
        this.drop(el)
      })
    },
    activated () {
      this.ball.show = false
    },
    methods: {
      drop (el) {
        this.element = this.$refs.tab
        this.ball.show = true
        this.ball.el = el
      },
      beforeDrop (el) { // 这个方法的执行是因为这是一个vue的监听事件
        if (this.ball.show) {
          let rect = this.ball.el.getBoundingClientRect()  // 获取小球的相对于视口的位移(小球高度)
          let x = rect.left - parseInt(getComputedStyle(this.element).left)
          let y = -(window.innerHeight - rect.top - parseInt(getComputedStyle(this.element).bottom)) // 负数,因为是从左上角往下的的方向
          el.style.display = '' // 清空display
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          // 处理内层动画
          let inner = el.getElementsByClassName('inner-hook')[0] // 使用inner-hook类来单纯被js操作
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
//        }
      },
      dropping (el, done) { // 这个方法的执行是因为这是一个vue的监听事件
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight // 触发重绘html
        this.$nextTick(() => { // 让动画效果异步执行,提高性能
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          // 处理内层动画
          let inner = el.getElementsByClassName('inner-hook')[0] // 使用inner-hook类来单纯被js操作
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend', done) // Vue为了知道过渡的完成，必须设置相应的事件监听器。
        })
      },
      afterDrop (el) { // 这个方法的执行是因为这是一个vue的监听事件
        this.ball.show = false
        el.style.display = 'none' // 隐藏小球
      }
    },
    computed: {
      totalBuyCount () {
        return parseInt(this.$store.state.totalBuyCount)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .ball-box {
    .ball-container {
      .ball {
        position: fixed; //小球动画必须脱离html布局流
        .l(530);
        .b(44);
        z-index: 999;
        transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        &.detail {
          .l(15);
          .b(13);
        }
      }
      .inner {
        .w(20);
        .h(20);
        border-radius: 50%;
        background: @theme-color;
        transition: all .4s linear;
      }
    }
  }
</style>
