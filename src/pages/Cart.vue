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
          <div class="this-wrap" v-if="thisGoodsList.length">
            <div class="flex-box this">
              <!-- 全选按钮-->
              <div class="flex-item">
                <div class="select-all-icon d-ib" @click="thisCheckAll(thisGoodsList)">
                  <i class="iconfont selected-color" v-if="thisAllChecked">&#xe634;</i>
                  <i class="iconfont" v-if="!thisAllChecked">&#xe635;</i>
                </div>
                <span class="label-checkbox">全选</span>
              </div>
              <div class="flex-col">
                <div class="block-title color-0493ed"><i class="iconfont">&#xe61f;</i>即时送</div>
              </div>
            </div>
            <div class="flex-box this-goods" v-for="(item,index) in filterListThis" :key="index">
              <div class="d-ib" @click="selectedGoods(item)">
                <i class="iconfont selected-color checked" v-if="item.checked">&#xe634;</i>
                <i class="iconfont circle" v-if="!item.checked">&#xe635;</i>
              </div>
              <img v-lazy="item.goodsImgUrl" width="100%" height="100%">
              <div class="flex-col">
                <div class="goods-title">{{item.goodsName}}</div>
                <div class="flex-box">
                  <div class="flex-col font-normal price">￥{{item.canKaoPrice}}</div>
                  <div class="remove" @click="count(item,2,index,thisGoodsList)"/>
                  <input type="tel" class="val-box" v-model="item.buyCount"/>
                  <div class="added" @click="count(item,1)"/>
                </div>
              </div>
            </div>
            <div v-if="thisGoodsList.length>2">
              <div class="more-btn" @click="setCountThis()" v-if="showMoreThis">显示更多</div>
              <div class="more-btn" @click="setCountThis()" v-if="!showMoreThis">收起商品</div>
            </div>
            <div class="flex-box count">
              <div class="flex-item total-count">共18件商品</div>
              <div class="flex-col text-right font-mind count-price">小记：<span class="theme-color">¥188.8</span></div>
            </div>
            <div class="flex-box send">
              <div class="flex-item">送货上门</div>
              <div class="flex-col text-right font-mind color-666">配送费¥3</div>
            </div>
          </div>
          <!-- 次日达 -->
          <div class="next-wrap" v-if="NextGoodsList.length">
            <div class="flex-box this">
              <div class="flex-item">
                <div class="select-all-icon d-ib" @click="nextCheckAll(NextGoodsList)">
                  <i class="iconfont selected-color" v-if="nextAllChecked">&#xe634;</i>
                  <i class="iconfont" v-if="!nextAllChecked">&#xe635;</i>
                </div>
                <span class="label-checkbox">全选</span>
              </div>
              <div class="flex-col">
                <div class="block-title theme-color"><i class="iconfont next-icon">&#xe60a;</i>次日达</div>
              </div>
            </div>
            <div class="flex-box this-goods" v-for="(item,index) in filterListNext" :key="index">
              <div class="d-ib" @click="selectedGoods(item)">
                <i class="iconfont selected-color checked" v-if="item.checked">&#xe634;</i>
                <i class="iconfont circle" v-if="!item.checked">&#xe635;</i>
              </div>
              <img v-lazy="item.goodsImgUrl" width="100%" height="100%">
              <div class="flex-col">
                <div class="goods-title">{{item.goodsName}}</div>
                <div class="flex-box">
                  <div class="flex-col font-normal price">￥{{item.canKaoPrice}}</div>
                  <div class="remove" @click="count(item,2,index,NextGoodsList)"/>
                  <input type="tel" class="val-box" v-model="item.buyCount"/>
                  <div class="added" @click="count(item,1)"/>
                </div>
              </div>
            </div>
            <div v-if="NextGoodsList.length>2">
              <div class="more-btn" @click="setCountNext()" v-if="showMoreNext">显示更多</div>
              <div class="more-btn" @click="setCountNext()" v-if="!showMoreNext">收起商品</div>
            </div>
            <div class="flex-box count">
              <div class="flex-item total-count">共18件商品</div>
              <div class="flex-col text-right font-mind count-price">小记：<span class="theme-color">¥188.8</span></div>
            </div>
            <div class="flex-box send-way-wrap">
              <div class="flex-item send-way">配送方式</div>
              <checker class="flex-col text-right select-way-wrap" default-item-class="default-checker"
                       selected-item-class="selected-checker" v-model="demo11">
                <checker-item :value="item" v-for="(item, index) in items1" :key="index" class="item">{{item.value}}
                </checker-item>
              </checker>
            </div>
            <div class="flex-box get-address">
              <div class="flex-item">取货地址</div>
              <div class="flex-col font-mind text-right color-666 address">珠江花城扶水岸13栋109</div>
            </div>
          </div>
        </div>
      </div>
      <confirm v-model="showComfirm"
               title="提示"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">你确定要删除该商品么？</p>
      </confirm>
      <!-- 页面底部 -->
      <div class="count-box" v-if="!isEdit">
        <input type="checkbox" class="input-checkbox">
        <span class="label-checkbox">全选</span>
        <div class="col">
          <p>合计：<span>¥188.00</span></p>
          <p class="font-mind">优惠金额：¥23.1</p>
        </div>
        <div class="count" @click="count">结算</div>
      </div>

    </div>
    <div v-if="!login" class="car-noLogin">
      <div class="login-bt" @click="$router.push({path:'/login'})">
        立即登录
      </div>
    </div>
    <toast v-model="showPositionValue" type="text" :time="2000" is-show-mask :position="position"
           :text="toastText" width="10em" class="toast"></toast>
    <m-footer></m-footer>
  </div>
