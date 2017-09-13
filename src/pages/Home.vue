<template>
  <div class="home-wrap" @touchmove.prevent>
    <div v-if="!reloadFlag" class="inner">
      <div class="location-search-box" ref="header" :class="{'header-bg':!hasNextShop}">
        <a class="location" @click="goLocation">{{villageName}}</a>
        <a class="search iconfont" @click="goSearch" v-if="hasNextShop">&#xe639;</a>
        <!--isWeiXinFlag&&hasNextShop-->
        <i class="iconfont scan" @click="scan" v-if="isWeiXinFlag">&#xe661;</i>
      </div>
      <scroll class="home-view"
              :data="loadMoreNum"
              :pullUp="true"
              @scrollToEnd="loadMore"
              @scroll="onScroll"
              :listenScroll="true">
        <div class="wrap">
          <!-- banner-->
          <swiper :options="swiperOption" ref="mySwiper" class="banner">
            <swiper-slide class="swiper-img" v-for="(item, index) in swiperList" :key="index">
              <img :src="item.imageUrl">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <!-- 次日达/即时达 -->
          <div class="link-box">
            <router-link to="next" class="pic"><img src="../assets/jishisong.png" width="100%" height="100%" alt="">
            </router-link>
            <router-link to="this" class="pic"><img src="../assets/cirida.png" width="100%" height="100%" alt="">
            </router-link>
          </div>
          <div class="active-box">
            <!-- 预售团购 -->
            <div class="group-buy" v-if="mapTitleTips[0]">
              <home-title :title="mapTitleTips[0].name">
                <img class="icon iconfont" slot="icon" :src="mapTitleTips[0].other">
              </home-title>
              <div class="content clearfix">
                <div class="item" v-for="(item,index) in ystgWords" :key="index" @click="goActive(item)">
                  <img v-lazy="item.keyword" alt="" width="100%" height="100%">
                </div>
              </div>
            </div>
            <!-- 原地直供 -->
            <div class="origin-directly" v-if="mapTitleTips[1]">
              <home-title :title="mapTitleTips[1].name">
                <img class="icon iconfont" slot="icon" :src="mapTitleTips[0].other">
              </home-title>
              <div class="content">
                <div class="left f-l" @click="goSerchKey(serchKey)">
                  <img v-lazy="serchKey.keyword" alt="" width="100%" height="100%">
                </div>
                <div class="right f-l">
                  <div class="item" @click="goOriginDetail(specialPriceGoodsList[0].goodsId)">
                    <div class="des f-l">
                      <h3 class="title ui-ellipsis-clamp-2">{{specialPriceGoodsList[0].goodsName}}</h3>
                      <p class="this-price">即时价：<span class="s1">¥</span><span
                        class="number">{{specialPriceGoodsList[0].canKaoPrice.toFixed(1)}}</span></p>
                      <p class="next-price">次日价：<span class="s1">¥</span><span
                        class="number">{{specialPriceGoodsList[0].price.toFixed(1)}}</span></p>
                    </div>
                    <div class="pic f-l">
                      <img v-lazy="specialPriceGoodsList[0].goodsImgUrl" alt="" width="100%" height="100%">
                    </div>
                  </div>
                  <div class="item" @click="goOriginDetail(specialPriceGoodsList[0].goodsId)">
                    <div class="des f-l">
                      <h3 class="title">{{specialPriceGoodsList[1].goodsName}}</h3>
                      <p class="this-price">即时价：<span class="s1">¥</span><span
                        class="number">{{specialPriceGoodsList[1].canKaoPrice.toFixed(1)}}</span></p>
                      <p class="next-price">次日价：<span class="s1">¥</span><span
                        class="number">{{specialPriceGoodsList[1].price.toFixed(1)}}</span></p>
                    </div>
                    <div class="pic f-l">
                      <img v-lazy="specialPriceGoodsList[1].goodsImgUrl" width="100%" height="100%">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 优品精品 -->
            <swiper :options="swiperOption" ref="YouSwiper" class="activeSwiper">
              <swiper-slide class="swiper-img" v-for="(item, index) in tuijianImagesList" :key="index">
                <img :src="item.imageUrl">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="recommend" v-if="mapTitleTips[2]">
              <home-title :title="mapTitleTips[2].name">
                <img class="icon iconfont" slot="icon" :src="mapTitleTips[2].other">
              </home-title>
              <div class="content clearfix">
                <div class="item f-l" v-for="(item,index) in tuijianGoodsList" :key="index">
                  <div class="top" @click="goDetail(item)">
                    <div class="pic">
                      <img v-lazy="item.goodsImgUrl" alt="">
                      <cart-badge :count="item.buyCount"></cart-badge>
                    </div>
                    <div class="des">
                      <h3 class="title">{{item.goodsName}}</h3>
                      <p class="next-price">次日价：<span class="s1">¥</span><span
                        class="number">{{item.price.toFixed(1)}}</span>
                      </p>
                      <p class="this-price">即时价：<span class="s1">¥</span><span
                        class="number">{{item.canKaoPrice.toFixed(1)}}</span></p>
                    </div>
                  </div>
                  <buy-car-button
                    :goods="item"
                    :index="index"
                    :goodsList="tuijianGoodsList"
                    @updateColumCount="updateGoodsListCount"
                  ></buy-car-button>
                </div>
              </div>
            </div>
            <!-- 热销 -->
            <swiper :options="swiperOption" ref="SaleSwiper" class="activeSwiper">
              <swiper-slide class="swiper-img" v-for="(item, index) in saleImagelist" :key="index">
                <img :src="item.imageUrl">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="new-goods">
              <home-title :title="mapTitleTips[4].name" v-if="mapTitleTips[4]">
                <img class="icon iconfont" slot="icon" :src="mapTitleTips[4].other">
              </home-title>
              <!--<new-goods :goodsList="saleGoods" @updateGoodsList="updateGoodsList"></new-goods>-->
              <new-goods
                :goodsList="saleGoods"
                @updateGoodsListCount="updateGoodsListCount"
              ></new-goods>
            </div>
            <!-- 新品上架 -->
            <swiper :options="swiperOption" ref="NewSwiper" class="activeSwiper">
              <swiper-slide class="swiper-img" v-for="(item, index) in newImageList" :key="index">
                <img :src="item.imageUrl">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="sale">
              <home-title :title="mapTitleTips[3].name" v-if="mapTitleTips[3]">
                <img class="icon iconfont" slot="icon" :src="mapTitleTips[3].other">
              </home-title>
              <two-column :goodsList="newGoodsList" @updateGoodsListCount="updateGoodsListCount"></two-column>
            </div>
            <!-- 实时推荐 -->
            <div class="moreRecommend">
              <home-title :title="mapTitleTips[7].name" v-if="mapTitleTips[7]">
                <img class="icon iconfont" slot="icon" :src="mapTitleTips[7].other">
              </home-title>
              <two-column :goodsList="moreRecommendList" @updateGoodsListCount="updateGoodsListCount"></two-column>
            </div>
            <load-more
              :tip="loadText"
              :show-loading="moreIconFlag"
              background-color="#f7f7f7"
              class="load-more"></load-more>
          </div>
        </div>
      </scroll>
    </div>
    <m-footer :totalCount="totalBuyCount"></m-footer>
    <ball></ball>
    <load-fail v-if="reloadFlag"></load-fail>
    <no-next-shop v-if="!hasNextShop"></no-next-shop>
    <loading :loadingFlag="loadingFlag"></loading>
  </div>
