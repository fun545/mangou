<template>
  <div>
    <div class="detail-wrap">
      <m-header :title="title" ref="header">
        <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
      </m-header>
      <div class="content" ref="content">
        <div>
          <swiper :options="swiperOption" ref="DetailSwiper" class="DetailSwiper">
            <swiper-slide class="swiper-img" v-for="(item, index) in swiperList" :key="index">
              <!--<img :src="item" alt="">-->
              <lazy-image
                :src='item'
                :placeholder='$store.state.defaultImg'
                :events="['touchmove']"
                class="pic"
              ></lazy-image>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="des">
            <h3 class="title">{{goodsDetail.goodsName}}</h3>
            <div class="price-wrap">
              <p class="next-price d-ib">次日价：<span class="s1">¥</span><span class="number">{{goodsDetail.price}}</span>
              </p>
              <p class="this-price d-ib">即时价：<span class="s1">¥</span><span
                class="number">{{goodsDetail.canKaoPrice}}</span></p>
            </div>
            <div class="size-des">
              <p class="size">商品规格：{{goodsDetail.guige}}</p>
              <p class="numbering">商品编号：{{goodsDetail.huohao}}</p>
            </div>
            <div class="collet-wrap" @click="collectGoods">
              <div class="iconfont collect" v-if="collectFlag">&#xe641;</div>
              <div class="iconfont collect" v-if="!collectFlag">&#xe65d;</div>
            </div>
          </div>
          <div class="guess">
            <div class="title"></div>
            <div class="d-content">
              <guess-list :goodsList="goodsList"></guess-list>
            </div>
          </div>
        </div>
      </div>
      <div class="footer" v-if="login">
        <div class="buy-car">
          <div class="icon d-ib">
            <i class="iconfont center">&#xe613;</i>
            <div class="badge">
              <badge :text="totalBuyCount" v-if="totalBuyCount"></badge>
            </div>
          </div>
          <div class="text d-ib">
            合计：<span>￥50.55</span>
          </div>
        </div>
        <div class="button t-c" @click="addCart(goodsDetail)" ref="cartBt">
          加入购物车
        </div>
        <div class="button t-c buy">
          立即购买
        </div>
      </div>
      <no-login-footer v-if="!login"></no-login-footer>
      <ball :type="2"></ball>
    </div>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import mHeader from '../components/header'
  import guessList from '../components/twocolumn'
  import BScroll from 'better-scroll'
  import { Badge } from 'vux'
  import noLoginFooter from '../components/noLoginBuyFooter'
  import ball from '../components/ball'
  import { bus } from '../util/util'
  export default {
    name: 'detail',
    components: {swiper, swiperSlide, mHeader, guessList, BScroll, Badge, noLoginFooter, ball, bus},
    data () {
      return {
        villageId: localStorage.getItem('m-villageId'),
        swiperList: [],
        title: '商品详情',
        goodsDetail: '',
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
        clickTag: 0
      }
    },
    created () {
      if (!localStorage.getItem('m-token')) {
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
          if (res.data.code === 102) {
            this.$router.push({
              path: '/login'
            })
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
            this.goodsList = res.data.listGoods
            this.swiperList = res.data.goodsDetail.imagesList
            this.computedSwiperLength()
            if (res.data.goodsDetail.isCollect === 1) {
              this.collectFlag = true
            } else {
              this.collectFlag = false
            }
            this.$nextTick(() => {
              this._initScroll()
            })
          }
          if (res.data.code === 102) {
            this.$router.push({
              path: '/login'
            })
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
            this.goodsList = res.data.listGoods
            this.swiperList = res.data.goodsDetail.imagesList
            this.computedSwiperLength()
            if (res.data.goodsDetail.isCollect === 1) {
              this.collectFlag = true
            } else {
              this.collectFlag = false
            }
            this.$nextTick(() => {
              this._initScroll()
            })
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
            this.collectFlag = false
          })
        }
      },
      computedSwiperLength () {
        if (this.swiperList.length <= 1) {
          this.$refs.DetailSwiper.swiper.paginationContainer[0].style.display = 'none'
        }
      },
      _initScroll () {
        this.contentScroll = new BScroll(this.$refs.content, {
          click: true,
          probeType: 3
        })
        // 下滑渐现动画
        this.contentScroll.on('scroll', (pos) => {
          let scrollTop = -Math.round(pos.y)
          this.$refs.header.$el.style.opacity = scrollTop / 300
        })
      },
      addCart (item) {
        console.log(item)
        // 没登录跳转登录
        if (!localStorage.getItem('m-token')) {
          this.$vux.toast.text('请登录', 'bottom')
          this.$router.push({path: 'login'})
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
            console.log(res.data)
            if (res.data.code === 100) {
              bus.$emit('drop', this.$refs.cartBt)
              console.log(res.data)
              this.$store.commit('increment', res.data.totalBuyCount)
            }
            if (res.data.code === 101) {
              this.$vux.toast.text(res.data.msg, 'top')
            }
            if (res.data.code === 102) {
              this.$vux.toast.text(res.data.msg, 'top')
            }
          })
          setTimeout(() => {
            this.clickTag = 0
          }, 500)
        }
      }
    },
    computed: {
      totalBuyCount () {
        return this.$store.state.totalBuyCount
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
      .back {
        color: @font-color-m;
      }
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
            color: #888;
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
            color: @theme-color;
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
          .fs(26);
          .size {
            .h(56);
            .lh(56);
          }
        }
        .collect {
          position: absolute;
          .r(42);
          .t(94);
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
        .d-content {

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
          background: #fc5050;
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
          color: @font-color-m;
          span {
            color: @theme-color;
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
        background: #fc5050;
        color: #fff;
        .fs(32);
      }
      .buy {
        .r(185);
        background: #ffae00;
      }
    }
  }
</style>
