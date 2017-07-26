<template>
  <div class="home-wrap" @touchmove.prevent>
    <div class="home-view" ref="homeView">
      <div class="wrap">
        <div class="location-search-box">
          <router-link to="/location" class="location">{{villageName}}</router-link>
          <a class="search" @click="goSearch"><input type="search" placeholder="搜索商品" readonly></a>
        </div>
        <swiper :options="swiperOption" ref="mySwiper" class="banner">
          <swiper-slide class="swiper-img" v-for="(item, index) in swiperList" :key="index">
            <img :src="item.imageUrl">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!-- 次日达/即时达 -->
        <div class="link-box">
          <router-link to="next"><img src="../assets/cirida.png" width="100%" alt=""></router-link>
          <router-link to="this"><img src="../assets/jishisong.png" width="100%" alt=""></router-link>
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
              <div class="left f-l">
                <img v-lazy="serchKey.keyword" alt="" width="100%" height="100%" @click="goSerchKey(serchKey)">
              </div>
              <div class="right f-l">
                <div class="item" @click="goOriginDetail(specialPriceGoodsList[0].goodsId)">
                  <div class="des f-l">
                    <h3 class="title ui-ellipsis-clamp-2">{{specialPriceGoodsList[0].goodsName}}</h3>
                    <p class="this-price">即时价：<span class="s1">¥</span><span
                      class="number">{{specialPriceGoodsList[0].canKaoPrice}}</span></p>
                    <p class="next-price">次日价：<span class="s1">¥</span><span
                      class="number">{{specialPriceGoodsList[0].price}}</span></p>
                  </div>
                  <div class="pic f-l">
                    <img v-lazy="specialPriceGoodsList[0].goodsImgUrl" alt="" width="100%" height="100%">
                  </div>
                </div>
                <div class="item" @click="goOriginDetail(specialPriceGoodsList[0].goodsId)">
                  <div class="des f-l">
                    <h3 class="title">{{specialPriceGoodsList[1].goodsName}}</h3>
                    <p class="this-price">即时价：<span class="s1">¥</span><span
                      class="number">{{specialPriceGoodsList[1].canKaoPrice}}</span></p>
                    <p class="next-price">次日价：<span class="s1">¥</span><span
                      class="number">{{specialPriceGoodsList[1].price}}</span></p>
                  </div>
                  <div class="pic f-l">
                    <img v-lazy="specialPriceGoodsList[1].goodsImgUrl" alt="" width="100%" height="100%">
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
              <div class="item f-l" v-for="(item,index) in tuijianGoodsList" :key="index"
                   @click="goDetail(item.goodsId,$event)">
                <div class="top">
                  <div class="pic">
                    <img v-lazy="item.goodsImgUrl" alt="">
                  </div>
                  <div class="des">
                    <h3 class="title">{{item.goodsName}}</h3>
                    <p class="this-price">即时价：<span class="s1">¥</span><span class="number">{{item.price}}</span></p>
                    <p class="next-price">次日价：<span class="s1">¥</span><span class="number">{{item.canKaoPrice}}</span>
                    </p>
                  </div>
                </div>
                <buy-car-button :goods="item"></buy-car-button>
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
            <home-title :title="mapTitleTips[7].name" v-if="mapTitleTips[7]">
              <img class="icon iconfont" slot="icon" :src="mapTitleTips[7].other">
            </home-title>
            <new-goods :goodsList="saleGoods"></new-goods>
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
            <two-column :goodsList="newGoodsList"></two-column>
          </div>
          <!-- 实时推荐 -->
          <div class="moreRecommend">
            <home-title :title="mapTitleTips[6].name" v-if="mapTitleTips[6]">
              <img class="icon iconfont" slot="icon" :src="mapTitleTips[6].other">
            </home-title>
            <two-column :goodsList="moreRecommendList"></two-column>
          </div>
          <load-more
            :tip="loadText"
            :show-loading="moreIconFlag"
            background-color="#f7f7f7"
            class="load-more"></load-more>
        </div>
      </div>
    </div>
    <m-footer></m-footer>
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
  export default {
    components: {
      swiper,
      swiperSlide,
      BScroll,
      mFooter,
      homeTitle,
      newGoods,
      twoColumn,
      LoadMore,
      buyCarButton
    },
    data () {
      return {
        villageName: '',
        swiperList: [],
        cityId: localStorage.getItem('m-cityId'),
        areaId: localStorage.getItem('m-areaId'),
        villageId: localStorage.getItem('m-villageId'),
        storeList: [],
        token: localStorage.getItem('m-token'),
        mapTitleTips: [],
        ystgWords: [],
        serchKey: '',
        specialPriceGoodsList: [],
        tuijianGoodsList: [],
        tuijianImagesList: [],
        adverList: [],
        newGoodsList: [],
        newImageList: [],
        saleGoods: [],
        saleImagelist: [],
        moreRecommendList: [],
        pageIndex: 1,
        pageSize: 10,
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
        }
      }
    },
    created () {
      this.post('/first/getFirst', {
        cityId: this.cityId,
        areaId: this.areaId,
        villageId: this.villageId,
        source: 1
      }).then((res) => {
        if (res.data.code === 100) {
          console.log(res.data)
          this.$store.state.totalBuyCount = res.data.firstInfo.totalBuyCount
          console.log(this.$store.state.totalBuyCount)
          /* 轮播图数据 */
          this.swiperList = res.data.firstInfo.imgList
          /* 店铺数据 */
          this.storeList = res.data.firstInfo.storeList
          localStorage.setItem('m-depotId', this.storeList[0].storeId)
          localStorage.setItem('m-shopId', this.storeList[1].storeId)
          /* 首页数据数据 */
          this.post('/first/getFirstGoods', {
            storeId: this.storeList[0].storeId,
            villageId: this.villageId
          }).then((res) => {
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
              this.$nextTick(() => {
                this._initScroll()
              })
            }
          })
          /* 无限加载 */
          this.post('/first/unlimitedLoading', {
            storeId: this.storeList[0].storeId,
            villageId: this.villageId,
            pageIndex: 1,
            pageSize: 10
          }).then((res) => {
            if (res.data.code === 100) {
              this.moreRecommendList = res.data.goodsList
            }
          })
        }
      })
      if (!localStorage.getItem('m-villageName')) {
        this.$router.push({path: '/location'})
      } else {
        this.villageName = localStorage.getItem('m-villageName')
      }
      /* 标签商品 */
      this.post('/goods/getLabelGoods', {}).then((res) => {
        if (res.data.code === 100) {
        }
      })
    },
