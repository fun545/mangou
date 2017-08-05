<template>
  <div>
    <div class="order-item" v-for="(item,index) in orderList" :key="index">
      <div class="content">
        <!-- 订单类型 -->
        <div class="bottom-line flex-box item-center">
          <!--标题-->
          <div class="flex-col title color-058bed" :class="{'theme-color':item.shopType===1}">{{item.shopType | title}}
          </div>
          <!--订单创建时间-->
          <div class="font-mind color-999">{{item.orderTime | formatTime}}</div>
        </div>
        <!-- 订单商品 -->
        <div class="swiper" ref="swiper">
          <div class="scroller-box" @click="goOrderInfo(item)">
            <div class="pic d-ib" v-for="(goodsItem,index) in item.goodsList" :key="index">
              <img v-lazy="goodsItem.goodsImgUrl" :key="index" alt="" width="100%" height="100%">
            </div>
          </div>
        </div>
        <!-- 订单状态 -->
        <div class="bottom-line flex-box item-center">
          <div class="flex-col order-state-box this-state" @click="goOrderInfo(item)">
            <!--待付款 1-->
            <div v-if="item.status===1">
              <div class="state-item succes-item d-ib">
                <div class="iconfont">&#xe602;</div>
                <div class="label">已提交</div>
              </div>
              <div class="state-item d-ib succes-item">
                <div class="iconfont">&#xe603;</div>
                <div class="label">待支付</div>
              </div>
              <div class="state-item d-ib">
                <div class="iconfont">&#xe60b;</div>
                <div class="label">送货中</div>
              </div>
              <div class="state-item d-ib">
                <div class="iconfont">&#xe607;</div>
                <div class="label">已签收</div>
              </div>
            </div>
            <!--已付款 待发货 2-->
            <div v-if="item.status===2">
              <div class="state-item succes-item d-ib">
                <div class="iconfont">&#xe602;</div>
                <div class="label">已提交</div>
              </div>
              <div class="state-item d-ib succes-item">
                <div class="iconfont">&#xe603;</div>
                <div class="label">已支付</div>
              </div>
              <div class="state-item d-ib">
                <div class="iconfont">&#xe60b;</div>
                <div class="label">配送中</div>
              </div>
              <div class="state-item d-ib">
                <div class="iconfont">&#xe607;</div>
                <div class="label">已签收</div>
              </div>
            </div>
            <!--已发货(配送中) 3-->
            <div v-if="item.status===3">
              <div class="state-item succes-item d-ib">
                <div class="iconfont">&#xe602;</div>
                <div class="label">已提交</div>
              </div>
              <div class="state-item d-ib succes-item">
                <div class="iconfont">&#xe603;</div>
                <div class="label">已支付</div>
              </div>
              <div class="state-item d-ib succes-item">
                <div class="iconfont">&#xe60b;</div>
                <div class="label">配送中</div>
              </div>
              <div class="state-item d-ib">
                <div class="iconfont">&#xe607;</div>
                <div class="label">已签收</div>
              </div>
            </div>
            <!--退款换货 1审核中-->
            <div v-if="item.status===4&&item.refundStatus===1">
              <div class="state-item succes-item d-ib">
                <div class="iconfont">&#xe602;</div>
                <div class="label">已提交</div>
              </div>
              <div class="state-item d-ib succes-item">
                <div class="iconfont">&#xe647;</div>
                <div class="label">审核中</div>
              </div>
              <div class="state-item d-ib ">
                <div class="iconfont">&#xe6e5;</div>
                <div class="label">退款成功</div>
              </div>
            </div>
            <!--退款换货 2成功-->
            <div v-if="item.status===4&&item.refundStatus===2">
              <div class="state-item succes-item d-ib">
                <div class="iconfont">&#xe602;</div>
                <div class="label">已提交</div>
              </div>
              <div class="state-item d-ib succes-item">
                <div class="iconfont">&#xe647;</div>
                <div class="label">审核中</div>
              </div>
              <div class="state-item d-ib succes-item">
                <div class="iconfont">&#xe6e5;</div>
                <div class="label">退款成功</div>
              </div>
            </div>
            <!--退款换货 3退款失败-->
            <div v-if="item.status===4&&item.refundStatus===3">
              <div class="state-item succes-item d-ib">
                <div class="iconfont">&#xe602;</div>
                <div class="label">已提交</div>
              </div>
              <div class="state-item d-ib succes-item">
                <div class="iconfont">&#xe647;</div>
                <div class="label">审核中</div>
              </div>
              <div class="state-item d-ib succes-item">
                <div class="iconfont">&#xe648;</div>
                <div class="label">退款失败</div>
              </div>
            </div>
            <!--退款换货 4退款失败-->
            <div v-if="item.status===4&&item.refundStatus===4">
              <div class="state-item succes-item d-ib">
                <div class="iconfont">&#xe602;</div>
                <div class="label">已提交</div>
              </div>
              <div class="state-item d-ib succes-item">
                <div class="iconfont">&#xe647;</div>
                <div class="label">审核中</div>
              </div>
              <div class="state-item d-ib succes-item">
                <div class="iconfont">&#xe648;</div>
                <div class="label">退款失败</div>
              </div>
            </div>
            <!--已取消 5-->
            <div v-if="item.status===5">
              <div class="state-item succes-item d-ib">
                <div class="iconfont">&#xe602;</div>
                <div class="label">已提交</div>
              </div>
              <div class="state-item d-ib succes-item">
                <div class="iconfont">&#xe61b;</div>
                <div class="label">已取消</div>
              </div>
            </div>
            <!--已完成 6、7-->
            <div v-if="item.status===6||item.status===7">
              <div class="state-item succes-item d-ib">
                <div class="iconfont">&#xe602;</div>
                <div class="label">已提交</div>
              </div>
              <div class="state-item d-ib succes-item">
                <div class="iconfont">&#xe603;</div>
                <div class="label">已支付</div>
              </div>
              <div class="state-item d-ib succes-item">
                <div class="iconfont">&#xe60b;</div>
                <div class="label">配送中</div>
              </div>
              <div class="state-item d-ib succes-item">
                <div class="iconfont">&#xe607;</div>
                <div class="label">已签收</div>
              </div>
            </div>
          </div>
          <div class="text-center">
            <div class="font-small">合计：<span class="color-058bed">¥{{item.totalPrice}}</span></div>
            <div class="font-mind color-999">({{item.sendType | sendType}})</div>
          </div>
        </div>
        <!-- 订单操作 -->
        <div class="text-right">
          <span class="btn this-btn" @click="onBt(item,index)">{{item | btText}}</span>
        </div>
      </div>
      <toast v-model="showPositionValue" type="text" :time="2000" is-show-mask position="middle"
             :text="toastText" width="10em" class="toast"></toast>
    </div>
  </div>
