<template>
  <div class="address-view">
    <!-- 标题 -->
    <x-header :left-options="{backText:''}">收获地址</x-header>
    <!-- 地址列表 -->
    <div class="content-view-scroller">
      <div class="address-item" v-for="(item,index) in 5" :key="index">
        <div class="flex-box">
          <div class="flex-col">加多宝</div>
          <div class="flex-item">18688552211</div>
        </div>
        <div class="flex-box">湖南省长沙市珠江花城扶水岸13栋202</div>
        <div class="flex-box">
          <input type="checkbox" :id="`item${index}`" class="input-checkbox"/>
          <label :for="`item${index}`" class="label-checkbox flex-col">设为默认</label>
          <div class="flex-item"><i class="iconfont">&#xe644;</i>编辑</div>
        </div>
      </div>
    </div>
    <!-- 新增收货地址链接 -->
    <router-link to="/edit_address" class="bottom-link">新增收货地址</router-link>
  </div>
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    components: {
      XHeader
    }
  }
</script>

<style lang='less'>
  .address-view .vux-header {
    background-color: transparent;

    [class^=vux-header-] {
      color: #444;
    }

    .left-arrow:before {
      border-width: 2px 0 0 2px;
      border-color: #444;
    }
  }

  .address-view .content-view-scroller {
    height: calc(~'100vh - 100px ');
    overflow-y: scroll;

    .address-item {
      margin-bottom: 10px;
      padding: 5px 0;
      font-size: 13px;
      line-height: 20px;
      color: #444;
      background-color: #fff;
      position: relative;
    }

    .flex-box {
      padding: 5px 10px;
      align-items: center;
      position: relative;
    }

    .flex-box:last-child:before {
      content: '';
      height: 1px;
      background-color: #ddd;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
    }

    .input-checkbox:before {
      color: #444;
    }

    .label-checkbox {
      margin-left: 5px;
    }

    .iconfont {
      margin-right: 2px;
      color: inherit;
      font-size: inherit;
    }
  }

  .address-view .bottom-link {
    display: block;
    margin: 10px;
    text-align: center;
    color: #ffffff;
    background-color: #ff5500;
    border-radius: 3px;
    font-size: 15px;
    line-height: 40px;
  }
</style>
