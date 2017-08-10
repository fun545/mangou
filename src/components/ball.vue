<template>
  <div class="ball-box">
    <div class="ball-container">
      <div v-for="(ball,index) in balls" :key="index">
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
    <div class="tab" ref="tab"></div>
    <div class="goods-detail-cart" ref="detail" v-if="type===2"></div>
    <div class="other" ref="other" v-if="type===3">
      <div class="wrap">
        <i class="iconfont center">&#xe613;</i>
        <div class="badge">
          <badge :text="totalBuyCount"></badge>
        </div>
      </div>
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
        balls: [
          {show: false}
        ],
        dropBalls: [],
        el: '',
        tabX: '',
        tabY: ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.el = this.$refs.tab
        if (this.type === 2) {
          this.el = this.$refs.detail
        }
        if (this.type === 3) {
          this.el = this.$refs.other
          console.log(this.el)
        }
        this.tabX = parseInt(getComputedStyle(this.el).left)
        this.tabY = parseInt(getComputedStyle(this.el).bottom)
        console.log(this.tabX)
      })
      bus.$on('drop', (el) => {
        this.drop(el)
      })
    },
    methods: {
      drop (el) {
        // 触发一次事件就会将所有小球进行遍历
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) { // 将false的小球放到dropBalls
            ball.show = true
            ball.el = el // 设置小球的el属性为一个dom对象
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop (el) { // 这个方法的执行是因为这是一个vue的监听事件
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()  // 获取小球的相对于视口的位移(小球高度)
            let x = rect.left - this.tabX
            let y = -(window.innerHeight - rect.top - this.tabY) // 负数,因为是从左上角往下的的方向
            el.style.display = '' // 清空display
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            // 处理内层动画
            let inner = el.getElementsByClassName('inner-hook')[0] // 使用inner-hook类来单纯被js操作
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
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
        let ball = this.dropBalls.shift() // 完成一次动画就删除一个dropBalls的小球
        if (ball) {
          ball.show = false
          el.style.display = 'none' // 隐藏小球
        }
      }
    },
    computed: {
      totalBuyCount () {
        return parseInt(this.$store.state.totalBuyCount)
      }
    }
  }
</script>

<style lang="less">
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .ball-box {
    .tab {
      position: fixed;
      .w(36);
      .h(36);
      .l(530);
      .b(80);
      /*background: red;*/
      opacity: 0;
    }
    .goods-detail-cart {
      position: fixed;
      .w(68);
      .h(68);
      .l(15);
      .b(13);
      opacity: 0;
      z-index: 999;
    }
    .other {
      position: fixed;
      .b(200);
      .l(600);
      z-index: 999;
      .wrap {
        position: relative;
        .h(100);
        .ml(20);
        color: @theme-color;
        .t(16);
        background: #07b3e0;
        background: rgba(7, 179, 224, .6);
        .w(68);
        .h(68);
        border-radius: 50%;
        .iconfont {
          .fs(38);
          color: #fff;
        }
        .badge {
          position: absolute;
          .h(30);
          .r(20);
          .t(0);
          .vux-badge {
            position: absolute;
            .fs(22);
            .pl(4);
            .pr(4);
            .h(30);
            .lh(30);
            border: 1px solid #fff;
          }
        }

      }
    }
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
