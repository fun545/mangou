<template>
  <ul class="goods-detail-wrap">
    <li class="item-two-column f-l" v-for="(item,index) in goodsList" :key="index">
      <div class="pic">
        <img :src="item.goodsImgUrl" width="100%" alt="">
      </div>
      <div class="top t-c">
        <h3 class="title ui-ellipsis">{{item.goodsName}}</h3>
        <p class="des">{{item.guige}}</p>
      </div>
      <div class="bt">
        <div>
          <p class="next-price">次日价：<span class="s1">¥</span><span class="number">{{item.price}}</span></p>
          <p class="this-price">即时价：<span class="s1">¥</span><span class="number">{{item.canKaoPrice}}</span></p>
          <div class="shop-car-col t-c">
            <i class="iconfont icon-col">&#xe613;</i>
          </div>
        </div>
      </div>

    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      goodsList: Array
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .goods-detail-wrap {
    .pl(14);
    .item-two-column {
      &:nth-child(odd) {
        .mr(22);
      }
      .w(350);
      .h(512);
      .mb(16);
      border-radius: 6px;
      background: #fff;
      box-shadow: #ddd 2px 2px 2px;
      .pic {
        width: 100%;
        .h(302);
        text-align: center;
        img {
          .w(326);
          .h(292);
          border: none;
        }
      }
      .top {
        box-sizing: border-box;
        .h(91);
        border-bottom: 1px dashed @input-border;
        .title {
          .fs(28);
          .l(50);
          color: #443d39;
        }
        .des {
          color: #888;
          .fs(24);
          .lh(30);
        }
      }
      .bt {
        position: relative;
        .h(119);
        .pl(81);
        display: flex;
        align-items: center;
        .next-price {
          color: @theme-color;
        }
        .this-price {

        }
        .shop-car-col {
          position: absolute;
          .w(51);
          .h(51);
          .lh(55);
          .t(30);
          .r(32);
          border-radius: 50%;
          border: 1px solid @theme-color;
          .icon-col {
            color: @theme-color;
            .fs(33);
          }
        }
      }
    }
  }
</style>
