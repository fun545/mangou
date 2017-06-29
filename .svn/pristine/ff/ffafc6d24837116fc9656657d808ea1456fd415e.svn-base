<template>
  <div class="order-refund-view">
    <!-- 页面头部 -->
    <x-header :left-options="{backText:''}">退款</x-header>
    <!-- 页面内容 -->
    <div class="content-view-scroller">
      <!-- 退款金额 -->
      <div class="title-box">退款金额</div>
      <div class="flex-box font-mind white-box" style="color:#666;">
        <div class="flex-col">请核对退款金额</div>
        <div style="color:#f95d43;">¥198.88</div>
      </div>
      <!-- 退款原因 -->
      <div class="title-box">选择退款原因</div>
      <div class="flex-box white-box">
        <checker default-item-class="default-checker" selected-item-class="selected-checker" v-model="checker">
          <checker-item value="1">商品错发/漏发</checker-item>
          <checker-item value="2">拍错了</checker-item>
          <checker-item value="3">不想要了</checker-item>
          <checker-item value="4">其他</checker-item>
        </checker>
      </div>
    </div>
    <!-- 提交申请按钮 -->
    <div class="submit-btn" @click="refund">提交申请</div>
  </div>
</template>

<script>
  import { XHeader, Checker, CheckerItem } from 'vux'

  export default {
    components: {
      XHeader,
      Checker,
      CheckerItem
    },
    data () {
      return {
        checker: '1'
      }
    },
    methods: {
      refund () {
        this.$vux.alert.show({content: '退款成功'})
      }
    }
  }
</script>

<style lang="less">
  .order-refund-view .vux-header {
    background-color: #fff;

    [class^=vux-header-] {
      color: #444;
    }

    .left-arrow:before {
      border-color: #444;
      border-width: 2px 0 0 2px;
    }
  }

  .order-refund-view .content-view-scroller {
    height: calc(~'100% - 106px');
    overflow-y: scroll;

    .default-checker {
      padding: 3px 14px;
      margin: 5px;
      border-radius: 100px;
      font-size: 12px;
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
    font-size: 13px;
    color: #444;
    line-height: 20px;
    padding: 5px 10px;
  }

  .order-refund-view .white-box {
    padding: 5px 10px;
    background-color: #fff;
    line-height: 20px;
  }

  .order-refund-view .submit-btn {
    display: block;
    line-height: 20px;
    color: #fff;
    background-color: #f95d43;
    margin: 10px 15px;
    border-radius: 5px;
    padding: 10px 0;
    text-align: center;
  }
</style>
