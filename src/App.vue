<template>
  <router-view></router-view>
</template>

<style lang="less">
  @import "~vux/src/styles/reset.less";
  @import "common/style/index.less";
  @import "common/style/sum";

  @font-face {
    font-family: 'iconfont';  /* project id 284244 */
    src: url('//at.alicdn.com/t/font_xkziooeap157mn29.eot');
    src: url('//at.alicdn.com/t/font_xkziooeap157mn29.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_xkziooeap157mn29.woff') format('woff'),
    url('//at.alicdn.com/t/font_xkziooeap157mn29.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_xkziooeap157mn29.svg#iconfont') format('svg');
  }
  .weui-tab__panel{
    overflow: hidden !important;
    padding-bottom:0 !important;
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
  }
  li{
    list-style: none;
  }
  /*[class*=-view] {*/
    /*position: relative;*/
    /*height: 100%;*/
    /*overflow-y: scroll;*/
  /*}*/

  /*[class*=scroll]::-webkit-scrollbar, [class*=-view]::-webkit-scrollbar {*/
    /*display: none;*/
  /*}*/

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

  input[placeholder], [placeholder], *[placeholder] {
    color: # !important;
  }

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
</style>
