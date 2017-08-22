<template>
  <div class="user-info-view">
    <!-- 页面标题 -->
    <m-header title="个人资料" ref="header">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
      <!--<span slot="right" class="right" @click="save">保存</span>-->
    </m-header>
    <!-- 用户头像 -->
    <div class="picture"><img src="../assets/userlog.png"></div>
    <!-- 用户信息 -->
    <group class="group">
      <x-input title="昵称" :show-clear="false" text-align="right" v-model="userInfo.userName"/>
      <cell title="手机号码" v-model="userInfo.phone"/>
      <!--<x-dialog v-model="setPhone" hide-on-blur>-->
      <!--<div class="dialog-hd">设置手机号</div>-->
      <!--<div class="weui-cell">-->
      <!--<div class="weui-cell__hd"><i class="iconfont">&#xe643;</i></div>-->
      <!--<div class="weui-cell__bd">-->
      <!--<input type="tel" class="weui-input" maxlength="11" v-model="phoneCode" placeholder="请输入手机号"/>-->
      <!--</div>-->
      <!--<div class="weui-cell__ft"><span>获取验证码</span></div>-->
      <!--</div>-->
      <!--<div class="weui-cell">-->
      <!--<div class="weui-cell__hd"><i class="iconfont">&#xe642;</i></div>-->
      <!--<div class="weui-cell__bd"><input type="text" class="weui-input" placeholder="请填写验证码"></div>-->
      <!--</div>-->
      <!--<div class="weui-cell dialog-ft">-->
      <!--<div class="mangou-btn">跳过</div>-->
      <!--<div class="mangou-btn mangou-btn-primary">绑定</div>-->
      <!--</div>-->
      <!--</x-dialog>-->

      <cell title="性别" :arrow-direction="showSex ? 'down' : 'right'" @click.native="showSex = !showSex" is-link/>
      <template v-if="showSex">
        <checker class="weui-cell" default-item-class="checker-default-item" selected-item-class="checker-selected-item"
                 v-model="sex">
          <checker-item value="1">男</checker-item>
          <checker-item value="2">女</checker-item>
          <checker-item value="3">保密</checker-item>
        </checker>
      </template>

      <cell title="年龄" :arrow-direction="showAge ? 'down' : 'right'" @click.native="showAge = !showAge" is-link/>
      <template v-if="showAge">
        <checker class="weui-cell" default-item-class="checker-default-item" selected-item-class="checker-selected-item"
                 v-model="demo11">
          <checker-item :value="item" v-for="(item, index) in items1" :key="index">{{item.value}}</checker-item>
        </checker>
      </template>
    </group>
  </div>
</template>

<script>
  import { XDialog, Group, XHeader, XInput, Cell, Checker, CheckerItem } from 'vux'
  import mHeader from '../components/header'

  export default {
    name: 'userInfo',
    components: {
      XDialog,
      XHeader,
      Group,
      XInput,
      Cell,
      Checker,
      CheckerItem,
      mHeader
    },
    data () {
      return {
        name: '加多宝',
        setPhone: false,
        phoneCode: '',
        showSex: false,
        sex: '1',
        showAge: false,
        age: '1',
        userInfo: JSON.parse(localStorage.getItem('m-userInfo')),
        items1: [
          {
            key: '1',
            value: '18-25'
          },
          {
            key: '2',
            value: '26-35'
          },
          {
            key: '3',
            value: '35-45'
          },
          {
            key: '4',
            value: '45以上'
          }
        ],
        demo11: ''
      }
    },
    methods: {
      submit () {
//        this.$vux.alert.show({content: '提交信息成功'})
      }
    }
  }
</script>

<style lang='less'>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .user-info-view {
    .weui-cell {
      .fs(28);
    }
    .cp-header {
      color: @font-color-m;
      position: inherit;
      background: @theme-color;
      color: #fff;
      .back {
        color: #fff;
      }
      .right {
        position: absolute;
        .r(30);
        .fs(29);
      }
    }
  }

  .user-info-view .picture {
    padding: 20px 0;
    .pt(40);
    .pb(40);
    background-color: @theme-color;

    img {
      margin: 0 auto;
      border-radius: 100px;
      box-sizing: border-box;
      .w(160);
      .h(160);
      display: table;
    }
  }

  .user-info-view .group {
    margin-top: 0;
    .weui-cells {
      margin-top: 0;
      .fs(28);
    }

    .weui-label, .vux-label {
      color: #666;
    }

    .weui-input {
      color: #999;
    }

    .weui-cell:before {
      left: 0;
    }

    .vux-checker-box {
      justify-content: flex-end;
    }

    .checker-default-item {
      .ml(20);
      padding: 6px 12px;
      .pt(12);
      .pb(12);
      .pl(24);
      .pr(24);
      border-radius: 100px;
      .fs(25);
      line-height: 1;
      color: #444444;
      background-color: #ddd;
    }

    .checker-default-item:first-child {
      margin-left: 0;
    }

    .checker-selected-item {
      color: #fff;
      background-color: #ff5500;
    }
  }

  .user-info-view .weui-dialog {
    .dialog-hd {
      .pt(20);
      .pb(20);
      .pr(20);
      .pl(20);
      text-align: center;
      .fs(36);
      .lh(60);
      color: #ffffff;
      background-color: #ff5500;
    }

    .dialog-ft {
      justify-content: space-between;
    }

    .iconfont {
      color: #ff5500;
      .pr(20);
    }

    .mangou-btn {
      .h(60);
      box-sizing: border-box;
      .pt(10);
      .pb(10);
      .pl(60);
      .pr(60);
      line-height: 20px;
      .lh(40);
      border-radius: 15px;
      color: #ff5500;
      border: 1px solid #ff5500;
    }

    .mangou-btn-primary {
      color: #ffffff;
      background-color: #ff5500;
    }
  }
</style>
