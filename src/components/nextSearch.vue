<template>
  <div class="search">
    <span class="iconfont icon">&#xe639;</span>
    <div class="input">
      <input type="search" v-model="search" placeholder="搜索商品/条码" @click="goSearch">
      <scan :nextListFlag="nextListFlag" :nextFlag="nextFlag"></scan>
    </div>
  </div>
</template>

<script>
  import scan from '../components/scan'

  export default {
    props: {
      nextListFlag: {
        type: Boolean,
        default: false
      },
      nextFlag: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        search: ''
      }
    },
    components: {
      scan
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
