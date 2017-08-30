<template>
  <div class="no-next-shop" :class="{'shop-bg':!hasThisShop}">
    <div class="bt t-c" @click="$router.push('/shop')" :class="{'bt-bg':!hasThisShop}">
      我要加入取货点
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      hasThisShop: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .no-next-shop {
    position: absolute;
    z-index: 10001;
    .t(92);
    .b(100);
    left: 0;
    right: 0;
    background: #fff url("../assets/noNextShop.png") no-repeat center;
    background-size: 10rem 14.26666667rem;
    &.shop-bg {
      background: #fff url("../assets/noThisShop.png") no-repeat center;
      background-size: 10rem 14.26666667rem;
    }
    .bt {
      .mt(880);
      margin-left: auto;
      margin-right: auto;
      .w(442);
      .h(75);
      .lh(75);
      border-radius: 18px;
      background: @theme-color;
      .fs(32);
      color: #fff;
      &.bt-bg {
        background: @theme-color-this;
      }
    }
  }
</style>
