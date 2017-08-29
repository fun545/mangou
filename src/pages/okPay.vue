<template>
  <div class="ok-pay">
    <m-header title="支付成功" class="header">
      <span class="back iconfont" @click="$router.replace('/order_list')" slot="icon">&#xe600;</span>
    </m-header>
    <div class="top">
      <div class="logo"><img src="../assets/okPay.png" alt="" width="100%" height="100%"></div>
    </div>
    <div class="money t-c">
      支付金额¥{{totalPay}}元
    </div>
    <div class="bt t-c" @click="$router.replace('/order_list')">
      查看订单
    </div>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  export default {
    components: {
      mHeader
    },
    computed: {
      totalPay: {
        set () {
          return this.$store.state.totalPay
        },
        get () {
          return this.$store.state.totalPay
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .ok-pay {
    .cp-header {
      position: inherit;
      color: #fff;
      background: @theme-color;
      border-bottom: none;
      .back {
        color: #fff;
      }
    }
    .top {
      position: relative;
      .h(260);
      background: @theme-color;
      .logo {
        position: absolute;
        .w(210);
        .h(210);
        .b(-105);
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .money {
      .mt(250);
      .h(58);
      .lh(58);
      .fs(38);
      color: @theme-color;
    }
    .bt {
      margin: 0 auto;
      .mt(150);
      .w(640);
      .h(95);
      .lh(95);
      border-radius: 8px;
      background: @theme-color;
      color: #fff;
      .fs(32);
    }
  }
</style>
