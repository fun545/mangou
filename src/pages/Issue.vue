<template>
  <div class="issue-view">
    <!-- 页面头部 -->
    <m-header title="意见反馈">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <div class="content-scroller">
      <popup-radio class="popup" title="问题类型" v-model="issueType" :options="popupArray">
        <!--<div slot="popup-header">请选择问题</div>-->
        <!--<div slot="each-item" v-for="(item,index) in popupArray" :key="index"></div>-->
      </popup-radio>
      <textarea class="weui-textarea" maxlength="500" placeholder="详细描述问题内容" rows="5" v-model="text"/>
      <input type="tel" class="weui-input" maxlength="11" placeholder="选题手机号，方便我们与你联系！" v-model="tel">
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
        popupArray: [],
        tel: '',
        text: ''
      }
    },
    created () {
      this.post('/goods/searchKeyWord', {statusType: 5}).then((res) => {
        if (res.data.code === 100) {
//          this.popupArray = res.data.KeyWords
          res.data.KeyWords.forEach((item) => {
            var obj = {}
            obj.key = item.keyId
            obj.value = item.keyword
            this.popupArray.push(obj)
          })
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
      toastTip (text) {
        this.$vux.toast.text(text, 'bottom')
      },
      submitFrom () {
        var flag = true
        if (this.text.length < 0) {
          this.toastTip('亲，您还没输入反馈呢')
          flag = false
        }
        if (this.tel.length !== 11) {
          this.toastTip('请输入合法的手机号码')
          flag = false
        }
        if (flag) {
          this.post('/orders/feedBack', {
            token: localStorage.getItem('m-token'),
            feedContext: this.text,
            feedType: this.issueType
          }).then((res) => {
            if (res.data.code === 100) {
              this.$router.push('/user')
            }
            if (res.data.code === 101) {
              this.$vux.toast.text(res.data.msg, 'middle')
            }
            if (res.data.code === 102) {
              this.$vux.toast.text(res.data.msg, 'middle')
              localStorage.removeItem('m-token')
            }
          })
          this.$vux.alert.show({content: '提交问题成功'})
        }
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
    .weui-textarea {
      .fs(28);
    }
    .weui-input {
      .mt(10);
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
