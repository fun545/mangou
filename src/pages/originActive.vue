<template>
  <div>
    <div class="origin-active">
      <div class="top">
        <m-header :title="title">
          <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
        </m-header>
        <div class="title t-c">
          <span class="text" :class="{'active':index===1}" @click="sort(2,1)">综合</span><i
          class="iconfont icon">&#xe646;</i>
          <span class="text" :class="{'active':index===2}" @click="sort(3,2)">销量</span><i
          class="iconfont icon">&#xe646;</i>
          <span class="text" :class="{'active':index===3}" @click="sort(1,3)">价格</span>
        </div>
      </div>
      <scroll class="content">
        <div>
          <origin-list :goodsList="goodsList"></origin-list>
        </div>
      </scroll>
    </div>
    <count-footer :login="!!token"></count-footer>
    <loading :loadingFlag="loadingFlag"></loading>
    <ball :type="2"></ball>
  </div>
</template>

<script>
  //  import { mapMutations } from 'vuex'
  import mHeader from '../components/header'
  import originList from '../components/twocolumn'
  import loading from '../components/loading'
  import ball from '../components/ball.vue'
  import countFooter from '../components/countFooter.vue'
  export default {
    components: {mHeader, originList, loading, ball, countFooter},
    name: 'originActive',
    data () {
      return {
        title: this.$route.query.remarks,
        goodsList: [],
        softType: 2,
        index: 1,
        loadingFlag: true,
        token: localStorage.getItem('m-token')
      }
    },
    created () {
      this.sort(2, 1)
    },
    methods: {
//      ...mapMutations([
//        'INCREMENT',
//        'CHANGE_TOTAL_PRICE'
//      ]),
      sort (softType, index) {
        this.index = index
        var paramas = {}
        paramas.keyWordId = this.$route.query.goodsId
        paramas.softType = softType
        if (this.token) {
          paramas.token = this.token
        }
        this.post('/goods/getLabelGoods', paramas).then((res) => {
          if (res.data.code === 100) {
            this.$store.commit('increment', res.data.totalBuyCount)
            this.$store.commit('changeTotalPrice', res.data.totalPrice)
            this.goodsList = res.data.goodsList
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
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .origin-active {
    .top {
      .cp-header {
        color: #fff;
        background: @theme-color;
        .back {
          color: #fff;
        }
      }
      .title {
        .h(80);
        .lh(80);
        .fs(33);
        .mt(92);
        background: #fff;
        color: @font-color-m;
        .icon {
          .ml(27);
        }
        .active {
          color: @theme-color;
        }
      }
    }
    .content {
      .goods-detail-wrap {
        .mt(10);
      }
      position: absolute;
      overflow: hidden;
      .t(182);
      left: 0;
      right: 0;
      .b(100);
    }
  }
</style>
