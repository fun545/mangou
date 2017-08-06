<template>
  <order-list title="退款" :status="status"></order-list>
</template>

<script>
  import OrderList from '../components/OrderList'
  export default{
    name: 'orderAfterSaleList',
    components: {OrderList},
    data () {
      return {
        status: 4
      }
    }
  }
</script>