</template>

<script>
  import { Toast, Confirm } from 'vux'
  export default {
    components: {
      Toast,
      Confirm
    },
    props: {
      orderList: Array,
      _initScroll: Function
    },
    data () {
      return {
        showPositionValue: false,
        toastText: '',
        delOrder: '', // 待删除订单
        index: '' // 待删除订单index
      }
    },
    methods: {
      // 点击按钮事件
      onBt (item, index) {
        if (item.status === 1) { // 去支付
          this.$router.push({path: '/goPay'})
          return
        }
        if (item.status === 2) { // 提醒发货
          this.post('/orders/promptShipment', {token: localStorage.getItem('m-token'), orderNum: item.orderNum})
            .then((res) => {
              if (res.data.code === 100) {
                this.toastText = '提醒发货成功'
                this.showPositionValue = true
                return
              }
              if (res.data.code === 101) {
                this.toastWidth = '10em'
                this.toastText = res.data.msg
                this.showPositionValue = true
                return
              }
              if (res.data.code === 102) {
                this.toastText = '请登录'
                this.showPositionValue = true
                return
              }
            })
          return
        }
        if (item.status === 3) { // 联系店家
          this.$vux.alert.show({title: '电话', content: item.tel})
          return
        }
        if (item.status === 4 && item.refundStatus === 1) { // 联系客服
          this.$vux.alert.show({title: '电话', content: item.tel})
          return
        }
        if (item.status === 6) { // 待评价
          this.$router.push({path: '/order_rater', query: item})
          return
        }
        // 其他状态都是删除订单
        const _this = this
        this.delOrder = item
        // 是否确认删除提示
        this.index = index
        this.$vux.confirm.show({
          title: '提示',
          content: '删除后数据将无法恢复',
          // 确认删除回调
          onConfirm () {
            // 删除订单
            console.log()
            _this.post('/orders/delOrUpOrders', {
              token: localStorage.getItem('m-token'),
              orderId: _this.delOrder.orderId,
              opts: 1
            }).then((res) => {
              if (res.data.code === 100) {
                _this.orderList.splice(this.index, 1)
                _this.$nextTick(() => {
                  _this._initScroll.refresh()
                })
              }
              if (res.data.code === 101) {
                _this.toastText = res.data.msg
                _this.showPositionValue = true
              }
              if (res.data.code === 102) {
                _this.toastText = '请登录'
                _this.showPositionValue = true
              }
            })
          }
        })
      },
      // 前端订单状态展示
      showStatus () {},
      goOrderInfo (item) {
        this.$store.state.orderId = item.orderId
        this.$router.push({path: '/order_info'})
      }
    },
    filters: {
      // 标题名称
      title (val) {
        if (val === 1) {
          return '次日送'
        } else {
          return '即时送'
        }
      },
      // 配送方式
      sendType (val) {
        if (val === 1) {
          return '客户自取'
        } else {
          return '送货上门'
        }
      },
      // 按钮文字
      btText (val) {
        if (val.status === 1) { // 待支付
          return '去支付'
        }
        if (val.status === 2) { // 待发货
          return '提醒发货'
        }
        if (val.status === 3) { // 已发货
          return '联系店家'
        }
        if (val.status === 4 && val.refundStatus === 1) { // 退款待审核
          return '联系客服'
        }
        if (val.status === 4 && val.refundStatus !== 1) { // 退款待审核
          return '删除订单'
        }
        if (val.status === 5) { // 已取消
          return '删除订单'
        }
        if (val.status === 6) { // 已完成
          return '评价'
        }
        if (val.status === 7) { // 全部
          return '删除订单'
        }
      }
    }

  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .goodsContentWrap {
    box-sizing: border-box;
    .w(710);
    overflow: auto;
  }

  .theme-color {
    color: @theme-color !important;
  }

  .theme-color-blue {
    color: @theme-color-blue;
  }

  .order-item {
   width: 100%;
    box-sizing: border-box;
    .mb(20);
    .pl(20);
    .pr(20);
    font: 14px/1.3 'Microsoft Yahei';
    .fs(28);
    color: #444;
    background-color: #fff;
  }

  .order-item:last-child {
    margin-bottom: 0;
  }

  .color-058bed {
    color: #058bed;
  }

  .color-fc766d {
    color: #fc766d;
  }

  .color-999 {
    color: #999;
  }

  .item-center {
    align-items: center;
  }

  .title {
    font: italic bold 16px/20px 'Microsoft Yahei';
    .fs(34);
    .lh(40);
  }

  .btn {
    margin-left: auto;
    margin-right: auto;
    .mt(20);
    .mb(20);
    .pt(8);
    .pb(8);
    .pl(24);
    .pr(24);
    display: inline-block;
    color: #fff;
    .fs(25);
    line-height: 1;
    border-radius: 100px;
    background: @theme-color;
  }

  .bottom-line {
    .pt(25);
    .pb(25);
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

  .swiper {
    width: 100%;
    .h(220);
    overflow-x: scroll;
  }

  .scroller-box {
    box-sizing: border-box;
    .h(220);
    align-items: center;
    .pt(10);
    .pb(10);
    .pic {
      .w(200);
      .h(200);
    }
    & + .bottom-line:before {
      content: '';
      height: 1px;
      background-color: #ddd;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
    }
  }

  .order-state-box {
    display: flex;

    .state-item {
      .ml(40);
      text-align: center;
      color: #666;
      position: relative;
    }

    .state-item:before {
      content: '\e672';
      font: 16px/1px 'iconfont';
      .fs(32);
      position: absolute;
      .l(-4);
      .t(24);
      transform: translate(-100%, 50%);
    }

    .state-item:first-child {
      margin-left: 0;
    }

    .state-item:first-child:before {
      display: none;
    }

    .iconfont {
      .w(48);
      .h(48);
      box-sizing: border-box;
      text-align: center;
      .fs(25);
      .lh(48);
      color: #666;
      border: 1px solid #666;
      border-radius: 100px;
    }

    .label {
      .fs(25);
      .lh(40);
    }

    &.this-state .succes-item {
      color: @theme-color;

      .iconfont {
        color: #fff;
        background-color: @theme-color;
        border: none;
      }
    }
  }
</style>
