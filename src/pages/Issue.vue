<template>
  <div class="issue-view">
    <!-- 页面头部 -->
    <x-header :left-options="{backText:''}">意见反馈</x-header>
    <div class="content-scroller">
      <popup-radio class="popup" title="问题类型" :options="popupArray" v-model="issueType"/>
      <textarea class="weui-textarea" maxlength="500" placeholder="详细描述问题内容" rows="5"/>
      <input type="tel" class="weui-input" maxlength="11" placeholder="选题手机号，方便我们与你联系！">
      <div class="submit-btn" @click="submitFrom">提交</div>
    </div>
  </div>
</template>

<script>
  import { XHeader, PopupRadio } from 'vux'

  export default{
    components: {
      XHeader,
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

<style scoped>
  .issue-view .vux-header {
    background-color: #f95d43;
  }

  .issue-view [class^=vux-header-] {
    color: #fff;
  }

  .issue-view .vux-header-left .left-arrow:before {
    border-width: 2px 0 0 2px;
    border-color: #fff;
  }

  .issue-view .content-scroller {
    height: calc(100% - 46px);
    overflow-y: scroll;
  }

  .issue-view .popup {
    margin: 5px auto;
    background-color: #fff;
  }

  .issue-view .weui-textarea {
    padding: 10px 15px;
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  .issue-view .weui-input {
    padding: 10px;
    background-color: #fff;
  }

  .issue-view .submit-btn {
    margin: 20px 15px;
    padding: 10px;
    line-height: 20px;
    text-align: center;
    color: #fff;
    background-color: #f95d43;
    border-radius: 5px;
  }
</style>
