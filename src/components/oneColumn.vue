<template>
  <ul>
    <li class="item" v-for="(item,index) in goodsList" :key="index" @click="goDetail(item.goodsId)">
      <div class="pic f-l">
        <img v-lazy="item.goodsImgUrl" alt="">
      </div>
      <div class="col f-l">
        <h3 class="title">{{item.goodsName}}</h3>
        <p class="des">{{item.guige}}</p>
        <p class="next-price">次日价：<span class="s1">¥</span><span class="number">{{item.price}}</span></p>
        <p class="this-price">即时价：<span class="s1">¥</span><span class="number">{{item.canKaoPrice}}</span></p>
      </div>
      <div class="iconfont shop-car t-c">&#xe613;</div>
    </li>
  </ul>
</template>

<script>

  export default {
    props: {
      goodsList: Array
    },
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
      /*flex-grow: 1;*/
      /*margin: auto 10px;*/
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
    .iconfont.shop-car {
      .w(60);
      .h(60);
      .lh(60);
      box-sizing: border-box;
      /*background: red;*/
      .fs(36);
      color: #089cf6;
      border: 1px solid #089cf6;
      border-radius: 50%;
      position: absolute;
      .r(30);
      .b(40);
    }
  }
</style>
