<template>
  <div class="order" @touchmove.prevent>
    <!--@click.native="confirm"-->
    <m-header :title="title" class="header">
      <span class="back iconfont" @click="$router.push('/cart')" slot="icon">&#xe600;</span>
    </m-header>
    <div class="content" ref="content">
      <div>
        <div class="order-list-wrap" v-if="thisGoodsList.length>0">
          <!--标题 及时送-->
          <div class="title">
            <div class="left f-l">
              即时送
            </div>
            <div class="right f-r">
              送货上门
            </div>
          </div>
          <!--收货地址 及时送-->
          <div class="adress" @click="$router.push({path:'/selecteAddress'})">
            <div class="iconfont icon f-l">&#xe638;</div>
            <div class="adress-info f-l" :class="{'disable-color':disabledAddressFlag}">
              <div class="receiver-info">
                <span class="color-444"
                      :class="{'disable-color':disabledAddressFlag}">收货人： </span>{{shippingInfo.shippingName}}
                <span class="tel">{{shippingInfo.shippingPhone}}</span>
              </div>
              <div class="receiver-info">
                <span class="color-444" :class="{'disable-color':disabledAddressFlag}">收货地址： </span>
                {{shippingInfo.cityName + shippingInfo.areaName + shippingInfo.villageName + shippingInfo.address}}
              </div>
            </div>
            <div class="iconfont icon-right f-l" :class="{'disable-color':disabledAddressFlag}">&#xe601;</div>
          </div>
          <!--列表标题-->
          <div class="goods-list-title">
            商品详情
            <p class="right f-r">共<span class="theme-color">{{selectedTotalCountThis}}</span>件</p>
          </div>
          <!--商品列表-->
          <div class="goods-list">
            <div class="item" v-for="(item, index) in filterListThis" :key="index">
              <div class="pic">
                <!--<lazy-image-->
                <!--:src='item.goodsImgUrl'-->
                <!--:placeholder='$store.state.defaultImg'-->
                <!--:events="['touchmove']"-->
                <!--width="100%"-->
                <!--height="100%"-->
                <!--&gt;</lazy-image>-->
                <img v-lazy="item.goodsImgUrl" alt="" width="100%" height="100%">
              </div>
              <div class="des">
                <p class="name">{{item.goodsName}}</p>
                <p class="price">￥{{item.canKaoPrice}}</p>
              </div>
              <div class="count">
                x{{item.buyCount}}
              </div>
            </div>
          </div>
          <!--更多-->
          <div class="more" v-if="thisGoodsList.length>2">
            <div class="bt t-c" @click="setCountThis()" v-if="showMoreThis">显示更多</div>
            <div class="bt t-c" @click="setCountThis()" v-if="!showMoreThis">收起商品</div>
          </div>
          <!-- 订单详情-->
          <div class="order-info this">
            <div class="left">
              <p>商品总价</p>
              <p>配送费</p>
            </div>
            <div class="right">
              <p class="s2">￥{{totalPriceThis}}</p>
              <div class="s1">
                <span>+</span>
                <span class="price">￥{{Thisfreight}}</span>
              </div>
            </div>
          </div>
          <!--留言与实际付款 及时送-->
          <div style="background: #fff">
            <!--留言 及时送-->
            <div class="leave-message">
              买家留言：
              <input type="text" class="input" placeholder="请输入文字" v-model="leaveMsgThis">
            </div>
            <!--实际付款 及时送-->
            <div class="pay-count">
              实际付款
              <span class="f-r count">￥{{parseFloat(totalPriceThis) + parseFloat(Thisfreight)}}</span>
            </div>
          </div>
        </div>
        <div class="order-list-wrap" v-if="NextGoodsList.length>0">
          <!--标题 次日达-->
          <div class="title">
            <div class="left f-l" style="color: #f95d43;">
              次日达
            </div>
            <div class="right f-r">
              {{sendWay.value}}
            </div>
          </div>
          <!--收货地址 次日达 自取-->
          <div class="adress" v-if="sendWay.key==='1'">
            <div class="iconfont icon f-l">&#xe638;</div>
            <div class="adress-info f-l">
              <div class="receiver-info">
                <span class="color-444">取件人： </span>{{userInfo.userName}}
                <span class="tel">{{userInfo.phone}}</span>
              </div>
              <div class="receiver-info">
                <span class="color-444">取件地址： </span>
                {{nextShop.pointAddress}}
              </div>
            </div>
            <div class="iconfont icon-right f-l">&#xe601;</div>
          </div>
          <!--收货地址 次日达 送货上门-->
          <div class="adress" @click="$router.push({path:'/selecteAddress'})" v-if="sendWay.key==='2'">
            <div class="iconfont icon f-l">&#xe638;</div>
            <div class="adress-info f-l" :class="{'disable-color':disabledAddressFlag}">
              <div class="receiver-info">
                <span class="color-444"
                      :class="{'disable-color':disabledAddressFlag}">收货人： </span>{{shippingInfo.shippingName}}
                <span class="tel">{{shippingInfo.shippingPhone}}</span>
              </div>
              <div class="receiver-info">
                <span class="color-444" :class="{'disable-color':disabledAddressFlag}">收货地址： </span>
                {{shippingInfo.cityName + shippingInfo.areaName + shippingInfo.villageName + shippingInfo.address}}
              </div>
            </div>
            <div class="iconfont icon-right f-l" :class="{'disable-color':disabledAddressFlag}">&#xe601;</div>
          </div>
          <!--列表标题 次日达-->
          <div class="goods-list-title">
            商品详情
            <p class="right f-r">共<span class="theme-color">{{selectedTotalCountNext}}</span>件</p>
          </div>
          <!--商品列表 次日达-->
          <div class="goods-list">
            <div class="item" v-for="(item, index) in filterListNext" :key="index">
              <div class="pic">
                <!--<lazy-image-->
                <!--:src='item.goodsImgUrl'-->
                <!--:placeholder='$store.state.defaultImg'-->
                <!--:events="['touchmove']"-->
                <!--width="100%"-->
                <!--height="100%"-->
                <!--&gt;</lazy-image>-->
                <img v-lazy="item.goodsImgUrl" alt="" width="100%" height="100%">
              </div>
              <div class="des">
                <p class="name">{{item.goodsName}}</p>
                <p class="price">￥{{item.price}}</p>
              </div>
              <div class="count">
                x{{item.buyCount}}
              </div>
            </div>
          </div>
          <!--更多 次日达-->
          <div class="more" v-if="NextGoodsList.length>2">
            <div class="bt t-c" @click="setCountNext()" v-if="showMoreNext">显示更多</div>
            <div class="bt t-c" @click="setCountNext()" v-if="!showMoreNext">收起商品</div>
          </div>
          <!-- 订单详情 次日达-->
          <div class="order-info">
            <div class="left">
              <p>商品总价</p>
              <p>优惠金额</p>
              <p>配送费</p>
            </div>
            <div class="right">
              <!--商品总价 次日达-->
              <p class="s2">￥{{totalPriceNext}}</p>
              <div class="s1">
                <span>-</span>
                <!--优惠金额 次日达-->
                <span class="price">￥{{discount}}</span>
              </div>
              <div class="s1">
                <span>+</span>
                <!--配送费 次日达-->
                <span class="price">￥{{Nextfreight}}</span>
              </div>
            </div>
          </div>
          <!--留言与实际付款 次日达-->
          <div style="background: #fff">
            <!--留言 次日达-->
            <div class="leave-message">
              买家留言：
              <input type="text" class="input" placeholder="请输入文字" v-model="leaveMsgNext">
            </div>
            <!--实际付款 次日达-->
            <div class="pay-count">
              实际付款
              <span
                class="f-r count">￥{{parseFloat(totalPriceNext) + parseFloat(Nextfreight) - parseFloat(discount)}}</span>
            </div>
          </div>
        </div>
        <!--支付方式-->
        <div class="pay-methods">
          <span>支付方式：</span>
          <div class="bt-wrap">
            <div class="item t-c" @click="onPayChange(2)" :class="{'weixin-color':payFlag}">
              微信
            </div>
            <!--<div class="item t-c" @click="onPayChange(1)" :class="{'zhifubao-color':!payFlag}">-->
            <!--支付宝-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      合计： <span
      class="theme-color">{{totalPrice}}</span>
      <!--@click="confirm"-->
      <div class="bt f-r t-c" @click="confirm">
        确认下单
      </div>
    </div>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  import BScroll from 'better-scroll'
  //  import { wxConfig, bus } from '../util/util'
  export default{
    name: 'confirmOrder',
    components: {
      mHeader,
      BScroll
    },
    data () {
      return {
        title: '确认下单',
        thisGoodsList: this.$store.state.carOrderThisGoodsList, // 及时送 商品
        NextGoodsList: this.$store.state.carOrderNextGoodsList, // 次日达 商品
        Thisfreight: this.$store.state.Thisfreight, // 运费 及时送
        Nextfreight: this.$store.state.Nextfreight, // 运费 次日达
        sendWay: this.$store.state.sendWay, // 配送方式  1 自取 2 送货上门
        shippingInfo: this.$store.state.shippingInfo, // 收货相关信息 送货到家
        // pointInfo: this.$store.state.shippingInfo, // 收货相关信息 自取
        selectedTotalCountThis: this.$store.state.selectedTotalCountThis, // 商品数量 及时送
        selectedTotalCountNext: this.$store.state.selectedTotalCountNext, // 商品数量 次日达
        totalPriceThis: this.$store.state.totalPriceThis, // 商品总价 及时送
        totalPriceNext: this.$store.state.totalPriceNext, // 商品总价 次日达
        showMoreThis: true,  // 显示更多FLag 及时送
        showMoreNext: true,   // 显示更多FLag 次日达
        limitNumberThis: 2,    // 显示更多默认显示商品数量 及时送
        limitNumberNext: 2,   // 显示更多默认显示商品数量 次日达
        discount: 0,         // 优惠金额 次日达
        payFlag: true, // 支付方式Flag
        payType: 2, // 1 支付宝 2 微信
        leaveMsgThis: '', // 留言 及时送
        leaveMsgNext: '', // 留言 次日达
        cartInfo: this.$store.state.cartInfo, // 购物车信息
        userInfo: JSON.parse(localStorage.getItem('m-userInfo')), // 用户信息
        orderList: '',
        thisShop: this.$store.state.thisShop, // 购物车及时送相关信息
        nextShop: this.$store.state.nextShop, // 购物车次日达相关信息
        localCityId: Number(localStorage.getItem('m-cityId')),
        localAreaId: Number(localStorage.getItem('m-areaId')),
        localVillageId: Number(localStorage.getItem('m-villageId'))
      }
    },
    created () {
      // 快速购买
      if (this.$route.query.fastBuy === 'fastBuy') {
        var info = this.$store.state.fastBuyInfo
        this.thisGoodsList = info.carList[0].shandianShop.goodsList
        this.Thisfreight = info.carList[0].shandianShop.freight
        this.shippingInfo = info.shippingInfo
        this.selectedTotalCountThis = info.totalBuyCount
        this.totalPriceThis = Number(this.thisGoodsList[0].buyCount) * Number(this.thisGoodsList[0].canKaoPrice)
      }
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    methods: {
      _initScroll () {
        this.contentScroll = new BScroll(this.$refs.content, {click: true})
      },
      // 点击显示更多与隐藏 togle 及时送
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
      // 点击显示更多与隐藏 togle 次日达
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
      // 支付方式
      onPayChange (type) {
        if (type === 2) {
          this.payFlag = true
        } else {
          this.payFlag = false
        }
        this.payType = type
      },
      confirm () {
        // 如果收获地址不在服务范围内
        if (this.disabledAddressFlag && !(this.sendWay.key === '1' && (this.thisGoodsList.length === 0))) {
          this.$vux.toast.text('亲，当前收货地址超出服务范围，请切换收货地址', 'middle')
          return
        }
        // 规避快速点击
        var flag = false
        if (!flag) {
          flag = true
          let orderJsonObj = {}
          this.orderList = []
          // 及时送
          if (this.thisGoodsList.length > 0) {
            let thisOrder = {}
            thisOrder.cityId = this.thisShop.cityId
            thisOrder.areaId = this.thisShop.areaId
            thisOrder.goodsList = []
            this.thisGoodsList.forEach((item, index) => {
              let obj = {}
              obj.carId = item.carId
              obj.goodsId = item.goodsId
              thisOrder.goodsList.push(obj)
            })
            thisOrder.payType = this.payType
            thisOrder.remarks = this.leaveMsgThis
            // 配送方式:1自取 2配送上门
            thisOrder.sendType = 2
            thisOrder.shippingId = this.shippingInfo.shippingId
            thisOrder.shopType = this.thisShop.shopType
            thisOrder.storeId = this.thisShop.storeId
            thisOrder.villageId = this.thisShop.villageId
            this.orderList.push(thisOrder)
          }
          // 次日达
          if (this.NextGoodsList.length > 0) {
            let nextOrder = {}
            nextOrder.cityId = this.nextShop.cityId
            nextOrder.areaId = this.nextShop.areaId
            nextOrder.goodsList = []
            this.NextGoodsList.forEach((item, index) => {
              let obj = {}
              obj.carId = item.carId
              obj.goodsId = item.goodsId
              nextOrder.goodsList.push(obj)
            })
            nextOrder.payType = this.payType
            nextOrder.remarks = this.leaveMsgNext
            nextOrder.shopType = this.nextShop.shopType
            nextOrder.storeId = this.nextShop.storeId
            nextOrder.villageId = this.nextShop.villageId
            // 配送方式:1自取 2配送上门
            nextOrder.sendType = parseInt(this.sendWay.key)
            if (nextOrder.sendType === 2) {
              nextOrder.shippingId = this.shippingInfo.shippingId
              nextOrder.pointAddress = ''
              nextOrder.qujianName = ''
              nextOrder.qujianPhone = ''
            }
            if (nextOrder.sendType === 1) {
              nextOrder.shippingId = ''
              nextOrder.pointAddress = this.nextShop.pointAddress
              nextOrder.qujianName = this.userInfo.userName
              nextOrder.qujianPhone = this.userInfo.phone
            }
            this.orderList.push(nextOrder)
          }
          orderJsonObj.orderList = this.orderList
          let orderJsonStr = JSON.stringify(orderJsonObj)
          this.post('/orders/submitOrders_new', {
            token: localStorage.getItem('m-token'),
            orderStr: orderJsonStr
          }).then((res) => {
            if (res.data.code === 100) {
              this.$store.commit('saveOrderNumList', res.data.orderNumList)
              this.weixinPay(JSON.parse(localStorage.getItem('m-userInfo')).userId, this.totalPrice, res.data.orderNumList, this)
            }
            if (res.data.code === 101) {
              this.$vux.toast.text(res.data.msg, 'middle')
            }
            if (res.data.code === 102) {
              this.$vux.toast.text(res.data.msg, 'middle')
              localStorage.removeItem('m-token')
            }
            setTimeout(() => {
              flag = false
            }, 1500)
          })
        }
      }
    },
    computed: {
      // 显示更多与隐藏商品及时送
      filterListThis () {
        return this.thisGoodsList.slice(0, this.limitNumberThis)
      },
      // 显示更多与隐藏商品  次日达
      filterListNext () {
        return this.NextGoodsList.slice(0, this.limitNumberNext)
      },
      // 合计
      totalPrice: {
        set () {
          if (this.thisGoodsList.length > 0) {
            var thisFreight = Number(this.Thisfreight)
          } else {
            thisFreight = 0
          }
          if (this.NextGoodsList.length > 0 && this.sendWay.key !== '1') {
            var nextFreight = Number(this.Nextfreight)
          } else {
            nextFreight = 0
          }
          let total = (Number(this.totalPriceThis) + thisFreight + Number(this.totalPriceNext) + nextFreight - Number(this.discount)).toFixed(1)
          return total
        },
        get () {
          if (this.thisGoodsList.length > 0) {
            var thisFreight = Number(this.Thisfreight)
          } else {
            thisFreight = 0
          }
          if (this.NextGoodsList.length > 0 && this.sendWay.key !== '1') {
            var nextFreight = Number(this.Nextfreight)
          } else {
            nextFreight = 0
          }
          let total = (Number(this.totalPriceThis) + thisFreight + Number(this.totalPriceNext) + nextFreight - Number(this.discount)).toFixed(1)
          return total
        }
      },
      disabledAddressFlag: {
        set () {
          // 判断当前收获地址是否可用
          var disabledAddressFlag = (this.shippingInfo.areaId !== this.localAreaId) || (this.shippingInfo.cityId !== this.localCityId) || (this.shippingInfo.villageId !== this.localVillageId)
          return disabledAddressFlag
        },
        get () {
          // 判断当前收获地址是否可用
          var disabledAddressFlag = (this.shippingInfo.areaId !== this.localAreaId) || (this.shippingInfo.cityId !== this.localCityId) || (this.shippingInfo.villageId !== this.localVillageId)
          return disabledAddressFlag
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .color-222 {
    color: #222;
  }

  .color-444 {
    color: #444;
  }

  .theme-color {

    color: @theme-color;
  }

  .disable-color {
    color: #d2d2d2 !important;
  }

  .order {
    .fs(25);
    .header {
      background: @theme-color;
      color: #fff;
      .back {
        color: #fff;
      }
    }
    .content {
      position: absolute;
      .t(92);
      left: 0;
      right: 0;
      .b(110);
      overflow: hidden;
      .order-list-wrap {
        .title {
          .pl(31);
          .pr(31);
          .h(88);
          .lh(88);
          background-size: 100% 100%;
          background-color: #fff;
          .left {
            font: italic bold 16px/1 'Microsoft Yahei';
            .fs(32);
            .lh(87);
            color: @theme-color-blue;
          }
          .right {
            .mr(19);
            .fs(25);
            color: #222;
          }
        }
        .adress {
          display: flex;
          .pl(31);
          .pr(31);
          .pb(10);
          align-items: center;
          background: url("../assets/querenXD-xinfeng@2x.png") no-repeat;
          background-size: 100% 100%;
          .icon {
            .w(115);
            .lh(140);
            color: @theme-color;
            .fs(64);
          }
          .adress-info {
            box-sizing: border-box;
            .w(574);
            .pt(29);
            .lh(47);
            .fs(26);
            color: #000;
            .tel {
              float: right;
              .mr(15);
            }
          }
          .icon-right {
            .fs(30);
          }
        }
        .goods-list-title {
          .h(70);
          .lh(70);
          .pl(31);
          .pr(31);
          .fs(30);
          background: #fff;
          color: @font-color-m;
          .right {
            color: @font-color-input;
          }
        }
        .goods-list {
          background: #f6f8fa;
          .item {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            .h(141);
            border-top: 1px solid #eee;
            .pl(50);
            .pr(50);
            .pic {
              .w(100);
              .h(100);
              .mr(31);
              img {
                width: 100%;
                height: 100%;
              }
            }
            .des {
              .w(512);
              .fs(28);
              .lh(28);
              .h(75);
              .name {
                color: #444;
                .h(51);
              }
              .price {
                color: @theme-color;
              }
            }
            .count {
              color: #999;
              .fs(25);
            }
          }
        }
        .more {
          display: flex;
          border-top: 1px solid #eee;
          justify-content: center;
          align-items: center;
          .h(89);
          .bt {
            border-radius: 8px;
            .w(150);
            .h(38);
            .lh(38);
            .fs(25);
            background: #ddd;
            color: @font-color-m;
          }
        }
        .order-info {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          .pl(35);
          .pr(35);
          .h(170);
          .lh(40);
          color: #666;
          .fs(28);
          border-bottom: 1px solid #eee;
          &.this {
            p {
              .lh(58);
            }
          }
          .left {
            .h(107);
          }
          .right {
            .h(107);
            .price {
              .ml(40);
            }
            .s2, .s1 {
              display: flex;
              justify-content: flex-end;
            }
          }
        }
        .leave-message {
          .h(75);
          .lh(75);
          .ml(35);
          color: #666;
          background: #fff;
          border-bottom: 1px solid #eee;
          .fs(25);
          .input {
            .ml(40);
            .fs(25);
            border: none;
            outline: none;
            &::-webkit-input-placeholder {
              color: #999;
            }
          }
        }
        .pay-count {
          .h(75);
          .lh(75);
          .pl(35);
          .pr(35);
          .fs(28);
          background: #fff;
          color: @font-color-m;
          .count {
            color: @theme-color;
          }
        }
      }
      .pay-methods {
        .fs(28);
        .pl(35);
        .pr(50);
        .h(88);
        .lh(88);
        .mt(18);
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        .bt-wrap {
          display: flex;
          .item {
            .w(150);
            .h(55);
            .lh(55);
            .fs(32);
            border-radius: 15px;
            color: #fff;
            background: #bfbfbf;
            &:first-child {
              .mr(43);
            }
          }
          .weixin-color {
            background: #08b30c;
          }
          .zhifubao-color {
            background: @theme-color-blue;
          }
        }
      }
    }
    .footer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      .pl(38);
      .h(110);
      .lh(110);
      color: @font-color-m;
      background: #FFF;
      .fs(34);
      .bt {
        .w(228);
        .h(110);
        .lh(110);
        background: @theme-color;
        color: #fff;
      }
    }
  }
</style>
