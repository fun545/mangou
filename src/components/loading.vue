<template>
  <div class="loading t-c" v-if="loadingFlag">
    <span class="text">正在加载中...</span>
  </div>
</template>

<script>

  export default {
    props: {
      loadingFlag: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="less">
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .loading {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10000;
    .fs(30);
    background: #eee url("../assets/loading_02.png") no-repeat center;
    background-size: 1.6rem 2.4rem;
    .text {
      position: absolute;
      text-align: center;
      .w(200);
      left: 50%;
      bottom: 35%;
      .ml(-90);
      color: @font-color-m;
    }
  }
</style>
