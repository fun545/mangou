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
        <div class="item-label" slot="label">即时送</div>
      </tabbar-item>
      <tabbar-item link="/next" active-class="item-active" transition-class="transition-item">
        <div class="iconfont" slot="icon">&#xe60a;</div>
        <div class="item-label" slot="label">次日达</div>
      </tabbar-item>
      <tabbar-item link="/cart" active-class="item-active" :badge="totalBuyCount">
        <div class="icon-cart" slot="icon"/>
        <div class="item-label" slot="label">购物车</div>
      </tabbar-item>
      <tabbar-item link="/user" active-class="item-active">
        <div class="icon-user" slot="icon"/>
        <div class="item-label" slot="label">我的</div>
      </tabbar-item>
    </tabbar>
    <!--<ball></ball>-->
  </div>
</template>

<script>
  import { ViewBox } from 'vux'
  import Tabbar from './Tabbar'
  import TabbarItem from './TabbarItem'
  //  import ball from '../components/ball'
  export default {
    props: {
      totalCount: Number
    },
    components: {
      ViewBox,
      Tabbar,
      TabbarItem
    },
    computed: {
      totalBuyCount: {
        set () {
          return this.totalCount
        },
        get () {
          return parseInt(this.$store.state.totalBuyCount)
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .footer {
    .h(100);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10004;
  }

  .item-badge {
    .fs(25);
    .lh(29) !important;
  }

  .tabbar .item-active .transition-item {
    box-sizing: border-box;
    .w(128);
    .h(128);
    margin: -10px auto;
    .mt(-20);
    .mb(-20);
    .pt(20);
    color: #fff;
    background:@theme-color;
    border-radius: 100px;

    position: relative;
    z-index: 999;
  }

  .tabbar {
    .h(100);
  }

  @keyframes itemChange {
    from {
      margin: 0 auto -20px auto;
      .mb(-40);
      transform: scale(0, 0);
    }
    to {
      margin: -10px auto;
      .mt(-20);
      transform: scale(1, 1);
    }
  }

  .tabbar .tabbar-item .iconfont,
  .tabbar .tabbar-item [class^=icon-] {
    font: 24px/1 'iconfont';
    .fs(48);
  }

  .tabbar .tabbar-item .item-label {
    font-size: 12px;
    .fs(25);
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
