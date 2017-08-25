<template>
  <div class="active">
    <div>
      <m-header :title="title">
        <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
      </m-header>
      <div class="scroll" v-if="isActive" ref="content">
        <div>
          <div class="activePic">
            <img v-lazy="keyBanleImages" alt="">
            <!--<lazy-image-->
            <!--:src='keyBanleImages'-->
            <!--:placeholder='$store.state.defaultImg'-->
            <!--:events="['touchmove']"-->
            <!--&gt;</lazy-image>-->
          </div>
          <div class="content">
            <div class="item" v-for="(item ,index) in goodsList" :key="index">
              <div class="pic f-l" @click="$router.push({
          path: '/goods_detail',
          query: {goodsId: item.goodsId}
        })">
                <img v-lazy="item.goodsImgUrl" alt="" width="100%" height="100%">
                <!--<lazy-image-->
                <!--:src='item.goodsImgUrl'-->
                <!--:placeholder='$store.state.defaultImg'-->
                <!--:events="['touchmove']"-->
                <!--class="lazy-pic"-->
                <!--&gt;</lazy-image>-->
              </div>
              <div class="des f-l">
                <h3 class="name">{{item.goodsName}}</h3>
                <p class="next-price">次日价：<span class="s1">¥</span><span class="number">{{item.price}}</span></p>
                <!--<div class="iconfont shop-car t-c">&#xe613;</div>-->
                <shop-car-button :goods="item"></shop-car-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <no-page :isActive="isActive"></no-page>
    </div>
    <loading :loadingFlag="loadingFlag" class="loading"></loading>
    <ball :type="3"></ball>
  </div>
</template>

<script>
  import { Badge } from 'vux'
  import mHeader from '../components/header'
  import noPage from '../components/noPage'
  import loading from '../components/loading'
  import ball from '../components/ball'
  import shopCarButton from '../components/buyCarButton'
  import BScroll from 'better-scroll'
  export default {
    name: 'active',
    components: {mHeader, noPage, loading, ball, shopCarButton, Badge, BScroll},
    data () {
      return {
        goodsList: [],
        title: this.$route.query.remarks,
        isActive: true,
        keyBanleImages: this.$route.query.keyBanleImages,
        loadingFlag: true,
        token: localStorage.getItem('m-token')
      }
    },
    created () {
      var parmas = {}
      if (this.token) {
        parmas.token = this.token
      }
      parmas.keyWordId = this.$route.query.keyId
      this.post('/goods/getLabelGoods', parmas).then((res) => {
        if (res.data.code === 100) {
          this.goodsList = res.data.goodsList
          this.$nextTick(() => {
            this._initScroll()
          })
          if (this.goodsList.length === 0) {
            this.isActive = false
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
    methods: {
      _initScroll () {
        this.contentScroll = new BScroll(this.$refs.content, {
          click: true,
          disableMouse: true
        })
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

  .active {
    height: 100% !important;
    width: 100%;
    .cp-header {
      background: @theme-color;
      color: #fff;
      .back {
        color: #fff;
      }
    }
  }

  .scroll {
    position: absolute;
    .t(92);
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    .activePic {
      width: 100%;
      .h(314);
      div {
        .h(314);
      }
      img {
        width: 100%;
        height: 100%;
        border: none;
      }
    }
    .content {
      background: #eee;
      .item {
        box-sizing: border-box;
        .w(700);
        .h(292);
        margin: 0 auto;
        border: 1px solid #2c92ab;
        background: #fff;
        .mt(18);
        .pic {
          .mt(10);
          .ml(28);
          .w(268);
          .h(268);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .des {
          position: relative;
          .w(396);
          .h(288);
          .name {
            .fs(33);
            .h(33);
            .lh(33);
            .pl(96);
            .mt(57);
            color: #2f2f2f;
          }
          .next-price {
            .mt(86);
            .pl(82);
            color: #0191a6;
            .fs(28);
            .s1 {
              color: @theme-color-price;
            }
            .number {
              .fs(38);
              color: @theme-color-price;
            }
          }
          .shop-cart-wrap {
            position: absolute;
            .r(22);
            .b(81);
            .iconfont.shop-car {
              color: #07b3e0;
              border: 1px solid #07b3e0;
            }
          }
        }
      }
    }
  }

  .loading {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    .t(92);
  }

</style>
