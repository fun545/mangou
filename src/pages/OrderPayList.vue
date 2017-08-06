<template>
  <order-list title="待付款" :status="status"></order-list>
</template>

<script>
  import OrderList from '../components/OrderList'
  export default{
    name: 'orderPayList',
    components: {OrderList},
    data () {
      return {
        status: 1
      }
    }
  }
</script>
