<template>
  <div class="count-fonter">
    <div class="buy-car">
      <div class="icon d-ib" :class="{'disabled-bg-color':!login}">
        <i class="iconfont center">&#xe613;</i>
        <div class="badge">
          <badge :text="totalBuyCount" v-if="totalBuyCount"></badge>
        </div>
      </div>
      <div class="text d-ib">
        <div v-if="login">合计：<span>￥{{totalPrice}}</span></div>
        <div v-if="!login" class="disabled-color" @click="$router.push('/login')">去登录</div>
      </div>
    </div>
    <div class="button t-c" @click="$router.push('/cart')" :class="{'disabled-bg-color':!login}" v-if="login">
      立即结算
    </div>
    <div class="button t-c" @click="$router.push('/login')" :class="{'disabled-bg-color':!login}" v-if="!login">
      去登录
    </div>
  </div>
</template>

<script>
  import { Badge } from 'vux'
  import { mapState } from 'vuex'
  export default {
    components: {
      Badge
    },
    props: {
      login: Boolean
    },
    computed: {
      ...mapState([
        'totalPrice',
        'totalBuyCount'
      ])
    }
//    data () {
//      return {
//        token: ''
//      }
//    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .count-fonter {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    border-top: 1px solid #eee;
    background: #fff;
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
      background: @theme-color;
      color: #fff;
      .fs(32);
    }
    .buy {
      .r(185);
      background: @theme-color;
    }
    /*.disabled-color {*/
    /*background: #d2d2d2;*/
    /*}*/
  }
</style>
