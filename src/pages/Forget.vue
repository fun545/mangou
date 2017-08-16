<template>
  <div>
    <!--<forget header="忘记密码" :type="type" @userMsg="userMsg"></forget>-->
    <!--<forget></forget>-->
    <forget-page></forget-page>
  </div>
</template>

<script>
  import forgetPage from '../components/registerForget.vue'
  export default {
    name: 'forget',
    components: {forgetPage}
//    data () {
//      return {
//        type: 3
//      }
//    },
//    created () {},
//    methods: {
//      userMsg (res) {
//        console.log(res)
//      }
//    }
  }
</script>

<style>

</style>
