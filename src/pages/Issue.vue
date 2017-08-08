<template>
  <div class="issue-view">
    <!-- 页面头部 -->
    <m-header title="意见反馈">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <div class="content-scroller">
      <popup-radio class="popup" title="问题类型" :options="popupArray" v-model="issueType"/>
      <textarea class="weui-textarea" maxlength="500" placeholder="详细描述问题内容" rows="5"/>
      <input type="tel" class="weui-input" maxlength="11" placeholder="选题手机号，方便我们与你联系！">
      <div class="submit-btn" @click="submitFrom">提交</div>
    </div>
  </div>
</template>

<script>
  import { PopupRadio } from 'vux'
  import mHeader from '../components/header'
  export default{
    components: {
      mHeader,
      PopupRadio
    },
    data () {
      return {
        issueType: '请选择',
        popupArray: ['订单', '商品', '物流', '支付', '操作', '设计', '服务', '其他']
      }
    },
    methods: {
      submitFrom () {
        this.$vux.alert.show({content: '提交问题成功'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";

  .issue-view {
    .cp-header {
      position: inherit;
    }
    .weui-cell {
      .fs(30);
    }
    .weui-textarea{
      .fs(28);
    }
    .weui-input{
      .fs(28);
    }
  }

  .issue-view [class^=vux-header-] {
    color: #fff;
  }

  .issue-view .vux-header-left .left-arrow:before {
    border-width: 2px 0 0 2px;
    border-color: #fff;
  }

  /*.issue-view .content-scroller {*/
  /*height: calc(100% - 46px);*/
  /*overflow-y: scroll;*/
  /*}*/

  .issue-view .popup {
    margin: 5px auto;
    .mt(10);
    .mb(10);
    background-color: #fff;
  }

  .issue-view .weui-textarea {
    .pt(20);
    .pb(20);
    .pl(30);
    .pr(30);
    box-sizing: border-box;
    .b(20);
  }

  .issue-view .weui-input {
    box-sizing: border-box;
    .pt(40);
    .pb(40);
    .pr(40);
    .pl(40);
    background-color: #fff;
  }

  .issue-view .submit-btn {
    .mt(40);
    .mb(40);
    .ml(30);
    .mr(30);
    .pt(20);
    .pb(20);
    .pr(20);
    .pl(20);
    .lh(40);
    text-align: center;
    color: #fff;
    background-color: #f95d43;
    border-radius: 5px;
    .fs(32);
  }
</style>
