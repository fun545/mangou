<template>
  <div class="order-rater-view">
    <!-- 页面头部 -->
    <x-header :left-options="{backText:''}">订单评价</x-header>
    <!-- 订单编号 -->
    <div class="number">142853652136426</div>
    <!-- 订单商品图片 -->
    <div class="img-box">
      <div class="scroller">
        <img src="../assets/goods_img.jpg" width="25%" v-for="i in 7" alt="">
      </div>
    </div>
    <!-- 分界线 -->
    <div class="line-bar">请给我们打分</div>
    <!-- 评论星星 -->
    <div class="text-center">
      <rater active-color="#eb900e" :margin="5" v-model="rater"></rater>
    </div>
    <!-- 评价标签 -->
    <div class="rater-tabs-box">
      <checker default-item-class="default-checker" selected-item-class="selected-checker" v-model="checker">
        <checker-item :value="1">服务好</checker-item>
        <checker-item :value="2">商品质量好</checker-item>
        <checker-item :value="3">价格实惠</checker-item>
        <checker-item :value="4">发货速度快</checker-item>
        <checker-item :value="5">送货快</checker-item>
      </checker>
    </div>
    <!-- 评论留言 -->
    <div class="text-msg">
      <textarea rows="4" placeholder="请输入评论内容"/>
    </div>
    <!-- 提交评价按钮 -->
    <div class="submit-btn" @click="submit">提交评价</div>
  </div>
</template>

<script>
  import { XHeader, Rater, Checker, CheckerItem } from 'vux'

  export default {
    components: {
      XHeader,
      Rater,
      Checker,
      CheckerItem
    },
    data () {
      return {
        rater: 0,
        checker: 0
      }
    },
    methods: {
      submit () {
        this.$vux.alert.show({content: '提交评价成功'})
      }
    }
  }
</script>

<style lang="less">
  .order-rater-view {
    background-color: #fff;
  }

  .order-rater-view .vux-header {
    background-color: transparent;

    [class^=vux-header-] {
      color: #444;
    }

    .left-arrow:before {
      border-width: 2px 0 0 2px;
      border-color: #444;
    }
  }

  .order-rater-view .number {
    text-align: center;
    height: 40px;
    line-height: 20px;
    color: #666;
    padding: 10px 0;
    box-sizing: border-box;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }

  .order-rater-view .img-box {
    padding: 10px 0;
    border-bottom: 1px solid #eee;

    .scroller {
      display: flex;
      align-items: center;
      overflow-y: scroll;
    }
  }

  .order-rater-view .line-bar {
    display: table;
    margin: 20px auto;
    color: #999;
    line-height: 20px;
    position: relative;

    &:before {
      content: '';
      width: 80px;
      height: 1px;
      background-color: #999;
      position: absolute;
      top: 50%;
      left: -10px;
      transform: translate(-100%, -50%);
    }

    &:after {
      content: '';
      width: 80px;
      height: 1px;
      background-color: #999;
      position: absolute;
      top: 50%;
      right: -10px;
      transform: translate(100%, -50%);
    }
  }

  .order-rater-view .rater-tabs-box {
    margin: 10px auto;
    padding: 5px;
    text-align: center;

    .default-checker {
      padding: 5px 12px;
      line-height: 1;
      color: #999;
      font-size: 12px;
      border-radius: 100px;
      border: 1px solid #999;
      margin: 5px;
    }

    .selected-checker {
      border-color: #f95d44;
      color: #fff;
      background-color: #f95d44;
    }
  }

  .order-rater-view .text-msg {
    padding: 0 15px;

    textarea {
      display: block;
      width: 100%;
      box-sizing: border-box;
      padding: 5px 10px;
      line-height: 1.5;
      background-color: #f1f1f1;
      border-style: none;
      outline: none;
      -webkit-appearance: none;
      border-radius: 5px;
      resize: none;
      text-align: center;
    }
  }

  .order-rater-view .submit-btn {
    margin: 30px 40px;
    text-align: center;
    padding: 10px 0;
    line-height: 20px;
    color: #fff;
    background-color: #ff5500;
    border-radius: 5px;
  }
</style>
