<template>
  <ul>
    <li class="item" v-for="(item,index) in goodsList" :key="index">
      <div class="pic f-l">
        <!--<lazy-image-->
        <!--:src='item.goodsImgUrl'-->
        <!--:placeholder='$store.state.defaultImg'-->
        <!--:events="['touchmove']"-->
        <!--@click.native="goDetail(item.goodsId)"-->
        <!--&gt;</lazy-image>-->
        <img v-lazy="item.goodsImgUrl" alt="" width="100%" height="100%">
      </div>
      <div class="col f-l">
        <h3 class="title">{{item.goodsName}}</h3>
        <p class="des">{{item.guige}}</p>
        <div v-if="shopType===1">
          <p class="next-price">次日价：<span class="s1">¥</span><span class="number">{{item.price}}</span></p>
          <p class="this-price">即时价：<span class="s1">¥</span><span class="number">{{item.canKaoPrice}}</span></p>
        </div>
        <div v-if="shopType===2">
          <p class="next-price">即时价：<span class="s1">¥</span><span class="number">{{item.canKaoPrice}}</span></p>
          <p class="this-price">次日价：<span class="s1">¥</span><span class="number">{{item.price}}</span></p>
        </div>
      </div>
      <buyCarButton :goods="item"></buyCarButton>
    </li>
  </ul>
</template>

<script>
  import buyCarButton from '../components/buyCarButton'
  export default {
    props: {
      goodsList: Array,
      shopType: {
        type: Number,
        default: 1
      }
    },
    components: {buyCarButton},
    methods: {
      goDetail (id) {
        this.$router.push({
          path: '/goods_detail',
          query: {goodsId: id}
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/varlable";
  @import "../common/style/sum";
  /*@import "../common/style/mlxin";*/
  .item {
    .h(253);
    box-sizing: border-box;
    .pt(16);
    .pl(33);
    position: relative;
    border-bottom: 1px solid @input-border;
    .pic {
      .w(226);
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
        color: #443d39;
        .fs(27);
        .lh(44);
        .mt(12);
      }
      .des {
        color: #888;
        .lh(36);
        .fs(23);
        .mb(46);
      }
      .this-price {
        color: #888;
        .fs(22);
        .lh(29);
        .s1 {
          .fs(20);
        }
        .number {
          .fs(28);
        }
      }

      .next-price {
        color: @theme-color;
        .fs(25);
        .lh(33);
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
