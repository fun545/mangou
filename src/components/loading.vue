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
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 10000;
    .fs(26);
    background: #eee url("../assets/loading_02.png") no-repeat center;
    /*background: rgba(0, 0, 0, 0) url("../assets/loading_02.png") no-repeat center;*/
    background-size: .8rem 1.2rem;
    .text {
      position: absolute;
      text-align: center;
      .w(200);
      left: 50%;
      bottom: 39%;
      .ml(-90);
      color: @font-color-input;
    }
  }
</style>
