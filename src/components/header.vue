<template>
  <div class="cp-header t-c">
    <slot name="icon"></slot>
    {{title}}
    <slot name="right"></slot>
  </div>
</template>

<script>

  export default {
    props: {
      title: String
    }
  }
</script>

<style lang="less">
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .cp-header {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    .h(92);
    .lh(92);
    .fs(40);
    background: #fff;
    color: @font-color-m;
    .back-wrap {
      .w(100);
      .h(92);
      display: inline-block;
    }
    .back {
      position: absolute;
      /*.t(50%);
      .mt(-17.5);*/
      top: 0;
      left: 0;
      .fs(35);
      color: @font-color-m;
      .h(92);
      .lh(92);
      .w(100);
    }
  }
</style>
