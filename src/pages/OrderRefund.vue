<template>
  <div class="order-refund-view">
    <!-- 页面头部 -->
    <m-header title="退款">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <!-- 页面内容 -->
    <div class="content-view-scroller">
      <!-- 退款金额 -->
      <div class="title-box">退款金额</div>
      <div class="flex-box font-mind white-box" style="color:#666;">
        <div class="flex-col">请核对退款金额</div>
        <div style="color:#f95d43;">¥{{$route.query.totalPrice}}</div>
      </div>
      <!-- 退款原因 -->
      <div class="title-box">选择退款原因</div>
      <div class="flex-box white-box">
        <checker default-item-class="default-checker" selected-item-class="selected-checker">
          <checker-item :value="item" v-for="(item, index) in items" :key="index" @on-item-click="selectReason">
            {{item.value}}
          </checker-item>
        </checker>
      </div>
    </div>
    <group class="othters">
      <x-textarea :max="200" placeholder="请输入退款说明" v-model="reason" v-if="reasonFlag"></x-textarea>
    </group>
    <!-- 提交申请按钮 -->
    <div class="submit-btn" @click="refund">提交申请</div>
  </div>
</template>

<script>
  import { XHeader, Checker, CheckerItem, XTextarea, Group, Toast } from 'vux'
  import mHeader from '../components/header'

  export default {
    name: 'orderRefund',
    components: {
      XHeader,
      Checker,
      CheckerItem,
      mHeader,
      XTextarea,
      Group,
      Toast
    },
    data () {
      return {
        checker: '1',
        items: [{
          key: '1',
          value: '商品错发/漏发'
        }, {
          key: '2',
          value: '拍错了'
        }, {
          key: '3',
          value: '不想要了'
        }, {
          key: '4',
          value: '其他'
        }],
        reason: '',
        reasonFlag: false,
        toastText: '',
        showPositionValue: false
      }
    },
    methods: {
      refund () {
        this.post('/orders/refundOrders', {
          token: localStorage.getItem('m-token'),
          orderId: this.$route.query.orderId,
          orderNum: this.$route.query.orderNum,
          refundReason: this.reason,
          storeId: this.$route.query.storeId,
          refundAmount: this.$route.query.totalPrice
        }).then((res) => {
          if (res.data.code === 100) {
            this.toastText = '正在审核中'
            setTimeout(() => {
              this.$router.push({path: '/user'})
            }, 3000)
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
        this.$vux.alert.show({content: '退款成功'})
      },
      selectReason (val) {
        if (val.key === '4') {
          this.reasonFlag = true
          return
        }
        this.reasonFlag = false
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .cp-header {
    color: @font-color-m;
    position: inherit;
    .back {
      color: @font-color-m;
    }
  }

  .order-refund-view .content-view-scroller {
    .default-checker {
      .pt(6);
      .pb(6);
      .pl(28);
      .pr(28);
      .mt(10);
      .mb(10);
      .mr(10);
      .ml(10);
      border-radius: 100px;
      .fs(25);
      line-height: 1.5;
      color: #666;
      background-color: #ddd;
    }

    .selected-checker {
      color: #fff;
      background-color: #f95d43;
    }
  }

  .order-refund-view .title-box {
    .fs(27);
    color: #444;
    .h(45);
    .lh(45);
    padding: 5px 10px;
    .pt(20);
    .pb(20);
    .pl(20);
    .pr(20);
  }

  .order-refund-view .white-box {
    .pt(20);
    .pb(20);
    .pl(20);
    .pr(20);
    background-color: #fff;
    .lh(40);
    .fs(27);
  }

  .order-refund-view .submit-btn {
    display: block;
    .lh(40);
    color: #fff;
    background-color: #f95d43;
    .mt(20);
    .mb(20);
    .ml(30);
    .mr(30);
    border-radius: 5px;
    .pt(20);
    .pb(20);
    text-align: center;
  }
</style>