</template>

<script>
  import { LoadMore } from 'vux'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import BScroll from 'better-scroll'
  import mFooter from '../components/footer'
  import homeTitle from '../components/homeTitle'
  import newGoods from '../components/oneColumn'
  import twoColumn from '../components/twocolumn'
  import buyCarButton from '../components/buyCarButton'
  import ball from '../components/ball'
  import loadFail from '../components/loadFail.vue'
  import { isWeiXinFlag, wxObj } from '../util/js-sdk'
  import noNextShop from '../components/noNextShop.vue'
  import loading from '../components/loading'
  import cartBadge from '../components/badge'
  //  import { bus } from '../util/util'

  export default {
    name: 'home',
    components: {
      swiper,
      swiperSlide,
      BScroll,
      mFooter,
      homeTitle,
      newGoods,
      twoColumn,
      LoadMore,
      buyCarButton,
      ball,
      loadFail,
      noNextShop,
      loading,
      cartBadge
    },
    data () {
      return {
        villageName: localStorage.getItem('m-villageName'),
        swiperList: [],
        cityId: '',
        areaId: '',
        villageId: '',
        storeList: [],
        token: localStorage.getItem('m-token'),
        mapTitleTips: [],
        ystgWords: [],
        serchKey: '',
        specialPriceGoodsList: [],
        tuijianGoodsList: [],
        saleGoods: [],
        tuijianImagesList: [],
        adverList: [],
        newGoodsList: [],
        newImageList: [],
        saleImagelist: [],
        moreRecommendList: [],
        pageIndex: 0,
        pageSize: 8,
        loading: false,
        scrollDisable: false,
        scrollTop: '',
        loadText: '正在加载',
        loadMoreFlag: false,
        moreIconFlag: true,
        swiperOption: {
          notNextTick: true,
          autoplay: 3000,
          pagination: '.swiper-pagination'
        },
        homeSroll: {},
        reloadFlag: false,
        isWeiXinFlag: isWeiXinFlag,
        newList: [],
        loadMoreNum: 0,
        loadingFlag: true
      }
    },
    async created () {
      //        localStorage.removeItem('m-villageName')
      // 进首页如果之前没有选过小区则跳转选择
      if (!localStorage.getItem('m-villageName') || !localStorage.getItem('m-cityId') || !localStorage.getItem('m-areaId') || !localStorage.getItem('m-villageId') || !localStorage.getItem('m-villageId')) {
        this.$router.replace({path: '/chooseCity'})
        return
      }
      // _iscroll初始化flag
      // 获取首页数据
      var paramas = {}
      paramas.cityId = localStorage.getItem('m-cityId')
      paramas.areaId = localStorage.getItem('m-areaId')
      paramas.villageId = localStorage.getItem('m-villageId')
      paramas.source = 1
      if (localStorage.getItem('m-token')) {
        paramas.token = localStorage.getItem('m-token')
      }
      await this.post('/first/getFirst', paramas).then((res) => {
        if (res.data.code === 100) {
          // 店铺信息
          this.$store.commit('saveStoreInfo', res.data.firstInfo.storeList)
          // 及时送和次日达都没有开通
          if (!this.hasNextShop) {
            return
          }
          // 保存购物车数量
          this.$store.commit('increment', res.data.firstInfo.totalBuyCount)
          /* 轮播图数据 */
          // 规避有时候后台不给imgList
          if (!res.data.firstInfo.imgList) {
            window.location.reload()
            return
          }
          this.swiperList = res.data.firstInfo.imgList
        }
        if (res.data.code === 101) {
          this.loadingFlag = false
          this.$vux.toast.text(res.data.msg, 'middle')
          this.reloadFlag = true
          return
        }
        if (res.data.code === 102) {
          this.loadingFlag = false
          localStorage.removeItem('m-token')
          window.location.reload()
          return
        }
      })
      var paramasFG = {}
      paramasFG.storeId = localStorage.getItem('m-depotId')
      paramasFG.villageId = localStorage.getItem('m-villageId')
      if (this.token) {
        paramasFG.token = this.token
      }
      /* 首页数据数据 */
      this.post('/first/getFirstGoods', paramasFG).then((res) => {
        if (res.data.code === 100) {
          this.mapTitleTips = res.data.goodsList.mapTitleTips
          this.ystgWords = res.data.goodsList.ystgWords
          this.serchKey = res.data.goodsList.serchKey
          this.specialPriceGoodsList = res.data.goodsList.specialPriceGoodsList
          this.tuijianGoodsList = res.data.goodsList.tuijianGoodsInfo.tuijianGoodsList
          this.tuijianImagesList = res.data.goodsList.tuijianGoodsInfo.tuijianImagesList
          this.newGoodsList = res.data.goodsList.newGoodsInfo.newGoodsList
          this.newImageList = res.data.goodsList.newGoodsInfo.newImageList
          this.saleGoods = res.data.goodsList.saleGoodsInfo.saleGoodsList
          this.saleImagelist = res.data.goodsList.saleGoodsInfo.saleImagelist
          this.computedSwiperLength()
        }
        if (res.data.code === 101) {
          this.$vux.toast.text(res.data.msg, 'middle')
          this.reloadFlag = true
          return
        }
        if (res.data.code === 102) {
          this.$vux.toast.text(res.data.msg, 'middle')
          localStorage.removeItem('m-token')
          this.reloadFlag = true
        }
        this.loadingFlag = false
      })
    },
    activated () {
      // 刷新小圆点数量
      this.nextCartList = this.$store.state.nextCartList
      if (this.nextCartList === '') {
        return
      }
      let curGoodsList = []
      curGoodsList = curGoodsList.concat(this.specialPriceGoodsList, this.tuijianGoodsList, this.newGoodsList,
        this.saleGoods, this.moreRecommendList)
      curGoodsList.forEach((item) => {
        var hasFlag = false
        if (item.buyCount > 0) {
          this.nextCartList.forEach((cartItem) => {
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
    methods: {
      updateGoodsListCount (list, index, count) {
        if (typeof list[index].buyCount === 'undefined') {
          this.$set(list[index], 'buyCount', count)
        } else {
          list[index].buyCount = count
        }
      },
      goLocation () {
        if (!localStorage.getItem('m-token')) {
          this.$store.commit('saveSelectVillagePath', '/home')
          this.$router.push({path: '/location'})
          return
        }
        var _this = this
        this.$vux.confirm.show({
          title: '提示',
          content: '切换小区会清空购物车中即时送商品，您确定切换么？',
          onConfirm () {
            _this.$store.commit('saveSelectVillagePath', '/home')
            _this.post('/car/deleteUserCarJs', {
              token: localStorage.getItem('m-token'),
              userId: JSON.parse(localStorage.getItem('m-userInfo')).userId
            }).then((res) => {
              if (res.data.code === 101) {
                this.$vux.toast.text(res.data.msg, 'middle')
              }
              if (res.data.code === 102) {
                this.$vux.toast.text(res.data.msg, 'middle')
                localStorage.removeItem('m-token')
              }
            })
            _this.$store.commit('saveSelectVillagePath', '/home')
            _this.$router.push({path: '/location'})
          }
        })
      },
      goSearch () {
        this.$router.push({
          path: '/search',
          query: {shopType: 1, storeId: localStorage.getItem('m-depotId')}
        })
      },
//      扫一扫
      scan () {
        var _this = this
        wxObj.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
            var splitArr = result.split(',')
            var huohao = splitArr[1]
            console.log(result, 'result')
            console.log(res, 'res')
            _this.$vux.toast.text(`${huohao}huohao`, 'middle')
//            _this.$vux.toast.text(`${result}res.resultStr`, 'middle')
//            _this.$router.push({path: '/goodsDetail', query: {id:}})
            _this.post('/goods/goodsDetail', {
              storeId: localStorage.getItem('m-storeId'),
              villageId: localStorage.getItem('m-villageId'),
              huohao: huohao
            }).then(res => {
              console.log(res.data)
              _this.$vux.toast.text(`${res.data.code}code`, 'middle')
              if (res.data.code === 100) {
                _this.$router.push({
                  path: '/goods_detail',
                  query: {huohao: huohao}
                })
              } else {
                _this.$vux.alert.show({
                  title: '提示',
                  content: '无此商品'
                })
              }
            })
          }
        })
      },
      goActive (item) {
        this.$router.push({
          path: '/active',
          query: {keyId: item.keyId, remarks: item.remarks, keyBanleImages: item.keyBanleImages}
        })
      },
      goDetail (item) {
        this.$store.commit('saveGoodsItem', item)
        this.$router.push({
          path: '/goods_detail',
          query: {goodsId: item.goodsId}
        })
      },
      goOriginDetail (id) {
        this.$router.push({
          path: '/goods_detail',
          query: {goodsId: id}
        })
      },
      goSerchKey (item) {
        this.$router.push({
          path: '/originActive',
          query: {goodsId: item.keyId, remarks: item.remarks}
        })
      },
      computedSwiperLength () {
        if (this.tuijianImagesList.length <= 1) {
          this.$refs.YouSwiper.swiper.paginationContainer[0].style.display = 'none'
        }
        if (this.saleImagelist.length <= 1) {
          this.$refs.SaleSwiper.swiper.paginationContainer[0].style.display = 'none'
        }
        if (this.newImageList.length <= 1) {
          this.$refs.NewSwiper.swiper.paginationContainer[0].style.display = 'none'
        }
      },
      /* 无限加载 */
      loadMore () {
        if (!this.scrollDisable) {
          this.scrollDisable = true
          this.pageIndex += 1
          this.post('/first/unlimitedLoading', {
            storeId: localStorage.getItem('m-depotId'),
            villageId: localStorage.getItem('m-villageId'),
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }).then((res) => {
            if (res.data.code === 100) {
              this.newList = res.data.goodsList
              for (let i = 0; i < this.newList.length; i++) {
                this.moreRecommendList.push(this.newList[i])
              }
              if (this.newList.length > 0) {
                this.loadMoreNum++
              } else {
                this.loadText = '到底啦~'
                this.moreIconFlag = false
              }
            }
            if (res.data.code === 101) {
              this.$vux.toast.text(res.data.msg, 'middle')
            }
            if (res.data.code === 102) {
              this.$vux.toast.text(res.data.msg, 'middle')
              localStorage.removeItem('m-token')
            }
            this.scrollDisable = false
          })
        }
        this.loadMoreFlag = true
      },
      // 搜索部分背景渐现效果
      onScroll (_this) {
        let scrollTop = -Math.round(_this.y)
        this.$refs.header.style.backgroundColor = `rgba(1,166,98,${scrollTop / 300})`
      }
    },
    computed: {
      totalBuyCount () {
        return this.$store.state.totalBuyCount
      },
      hasNextShop () {
        return this.$store.state.hasNextShop
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .home-wrap {
    height: 100%;
    .loading {
      z-index: 101;
    }
  }

  .swiper-container {
    .mt(10);
  }

  .location-search-box {
    .pt(28);
    .pb(28);
    .pl(20);
    .pr(20);
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    left: 0;
    opacity: 1;
    &.header-bg {
      background-color: @theme-color;
    }
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
      .fs(25);
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
      .h(92);
      .lh(92);
      .pr(30);
      .fs(35);
      text-align: right;
      color: #e4ffe5;
    }
    .scan {
      text-align: center;
      position: absolute;
      top: 0;
      .r(118);
      .w(80);
      .h(86);
      .lh(86);
      .fs(28);
      .pr(20);
      text-align: right;
      color: #e4ffe5;
    }
  }

  .banner {
    .swiper-img {
      width: 100%;
      .h(320);
    }
    img {
      width: 100%;
      height: 100%;
    }
  }

  .activeSwiper {
    img {
      .h(271);
    }
  }

  .no-pagination {
    display: none;
  }

  .home-view {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    .b(100);
    /*overflow: scroll;*/
    .wrap {
    }
    .link-box {
      display: flex;
      /* .pt(5);
       .pb(5);*/
      .pic {
        width: 50%;
        .h(135);
        display: inline-block;
      }
      a {
        .mt(2);
        .mb(2);
        /*.mr(10);
        .ml(10);*/
      }
    }
    .group-buy {
      .content {
        width: 100%;
        box-shadow: 0 0 0 #f8f8f8;
        .item {
          width: 33.33%;
          .h(292);
          float: left;
        }
      }
    }
    .origin-directly {
      background: #fff;
      .content {
        .h(356);
        border: 1px solid #eee;
        .left {
          box-sizing: border-box;
          width: 47.5%;
          .h(356);
          border-bottom: 1px solid #eee;
        }
        .right {
          box-sizing: border-box;
          width: 52.5%;
          .h(356);
          border-left: 1px solid #eee;
          .item {
            box-sizing: border-box;
            .h(178);
            border-bottom: 1px solid #eee;
            .des {
              box-sizing: border-box;
              .pt(14);
              .pl(14);
              .w(203);
              .h(178);
              .title {
                overflow: hidden;
                color: @font-color-m;
                .fs(29);
                .h(70);
                .mb(10);
                .lh(36);
              }
              .this-price {
                color: @theme-color;
                .fs(25);
                .lh(29);
                .s1 {
                  .fs(20);
                }
                .number {
                  .fs(26);
                }
              }
              .next-price {
                color: @theme-color-price;
                .fs(27);
                font-weight: 600;

                .s1 {
                  .fs(26);
                }
                .number {
                  .fs(28);
                }
              }
            }
            .pic {
              .mt(7);
              .w(164);
              .h(164);
            }
          }
        }
      }
    }
    .recommend {
      .content {
        width: 100%;
        margin-top: 2px;
        .item {
          position: relative;
          background: #fff;
          box-sizing: border-box;
          width: calc(100% / 3);
          .h(490);
          border-right: 1px solid #f7f7f7;
          margin-bottom: 1px;
          &:nth-child(3n) {
            margin-right: 0;
          }
          .pic {
            box-sizing: border-box;
            .h(256);
            .pt(10);
            img {
              margin: 0 auto;
              .w(226);
              .h(226);
            }
          }
          .des {
            .h(120);
            .mt(10);
            .pl(18);
            position: relative;
            .title {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              overflow: hidden;
              color: #443d39;
              .fs(31);
              .lh(39);
              .mb(10);
            }
            .this-price {
              color: @font-color-input;
              .fs(25);
              .lh(30);
              .s1 {
                .fs(20);
              }
              .number {
                .fs(26);
              }
            }
            .next-price {
              color: @theme-color-price;
              .fs(28);
              font-family: "Microsoft Yahei";
              font-weight: 600;
              color: @theme-color-price;
              .s1 {
                .fs(26);
              }
              .number {
                .fs(30);
              }
            }
          }
          .shop-cart-wrap {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
          }
          .iconfont.shop-car {
          }
        }
      }
    }
    .new-goods {
      ul {
        border-top: 2px solid #f1f1f1;
        .item {
          box-sizing: border-box;
          .h(299);
          .pl(16);
          .pt(18);
          background: #fff;
          border-bottom: 2px solid #f1f1f1;
          .pic {
            .w(268);
            .h(268);
          }
          .col {
            .w(436);
            .title {
              .fs(32);
            }
            .des {
              .fs(28);
              .mb(60);
            }
            .next-price {
              .fs(30);
              /* font-family: "Microsoft Yahei";
               font-weight: 600;
               color: @theme-color-price;*/
              .s1 {
                .fs(26);
              }
              .s2 {
                .fs(32);
              }
            }
            .this-price {
              .fs(30);
              .lh(40);
              .s1 {
                .fs(26);
              }
              .s2 {
                .fs(32);
              }
            }
          }
          .iconfont.shop-car {
            .r(70);
            .b(37);
            color: @theme-color;
            border: 1px solid @theme-color;
          }
        }
      }
    }
    .sale {
      ul {
        .mt(12);
      }
    }

  }
</style>
