<template>
  <div class="setting-view">
    <!-- 页面头部 -->
    <x-header :left-options="{backText:''}">设置</x-header>
    <!-- logo -->
    <div class="logo-box">
      <img src="../assets/logo.png" width="80" alt="">
      <p class="number">版本号：{{number}}</p>
    </div>
    <!-- 退出登录 -->
    <div class="sign-out" @click="go">
      <div class="btn">{{text}}</div>
    </div>
  </div>
</template>
<script>
  import { XHeader } from 'vux'

  export default {
    components: {
      XHeader
    },
    data () {
      return {
        number: '',
        text: '',
        path: ''
      }
    },
    created () {
      this.post('/basic/getVersion', {}).then((res) => {
        if (res.data.code === 100) {
          this.number = res.data.versionInfo.number
        }
      })
      this.post('/user/loginOut', {token: localStorage.getItem('m-token')}).then((res) => {
        console.log(res.data)
        if (res.data.code === 100) {
          localStorage.removeItem('m-token')
        }
      })
      this.hasLogin()
    },
    methods: {
      go () {
        if (localStorage.getItem('m-token')) {
          this.post('/user/loginOut', {token: localStorage.getItem('m-token')}).then((res) => {
            console.log(res.data)
            if (res.data.code === 100) {
              localStorage.removeItem('m-token')
            }
          })
        }
        this.$router.push(this.path)
      },
      hasLogin () {
        console.log()
        if (!localStorage.getItem('m-token')) {
          console.log('noLogin')
          this.text = '登录'
          this.path = {path: 'login'}
        } else {
          this.text = '退出登录'
          this.path = {path: 'user'}
        }
      }
    }
  }
</script>
<style lang="less">
  @import "../common/style/sum";
  @import "../common/style/varlable";

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
    /*padding: 20px 0;*/
    .pt(40);
    .pb(40);
    border-top: 1px solid #eee;
    background-color: #fff;
    .mb(20);
    img {
      margin: 0 auto;
    }
    .number {
      .mt(25);
      .fs(32);
      color: @font-color-m;
    }
  }

  .setting-view .sign-out {
    box-sizing: border-box;
    height: calc(~'100% - 183px');
    .pt(60);
    .pb(60);
    .pl(100);
    .pr(100);
    .btn {
      display: block;
      margin: 0 auto;
      color: #fff;
      background-color: #f95d43;
      .lh(40);
      .pt(20);
      .pb(20);
      text-align: center;
      border-radius: 5px;
    }
  }
</style>
