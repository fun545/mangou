<template>
  <order-list title="全部订单" :status="status"></order-list>
</template>

<script>
  import OrderList from '../components/OrderList'
  export default{
    name: 'order_List',
    components: {OrderList},
    data () {
      return {
        status: -1
      }
    }
  }
</script>
