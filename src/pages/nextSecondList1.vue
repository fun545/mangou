<template>
  <div>
    <div class="next-second-list1">
      <div class="header">
        <!-- 搜索框 -->
        <div class="search-box">
          <next-search></next-search>
          <instruction></instruction>
        </div>
        <span class="back iconfont" @click="$router.back(-1)">&#xe600;</span>
        <span class="change iconfont" @click="change()">&#xe633;</span>
      </div>
      <div class="content" :class="{'listChange':!listFlag}" v-if="isActive">
        <div class="goods-sort" :class="{'listChange':!listFlag}">
          <div class="sort-item" :class="{'active':1===sortSelectIndex}" @click="mix()">综合排序</div>
          <div class="sort-item" :class="{'active':2===sortSelectIndex}" @click="priceSort()">
            按价格
            <div class="sort-icon d-ib">
              <span class="iconfont up"
                    :class="{'sort-icon-selected':!priceSortFlag,'sort-icon-clear-selected':2!==sortSelectIndex}">&#xe617;</span>
              <span class="iconfont down"
                    :class="{'sort-icon-selected':priceSortFlag,'sort-icon-clear-selected':2!==sortSelectIndex}">&#xe632;</span>
            </div>
          </div>
          <div class="sort-item" :class="{'active':3===sortSelectIndex}" @click="saleSort()">
            按销量
            <div class="sort-icon d-ib">
              <span class="iconfont up"
                    :class="{'sort-icon-selected':!saleSortFlag,'sort-icon-clear-selected':3!==sortSelectIndex}">&#xe617;</span>
              <span class="iconfont down"
                    :class="{'sort-icon-selected':saleSortFlag,'sort-icon-clear-selected':3!==sortSelectIndex}">&#xe632;</span>
            </div>
          </div>
        </div>
        <div class="list-wrap" ref="listWrap">
          <one-column v-if="listFlag" :goodsList="list" @updateGoodsListCount="updateGoodsListCount"></one-column>
          <two-column :goodsList="list" class="two-cl clearfix" v-if="!listFlag"
                      @updateGoodsListCount="updateGoodsListCount"></two-column>
        </div>
        <load-more
          :tip="loadText"
          :show-loading="moreIconFlag"
          background-color="#f7f7f7"
          class="load-more" v-if="loadMoreFlag"></load-more>
        <loading :loadingFlag="loadingFlag"></loading>
      </div>
      <ball :type="3" v-if="list.length>0"></ball>
      <no-page :isActive="isActive"></no-page>
      <to-top :scrollObj="listScroll" v-if="scrollTop>=800"></to-top>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import instruction from '../components/instruction.vue'
  import nextSearch from '../components/nextSearch.vue'
  import oneColumn from '../components/oneColumn.vue'
  import twoColumn from '../components/twocolumn.vue'
  import noPage from '../components/noPage'
  import loading from '../components/loading'
  import ball from '../components/ball'
  import toTop from '../components/toTop'
  import { loadMoreMehod } from '../util/util'
  import { LoadMore } from 'vux'

  export default {
    name: 'nextList1',
    components: {instruction, nextSearch, BScroll, twoColumn, noPage, ball, oneColumn, loading, LoadMore},
    data () {
      return {
        list: [],
        sortSelectIndex: 1,
        softType: 3,
        priceSortFlag: false,
        saleSortFlag: false,
        secondId: '',
        listFlag: false,
        isActive: true,
        listScroll: {},
        ball,
        toTop,
        scrollTop: '',
        scrollDisable: false,
        loadText: '正在加载',
        moreIconFlag: true,
        pageIndex: 1,
        loadingFlag: false,
        storeId: localStorage.getItem('m-depotId'),
        LoadMore,
        loadMoreFlag: true,
        villageId: localStorage.getItem('m-villageId'),
        token: localStorage.getItem('m-token')
      }
    },
    created () {
      console.log(this.$store.state.totalBuyCount, 'test')
      this.secondId = this.$route.query.secondId
      this.getGoods(this.secondId)
    },
    methods: {
      updateGoodsListCount (list, index, count) {
        if (typeof list[index].buyCount === 'undefined') {
          this.$set(list[index], 'buyCount', count)
        } else {
          list[index].buyCount = count
        }
      },
      change () {
        if (this.listFlag) {
          this.listFlag = false
        } else {
          this.listFlag = true
        }
        this.$nextTick(() => {
          this.listScroll.refresh()
        })
      },
      _initScroll () {
        this.listScroll = new BScroll(this.$refs.listWrap, {
          click: true,
          disableMouse: true,
          disablePointer: false,
          probeType: 3
        })
        loadMoreMehod(this.listScroll, this.$refs.listWrap, this.loadMore)
      },
      getGoods (id) {
        let paramas = {}
        paramas.secondClassifyId = id
        paramas.storeId = this.storeId
        paramas.softType = this.softType
        paramas.villageId = this.villageId
        if (this.token) {
          paramas.token = this.token
        }
        this.post('/goods/goodsList', paramas).then((res) => {
          console.log(this.$store.state.totalBuyCount)
          if (res.data.code === 100) {
            if (res.data.goodsList.length === 0) {
              this.isActive = false
            }
            this.list = res.data.goodsList
            if (this.list.length !== 0) {
              this.$nextTick(() => {
                this._initScroll()
              })
            }
            this.loadingFlag = false
          }
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'middle')
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'middle')
            localStorage.removeItem('m-token')
          }
        })
      },
      priceSort () {
        this.sortSelectIndex = 2
        if (!this.priceSortFlag) {
          this.softType = 1
          this.getGoods(this.secondId)
          this.priceSortFlag = true
        } else {
          this.softType = 5
          this.getGoods(this.secondId)
          this.priceSortFlag = false
        }
      },
      saleSort () {
        this.sortSelectIndex = 3
        if (!this.saleSortFlag) {
          this.softType = 2
          this.getGoods(this.secondId)
          this.saleSortFlag = true
        } else {
          this.softType = 5
          this.getGoods(this.secondId)
          this.saleSortFlag = false
        }
      },
      mix () {
        this.softType = 5
        this.getGoods(this.secondId)
        this.sortSelectIndex = 1
      },
      loadMore () {
        this.loadMoreFlag = true
        if (!this.scrollDisable) {
          this.scrollDisable = true
          this.pageIndex += 1
          let paramas = {}
          paramas.secondClassifyId = this.secondId
          paramas.storeId = this.storeId
          paramas.softType = this.softType
          paramas.pageIndex = this.pageIndex
          paramas.pageSize = 10
          if (this.token) {
            paramas.token = this.token
          }
          this.post('/goods/goodsList', paramas).then((res) => {
            if (res.data.code === 100) {
              let newList = res.data.goodsList
              for (let i = 0; i < newList.length; i++) {
                this.list.push(newList[i])
              }
              if (newList.length > 0) {
                setTimeout(() => {
                  this.listScroll.refresh()
                }, 50)
              } else {
//                this.loadText = '到底啦~'
                this.moreIconFlag = false
                this.$vux.toast.text('没有更多商品了', 'middle')
                this.loadMoreFlag = false
              }
              this.scrollDisable = false
            }
            if (res.data.code === 101) {
              this.$vux.toast.text(res.data.msg, 'middle')
            }
            if (res.data.code === 102) {
              this.$vux.toast.text(res.data.msg, 'middle')
              localStorage.removeItem('m-token')
            }
          })
        }
      }
    },
    computed: {
      totalPrice: {
        set () {
          return this.$store.state.totalBuyCount
        },
        get () {
          return this.$store.state.totalBuyCount
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .next-second-list1 {
    height: 100%;
    .sort-icon-selected {
      color: @theme-color-blue !important;
    }
    .sort-icon-clear-selected {
      color: #666 !important;
    }
    .header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      box-sizing: border-box;
      .h(100);
      background: @theme-color;
      .pl(22);
      .pt(10);
      .search-box {
        display: flex;
        position: relative;
        .pl(10);
        .pr(10);
        .pt(10);
        .pb(10);
        .ml(73);
        .search {
          .w(500);
          .input {
            input {
            }
          }
        }
        .instruction {
          position: absolute;
          .h(60);
          box-sizing: border-box;
          .instr-icon {
            padding: 0 !important;
          }
        }
      }
      .back {
        position: absolute;
        top: 0;
        left: 0;
        .fs(35);
        color: #fff;
        .h(100);
        .lh(100);
        .w(100);
        text-align: center;
      }
      .change {
        position: absolute;
        .t(50%);
        .r(90);
        .mt(-20);
        .fs(40);
        color: #fff;
      }
    }
    .listChange {
      background: #f6f6f6 !important;
    }
    .content {
      position: absolute;
      .t(100);
      left: 0;
      right: 0;
      bottom: 0;
      background: #fff;
      .listChange {
        border-bottom: none !important;
        background: #f6f6f6 !important;
      }
      .goods-sort {
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        z-index: 10;
        .h(81);
        .lh(81);
        .fs(30);
        .pl(85);
        background: #fff;
        color: #666;
        border-bottom: 1px solid @input-border;
        .active {
          color: #089cf6;
        }
        .sort-item {
          display: inline-block;
          position: relative;
          .ml(60);
          .fs(31);
          .sort-icon {
            .w(12);
            .h(20);
            position: relative;
            right: 0;
            .iconfont {
              position: absolute;
              .fs(15);
              .l(6);
              color: #666;
              &.up {
                .t(-5);
              }
              &.down {
                .t(7)
              }
            }
          }
        }
      }
      .list-wrap {
        position: absolute;
        .t(82);
        left: 0;
        right: 0;
        bottom: 0;
        .item {
          .h(253);
          box-sizing: border-box;
          .pt(16);
          .pl(33);
          position: relative;
          border-bottom: 1px solid @input-border;
          .pic {
            .w(226);
            .h(210);
            img {
              display: block;
              border: none;
              width: 100%;
              height: 100%;
            }
          }
          .col {
            /*flex-grow: 1;*/
            /*margin: auto 10px;*/
            .w(461);
            .ml(30);
            align-self: flex-start;
            .title {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              color: #443d39;
              .fs(27);
              .lh(44);
              .mt(12);
            }
            .des {
              color: #888;
              .lh(36);
              .fs(23);
              .mb(46);
            }
            .this-price {
              color: #888;
              .fs(22);
              .lh(29);
              .s1 {
                .fs(20);
              }
              .number {
                .fs(28);
              }
            }

            .next-price {
              color: @theme-color;
              .fs(25);
              .lh(33);
              font-weight: bold;
              .s1 {
                .fs(26);
              }
              .number {
                .fs(32);
              }
            }
          }
          .iconfont.shop-car {
            .w(60);
            .h(60);
            .lh(60);
            box-sizing: border-box;
            /*background: red;*/
            .fs(36);
            color: #089cf6;
            border: 1px solid #089cf6;
            border-radius: 50%;
            position: absolute;
            .r(30);
            .b(40);
          }
        }
        .two-cl {
          background: #f6f6f6;
        }
      }
    }
  }
</style>
