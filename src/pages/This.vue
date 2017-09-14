<template>
  <div class="this" @touchmove.prevent>
    <!-- 页面头部 -->
    <div class="head-box" v-show="!scrollFlag">
      <!-- 显示页面主题 -->
      <div class="is-cont">
        <div class="flex-box" v-if="storeMsg">
          <div class="pic">
            <img v-lazy="imgObj" alt="" width="100%" height="100%">
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
    <div class="location-search-box" v-show="scrollFlag||!hasThisShop">
      <a class="location" @click="goLocation">{{villageName}}</a>
      <a class="search iconfont" @click="goSearch" v-if="hasThisShop">&#xe639;</a>
    </div>
    <!-- 商品列表 -->
    <div class="content" :class="{'scroll-active':scrollFlag}">
      <div class="menu-wrap f-l" ref="menuWrap">
        <side-bar>
          <side-item ref="sideItem" v-for="(item,index) in sideList" :key="index" :classifyId="item.classifyId"
                     @click.native="memuChange(item.classifyId,index)"
                     :class="{'active':index===ind}">
            <span v-html="item.classifyName"></span>
          </side-item>
        </side-bar>
      </div>
      <div class="right f-l">
        <div class="goods-sort">
          <div class="sort-item" :class="{'active':1===sortSelectIndex}" @click="mixSort">综合排序</div>
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
                    :class="{'sort-icon-selected':saleSortFlag,'sort-icon-clear-selected':3!==sortSelectIndex}">&#xe617;</span>
              <span class="iconfont down"
                    :class="{'sort-icon-selected':!saleSortFlag,'sort-icon-clear-selected':3!==sortSelectIndex}">&#xe632;</span>
            </div>
          </div>
        </div>
        <div class="googs-list" ref="goodsListWrap">
          <div>
            <div class="second-menu clearfix" v-if="!noDataFlag">
              <div class="item" @click="getAll(firstId,1)" :class="{'active':secondIndex===-1}">全部分类</div>
              <div class="item" v-for="(item,index) in secondMenuList" :key="index"
                   @click="getSecondGoods(item.classifyId,2,index)"
                   :class="{'active':secondIndex===index}"
              >
                {{item.classifyName}}
              </div>
            </div>
            <div class="goods-item clearfix" v-for="(item,index) in goodsList" :key="index">
              <div class="pic pos-re" @click="goDetail(item)">
                <div class="pos-ab" :class="{'daigou':item.goodsType===2}"></div>
                <img width="100%" height="100%" v-lazy="item.goodsImgUrl"/>
                <cart-badge :count="item.buyCount"></cart-badge>
              </div>
              <div class="col">
                <p class="title">{{item.goodsName}}</p>
                <p class="this-price">即时价：<span class="s1">¥</span><span class="number">{{item.canKaoPrice}}</span></p>
                <p class="next-price">次日价：<span class="s1">¥</span><span class="number">{{item.price}}</span></p>
                <shop-car-button
                  :goods="item"
                  class="this-bt"
                  :shopStatus="shopStatus"
                  :index="index"
                  :goodsList="goodsList"
                  @updateColumCount="updateGoodsListCount"
                ></shop-car-button>
              </div>
            </div>
            <load-more
              :tip="loadText"
              :show-loading="moreIconFlag"
              background-color="#f7f7f7"
              class="load-more" v-if="loadMoreFlag"></load-more>
          </div>
          <noData v-if="noDataFlag"></noData>
        </div>
        <alert v-model="showAlert" button-text="我知道了">
          <p class="alert-title" slot="title">{{alertText}}</p>
          <div class="alert-content" name="content">
            <p class="p1">暂不接受新的订单</p>
            <p class="p2">(门店营业时间：{{this.storeMsg.shopHours}})</p>
          </div>
        </alert>
      </div>
    </div>
    <m-footer></m-footer>
    <ball></ball>
    <to-top :scrollObj="listSroll" v-if="scrollTop>=800"></to-top>
    <no-next-shop v-if="!hasThisShop" :hasThisShop="hasThisShop"></no-next-shop>
    <loading :loadingFlag="loadingFlag"></loading>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import mFooter from '../components/footer'
  import { Flexbox, FlexboxItem, LoadMore, Alert } from 'vux'
  import SideBar from '../components/SideBar'
  import SideItem from '../components/SideItem'
  import Tabs from '../components/Tabs'
  import TabsItem from '../components/TabsItem'
  import shopCarButton from '../components/buyCarButton'
  import { loadMoreMehod } from '../util/util'
  import ball from '../components/ball'
  import loading from '../components/loading'
  import toTop from '../components/toTop'
  import noNextShop from '../components/noNextShop.vue'
  import noData from '../components/noPage'
  import cartBadge from '../components/badge'

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
      shopCarButton,
      loadMoreMehod,
      ball,
      loading,
      LoadMore,
      toTop,
      Alert,
      noNextShop,
      noData,
      cartBadge
    },
    data () {
      return {
        token: localStorage.getItem('m-token'),
        scrollTop: 0,
        sideList: [],
        storeMsg: [],
        goodsList: [],
        ind: 0, // 当前一级菜单索引
        secondIndex: -1, // 当前二级菜单索引
        firstId: '', // 一级菜单对应的classifyId
        secondId: '', // 二级菜单对应的classifyId
        secondMenuList: '', // 二级菜单列表
        sortSelectIndex: 1,
        softType: 3, // 排序参数
        priceSortFlag: false,
        saleSortFlag: false,
        listSroll: {},
        scrollFlag: false,
        villageName: localStorage.getItem('m-villageName'),
        pageSize: 10,
        sortId: '', // 当前排序Id
        sortType: '', // 当前排序是通过哪个参数获取的 1:firstClassifyId 2：secondClassifyId
        scrollDisable: false,
        loadText: '正在加载',
        moreIconFlag: true,
        pageIndex: 1,
        loadingFlag: true,
        fastSortGoodsList: [], // 速选商品
        fastSortFlag: false, // 是否有速选商品
        loadMoreFlag: false,
        showAlert: false,      // alert flag
        alertText: '',         // alert文本内容
        shopStatus: '', // 门店状态
        imgObj: {
          src: '',
          error: require('../assets/shopBg@2x.png'),
          loading: require('../assets/shopBg@2x.png')
        }, // 懒加载配置
        noDataFlag: false
      }
    },
    created () {
      if (!this.hasThisShop) {
        this.loadingFlag = false
        return
      }
      this.createdMethods()
    },
    activated () {
      // 刷新小圆点数量
      this.thisCartList = this.$store.state.thisCartList
      if (this.thisCartList === '') {
        return
      }
      this.goodsList.forEach((item) => {
        var hasFlag = false
        if (item.buyCount > 0) {
          this.thisCartList.forEach((cartItem) => {
            if (cartItem.goodsId === item.goodsId) {
              item.buyCount = cartItem.buyCount
              hasFlag = true
            }
          })
          if (!hasFlag) {
            item.buyCount = 0
          }
        }
      })
    },
    watch: {
      '$route' (to, from) {
        if (from.path === '/goods_detail') {
          this.listSroll.scrollTo(0, -this.scrollTop, 0)
        }
        this.$nextTick(() => {
          setTimeout(() => {
            if (typeof this.listSroll.refresh === 'function') {
              this.listSroll.refresh()
            }
            if (typeof this.menuSroll.refresh === 'function') {
              this.menuSroll.refresh()
            }
          }, 500)
        })
      }
    },
    methods: {
      updateGoodsListCount (list, index, count) {
        if (typeof list[index].buyCount === 'undefined') {
          this.$set(list[index], 'buyCount', count)
        } else {
          list[index].buyCount = count
        }
      },
      async createdMethods () {
//        this.token = localStorage.getItem('m-token')
        this.villageName = localStorage.getItem('m-villageName')
        // 店铺信息
        await this.post('/basic/getStoreMsg', {
          storeId: localStorage.getItem('m-shopId')
        }).then((res) => {
          if (res.data.code === 100) {
            this.storeMsg = res.data.storeInfo
            this.shopStatus = res.data.storeInfo.shopStatus
            this.shopStatusMethods(res.data.storeInfo.shopStatus)
            this.imgObj.src = this.storeMsg.storeImgurl
          }
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'middle')
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'middle')
            localStorage.removeItem('m-token')
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
          }
          if (res.data.code === 101) {
            this.toast.text(res.data.msg, 'center')
          }
          if (res.data.code === 101) {
            this.toast.text(res.data.msg, 'center')
            localStorage.removeItem('m-token')
          }
        })
        // 速选商品列表 如果bt===2 则有速选商品
        if (this.sideList[0].bt === 2) {
          this.fastSortFlag = true
          let paramasFast = {}
          paramasFast.keyWordId = 7
          paramasFast.softType = 3
          if (this.token) {
            paramasFast.token = this.token
          }
          await this.post('/goods/getLabelGoods', paramasFast).then((res) => {
            if (res.data.code === 100) {
              this.fastSortGoodsList = res.data.goodsList
              this.goodsList = this.fastSortGoodsList
            }
            if (res.data.code === 101) {
              this.$vux.toast.text(res.data.msg, 'middle')
            }
            if (res.data.code === 102) {
              this.$vux.toast.text(res.data.msg, 'middle')
              localStorage.removeItem('m-token')
            }
            this.loadingFlag = false
          })
        }
        // 商品列表
        if (this.sideList[0].bt !== 2) {
          // 二级菜单
          await this.post('/classify/secondClassifyList', {
            classifyId: this.firstId,
            storeId: localStorage.getItem('m-shopId'),
            villageId: localStorage.getItem('m-villageId')
          }).then((res) => {
            if (res.data.code === 100) {
              this.secondMenuList = res.data.secondClassifyList
            }
            if (res.data.code === 101) {
              this.$vux.toast.text(res.data.msg, 'middle')
            }
            if (res.data.code === 102) {
              this.$vux.toast.text(res.data.msg, 'middle')
              localStorage.removeItem('m-token')
            }
          })
          let paramas = {}
          paramas.firstClassifyId = this.firstId
          paramas.storeId = localStorage.getItem('m-shopId')
          paramas.softType = this.softType
          paramas.villageId = localStorage.getItem('m-villageId')
          paramas.pageIndex = 1
          paramas.pageSize = 10
          if (this.token) {
            paramas.token = this.token
          }
          await this.post('/goods/goodsList', paramas).then((res) => {
            if (res.data.code === 100) {
              console.log(res.data)
              this.goodsList = res.data.goodsList
              this.loadingFlag = false
              if (this.goodsList.length === 0) {
                this.noDataFlag = true
              } else {
                this.noDataFlag = false
              }
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
        this.$nextTick(() => {
          this._initScroll()
        })
      },
      // 判断商铺营业状态
      shopStatusMethods (status) {
        // 放假中
        if (status === 1) {
          this.alertText = '门店放假中'
          this.showAlert = true
        }
        // 非营业时间
        if (status === 2) {
          this.alertText = '门店休息中'
          this.showAlert = true
        }
      },
      // 跳转搜索页面
      goSearch () {
        this.$router.push({path: '/search', query: {shopType: 2, storeId: localStorage.getItem('m-shopId')}})
      },
      // 切换小区
      goLocation () {
        if (!this.token) {
          this.$store.commit('saveSelectVillagePath', '/this')
          this.$router.push({path: '/Bmap'})
          return
        }
        var _this = this
        this.$vux.confirm.show({
          title: '提示',
          content: '切换小区会清空购物车中即时送商品，您确定切换么？',
          onConfirm () {
            _this.$store.commit('saveSelectVillagePath', '/this')
            _this.post('/car/deleteUserCarJs', {
              token: _this.token,
              userId: JSON.parse(localStorage.getItem('m-userInfo')).userId
            }).then((res) => {
              if (res.data.code === 101) {
                _this.$vux.toast.text(res.data.msg, 'middle')
              }
              if (res.data.code === 102) {
                _this.$vux.toast.text(res.data.msg, 'middle')
                localStorage.removeItem('m-token')
              }
            })
            _this.$router.push('/Bmap')
          }
        })
      },
      // 请求商品列表
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
        params.pageIndex = 1
        this.pageIndex = 1
        if (this.token) {
          params.token = this.token
        }
        // 如果有速选商品
        if (this.ind === 0 && this.fastSortFlag) {
          var paramasFast = {}
          paramasFast.keyWordId = 7
          paramasFast.softType = this.softType
          if (this.token) {
            paramasFast.token = this.token
          }
          await this.post('/goods/getLabelGoods', paramasFast).then((res) => {
            if (res.data.code === 100) {
              this.fastSortGoodsList = res.data.goodsList
              this.goodsList = this.fastSortGoodsList
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
        } else {
          await this.post('/goods/goodsList', params).then((res) => {
            if (res.data.code === 100) {
              this.goodsList = res.data.goodsList
              if (this.goodsList.length === 0) {
                this.noDataFlag = true
              } else {
                this.noDataFlag = false
              }
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
        this.$nextTick(() => {
          this.listSroll.refresh()
        })
      },
      // 点击二级菜单中的全部
      getAll (id, type) {
        this.sortId = id
        this.sortType = type
        this.getGoods(id, type)
      },
      // 点击二级分类获取商品
      getSecondGoods (id, type, index) {
        this.pageIndex = 1
        this.listSroll.scrollTo(0, 0, 0)
        this.secondIndex = index
        this.sortType = type
        this.sortId = id
        this.getGoods(id, this.sortType)
      },
      // 点击一级菜单获取商品
      memuChange (id, index) {
        this.firstId = id
        this.sortId = id
        this.sortType = 1
        this.listSroll.scrollTo(0, -1, 0)
        this.ind = index
        this.getGoods(id, 1)
        // 有速选时没有二级菜单
        if (this.ind === 0 && this.fastSortFlag) {
          this.secondMenuList = []
          return
        }
        this.post('/classify/secondClassifyList', {
          classifyId: id,
          storeId: localStorage.getItem('m-shopId'),
          villageId: localStorage.getItem('m-villageId')
        }).then((res) => {
          if (res.data.code === 100) {
            this.secondMenuList = res.data.secondClassifyList
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
      // 综合排序
      mixSort () {
        this.sortSelectIndex = 1
        this.softType = 3
        this.getGoods(this.sortId, this.sortType)
      },
      // 价格排序
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
      // 销量排序
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
          click: true
        })
        this.listSroll = new BScroll(this.$refs.goodsListWrap, {
          click: true,
          probeType: 3
        })
        // 加载更多
        loadMoreMehod(this.listSroll, this.$refs.goodsListWrap, this.loadMore, this.onScroll)
      },
      loadMore () {
        this.loadMoreFlag = true
        if (!this.scrollDisable) {
          this.scrollDisable = true
          this.pageIndex += 1
          // paramas
          var params = {}
          if (this.sortType === 1) {
            params.firstClassifyId = this.sortId
            this.secondIndex = -1
          } else {
            params.secondClassifyId = this.sortId
          }
          params.storeId = localStorage.getItem('m-shopId')
          params.softType = this.softType
          params.villageId = localStorage.getItem('m-villageId')
          params.villageId = localStorage.getItem('m-villageId')
          params.pageIndex = this.pageIndex
          if (this.token) {
            params.token = this.token
          }
          this.post('/goods/goodsList', params).then((res) => {
            if (res.data.code === 100) {
              let newList = res.data.goodsList
              for (let i = 0; i < newList.length; i++) {
                this.goodsList.push(newList[i])
              }
              if (newList.length > 0) {
                setTimeout(() => {
                  this.listSroll.refresh()
                }, 50)
              } else {
//                this.loadText = '到底啦~'
//                this.moreIconFlag = false
                this.$vux.toast.text('没有跟多商品了', 'center')
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
      },
      // 滚动回调函数
      onScroll (pos, scrollTop) {
        if (pos.y < -100) {
          this.scrollFlag = true
        }
        if (pos.y >= -100) {
          this.scrollFlag = false
        }
        this.scrollTop = scrollTop
      },
      goDetail (item) {
        this.$store.commit('saveGoodsItem', item)
        this.$router.push({
          path: '/goods_detail',
          query: {goodsId: item.goodsId, shopStatus: this.shopStatus}
        })
      }
    },
    computed: {
      hasThisShop () {
        return this.$store.state.hasThisShop
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .this {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    .b(100);
    .loading {
      position: absolute;
      .t(0);
      .b(100);
      /*z-index: 9;*/
    }
    .no-next-shop {
      bottom: 0;
    }
    .location-search-box {
      background-color: @theme-color-blue;
      .pt(28);
      .pb(28);
      .pl(20);
      .pr(20);
      display: flex;
      align-items: center;
      position: absolute;
      z-index: 9;
      top: 0;
      right: 0;
      left: 0;
      opacity: 1;
      .location {
        /*width: calc(~'(100% - 10px)/2');*/
        .w(400);
        .mr(10);
        .pr(20);
        box-sizing: border-box;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow-x: hidden;
        color: #fff;
        .fs(28);
        position: relative;
      }
      .location:before {
        content: '送至：';
        .fs(25);
        display: inline-block;
      }
      .location:after {
        .ml(20);
        content: '';
        .w(10);
        .h(10);
        border-width: 0 1px 1px 0;
        border-style: solid;
        border-color: #fff;
        display: inline-block;
        transform: translate(-20%, -80%) rotate(45deg);
      }
      .search {
        position: absolute;
        top: 0;
        right: 0;
        .w(80);
        .h(86);
        .lh(86);
        .pr(30);
        .fs(38);
        text-align: right;
        color: #e4ffe5;
      }
    }
    .scroll-active {
      .t(92) !important;
      /* transform: translate3d(0, -1.38666667rem, 0);
       .b(200);*/
    }
    .sort-icon-selected {
      color: @theme-color-blue !important;
    }
    .sort-icon-clear-selected {
      color: #666 !important;
    }
    .head-box {
      .h(190);
      .is-cont .col .iconfont {
        .pr(8);
      }
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
          .fs(35);
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
          /* .mr(10);*/
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
      bottom: 0;
      overflow: hidden;
      .menu-wrap {
        .w(172);
        height: 100%;
        overflow: hidden;
        .side-bar {
          .side-item.active {
            background-color: #ffffff;
            color: #089cf6;
            border-left: 3px solid @theme-color-blue;
          }
        }
      }
      .right {
        .w(578);
        height: 100%;
        .loading {
          z-index: 2;
        }
      }
      .goods-sort {
        background: #fff;
        box-sizing: border-box;
        color: #666;
        .w(578);
        .h(91);
        .lh(91);
        .fs(30);
        border-bottom: 1px solid #eee;
        .active {
          color: #089cf6;
        }
        .sort-item {
          display: inline-block;
          position: relative;
          .ml(50);
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
        .pl(30);
        .pr(56);
        border-bottom: 1px solid #eee;
        .item {
          .w(150);
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
      .none{
        z-index: 10;
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
          .ml(12);
          .w(330);
          .h(227);
          float: left;
          .title {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            color: @font-color-m;
            .fs(31);
            .lh(72);
            .mb(45);
          }
          .this-price {
            color: @theme-color-price;
            .fs(28);
            .lh(40);
            font-weight: 600;
            .s1 {
              .fs(23);
            }
            .number {
              .fs(29);
            }
          }

          .next-price {
            color: #888;
            .fs(26);
            .lh(50);
            .s1 {
              .fs(26);
            }
            .number {
              .fs(30);
            }
          }
          .this-bt {
            position: absolute;
            .r(32);
            .b(46);
            .iconfont.shop-car {
              .fs(26) !important;
              color: #089cf6;
              border: 1px solid #089cf6;
              .pl(4);
              .pr(4);
              .pt(4);
              .pb(4);
            }
          }
        }
      }
    }

  }

</style>
