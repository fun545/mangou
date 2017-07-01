<template>
  <div class="instruction">
    <i class="iconfont instr-icon" @click="isDialog = !isDialog">&#xe625;</i>
    <x-dialog v-model="isDialog" hide-on-blur>
      <div class="dialog-head">用户须知</div>
      <div class="dialog-cont">
        <p><i class="iconfont">&#xe614;</i><b>简介</b></p>
        <p>漫购次日达：全场低价，最高低于市面40%每天为小区集中采购一次。今天下单，第二天到。</p>
        <p>漫购商超————超省钱，超便利！</p>
        <p><i class="iconfont">&#xe61f;</i><b>取货方式</b></p>
        <p>1.自提：收到取货信息后，你可前往小区楼下的漫购店自取订单。</p>
        <p>2.送货上门：加三元上门费，漫购店小二送货到家。</p>
        <p>享快速配送服务，进入"即时送"，29分钟内闪送到家。</p>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import {XDialog} from 'vux'
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
    padding: 5px;
    line-height: 20px;
    color: #ffffff;
    font-size: 20px;
    .lh(50);
  }

  .instruction {
    .r(23);
    .dialog-head {
      font-size: 13px;
      padding: 10px 0;
      line-height: 15px;
      color: #f95d43;
      background-color: #f7f7f7;
    }
    .dialog-cont {
      padding: 10px;
      font-size: 12px;
      line-height: 20px;
      color: #444444;
      p {
        text-align: left;
        .iconfont {
          margin-right: 5px;
          font-size: 13px;
          vertical-align: middle;
          color: #f95d43;
        }
      }
    }
  }
</style>
