<template>
  <div class="cart-view">
    <!-- 页面标题 -->
    <x-header class="cart-header" :left-options="{showBack:false}">购物车<span slot="right" @click="isEdit = !isEdit">编辑</span>
    </x-header>
    <!-- 页面中心 -->
    <div class="content-view-scroller">
      <!-- 即时送 -->
      <div class="flex-box this">
        <div class="flex-item">
          <input type="checkbox" id="isThis" class="input-checkbox" v-model="isThis">
          <label for="isThis" class="label-checkbox">全选</label>
        </div>
        <div class="flex-col">
          <div class="block-title color-0493ed"><i class="iconfont">&#xe61f;</i>即时送</div>
        </div>
      </div>
      <div class="flex-box this-goods" v-for="(item,index) in goodsCount" :key="index">
        <input type="checkbox" class="input-checkbox" v-if="(index + 1) % 2 !== 0">
        <div class="input-disabel" v-if="(index + 1) % 2 === 0">已售馨</div>
        <img src="../assets/goods_img.jpg" width="20%" alt="">
        <div class="flex-col">
          <div class="goods-title">卫龙香辣卤藕袋装80g</div>
          <div class="flex-box">
            <div class="flex-col font-normal color-0493ed">¥8.8</div>
            <div class="remove" @click="itemVal -= 1"/>
            <input type="tel" class="val-box" v-model="itemVal"/>
            <div class="added" @click="itemVal += 1"/>
          </div>
        </div>
      </div>
      <div class="more-btn" @click="setCount" v-if="showMore">显示更多商品</div>
      <div class="more-btn" @click="setCount" v-if="!showMore">隐藏更多商品</div>
      <div class="flex-box">
        <div class="flex-item">共18件商品</div>
        <div class="flex-col text-right font-mind">小记：<span class="color-0493ed">¥188.8</span></div>
      </div>
      <div class="flex-box">
        <div class="flex-item">送货上门</div>
        <div class="flex-col text-right font-mind color-666">配送费¥3</div>
      </div>
      <!-- 次日达 -->
      <div class="flex-box next">
        <div class="flex-item">
          <input type="checkbox" id="isNext" class="input-checkbox" v-model="isNext">
          <label for="isNext" class="label-checkbox">全选</label>
        </div>
        <div class="flex-item flex-col">
          <div class="block-title color-fc766d"><i class="iconfont">&#xe60a;</i>次日达</div>
        </div>
        <div class="flex-item">
          <p class="font-mind">还差<span class="color-fc766d">8</span>元起送</p>
          <router-link to="next" tag="p" class="font-mind color-fc766d">去凑单 ></router-link>
        </div>
      </div>
      <div class="flex-box next-goods" v-for="(item,index) in goodsCount" :key="index">
        <input type="checkbox" class="input-checkbox" v-if="(index + 1) % 2 !== 0">
        <div class="input-disabel" v-if="(index + 1) % 2 === 0">已售馨</div>
        <img src="../assets/goods_img.jpg" width="20%" alt="">
        <div class="flex-col">
          <div class="goods-title">卫龙香辣卤藕袋装80g</div>
          <div class="flex-box">
            <div class="flex-col font-normal color-0493ed">¥8.8</div>
            <div class="remove" @click="itemVal -= 1"/>
            <input type="tel" class="val-box" v-model="itemVal"/>
            <div class="added" @click="itemVal += 1"/>
          </div>
        </div>
      </div>
      <div class="more-btn" @click="setCount" v-if="showMore">显示更多商品</div>
      <div class="more-btn" @click="setCount" v-if="!showMore">隐藏更多商品</div>
      <div class="flex-box">
        <div class="flex-item">共18件商品</div>
        <div class="flex-col font-mind text-right">小记：<span class="color-fc766d">¥188.8</span></div>
      </div>
      <div class="flex-box">
        <div class="flex-item">配送方式</div>
        <checker class="flex-col text-right" default-item-class="default-checker" selected-item-class="selected-checker">
          <checker-item value="1">客户自取</checker-item>
          <checker-item value="2">送货上门</checker-item>
        </checker>
      </div>

      <div class="flex-box">
        <div class="flex-item">取货地址</div>
        <div class="flex-col font-mind text-right color-666">珠江花城扶水岸13栋109</div>
      </div>
    </div>
    <!-- 页面底部 -->
    <div class="count-box" v-if="!isEdit">
      <input type="checkbox" id="isAll" class="input-checkbox" v-model="isAll">
      <label for="isAll" class="label-checkbox">全选</label>
      <div class="col">
        <p>合计：<span>¥188.00</span></p>
        <p class="font-mind">优惠金额：¥23.1</p>
      </div>
      <div class="count" @click="count">结算</div>
    </div>

    <div class="edit-box" v-if="isEdit">
      <input type="checkbox" id="all" class="input-checkbox">
      <label for="all" class="label-checkbox flex-col">全选</label>
      <div class="remove-all">删除</div>
    </div>
    <m-footer></m-footer>
  </div>
</template>

