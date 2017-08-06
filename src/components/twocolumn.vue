<template>
  <ul class="goods-detail-wrap clearfix">
    <li class="item-two-column f-l" v-for="(item,index) in goodsList" :key="index"
        @click="goDetail(item.goodsId,$event)">
      <div class="pic">
        <lazy-image
          :src='item.goodsImgUrl'
          :placeholder='$store.state.defaultImg'
          :events="['touchmove']"
        ></lazy-image>
      </div>
      <div class="top">
        <h3 class="title">{{item.goodsName}}</h3>
      </div>
      <div class="bt">
        <div>
          <p class="next-price">次日价：<span class="s1">¥</span><span class="number">{{item.price}}</span></p>
          <p class="this-price">即时价：<span class="s1">¥</span><span class="number">{{item.canKaoPrice}}</span></p>
          <buy-car-button :goods="item"></buy-car-button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import buyCarButton from '../components/buyCarButton'
  export default {
    props: {
      goodsList: Array
    },
    components: {
      buyCarButton
    },
    methods: {
      goDetail (id, e) {
        if (e.target.tagName.toLowerCase() !== 'i') {
          this.$router.push({
            path: '/goods_detail',
            query: {goodsId: id}
          })
          this.$router.go(0)
        }
      }
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
        .w(300);
        .h(300);
        margin: auto;
        .mt(3);
        text-align: center;
        img {
          width: 100%;
          height: 100%;
          border: none;
        }
      }
      .top {
        box-sizing: border-box;
        .h(91);
        border-bottom: 1px dashed @input-border;
        .pl(16);
        .title {
          .fs(28);
          .l(50);
          color: #443d39;
        }
        /* .des {
           color: #888;
           .fs(24);
           .lh(30);
         }*/
      }
      .bt {
        position: relative;
        .h(119);
        .pl(26);
        .fs(26);
        display: flex;
        align-items: center;
        .next-price {
          color: @theme-color;
        }
        .this-price {

        }
        .shop-car {
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
