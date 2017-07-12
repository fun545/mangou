<template>
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
    <div class="content">
      <origin-list :goodsList="goodsList"></origin-list>
    </div>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  import originList from '../components/twocolumn'
  export default {
    components: {mHeader, originList},
    data () {
      return {
        title: this.$route.query.remarks,
        goodsList: [],
        softType: 2,
        index: 1
      }
    },
    created () {
      this.sort(2, 1)
    },
    methods: {
      sort (softType, index) {
        this.index = index
        this.post('/goods/getLabelGoods', {keyWordId: this.$route.query.goodsId, softType: softType}).then((res) => {
          if (res.data.code === 100) {
            this.goodsList = res.data.goodsList
          }
          console.log(res.data)
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
        color: #3f3f3f;
        .back {
          color: #3f3f3f;
        }
      }
      .title {
        .h(60);
        .lh(60);
        .fs(32);
        .mt(92);
        background: #fff;
        color: @font-color-m;
        .icon {
          .ml(27);
        }
        .active {
          color: @theme-color-blue;
        }
      }
    }
    .content {
      .goods-detail-wrap {
        .mt(10);
      }
      position: absolute;
      .t(152);
      overflow-y: scroll;
      overflow-x: hidden;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
</style>
