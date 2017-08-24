<template>
  <div>
    <!--列表标题-->
    <div class="goods-list-title">
      商品详情
      <p class="right f-r">共<span class="theme-color">{{goodsTotalCount}}</span>件</p>
    </div>
    <!--商品列表-->
    <div class="goods-list">
      <div class="item" v-for="(item, index) in filterList" :key="index">
        <div class="pic">
          <img v-lazy="item.goodsImgUrl" alt="">
          <!--<lazy-image-->
            <!--:src='item.goodsImgUrl'-->
            <!--:placeholder='$store.state.defaultImg'-->
            <!--:events="['touchmove']"-->
            <!--width="100%"-->
            <!--height="100%"-->
          <!--&gt;</lazy-image>-->
        </div>
        <div class="des">
          <p class="name">{{item.goodsName}}</p>
          <p class="price" v-if="shopType===2">￥{{item.canKaoPrice}}</p>
          <p class="price" v-if="shopType===1">￥{{item.price}}</p>
        </div>
        <div class="count">
          x{{item.buyCount}}
        </div>
      </div>
    </div>
    <!--更多-->
    <div class="more" v-if="goodsList&&goodsList.length>2">
      <div class="bt t-c" @click="setCount()" v-if="!showMoreFlag">显示更多</div>
      <div class="bt t-c" @click="setCount()" v-if="showMoreFlag">收起商品</div>
    </div>
    <!-- 订单详情-->
    <div class="order-info" :class="{'this':shopType===2,'next':shopType===1}">
      <div class="left">
        <p>商品总价</p>
        <p v-if="shopType===1">优惠金额</p>
        <p>配送费</p>
      </div>
      <div class="right">
        <p class="s2">￥{{goodsTotalPrice}}</p>
        <div class="s1">
          <span>-</span>
          <!--优惠金额  -->
          <span class="price">￥{{discount}}</span>
        </div>
        <div class="s1">
          <span>+</span>
          <span class="price">￥{{freight}}</span>
        </div>
      </div>
    </div>
    <!--留言与实际付款 及时送-->
    <div style="background: #fff">
      <slot name="leaveMessge"></slot>
      <!--实际付款 及时送-->
      <div class="pay-count">
        实际付款
        <span class="f-r count">￥{{parseFloat(totalPrice)}}</span>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      goodsList: Array, // 商品列表
      goodsTotalCount: Number, // 商品总数
      scrollObj: Object, // scroll实例
      shopType: Number,
      totalPrice: {
        type: Number,
        default: 0
      },
      freight: Number,
      discount: Number,
      goodsTotalPrice: {
        type: Number,
        default: 0
      } // 商品总价
    },
    data () {
      return {
        showMoreFlag: false,
        limitNumber: 2
      }
    },
    methods: {
      // 点击显示更多与隐藏 togle 及时送
      setCount () {
        if (this.showMoreFlag) {
          this.limitNumber = 2
        } else {
          this.limitNumber = this.goodsList.length
        }
        this.showMoreFlag = !this.showMoreFlag
        this.$nextTick(() => {
          this.scrollObj.refresh()
        })
      }
    },
    computed: {
      // 显示更多与隐藏商品
      filterList () {
        if (this.goodsList) {
          return this.goodsList.slice(0, this.limitNumber)
        }
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
