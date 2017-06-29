<template>
  <div class="share-view">
    <!-- 页面头部 -->
    <x-header :left-options="{backText:''}">分享</x-header>
    <!-- 分享页面 -->
    <div class="share-img" @click="share">
      <img src="../assets/share_img.png" width="100%" alt="">
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    components: {
      XHeader
    },
    methods: {
      share () {
        this.$vux.alert.show({content: '分享弹窗触发'})
      }
    }
  }
</script>

<style lang="less">
  .share-view .vux-header {
    background-color: #fff;

    [class^=vux-header-] {
      color: #444;
    }

    .left-arrow:before {
      border-width: 2px 0 0 2px;
      border-color: #444;
    }
  }

  .share-view .share-img {
    height: calc(~'100% - 46px');
    overflow-y: scroll;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: #bbb 0 0 3px;
  }
</style>
