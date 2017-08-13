<template>
  <!-- 搜索框 -->
  <div class="top-search-box">
    <div class="search-left" @click="$router.back()">&#xe600;</div>
    <div class="search-box">
      <input type="search" placeholder="搜索内容" @keyup.enter="searchWord" v-model.trim="search">
    </div>
    <div class="search-right" @click="searchWord">搜索</div>
  </div>
</template>

<script>

  export default {
    props: {
      searchWord: Function,
      search: String,
      url: String
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";

  .top-search-box {
    display: flex;
    align-items: center;
    background-color: #fff;
    .pt(15);
    .pb(5);

    .search-left {
      padding-left: 10px;
      /* font: 16px/1 'iconfont';*/
      .fs(40);
      .lh(40);
      font-family: 'iconfont';
    }

    .search-box {
      margin-top:auto;
      margin-bottom:auto;
      .ml(20);
      .mr(20);
      .pt(10);
      .pb(10);
      .pl(20);
      .pr(20);
      flex-grow: 1;
      .h(40);
      .lh(40);
      background-color: #f2f2f2;
      border-radius: 100px;
      position: relative;
    }

    .search-box:before {
      content: '\e639';
      color: #666;
      font: 12px/1 'iconfont';
      .fs(25);
      position: absolute;
      .t(20);
      .l(20);
    }

    input {
      width: 100%;
      .lh(40);
      .pl(32);
      color: #666;
      .fs(30);
      border: none;
      background-color: transparent;
      outline: none;
      -webkit-appearance: none;
    }

    .search-right {
      .pr(36);
      color: #666;
      .fs(34)
    }
  }
</style>
