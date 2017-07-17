<template>
  <div class="search-view">
    <!-- 搜索框 -->
    <div class="top-search-box">
      <div class="search-left" @click="$router.go(-1)">&#xe600;</div>
      <div class="search-box">
        <input type="search" placeholder="搜索内容" @keyup.enter="searchWord" v-model.trim="search">
      </div>
      <div class="search-right" @click="searchWord">搜索</div>
    </div>
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
  export default{
    data () {
      return {
        search: '',
        delHistory: false,
        KeyWords: []
      }
    },
    activated () {
      this.post('/goods/searchKeyWord', {storeId: 1, statusType: 1}).then((res) => {
        if (res.data.code) {
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

<style lang="less">
  .search-view {
    background-color: #fff;
  }

  .search-view .top-search-box {
    display: flex;
    align-items: center;
    padding: 5px 0;
    margin-bottom: 10px;
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

    .search-left {
      padding-left: 10px;
      font: 16px/1 'iconfont';
    }

    .search-box {
      margin: auto 10px;
      padding: 5px 10px;
      flex-grow: 1;
      height: 20px;
      line-height: 20px;
      background-color: #f2f2f2;
      border-radius: 100px;
      position: relative;
    }

    .search-box:before {
      content: '\e639';
      color: #666;
      font: 12px/1 'iconfont';
      position: absolute;
      top: 10px;
      left: 10px;
    }

    input {
      width: 100%;
      line-height: 20px;
      padding-left: 16px;
      color: #666;
      font-size: 12px;
      border: none;
      background-color: transparent;
      outline: none;
      -webkit-appearance: none;
    }

    .search-right {
      padding-right: 10px;
      color: #666;
      font-size: 12px;
    }
  }

  .search-view .title-box {
    display: flex;
    align-items: center;
    color: #444;
    line-height: 20px;
    padding: 0 10px;
    clear: both;
  }

  .search-view .word-flex {
    display: flex;
    flex-wrap: wrap;
    margin: 5px;

    .word-item {
      margin: 5px;
      padding: 5px 15px;
      font: 12px/20px 'Microsoft Yahei';
      color: #666;
      background-color: #f5f5f5;
      border-radius: 100px;
    }
  }
</style>
