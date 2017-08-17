<template>
  <div class="regist" @touchmove.prevent>
    <!--<forget header="忘记密码" :type="type" @userMsg="userMsg"></forget>-->
    <!--<forget></forget>-->
    <forget-page header="注册" :type="1" btText="注册" :postAjax="postAjax">
      <div class="agreement-box" slot="agree">
        <check-icon type="plain" class="agree-icon" :value.sync="agreeFlag"></check-icon>
        同意
        <router-link to="/registAreement">
          <a class="agreement-content">漫购注册协议</a>
        </router-link>
      </div>
    </forget-page>
  </div>
</template>

<script>
  import forgetPage from '../components/registerForget.vue'
  import { md5, CheckIcon } from 'vux'
  export default {
    name: 'forget',
    components: {forgetPage, md5, CheckIcon},
    data () {
      return {
        agreeFlag: true
      }
    },
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
          type: 1,
          cityId: localStorage.getItem('m-cityId'),
          code: md5(code)
        }).then((res) => {
          console.log(res.data)
          if (res.data.code === 100) {
            this.$vux.toast.text('注册成功', 'center')
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

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .regist {
    .register-view .content .bt-box {
      border-top:0;
      .pt(30);
    }
  }

  .agreement-box {
    border-top: 2px solid #eee;
    color: @font-color-m;
    .mt(20);
    .pl(20);
    .pt(10);
    .agree-icon {
      .weui-icon {
        .fs(29);
      }
    }
    .agreement-content {
      color: @font-color-m;
      .fs(25);
      text-decoration: underline;
    }
  }
</style>
