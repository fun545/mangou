<template>
  <div class="loading t-c" v-if="loadingFlag">
    正在加载中...
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

  .loading {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10000;
    .fs(36);
    background: url("../assets/loading_02.png") no-repeat center;
    background-size: 120px 180px;
  }
</style>
