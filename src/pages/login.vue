<template>
  <div class="login-view">
    <div class="header"></div>
    <div class="middle">
      <form class="form">
        <div class="input-box">
          <tab :line-width="2" active-color="#f95d43" defaultColor="#777" bar-active-color="#f95d43" class="title">
            <tab-item selected>正在正映</tab-item>
            <tab-item>即将上映</tab-item>
          </tab>
        </div>
      </form>
    </div>
    <div class="bt"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Tab, TabItem, Sticky } from 'vux'
  export default {
    components: {Tab, TabItem, Sticky}
  }
</script>

<style lang="less">
  @import "../common/style/varlable";
  @import "../common/style/sum";
  @import "../common/style/mlxin";

  .login-view {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-size: 100%;
    .bg-image('../../assets/BG');
    background-repeat: no-repeat;
    background-size: contain;
    .header {
      .w(477);
      .h(288);
      .mt(86);
      .ml(142);
      .bg-image('../../assets/header');
      background-repeat: no-repeat;
      background-size: contain;
    }
    .middle {
      .pl(60);
      .pr(60);
      .form {
        .mt(86);
        .h(276);
        border-radius: 10px;
        background: #fff;
      }
      .title {
        .h(77);
        background: none;
        .vux-tab-item{
          .lh(77);
        }
      }
    }
  }
</style>
