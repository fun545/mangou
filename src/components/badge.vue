<template>
  <div class="cart-badge t-c" v-if="count">
    <span>{{count}}</span>
  </div>
</template>

<script>

  export default {
    props: {
      count: Number
    }
  }
</script>

<style lang="less">
  @import "../common/style/sum";

  .cart-badge {
    position: absolute;
    right: 10%;
    top: 10%;
    display: inline-block;
    background: #ff571e;
    box-shadow: 0 .026667rem .106667rem 0 hsla(15, 59%, 67%, .6);
    color: #fff;
    .fs(22);
    /*min-width: .21333rem;*/
    .w(33);
    .h(33);
    .lh(33);
    border-radius: 50%;
    /*background-clip: padding-box;*/
    z-index: 10;
  }
</style>
