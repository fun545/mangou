<template>
  <div class="this-view">
    <!-- 页面头部 -->
    <div class="head-box">
      <!-- 显示页面主题 -->
      <div class="is-cont">
        <div class="flex-box">
          <img :src="storeMsg.storeImgurl" width="80" alt="">
          <div class="col">
            <div class="title"><b>即时送</b><span v-html="storeMsg.storeName"></span></div>
            <p>{{storeMsg.shopHours}} | 满29元免配送费用</p>
            <p><i class="iconfont">&#xe62a;</i>{{storeMsg.address}}</p>
            <p><i class="iconfont">&#xe624;</i>{{storeMsg.tel}}</p>
          </div>
          <div class="search-icon t-c">
            <i class="iconfont">&#xe639;</i>
          </div>
        </div>
        <!--<div class="search-box"><input type="text" placeholder="搜索内容"></div>-->
      </div>
      <!-- 只显示搜索框 -->
      <!--<div class="is-search" v-show="!showCont"><input type="text" placeholder="搜索商品"></div>-->
    </div>
    <!-- 商品列表 -->
    <flexbox class="flex-box scroller" :gutter="0" :style="{height:flexboxHeight}">
      <flexbox-item :span="2.8" class="flex-left">
        <side-bar>
          <side-item ref="sideItem" v-for="(item,index) in sideList" :key="index" :classifyId="item.classifyId"
                     @click.native="memuChange(item.classifyId,index)" :class="{'active':index===ind}">
            <span v-html="item.classifyName"></span>
          </side-item>
        </side-bar>
      </flexbox-item>
      <flexbox-item :span="9.2" class="flex-right">
        <div class="goods-sort">
          <div class="sort-item" :class="{'active':1===sortSelectIndex}" @click="sortSelectIndex=1">综合排序</div>
          <div class="sort-item" :class="{'active':2===sortSelectIndex}" @click="priceSort()">
            按价格
            <div class="sort-icon d-ib">
              <span class="iconfont up">&#xe617;</span>
              <span class="iconfont down">&#xe632;</span>
            </div>
          </div>
          <div class="sort-item" :class="{'active':3===sortSelectIndex}" @click="saleSort()">
            按销量
            <div class="sort-icon d-ib">
              <span class="iconfont up">&#xe617;</span>
              <span class="iconfont down">&#xe632;</span>
            </div>
          </div>
        </div>
        <div class="googs-list" v-scroll="onScroll">
          <router-link to="/goods_detail" class="goods-item" v-for="(item,index) in goodsList" :key="index">
            <img :src="item.goodsImgUrl" alt="" class="pic">
            <div class="col">
              <p class="title">{{item.goodsName}}</p>
              <p class="this-price">即时价：<span class="s1">¥</span><span class="number">{{item.canKaoPrice}}</span></p>
              <p class="next-price">次日价：<span class="s1">¥</span><span class="number">{{item.price}}</span></p>
            </div>
            <div class="iconfont shop-car">&#xe613;</div>
          </router-link>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem } from 'vux'
  import SideBar from '../components/SideBar'
  import SideItem from '../components/SideItem'
  import Tabs from '../components/Tabs'
  import TabsItem from '../components/TabsItem'

  export default {
    components: {
      Flexbox,
      FlexboxItem,
      SideBar,
      SideItem,
      Tabs,
      TabsItem
    },
    data () {
      return {
        scrollTop: '',
        flexboxHeight: '',
        sideList: '',
        storeMsg: '',
        goodsList: '',
        firstClassifyId: 1,
        ind: '',
        sortSelectIndex: 1,
        softType: 3,
        priceSortFlag: false,
        saleSortFlag: false
      }
    },
    created () {
      this.post('/classify/firstClassifyList_new', {storeId: 2, villageId: 1, shopType: 2}).then((res) => {
        if (res.data.code === 100) {
//          console.log(res.data)
          this.sideList = res.data.firstClassifyList
        }
      })
      this.post('/basic/getStoreMsg', {storeId: 2}).then((res) => {
        if (res.data.code === 100) {
          this.storeMsg = res.data.storeInfo
        }
      })
      this.ind = 0
      this.getGoods(1)
    },
    methods: {
      onScroll (e, pos) {
        if (pos.scrollTop > this.scrollTop + 100 || pos.scrollTop < this.scrollTop - 100) {
          this.scrollTop = pos.scrollTop
        }

        let clientHeight = e.target.clientHeight
        let scrollHeight = e.target.scrollHeight
        let scrollTop = pos.scrollTop

        if (scrollTop + clientHeight >= scrollHeight) {
          console.log('滚动到底部')
        }
      },
      getGoods (id) {
        this.firstClassifyId = id
        this.post('/goods/goodsList', {
          firstClassifyId: id,
          storeId: 2,
          softType: this.softType,
          villageId: 1
        }).then((res) => {
          this.goodsList = res.data.goodsList
        })
      },
      memuChange (id, index) {
        this.getGoods(id)
        this.ind = index
        console.log(index)
      },
      priceSort () {
        this.sortSelectIndex = 2
        if (!this.priceSortFlag) {
          this.softType = 1
          this.getGoods(this.firstClassifyId)
          this.priceSortFlag = true
        } else {
          this.softType = 5
          this.getGoods(this.firstClassifyId)
          this.priceSortFlag = false
        }
      },
      saleSort () {
        this.sortSelectIndex = 3
        if (!this.saleSortFlag) {
          this.softType = 2
          this.getGoods(this.firstClassifyId)
          this.saleSortFlag = true
        } else {
          this.softType = 5
          this.getGoods(this.firstClassifyId)
          this.saleSortFlag = false
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .this-view {
    .is-cont {
      padding: 5px 10px;
      .pt(25);
      .pb(5);
      background: url("../assets/this_top_back.png") no-repeat center/cover;

      .flex-box {
        padding-left: 15px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        position: relative;
        .col {
          flex-grow: 1;
          margin-left: 10px;
        }
        .search-icon {
          position: absolute;
          .w(62);
          .h(62);
          .lh(62);
          .r(15);
          .t(0);
          background: #067ec5;
          border-radius: 50%;
          color: #fff;
          .fs(25);
        }
        :nth-child(2) {
          color: #ffffff;
          font-weight: normal;
          font-size: 12px;

          .title {
            b {
              font-size: 14px;
              font-style: italic;
              margin-right: 10px;
            }

            span {
              padding: 2px 12px;
              background: #089df6;
              font-size: 12px;
              line-height: 16px;
              border-radius: 10px;
              display: inline-block;
            }
          }

          p:nth-child(2) {
            opacity: .8;
            line-height: 20px;
          }
        }

        .iconfont {
          margin-right: 5px;
          font-size: inherit;
        }
      }

      .search-box {
        margin-top: 5px;
        position: relative;

        &:before {
          content: '\e639';
          font-family: 'iconfont';
          color: #666666;
          font-size: 12px;
          position: absolute;
          top: 6px;
          left: 15px;
        }

        input {
          padding: 5px 5px 5px 32px;
          width: 100%;
          box-sizing: border-box;
          line-height: 20px;
          outline: none;
          border-radius: 15px;
          background-color: #ffffff;
          border: none;
        }

        ::-webkit-input-placeholder {
          color: #666666;
        }
      }

      .link-box {
        line-height: 20px;
        margin-top: 5px;

        a {
          color: #ffffff;
          margin: 0 5px;
          display: inline-block;
          font-size: 12px;
        }
      }
    }

    .is-search {
      padding: 10px;
      background-color: #089cf6;
      position: relative;

      &:before {
        content: '\e639';
        font-family: 'iconfont';
        color: #ffffff;
        font-size: 12px;
        vertical-align: middle;
        position: absolute;
        top: 16px;
        left: 25px;
      }

      input {
        width: 100%;
        box-sizing: border-box;
        line-height: 20px;
        padding: 5px 5px 5px 30px;
        border-radius: 15px;
        border: none;
        outline: none;
        color: #ffffff;
        font-weight: normal;
        background-color: #53baf9;
      }

      ::-webkit-input-placeholder {
        color: #ffffff;
      }
    }

    .flex-box {
      font-size: 12px;
      display: flex;
      align-items: flex-start;
      height: calc(~'100% - 95px');
      overflow: hidden;

      .flex-left {
        height: 100%;
        width: calc(~"100vw/3");
      }

      .flex-right {
        box-sizing: border-box;
        height: 100%;
        width: calc(~"100vw - 100vw/3");
        padding-left: 10px;
        background-color: #ffffff;
        .goods-sort {
          box-sizing: border-box;
          display: flex;
          justify-content: space-around;
          color: #666;
          .h(91);
          .lh(91);
          .fs(24);
          border-bottom: 1px solid #eee;
          .active {
            color: #089cf6;
          }
          .sort-item {
            position: relative;
            display: flex;
            align-items: center;
            .sort-icon {
              .w(12);
              .h(20);
              position: relative;
              right: 0;
              .iconfont {
                position: absolute;
                .fs(15);
                .l(6);
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
      }
    }

    .googs-list {
      height: 100%;
      overflow-y: scroll;
      .goods-item {
        position: relative;
        display: flex;
        /*padding: 10px 10px 10px 0;*/
        box-sizing: border-box;
        .h(227);
        color: #444;
        border-bottom: 1px solid #eee;
        align-items: center;
        .pic {
          .w(220);
          .h(220);
          .mr(18);
        }
        .col {
          /*flex-grow: 1;*/
          /*margin: auto 10px;*/
          .ml(9);
          align-self: flex-start;
          .title {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            color: #443d39;
            .fs(26);
            .lh(72);
            .mb(40);
          }
          .this-price {
            color: @theme-color;
            .fs(22);
            .lh(29);
            .s1 {
              .fs(20);
            }
            .number {
              .fs(26);
            }
          }

          .next-price {
            color: #888;
            .fs(26);
            .s1 {
              .fs(26);
            }
            .number {
              .fs(30);
            }
          }
        }

        .iconfont.shop-car {
          .fs(26);
          color: #089cf6;
          border: 1px solid #089cf6;
          border-radius: 50%;
          .pl(4);
          .pr(4);
          .pt(4);
          .pb(4);
          position: absolute;
          .r(32);
          .b(46);
        }
      }
    }
  }

</style>
