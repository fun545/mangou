<template>
  <forget header="忘记密码" :type="type" :post="post"></forget>
</template>

<script>
  import forget from '../components/registerForget'
  export default {
    components: {forget},
    data () {
      return {
        type: 2
      }
    },
    created () {},
    methods: {
      post () {
        console.log('dfsads')
      }
    }
  }
</script>

<style>

</style>
