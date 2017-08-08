<template>
  <div class="coupon-view" @touchmove.prevent>
    <!-- 页面头部 -->
    <m-header title="我的优惠券">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <div class="content">
    </div>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  export default {
    components: {
      mHeader
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";

  .coupon-view {
    .cp-header {
      position: inherit;
    }
    .content {
      position: absolute;
      left: 0;
      right: 0;
      .t(92);
      bottom: 0;
      background: url("../assets/noconpu.png") no-repeat center;
      background-size: 55% 50%;
    }
  }
</style>
