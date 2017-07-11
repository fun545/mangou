<template>
  <div>
    <!--<div class="header t-c">-->
    <!--<span class="back iconfont" @click="$router.back(-1)">&#xe600;</span>-->
    <!--预售团购-->
    <!--</div>-->
    <m-header :title="title">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <div class="scroll">
      <div class="activePic">

      </div>
      <div class="content">
        <div class="item" v-for="(item ,index) in goodsList" :key="index">
          <div class="pic f-l">
            <img v-lazy="item.goodsImgUrl" alt="">
          </div>
          <div class="des f-l">
            <h3 class="name">{{item.goodsName}}</h3>
            <p class="next-price">次日价：<span class="s1">¥</span><span class="number">{{item.price}}</span></p>
            <div class="iconfont shop-car t-c">&#xe613;</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  export default {
    components: {mHeader},
    data () {
      return {
        goodsList: [],
        title: '预售团购'
      }
    },
    created () {
      this.post('/goods/getLabelGoods', {keyWordId: this.$route.query.keyId}).then((res) => {
        if (res.data.code === 100) {
          this.goodsList = res.data.goodsList
          console.log(res.data)
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";

  .header {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    .h(92);
    .lh(92);
    .fs(40);
    background: #fff;
    color: #3d3634;
    .back {
      position: absolute;
      .t(50%);
      .mt(-17.5);
      .l(30);
      .fs(35);
      color: #07b3e0;
    }
  }

  .scroll {
    position: absolute;
    .t(92);
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    z-index: 101;
    .activePic {
      .h(314);
      .mt(24);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      background: #eee;
      .item {
        box-sizing: border-box;
        .w(700);
        .h(292);
        margin: 0 auto;
        border: 2px solid #2c92ab;
        background: #fff;
        .mt(18);
        .pic {
          .mt(10);
          .ml(28);
          .w(268);
          .h(268);
          background: red;
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
              color: #ff0000;
            }
            .number {
              .fs(38);
              color: #ff0000;
            }
          }
          .iconfont.shop-car {
            .w(50);
            .h(50);
            .lh(50);
            box-sizing: border-box;
            /*background: red;*/
            .fs(36);
            color: #07b3e0;
            border: 1px solid #07b3e0;
            border-radius: 50%;
            position: absolute;
            .r(62);
            .b(51);
          }
        }
      }
    }
  }

</style>
