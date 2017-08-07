<template>
  <div class="this" @touchmove.prevent>
    <!-- 页面头部 -->
    <div class="head-box">
      <!-- 显示页面主题 -->
      <div class="is-cont">
        <div class="flex-box" v-if="storeMsg">
          <div class="pic">
            <img v-lazy="storeMsg.storeImgurl" alt="" width="100%" height="100%">
          </div>
          <div class="col">
            <div class="title"><b>即时送</b><span v-html="storeMsg.storeName"></span></div>
            <p>{{storeMsg.shopHours}} | {{storeMsg.startPrice}}元起送</p>
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
                     @click.native="memuChange(item.classifyId,index,1)"
                     :class="{'active':index===ind}">
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
            <div class="second-menu clearfix">
              <div class="item" @click="getGoods(firstId,1)" :class="{'active':secondIndex===-1}">全部分类</div>
              <div class="item" v-for="(item,index) in secondMenuList" :key="index"
                   @click="getSecondGoods(item.classifyId,2,index)"
                   :class="{'active':secondIndex===index}"
              >
                {{item.classifyName}}
              </div>
            </div>
            <div class="goods-item clearfix" v-for="(item,index) in goodsList" :key="index"
                 @click="goDetail(item.goodsId,$event)">
              <div class="pic">
                <!--<lazy-image-->
                <!--:src='item.goodsImgUrl'-->
                <!--:placeholder='$store.state.defaultImg'-->
                <!--:events="['touchmove']"-->
                <!--width="100%"-->
                <!--height="100%"-->
                <!--&gt;</lazy-image>-->
                <!--<img :src="item.goodsImgUrl" width="100%" height="100%">-->
                <img width="100%" height="100%" v-lazy="item.goodsImgUrl">
              </div>
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
    name: 'this',
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
        ind: 0, // 当前一级菜单索引
        secondIndex: -1, // 当前二级菜单索引
        firstId: '', // 一级菜单对应的classifyId
        secondId: '', // 二级菜单对应的classifyId
        secondMenuList: '', // 二级菜单列表
        sortSelectIndex: 1,
        softType: 3,
        priceSortFlag: false,
        saleSortFlag: false,
        listSroll: {},
        pageIndex: 1,
        pageSize: 10,
        sortId: '', // 当前排序Id
        sortType: '' // 当前排序是通过哪个参数获取的 1:firstClassifyId 2：secondClassifyId
      }
    },
    async created () {
      // 店铺信息
      await this.post('/basic/getStoreMsg', {
        storeId: localStorage.getItem('m-shopId')
      }).then((res) => {
        if (res.data.code === 100) {
          this.storeMsg = res.data.storeInfo
          console.log(this.storeMsg)
        }
      })
      // 一级菜单
      await this.post('/classify/firstClassifyList_new_js', {
        storeId: localStorage.getItem('m-shopId'),
        villageId: localStorage.getItem('m-villageId'),
        shopType: 2
      }).then((res) => {
        if (res.data.code === 100) {
          this.sideList = res.data.firstClassifyList
          // 默认对应数组第一项为classifyId
          this.firstId = this.sideList[0].classifyId
          this.sortId = this.sideList[0].classifyId
          this.sortType = 1
          console.log(this.sideList)
        }
      })
      // 二级菜单
      await this.post('/classify/secondClassifyList', {
        classifyId: this.firstId,
        storeId: localStorage.getItem('m-shopId'),
        villageId: localStorage.getItem('m-villageId')
      }).then((res) => {
        console.log(res.data)
        this.secondMenuList = res.data.secondClassifyList
        console.log(this.secondMenuList)
      })
      // 商品列表
      await this.post('/goods/goodsList', {
        firstClassifyId: this.firstId,
        storeId: localStorage.getItem('m-shopId'),
        softType: this.softType,
        villageId: localStorage.getItem('m-villageId'),
        pageIndex: 1,
        pageSize: 10
      }).then((res) => {
        if (res.data.code === 100) {
          this.goodsList = res.data.goodsList
        }
      })
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    activated () {
      this.$nextTick(() => {
        console.log(this.listSroll)
        this.listSroll.refresh()
      })
    },
    methods: {
      goSearch () {
        this.$router.push({path: '/search', query: {shopType: 2, storeId: localStorage.getItem('m-shopId')}})
      },
//      getSecondMenu (id) {
//        this.post('/classify/secondClassifyList', {
//          classifyId: this.firstId,
//          storeId: localStorage.getItem('m-shopId'),
//          villageId: localStorage.getItem('m-villageId')
//        }).then((res) => {
//          console.log(res.data)
//          this.secondMenuList = res.data.secondClassifyList
//          console.log(this.secondMenuList)
//        })
//      },
      async getGoods (id, type) {
        var params = {}
        if (type === 1) {
          params.firstClassifyId = id
          this.secondIndex = -1
        } else {
          params.secondClassifyId = id
        }
        params.storeId = localStorage.getItem('m-shopId')
        params.softType = this.softType
        params.villageId = localStorage.getItem('m-villageId')
        params.villageId = localStorage.getItem('m-villageId')
        params.pageSize = this.pageSize
        params.pageIndex = this.pageIndex
        await this.post('/goods/goodsList', params).then((res) => {
          console.log(res.data)
          if (res.data.code === 100) {
            this.goodsList = res.data.goodsList
          }
        })
        this.$nextTick(() => {
          this.listSroll.refresh()
        })
      },
      // 点击二级分类获取商品
      getSecondGoods (id, type, index) {
        this.secondIndex = index
        this.sortType = type
        this.sortId = id
        this.getGoods(id, this.sortType)
      },
      memuChange (id, index, type) {
        this.sortId = id
        this.sortType = 1
        this.getGoods(id, 1)
        this._initListScroll()
        this.ind = index
        this.post('/classify/secondClassifyList', {
          classifyId: id,
          storeId: localStorage.getItem('m-shopId'),
          villageId: localStorage.getItem('m-villageId')
        }).then((res) => {
          this.secondMenuList = res.data.secondClassifyList
        })
      },
      priceSort () {
        this.sortSelectIndex = 2
        if (!this.priceSortFlag) {
          this.softType = 1
          this.getGoods(this.sortId, this.sortType)
          this.priceSortFlag = true
        } else {
          this.softType = 5
          this.getGoods(this.sortId, this.sortType)
          this.priceSortFlag = false
        }
      },
      saleSort () {
        this.sortSelectIndex = 3
        if (!this.saleSortFlag) {
          this.softType = 2
          this.getGoods(this.sortId, this.sortType)
          this.saleSortFlag = true
        } else {
          this.softType = 5
          this.getGoods(this.sortId, this.sortType)
          this.saleSortFlag = false
        }
      },
      _initScroll () {
        this.menuSroll = new BScroll(this.$refs.menuWrap, {
          click: true,
          disableMouse: true,
          disablePointer: false,
          probeType: 3
        })
        this.listSroll = new BScroll(this.$refs.goodsListWrap, {
          click: true,
          disableMouse: true,
          disablePointer: false,
          probeType: 3
        })
        this.listSroll.on('scroll', (pos) => {
          console.log(pos)
        })
      },
      _initListScroll () {
        this.listSroll = new BScroll(this.$refs.goodsListWrap, {click: true, disableMouse: true})
        this.listSroll.on('scroll', (pos) => {
          console.log(pos.y)
//          var y = Math.abs(pos.y)
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
    /*.strong {
      span {
        .pt(10);
        .pb(10);
        .pl(10);
        .pr(10);
        background: #5abbf6;
        border-radius: 5px;
        color: #fff;
      }
    }*/
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
        .pic {
          .w(160);
          .h(160);
        }
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
          .fs(25);
          .title {
            b {
              .fs(28);
              font-style: italic;
              .mr(20);
            }

            span {
              .pt(4);
              .pb(4);
              .pl(24);
              .pr(24);
              background: #089df6;
              .fs(25);
              .lh(32);
              border-radius: 10px;
              display: inline-block;
            }
          }

          p:nth-child(2) {
            opacity: .8;
            .lh(40);
          }
        }

        .iconfont {
          .mr(10);
          font-size: inherit;
        }
      }

      .search-box {
        .mt(10);
        position: relative;

        &:before {
          content: '\e639';
          font-family: 'iconfont';
          color: #666666;
          .fs(25);
          position: absolute;
          .t(12);
          .l(30);
        }

        input {
          .pt(10);
          .pb(10);
          .pl(10);
          .pr(64);
          width: 100%;
          box-sizing: border-box;
          .lh(40);
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
        .lh(40);
        .mt(10);
        a {
          color: #ffffff;
          .ml(10);
          .mr(10);
          display: inline-block;
          .fs(25);
        }
      }
    }
    .is-search {
      .pt(20);
      .pb(20);
      .pl(20);
      .pr(20);
      background-color: #089cf6;
      position: relative;

      &:before {
        content: '\e639';
        font-family: 'iconfont';
        color: #ffffff;
        .fs(25);
        vertical-align: middle;
        position: absolute;
        .t(32);
        .l(50);
      }

      input {
        width: 100%;
        box-sizing: border-box;
        .lh(40);
        .pt(10);
        .pb(10);
        .pr(10);
        .pl(60);
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
        .w(578);
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
      .pt(12);
      .second-menu {
        width: 100%;
        .pl(40);
        .pr(56);
        border-bottom: 1px solid #eee;
        .item {
          .w(146);
          .h(45);
          .lh(45);
          background: #f7f7f7;
          border-radius: 3px;
          .fs(26);
          color: #666;
          float: left;
          .mr(22);
          .mb(16);
          text-align: center;
          &.active {
            color: #089cf6;
            background-color: rgba(8, 156, 246, .12);
          }
          &:nth-child(3n) {
            .mr(0);
          }
        }
      }
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
