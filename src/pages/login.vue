<template>
  <div class="login-view" @touchmove.prevent>
    <router-link to="/register">
      <div class="register">
        <span class="text">注册</span>
        <div class="icon d-ib">
          <i class="iconfont wrap">&#xe742;</i>
          <i class="iconfont inner">&#xe8d0;</i>
        </div>
      </div>
    </router-link>
    <span class="iconfont back" @click="$router.back(-1)">&#xe648;</span>
    <div class="header">
    </div>
    <div class="middle">
      <div class="form">
        <div class="input-box accountLogin fastLogin">
          <tab :line-width="1" active-color="#f95d43" defaultColor="#777" bar-active-color="#f95d43" class="title">
            <tab-item selected @on-item-click="changeLogin">手机快速登录</tab-item>
            <tab-item @on-item-click="changeLogin">账号密码登录</tab-item>
          </tab>
          <div v-if="!loginMethodFlag">
            <group gutter="0" class="group">
              <x-input v-model="tel" placeholder="请输入账号">
                <span slot="label" class="iconfont">&#xe63f;</span>
              </x-input>
            </group>
            <group gutter="0" class="group pass-group">
              <x-input v-model="userPassword" placeholder="请输入密码" type="password" @change.native="inPut"
                       class="pass-world">
                <span slot="label" class="iconfont">&#xe63e;</span>
              </x-input>
            </group>
          </div>
          <div v-if="loginMethodFlag">
            <group gutter="0" class="group">
              <x-input v-model="tel" placeholder="手机号" type="tel">
                <span slot="label" class="iconfont">&#xe618;</span>
              </x-input>
            </group>
            <get-code :codeType="type" @getCode="receiveCode" :tel="tel"></get-code>
          </div>
        </div>
        <router-link to="/forget">
          <div class="forget t-r">
            <i class="iconfont icon">&#xe628;</i>
            <span class="">
            忘记密码
          </span>
          </div>
        </router-link>
        <x-button class="submit-bt" @click.native="login">
          登录
        </x-button>
        <div class="agreement-box">
          <check-icon type="plain" class="agree-icon" :value.sync="agreeFlag"></check-icon>
          <router-link to="/agreement">
            <a class="agreement-content">软件许可及服务协议</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Tab, TabItem, Sticky, XInput, Group, XButton, CheckIcon, Popover, md5 } from 'vux'
  import getCode from '../components/_getCode'

  export default {
    name: 'login',
    components: {Tab, TabItem, Sticky, XInput, Group, XButton, CheckIcon, Popover, getCode, md5},
    data () {
      return {
        pass: '', // 默认快速登录密码
        tel: localStorage.getItem('m-phone'),
        loginMethodFlag: true,
        agreeFlag: true,
        type: 4,
        code: '', // 验证码
        loginType: 2, // 默认2 快速登录 1 账号登录
        userPassword: localStorage.getItem('m-passWord')
      }
    },
    methods: {
      changeLogin (index) {
        if (index === 0) {
          this.loginType = 2
          this.loginMethodFlag = true
          this.pass = this.code
        } else {
          this.loginMethodFlag = false
          this.loginType = 1
          this.pass = localStorage.getItem('m-passWord')
          this.userPassword = localStorage.getItem('m-passWord')
        }
      },
      receiveCode (code) {
        this.code = code
        this.pass = code
      },
      inPut () {
        if (this.userPassword.trim()) {
          this.pass = this.userPassword
        }
      },
      login () {
        if (!/^1\d{10}$/.test(this.tel)) {
          this.$vux.toast.text('手机号码错误', 'top')
          return
        }
        this.post('/user/login', {
          phone: this.tel,
          userPwd: md5(this.pass),
          loginType: this.loginType,
          villageId: localStorage.getItem('m-villageId'),
          cityId: localStorage.getItem('m-cityId'),
          areaId: localStorage.getItem('m-areaId')
        }).then((res) => {
          if (res.data.code === 100) {
            // vuex存储 token
            localStorage.setItem('m-token', res.data.userInfo.token)
            // 本地存储 token
            this.$store.state.token = res.data.userInfo.token
            // 存储 userInfo
            this.$store.commit('getUserInfo', res.data.userInfo)
            // 存储 购物车总数
            this.$store.commit('increment', res.data.userInfo.totalBuyCount)
            // 记住用户手机号
            localStorage.setItem('m-phone', this.tel)
            this.$store.state.login = true
            // 记住用户密码
            localStorage.setItem('m-passWord', this.userPassword)
            // 登录成功跳转个人中心
            this.$router.back()
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

<style lang="less">
  @import "../common/style/varlable";
  @import "../common/style/sum";
  @import "../common/style/mlxin";

  .login-view {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    background-size: 100%;
    background-image: url("../assets/loginBG@2x.png.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .back {
      position: absolute;
      top: 0;
      left: 0;
      .fs(42);
      color: #fff;
      .pr(30);
      .pl(38);
      .pt(24);
      .pb(24);
      z-index: 10;
    }
    .register {
      position: absolute;
      .t(24);
      .r(72);
      .fs(30);
      .text {
        color: #fefefe;
      }
      .icon {
        position: absolute;
        top: 0;
        .r(-12);
        .t(3);
        .iconfont {
          .fs(36);
          position: absolute;
          top: 0;
          left: 0;
          &.wrap {
            color: #887971;
          }
          &.inner {
            color: #fff;
            .t(2);
            .fs(30);
            .l(5);
          }
        }
      }
    }
    .header {
      position: relative;
      .w(477);
      .h(288);
      .mt(86);
      .ml(142);
      .bg-image('../../assets/header');
      background-repeat: no-repeat;
      background-size: contain;
    }
    .middle {
      .pl(60);
      .pr(60);
      .form {
        .mt(86);
        .h(276);
        border-radius: 10px;
        background: #fff;
        .input-box {
          .title {
            .h(77);
            background: none;
            .vux-tab-item {
              .lh(77);
            }
          }
          .group {
            .weui-cells {
              background: none !important;
              .vux-x-input {
                .pt(24) !important;
                .pb(24) !important;
              }
              &:before {
                border-top: none;
              }
              input {
                text-indent: 12px;
                .fs(25);
                color: @font-color-m;
              }
            }
            .iconfont {
              color: #555;
              .fs(30);
            }
          }
          .pass-group {
            .weui-cells {
              &:after {
                display: none;
              }
              .vux-x-input {
                position: relative;
              }
            }
            .get-code-bt {
              .w(148);
              .h(49);
              .pl(14);
              .pr(14);
              background: @theme-color;
              color: #fff;
              position: absolute;
              .r(32);
              top: 50%;
              .mt(-24.5);
              .fs(22);
              .lh(24);
              &.has-send {
                background: #d2d2d2;
                color: #fefefe;
              }
            }
          }
        }
        .forget {
          .w(150);
          .h(88);
          .lh(108);
          color: #fff;
          .fs(24);
          float: right;
          .icon {
            .fs(26);
          }
        }
        .submit-bt {
          .h(98);
          background: @theme-color;
          color: #fff;
          .mt(12);
          .fs(28);
        }
        .agreement-box {
          text-align: right;
          .mt(20);
          .agree-icon {
            .weui-icon {
              .fs(25);
            }
          }
          .agreement-content {
            color: #fefefe;
            .fs(24);
            text-decoration: underline;
          }
        }
      }
    }
    .toast {
      .weui-toast__content {
        text-indent: 0 !important;
      }
    }
  }
</style>
