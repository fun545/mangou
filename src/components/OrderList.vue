<template>
  <div class="order-list-view">
    <!-- 页面标题 -->
    <m-header :title="title">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <div class="content-wrap" ref="content">
      <!-- 订单列表 及时送  -->
      <order-list :orderList="orderList" :_initScroll="contentScroll" ref="orderList">
        <load-more
          :tip="loadText"
          :show-loading="moreIconFlag"
          background-color="#f7f7f7"
          class="load-more" slot="loadMoreIcon" v-if="loadMoreFlag"></load-more>
      </order-list>
    </div>
    <toast v-model="showPositionValue" type="text" :time="2000" is-show-mask position="middle"
           :text="toastText" width="10em" class="toast"></toast>
  </div>
</template>

<script>
  import { Toast, LoadMore } from 'vux'
  import mHeader from './header'
  import orderList from './orderItem.vue'
  import BScroll from 'better-scroll'
  export default{
    name: 'order_List',
    components: {
      mHeader,
      orderList,
      BScroll,
      Toast,
      LoadMore
    },
    props: {
      status: Number,
      title: ''
    },
    data () {
      return {
        orderList: [],
        toastText: '',
        showPositionValue: false,
        scrollDisable: false,
        pageIndex: 1,
        loadText: '正在加载更多数据',
        moreIconFlag: true,
        contentScroll: {},
        loadMoreFlag: false
      }
    },
    async created () {
      await this.post('/orders/getOrderList', {
        token: localStorage.getItem('m-token'),
        pageSize: 10,
        pageIndex: 1,
        villageId: localStorage.getItem('m-villageId'),
        status: this.status
      }).then((res) => {
        console.log(res.data)
        if (res.data.code === 100) {
          this.orderList = res.data.orderList
          return
        }
        if (res.data.code === 101) {
          this.toastText = res.data.msg
          this.showPositionValue = true
        }
        if (res.data.code === 102) {
          this.toastText = res.data.msg
          this.showPositionValue = true
        }
      })
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    methods: {
      _initScroll () {
        this.contentScroll = new BScroll(this.$refs.content, {
          click: true,
          probeType: 3
        })
        this.contentScroll.on('scroll', (pos) => {
          var contentHeight = this.$refs.content.offsetHeight
          var scrollTop = Math.abs(pos.y)
          var innerHeight = this.$refs.content.children[0].offsetHeight
          if (scrollTop + contentHeight >= innerHeight) {
            this.loadMoreFlag = true
            this.loadMore()
          }
        })
      },
      async loadMore () {
        if (!this.scrollDisable) {
          this.scrollDisable = true
          this.pageIndex += 1
          await this.post('/orders/getOrderList', {
            token: localStorage.getItem('m-token'),
            pageSize: 10,
            pageIndex: this.pageIndex,
            villageId: localStorage.getItem('m-villageId'),
            status: this.status
          }).then((res) => {
            console.log(res.data)
            if (res.data.code === 100) {
              let newList = res.data.orderList
              newList.forEach((item, index) => {
                this.orderList.push(item)
              })
              if (newList.length > 0) {
                setTimeout(() => {
                  this.contentScroll.refresh()
                }, 50)
              } else {
                this.loadText = '到底啦~'
                this.moreIconFlag = false
                console.log('到底了')
              }
              this.scrollDisable = false
              return
            }
            if (res.data.code === 101) {
              this.toastText = res.data.msg
              this.showPositionValue = true
            }
            if (res.data.code === 102) {
              this.toastText = res.data.msg
              this.showPositionValue = true
            }
          })
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .order-list-view {
    .cp-header {
      color: @font-color-m;
      z-index: 103;
      .back {
        color: @font-color-m;
      }
    }
    .content-wrap {
      position: absolute;
      .t(92);
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
    }
    .load-more {
      color: @font-color-m;
      .fs(25);
    }
  }
</style>
