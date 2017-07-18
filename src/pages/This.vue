<template>
  <div class="this" @touchmove.prevent>
    <!-- 页面头部 -->
    <div class="head-box">
      <!-- 显示页面主题 -->
      <div class="is-cont">
        <div class="flex-box" v-if="storeMsg">
          <img v-lazy="storeMsg.storeImgurl" width="80" alt="">
          <div class="col">
            <div class="title"><b>即时送</b><span v-html="storeMsg.storeName"></span></div>
            <p>{{storeMsg.shopHours}} | 满29元免配送费用</p>
            <p><i class="iconfont">&#xe62a;</i>{{storeMsg.address}}</p>
            <p><i class="iconfont">&#xe624;</i>{{storeMsg.tel}}</p>
          </div>
          <div class="search-icon t-c" @click="goSearch">
            <i class="iconfont">&#xe639;</i>
          </div>
        </div>
        <!--<div class="search-box"><input type="text" placeholder="搜索内容"></div>-->
      </div>
      <!-- 只显示搜索框 -->
      <!--<div class="is-search" v-show="!showCont"><input type="text" placeholder="搜索商品"></div>-->
    </div>
    <!-- 商品列表 -->
    <div class="content">
      <div class="menu-wrap f-l" ref="menuWrap">
        <side-bar>
          <side-item ref="sideItem" v-for="(item,index) in sideList" :key="index" :classifyId="item.classifyId"
                     @click.native="memuChange(item.classifyId,index)"
                     :class="{'active':index===ind,'strong':index>=0&&index<3}">
            <span v-html="item.classifyName"></span>
          </side-item>
        </side-bar>
      </div>
      <div class="right f-l">
        <div class="goods-sort">
          <div class="sort-item" :class="{'active':1===sortSelectIndex}" @click="sortSelectIndex=1">综合排序</div>
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
        <div class="googs-list" ref="goodsListWrap">
          <div>
            <div class="goods-item clearfix" v-for="(item,index) in goodsList" :key="index"
                 @click="goDetail(item.goodsId,$event)">
              <img v-lazy="item.goodsImgUrl" alt="" class="pic">
              <div class="col">
                <p class="title">{{item.goodsName}}</p>
                <p class="this-price">即时价：<span class="s1">¥</span><span class="number">{{item.canKaoPrice}}</span></p>
                <p class="next-price">次日价：<span class="s1">¥</span><span class="number">{{item.price}}</span></p>
                <shop-car-button :goods="item"></shop-car-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <m-footer></m-footer>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import mFooter from '../components/footer'
  import { Flexbox, FlexboxItem } from 'vux'
  import SideBar from '../components/SideBar'
  import SideItem from '../components/SideItem'
  import Tabs from '../components/Tabs'
  import TabsItem from '../components/TabsItem'
  import shopCarButton from '../components/buyCarButton'

  export default {
    components: {
      mFooter,
      BScroll,
      Flexbox,
      FlexboxItem,
      SideBar,
      SideItem,
      Tabs,
      TabsItem,
      shopCarButton
    },
    data () {
      return {
        scrollTop: '',
        sideList: [],
        storeMsg: [],
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
          this.sideList = res.data.firstClassifyList
          this.$nextTick(() => {
            this._initScroll()
          })
        }
      })
      this.post('/village/cityList', {}).then((res) => {
        console.log(res.data)
      })
      this.post('/basic/getStoreMsg', {
        cityId: localStorage.getItem('m-cityId'),
        areaId: localStorage.getItem('m-areaId'),
        storeId: localStorage.getItem('m-shopId')
      }).then((res) => {
        console.log(res.data)
        if (res.data.code === 100) {
          this.storeMsg = res.data.storeInfo
        }
      })
      this.ind = 0
      this.getGoods(1)
    },
    methods: {
      goSearch () {
        this.$router.push({path: '/search', query: {shopType: 2, storeId: localStorage.getItem('m-shopId')}})
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
      },
      _initScroll () {
        this.menuSroll = new BScroll(this.$refs.menuWrap, {
          click: true
        })
        this.listSroll = new BScroll(this.$refs.goodsListWrap, {
          click: true
        })
      },
      goDetail (id, e) {
        console.log(e.target.tagName.toLowerCase() !== 'i')
        if (e.target.tagName.toLowerCase() !== 'i') {
          this.$router.push({
            path: '/goods_detail',
            query: {goodsId: id}
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .this {
    /*height: 300%;*/
    .strong {
      span {
        padding: 5px;
        background: #5abbf6;
        border-radius: 5px;
        color: #fff;
      }
    }
    .sort-icon-selected {
      color: @theme-color-blue !important;
    }
    .head-box {
      .h(190);
    }
    .is-cont {
      box-sizing: border-box;
      .pl(15);
      .pr(5);
      .pt(25);
      .pb(5);
      background: url("../assets/this_top_back.png") no-repeat center/cover;
      .flex-box {
        .pl(15);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        position: relative;
        .col {
          flex-grow: 1;
          .ml(20);
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

    .content {
      position: absolute;
      .t(190);
      left: 0;
      right: 0;
      .b(100);
      overflow: hidden;
      .menu-wrap {
        .w(172);
        height: 100%;
        overflow: hidden;
      }
      .right {
        .w(578);
        height: 100%;
      }
      .goods-sort {
        background: #fff;
        box-sizing: border-box;
        color: #666;
        .w(568);
        .h(91);
        .lh(91);
        .fs(24);
        border-bottom: 1px solid #eee;
        .active {
          color: #089cf6;
        }
        .sort-item {
          display: inline-block;
          position: relative;
          .ml(70);
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
    }
    .googs-list {
      position: absolute;
      .t(91);
      bottom: 0;
      background: #fff;
      .w(578);
      overflow: hidden;
      .pl(10);
      .goods-item {
        position: relative;
        box-sizing: border-box;
        .h(227);
        color: #444;
        border-bottom: 1px solid #eee;
        .pic {
          .w(220);
          .h(220);
          float: left;
        }
        .col {
          p {
            text-indent: 0;
          }
          .ml(18);
          .w(330);
          .h(227);
          float: left;
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

  }

</style>
