<template>
  <div class="help-view" @touchmove.prevent>
    <!-- 页面头部 -->
    <m-header title="客服与帮助">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <!-- 服务提示 -->
    <div class="tips-box">
      <div class="flex-col">
        <div class="iconfont tui"></div>
        <p class="font-mind">支持售后退款</p>
      </div>
      <div class="flex-col">
        <div class="iconfont"></div>
        <p class="font-mind">支持补发</p>
      </div>
      <div class="flex-col">
        <div class="iconfont song"></div>
        <p class="font-mind">支持送货上门</p>
      </div>
    </div>
    <!-- 页面内容 -->
    <div class="content-scroller" v-for="(item,index) in helpList" :key="index">
      <div class="organ-title"
           :class="{'active-item':ind===index&&showFlag}"
           @click="show(index)">
        <div class="flex-col">{{item.title}}</div>
        <div class="iconfont">&#xe674;</div>
      </div>
      <div class="organ-content" v-if="ind===index&&showFlag" v-html="item.content"></div>
    </div>
    <!-- 客服电话 -->
    <div class="footer-box">
      <a href="tel:400-086-1937" class="btn">400-086-1937</a>
      <div class="text-center font-mind" style="color:#999;">客服服务时间为每天9:00 - 23:00</div>
    </div>
  </div>
</template>

<script>
  import mHeader from '../components/header'

  export default {
    components: {
      mHeader
    },
    data () {
      return {
        ind: '',
        helpList: [],
        showFlag: false
      }
    },
    created () {
      this.post('/basic/helpMe', {type: 4}).then((res) => {
        if (res.data.code === 100) {
          this.helpList = res.data.helpList
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
      show (index) {
        this.ind = index
        if (index === this.ind) {
          this.showFlag = !this.showFlag
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";
  @import "../common/style/mlxin";

  .help-view {
    width: 100%;
    height: 100%;
    .fs(25);
    .cp-header {
      position: inherit;
    }
    .font-mind {
      .fs(25);
    }
  }

  .help-view .tips-box {
    display: flex;
    color: #666;
    text-align: center;
    background-color: #fff;
    .pt(10);
    .pb(20);
    border-top: 1px solid #eee;
    .mb(20);
    .iconfont {
      width: 100%;
      .h(56);
      .mb(10);
      .fs(52);
      color: #fc5050;
      .bg-image('../../assets/ic_bu');
      background-repeat: no-repeat;
      background-size: .72rem .693rem;
      background-position: center;
      &.tui {
        .bg-image('../../assets/ic_tui');
      }
      &.song {
        .bg-image('../../assets/ic_song');
      }
    }
  }

  .help-view .content-scroller {
    /*height: calc(~'100% - 46px - 77px - 78px');*/
    /*overflow-y: scroll;*/
  }

  .help-view .footer-box {
    position: absolute;
    .b(100);
    width: 100%;
    .h(80);
    .btn {
      display: block;
      .mt(20);
      .mb(20);
      .ml(40);
      .mr(40);
      .pt(20);
      .pb(20);
      .pr(20);
      .pl(20);
      .lh(40);
      border-radius: 5px;
      text-align: center;
      color: #fff;
      background-color: #fc7070;
      .fs(35);
    }
  }

  .help-view .organ-title {
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    .pt(20);
    .pb(20);
    .pr(20);
    .pl(20);
    .lh(40);
    .fs(28);
    .iconfont {
      .lh(40);
      color: #999;
      font-size: inherit;
    }

    &.active-item .iconfont {
      transition: all 300ms;
      transform: rotate(180deg);
    }
  }

  .help-view .organ-content {
    .pt(15);
    .pb(15);
    .pl(30);
    .pr(30);
    .lh(45);
    background-color: #fff;
    color: @font-color-input;
    .fs(27);
  }
</style>
