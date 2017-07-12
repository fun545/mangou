<template>
  <div class="detail-wrap">
    <m-header :title="title">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <div class="content">
      <div>
        <swiper :aspect-ratio="632/750" dots-position="center" auto loop :list="swiperList"></swiper>
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
    <div class="bt-shop-car">
      <div class="left">
        <div class="shop-car">

        </div>
      </div>
      <div class="right">

      </div>
    </div>
  </div>
</template>

<script>
  import { Swiper } from 'vux'
  import mHeader from '../components/header'
  import guessList from '../components/twocolumn'
  export default {
    components: {Swiper, mHeader, guessList},
    data () {
      return {
        token: localStorage.getItem('m-token'),
        villageId: localStorage.getItem('m-villageId'),
        swiperList: [],
        title: '商品详情',
        goodsDetail: '',
        goodsList: [],
        collectId: '',
        collectFlag: ''
      }
    },
    created () {
      this.post('/goods/goodsDetail', {
        goodsId: this.$route.query.goodsId,
        token: this.token,
        villageId: this.villageId
      }).then((res) => {
        if (res.data.code === 100) {
          console.log(res.data)
          this.goodsDetail = res.data.goodsDetail
          this.goodsList = res.data.listGoods
          this.getImgList(res.data.goodsDetail.imagesList)
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
    methods: {
      getDetail () {
        this.post('/goods/goodsDetail', {
          goodsId: this.$route.query.goodsId,
          token: this.token,
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
      getImgList (urlList) {
        for (let i = 0; i < urlList.length; i++) {
          const urlObj = {}
          urlObj.img = urlList[i]
          this.swiperList.push(urlObj)
        }
      },
      collectGoods () {
        this.getDetail()
        if (this.goodsDetail.isCollect === 0) {
          this.post('/collect/insertCollect', {
            goodsId: this.$route.query.goodsId,
            storeId: this.goodsDetail.storeId,
            token: this.token,
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
            token: this.token,
            status: 0,
            shopType: this.goodsDetail.shopType,
            collectId: this.goodsDetail.collectId
          }).then((res) => {
            this.collectFlag = false
          })
        }
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
      color: #fff;
      background: @theme-color;
      .back {
        color: #fff;
      }
    }
    .content {
      position: absolute;
      .t(92);
      left: 0;
      right: 0;
      .b(100);
      z-index: 101;
      overflow-y: scroll;
      overflow-x: hidden;
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
          .mt(54);
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
          .t(24);
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
  }
</style>
