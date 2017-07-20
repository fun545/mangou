<template>
  <div class="cart-view" @touchmove.prevent>
    <div class="header t-c">
      购物车
      <span class="edit f-r">编辑</span>
    </div>
    <div v-if="login">
      <!-- 页面中心 -->
      <div class="content-view-scroller" ref="content">
        <div>
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
          <div class="flex-box this-goods" v-for="(item,index) in NextGoodsList" :key="index">
            <input type="checkbox" class="input-checkbox" v-if="(index + 1) % 2 !== 0">
            <div class="input-disabel" v-if="(index + 1) % 2 === 0">已售馨</div>
            <img v-lazy="item.goodsImgUrl" width="100%" height="100%">
            <div class="flex-col">
              <div class="goods-title">{{item.goodsName}}</div>
              <div class="flex-box">
                <div class="flex-col font-normal color-0493ed">{{item.canKaoPrice}}</div>
                <div class="remove" @click="count(item,2)"/>
                <input type="tel" class="val-box" v-model="item.buyCount"/>
                <div class="added" @click="count(item,1)"/>
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
                <div class="remove" @click="thisTemVal -= 1"/>
                <input type="tel" class="val-box" v-model="thisTemVal"/>
                <div class="added" @click="thisTemVal += 1"/>
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
            <checker class="flex-col text-right" default-item-class="default-checker"
                     selected-item-class="selected-checker">
              <checker-item value="1">客户自取</checker-item>
              <checker-item value="2">送货上门</checker-item>
            </checker>
          </div>

          <div class="flex-box">
            <div class="flex-item">取货地址</div>
            <div class="flex-col font-mind text-right color-666">珠江花城扶水岸13栋109</div>
          </div>
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
    </div>
    <div v-if="!login" class="car-noLogin">
      <div class="login-bt" @click="$router.push({path:'/login'})">
        立即登录
      </div>
    </div>
    <m-footer></m-footer>
  </div>
</template>

<script>
  import { XHeader, Checker, CheckerItem } from 'vux'
  import mFooter from '../components/footer'
  import BScroll from 'better-scroll'

  export default {
    name: 'cart',
    components: {
      mFooter,
      XHeader,
      Checker,
      CheckerItem,
      BScroll
    },
    data () {
      return {
        isEdit: false,
        isAll: false,
        isThis: false,
        isNext: false,
        thisTemVal: '',
        goodsCount: 3,
        showMore: true,
        login: true,
        thisGoodsList: [],
        NextGoodsList: []
      }
    },
    created () {
      if (!localStorage.getItem('m-token')) {
        this.login = false
      }
      this.post('/car/getUserCar', {
        token: localStorage.getItem('m-token'),
        villageId: localStorage.getItem('m-villageId')
      }).then((res) => {
        console.log(res.data)
        if (res.data.code === 100) {
          this.thisGoodsList = res.data.carList[1].shandianShop.goodsList
          this.NextGoodsList = res.data.carList[0].storeShop.goodsList
        }
      })
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    methods: {
      setCount () {
        this.showMore ? this.goodsCount = 5 : this.goodsCount = 3
        this.showMore = !this.showMore
      },
      count (item, type) {
//        this.$router.push({path: '/order_enter'})
        if (type === 1) {
          this.post('/car/addCar', {
            token: localStorage.getItem('m-token'),
            goodsId: item.goodsId,
            buyCount: 1,
            storeId: item.storeId,
            shopType: item.shopType,
            type: 1,
            villageId: localStorage.getItem('m-villageId')
          }).then((res) => {
            if (res.data.code === 100) {
              item.buyCount = res.data.buyCount
            }
            if (res.data.code === 101) {
              // 提示失败信息
              return
            }
            if (res.data.code === 102) {
              // 跳转重载页面
              return
            }
//            item.buyCount += 1
            console.log(res.data)
          })
          return
        }
        if (type === 2) {
          // 删除购物车
          if (item.buyCount <= 0) {
            this.post('/car/deleteCar', {
              token: localStorage.getItem('m-token'),
              goodsId: item.goodsId,
              carId: item.carId
            }).then((res) => {
              console.log(res.data)
              if (res.data.code === 100) {
                return
              }
              if (res.data.code === 101) {
                // 提示失败信息
                return
              }
              if (res.data.code === 102) {
                // 跳转重载页面
                return
              }
            })
            return
          }
          this.post('/car/addCar', {
            token: localStorage.getItem('m-token'),
            goodsId: item.goodsId,
            buyCount: 1,
            storeId: item.storeId,
            shopType: item.shopType,
            type: 2,
            villageId: localStorage.getItem('m-villageId')
          }).then((res) => {
            if (res.data.code === 100) {
              item.buyCount = res.data.buyCount
            }
            if (res.data.code === 101) {
              // 提示失败信息
              return
            }
            if (res.data.code === 102) {
              // 跳转重载页面
              return
            }
          })
          return
        }
      },
      _initScroll () {
        this.contentScroll = new BScroll(this.$refs.content, {click: true})
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

<style lang='less' scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .header {
    position: fixed;
    z-index: 2;
    left: 0;
    right: 0;
    top: 0;
    .h(92);
    .lh(92);
    .fs(38);
    color: #fff;
    background: @theme-color;
    .edit {
      position: absolute;
      .r(30);
      .w(75);
      .h(92);
      .lh(92);
      .fs(28);
    }
  }

  .car-noLogin {
    position: absolute;
    .t(92);
    left: 0;
    right: 0;
    bottom: 0;
    background: url("../assets/buyCarNoLogin.png") no-repeat center 30%;
    background-size: 50%;
    .login-bt {
      .w(200);
      .h(70);
      .lh(70);
      .fs(36);
      background: @theme-color;
      color: #fff;
      margin: 100% auto 0 auto;
      border-radius: 5px;
      text-align: center;
    }
  }

  .cart-view {
    .fs(26);
    height: 100%;

  }

  .cart-view .cart-header {
    background: @theme-color;

    [class^=vux-header-] {
      color: #fff;
    }
  }

  .cart-view .content-view-scroller {
    box-sizing: border-box;
    position: absolute;
    .t(92);
    left: 0;
    right: 0;
    .b(200);
    /* .pb(20);*/
    overflow: hidden;
    .flex-box {
      align-items: center;
      padding: 10px;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      img {
        .w(140);
        .h(140);
      }
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
    position: fixed;
    left: 0;
    right: 0;
    .b(100);
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
