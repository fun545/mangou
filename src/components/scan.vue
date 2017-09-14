<template>
  <i class="iconfont scan" @click="scan" v-if="true" :class="{'nextList':nextListFlag,'next':nextFlag}">&#xe661;</i>
</template>

<script type="text/ecmascript-6">
  import { isWeiXinFlag, wxObj } from '../util/js-sdk'

  export default {
    props: {
      nextListFlag: {
        type: Boolean,
        default: false
      },
      nextFlag: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        isWeiXinFlag: isWeiXinFlag
      }
    },
    methods: {
      //      扫一扫
      scan () {
        var _this = this
        wxObj.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
            var splitArr = result.split(',')
            var huohao = splitArr[1]
            var paramas = {}
            paramas.shopType = 1
            paramas.huohao = huohao
            if (localStorage.getItem('m-token')) {
              paramas.token = localStorage.getItem('m-token')
            }
            paramas.villageId = localStorage.getItem('m-villageId')
            _this.post('/goods/goodsDetail', paramas).then(res => {
              console.log(res.data)
              if (res.data.code === 100) {
                _this.$router.push({
                  path: '/goods_detail',
                  query: {huohao: huohao}
                })
              } else {
                _this.$vux.alert.show({
                  title: '提示',
                  content: '无此商品'
                })
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";

  .scan {
    text-align: center;
    position: absolute;
    top: 0;
    .r(118);
    .w(80);
    .h(92);
    .lh(92);
    .fs(32);
    .pr(20);
    text-align: right;
    color: #e4ffe5;
    z-index: 10;
    &.nextList {
      .r(158);
      .h(83);
      .lh(83);
    }
    &.next {
      .h(83);
      .lh(83);
    }
  }
</style>
