<template>
  <div class="search">
    <span class="iconfont icon" @click="searchText()">&#xe639;</span>
    <div class="input" @click="$router.push({path:'/search'})">
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
      searchText () {
        this.$router.push({path: '/searchText', query: {search: this.search}})
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
      color: #f9d2cd;
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
        background-color: #f28d7d;
        border-radius: 30px/2;
        border: none;
        color: #ffffff;
        outline: 0;
        .pl(57);
        .fs(28);
        &::-webkit-input-placeholder {
          color: #f9d2cd;
        }
      }
    }
  }
</style>
