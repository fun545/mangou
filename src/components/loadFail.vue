<template>
  <div class="load-fail">
    <div class="iconfont icon theme-color t-c">&#xe69b;</div>
    <div class="theme-color t-c">加载失败</div>
    <div class="bt t-c theme-bg-color" @click="reload">
      重新加载
    </div>
  </div>
</template>

<script>

  export default {
    methods: {
      reload () {
        window.location.reload()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .load-fail {
    background-color: @bg-color;
    position: absolute;
    .t(92);
    left: 0;
    right: 0;
    .b(100);
    z-index: 10000;
    .icon {
      .fs(220);
      .mt(220);
      .mb(10);
    }
    .fs(45);
    .bt {
      margin: 0 auto;
      .mt(40);
      .w(400);
      .pt(10);
      .pb(10);
      .fs(40);
      color: #fff;
      border-radius: 5px;
    }
  }
</style>
