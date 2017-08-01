<template>
  <forget header="忘记密码" :type="type" @userMsg="userMsg"></forget>
</template>

<script>
  import forget from '../components/registerForget'
  export default {
    name: 'forget',
    components: {forget},
    data () {
      return {
        type: 3
      }
    },
    created () {},
    methods: {
      userMsg (res) {
        console.log(res)
      }
    }
  }
</script>

<style>

</style>
