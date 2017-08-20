<template>
  <div class="app">
    <keep-alive
      exclude="detail,user,about,active,address,cart,collection,confirmOrder,editAddress,forget,goPay,location,login,manualLocation,nextList1,saleList,orderInfo,order_List,orderPayList,orderRater,
orderRaterList,orderRefund,orderSendList,orderShippingList,originActive,register,search,searchText,selectAddress,
userInfo,orderPayList,orderRaterList,orderAfterSaleList,orderShippingList,orderSendList,setting,collect,searchVillage">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/reset.less";
  @import "common/style/index.less";
  @import "common/style/sum";
  @import "common/style/varlable";

  @font-face {
    font-family: 'iconfont';  /* project id 284244 */
    src: url('//at.alicdn.com/t/font_284244_f92xg77pp8bmx6r.eot');
    src: url('//at.alicdn.com/t/font_284244_f92xg77pp8bmx6r.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_284244_f92xg77pp8bmx6r.woff') format('woff'),
    url('//at.alicdn.com/t/font_284244_f92xg77pp8bmx6r.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_284244_f92xg77pp8bmx6r.svg#iconfont') format('svg');
  }

  .weui-tab__panel {
    overflow: hidden !important;
    padding-bottom: 0 !important;
  }

  .iconfont {
    font: normal 16px/1.1 'iconfont';
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body {
    height: 100%;
    background-color: #f7f7f7;
    font: 14px/1.5  'PingFang SC', 'Microsoft Yahei', 'Kai', Arial, sans-serif, Impact;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    .fs(25);
  }

  .app {
    height: 100%;
  }

  h3, h4 {
    font-weight: normal;
  }

  li {
    list-style: none;
  }

  img {
    display: block;
    border: none;
    /*transition: all 0.5s;*/
  }

  .pos-re {
    position: relative;
    left: 0;
    top: 0;
  }

  .pos-ab {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .daigou {
    width: 100%;
    height: 100%;
    background: url("assets/daigou.png") no-repeat;
    background-size: 30% 30%;
  }

  .theme-color {
    color: @theme-color;
  }

  /*.disabled-color {*/
    /*color: #d2d2d2 !important;*/
  /*}*/

  /*.daigou {*/
  /*background: url("assets/daigou.png") no-repeat;*/
  /*background-size: 100% 100%;*/
  /*}*/

  /*img[lazy=loading] {*/
  /*}*/

  /*img[lazy=loaded] {*/
  /*animation: fade 0.5s;*/
  /*}*/

  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .input-checkbox {
    outline: none;
    -webkit-appearance: textarea;
    border: none;
    margin-right: 5px;
    background-color: transparent;
  }

  .input-checkbox:before {
    content: ' \e635 ';
    font: 12px/1 'iconfont';
  }

  .input-checkbox:checked:before {
    content: ' \e634 ';
    color: inherit;
  }

  /*input[placeholder], [placeholder], *[placeholder] {*/
  /*color: # !important;*/
  /*}*/

  .label-checkbox {
    font: 12px/1 'Microsoft Yahei';
  }

  .flex-box {
    display: flex;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .flex-col {
    flex-grow: 1;
  }

  .text-left {
    text-align: left;
  }

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .float-left {
    float: left;
  }

  .float-right {
    float: right;
  }

  .font-large {
    font-size: 18px;
  }

  .font-normal {
    font-size: 16px;
  }

  .font-small {
    font-size: 14px;
  }

  .font-mind {
    font-size: 12px;
  }

  .hide {
    display: none;
  }

  .show {
    display: block;
  }

  //定位全屏
  .allcover {
    position: absolute;
    top: 0;
    right: 0;
  }

  //定位上下左右居中
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  //定位上下居中
  .ct {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  //定位左右居中
  .cl {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

</style>
