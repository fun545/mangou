<template>
  <i class="iconfont shop-car" @click="add(goods)">&#xe613;</i>
</template>

<script>

  export default {
    props: {
      goods: Object
    },
    methods: {
      add (item) {
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
          if (res.data.code === 102) {
            this.$router.push({path: 'login'})
            return
          }
          if (res.data.code === 100) {
            console.log(res.data)
          }
        })
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
