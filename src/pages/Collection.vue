<template>
  <div class="search-view">
    <m-header title="我的收藏">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
      <!--<span class="edit" slot="right">-->
      <!--编辑-->
      <!--</span>-->
    </m-header>
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
            <one-column :goodsList="NextGoodsList" :shopType="shopType" class="content" :isCollect="isCollect"></one-column>
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
            <one-column :goodsList="ThisGoodsList" :shopType="shopType" class="content" :isCollect="isCollect"></one-column>
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
  </div>
</template>

<script>
  import { Tab, TabItem, LoadMore } from 'vux'
  import oneColumn from '../components/oneColumn'
  import BScroll from 'better-scroll'
  import { loadMoreMehod } from '../util/util'
  import mHeader from '../components/header'
  export default{
    name: 'collect',
    components: {
      Tab,
      TabItem,
      oneColumn,
      BScroll,
      LoadMore,
      mHeader
    },
    data () {
      return {
        index: 1,
        selected: '',
        ThisGoodsList: [],
        NextGoodsList: [],
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
        noGoodsFlagNext: false,
        isCollect: true
      }
    },
    created () {
      this.goSearch()
    },
    methods: {
      // tab切换
      tabClick (index) {
        if (index === 0) {
          this.shopType = 1
          this.thisTabFlag = true
          this.storeId = localStorage.getItem('m-depotId')
          if (this.NextGoodsList.length === 0) {
            this.goSearch()
          }
          if (typeof this.nextScroll.refresh === 'function') {
            this.nextScroll.refresh()
          }
        } else {
          this.storeId = localStorage.getItem('m-shopId')
          this.nextTabFlag = true
          this.shopType = 2
          if (this.ThisGoodsList.length === 0) {
            this.goSearch()
          }
          if (typeof this.thisScroll.refresh === 'function') {
            this.thisScroll.refresh()
          }
        }
      },
      // 去搜索
      async goSearch () {
        await this.post('/collect/getCollectList', {
          token: this.token,
          villageId: localStorage.getItem('m-villageId'),
          storeId: this.storeId,
          shopType: this.shopType
        }).then((res) => {
          if (res.data.code === 100) {
//            if (res.data.collectList.length === 0) {
//              return
//            }
            // 如果是及时送
            if (this.shopType === 2) {
              this.ThisGoodsList = res.data.collectList
              if (this.ThisGoodsList.length === 0) {
                this.noGoodsFlagThis = true
              }
              // 如果是次日达
            } else {
              this.NextGoodsList = res.data.collectList
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
        loadMoreMehod(this.nextScroll, this.$refs.contentNext, this.loadMoreCallBackNext)
      },
      _initScrollThis () {
        this.thisScroll = new BScroll(this.$refs.contentThis, {
          click: true,
          disableMouse: true,
          disablePointer: false,
          probeType: 3
        })
        loadMoreMehod(this.thisScroll, this.$refs.contentThis, this.loadMoreCallBackThis)
      },
      async loadMoreCallBackNext () {
        this.loadMoreFlagNext = true
        if (!this.scrollDisableNext) {
          this.scrollDisableNext = true
          this.NextPageIndex += 1
          await this.post('/collect/getCollectList', {
            token: this.token,
            villageId: localStorage.getItem('m-villageId'),
            storeId: localStorage.getItem('m-depotId'),
            pageSize: 10,
            pageIndex: this.NextPageIndex
          }).then((res) => {
            if (res.data.code === 100) {
              let newList = res.data.collectList
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
          await this.post('/collect/getCollectList', {
            storeId: localStorage.getItem('m-shopId'),
            token: this.token,
            villageId: localStorage.getItem('m-villageId'),
            pageSize: 10,
            pageIndex: this.ThisPageIndex
          }).then((res) => {
            if (res.data.code === 100) {
              let newList = res.data.collectList
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
        return this.index ? '#2697d9' : '#01a662'
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

  .cp-header {
    position: inherit;
    .edit {
      position: absolute;
      .r(40);
      .fs(30);
      color: @theme-color;
    }
  }

  .no-goods {
    background: url("../assets/noCollect@2x.png") no-repeat center center;
    background-size:  4.773rem 5.46667rem;
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

  .search-bottom-wrap {
    border-top: 1px solid #eee;
    box-sizing: border-box;
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
    .t(183);
    bottom: 0;
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