//    activated () {
//      this.homeSroll.refresh()
//    },
    methods: {
      goSearch () {
        this.$router.push({path: '/search', query: {shopType: 1, storeId: localStorage.getItem('m-depotId')}})
      },
      goActive (item) {
        this.$router.push({
          path: '/active',
          query: {keyId: item.keyId, remarks: item.remarks, keyBanleImages: item.keyBanleImages}
        })
      },
      goDetail (id, e) {
        if (e.target.tagName.toLowerCase() !== 'i') {
          this.$router.push({
            path: '/goods_detail',
            query: {goodsId: id}
          })
        }
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
            storeId: this.storeList[0].storeId,
            villageId: this.villageId,
            pageIndex: this.pageIndex,
            pageSize: 10
          }).then((res) => {
            if (res.data.code === 100) {
              let newList = res.data.goodsList
              for (let i = 0; i < newList.length; i++) {
                this.moreRecommendList.push(newList[i])
              }
              if (newList.length > 0) {
                setTimeout(() => {
                  this.homeSroll.refresh()
                }, 0)
              } else {
                this.loadText = '到底啦~'
                this.moreIconFlag = false
              }
              this.scrollDisable = false
            }
          })
        }
        this.loadMoreFlag = true
      },
      _initScroll () {
        const homeView = this.$refs.homeView
        this.homeSroll = new BScroll(homeView, {
          click: true,
          probeType: 3
        })
        this.homeSroll.on('scroll', (pos) => {
          let scrollTop = Math.abs(Math.round(pos.y))
          const homeView = this.$refs.homeView
          let homeViewHeight = homeView.offsetHeight
          let wrapperHeight = this.$refs.homeView.getElementsByClassName('wrap')[0].clientHeight
          if (scrollTop + homeViewHeight >= wrapperHeight) {
            this.loadMore()
          }
        })
        this.homeSroll.refresh()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .home-wrap {
    height: 100%;
  }

  .home-view .location-search-box {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 500;
    top: 0;
    right: 0;
    left: 0;
    .location {
      width: calc(~'(100% - 10px)/2');
      margin-right: 5px;
      padding: 0 15px;
      text-align: center;
      box-sizing: border-box;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow-x: hidden;
      color: #fff;
      font-size: 12px;
      position: relative;
    }
    .location:before {
      content: '\e610';
      font: 12px/1 'iconfont';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-45%);
    }
    .location:after {
      content: '';
      width: 5px;
      height: 5px;
      border-width: 0 1px 1px 0;
      border-style: solid;
      border-color: #fff;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(-20%, -80%) rotate(45deg);
    }
    .search {
      margin-left: 5px;
      padding: 5px 10px;
      flex-grow: 1;
      height: 30px;
      box-sizing: border-box;
      line-height: 20px;
      border-radius: 100px;
      background-color: rgba(255, 255, 255, .3);
      position: relative;
    }
    .search:before {
      content: '\e639';
      color: #fff;
      font: 12px/1 'iconfont';
      position: absolute;
      top: 10px;
      left: 15px;
    }
    .search input {
      padding-left: 20px;
      width: 100%;
      line-height: 20px;
      background-color: transparent;
      border: none;
      -webkit-appearance: none;
      outline: none;
    }
    .search input::placeholder {
      color: #fff;
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
    overflow: hidden;
    .link-box {
      display: flex;
      .pt(5);
      .pb(5);
      a {
        margin: 5px;
      }
    }
    .group-buy {
      .content {
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
                color: #443d39;
                .fs(28);
                .h(70);
                .mb(10);
                .lh(36);
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
            .pt(30);
            img {
              margin: 0 auto;
              .w(226);
              .h(226);
            }
          }
          .des {
            .h(120);
            .mt(26);
            .pl(18);
            position: relative;
            .title {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              overflow: hidden;
              color: #443d39;
              .fs(28);
              .lh(39);
              .mb(10);
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
            .w(48);
            .h(48);
            .lh(48);
            .fs(38);
            text-align: center;
            color: @theme-color;
            border: 1px solid @theme-color;
            border-radius: 50%;
            .pl(4);
            .pr(4);
            .pt(4);
            .pb(4);
            position: absolute;
            left: 50%;
            .ml(-25);
            .b(10);
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
    .load-more {
      color: @font-color-m;
    }
  }
</style>
