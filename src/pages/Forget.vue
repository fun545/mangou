<template>
  <div @touchmove.prevent>
    <forget-page header="忘记密码" :type="3" btText="确认" :postAjax="postAjax"></forget-page>
  </div>
</template>

<script>
  import forgetPage from '../components/registerForget.vue'
  import { md5 } from 'vux'
  export default {
    name: 'forget',
    components: {forgetPage, md5},
    methods: {
      postAjax (tel, code, pass) {
        this.post('/user/insertUser', {
          phone: tel,
          userPwd: md5(pass),
          type: 3,
          cityId: localStorage.getItem('m-cityId'),
          areaId: localStorage.getItem('m-areaId'),
          code: md5(code),
          villageId: localStorage.getItem('m-villageId')
        }).then((res) => {
          if (res.data.code === 100) {
            this.$vux.toast.text('密码修改成功', 'center')
            this.$router.push('/user')
          }
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'middle')
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'middle')
            localStorage.removeItem('m-token')
          }
        })
      }
    }
  }
</script>
