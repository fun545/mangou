<template>
  <router-view></router-view>
</template>

<style lang="less">
  @import "~vux/src/styles/reset.less";
  @import "common/style/index.less";
  @import "common/style/sum";

  @font-face {
    font-family: 'iconfont';  /* project id 284244 */
    src: url('//at.alicdn.com/t/font_qnm3dyu23w5c23xr.eot');
    src: url('//at.alicdn.com/t/font_qnm3dyu23w5c23xr.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_qnm3dyu23w5c23xr.woff') format('woff'),
    url('//at.alicdn.com/t/font_qnm3dyu23w5c23xr.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_qnm3dyu23w5c23xr.svg#iconfont') format('svg');
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
    transition:all 0.5s;
  }

  img[lazy=loading]{
  }
  img[lazy=loaded]{
    animation:fade 0.5s;
  }
  @keyframes fade {
    0%{
      opacity: 0;
    }
    100%{
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