<script>
  import { XHeader, Checker, CheckerItem } from 'vux'
  import mFooter from '../components/footer'

  export default {
    components: {
      mFooter,
      XHeader,
      Checker,
      CheckerItem
    },
    data () {
      return {
        isEdit: false,
        isAll: false,
        isThis: false,
        isNext: false,

        itemVal: 888,
        goodsCount: 3,
        showMore: true
      }
    },
    methods: {
      setCount () {
        this.showMore ? this.goodsCount = 5 : this.goodsCount = 3
        this.showMore = !this.showMore
      },
      count () {
        this.$router.push({path: '/order_enter'})
      }
    },
    watch: {
      isAll (val) {
        let changeVal = true
        val ? changeVal = true : changeVal = false
        this.isThis = changeVal
        this.isNext = changeVal
      }
    }
  }
</script>

<style lang='less'>
  .cart-view {
    font: 13px/1 'Microsoft Yahei';
  }

  .cart-view .cart-header {
    background: linear-gradient(#f08956, #ea513d);

    [class^=vux-header-] {
      color: #fff;
    }
  }

  .cart-view .content-view-scroller {
    overflow-y: scroll;
    height: calc(~'100% - 96px');
    padding-bottom: 10px;
    box-sizing: border-box;

    .flex-box {
      align-items: center;
      padding: 10px;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
    }

    .block-title {
      margin-left: 50px;
      font: italic bold 16px/1 'Microsoft Yahei';
      vertical-align: middle;
    }

    .block-title .iconfont {
      margin-right: 5px;
      display: inline-block;
      border-radius: 100px;
      width: 20px;
      height: 20px;
      text-align: center;
      font: normal 12px/20px 'iconfont';
      vertical-align: middle;
    }

    .font-mind {
      line-height: 1.4;
    }

    [class*=this] .input-checkbox:checked, .color-0493ed {
      color: #0493ed;
    }

    .this .block-title .iconfont {
      color: #ffffff;
      background-color: #0493ed;
    }

    .next {
      margin-top: 10px;
      padding: 5px 10px;
    }

    [class*=next] .input-checkbox:checked, .color-fc766d {
      color: #fc766d;
    }

    .next .block-title .iconfont {
      color: #ffffff;
      background-color: #fc766d;
    }

    .color-666 {
      color: #666;
    }

    .default-checker {
      font-size: 12px;
      padding: 4px 14px;
      color: #666;
      background-color: #ddd;
      margin-left: 10px;
      border-radius: 100px;
    }

    .selected-checker {
      color: #fff;
      background-color: #f75439;
    }

    .input-disabel {
      margin-left: -5px;
      margin-right: 5px;
      width: 45px;
      text-align: center;
      white-space: nowrap;
      padding: 2px 0;
      border-radius: 10px;
      font-size: 12px;
      line-height: 1;
      color: #fff;
      background-color: #bbb;
    }

    [class$=-goods] {
      background-color: transparent;
    }

    [class$=-goods] .flex-box {
      padding: 0;
      line-height: 1.4;
      border: none;
      background-color: transparent;
    }

    [class$=-goods] .input-checkbox {
      width: 35px;
      text-align: center;
      margin-right: 10px;
    }

    [class$=-goods] > .flex-col {
      margin-left: 10px;
    }

    [class$=-goods] .goods-title {
      line-height: 20px;
      margin-bottom: 10px;
    }

    .remove {
      box-sizing: border-box;
      height: 24px;
      width: 28px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 5px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      position: relative;
    }

    .remove:before {
      content: '';
      width: 16px;
      height: 1.2px;
      background-color: #444;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .val-box {
      box-sizing: border-box;
      width: 34px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      color: #666;
      outline: none;
      -webkit-appearance: none;
      border-radius: 0;
      border: 1px solid #ddd;
      border-left: none;
      border-right: none;
    }

    .added {
      box-sizing: border-box;
      height: 24px;
      width: 28px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 5px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      position: relative;
    }

    .added:before {
      content: '';
      width: 16px;
      height: 1.2px;
      background-color: #444;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .added:after {
      content: '';
      height: 16px;
      width: 1.2px;
      background-color: #444;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .more-btn {
      display: table;
      margin: 3px auto;
      padding: 3px 10px;
      background-color: #e1e1e1;
      border-radius: 100px;
      vertical-align: middle;
      font: 12px/1.2 'Microsoft Yahei';

      .iconfont {
        font-size: inherit;
        vertical-align: middle;
      }
    }
  }

  .cart-view .count-box {
    display: flex;
    padding-left: 10px;
    font-size: 14px;
    background-color: #fff;
    align-items: center;

    .input-checkbox:checked, span {
      color: #ff5500;
    }

    .label-checkbox {
      margin-left: 3px;
      margin-right: 10px;
    }

    .col {
      padding: 0 10px;
      flex-grow: 1;
      line-height: 1.2;
      border-left: 1px solid #ddd;
    }

    .font-mind {
      color: #999;
      line-height: 1.5;
    }

    .count {
      padding: 15px 30px;
      line-height: 20px;
      color: #fff;
      background-color: #ff5500;
    }
  }

  .cart-view .edit-box {
    display: flex;
    padding-left: 10px;
    background-color: #fff;
    align-items: center;

    .input-checkbox {
      margin-right: 5px;
    }

    .input-checkbox:checked {
      color: #ff5500;
    }

    .remove-all {
      padding: 15px 30px;
      line-height: 20px;
      color: #fff;
      background-color: #ff5500;
    }
  }
</style>
