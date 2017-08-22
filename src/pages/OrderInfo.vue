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
            <div class="iconfont">&#xe604;</div>
            <div class="text-center">配送中</div>
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
            <div class="iconfont">&#xe64a;</div>
            <div class="text-center">退款失败</div>
          </div>
          <!--退款失败-->
          <div class="flex-item" style="color:#f78752;" v-if="orderDetail.status===4&&orderDetail.refundStatus===4">
            <div class="iconfont">&#xe64a;</div>
            <div class="text-center">退款失败</div>
          </div>
          <!--已取消-->
          <div class="flex-item" style="color:#f78752;" v-if="orderDetail.status===5">
            <div class="iconfont">&#xe607;</div>
            <div class="text-center">已取消</div>
          </div>
          <!--已评价-->
          <div class="flex-item" style="color:#f78752;" v-if="orderDetail.status===7">
            <div class="iconfont">&#xe607;</div>
            <div class="text-center">已评价</div>
          </div>
          <div class="flex-col">
            <p v-if="orderDetail.shopType===2">订单类型：<span>即时送 - 送货上门</span></p>
            <p v-if="orderDetail.shopType===1&&orderDetail.sendType===1">订单类型：<span>次日达 - 客户自取</span></p>
            <p v-if="orderDetail.shopType===1&&orderDetail.sendType===2">订单类型：<span>次日达 - 送货上门</span></p>
            <p>订单状态：
              <!--待付款-->
              <span v-if="orderDetail.status===1">待付款</span>
              <!--待发货-->
              <span v-if="orderDetail.status===2">待发货</span>
              <!--配送中-->
              <span v-if="orderDetail.status===3">配送中</span>
              <!--退款-->
              <span v-if="orderDetail.status===4&&orderDetail.refundStatus===1">退款审核中</span>
              <span v-if="orderDetail.status===4&&orderDetail.refundStatus===2">退款成功</span>
              <span v-if="orderDetail.status===4&&orderDetail.refundStatus===3">退款失败</span>
              <span v-if="orderDetail.status===4&&orderDetail.refundStatus===4">退款失败</span>
              <!--已取消-->
              <span v-if="orderDetail.status===5">已取消</span>
              <!--已签收，待评价-->
              <span v-if="orderDetail.status===6">已签收</span>
              <!--已评价-->
              <span v-if="orderDetail.status===7">已评价</span>
            </p>
            <p>订单编号：<span>{{orderDetail.orderNum}}</span></p>
            <p v-if="logist">客服电话：<span>{{logist.flowStr.keFuphone}}</span></p>
          </div>
        </div>
        <!-- 订单状态时间线 -->
        <!--status===1 待支付-->
        <div v-if="logist">
          <timeline v-if="orderDetail.status===1">
            <timeline-item>
              <p class="font-mind">您的订单已提交，等待系统确认。</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.orderTime}}</p>
            </timeline-item>
          </timeline>
          <!--status===2 待发货-->
          <timeline v-if="orderDetail.status===2">
            <timeline-item>
              <p class="font-mind">您的订单已提交，等待店家确认。</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.orderTime}}</p>
            </timeline-item>
          </timeline>
          <!--status===3 已发货 次日达-->
          <timeline v-if="orderDetail.status===3&&orderDetail.shopType===1">
            <!--自取-->
            <timeline-item v-if="orderDetail.sendType===1">
              <p class="font-mind">您的商品已送达<span
                class="theme-color-s1">{{logist.storeStr.address}}</span>取货点,联系电话:{{logist.storeStr.phone}},请及时到店取货,感谢您的耐心等待。
              </p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.fahuoTime}}</p>
            </timeline-item>
            <!--送货上门-->
            <timeline-item v-if="orderDetail.sendType===2">
              <p class="font-mind">您的商品已送达<span
                class="theme-color-s1">{{logist.storeStr.address}}</span>取货点,联系电话:{{logist.storeStr.phone}},待门店确认后配送上门，请保持电话畅通。
              </p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.fahuoTime}}</p>
            </timeline-item>
            <timeline-item>
              <p class="font-mind">商品已打包出库,配送中。</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.fahuoTime}}</p>
            </timeline-item>
            <timeline-item>
              <p class="font-mind">仓库正在拣货中。</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.printbianqianTime}}</p>
            </timeline-item>
            <timeline-item>
              <p class="font-mind">已确认订单,等待备货,您的订单预计{{logist.timeStr.frueTime}}到达您手中</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.sureTime}}</p>
            </timeline-item>
            <timeline-item>
              <p class="font-mind">您的订单已提交，等待系统确认。</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.orderTime}}</p>
            </timeline-item>
          </timeline>
          <!--status===3 已发货 及时送-->
          <timeline v-if="orderDetail.status===3&&orderDetail.shopType===2">
            <timeline-item>
              <p class="font-mind">店家已确认接单,正在拣货包装。{{logist.timeStr.frueTime}}</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.sureTime}}</p>
            </timeline-item>
            <timeline-item>
              <p class="font-mind">您的订单已提交,等待店家确认。</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.orderTime}}</p>
            </timeline-item>
          </timeline>
          <!--status===4 退换货 次日达-->
          <timeline v-if="orderDetail.status===4&&orderDetail.shopType===1">
            <timeline-item>
              <p class="font-mind">您的订单已提交，等待系统确认。</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.orderTime}}</p>
            </timeline-item>
          </timeline>
          <!--status===4 退换货 次日达-->
          <timeline v-if="orderDetail.status===4&&orderDetail.shopType===2">
            <timeline-item>
              <p class="font-mind">您的订单已提交，等待店家确认。</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.orderTime}}</p>
            </timeline-item>
          </timeline>
          <!--status===5 已取消 次日达-->
          <timeline v-if="orderDetail.status===5&&orderDetail.shopType===1">
            <timeline-item>
              <p class="font-mind">您的订单已提交，等待系统确认。</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.orderTime}}</p>
            </timeline-item>
          </timeline>
          <!--status===5 已取消 及时送-->
          <timeline v-if="orderDetail.status===5&&orderDetail.shopType===2">
            <timeline-item>
              <p class="font-mind">您的订单已提交，等待店家确认。</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.orderTime}}</p>
            </timeline-item>
          </timeline>
          <!--status===6 已完成（已签收) 次日达-->
          <timeline v-if="(orderDetail.status===6||orderDetail.status===7)&&orderDetail.shopType===1">
            <timeline-item>
              <p class="font-mind"> 订单已完成,感谢您在漫购购物,欢迎您再次光临。</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.finishTime}}</p>
            </timeline-item>
            <!--自取-->
            <timeline-item v-if="orderDetail.sendType===1">
              <p class="font-mind">您的商品已送达<span
                class="theme-color-s1">{{logist.storeStr.address}}</span>取货点,联系电话:{{logist.storeStr.phone}},请及时到店取货,感谢您的耐心等待。
              </p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.fahuoTime}}</p>
            </timeline-item>
            <!--送货上门-->
            <timeline-item v-if="orderDetail.sendType===2">
              <p class="font-mind">您的商品已送达<span
                class="theme-color-s1">{{logist.storeStr.address}}</span>取货点,联系电话:{{logist.storeStr.phone}},待门店确认后配送上门，请保持电话畅通。
              </p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.fahuoTime}}</p>
            </timeline-item>
            <timeline-item>
              <p class="font-mind">商品已打包出库,配送中。</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.fahuoTime}}</p>
            </timeline-item>
            <timeline-item>
              <p class="font-mind">仓库正在拣货中。</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.printbianqianTime}}</p>
            </timeline-item>
            <timeline-item>
              <p class="font-mind">已确认订单,等待备货,您的订单预计{{logist.timeStr.frueTime}}到达您手中</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.sureTime}}</p>
            </timeline-item>
            <timeline-item>
              <p class="font-mind">您的订单已提交，等待系统确认。</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.orderTime}}</p>
            </timeline-item>
          </timeline>
          <!--status===6 已完成（已签收) 及时送-->
          <timeline v-if="(orderDetail.status===6||orderDetail.status===7)&&orderDetail.shopType===2">
            <timeline-item>
              <p class="font-mind">订单已完成,感谢您在漫购购物,欢迎您再次光临。</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.finishTime}}</p>
            </timeline-item>
            <timeline-item>
              <p class="font-mind">您的订单已由{{logist.storeStr.contacstName}}配送员配送,手机号码为:{{logist.storeStr.phone}},请耐心等待,保持电话畅通。{{logist.timeStr.frueTime}}</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.okFaHuoTime}}</p>
            </timeline-item>
            <timeline-item>
              <p class="font-mind">您的订单已提交,等待店家确认。</p>
              <p class="font-mind" style="color:#666;">{{logist.timeStr.orderTime}}</p>
            </timeline-item>
          </timeline>
        </div>
        <!-- 收货人信息 自取-->
        <div class="flex-box top-info-box address" v-if="orderDetail.sendType===1">
          <div class="iconfont theme-color-s1" style="color:#666;">&#xe638;</div>
          <div class="flex-col">
            <p>&emsp;收货人：<span>{{userInfo.userName}}</span></p>
            <p>联系电话：<span>{{userInfo.phone}}</span></p>
            <p>取件地址：<span>{{orderDetail.address}}</span></p>
            <p>买家留言：<span>{{orderDetail.remarks | remarks}}</span></p>
          </div>
        </div>
        <!-- 收货人信息 送货到家-->
        <div class="flex-box top-info-box address" v-if="orderDetail.sendType===2">
          <div class="iconfont theme-color-s1" style="color:#666;">&#xe638;</div>
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
          :goodsTotalCount="Number(orderDetail.buyTotalCount)"
          :scrollObj="contentScrll"
          :shopType="orderDetail.shopType"
          :totalPrice="Number(orderDetail.totalPrice)"
          :freight="freight"
          :discount="discount"
          :goodsTotalPrice="goodsTotalPrice"
        ></OrderGoodsList>
        <div class="flex-box title-box">订单信息</div>
        <div v-if="logist">
          <!--待付款 待发货status===1 status===2-->
          <div class="time-info-box" v-if="orderDetail.status===1||orderDetail.status===2">
            <p>下单时间：<span style="color:#666;">{{logist.timeStr.orderTime}}</span></p>
          </div>
          <!--已发货status===3-->
          <div class="time-info-box" v-if="orderDetail.status===3">
            <p>下单时间：<span style="color:#666;">{{logist.timeStr.orderTime}}</span></p>
            <p>配送时间：<span style="color:#666;">{{logist.timeStr.fahuoTime}}</span></p>
          </div>
          <!--退换货status===4-->
          <div class="time-info-box" v-if="orderDetail.status===4">
            <p>下单时间：<span style="color:#666;">{{logist.timeStr.orderTime}}</span></p>
            <p>退款时间：<span style="color:#666;">{{orderDetail.refundTime | formatTime}}</span></p>
          </div>
          <!--已取消 status===5-->
          <div class="time-info-box" v-if="orderDetail.status===5">
            <p>下单时间：<span style="color:#666;">{{logist.timeStr.orderTime}}</span></p>
          </div>
          <!--已签收 已评价 status===6status===7-->
          <div class="time-info-box" v-if="orderDetail.status===6||orderDetail.status===7">
            <p>下单时间：<span style="color:#666;">{{logist.timeStr.orderTime}}</span></p>
            <p>配送时间：<span style="color:#666;">{{logist.timeStr.okFaHuoTime}}</span></p>
            <p>完成时间：<span style="color:#666;">{{logist.timeStr.finishTime}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="view-footer">
      <!--申请退款 已付款 已收货待评价-->
      <div class="bt" v-if="orderDetail.status===2||orderDetail.status===6"
           @click="$router.push({path:'/order_refund',query:orderDetail})">申请退款
      </div>
      <!--提醒发货 已付款-->
      <div class="bt theme-color" @click="remind(orderDetail)" v-if="orderDetail.status===2">提醒发货</div>
      <!--删除订单 已取消 已收货待评价-->
      <div class="bt" @click="deleteOrder(orderDetail)"
           v-if="orderDetail.status===5||orderDetail.status===6||orderDetail.status===7">
        删除订单
      </div>
      <!--去评价 已收货待评价-->
      <div class="bt" @click="$router.push({path:'/order_rater',query:orderDetail})" v-if="orderDetail.status===6">去评价
      </div>
      <!--取消订单 待付款-->
      <div class="bt" @click="cancleOrder(orderDetail)" v-if="orderDetail.status===1">取消订单</div>
      <!--联系店家 已付款 已发货-->
      <div class="bt" @click="contact" v-if="orderDetail.status===2||orderDetail.status===3">联系店家</div>
      <!--联系客服 退换货-->
      <div class="bt" @click="contact" v-if="orderDetail.status===4">联系客服</div>
      <div class="bt theme-color" @click="$router.push({path:'/goPay',query:orderDetail})"
           v-if="orderDetail.status===1">去支付
      </div>
      <!--申请退款 已付款-->
    </div>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  import { XHeader, Timeline, TimelineItem } from 'vux'
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
      OrderGoodsList
    },
    data () {
      return {
        orderDetail: '', // 订单详情
        contentScrll: {},
        freight: 3,
        discount: 0, // 优惠金额
        logist: '', // 物流信息
        userInfo: JSON.parse(localStorage.getItem('m-userInfo')), // 用户信息
        nextShop: this.$store.state.nextShop,
        loadingFlag: true,
        goodsTotalPrice: 0
      }
    },
    async created () {
      await this.post('/orders/getOrderDetail', {
        token: localStorage.getItem('m-token'),
        orderId: this.$store.state.orderId
      }).then((res) => {
        if (res.data.code === 100) {
          this.orderDetail = res.data.orderDetail
          this.goodsTotalPrice = res.data.orderDetail.goodsTotalPrice
          // 运费 如果是没传freight字段则代表运费为0
          if (!this.orderDetail.freight) {
            this.freight = 0
          } else {
            this.freight = this.orderDetail.freight
          }
          return
        }
        if (res.data.code === 101) {
          this.$vux.toast.text(res.data.msg, 'middle')
        }
        if (res.data.code === 102) {
          this.$vux.toast.text(res.data.msg, 'middle')
          localStorage.removeItem('m-token')
        }
      })
      await this.post('/orders/viewLogistics', {
        token: localStorage.getItem('m-token'),
        orderNum: this.orderDetail.orderNum,
        shopType: this.orderDetail.shopType
      }).then((res) => {
        if (res.data.code === 100) {
          this.logist = res.data
        }
        if (res.data.code === 101) {
          this.$vux.toast.text(res.data.msg, 'middle')
        }
        if (res.data.code === 102) {
          this.$vux.toast.text(res.data.msg, 'middle')
          localStorage.removeItem('m-token')
        }
      })
      this.$nextTick(() => {
        this._initScrll()
      })
    },
    methods: {
      // 提醒发货
      remind (detail) {
        this.post('/orders/promptShipment', {
          token: localStorage.getItem('m-token'),
          orderNum: detail.orderNum
        }).then((res) => {
          if (res.data.code === 100) {
            this.$vux.toast.text('提醒发货成功', 'middle')
          }
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'middle')
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'middle')
            localStorage.removeItem('m-token')
          }
        })
      },
      // 删除订单
      deleteOrder (detail) {
        var _this = this
        this.$vux.confirm.show({
          title: '提示',
          content: '删除后数据将无法恢复',
          onConfirm () {
            _this.post('/orders/delOrUpOrders', {
              token: localStorage.getItem('m-token'),
              orderId: detail.orderId,
              opts: 1
            }).then((res) => {
              if (res.data.code === 100) {
                _this.$router.push({path: '/order_list'})
                return
              }
              if (res.data.code === 101) {
                _this.$vux.toast.text(res.data.msg, 'middle')
              }
              if (res.data.code === 102) {
                _this.$vux.toast.text(res.data.msg, 'middle')
                localStorage.removeItem('m-token')
              }
            })
          }
        })
      },
      // 取消订单
      cancleOrder (detail) {
        var _this = this
        this.$vux.confirm.show({
          title: '提示',
          content: '确定要取消订单么',
          onConfirm () {
            _this.post('/orders/delOrUpOrders', {
              token: localStorage.getItem('m-token'),
              orderId: detail.orderId,
              opts: 2
            }).then((res) => {
              if (res.data.code === 100) {
                _this.$router.push({path: '/order_list'})
                return
              }
              if (res.data.code === 101) {
                _this.$vux.toast.text(res.data.msg, 'middle')
              }
              if (res.data.code === 102) {
                _this.$vux.toast.text(res.data.msg, 'middle')
                localStorage.removeItem('m-token')
              }
            })
          }
        })
      },
      // 联系店家 或客服
      contact () {
        var _this = this
        // 联系店家
        this.$vux.alert.show({
          title: '电话',
          content: _this.logist.flowStr.keFuphone
        })
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
    .h(220) !important;
  }

  .theme-color {
    border: 1px solid @theme-color !important;
    color: @theme-color !important;
  }

  .theme-color-s1 {
    color: @theme-color !important;
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
    .pt(10);
    .pb(10);
    .pl(40);
    background-color: #fff;
    /*ul li .vux-timeline-item {
      .vux-timeline-item-content{
        padding-left:0;
      }
    }*/
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
