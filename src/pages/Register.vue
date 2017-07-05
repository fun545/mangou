<template>
  <div class="register-view">
    <div class="register-header t-c">
      <span class="back iconfont f-l" @click="$router.back(-1)">&#xe600;</span>
      <span class="t-c">注册</span>
    </div>
    <div class="logo"></div>
    <div class="content">
      <div class="input-box">
        <group gutter="0" class="group">
          <x-input v-model="tel" placeholder="手机号" type="tel">
            <span slot="label" class="iconfont">&#xe618;</span>
          </x-input>
        </group>
        <get-code :codeType="type"></get-code>
        <group gutter="0" class="group">
          <x-input v-model="password" placeholder="请设置密码" type="password">
            <span slot="label" class="iconfont">&#xe63e;</span>
          </x-input>
        </group>
        <group gutter="0" class="group last-group">
          <x-input v-model="confirmPassword" placeholder="请确认密码" type="password">
            <span slot="label" class="iconfont">&#xe63e;</span>
          </x-input>
        </group>
      </div>
      <check-icon :value.sync="defaultFlag">Do you agree? ({{ defaultFlag }})</check-icon>
      <div class="bt-box">
        <x-button class="submit-bt" @click.native="test">
          登录
        </x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader, Group, XInput, XButton, CheckIcon } from 'vux'
  import getCode from '../components/_getCode'
  export default {
    components: {XHeader, Group, XInput, XButton, getCode, CheckIcon},
    data () {
      return {
        type: 1,
        tel: '',
        password: '',
        confirmPassword: '',
        defaultFlag: false
      }
    },
    created () {},
    methods: {
      test () {
        console.log(2222)
      }
    }
  }
</script>

<style lang="less">
  @import "../common/style/varlable";
  @import "../common/style/sum";
  @import "../common/style/mlxin";

  .register-view {
    .register-header {
      .h(92);
      .lh(92);
      background: #fff;
      color: #403f3f;
      box-sizing: border-box;
      .pl(30);
      .fs(40);
      .back {
        .h(92);
        .lh(92);
        .fs(40);
        font-weight: 700;
      }
    }
    .logo {
      .h(352);
      width: 100%;
      .bg-image('../../assets/zhuce-BG');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .content {
      .input-box {
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
        .last-group {
          .weui-cells {
            &:after {
              display: none;
            }
          }
        }
      }
      .bt-box {
        .pl(30);
        .pr(30);
        border-top: 5px solid #f2f1f1;
        .pt(46);
        .submit-bt {
          .h(98);
          background: @theme-color;
          color: #fff;
          .fs(28);
        }
      }
    }
  }
</style>
