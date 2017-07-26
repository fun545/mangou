<template>
  <div class="help-view">
    <!-- 页面头部 -->
    <x-header :left-options="{backText:''}">客服与帮助</x-header>
    <!-- 服务提示 -->
    <div class="tips-box">
      <div class="flex-col">
        <div class="iconfont">&#xe630;</div>
        <p class="font-mind">支持售后退款</p>
      </div>
      <div class="flex-col">
        <div class="iconfont">&#xe630;</div>
        <p class="font-mind">支持补发</p>
      </div>
      <div class="flex-col">
        <div class="iconfont">&#xe630;</div>
        <p class="font-mind">支持送货上门</p>
      </div>
    </div>
    <!-- 页面内容 -->
    <div class="content-scroller">
      <div class="organ-title" :class="{'active-item':organ1}" @click="organ1 = !organ1">
        <div class="flex-col">1、收到的商品有问题怎么办？</div>
        <div class="iconfont">&#xe674;</div>
      </div>
      <div class="organ-content" v-if="organ1">若您收到的商品有问题，请您在签收后48小时内即时拍照留证并联系每日优先客服反馈处理</div>
    </div>
    <!-- 客服电话 -->
    <div class="footer-box">
      <a href="tel:400-086-1937" class="btn">400-086-1937</a>
      <div class="text-center font-mind" style="color:#999;">客服服务时间为每天9:00 - 23:00</div>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    components: {
      XHeader
    },
    data () {
      return {
        organ1: false
      }
    }
  }
</script>

<style lang="less" scoped>
  .help-view .vux-header {
    background-color: #fff;

    [class^=vux-header-] {
      color: #444;
    }

    .left-arrow:before {
      border-width: 2px 0 0 2px;
      border-color: #444;
    }
  }

  .help-view .tips-box {
    display: flex;
    color: #666;
    text-align: center;
    background-color: #fff;
    padding: 10px 0;
    border-top: 1px solid #eee;
    margin-bottom: 10px;

    .iconfont {
      font-size: 26px;
      color: #fc5050;
    }
  }

  .help-view .content-scroller {
    height: calc(~'100% - 46px - 77px - 78px');
    overflow-y: scroll;
  }

  .help-view .footer-box .btn {
    display: block;
    margin: 10px 20px;
    padding: 10px;
    line-height: 20px;
    border-radius: 5px;
    text-align: center;
    color: #fff;
    background-color: #fc7070;
  }

  .help-view .organ-title {
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    padding: 10px;
    line-height: 20px;

    .iconfont {
      line-height: 20px;
      color: #999;
      font-size: inherit;
    }

    &.active-item .iconfont {
      transition: all 300ms;
      transform: rotate(180deg);
    }
  }

  .help-view .organ-content {
    padding: 15px 10px;
    background-color: #fff;
    color: #666;
    font-size: 12px;
  }
</style>
