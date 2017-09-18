<template>
  <div class="share-view" @touchmove.prevent>
    <!-- 页面头部 -->
    <m-header title="漫购">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <!-- 分享页面 -->
    <div class="share-img">
      <img src="../assets/share.png" width="100%" alt="" height="100%">
      <div class="bt" @click="share"></div>
    </div>
  </div>
</template>

<script>
  import mHeader from '../components/header'

  export default {
    components: {
      mHeader
    },
    methods: {
      share () {}
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .share-view {
    .cp-header {
      position: inherit;
      .back {
        color: @font-color-m;
      }
    }
    .share-img {
      position: absolute;
      left: 0;
      right: 0;
      .t(92);
      bottom: 0;
    }
    .bt {
      position: absolute;
      /*width: 80%;*/
      .h(150);
      right: 14.3%;
      left: 13%;
      .b(50);
    }
  }

</style>
