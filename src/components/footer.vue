<template>
  <div class="footer">
    <!-- 底部标签 -->
    <tabbar slot="bottom">
      <tabbar-item link="/home" active-class="item-active">
        <div class="icon-home" slot="icon"/>
        <div class="item-label" slot="label">首页</div>
      </tabbar-item>
      <tabbar-item link="/this" active-class="item-active">
        <div class="icon-this" slot="icon"/>
        <div class="item-label" slot="label">即时达</div>
      </tabbar-item>
      <tabbar-item link="/next" active-class="item-active" transition-class="transition-item">
        <div class="iconfont" slot="icon">&#xe60a;</div>
        <div class="item-label" slot="label">次日达</div>
      </tabbar-item>
      <tabbar-item link="/cart" active-class="item-active" :badge="123">
        <div class="icon-cart" slot="icon"/>
        <div class="item-label" slot="label">购物车</div>
      </tabbar-item>
      <tabbar-item link="/user" active-class="item-active">
        <div class="icon-user" slot="icon"/>
        <div class="item-label" slot="label">我的</div>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { ViewBox } from 'vux'
  import Tabbar from './Tabbar'
  import TabbarItem from './TabbarItem'

  export default {
    components: {
      ViewBox,
      Tabbar,
      TabbarItem
    }
  }
</script>

<style lang="less">
  @import "../common/style/sum.less";

  .footer {
    .h(100);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10004;
  }

  .tabbar .item-active .transition-item {
    box-sizing: border-box;
    width: 64px;
    height: 64px;
    margin: -10px auto;
    padding-top: 10px;
    color: #fff;
    background: linear-gradient(#fa9f7a, #f75439);
    border-radius: 100px;
    animation: itemChange 300ms;
    position: relative;
    z-index: 999;
  }

  .tabbar {
    .h(100);
  }

  @keyframes itemChange {
    from {
      margin: 0 auto -20px auto;
      transform: scale(0, 0);
    }
    to {
      margin: -10px auto;
      transform: scale(1, 1);
    }
  }

  .tabbar .tabbar-item .iconfont,
  .tabbar .tabbar-item [class^=icon-] {
    font: 24px/1 'iconfont';
  }

  .tabbar .tabbar-item .item-label {
    font-size: 12px;
  }

  .tabbar .tabbar-item .icon-home:before {
    content: '\e605';
  }

  .tabbar .item-active .icon-home:before {
    content: '\e60c';
  }

  .tabbar .tabbar-item .icon-this:before {
    content: '\e611';
  }

  .tabbar .item-active .icon-this:before {
    content: '\e60d';
  }

  .tabbar .tabbar-item .icon-cart:before {
    content: '\e608';
  }

  .tabbar .item-active .icon-cart:before {
    content: '\e609';
  }

  .tabbar .tabbar-item .icon-user:before {
    content: '\e60e';
  }

  .tabbar .item-active .icon-user:before {
    content: '\e60f';
  }
</style>
