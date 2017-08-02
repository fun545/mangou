<template>
  <div class="order-list-view">
    <!-- 页面标题 -->
    <x-header :left-options="{backText:''}">全部订单</x-header>
    <div class="content-view-scroller">
      <!-- 订单列表 及时送  -->
      <order-list :orderList="orderList">
      </order-list>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import orderList from '../components/orderItem.vue'
  export default{
    name: 'order_List',
    components: {
      XHeader,
      orderList
    },
    data () {
      return {
        orderList: []
      }
    },
    created () {
      this.post('/orders/getOrderList', {token: localStorage.getItem('m-token')}).then((res) => {
        console.log(res.data)
        if (res.data.code === 100) {
          this.orderList = res.data.orderList
        }
      })
      console.log(222)
    },
    methods: {}
  }
</script>

<style lang="less">
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .order-list-view .vux-header {
    background-color: #f78752;

    [class^=vux-header-] {
      color: #fff;
    }

    .left-arrow:before {
      border-color: #fff;
      border-width: 2px 0 0 2px;
    }
  }

  .order-list-view .content-view-scroller {
    height: calc(~'100% - 46px');
    overflow-y: scroll;
  }
</style>