</template>

<script>
  import { XHeader, Checker, CheckerItem, Confirm, Toast } from 'vux'
  import mFooter from '../components/footer'
  import BScroll from 'better-scroll'

  export default {
    name: 'cart',
    components: {
      mFooter,
      XHeader,
      Checker,
      CheckerItem,
      BScroll,
      Confirm,
      Toast
    },
    data () {
      return {
        isEdit: false,
        isAll: false,
        thisAllChecked: false,
        nextAllChecked: false,
        isNext: false,
        thisTemVal: '',
        goodsCount: 3,
        showMoreThis: true,
        showMoreNext: true,
        login: true,
        thisGoodsList: [],
        NextGoodsList: [],
        limitNumberThis: 2,
        limitNumberNext: 2,
        items1: [{key: '1', value: '客户自取'}, {key: '2', value: '送货上门'}],
        demo11: {key: '1', value: '客户自取'},
        showComfirm: false,
        comfirmGoods: '',
        comfirmGoodsIndex: '',
        comfirmGoodsList: '',
        itemFlag: true,
        showPositionValue: false,
        toastText: '我是101提示',
        position: 'middle'
      }
    },
    created () {
      if (!localStorage.getItem('m-token')) {
        this.login = false
        return
      }
      this.post('/car/getUserCar', {
        token: localStorage.getItem('m-token'),
        villageId: localStorage.getItem('m-villageId')
      }).then((res) => {
        console.log(res.data)
        if (res.data.code === 100) {
          this.thisGoodsList = res.data.carList[1].shandianShop.goodsList
          this.NextGoodsList = res.data.carList[0].storeShop.goodsList
          this.$nextTick(() => {
            this.contentScroll.refresh()
          })
        } else {
          this.$router.push({path: 'login'})
        }
      })
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    methods: {
      setCountThis () {
        if (!this.showMoreThis) {
          this.limitNumberThis = 2
        } else {
          this.limitNumberThis = this.thisGoodsList.length
        }
        this.showMoreThis = !this.showMoreThis
        this.$nextTick(() => {
          this.contentScroll.refresh()
        })
      },
      setCountNext () {
        if (!this.showMoreNext) {
          this.limitNumberNext = 2
        } else {
          this.limitNumberNext = this.NextGoodsList.length
        }
        this.showMoreNext = !this.showMoreNext
        this.$nextTick(() => {
          this.contentScroll.refresh()
        })
      },
      count (item, type, index, list) {
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
              this.toastText = res.data.msg
              this.showPositionValue = true
              return
            }
            if (res.data.code === 102) {
              // 请登录
              this.$router.push({path: 'login'})
              return
            }
//            item.buyCount += 1
            console.log(res.data)
          })
          return
        }
        if (type === 2) {
          // 删除购物车
          if (item.buyCount <= 1) {
            // 保存当前商品信息，以供删除时使用
            this.showComfirm = true
            this.comfirmGoods = item
            this.comfirmGoodsIndex = index
            this.comfirmGoodsList = list
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
        this.contentScroll = new BScroll(this.$refs.content, {click: true, probeType: 3})
      },
      // 提示框取消回调
      onCancel () {
        console.log('取消')
      },
      // 提示框确认回调
      onConfirm () {
        this.post('/car/deleteCar', {
          token: localStorage.getItem('m-token'),
          goodsId: this.comfirmGoods.goodsId,
          carId: this.comfirmGoods.carId
        }).then((res) => {
          if (res.data.code === 100) {
            this.comfirmGoodsList.splice(this.comfirmGoodsIndex, 1)
            this.$nextTick(() => {
              this.contentScroll.refresh()
            })
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
        console.log('确认')
      },
      // 选中商品
      thisCheckAll (list) {
        this.thisAllChecked = !this.thisAllChecked
        list.forEach((item, index) => {
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', this.thisAllChecked)
          } else {
            item.checked = this.thisAllChecked
          }
        })
      },
      nextCheckAll (list) {
        this.nextAllChecked = !this.nextAllChecked
        list.forEach((item, index) => {
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', this.nextAllChecked)
          } else {
            item.checked = this.nextAllChecked
          }
        })
      },
      selectedGoods (item) {
        if (typeof item.checked === 'undefined') {
          this.$set(item, 'checked', true)
        } else {
          item.checked = !item.checked
        }
      }
    },
    computed: {
      filterListThis () {
        return this.thisGoodsList.slice(0, this.limitNumberThis)
      },
      filterListNext () {
        return this.NextGoodsList.slice(0, this.limitNumberNext)
      }
    }
  }
