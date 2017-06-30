<template>
  <div class="side-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="less">
  @import "../common/style/sum";

  .side-bar {
    background-color: #eeeeee;
    .side-item {
      box-sizing: border-box;
      text-align: center;
      .h(91);
      .lh(91);
      border-bottom: 1px solid #eee;
      background-color: #f7f7f7;
      color: #666666;
      text-align: center;
      transition: all 400ms;
      .iconfont {
        margin-right: 5px;
        color: #d3b7b3;
      }
    }

    .active {
      background-color: #ffffff;
      color: #089cf6;
      border-left: 2px solid #f95d43;
      .iconfont {
        color: #f95d43;
      }
    }
  }
</style>
