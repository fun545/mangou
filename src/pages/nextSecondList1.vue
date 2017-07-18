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
              <span class="iconfont up" :class="{'sort-icon-selected':!priceSortFlag}">&#xe617;</span>
              <span class="iconfont down" :class="{'sort-icon-selected':priceSortFlag}">&#xe632;</span>
            </div>
          </div>
          <div class="sort-item" :class="{'active':3===sortSelectIndex}" @click="saleSort()">
            按销量
            <div class="sort-icon d-ib">
              <span class="iconfont up" :class="{'sort-icon-selected':saleSortFlag}">&#xe617;</span>
              <span class="iconfont down" :class="{'sort-icon-selected':!saleSortFlag}">&#xe632;</span>
            </div>
          </div>
        </div>
        <div class="list-wrap" ref="listWrap">
          <ul v-if="listFlag">
            <li class="item" v-for="(item,index) in list" :key="index">
              <div class="pic f-l">
                <img v-lazy="item.goodsImgUrl" alt="">
              </div>
              <div class="col f-l">
                <h3 class="title">{{item.goodsName}}</h3>
                <p class="des">{{item.guige}}</p>
                <p class="next-price">次日价：<span class="s1">¥</span><span class="number">{{item.price}}</span></p>
                <p class="this-price">即时价：<span class="s1">¥</span><span class="number">{{item.canKaoPrice}}</span></p>
              </div>
              <div class="iconfont shop-car t-c">&#xe613;</div>
            </li>
          </ul>
          <two-column :goodsList="list" class="two-cl clearfix" v-if="!listFlag"></two-column>
        </div>
      </div>
      <no-page :isActive="isActive"></no-page>
    </div>
    <loading :loadingFlag="loadingFlag"></loading>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import instruction from '../components/instruction.vue'
  import nextSearch from '../components/nextSearch.vue'
  import twoColumn from '../components/twocolumn.vue'
  import noPage from '../components/noPage'
  import loading from '../components/loading'
  export default {
    components: {instruction, nextSearch, BScroll, twoColumn, noPage, loading},
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
        loadingFlag: true
      }
    },
    created () {
      this.secondId = this.$route.query.secondId
      this.getGoods(this.secondId)
    },
    methods: {
      change () {
        if (this.listFlag) {
          this.listFlag = false
        } else {
          this.listFlag = true
        }
//        this.$nextTick(() => {
//          this._initScroll()
//        })
      },
      _initScroll () {
        this.listScroll = new BScroll(this.$refs.listWrap, {click: true})
      },
      getGoods (id) {
        this.post('/goods/goodsList', {
          secondClassifyId: id,
          storeId: 1,
          softType: this.softType
        }).then((res) => {
          console.log(res.data)
          if (res.data.code === 100) {
            if (res.data.goodsList.length === 0) {
              this.isActive = false
            }
            this.list = res.data.goodsList
            console.log(this.list)
            if (this.list.length !== 0) {
              this.$nextTick(() => {
                this._initScroll()
              })
            }
            this.loadingFlag = false
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
        padding: 5px;
        .ml(73);
        .search {
          .input {
            input {
              .w(498);
            }
          }
        }
        .instruction {
          position: absolute;

        }
      }
      .back {
        position: absolute;
        .t(50%);
        .mt(-17.5);
        .l(30);
        .fs(35);
        color: #fff;
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
        .fs(28);
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
