<template>
  <div>
    <m-header title="在线支付">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <div class="content">
      <div class="pay-title">次日达支付金额</div>
      <div class="pay-detal">
        <div class="left">
          <div class="item">
            <span class="s1">总价</span>
            <span class="s2">￥ {{order.totalPrice}}</span>
          </div>
          <div class="item">
            <span class="s1">优惠</span>
            <span class="s2">-￥ 0</span>
          </div>
        </div>
        <div class="right">
          <div class="s1 t-c">
            实付金额
          </div>
          <div class="s2 t-c">
            ￥ {{order.totalPrice}}
          </div>
        </div>
      </div>
      <div class="pay-title">支付方式</div>
      <div class="pay-methods">
        <div class="item">
          <div class="icon d-ib" @click="weixinFlag=!weixinFlag">
            <i class="iconfont" v-if="!weixinFlag">&#xe635;</i>
            <i class="iconfont" v-if="weixinFlag" style="color: #e5826b">&#xe634;</i>
          </div>
          <span class="pay-icon iconfont" style="color: #7dbc54">&#xe64b;</span>
          微信支付
        </div>
      </div>
    </div>
    <div class="go-pay t-c" @click="goPay">
      去支付
    </div>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  export default {
    name: 'goPay',
    components: {
      mHeader
    },
    data () {
      return {
        weixinFlag: true,
        order: {}
      }
    },
    created () {
      this.order = this.$store.state.payOrder
    },
    methods: {
      goPay () {
        var orderNumList = []
        orderNumList.push(this.order.orderNum)
//        this.$store.commit('saveTotalPay', this.order.totalPrice)
        this.weixinPay(JSON.parse(localStorage.getItem('m-userInfo')).userId, this.order.totalPrice, orderNumList)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .cp-header {
    position: inherit;
    color: @font-color-m;
    .back {
      color: @font-color-m;
    }
  }

  .content {
    .pay-title {
      .pl(35);
      .h(85);
      .lh(85);
      .fs(31);
      color: @font-color-input;
    }
    .pay-detal {
      display: flex;
      justify-content: space-between;
      .h(200);
      .ml(22);
      .mr(22);
      .fs(29);
      .left {
        background: #fff;
        width: 49.6%;
        .h(200);
        .item {
          .pl(11);
          .pr(11);
          .fs(29);
          display: flex;
          justify-content: space-between;
          align-items: center;
          .h(100);
          .s1 {
            color: #b2b2b2;
          }
          .s2 {
            color: #646464;
          }
        }
      }
      .right {
        width: 49.6%;
        .h(200);
        background: #fff;
        .s1 {
          .fs(30);
          .h(100);
          .lh(100);
          color: #b2b2b2;
        }
        .s2 {
          color: @theme-color;
          .fs(45);
          .h(100);
          .lh(100);
        }
      }
    }
    .pay-methods {
      .fs(28);
      .ml(22);
      .mr(22);
      color: @font-color-m;
      .item {
        .h(91);
        .lh(91);
        .pl(28);
        background: #fff;
        .icon {
          .mr(35);
          .iconfont {
            .fs(31);
          }
        }
        .pay-icon {
          .mr(35);
          .fs(38)
        }
      }
    }
  }

  .go-pay {
    .fs(42);
    position: absolute;
    .l(46);
    .b(31);
    .w(658);
    .h(93);
    .lh(93);
    color: #fff;
    background: @theme-color;
    border-radius: 5px;
  }
</style>
