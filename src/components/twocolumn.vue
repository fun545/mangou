<template>
  <ul class="goods-detail-wrap clearfix">
    <li class="item-two-column f-l" v-for="(item,index) in goodsList" :key="index">
      <div class="pic">
        <img v-lazy="item.goodsImgUrl" alt="" width="100%" height="100%" @click="goDetail(item)">
        <cart-badge :count="item.buyCount"></cart-badge>
      </div>
      <div class="top">
        <h3 class="title">{{item.goodsName}}</h3>
      </div>
      <div class="bt">
        <div>
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
          <!--<buy-car-button :goods="item"></buy-car-button>-->
          <buy-car-button
            :goods="item"
            :index="index"
            :goodsList="goodsList"
            @updateColumCount="updateColumCount"
          ></buy-car-button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import buyCarButton from '../components/buyCarButton'
  import cartBadge from '../components/badge'

  export default {
    props: {
      goodsList: Array,
      type: String,
      scrollObj: Object,
      shopType: {
        type: Number,
        default: 1
      }
    },
    components: {
      buyCarButton,
      cartBadge
    },
    methods: {
      updateColumCount (list, index, count) {
        this.$emit('updateGoodsListCount', list, index, count)
      },
      goDetail (item) {
        this.$store.commit('saveGoodsItem', item)
        if (this.type === 'goodsDetail') {
          this.$emit('changeData', item.goodsId)
          this.scrollObj.scrollTo(0, 0, 0)
          return
        }
        this.$router.push({
          path: '/goods_detail',
          query: {goodsId: item.goodsId}
        })
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
          .fs(31);
          .l(50);
          color: @font-color-m;
        }
      }
      .bt {
        position: relative;
        .h(119);
        .pl(26);
        .fs(26);
        display: flex;
        align-items: center;
        .next-price {
          color: @theme-color-price;
          .fs(28);
          font-family: "Microsoft Yahei";
          font-weight: 600;
        }
        .this-price {
          color: @font-color-input;
          .fs(26)
        }
        .shop-cart-wrap {
          top: 50%;
          transform: translateY(-50%);
          .r(32);
          .icon-col {
            color: @theme-color;
            .fs(33);
          }
        }
      }
    }
  }
</style>
