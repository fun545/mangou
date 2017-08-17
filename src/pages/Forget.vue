<template>
  <div @touchmove.prevent>
    <!--<forget header="忘记密码" :type="type" @userMsg="userMsg"></forget>-->
    <!--<forget></forget>-->
    <forget-page header="忘记密码" :type="3" btText="确认" :postAjax="postAjax"></forget-page>
  </div>
</template>

<script>
  import forgetPage from '../components/registerForget.vue'
  import { md5 } from 'vux'
  export default {
    name: 'forget',
    components: {forgetPage, md5},
//    data () {
//      return {
//        token: localStorage.getItem('m-token')
//      }
//    },
//    created () {},
    methods: {
//      userMsg (res) {
//        console.log(res)
//      },
      postAjax (tel, code, pass) {
        console.log(tel, code, pass)
        this.post('/user/insertUser', {
//          token: this.token,
          phone: tel,
          userPwd: pass,
          type: 3,
          cityId: localStorage.getItem('m-cityId'),
          code: md5(code)
        }).then((res) => {
          if (res.data.code === 100) {
            this.$vux.toast.text('密码修改成功', 'center')
            this.$router.push('/user')
          }
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'center')
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'center')
            localStorage.removeItem('m-token')
          }
        })
      }
    }
  }
</script>

<style>

</style>
