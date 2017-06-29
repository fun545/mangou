<template>
  <div class="order-list-view">
    <!-- 页面标题 -->
    <x-header :left-options="{backText:''}">退款/售后</x-header>
    <div class="content-view-scroller">
      <!-- 订单项目 -->
      <router-link to="/order_info" class="order-item" v-for="(item,index) in 4" :key="index">
        <!-- 订单类型 -->
        <div class="bottom-line flex-box item-center">
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
            <div class="state-item succes-item">
              <div class="iconfont">&#xe603;</div>
              <div class="label">支付</div>
            </div>
            <div class="state-item succes-item">
              <div class="iconfont">&#xe60b;</div>
              <div class="label">配送</div>
            </div>
            <div class="state-item succes-item">
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
          <span class="btn this-btn" @click="evaluate">评价</span>
        </div>
      </router-link>
      <!-- 订单项目 -->
      <router-link to="/order_info" class="order-item" v-for="(item,index) in 5" :key="index">
        <!-- 订单类型 -->
        <div class="bottom-line flex-box item-center">
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
            <div class="state-item succes-item">
              <div class="iconfont">&#xe603;</div>
              <div class="label">支付</div>
            </div>
            <div class="state-item succes-item">
              <div class="iconfont">&#xe60b;</div>
              <div class="label">配送</div>
            </div>
            <div class="state-item succes-item">
              <div class="iconfont">&#xe604;</div>
              <div class="label">送货</div>
            </div>
            <div class="state-item succes-item">
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
          <span class="btn next-btn" @click="evaluate">评价</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'

  export default{
    components: {
      XHeader
    },
    methods: {
      evaluate () {
        event.preventDefault()
        this.$vux.alert.show({content: '评价'})
      }
    }
  }
</script>
