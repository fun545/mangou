<template>
  <div class="shop-cart-wrap" @click="add($el,goods)">
    <i class="iconfont shop-car" ref="icon">&#xe613;</i>
  </div>
</template>

<script>
  import { bus } from '../util/util'
  export default {
    props: {
      goods: Object
    },
    components: {
      bus
    },
    data () {
      return {
        clickTag: 0
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
            }
            if (res.data.code === 101) {
              this.$vux.toast.text(res.data.msg, 'top')
              localStorage.removeItem('m-token')
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
    .pl(35);
    .pr(15);
    .pt(15);
    .pb(15);
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
