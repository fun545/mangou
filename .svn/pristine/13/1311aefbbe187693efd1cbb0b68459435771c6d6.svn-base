<template>
  <div class="setting-view">
    <!-- 页面头部 -->
    <x-header :left-options="{backText:''}">设置</x-header>
    <!-- logo -->
    <div class="logo-box">
      <img src="../assets/logo.png" width="80" alt="">
    </div>
    <!-- 退出登录 -->
    <div class="sign-out">
      <div class="btn" @click="signOut">退出登录</div>
    </div>
  </div>
</template>
<script>
  import { XHeader } from 'vux'

  export default {
    components: {
      XHeader
    },
    methods: {
      signOut () {
        this.$vux.alert.show({content: '退出登录成功'})
      }
    }
  }
</script>
<style lang="less">
  .setting-view .vux-header {
    background-color: #fff;

    [class^=vux-header-] {
      color: #444;
    }

    .left-arrow:before {
      border-width: 2px 0 0 2px;
      border-color: #444;
    }
  }

  .setting-view .logo-box {
    text-align: center;
    padding: 20px 0;
    border-top: 1px solid #eee;
    background-color: #fff;
    margin-bottom: 10px;
  }

  .setting-view .sign-out {
    box-sizing: border-box;
    height: calc(~'100% - 183px');
    padding: 30px 50px;
    background-color: #fff;

    .btn {
      display: block;
      margin: 0 auto;
      color: #fff;
      background-color: #f95d43;
      line-height: 20px;
      padding: 10px 0;
      text-align: center;
      border-radius: 5px;
    }
  }
</style>
