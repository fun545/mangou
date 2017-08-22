<template>
  <group gutter="0" class="group pass-group">
    <x-input v-model="userPassword" placeholder="验证码" type="text" @change.native="onInput">
      <span slot="label" class="iconfont">&#xe64f;</span>
      <x-button slot="right" mini class="get-code-bt" :class="{'has-send':hasSendFlag}"
                @click.native="getCodeBt">
        <span class="get-code" v-if="!hasSendFlag">{{sendBtText}}</span>
        <span class="get-code" v-if="hasSendFlag">{{time}}S后重发</span>
      </x-button>
    </x-input>
  </group>
</template>

<script type="text/ecmascript-6">
  import { Tab, TabItem, Sticky, XInput, Group, XButton, CheckIcon, Popover } from 'vux'
  export default {
    components: {Tab, TabItem, Sticky, XInput, Group, XButton, CheckIcon, Popover},
    props: {
      codeType: Number,
      tel: String
    },
    data () {
      return {
        userPassword: '',
        sendBtText: '获取验证码',
        hasSendFlag: false,
        time: '60',
        code: ''
      }
    },
    methods: {
      getCodeBt () {
        // 手机号码正则
        var telReg = /^1[0-9]{10}$/
        if (!telReg.test(this.tel)) {
          this.$vux.toast.text('请输入正确手机号')
          return
        }
        if (!this.hasSendFlag) {
          this.post('/user/getCode', {phone: this.tel, type: this.codeType}).then((res) => {
            if (res.data.code === 100) {
              this.hasSendFlag = true
              this.timer = setInterval(() => {
                this.time--
                if (this.time === 0) {
                  this.hasSendFlag = false
                  this.time = 60
                  clearInterval(this.timer)
                }
              }, 1000)
            }
            if (res.data.code === 101) {
              this.$vux.toast.text(res.data.msg, 'middle')
            }
            if (res.data.code === 102) {
              this.$vux.toast.text(res.data.msg, 'middle')
              localStorage.removeItem('m-token')
            }
          })
        }
      },
      onInput () {
        if (this.userPassword.trim()) {
          this.$emit('getCode', this.userPassword)
        }
      }
    }
  }
</script>

<style lang="less">

</style>
