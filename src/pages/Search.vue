<template>
  <div class="search-view">
    <!-- 搜索框 -->
    <search-hearder :searchWord="searchWord" :search="search" ref="searchHeader"></search-hearder>
    <!-- 热门搜索 -->
    <div class="title-box">热门搜索</div>
    <div class="word-flex">
      <div class="word-item" v-for="(value,index) in KeyWords" @click="hotSearch(value)" :key="index">
        {{value.keyword}}
      </div>
    </div>
    <!-- 历史记录 -->
    <!--<div class="title-box">
      <div class="flex-col">历史搜索</div>
      <div class="iconfont font-small" @click="delHistory = true">&#xe673;</div>
    </div>-->
    <!--<div class="word-flex">-->
    <!--<div class="word-item" v-for="value in historyList" @click="search = value" v-html="value"/>-->
    <!--</div>-->
  </div>
</template>

<script>
  import { bus } from '../util/util'
  import searchHearder from '../components/searchHeader'
  export default{
    name: 'search',
    components: {
      searchHearder,
      bus
    },
    data () {
      return {
        search: '',
        delHistory: false,
        KeyWords: []
      }
    },
    created () {
      this.post('/goods/searchKeyWord', {storeId: 1, statusType: 1}).then((res) => {
        if (res.data.code === 100) {
          console.log(res.data)
          this.KeyWords = res.data.KeyWords
        }
      })
    },
    methods: {
      searchWord () {
        if (!this.search) {
          return this.$vux.alert.show({content: '搜索内容不能为空'})
        }
        const searchQuery = {
          search: this.search,
          shopType: this.$route.query.shopType,
          storeId: this.$route.query.storeId
        }
        this.$router.push({path: 'search_text', query: searchQuery})
      },
      hotSearch (value) {
        this.search = value.keyword
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";

  .search-view {
    background-color: #fff;
    .fs(25);
  }

  .search-view .top-search-box {
    .mb(20);
    .pb(10);
    position: relative;
    &:after {
      content: '';
      height: 1px;
      background-color: #ddd;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  .search-view .title-box {
    display: flex;
    align-items: center;
    color: #444;
    .lh(40);
    .pl(20);
    .pr(20);
    clear: both;
  }

  .search-view .word-flex {
    display: flex;
    flex-wrap: wrap;
    .mt(10);
    .mb(10);
    .mr(10);
    .ml(10);
    .word-item {
      .mt(10);
      .mb(10);
      .mr(10);
      .ml(10);
      .pt(10);
      .pb(10);
      .pr(30);
      .pl(30);
      .fs(25);
      .lh(40);
      font-family: 'Microsoft Yahei';
      color: #666;
      background-color: #f5f5f5;
      border-radius: 100px;
    }
  }
</style>
