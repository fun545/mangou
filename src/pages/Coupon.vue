<template>
  <div class="coupon-view">
    <!-- 页面头部 -->
    <x-header :left-options="{backText:''}">我的优惠券</x-header>
    <div class="content-scroller">
      <div class="flex-box coupon-item" v-for="index in 10" :key="index">
        <div class="flex-col">
          <p class="font-large">满58元减{{index}}元优惠券</p>
          <p class="font-mind" style="color:#666;">仅限次日达漫购商城使用</p>
          <p class="font-mind" style="color:#999;">使用期限：2017-01-05至2017-05-26</p>
        </div>
        <div class="flex-item" :class="[index % 2 ? 'next-pro' : 'this-pro']">
          <div class="middle-box">
            <p class="font-mind"><b style="font-size:30px">{{index}}</b>元</p>
            <p class="font-mind">次日达优惠券</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    components: {
      XHeader
    }
  }
</script>

<style lang="less" scoped>
  .coupon-view .vux-header {
    background: linear-gradient(#f17458, #eb4e3b);

    .left-arrow:before {
      border-color: #fff;
      border-width: 2px 0 0 2px;
    }
  }

  .coupon-view .content-scroller {
    padding: 10px;
    box-sizing: border-box;
    height: calc(~'100% - 46px');
    overflow-y: scroll;

    .coupon-item {
      margin-bottom: 10px;
      background-color: #fff;
      box-shadow: #ddd 0 0 3px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .flex-col {
      padding: 10px;
    }

    .flex-item {
      text-align: center;
      padding: 10px;
      line-height: 1.2;
      white-space: nowrap;
      color: #fff;
      position: relative;
    }

    .middle-box {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }

    .this-pro {
      background-color: #47bcf1;

      &:before {
        content: '';
        width: 4px;
        height: 10px;
        background-color: #47bcf1;
        position: absolute;
        top: 15%;
        right: -4px;
      }

      &:after {
        content: '';
        width: 4px;
        height: 10px;
        background-color: #47bcf1;
        position: absolute;
        right: -4px;
        bottom: 15%;
      }
    }

    .next-pro {
      background-color: #f06150;

      &:before {
        content: '';
        width: 4px;
        height: 10px;
        background-color: #f06150;
        position: absolute;
        top: 15%;
        right: -4px;
      }

      &:after {
        content: '';
        width: 4px;
        height: 10px;
        background-color: #f06150;
        position: absolute;
        right: -4px;
        bottom: 15%;
      }
    }
  }
</style>
