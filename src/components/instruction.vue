<template>
  <div class="instruction">
    <i class="iconfont instr-icon" @click="isDialog = !isDialog">&#xe625;</i>
    <x-dialog v-model="isDialog" hide-on-blur>
      <div class="dialog-head">用户须知</div>
      <div class="dialog-cont">
        <p><i class="iconfont">&#xe614;</i><b>简介</b></p>
        <p>漫购次日达是首家将主流厂家(supplier)连接到小区(community)的社区服务平台。采用仓库直接送小区的社区服务平台。</p>
        <p>采用仓库直送小区的两点直线连接，去除所有中间流通环节，为用户提供低价便利的商品服务！</p>
        <p><i class="iconfont">&#xe61f;</i><b>取货方式</b></p>
        <p>今日下单，次日达到;门店自提；加3元送货上门</p>
        <p>点击“即时送”，从付款到送达29分钟。</p>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import { XDialog } from 'vux'
  export default {
    components: {
      XDialog
    },
    data () {
      return {isDialog: false}
    }
  }
</script>

<style lang="less">
  @import "../common/style/sum";

  .instr-icon {
    display: table;
    .pt(10);
    .pb(10);
    .pr(10);
    .pl(10);
    color: #ffffff;
    .fs(40);
  }

  .instruction {
    .r(23);
    .vux-x-dialog {
      .weui-mask{
        z-index: 100010;
      }
      .weui-dialog{
        z-index: 100011;
      }
    }
    .dialog-head {
      .fs(26);
      .pt(20);
      .pb(20);
      .lh(30);
      color: #f95d43;
      background-color: #f7f7f7;
    }
    .dialog-cont {
      .pt(20);
      .pb(20);
      .pl(20);
      .pr(20);
      .fs(25);
      .lh(40);
      color: #444444;
      p {
        text-align: left;
        .iconfont {
          .mr(10);
          .fs(26);
          vertical-align: middle;
          color: #f95d43;
        }
      }
    }
  }
</style>
