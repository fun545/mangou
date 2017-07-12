<template>
  <div v-bind:class="{ nonePic: isActive }" class="none"></div>
</template>

<script>

  export default {
    props: {isActive: Boolean}
  }
</script>

<style lang="less">
  @import "../common/style/sum";

  .none {
    position: absolute;
    left: 0;
    right: 0;
    .t(92);
    bottom: 0;
    background: url("../assets/noneGoods.png") no-repeat center;
    background-size: 179px 239px;
    z-index: 9999;
  }

  .nonePic {
    display: none;
  }
</style>
