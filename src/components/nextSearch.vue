<template>
  <div class="search" @click="goSearch">
    <span class="iconfont icon">&#xe639;</span>
    <div class="input">
      <input type="search" v-model="search" placeholder="搜索商品">
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        search: ''
      }
    },
    methods: {
      goSearch () {
        this.$router.push({path: '/search', query: {shopType: 1, storeId: Number(localStorage.getItem('m-depotId'))}})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .search {
    .w(618);
    .h(60);
    .lh(60);
    .icon {
      display: table;
      .lh(60);
      color: #fff;
      position: absolute;
      .l(25);
      .fs(32);
    }
    .input {
      width: 100%;
      height: 100%;
      border-radius: 30px/2;
      input {
        width: 100%;
        height: 100%;
        background-color: #6dbe95;
        border-radius: 30px/2;
        border: none;
        color: #ffffff;
        outline: 0;
        .pl(57);
        .fs(28);
        &::-webkit-input-placeholder {
          color: #fff;
        }
      }
    }
  }
</style>
