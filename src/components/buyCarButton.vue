<template>
  <i class="iconfont shop-car" @click="add($el,goods)" ref="icon">&#xe613;</i>
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
//              console.log(res.data)
              this.$store.commit('increment', res.data.totalBuyCount)
            }
            if (res.data.code === 101) {
              this.$vux.toast.text(res.data.msg, 'top')
            }
            if (res.data.code === 102) {
              this.$vux.toast.text(res.data.msg, 'top')
            }
          })
          this.clickTag = 0
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .iconfont.shop-car {
    .w(48);
    .h(48);
    .lh(48);
    .fs(38);
    text-align: center;
    color: @theme-color;
    border: 1px solid @theme-color;
    border-radius: 50%;
    .pl(4);
    .pr(4);
    .pt(4);
    .pb(4);
    position: absolute;
    .ml(-25);
  }
</style>
