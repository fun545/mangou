<template>
  <order-list title="待评价" :status="status"></order-list>
</template>

<script>
  import OrderList from '../components/OrderList'
  export default{
    name: 'orderRaterList',
    components: {OrderList},
    data () {
      return {
        status: 6
      }
    }
  }
</script>
