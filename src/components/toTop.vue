<template>
  <div class="iconfont topTop t-c" @click="backTop">
    &#xe653;
  </div>
</template>

<script>

  export default {
    props: {
      scrollObj: Object
    },
    methods: {
      backTop () {
        this.scrollObj.scrollTo(0, 0, 350)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../common/style/sum";

  .topTop {
    position: fixed;
    z-index: 120001;
    .b(160);
    .r(50);
    .w(75);
    .h(75);
    .lh(80);
    .fs(43);
    background: rgba(0, 0, 0, .2);
    color: #fff;
    border-radius: 50%;
  }
</style>
