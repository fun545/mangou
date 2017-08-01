<template>
  <div class="about-view">
    <!-- 页面头部 -->
    <x-header :left-options="{backText:''}">关于我们</x-header>
    <!-- 页面内容 -->
    <!--<div class="content-scroller">-->
    <!--<img src="../assets/about.jpg" width="100%" alt="">-->
    <!--</div>-->
    <div>{{jindu}}</div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  export default{
    name: 'about',
    components: {
      XHeader
    },
    data () {
      return {
        jindu: '',
        weidu: ''
      }
    },
    methods: {},
    created () {

    }
  }
</script>

<style lang="less" scoped>
  .about-view .vux-header {
    background-color: #fff;

    [class^=vux-header-] {
      color: #444;
    }

    .left-arrow:before {
      border-width: 2px 0 0 2px;
      border-color: #444;
    }
  }

  .about-view .content-scroller {
    height: calc(~'100% - 46px');
    overflow-y: scroll;
  }

  .about-view img {
    vertical-align: middle;
  }
</style>
