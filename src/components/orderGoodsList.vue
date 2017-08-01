<template>
  <!--列表标题-->
  <div class="goods-list-title">
    商品详情
    <p class="right f-r">共<span class="theme-color">{{goodsTotalCount}}</span>件</p>
  </div>
  <!--商品列表-->
  <div class="goods-list">
    <div class="item" v-for="(item, index) in filterListThis" :key="index">
      <div class="pic">
        <img v-lazy="item.goodsImgUrl" alt="">
      </div>
      <div class="des">
        <p class="name">{{item.goodsName}}</p>
        <p class="price">￥{{item.canKaoPrice}}</p>
      </div>
      <div class="count">
        x{{item.buyCount}}
      </div>
    </div>
  </div>
  <!--更多-->
  <div class="more" v-if="thisGoodsList.length>2">
    <div class="bt t-c" @click="setCountThis()" v-if="showMoreThis">显示更多</div>
    <div class="bt t-c" @click="setCountThis()" v-if="!showMoreThis">收起商品</div>
  </div>
  <!-- 订单详情-->
  <div class="order-info this">
    <div class="left">
      <p>商品总价</p>
      <p>配送费</p>
    </div>
    <div class="right">
      <p class="s2">￥{{totalPriceThis}}</p>
      <div class="s1">
        <span>+</span>
        <span class="price">￥{{Thisfreight}}</span>
      </div>
    </div>
  </div>
  <!--留言与实际付款 及时送-->
  <div style="background: #fff">
    <slot name="leaveMessge"></slot>
    <!--实际付款 及时送-->
    <div class="pay-count">
      实际付款
      <span class="f-r count">￥{{parseFloat(totalPriceThis) + parseFloat(Thisfreight)}}</span>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      goodsList: Array,
      goodsTotalCount: Number // 商品总数
    },
    data () {
      return {
        selectedTotalCountThis: this.$store.state.selectedTotalCountThis, // 商品数量 及时送
      }
    },
    computed: {
      // 显示更多与隐藏商品及时送
      filterListThis () {
        return this.thisGoodsList.slice(0, this.limitNumberThis)
      },
      // 显示更多与隐藏商品  次日达
      filterListNext () {
        return this.NextGoodsList.slice(0, this.limitNumberNext)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .goods-list-title {
    .h(70);
    .lh(70);
    .pl(31);
    .pr(31);
    .fs(30);
    background: #fff;
    color: @font-color-m;
    .right {
      color: @font-color-input;
    }
  }

  .goods-list {
    background: #f6f8fa;
    .item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .h(141);
      border-top: 1px solid #eee;
      .pl(50);
      .pr(50);
      .pic {
        .w(100);
        .h(100);
        .mr(31);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .des {
        .w(512);
        .fs(28);
        .lh(28);
        .h(75);
        .name {
          color: #444;
          .h(51);
        }
        .price {
          color: @theme-color;
        }
      }
      .count {
        color: #999;
      }
    }
  }

  .more {
    display: flex;
    border-top: 1px solid #eee;
    justify-content: center;
    align-items: center;
    .h(89);
    .bt {
      border-radius: 8px;
      .w(150);
      .h(38);
      .lh(38);
      .fs(25);
      background: #ddd;
      color: @font-color-m;
    }
  }

  .order-info {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    .pl(35);
    .pr(35);
    .h(170);
    .lh(40);
    color: #666;
    .fs(28);
    border-bottom: 1px solid #eee;
    &.this {
      p {
        .lh(58);
      }
    }
    .left {
      .h(107);
    }
    .right {
      .h(107);
      .price {
        .ml(40);
      }
      .s2, .s1 {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .pay-count {
    .h(75);
    .lh(75);
    .pl(35);
    .pr(35);
    .fs(28);
    background: #fff;
    color: @font-color-m;
    .count {
      color: @theme-color;
    }
  }
</style>
