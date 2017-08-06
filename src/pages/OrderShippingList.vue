<template>
  <order-list title="配送中" :status="status"></order-list>
</template>

<script>
  import OrderList from '../components/OrderList'
  export default{
    name: 'orderShippingList',
    components: {OrderList},
    data () {
      return {
        status: 3
      }
    }
  }
</script>
