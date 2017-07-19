<template>
  <div class="search-text-view" @touchmove.prevent>
    <div class="top">
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
    </div>
    <!-- 相关内容 -->
    <div ref="content" class="contentWrap">
      <one-column :goodsList="goodsList" class="content" v-if="!noPageFlag"></one-column>
      <no-page v-if="noPageFlag"></no-page>
    </div>
    <div class="footer" v-if="login">
      <div class="buy-car">
        <div class="icon d-ib">
          <i class="iconfont center">&#xe613;</i>
          <div class="badge">
            <badge text="123"></badge>
          </div>
        </div>
        <div class="text d-ib">
          合计：<span>￥50.55</span>
        </div>
      </div>
      <div class="button t-c">
        去结算
      </div>
    </div>
    <no-login-footer v-if="!login"></no-login-footer>
  </div>
</template>

<script>
  import { Tab, TabItem, Badge } from 'vux'
  import oneColumn from '../components/oneColumn'
  import searchHearder from '../components/searchHeader'
  import BScroll from 'better-scroll'
  import noLoginFooter from '../components/noLogin'
  import noPage from '../components/noPage'
  export default {
    components: {
      Tab,
      TabItem,
      oneColumn,
      searchHearder,
      Badge,
      BScroll,
      noLoginFooter,
      noPage
    },
    data () {
      return {
        search: '',
        index: 0,
        selected: '',
        goodsList: [],
        noPageFlag: false,
        login: true
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
          keyName: this.search,
          token: localStorage.getItem('m-token')
        }).then((res) => {
          if (res.data.code === 100) {
            console.log(res.data)
            if (this.goodsList) {}
            this.goodsList = res.data.goodsInfo.goodsList
            if (!this.goodsList) {
              this.noPageFlag = true
            }
            this.$nextTick(() => {
              this._initScroll()
            })
          }
          if (res.data.code === 102) {
            this.login = false
          }
        })
      },
      goSearch () {
        this.$router.push({path: 'search'})
        this.$router.go(0)
      },
      _initScroll () {
        this.contentScroll = new BScroll(this.$refs.content, {click: true})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

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

  .contentWrap {
    position: absolute;
    .t(168);
    right: 0;
    left: 0;
    .b(100);
    overflow: hidden;
    .content {
      background: #fff;
    }
  }

  .footer {
    box-sizing: border-box;
    border-top: 1px solid #eee;
    background: #f8f8f8;
    .h(100);
    .lh(100);
    .buy-car {
      float: left;
      .h(100);
      .ml(20);
      color: @theme-color;
      .icon {
        position: relative;
        float: left;
        .t(5);
        background: #fff;
        .w(90);
        .h(90);
        border-radius: 50%;
        .iconfont {
          .fs(60);
        }
        .badge {
          position: absolute;
          .h(30);
          .r(40);
          .t(10);
          .vux-badge {
            position: absolute;
            .fs(22);
            .pl(4);
            .pr(4);
            .h(30);
            .lh(30);
            border: 1px solid #fff;
          }
        }
      }
      .text {
        position: absolute;
        .ml(30);
        .h(100);
        .lh(100);
        .fs(32);
        color: @font-color-m;
        span {
          color: @theme-color;
          .fs(35);
        }
      }
    }
    .button {
      position: absolute;
      right: 0;
      text-outline:;
      .w(160);
      .h(100);
      .lh(100);
      background: #ff0000;
      color: #fff;
      .fs(30);
    }
  }
</style>
