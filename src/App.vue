<template>
  <router-view></router-view>
</template>

<style lang="less">
  @import "~vux/src/styles/reset.less";
  @import "common/style/index.less";

  @font-face {
    font-family: 'iconfont';  /* project id 284244 */
    src: url('//at.alicdn.com/t/font_zy66g5sxjeg3c8fr.eot');
    src: url('//at.alicdn.com/t/font_zy66g5sxjeg3c8fr.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_zy66g5sxjeg3c8fr.woff') format('woff'),
    url('//at.alicdn.com/t/font_zy66g5sxjeg3c8fr.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_zy66g5sxjeg3c8fr.svg#iconfont') format('svg');
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

  [class*=-view] {
    position: relative;
    height: 100%;
    overflow-y: scroll;
  }

  [class*=scroll]::-webkit-scrollbar, [class*=-view]::-webkit-scrollbar {
    display: none;
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
