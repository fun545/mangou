<template>
  <div class="order-list-view">
    <!-- 页面标题 -->
    <x-header :left-options="{backText:''}">全部订单</x-header>
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
            <div class="state-item" :class="{'succes-item' : index >= 0}">
              <div class="iconfont">&#xe602;</div>
              <div class="label">提交</div>
            </div>
            <div class="state-item" :class="{'succes-item' : index >= 1}">
              <div class="iconfont">&#xe603;</div>
              <div class="label">支付</div>
            </div>
            <div class="state-item" :class="{'succes-item' : index >= 2}">
              <div class="iconfont">&#xe60b;</div>
              <div class="label">配送</div>
            </div>
            <div class="state-item" :class="{'succes-item' : index >= 3}">
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
          <span class="btn this-btn" v-if="index === 0" @click="play">支付</span>
          <span class="btn this-btn" v-if="index === 1" @click="remind">提醒发货</span>
          <span class="btn this-btn" v-if="index === 2" @click="contact">联系店家</span>
          <span class="btn this-btn" v-if="index === 3" @click="evaluate">评价</span>
          <span class="btn this-btn" v-if="index === 4" @click="remove">删除订单</span>
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
            <div class="state-item" :class="{'succes-item' : index >= 0}">
              <div class="iconfont">&#xe602;</div>
              <div class="label">提交</div>
            </div>
            <div class="state-item" :class="{'succes-item' : index >= 1}">
              <div class="iconfont">&#xe603;</div>
              <div class="label">支付</div>
            </div>
            <div class="state-item" :class="{'succes-item' : index >= 2}">
              <div class="iconfont">&#xe60b;</div>
              <div class="label">配送</div>
            </div>
            <div class="state-item" :class="{'succes-item' : index >= 3}">
              <div class="iconfont">&#xe604;</div>
              <div class="label">送货</div>
            </div>
            <div class="state-item" :class="{'succes-item' : index >= 4}">
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
          <span class="btn next-btn" v-if="index === 0" @click="play">支付</span>
          <span class="btn next-btn" v-if="index === 1" @click="remind">提醒发货</span>
          <span class="btn next-btn" v-if="index === 2" @click="contact">联系店家</span>
          <span class="btn next-btn" v-if="index === 3" @click="evaluate">评价</span>
          <span class="btn next-btn" v-if="index === 4" @click="remove">删除订单</span>
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
      play () {
        event.preventDefault()
        this.$vux.alert.show({content: '支付订单'})
      },
      remind () {
        event.preventDefault()
        this.$vux.alert.show({content: '提醒发货'})
      },
      contact () {
        event.preventDefault()
        this.$vux.alert.show({content: '联系店家'})
      },
      evaluate () {
        event.preventDefault()
        this.$vux.alert.show({content: '评价'})
      },
      remove () {
        event.preventDefault()
        this.$vux.alert.show({content: '删除订单'})
      }
    }
  }
</script>

<style lang="less">
  .order-list-view .vux-header {
    background-color: #f78752;

    [class^=vux-header-] {
      color: #fff;
    }

    .left-arrow:before {
      border-color: #fff;
      border-width: 2px 0 0 2px;
    }
  }

  .order-list-view .content-view-scroller {
    height: calc(~'100% - 46px');
    overflow-y: scroll;

    .order-item {
      display: table;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 10px;
      padding: 0 10px;
      font: 14px/1.3 'Microsoft Yahei';
      color: #444;
      background-color: #fff;
    }

    .order-item:last-child {
      margin-bottom: 0;
    }

    .color-058bed {
      color: #058bed;
    }

    .color-fc766d {
      color: #fc766d;
    }

    .color-999 {
      color: #999;
    }

    .item-center {
      align-items: center;
    }

    .title {
      font: italic bold 16px/20px 'Microsoft Yahei';
    }

    .btn {
      margin: 10px auto;
      padding: 4px 12px;
      display: inline-block;
      color: #fff;
      font-size: 12px;
      line-height: 1;
      border-radius: 100px;

      &.this-btn {
        background-color: #058bed;
      }

      &.next-btn {
        background-color: #fc766d;
      }
    }
  }

  .order-list-view .bottom-line {
    padding: 10px 0;
    position: relative;

    &:after {
      content: '';
      height: 1px;
      background-color: #ddd;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  .order-list-view .scroller-box {
    display: flex;
    align-items: center;
    padding: 10px 0;
    overflow-x: scroll;

    & + .bottom-line:before {
      content: '';
      height: 1px;
      background-color: #ddd;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
    }
  }

  .order-list-view .order-state-box {
    display: flex;

    .state-item {
      margin-left: 20px;
      text-align: center;
      color: #666;
      position: relative;
    }

    .state-item:before {
      content: '\e672';
      font: 16px/1px 'iconfont';
      position: absolute;
      left: -2px;
      top: 12px;
      transform: translate(-100%, 50%);
    }

    .state-item:first-child {
      margin-left: 0;
    }

    .state-item:first-child:before {
      display: none;
    }

    .iconfont {
      width: 24px;
      height: 24px;
      box-sizing: border-box;
      text-align: center;
      font-size: 12px;
      line-height: 24px;
      color: #666;
      border: 1px solid #666;
      border-radius: 100px;
    }

    .label {
      font-size: 12px;
      line-height: 20px;
    }

    &.this-state .succes-item {
      color: #058bed;

      .iconfont {
        color: #fff;
        background-color: #058bed;
        border: none;
      }
    }

    &.next-state .succes-item {
      color: #fc766d;

      .iconfont {
        color: #fff;
        background-color: #fc766d;
        border: none;
      }
    }
  }
</style>
