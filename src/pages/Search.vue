<template>
  <div class="search-view">
    <!-- 搜索框 -->
    <!--<search-hearder :searchWord="searchWord" :search="search" ref="searchHeader"></search-hearder>-->
    <!--v-model.trim="searchWord"-->
    <div class="top-search-box">
      <div class="search-left" @click="$router.back()">&#xe600;</div>
      <div class="search-box">
        <input type="search" placeholder="搜索内容" @keyup.enter="searchWord" v-focus v-model="keyName">
      </div>
      <div class="search-right" @click="goSearch">搜索</div>
    </div>
    <!-- 热门搜索 -->
    <div class="search-words-wrap" v-if="false">
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
    <div class="search-bottom-wrap">
      <div class="top">
        <!-- Tab列表 -->
        <tab :line-width="1" defaultColor="#999" :active-color="activeColor" v-model="index">
          <tab-item :selected="item.name===curItem" v-for="(item,index) in tabList" :key="index"
                    @on-item-click="tabClick"><i
            class="iconfont" v-html="item.icon"></i>{{item.name}}
          </tab-item>
        </tab>
      </div>
      <!-- 相关内容 -->
      <div class="list-conent-wrap">
        <!--次日达-->
        <div ref="contentNext" class="contentWrap next" :class="{'active':shopType===1,'no-goods':noGoodsFlagNext}">
          <div>
            <one-column :goodsList="NextGoodsList" :shopType="shopType" class="content"></one-column>
            <load-more
              :tip="loadText"
              :show-loading="moreIconFlag"
              background-color="#f7f7f7"
              class="load-more"
              v-if="loadMoreFlagNext"
            ></load-more>
          </div>
        </div>
        <!--及时送-->
        <div ref="contentThis" class="contentWrap this" :class="{'active':shopType===2,'no-goods':noGoodsFlagThis}">
          <div>
            <one-column :goodsList="ThisGoodsList" :shopType="shopType" class="content"></one-column>
            <load-more
              :tip="loadText"
              :show-loading="moreIconFlag"
              background-color="#f7f7f7"
              class="load-more"
              v-if="loadMoreFlagThis"
            ></load-more>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" v-if="token">
      <div class="buy-car">
        <div class="icon d-ib">
          <i class="iconfont center">&#xe613;</i>
          <div class="badge">
            <badge :text="totalBuyCount"></badge>
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
    <ball :type="2"></ball>
    <no-login-footer v-if="!token"></no-login-footer>
  </div>
</template>

