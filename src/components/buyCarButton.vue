<template>
  <div class="shop-cart-wrap" @click="add($el,goods,index)">
    <i class="iconfont shop-car" ref="icon" v-if="goods.status===1" :class="{'shop-status':shopStatus!==0}">&#xe658;</i>
    <div v-if="goods.status!==1" class="no-goods">已售罄</div>
  </div>
</template>

<script>
  import { bus } from '../util/util'

  export default {
    props: {
      goodsList: Array,
      goods: Object,
      // 店铺状态
      shopStatus: {
        type: Number,
        default: 0
      },
      index: Number
    },
    data () {
      return {
        clickTag: 0,
        statusFlag: false
      }
    },
    methods: {
      add (el, item, index) {
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
          // 库存不足
          if (item.kucun - item.buyCount <= 0) {
            this.$vux.toast.text('该商品存库不足', 'middle')
            return
          }
          // 限购 IsPurchase：1 为开启限购
          if (item.isPurchase === 1) {
            if (item.buyCount >= Number(item.purchaseCount)) {
              this.$vux.toast.text(`亲，该商品每人限购数量为${item.purchaseCount}喔`, 'middle')
              return
            }
          }
//          if (item.kucun > 0) {
//            bus.$emit('drop', el)
//          }
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
              bus.$emit('drop', el)
              this.$store.commit('increment', res.data.totalBuyCount)
              this.$store.commit('changeTotalPrice', res.data.totalPrice)
//              item.buyCount = res.data.buyCount
//              bus.$emit('updateOneColumCount', this.goodsList, this.index, this.count)
              this.$emit('updateColumCount', this.goodsList, this.index, res.data.buyCount)
//              this.goodsItem.buyCount = res.data.buyCount
            }
            if (res.data.code === 101) {
              if (res.data.msg === '该商品存库不足') {
                item.kucun = 0
              }
              this.$vux.toast.text(res.data.msg, 'middle')
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
//    computed: {
//      goodsItem () {
//        return this.$store.state.goodsItem
//      }
//    }
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
    .w(60);
    .h(60);
    .lh(58);
    .fs(25);
    display: inline-block;
    text-align: center;
    color: @theme-color;
    border: 1px solid @disabled-color;
    border-radius: 50%;
    /*.pl(10);
    .pr(10);
    .pt(10);
    .pb(10);*/
  }
</style>
