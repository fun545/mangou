<template>
  <div class="setting-view" @touchmove.prevent>
    <!-- 页面头部 -->
    <m-header title="设置">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <!-- logo -->
    <div class="logo-box">
      <img src="../assets/logo.png" width="80" alt="">
      <p class="number">版本号：{{number}}</p>
    </div>
    <!-- 退出登录 -->
    <div class="sign-out" @click="go">
      <div class="btn" v-if="!loginFlg">登录</div>
      <div class="btn" v-if="loginFlg">退出登录</div>
    </div>
  </div>
</template>
<script>
  import mHeader from '../components/header'
  export default {
    name: 'setting',
    components: {
      mHeader
    },
    data () {
      return {
        number: '',
        text: '',
        path: '',
        loginFlg: localStorage.getItem('m-token')
      }
    },
    created () {
      this.post('/basic/getVersion', {}).then((res) => {
        if (res.data.code === 100) {
          this.number = res.data.versionInfo.number
        }
        if (res.data.code === 101) {
          this.$vux.toast.text(res.data.msg, 'middle')
        }
        if (res.data.code === 102) {
          this.$vux.toast.text(res.data.msg, 'middle')
          localStorage.removeItem('m-token')
        }
      })
    },
    methods: {
      async go () {
        if (this.loginFlg) {
          await this.post('/user/loginOut', {token: localStorage.getItem('m-token')}).then((res) => {
            if (res.data.code === 100) {
              localStorage.removeItem('m-token')
              localStorage.removeItem('m-userInfo')
              this.$router.push({path: '/user'})
            }
            if (res.data.code === 101) {
              this.$vux.toast.text(res.data.msg, 'bottom')
            }
            if (res.data.code === 102) {
              this.$vux.toast.text(res.data.msg, 'bottom')
              localStorage.removeItem('m-token')
            }
          })
        } else {
          this.$router.push({path: '/login'})
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";
  .setting-view {
    width: 100%;
    height: 100%;
    .cp-header {
      position: inherit;
      color: @font-color-m;
      .back {
        color: @font-color-m;
      }
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
      .w(160);
      .h(160);
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
    .pl(80);
    .pr(80);
    .btn {
      display: block;
      margin: 0 auto;
      color: #fff;
      background-color: #f95d43;
      .lh(40);
      .pt(20);
      .pb(20);
      text-align: center;
      border-radius: 40px;
      .fs(35);
    }
  }
</style>
