<template>
  <div class="order-list-view order-pay-list-view">
    <!-- 页面头部 -->
    <x-header :left-options="{backText:''}">待付款</x-header>
    <!-- 页面内容 -->
    <div class="content-view-scroller">
      <div class="order-item" v-for="(item,index) in 4" :key="index">
        <!-- 订单类型 -->
        <div class="bottom-line flex-box item-center">
          <input type="checkbox" class="input-checkbox" style="color:#058bed;">
          <div class="flex-col title color-058bed">即时送</div>
          <div class="font-mind color-999">2017-05-20 19:00:00</div>
        </div>
        <!-- 订单商品 -->
        <div class="scroller-box">
          <img src="../assets/goods_img.jpg" width="25%" v-for="(item,index) in index + 1" :key="index" alt="">
        </div>
        <!-- 订单状态 -->
        <div class="bottom-line flex-box item-center">
          <div class="flex-col order-state-box this-state">
            <div class="state-item succes-item">
              <div class="iconfont">&#xe602;</div>
              <div class="label">提交</div>
            </div>
            <div class="state-item">
              <div class="iconfont">&#xe603;</div>
              <div class="label">支付</div>
            </div>
            <div class="state-item">
              <div class="iconfont">&#xe60b;</div>
              <div class="label">配送</div>
            </div>
            <div class="state-item">
              <div class="iconfont">&#xe607;</div>
              <div class="label">签收</div>
            </div>
          </div>
          <div class="text-center">
            <div class="font-small">合计：<span class="color-058bed">¥85.6</span></div>
            <div class="font-mind color-999">(含运费 ¥3)</div>
          </div>
        </div>
        <!-- 订单操作 -->
        <div class="text-right">
          <span class="btn this-btn" @click="play">支付</span>
        </div>
      </div>

      <div class="order-item" v-for="(item,index) in 5" :key="index">
        <!-- 订单类型 -->
        <div class="bottom-line flex-box item-center">
          <input type="checkbox" class="input-checkbox" style="color:#fc766d;">
          <div class="flex-col title color-fc766d">次日达</div>
          <div class="font-mind color-999">2017-05-20 19:00:00</div>
        </div>
        <!-- 订单商品 -->
        <div class="scroller-box">
          <img src="../assets/goods_img.jpg" width="25%" v-for="(item,index) in index + 1" :key="index" alt="">
        </div>
        <!-- 订单状态 -->
        <div class="bottom-line flex-box item-center">
          <div class="flex-col order-state-box next-state">
            <div class="state-item succes-item">
              <div class="iconfont">&#xe602;</div>
              <div class="label">提交</div>
            </div>
            <div class="state-item">
              <div class="iconfont">&#xe603;</div>
              <div class="label">支付</div>
            </div>
            <div class="state-item">
              <div class="iconfont">&#xe60b;</div>
              <div class="label">配送</div>
            </div>
            <div class="state-item">
              <div class="iconfont">&#xe604;</div>
              <div class="label">送货</div>
            </div>
            <div class="state-item">
              <div class="iconfont">&#xe607;</div>
              <div class="label">签收</div>
            </div>
          </div>
          <div class="text-center">
            <div class="font-small">合计：<span class="color-fc766d">¥85.6</span></div>
            <div class="font-mind color-999">(含运费 ¥3)</div>
          </div>
        </div>
        <!-- 订单操作 -->
        <div class="text-right">
          <span class="btn next-btn" @click="play">支付</span>
        </div>
      </div>
    </div>
    <!-- 页面底部 -->
    <div class="flex-box footer-box">
      <input type="checkbox" id="isAll" class="input-checkbox">
      <label for="isAll" class="label-checkbox">全部</label>
      <div class="flex-col">合计：<span style="color:#fc766d;">¥888.8</span></div>
      <div class="play-btn">合并付款</div>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    components: {
      XHeader
    },
    methods: {
      play () {
        event.preventDefault()
        this.$vux.alert.show({content: '支付订单'})
      }
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
