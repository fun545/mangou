<template>
  <div class="shop-cart-wrap" @click="add($el,goods)">
    <i class="iconfont shop-car" ref="icon" v-if="goods.status===1" :class="{'shop-status':shopStatus!==0}">&#xe613;</i>
    <div v-if="goods.status!==1" class="no-goods">已售罄</div>
  </div>
</template>

<script>
  import { bus } from '../util/util'
  export default {
    props: {
      goods: Object,
      // 店铺状态
      shopStatus: {
        type: Number,
        default: 0
      }
    },
    components: {
      bus
    },
    data () {
      return {
        clickTag: 0,
        statusFlag: false
      }
    },
    methods: {
      async add (el, item) {
        // 没登录跳转登录
        if (!localStorage.getItem('m-token')) {
          this.$vux.toast.text('请登录', 'bottom')
          this.$router.push({path: '/login'})
          return
        }
        // 店铺状态
        if (this.shopStatus !== 0) {
          this.$vux.toast.text('门店休息中，不接收订单', 'middle')
          return
        }
        if (item.status !== 1) {
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
          await this.post('/car/addCar', {
            token: localStorage.getItem('m-token'),
            goodsId: item.goodsId,
            buyCount: 1,
            shopType: item.shopType,
            type: 1,
            villageId: localStorage.getItem('m-villageId'),
            storeId: this.storeId
          }).then((res) => {
            if (res.data.code === 100) {
              bus.$emit('drop', el)
              this.$store.commit('increment', res.data.totalBuyCount)
              this.$store.commit('changeTotalPrice', res.data.totalPrice)
            }
            if (res.data.code === 101) {
              this.$vux.toast.text(res.data.msg, 'top')
            }
            if (res.data.code === 102) {
              this.$vux.toast.text(res.data.msg, 'top')
              localStorage.removeItem('m-token')
              this.$router.push({path: '/login'})
            }
          })
          this.clickTag = 0
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .shop-cart-wrap {
    position: absolute;
    .pl(15);
    .pr(15);
    .pt(15);
    .pb(15);
    .no-goods {
      display: inline-block;
      .fs(24);
      .pr(10);
      .pl(10);
      background: #ddd;
      border-radius: 10px;
      color: #fff;
    }
    .shop-status {
      color: #ddd !important;
      border-color: #ddd !important;
    }
  }

  .iconfont.shop-car {
    .w(50);
    .h(50);
    .lh(39);
    .fs(30);
    text-align: center;
    color: @theme-color;
    border: 1px solid @theme-color;
    border-radius: 50%;
    .pl(6);
    .pr(6);
    .pt(5);
    .pb(5);
  }
</style>
