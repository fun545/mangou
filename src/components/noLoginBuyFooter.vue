<template>
  <div class="noLogin" @click="$router.push({path:'login'})">
    <div class="buy-car">
      <div class="icon d-ib">
        <i class="iconfont center">&#xe613;</i>
      </div>
      <div class="text d-ib">
        去登陆
      </div>
    </div>
    <div class="button t-c">
      去登录
    </div>
  </div>
</template>

<script>

  export default {}
</script>

<style lang="less">
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .noLogin {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    border-top: 1px solid #eee;
    background: #f8f8f8;
    .h(100);
    .lh(100);
    .buy-car {
      float: left;
      .h(100);
      .ml(20);
      color:#bbb;
      .icon {
        position: relative;
        float: left;
        .t(12.5);
        background: #bbb;
        .w(70);
        .h(70);
        border-radius: 50%;
        .iconfont {
          .fs(50);
          color: #fff;
        }
      }
      .text {
        position: absolute;
        .ml(30);
        .h(100);
        .lh(100);
        .fs(28);
        color: #bbb;
      }
    }
    .button {
      position: absolute;
      right: 0;
      text-outline:;
      .w(160);
      .h(100);
      .lh(100);
      background: #bbb;
      color: #fff;
      .fs(30);
    }
  }
</style>
