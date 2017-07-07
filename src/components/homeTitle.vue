<template>
  <div class="home-title">
    <slot name="icon"></slot>
    <span class="title">{{title}}</span>
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
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .home-title {
    position: relative;
    box-sizing: border-box;
    background: #fff;
    .h(72);
    .lh(72);
    .fs(30);
    color: @theme-color;
    .pl(70);
    .pr(28);
    .icon {
      position: absolute;
      color: @theme-color;
      .w(36);
      .h(36);
      .l(15);
      top: 50%;
      .mt(-18);
    }
    .more {
      float: right;
    }
  }
</style>
