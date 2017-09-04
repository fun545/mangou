<template>
  <div>
    <div class="detail-wrap">
      <m-header :title="title" ref="header"></m-header>
      <div class="back-wrap" @click="$router.back(-1)">
        <span class="back iconfont d-ib" slot="icon">&#xe654;</span>
      </div>
      <scroll class="content" :listenScroll="true" @scroll="onScroll">
        <div>
          <swiper :options="swiperOption" ref="DetailSwiper" class="DetailSwiper">
            <swiper-slide class="swiper-img" v-for="(item, index) in swiperList" :key="index">
              <!--<img :src="item" alt="">-->
              <div class="pic"><img v-lazy="item" width="100%" height="100%"></div>
              <!--<lazy-image-->
              <!--:src='item'-->
              <!--:placeholder='$store.state.defaultImg'-->
              <!--:events="['touchmove']"-->
              <!--class="pic"-->
              <!--&gt;</lazy-image>-->
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="des">
            <h3 class="title">{{goodsDetail.goodsName}}</h3>
            <div class="price-wrap">
              <!--次日达 价格显示先后顺序-->
              <div v-if="goodsDetail.shopType===1">
                <p class="next-price d-ib">次日价：<span class="s1">¥</span><span
                  class="number">{{goodsDetail.price}}</span>
                </p>
                <p class="this-price d-ib">即时价：<span class="s1">¥</span><span
                  class="number">{{goodsDetail.canKaoPrice}}</span></p>
              </div>
              <!--及时送 价格显示先后顺序-->
              <div v-if="goodsDetail.shopType===2">
                <p class="next-price d-ib">即时价：<span class="s1">¥</span><span
                  class="number">{{goodsDetail.canKaoPrice}}</span></p>
                <p class="this-price d-ib">次日价：<span class="s1">¥</span><span
                  class="number">{{goodsDetail.price}}</span>
                </p>
              </div>
            </div>
            <div class="size-des">
              <p class="size">商品规格：{{goodsDetail.guige}}</p>
              <p class="numbering">商品编号：{{goodsDetail.huohao}}</p>
            </div>
            <div class="collet-wrap t-c" @click="collectGoods">
              <div class="iconfont collect" v-if="collectFlag">&#xe641;</div>
              <div class="iconfont collect" v-if="!collectFlag">&#xe65d;</div>
              <div>收藏</div>
            </div>
          </div>
          <div class="guess">
            <div class="title"></div>
            <div class="d-content">
              <guess-list :goodsList="goodsList"></guess-list>
            </div>
          </div>
        </div>
        <loading :loadingFlag="loadingFlag" class="loading"></loading>
      </scroll>
      <div class="footer" v-if="login">
        <div class="buy-car" @click="$router.push('/cart')">
          <div class="icon d-ib">
            <i class="iconfont center">&#xe613;</i>
            <div class="badge">
              <badge :text="totalBuyCount" v-if="totalBuyCount"></badge>
            </div>
          </div>
          <div class="text d-ib">
            合计：<span>￥{{totalPrice}}</span>
          </div>
        </div>
        <div class="button t-c" @click="addCart(goodsDetail)" ref="cartBt"
             :class="{'disabled':shopStatus!==0}">
          加入购物车
        </div>
        <div class="button t-c buy" @click="goFastBuy" v-if="goodsDetail.shopType===2&&shopStatus===0"
             :class="{'disabled':shopStatus!==0}">
          立即购买
        </div>
      </div>
      <no-login-footer v-if="!login"></no-login-footer>
      <!--立即下单-->
      <div class="fast-buy" v-if="close">
        <div class="inner">
          <div class="top">
            <div class="des">
              <div class="pic">
                <img v-lazy="goodsDetail.goodsImgUrl" alt="" width="100%" height="100%">
              </div>
              <div class="close-icon" @click="close=false">
                <div class="iconfont">
                  &#xe655;
                </div>
              </div>
              <div>
                <p class="theme-color">即时价：{{goodsDetail.canKaoPrice}}</p>
                <p>库存：{{goodsDetail.kucun}}</p>
              </div>
            </div>
            <div class="count">
              <p>购买数量</p>
              <div class="count-box">
                <div class="remove" @click="count(2)"/>
                <input type="number" class="val-box" v-model="countNm">
                <div class="added" @click="count(1)"/>
              </div>
            </div>
          </div>
          <div class="bottom t-c" @click="goBuy">
            确认
          </div>
        </div>
      </div>
      <ball :type="2"></ball>
    </div>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import mHeader from '../components/header'
  import guessList from '../components/twocolumn'
  //  import BScroll from 'better-scroll'
  import { Badge } from 'vux'
  import noLoginFooter from '../components/noLoginBuyFooter'
  import ball from '../components/ball'
  import { bus } from '../util/util'
  import loading from '../components/loading'

  export default {
    name: 'detail',
    components: {swiper, swiperSlide, mHeader, guessList, Badge, noLoginFooter, ball, bus, loading},
    data () {
      return {
        villageId: localStorage.getItem('m-villageId'),
        swiperList: [],
        title: '商品详情',
        goodsDetail: '',
        detailInfo: '',
        goodsList: [],
        collectId: '',
        collectFlag: '',
        opcity: 0,
        login: true,
        swiperOption: {
          notNextTick: true,
          autoplay: 3000,
          pagination: '.swiper-pagination'
        },
        clickTag: 0,
        loadingFlag: true,
        countNm: 1,
        close: false,
        token: localStorage.getItem('m-token'),
        shopStatus: 0 // 店铺状态
      }
    },
    created () {
      if (this.$route.query.shopStatus) {
        this.shopStatus = Number(this.$route.query.shopStatus)
      }
      if (!this.token) {
        this.noLogin()
      } else {
        this.hasLogin()
      }
    },
    methods: {
      getDetail () {
        if (!localStorage.getItem('m-token')) {
          this.$router.push({path: 'login'})
          return
        }
        this.post('/goods/goodsDetail', {
          goodsId: this.$route.query.goodsId,
          token: localStorage.getItem('m-token'),
          villageId: this.villageId
        }).then((res) => {
          if (res.data.code === 100) {
            this.goodsDetail = res.data.goodsDetail
            if (res.data.goodsDetail.isCollect === 1) {
              this.collectFlag = true
            } else {
              this.collectFlag = false
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
      },
      hasLogin () {
        this.post('/goods/goodsDetail', {
          goodsId: this.$route.query.goodsId,
          token: localStorage.getItem('m-token'),
          villageId: this.villageId
        }).then((res) => {
          if (res.data.code === 100) {
            this.goodsDetail = res.data.goodsDetail
            this.detailInfo = res.data
            this.$store.commit('increment', res.data.totalBuyCount)
            this.$store.commit('changeTotalPrice', res.data.totalPrice)
            this.goodsList = res.data.listGoods
            this.swiperList = res.data.goodsDetail.imagesList
            this.computedSwiperLength()
            if (res.data.goodsDetail.isCollect === 1) {
              this.collectFlag = true
            } else {
              this.collectFlag = false
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
      noLogin () {
        this.post('/goods/goodsDetail', {
          goodsId: this.$route.query.goodsId,
          villageId: this.villageId
        }).then((res) => {
          if (res.data.code === 100) {
            this.goodsDetail = res.data.goodsDetail
            this.detailInfo = res.data
            this.$store.commit('increment', res.data.totalBuyCount)
            this.$store.commit('changeTotalPrice', res.data.totalPrice)
            this.goodsList = res.data.listGoods
            this.swiperList = res.data.goodsDetail.imagesList
            this.computedSwiperLength()
            if (res.data.goodsDetail.isCollect === 1) {
              this.collectFlag = true
            } else {
              this.collectFlag = false
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
          this.loadingFlag = false
          this.login = false
        })
      },
      collectGoods () {
        this.getDetail()
        if (this.goodsDetail.isCollect === 0) {
          this.post('/collect/insertCollect', {
            goodsId: this.$route.query.goodsId,
            storeId: this.goodsDetail.storeId,
            token: localStorage.getItem('m-token'),
            status: 1,
            shopType: this.goodsDetail.shopType
          }).then((res) => {
            if (res.data.code === 100) {
              this.collectId = res.data.collectId
              this.collectFlag = true
              this.$vux.toast.text('收藏成功', 'middle')
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
          this.post('/collect/insertCollect', {
            goodsId: this.$route.query.goodsId,
            storeId: this.goodsDetail.storeId,
            token: localStorage.getItem('m-token'),
            status: 0,
            shopType: this.goodsDetail.shopType,
            collectId: this.goodsDetail.collectId
          }).then((res) => {
            if (res.data.code === 100) {
              this.collectFlag = false
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
      computedSwiperLength () {
        if (this.swiperList.length <= 1) {
          this.$refs.DetailSwiper.swiper.paginationContainer[0].style.display = 'none'
        }
      },
      onScroll (_this) {
        // 下滑渐现动画
        let scrollTop = -Math.round(_this.y)
        this.$refs.header.$el.style.opacity = scrollTop / 300
      },
      addCart (item) {
        // 没登录跳转登录
        if (!localStorage.getItem('m-token')) {
          this.$vux.toast.text('请登录', 'bottom')
          this.$router.push({path: 'login'})
          return
        }
        // 店铺状态
        if (this.shopStatus !== 0) {
          this.$vux.toast.text('门店休息中，不接收订单', 'center')
          return
        }
        // 限制点击速度
        if (this.clickTag === 0) {
          this.clickTag = 1
          if (item.shopType === 1) {
            this.storeId = localStorage.getItem('m-depotId')
          } else {
            this.storeId = localStorage.getItem('m-shopId')
          }
          this.post('/car/addCar', {
            token: localStorage.getItem('m-token'),
            goodsId: item.goodsId,
            buyCount: 1,
            shopType: item.shopType,
            type: 1,
            villageId: localStorage.getItem('m-villageId'),
            storeId: this.storeId
          }).then((res) => {
            if (res.data.code === 100) {
              this.detailInfo.totalPrice = res.data.totalPrice
              this.$store.commit('changeTotalPrice', res.data.totalPrice)
              bus.$emit('drop', this.$refs.cartBt)
              this.$store.commit('increment', res.data.totalBuyCount)
            }
            if (res.data.code === 101) {
              this.$vux.toast.text(res.data.msg, 'middle')
            }
            if (res.data.code === 102) {
              this.$vux.toast.text(res.data.msg, 'middle')
              localStorage.removeItem('m-token')
            }
          })
          setTimeout(() => {
            this.clickTag = 0
          }, 500)
        }
      },
      goFastBuy () {
        // 没登录跳转登录
        if (!localStorage.getItem('m-token')) {
          this.$vux.toast.text('请登录', 'bottom')
          this.$router.push({path: 'login'})
          return
        }
        // 店铺状态
        if (this.shopStatus !== 0) {
          this.$vux.toast.text('门店休息中，不接收订单', 'center')
          return
        }
        this.close = true
      },
      count (type) {
//        this.$router.push({path: '/order_enter'})
        if (type === 1) {
          if (this.countNm >= this.goodsDetail.kucun) {
            this.$vux.toast.text('该商品库存不足', 'center')
            return
          }
          this.countNm++
        }
        if (type === 2) {
          if (this.countNm <= 1) {
            this.$vux.toast.text('亲，不能再减了', 'center')
            return
          }
          this.countNm--
        }
      },
      async goBuy () {
        // 加入购物车
        if (this.goodsDetail.kucun <= 0) {
          this.$vux.toast.text('库存不足', 'center')
          return
        }
        await this.post('/car/addCar', {
          token: this.token,
          goodsId: this.goodsDetail.goodsId,
          buyCount: this.countNm,
          shopType: this.goodsDetail.shopType,
          storeId: this.goodsDetail.storeId,
          type: 3,
          villageId: localStorage.getItem('m-villageId')
        }).then((res) => {
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'middle')
            return
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'middle')
            localStorage.removeItem('m-token')
            return
          }
        })
        this.post('/car/quickOrder', {
          token: this.token,
          goodsId: this.goodsDetail.goodsId,
          buyCount: this.countNm,
          storeId: this.goodsDetail.storeId,
          shopType: this.goodsDetail.shopType,
          villageId: localStorage.getItem('m-villageId')
        }).then((res) => {
          if (res.data.code === 100) {
            console.log(res.data.carMap)
            // 判断没有收获地址
            if (!res.data.carMap.shippingInfo) {
              this.$vux.toast.text('当前无可用收货地址，请填写', 'middle')
              this.$router.push('/selecteAddress')
              return
            }
            var info = res.data.carMap
            // 收获地址信息
            this.$store.commit('saveShippingInfo', res.data.carMap.shippingInfo)
            // 及时送购物车相关信息
            this.$store.commit('saveThisShop', info.carList[0].shandianShop)
            // 及时送商品
            this.$store.commit('SaveCarOrderThisGoodsList', info.carList[0].shandianShop.goodsList)
            // 次日达商品
            this.$store.commit('SaveCarOrderNextGoodsList', [])
            // 及时送选择商品数量
            this.$store.commit('saveSelectedTotalCountThis', info.totalBuyCount)
            // 及时送总价
            var totalPriceThis = Number(info.carList[0].shandianShop.goodsList[0].buyCount) * Number(info.carList[0].shandianShop.goodsList[0].canKaoPrice)
            this.$store.commit('saveTotalPriceThis', totalPriceThis)
            // 及时送运费
            this.CThisfreight(info, totalPriceThis)
            // 合计
            this.$store.commit('saveOrderTotalPrice', 'fastBuy')
            this.$router.push({path: '/confirmOrder'})
          }
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'middle')
            return
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'middle')
            localStorage.removeItem('m-token')
            return
          }
        })
      },
      // 快速购买运费
      CThisfreight (info, totalPriceThis) {
        if (totalPriceThis >= info.carList[0].shandianShop.startPrice) {
          this.$store.commit('saveThisFreight', 0)
        } else {
          this.$store.commit('saveThisFreight', info.carList[0].shandianShop.freight.toFixed(1))
        }
      }
    },
    computed: {
      totalBuyCount () {
        return this.$store.state.totalBuyCount
      },
      totalPrice () {
        return this.$store.state.totalPrice
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";
  @import "../common/style/property";
  @import "../common/style/mlxin";

  .detail-wrap {
    .cp-header {
      opacity: 0;
      color: @font-color-m;
      z-index: 103;
    }
    .back-wrap {
      position: fixed;
      top: 0;
      .w(148);
      .h(92);
      .lh(92);
      z-index: 10000;
      text-align: center;
      /*.pt(20);
      .pb(20);
      .pr(20);
      .pl(20);*/
      .pb(58);
      .pr(58);
    }
    .back {
      .w(58);
      .h(58);
      .lh(58);
      border-radius: 50%;
      background: rgba(0, 0, 0, .4);
      color: #fff;
      .fs(32);
    }
    .content {
      .DetailSwiper {
        .pic {
          width: 100% !important;
          .h(750) !important;
        }
        img {
          width: 100% !important;
          .h(750) !important;
        }
      }
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      .b(100);
      z-index: 101;
      overflow: hidden;
      .loading {
        //        .h()
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
      }
      .des {
        position: relative;
        box-sizing: border-box;
        .h(332);
        .pt(15);
        background: #fff;
        .title {
          .pl(26);
          .h(54);
          .lh(54);
          .fs(36);
          color: #2a2a2a;
        }
        .price-wrap {
          .pl(26);
          .mt(24);
          .h(84);
          .lh(84);
          border-bottom: 1px solid #dfdedc;
          .this-price {
            color: @font-color-input;
            .fs(28);
            .lh(54);
            .s1 {
              .fs(20);
            }
            .number {
              .fs(28);
            }
          }
          .next-price {
            color: @theme-color-price;
            .fs(36);
            .lh(33);
            font-weight: bold;
            .s1 {
              .fs(26);
              .ml(20);
            }
            .number {
              .fs(36);
              .mr(52);
            }
          }
        }
        .size-des {
          .pt(9);
          .pl(26);
          color: #666;
          .fs(28);
          .size {
            .h(56);
            .lh(56);
          }
        }
        .collet-wrap {
          position: absolute;
          .r(30);
          .t(74);
          .pt(20);
          .pr(20);
          /* .pb(20);*/
          .pl(20);
          color: @theme-color;
        }
        .collect {
          .fs(41);
          color: @theme-color;
        }
      }
      .guess {
        .title {
          .h(84);
          .bg-image('../../assets/detail_recommend');
          background-repeat: no-repeat;
          background-position: center center;
          background-color: #f7f7f7;
          background-size: 43% 39%;
        }
      }
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
          .t(16);
          background: @theme-color;
          .w(68);
          .h(68);
          border-radius: 50%;
          .iconfont {
            .fs(38);
            color: #fff;
          }
          .badge {
            position: absolute;
            .h(30);
            .r(20);
            .t(0);
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
          .ml(20);
          .h(100);
          .lh(100);
          .fs(30);
          color: @theme-color-price;
          span {
            .fs(33);
          }
        }
      }
      .button {
        position: absolute;
        right: 0;
        .w(185);
        .h(100);
        .lh(100);
        background: @theme-color;
        color: #fff;
        .fs(32);
      }
      .buy {
        .r(185);
        background: #fe5739;
      }
    }
    .fast-buy {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .3);
      z-index: 100109;
      .inner {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        .h(448);
        .top {
          width: 100%;
          .h(348);
          background: #fff;
          .des {
            .pl(300);
            .h(220);
            display: flex;
            align-items: center;
            .lh(80);
            .fs(35);
            .pic {
              position: absolute;
              .w(235);
              .h(235);
              .l(38);
              .t(-50);
              box-sizing: border-box;
              border-radius: 5px;
              border: 3px solid #ddd;
            }
            .close-icon {
              position: absolute;
              .r(0);
              .t(0);
              .fs(32);
              color: @theme-color;
              .pl(40);
              .pr(20);
              .pb(40);
              .pt(20);
            }
          }
          .count {
            box-sizing: border-box;
            border-top: 1px solid @theme-color;
            display: flex;
            justify-content: space-between;
            align-content: center;
            .h(128);
            .lh(128);
            .pl(43);
            .pr(43);
            .fs(32);
            .count-box {
              display: flex;
              align-items: center;
              .remove {
                box-sizing: border-box;
                .h(55);
                .w(60);
                background-color: #fff;
                border: 1px solid #ddd;
                border-radius: 5px;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                position: relative;
              }
              .remove:before {
                content: '';
                .w(32);
                .h(2.4);
                background-color: #444;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: @font-color-input;
              }
              .val-box {
                box-sizing: border-box;
                .w(68);
                .h(55);
                .lh(50);
                text-align: center;
                color: #666;
                outline: none;
                -webkit-appearance: none;
                border-radius: 0;
                border: 1px solid #ddd;
                border-left: none;
                border-right: none;
                .fs(32);
              }
              .added {
                box-sizing: border-box;
                .h(55);
                .w(60);
                background-color: #fff;
                border: 1px solid #ddd;
                border-radius: 5px;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                position: relative;
              }
              .added:before {
                content: '';
                .w(32);
                .h(2.4);
                background-color: #444;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
              .added:after {
                content: '';
                .h(32);
                .w(2.4);
                background-color: #444;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
          }
        }
        .bottom {
          width: 100%;
          .h(100);
          .lh(100);
          background: @theme-color;
          .fs(32);
          color: #fff;
        }
      }
    }
  }
</style>
