<template>
  <order-list title="待发货" :status="status"></order-list>
</template>

<script>
  import OrderList from '../components/OrderList'
  export default{
    name: 'orderSendList',
    components: {OrderList},
    data () {
      return {
        status: 2
      }
    }
  }
</script>
