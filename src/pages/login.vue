<template>
  <div class="login-view">
    <router-link to="/register">
      <div class="register">
        <span class="text">注册</span>
        <div class="icon d-ib">
          <i class="iconfont wrap">&#xe742;</i>
          <i class="iconfont inner">&#xe8d0;</i>
        </div>
      </div>
    </router-link>
    <div class="header">
    </div>
    <div class="middle">
      <form class="form">
        <div class="input-box accountLogin fastLogin">
          <tab :line-width="1" active-color="#f95d43" defaultColor="#777" bar-active-color="#f95d43" class="title">
            <tab-item selected @on-item-click="changeLogin">账号密码登录</tab-item>
            <tab-item @on-item-click="changeLogin">手机快速登录</tab-item>
          </tab>
          <div v-if="loginMethodFlag">
            <group gutter="0" class="group">
              <x-input v-model="userAccount" placeholder="请输入账号">
                <span slot="label" class="iconfont">&#xe63f;</span>
              </x-input>
            </group>
            <group gutter="0" class="group">
              <x-input v-model="userPassword" placeholder="请输入密码" type="password">
                <span slot="label" class="iconfont">&#xe63e;</span>
              </x-input>
            </group>
          </div>
          <div v-if="!loginMethodFlag">
            <group gutter="0" class="group">
              <x-input v-model="tel" placeholder="手机号" type="tel">
                <span slot="label" class="iconfont">&#xe618;</span>
              </x-input>
            </group>
            <get-code :codeType="type" @getCode="receiveCode"></get-code>
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
      </form>
    </div>
    <toast v-model="showPositionValue" type="text" :time="2000" is-show-mask :position="position"
           :text="text" width="10em" class="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Tab, TabItem, Sticky, XInput, Group, XButton, CheckIcon, Popover, md5, Toast } from 'vux'
  import getCode from '../components/_getCode'
  export default {
    components: {Tab, TabItem, Sticky, XInput, Group, XButton, CheckIcon, Popover, getCode, md5, Toast},
    data () {
      return {
        userAccount: '',
        userPassword: '',
        tel: '',
        loginMethodFlag: true,
        agreeFlag: true,
        type: 3,
        code: '',
        showPositionValue: false,
        position: 'middle',
        text: '验证码错误'
      }
    },
    methods: {
      changeLogin (index) {
        if (index === 0) {
          this.loginMethodFlag = true
        } else {
          this.loginMethodFlag = false
        }
      },
      receiveCode (code) {
        this.code = code
      },
      login () {
        if (!/^1\d{10}$/.test(this.tel)) {
          this.text = '手机号码错误'
          this.showPositionValue = true
          return
        }
        this.post('/user/login', {
          phone: this.tel,
          userPwd: md5(this.code),
          loginType: 2,
          villageId: 1,
          cityId: 1,
          areaId: 1
        }).then((res) => {
          if (res.data.code === 100) {
            localStorage.setItem('token', res.data.userInfo.token)
          }
          if (res.data.code === 101) {
            this.showPositionValue = true
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
    .bg-image('../../assets/BG');
    background-repeat: no-repeat;
    background-size: 100% 100%;
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
          .h(70);
          .lh(70);
          color: #fff;
          .fs(24);
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
