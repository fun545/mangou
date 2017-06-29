<template>
  <div class="sign-view">
    <!-- 页面头图 -->
    <img src="../assets/login_top_bj.png" width="100%" alt="">
    <!-- 登录表单 -->
    <div class="sign-box">
      <div class="sign-input-box">
        <div class="iconfont">&#xe643;</div>
        <input type="tel" v-model="phone" maxlength="11" placeholder="手机号" class="sign-input">
        <get-code class="get-code" active-class="get-code-disable" :phone="phone"></get-code>
      </div>
      <div class="sign-input-box">
        <div class="iconfont">&#xe642;</div>
        <input type="tel" v-model="code" maxlength="6" placeholder="验证码" class="sign-input">
      </div>
      <div class="sign-in-btn" @click="signIn">登录</div>
    </div>
    <!-- 分割线 -->
    <div class="divider">使用第三方账号登录</div>
    <!-- 第三方账号登录入口 -->
    <div class="auth-box">
      <div class="auth-item"><img src="../assets/btn_wechat.png" width="100%" alt=""></div>
      <div class="auth-item"><img src="../assets/btn_qq.png" width="100%" alt=""></div>
    </div>
  </div>
</template>

<script>
  import GetCode from '../components/GetCode'

  export default{
    components: {GetCode},
    data () {
      return {
        phone: '',
        code: ''
      }
    },
    methods: {
      signIn () {
        if (!(this.code && this.phone)) {
          return this.$vux.alert.show({content: '请入手机号与验证码'})
        }

        if (!/^1[34578]\d{9}$/.test(this.phone)) {
          return this.$vux.alert.show({content: '请输入合法的手机号'})
        }

        this.$http.post('/path/sign-in', {phone: this.phone, code: this.code}).then(res => {
          res.data.code === 100 ? this.$router.go(-1) : this.$vux.alert.show({content: '登录失败'})
        }, () => {
          this.$vux.alert.show({content: '访问服务器出错'})
        })
      }
    }
  }
</script>

<style lang="less">
  .sign-view {
    background-color: #fff;
  }

  .sign-view .sign-box {
    padding: 20px 30px;

    .sign-input-box {
      display: flex;
      margin-top: 20px;
      padding: 5px;
      line-height: 30px;
      border-radius: 100px;
      border: 1px solid #ddd;
      position: relative;
    }

    .iconfont {
      text-align: center;
      width: 30px;
      color: #ff5500;
    }

    .sign-input {
      flex-grow: 1;
      border: none;
      outline: none;
    }

    .get-code {
      padding: 0 10px;
      border-radius: 15px;
      font-size: 12px;
      white-space: nowrap;
      color: #fff;
      background-color: #ff5500;
      transition: all 400ms;
      position: absolute;
      top: 5px;
      right: 5px;
    }

    .get-code-disable {
      color: #666666;
      background-color: #d9d9d9;
    }

    .sign-in-btn {
      margin: 50px 0;
      padding: 8.5px 0;
      border-radius: 100px;
      color: #fff;
      background-color: #ff5500;
      font-size: 16px;
      text-align: center;
    }
  }

  .sign-view .divider {
    margin: 0 auto;
    display: table;
    font-size: 13px;
    color: #bbbbbb;
    position: relative;

    &:before {
      content: '';
      height: 1px;
      width: 50vw;
      background-color: #eee;
      transform: translateX(-100%);
      position: absolute;
      top: 50%;
      left: -10px;
    }

    &:after {
      content: '';
      height: 1px;
      width: 50vw;
      background-color: #eeeeee;
      transform: translateX(100%);
      position: absolute;
      top: 50%;
      right: -10px;
    }
  }

  .sign-view .auth-box {
    display: flex;
    padding: 20px 0 40px 0;
    justify-content: center;

    .auth-item {
      width: 60px;
      margin: 0 10px;
    }
  }
</style>
