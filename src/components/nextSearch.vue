<template>
  <div class="search">
    <span class="iconfont icon" @click="searchText()">&#xe639;</span>
    <div class="input">
      <input type="search" v-model="search" @keyup.enter="searchText" placeholder="搜索商品">
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
        if (!this.search) {
          this.$vux.alert.show({content: '请输入搜索内容'})
          return
        }
        this.$router.push({path: '/searchText', query: {search: this.search}})
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .search {
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
        .w(618);
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
