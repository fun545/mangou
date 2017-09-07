<template>
  <ul>
    <li class="item" v-for="(item,index) in goodsList" :key="index">
      <div class="pic f-l">
        <img v-lazy="item.goodsImgUrl" alt="" width="100%" height="100%" @click="goDetail(item.goodsId)">
        <cart-badge :count="item.buyCount"></cart-badge>
      </div>
      <div class="col f-l">
        <h3 class="title">{{item.goodsName}}</h3>
        <div v-if="shopType===1">
          <p class="next-price">次日价：<span class="s1">¥</span><span class="number">{{item.price.toFixed(1)}}</span></p>
          <p class="this-price">即时价：<span class="s1">¥</span><span class="number">{{item.canKaoPrice.toFixed(1)}}</span>
          </p>
        </div>
        <div v-if="shopType===2">
          <p class="next-price">即时价：<span class="s1">¥</span><span class="number">{{item.canKaoPrice.toFixed(1)}}</span>
          </p>
          <p class="this-price">次日价：<span class="s1">¥</span><span class="number">{{item.price.toFixed(1)}}</span></p>
        </div>
      </div>
      <buyCarButton
        :goods="item" v-if="!isCollect"
        :shopStatus="shopStatus"
        :index="index"
      ></buyCarButton>
    </li>
  </ul>
</template>

<script>
  import buyCarButton from '../components/buyCarButton'
  import cartBadge from '../components/badge'

  export default {
    props: {
      goodsList: Array,
      shopType: {
        type: Number,
        default: 1
      },
      isCollect: {
        type: Boolean,
        default: false
      },
      shopStatus: {
        type: Number,
        default: 0 // 正常
      }
    },
    components: {buyCarButton, cartBadge},
    methods: {
      goDetail (id) {
        this.$router.push({
          path: '/goods_detail',
          query: {goodsId: id}
        })
      }
//      changeBuyCount (item, val) {
//        item.buyCount = val
//        console.log(item, val, 'test')
//      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/varlable";
  @import "../common/style/sum";
  /*@import "../common/style/mlxin";*/
  .item {
    .h(233);
    /*  box-sizing: border-box;*/
    .pt(10);
    .pb(10);
    .pl(33);
    position: relative;
    border-bottom: 1px solid @input-border;
    background-color: #fff;
    .pic {
      position: relative;
      .w(210);
      .h(210);
      img {
        display: block;
        border: none;
        width: 100%;
        height: 100%;
      }
    }
    .col {
      .w(461);
      .ml(30);
      align-self: flex-start;
      .title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        color: @font-color-m;
        .fs(31);
        .lh(44);
        .mt(12);
        .mb(48);
      }
      .des {
        .lh(36);
        .fs(23);
        .mb(46);
      }
      .this-price {
        color: @font-color-input;
        .fs(26);
        .lh(40);
        .s1 {
          .fs(25);
        }
        .number {
          .fs(28);
        }
      }

      .next-price {
        color: @theme-color-price;
        .fs(30);
        .lh(50);
        font-weight: bold;
        .s1 {
          .fs(26);
        }
        .number {
          .fs(32);
        }
      }
    }
    .shop-cart-wrap {
      .r(40) !important;
      .b(40) !important;
    }
  }
</style>