<script>
  import { Tab, TabItem, Badge, LoadMore } from 'vux'
  import oneColumn from '../components/oneColumn'
  import BScroll from 'better-scroll'
  import noLoginFooter from '../components/noLoginBuyFooter'
  import { loadMore } from '../util/util'
  import searchHearder from '../components/searchHeader'
  import ball from '../components/ball'
  export default{
    name: 'search',
    components: {
      searchHearder,
      Tab,
      TabItem,
      Badge,
      oneColumn,
      BScroll,
      noLoginFooter,
      ball,
      LoadMore
    },
    data () {
      return {
        keyName: '', // 搜索关键词
        delHistory: false,
        KeyWords: [],
//        search: '',
        index: 1,
        selected: '',
        ThisGoodsList: [],
        NextGoodsList: [],
        noPageFlag: false,
        token: localStorage.getItem('m-token'),
        storeId: localStorage.getItem('m-depotId'), // 默认仓库store
        shopType: 1, // 默认次日达
        pageSize: 10,
        ThisPageIndex: 1,
        NextPageIndex: 1,
        nextScroll: {},
        thisScroll: {},
        scrollDisableThis: false,
        scrollDisableNext: false,
        loadText: '加载中...',
        moreIconFlag: true,
        tabList: [{name: '次日达', icon: '&#xe60a;'}, {name: '即时送', icon: '&#xe61f;'}],
        thisTabFlag: false,
        nextTabFlag: false,
        loadMoreFlagThis: false,
        loadMoreFlagNext: false,
        noGoodsFlagThis: false,
        noGoodsFlagNext: false
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
//      goSearch () {
//        this.$router.push({path: 'search'})
//        this.$router.go(0)
//      },
      searchWord () {
        if (!this.search) {
          return this.$vux.alert.show({content: '搜索内容不能为空'})
        }
        const searchQuery = {
          search: this.search,
          shopType: this.shopType,
          storeId: this.storeId
        }
        this.$router.push({path: 'search_text', query: searchQuery})
      },
      // tab切换
      tabClick (index) {
        if (index === 0) {
          this.storeId = localStorage.getItem('m-depotId')
          this.thisTabFlag = true
          this.shopType = 1
          if (this.NextGoodsList.length === 0) {
            this.goSearch()
          }
          if (typeof this.nextScroll.refresh === 'function') {
            this.nextScroll.refresh()
            console.log('thisrefresh')
          }
        } else {
          this.storeId = localStorage.getItem('m-shopId')
          this.nextTabFlag = true
          this.shopType = 2
          if (this.ThisGoodsList.length === 0) {
            this.goSearch()
          }
          console.log(this.ThisGoodsList.length)
          if (typeof this.thisScroll.refresh === 'function') {
            this.thisScroll.refresh()
          }
        }
      },
      // 去搜索
      async goSearch () {
        if (!this.keyName) {
          return this.$vux.alert.show({content: '搜索内容不能为空'})
        }
        await this.post('/goods/searchGoods', {
          storeId: this.storeId,
          shopType: this.shopType,
          keyName: this.keyName
        }).then((res) => {
          if (res.data.code === 100) {
//            if (res.data.goodsInfo.goodsList === 0) {
//              this.noPageFlag = true
//            }
            // 如果是及时送
            if (this.shopType === 2) {
              this.ThisGoodsList = res.data.goodsInfo.goodsList
              if (this.ThisGoodsList.length === 0) {
                this.noGoodsFlagThis = true
              }
              // 如果是次日达
            } else {
              this.NextGoodsList = res.data.goodsInfo.goodsList
              if (this.NextGoodsList.length === 0) {
                this.noGoodsFlagNext = true
              }
            }
          }
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'bottom')
            localStorage.removeItem('m-token')
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'bottom')
            localStorage.removeItem('m-token')
          }
        })
        if (this.shopType === 1) {
          this._initScrollNext()
        }
        if (this.shopType === 2) {
          this._initScrollThis()
        }
      },
      hotSearch (value) {
        this.search = value.keyword
      },
      // 次日达scroll
      _initScrollNext () {
        this.nextScroll = new BScroll(this.$refs.contentNext, {
          click: true,
          disableMouse: true,
          disablePointer: false,
          probeType: 3
        })
        loadMore(this.nextScroll, this.$refs.contentNext, this.loadMoreCallBackNext)
      },
      _initScrollThis () {
        this.thisScroll = new BScroll(this.$refs.contentThis, {
          click: true,
          disableMouse: true,
          disablePointer: false,
          probeType: 3
        })
        loadMore(this.thisScroll, this.$refs.contentThis, this.loadMoreCallBackThis)
      },
      async loadMoreCallBackNext () {
        this.loadMoreFlagNext = true
        if (!this.scrollDisableNext) {
          this.scrollDisableNext = true
          this.NextPageIndex += 1
          await this.post('/goods/searchGoods', {
            storeId: this.storeId,
            shopType: this.shopType,
            keyName: this.keyName,
            pageSize: 10,
            pageIndex: this.NextPageIndex
          }).then((res) => {
            if (res.data.code === 100) {
              let newList = res.data.goodsInfo.goodsList
              // 如果是及时送
              newList.forEach((item) => {
                this.NextGoodsList.push(item)
              })
              if (newList.length > 0) {
                setTimeout(() => {
                  this.nextScroll.refresh()
                }, 50)
              } else {
                this.loadText = '到底啦~'
                this.moreIconFlag = false
              }
              this.scrollDisableNext = false
            }
            if (res.data.code === 101) {
              this.$vux.toast.text(res.data.msg, 'bottom')
              localStorage.removeItem('m-token')
            }
            if (res.data.code === 102) {
              this.$vux.toast.text(res.data.msg, 'bottom')
              localStorage.removeItem('m-token')
            }
            this.scrollDisableNext = false
          })
        }
      },
      async loadMoreCallBackThis () {
        this.loadMoreFlagThis = true
        if (!this.scrollDisableThis) {
          this.scrollDisableThis = true
          this.ThisPageIndex += 1
          await this.post('/goods/searchGoods', {
            storeId: localStorage.getItem('m-shopId'),
            shopType: this.shopType,
            keyName: this.keyName,
            pageSize: 10,
            pageIndex: this.ThisPageIndex
          }).then((res) => {
            if (res.data.code === 100) {
              let newList = res.data.goodsInfo.goodsList
              // 如果是及时送
              newList.forEach((item) => {
                this.ThisGoodsList.push(item)
              })
              if (newList.length > 0) {
                setTimeout(() => {
                  this.thisScroll.refresh()
                }, 50)
              } else {
                this.loadText = '到底啦~'
                this.moreIconFlag = false
              }
              this.scrollDisableThis = false
            }
            if (res.data.code === 101) {
              this.$vux.toast.text(res.data.msg, 'bottom')
              localStorage.removeItem('m-token')
            }
            if (res.data.code === 102) {
              this.$vux.toast.text(res.data.msg, 'bottom')
              localStorage.removeItem('m-token')
            }
            this.scrollDisableThis = false
          })
        }
      }
    },
    computed: {
      activeColor () {
        return this.index ? '#07a4f6' : '#fc7070'
      },
      totalBuyCount () {
        return this.$store.state.totalBuyCount
      },
      curItem () {
        if (this.shopType === 1) {
          return '次日达'
        } else {
          return '即时送'
        }
      }
    },
    directives: {
      focus: {
        inserted (el, binding) {
          el.focus()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .search-view {
    background-color: #fff;
    .fs(25);
  }

  .no-goods {
    background: url("../assets/noneGoods.png") no-repeat center center;
    background-size: 50% 50%;
  }

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
      margin-top: auto;
      margin-bottom: auto;
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

  /*.search-view .top-search-box {
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
  }*/

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

  .search-view .vux-tab .iconfont {
    font-size: inherit;
    .mr(10);
  }

  .search-view .vux-tab {
    .h(88);
    .lh(88);
    .vux-tab-item {
      .h(88);
      .lh(88);
      .fs(28);
    }
  }

  .list-conent-wrap {
    left: 0;
    position: absolute;
    .w(750);
    .t(168);
    .b(100);
  }

  .contentWrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    opacity: 0;
    .content {
      background: #fff;
    }
  }

  /*.this {*/
  /*z-index: 100;*/
  /*}*/

  /*.next {*/
  /*z-index: 101;*/
  /*}*/
  .active {
    z-index: 102;
    opacity: 1;
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
