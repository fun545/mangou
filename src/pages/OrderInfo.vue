<template>
  <div class="order-info-view" @touchmove.prevent>
    <!-- 页面头部 -->
    <m-header title="订单详情">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <!-- 页面内容 -->
    <div class="view-content" ref="content">
      <div>
        <!-- 订单状态-->
        <div class="flex-box top-info-box">
          <!--已签收-->
          <div class="flex-item" style="color:#f78752;" v-if="orderDetail.status===6">
            <div class="iconfont">&#xe607;</div>
            <div class="text-center">已签收</div>
          </div>
          <!--待付款-->
          <div class="flex-item" style="color:#f78752;" v-if="orderDetail.status===1">
            <div class="iconfont">&#xe603;</div>
            <div class="text-center">待付款</div>
          </div>
          <!--待发货-->
          <div class="flex-item" style="color:#f78752;" v-if="orderDetail.status===2">
            <div class="iconfont">&#xe620;</div>
            <div class="text-center">待发货</div>
          </div>
          <!--已发货-->
          <div class="flex-item" style="color:#f78752;" v-if="orderDetail.status===3">
            <div class="iconfont">&#xe607;</div>
            <div class="text-center">已发货</div>
          </div>
          <!--退款审核中-->
          <div class="flex-item" style="color:#f78752;" v-if="orderDetail.status===4&&orderDetail.refundStatus===1">
            <div class="iconfont">&#xe607;</div>
            <div class="text-center">退款审核中</div>
          </div>
          <div class="flex-item" style="color:#f78752;" v-if="orderDetail.status===4&&orderDetail.refundStatus===2">
            <div class="iconfont">&#xe607;</div>
            <div class="text-center">退款审成功</div>
          </div>
          <!--退款失败-->
          <div class="flex-item" style="color:#f78752;" v-if="orderDetail.status===4&&orderDetail.refundStatus===3">
            <div class="iconfont">&#xe607;</div>
            <div class="text-center">退款失败</div>
          </div>
          <!--已取消-->
          <div class="flex-item" style="color:#f78752;" v-if="orderDetail.status===5">
            <div class="iconfont">&#xe607;</div>
            <div class="text-center">已取消</div>
          </div>
          <div class="flex-col">
            <p v-if="orderDetail.shopType===2">订单类型：<span>即时送 - 送货上门</span></p>
            <p v-if="orderDetail.shopType===1&&orderDetail.sendType===1">订单类型：<span>次日达 - 客户自取</span></p>
            <p v-if="orderDetail.shopType===1&&orderDetail.sendType===2">订单类型：<span>次日达 - 送货上门</span></p>
            <p>订单状态：
              <!--待付款-->
              <span v-if="orderDetail.status===1">待付款</span>
              <!--待付款-->
              <span v-if="orderDetail.status===2">待发货</span>
              <!--待付款-->
              <span v-if="orderDetail.status===3">已发货</span>
              <!--待付款-->
              <span v-if="orderDetail.status===4&&orderDetail.refundStatus===1">退款审核中</span>
              <span v-if="orderDetail.status===4&&orderDetail.refundStatus===2">退款成功</span>
              <span v-if="orderDetail.status===4&&orderDetail.refundStatus===3">退款失败</span>
              <!--待付款-->
              <span v-if="orderDetail.status===5">已取消</span>
              <!--待付款-->
              <span v-if="orderDetail.status===6">已签收</span>
            </p>
            <p>订单编号：<span>{{orderDetail.orderNum}}</span></p>
            <p>客服电话：<span>{{orderDetail.phone}}</span></p>
          </div>
        </div>
        <!-- 订单状态时间线 -->
        <timeline>
          <timeline-item>
            <p class="font-mind">订单已完成，感谢您使用即时达，祝您生活愉快</p>
            <p class="font-mind" style="color:#666;">2017-06-16 02:12:43</p>
          </timeline-item>
          <timeline-item>
            <p class="font-mind">您的订单已有配送员：小乐乐配送，手机号码为：<a href="tel:18688556633">18688556633</a>，请耐心等待，保持电话畅通。</p>
            <p class="font-mind" style="color:#666;">2017-06-16 02:12:43</p>
          </timeline-item>
          <timeline-item>
            <p class="font-mind">店家已确认接单，正在拣货包装。</p>
            <p class="font-mind" style="color:#666;">2017-06-16 02:12:43</p>
          </timeline-item>
          <timeline-item>
            <p class="font-mind">您的订单已提交，等待店家确认。</p>
            <p class="font-mind" style="color:#666;">2017-06-16 02:12:43</p>
          </timeline-item>
        </timeline>
        <!-- 收货人信息 自取-->
        <div class="flex-box top-info-box address" v-if="orderDetail.sendType===1">
          <div class="iconfont" style="color:#666;">&#xe638;</div>
          <div class="flex-col">
            <p>&emsp;收货人：<span>{{orderDetail.shippingName}}</span></p>
            <p>联系电话：<span>{{orderDetail.shippingPhone}}</span></p>
            <p>取件地址：<span>{{orderDetail.address}}</span></p>
            <p>买家留言：<span>{{orderDetail.remarks | remarks}}</span></p>
          </div>
        </div>
        <!-- 收货人信息 送货到家-->
        <div class="flex-box top-info-box address" v-if="orderDetail.sendType===2">
          <div class="iconfont" style="color:#666;">&#xe638;</div>
          <div class="flex-col">
            <p>&emsp;收货人：<span>{{orderDetail.shippingName}}</span></p>
            <p>联系电话：<span>{{orderDetail.shippingPhone}}</span></p>
            <p>送货地址：<span>{{orderDetail.address}}</span></p>
            <p>买家留言：<span>{{orderDetail.remarks | remarks}}</span></p>
          </div>
        </div>
        <!--列表标题-->
        <OrderGoodsList
          :goodsList="orderDetail.goodsList"
          :goodsTotalCount="orderDetail.buyTotalCount"
          :scrollObj="contentScrll"
          :shopType="orderDetail.shopType"
          :totalPrice="orderDetail.totalPrice"
          :freight="freight"
          :discount="discount"
          :goodsTotalPrice="orderDetail.goodsTotalPrice"
        ></OrderGoodsList>
        <div class="flex-box title-box">订单信息</div>
        <div class="time-info-box">
          <p>下单时间：<span style="color:#666;">2017-06-16 02:12:43</span></p>
          <p>支付时间：<span style="color:#666;">2017-06-16 02:12:43</span></p>
          <p>配送时间：<span style="color:#666;">2017-06-16 02:12:43</span></p>
          <p>完成时间：<span style="color:#666;">2017-06-16 02:12:43</span></p>
        </div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="view-footer">
      <!--<router-link to="/order_refund" class="order-btn">申请退款</router-link>
      <div class="order-btn" @click="remove">删除</div>
      <router-link to="/order_rater" class="order-btn">评价</router-link>-->
      <div class="bt">申请退款</div>
      <div class="bt">删除</div>
      <div class="bt">评价</div>
    </div>
    <toast v-model="showPositionValue" type="text" :time="2000" is-show-mask position="middle"
           :text="toastText" width="10em" class="toast"></toast>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  import { XHeader, Timeline, TimelineItem, Toast } from 'vux'
  import BScroll from 'better-scroll'
  import OrderGoodsList from '../components/orderGoodsList'
  export default{
    name: 'orderInfo',
    components: {
      XHeader,
      Timeline,
      TimelineItem,
      mHeader,
      BScroll,
      Toast,
      OrderGoodsList
    },
    data () {
      return {
        toastText: '',
        showPositionValue: false, // 透明提示Flag
        orderDetail: '', // 订单详情
        contentScrll: '',
        freight: 3,
        discount: 0 // 优惠金额
      }
    },
    created () {
      this.$nextTick(() => {
        this._initScrll()
      })
      this.post('/orders/getOrderDetail', {
        token: localStorage.getItem('m-token'),
        orderId: this.$store.state.orderId
      }).then((res) => {
        if (res.data.code === 100) {
          console.log(res.data)
          this.orderDetail = res.data.orderDetail
          // 运费 如果是没传freight字段则代表运费为0
          if (!this.orderDetail.freight) {
            this.freight = 0
          } else {
            this.freight = this.orderDetail.freight
          }
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
    },
    methods: {
      remove () {
        this.$vux.alert.show({content: '删除订单成功'})
      },
      _initScrll () {
        this.contentScrll = new BScroll(this.$refs.content, {click: true})
        setTimeout(() => {
          this.contentScrll.refresh()
        }, 100)
      }
    },
    filters: {
      remarks (val) {
        if (!val) {
          return '无'
        }
        return val
      }
    }
  }
</script>

<style lang="less" scoped>

  @import "../common/style/sum";
  @import "../common/style/varlable";

  .cp-header {
    color: @font-color-m;
    .back {
      color: @font-color-m;
    }
  }

  .address {
    background: url("../assets/querenXD-xinfeng@2x.png") no-repeat;
    background-size: 100% 100%;
  }

  .order-info-view .view-content {
    position: absolute;
    .t(92);
    left: 0;
    right: 0;
    .b(80);
    overflow: hidden;
    box-sizing: border-box;
    padding-bottom: 10px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .order-info-view .top-info-box {
    box-sizing: border-box;
    .h(198);
    .pt(25);
    .pb(25);
    .pl(35);
    .pr(35);
    border: 1px solid #eee;
    align-items: center;
    background-color: #fff;

    .iconfont {
      .fs(45);
      text-align: center;
    }

    span {
      color: #666;
    }

    .flex-col {
      border-left: 1px solid #ddd;
      .ml(40);
      .pl(20);
      .fs(25);
    }
  }

  .order-info-view .vux-timeline {
    margin: 5px auto 10px;
    .mt(10);
    .mb(20);
    background-color: #fff;
    .vux-timeline-item-content {
      padding-left: 1.8em;
    }
  }

  .order-info-view .title-box {
    .mt(10);
    background-color: #fff;
    .pl(20);
    .pr(20);
    .pb(20);
    .pt(20);
    .lh(40);
    position: relative;

    &:after {
      content: '';
      height: 1px;
      background-color: #ddd;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  .order-info-view .goods-item {
    align-items: center;
    .pt(20);
    .pb(20);
    .pl(20);
    .pr(20);
    position: relative;

    &:after {
      content: '';
      height: 1px;
      background-color: #ddd;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .flex-col {
      .ml(20);
      .fs(27);
    }
  }

  .order-info-view .more-btn {
    padding: 4px 24px;
    color: #666;
    background-color: #ddd;
    font-size: 12px;
    line-height: 1;
    border-radius: 100px;
    display: table;
    margin: 3px auto;
  }

  .order-info-view .mind-flex {
    .fs(25);
    line-height: 1;
    color: #666;
    .pt(10);
    .pb(10);
    .pl(20);
    .pr(20);
    background-color: #fff;
  }

  .order-info-view .time-info-box {
    .fs(25);
    background-color: #fff;
    .pl(20);
    .pr(20);
    .pt(20);
    .pb(20);
  }

  .order-info-view .top-border-box {
    line-height: 20px;
    background-color: #fff;
    padding: 10px;
    height: 40px;
    box-sizing: border-box;
    border-top: 1px solid #ddd;
  }

  .order-info-view .view-footer {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    .pl(30);
    .pr(30);
    .h(80);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    .bt {
      border: 1px solid #666;
      .pr(20);
      .pl(20);
      .fs(27);
      border-radius: 18px;
      color: @font-color-input;
    }
  }
</style>