</script>

<style lang='less' scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .theme-color {
    color: @theme-color;
  }

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

  .input-checkbox {
    &:before {
      .fs(32);
      color: #666;
    }
  }

  .select-all-icon, .circle {
    color: #666;
    .fs(32);
  }

  .circle {
    .mr(35);
  }

  .checked {
    .mr(35);
  }

  .select-all-icon {
    .mr(10);
  }

  .selected-color {
    color: #0493ed;
  }

  .next-icon {
    background: @theme-color !important;
  }

  .label-checkbox {
    .fs(31);
    color: @font-color-m;
  }

  .goods-title {
    .fs(33);
    color: @font-color-m;
  }

  .price {
    color: @theme-color;
    .fs(36);
  }

  .count {
    .fs(30);
  }

  .total-count {
    color: #666 !important;
  }

  .count-price {
    .fs(30);
    color: #666;
  }

  .send {
    .fs(30);
    color: #666;
    .flex-col {
      .fs(26);
    }
  }

  .send-way-wrap {
    box-sizing: border-box;
    .h(92);
  }

  .send-way {
    .fs(30);
    color: #666;
  }

  .select-way-wrap {
    .item {
      .fs(28) !important;
    }
  }

  .get-address {
    box-sizing: border-box;
    .h(92);
    .fs(30);
    color: #666;
    .address {
      .fs(25);
    }
  }

  .vux-x-dialog {
    .weui-mask {

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
      /*padding: 10px;*/
      .pl(25);
      .pr(25);
      .pt(23);
      .pb(23);
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      img {
        .w(140);
        .h(140);
      }
    }

    .cart-view .content-view-scroller .default-checker {
      .fs(50) !important;
    }
    .block-title {
      .ml(150);
      font: italic bold 16px/1 'Microsoft Yahei';
      .fs(38);
      vertical-align: middle;
      .iconfont {
        .mr(10);
        display: inline-block;
        border-radius: 100px;
        .w(50);
        .h(50);
        text-align: center;
        font: normal 12px/20px 'iconfont';
        .fs(26);
        .lh(46);
        vertical-align: middle;
      }
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
      .mt(60);
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
      .h(55);
      .w(60);
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 5px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      position: relative;
    }

    .remove:before {
      content: '';
      .w(32);
      height: 1.2px;
      background-color: #444;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: @font-color-input;
    }

    .val-box {
      box-sizing: border-box;
      .w(68);
      .h(55);
      .lh(50);
      text-align: center;
      color: #666;
      outline: none;
      -webkit-appearance: none;
      border-radius: 0;
      border: 1px solid #ddd;
      border-left: none;
      border-right: none;
      .fs(32);
    }

    .added {
      box-sizing: border-box;
      .h(55);
      .w(60);
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
      .pl(16);
      .pr(16);
      .pt(8);
      .pb(8);
      background-color: #e1e1e1;
      border-radius: 100px;
      vertical-align: middle;
      font: 12px/1.2 'Microsoft Yahei';
      .fs(28);
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
      .ml(6);
      .mr(20);
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


</style>
