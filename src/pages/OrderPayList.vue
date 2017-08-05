<template>
 <div>

 </div>
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    name: 'orderPayList',
    components: {
      XHeader
    }
  }
</script>

<style lang="less">
  .order-pay-list-view .content-view-scroller {
    height: calc(~'100% - 86px');
  }

  .order-pay-list-view .footer-box {
    border-top: 1px solid #eee;
    height: 40px;
    box-sizing: border-box;
    padding: 10px;
    background-color: #fff;
    align-items: center;
    vertical-align: middle;

    .input-checkbox:checked:before {
      color: #fc766d;
    }

    .flex-col {
      margin-left: 10px;
      padding-left: 10px;
      line-height: 20px;
      border-left: 1px solid #ddd;
    }

    .play-btn {
      padding: 4px 12px;
      background-color: #fc766d;
      color: #fff;
      border-radius: 100px;
      line-height: 1;
      font-size: 12px;
    }
  }
</style>
