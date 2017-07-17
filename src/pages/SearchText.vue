<template>
  <div class="search-text-view">
    <!-- 搜索框 -->
    <div class="top-search-box">
      <div class="search-left" @click="$router.go(-1)">&#xe600;</div>
      <div class="search-box">
        <input type="search" placeholder="搜索内容" @keyup.enter="searchWord" v-model.trim="search">
      </div>
      <div class="search-right" @click="searchWord">搜索</div>
    </div>
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
    <one-column :goodsList="goodsList"></one-column>
  </div>
</template>

<script>
  import { Tab, TabItem } from 'vux'
  import oneColumn from '../components/oneColumn'
  export default {
    components: {
      Tab,
      TabItem,
      oneColumn
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
      searchWord (shopType) {
        console.log(511)
        if (!this.search) {
          return this.$vux.alert.show({content: '搜索内容不能为空'})
        }
        this.post('/goods/searchGoods', {
          storeId: this.$route.query.storeId,
          shopType: shopType,
          keyName: this.search
        }).then((res) => {
          if (res.data.code === 100) {
            console.log(res.data)
            if (this.goodsList) {}
            this.goodsList = res.data.goodsInfo.goodsList
          }
        })
      }
//      searchWord () {
//        console.log(2333)
//        if (!this.search) return this.$vux.alert.show({content: '搜索内容不能为空'})
//        this.post('/goods/searchGoods', {
//          storeId: this.$route.query.storeId,
//          shopType: this.$route.query,
//          keyName: this.searchWord,
//          pageSize: 10,
//          pageIndex: 1
//        }).then((res) => {
//          console.log(res.data)
//        })
//      }
    }
  }
</script>

<style lang="less">
  .search-text-view .top-search-box {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 5px 0;

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
</style>
