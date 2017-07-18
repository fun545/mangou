<template>
  <div class="search-text-view">
    <!-- 搜索框 -->
    <search-hearder :searchWord="searchWord" :search="search" @click.native="goSearch"></search-hearder>
    <!-- Tab列表 -->
    <tab :line-width="1" defaultColor="#999" :active-color="activeColor" v-model="index" v-if="selected">
      <tab-item selected><i class="iconfont">&#xe60a;</i>次日达</tab-item>
      <tab-item><i class="iconfont">&#xe61f;</i>即时送</tab-item>
    </tab>
    <tab :line-width="1" defaultColor="#999" :active-color="activeColor" v-model="index" v-if="!selected">
      <tab-item><i class="iconfont">&#xe60a;</i>次日达</tab-item>
      <tab-item selected><i class="iconfont">&#xe61f;</i>即时送</tab-item>
    </tab>
    <!-- 相关内容 -->
    <one-column :goodsList="goodsList" class="content"></one-column>
    <div class="footer">

    </div>
  </div>
</template>

<script>
  import { Tab, TabItem } from 'vux'
  import oneColumn from '../components/oneColumn'
  import searchHearder from '../components/searchHeader'
  export default {
    components: {
      Tab,
      TabItem,
      oneColumn,
      searchHearder
    },
    data () {
      return {
        search: '',
        index: 0,
        selected: '',
        goodsList: []
      }
    },
    activated () {
      this.goodsList = []
      if (this.$route.query.shopType === '2') {
        this.selected = false
      } else {
        this.selected = true
      }
      this.search = this.$route.query.search
      this.searchWord(this.$route.query.shopType)
    },
    computed: {
      activeColor () {
        return this.index ? '#07a4f6' : '#fc7070'
      }
    },
    methods: {
      searchWord () {
        if (!this.search) {
          return this.$vux.alert.show({content: '搜索内容不能为空'})
        }
        this.post('/goods/searchGoods', {
          storeId: this.$route.query.storeId,
          shopType: this.$route.query.shopType,
          keyName: this.search
        }).then((res) => {
          if (res.data.code === 100) {
            console.log(res.data)
            if (this.goodsList) {}
            this.goodsList = res.data.goodsInfo.goodsList
          }
        })
      },
      goSearch () {
        this.$router.push({path: 'search'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";

  .search-text-view .top-search-box {
    .search-right {
      .pr(36);
      display: none;
    }
  }

  .search-text-view .vux-tab .iconfont {
    font-size: inherit;
    margin-right: 5px;
  }

  .search-text-view .vux-slider {
    height: calc(~'100% - 84px');

    .vux-swiper {
      overflow-y: scroll;
    }

    .goods-item {
      display: flex;
      align-items: center;
      padding: 10px;
      background-color: #fff;
      position: relative;
    }

    .goods-item:after {
      content: '';
      height: 1px;
      background-color: #ddd;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .flex-col {
      margin: auto 10px;
      line-height: 1.6;
    }

    .cart-icon {
      padding: 4px;
      border-radius: 100px;
      font: 18px/1 'iconfont';
      color: #fff;
      background-color: #999;
    }
  }
  .content{
    background: #fff;
  }
</style>
