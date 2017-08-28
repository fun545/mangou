<template>
  <div class="cart-view" @touchmove.prevent>
    <div class="header t-c">
      购物车
      <div class="edit" @click="edit" v-if="token">
        <span v-if="editShow">编辑</span>
        <span v-if="!editShow">完成</span>
      </div>
    </div>
    <div class="content-wrapper">
      <!--已登录-->
      <div v-if="token">
        <div v-if="thisGoodsList.length!==0||NextGoodsList.length!==0">
          <!-- 页面中心 -->
          <div class="content-view-scroller" ref="content">
            <div>
              <!-- 即时送 -->
              <div class="this-wrap" v-if="thisGoodsList.length">
                <div class="flex-box this">
                  <!-- 全选按钮 及时送-->
                  <div class="flex-item check-all" @click="thisCheckAll(thisGoodsList)">
                    <div class="select-all-icon d-ib">
                      <i class="iconfont selected-color circle" v-if="thisAllChecked">&#xe634;</i>
                      <i class="iconfont circle" v-if="!thisAllChecked">&#xe635;</i>
                    </div>
                    <span class="label-checkbox">全选</span>
                  </div>
                  <!-- 及时送标题-->
                  <div class="flex-col">
                    <div class="block-title color-0493ed"><i class="iconfont">&#xe61f;</i>即时送</div>
                  </div>
                  <!--  凑单 及时送-->
                  <div class="flex-col single" v-if="singleShowThis">
                    <div class="difference" style="color: #999">还差<span
                      style="color:#f95d43;">{{singlePriceThis}}</span>元起送
                    </div>
                    <div class="go-single theme-color" @click="$router.push({path:'/this'})">去凑单></div>
                  </div>
                  <!--商家打烊提示-->
                  <div class="flex-col closing" v-if="thisShop.shopStatus!==0">
                    <div class="difference" style="color:#f95d43;">店家已打烊</div>
                    <div class="go-single" style="color: #999">({{thisShop.shopHours}})</div>
                  </div>
                </div>
                <!-- 及时送购物车商品列表-->
                <div class="flex-box this-goods" v-for="(item,index) in filterListThis" :key="index">
                  <!--单选按钮 及时送-->
                  <div class="d-ib checked-icon-wrap" @click="selectedGoods(item)" v-if="item.status===1">
                    <i class="iconfont selected-color checked" v-if="item.checked">&#xe634;</i>
                    <i class="iconfont circle" v-if="!item.checked">&#xe635;</i>
                  </div>
                  <!--已售罄，失效标识 及时送-->
                  <div class="disabled-item t-c" v-if="item.status===2">
                    已售罄
                  </div>
                  <div class="disabled-item t-c" v-if="item.status===3">
                    失效
                  </div>
                  <!--商品图片 及时送-->
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
                  <!--商品信息 及时送-->
                  <div class="flex-col">
                    <div class="goods-title">{{item.goodsName}}</div>
                    <div class="flex-box">
                      <div class="flex-col font-normal price">￥{{item.canKaoPrice}}</div>
                      <div class="remove" @click="count(item,2,index,thisGoodsList)"/>
                      <input type="number" class="val-box" v-model="item.buyCount" v-on:blur="inputChange(item)"/>
                      <div class="added" @click="count(item,1)"/>
                    </div>
                  </div>
                </div>
                <!--更多 及时送-->
                <div v-if="thisGoodsList.length>2">
                  <div class="more-btn" @click="setCountThis()" v-if="showMoreThis">显示更多</div>
                  <div class="more-btn" @click="setCountThis()" v-if="!showMoreThis">收起商品</div>
                </div>
                <div class="flex-box count">
                  <!--选择商品总计 及时送-->
                  <div class="flex-item total-count">共{{selectedTotalCountThis}}件商品</div>
                  <!--选择商品总价 及时送-->
                  <div class="flex-col text-right font-mind count-price">小计：<span
                    class="theme-color">¥{{thisTotalPrice}}</span></div>
                </div>
                <!--配送费 及时送-->
                <div class="flex-box send">
                  <div class="flex-item">配送费用:</div>
                  <div class="flex-col text-right font-mind theme-color">{{CThisfreight}}</div>
                </div>
              </div>
              <!-- 次日达 -->
              <div class="next-wrap" v-if="NextGoodsList.length">
                <div class="flex-box this">
                  <!-- 全选按钮 次日达-->
                  <div class="flex-item check-all" @click="nextCheckAll(NextGoodsList)">
                    <div class="select-all-icon d-ib">
                      <i class="iconfont selected-color circle" v-if="nextAllChecked">&#xe634;</i>
                      <i class="iconfont circle" v-if="!nextAllChecked">&#xe635;</i>
                    </div>
                    <span class="label-checkbox">全选</span>
                  </div>
                  <!--次日达标题-->
                  <div class="flex-col">
                    <div class="block-title theme-color"><i class="iconfont next-icon">&#xe60a;</i>次日达</div>
                  </div>
                  <!--  凑单 次日达  暂时不做-->
                  <!--<div class="flex-col single" v-if="singleShowNext">
                    <div class="difference" style="color: #999">还差<span style="color:#f95d43;">{{singlePriceNext}}</span>元起送
                    </div>
                    <div class="go-single theme-color" @click="$router.push({path:'/this'})">去凑单></div>
                  </div>-->
                </div>
                <!--购物车列表 次日达-->
                <div class="flex-box this-goods" v-for="(item,index) in filterListNext" :key="index">
                  <!--单选按钮 次日达-->
                  <div class="d-ib checked-icon-wrap" @click="selectedGoods(item)" v-if="item.status===1">
                    <i class="iconfont selected-color checked" v-if="item.checked">&#xe634;</i>
                    <i class="iconfont circle" v-if="!item.checked">&#xe635;</i>
                  </div>
                  <!--已售罄，失效标识 次日达-->
                  <div class="disabled-item t-c" v-if="item.status===2">
                    已售罄
                  </div>
                  <div class="disabled-item t-c" v-if="item.status===3">
                    失效
                  </div>
                  <!--图片 次日达-->
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
                  <!--商品信息 次日达-->
                  <div class="flex-col">
                    <div class="goods-title">{{item.goodsName}}</div>
                    <div class="flex-box">
                      <div class="flex-col font-normal price">￥{{item.price}}</div>
                      <div class="remove" @click="count(item,2,index,NextGoodsList)"/>
                      <input type="tel" class="val-box" v-model="item.buyCount" v-on:blur="inputChange(item)"/>
                      <div class="added" @click="count(item,1)"/>
                    </div>
                  </div>
                </div>
                <!--更多 次日达-->
                <div v-if="NextGoodsList.length>2">
                  <div class="more-btn" @click="setCountNext()" v-if="showMoreNext">显示更多</div>
                  <div class="more-btn" @click="setCountNext()" v-if="!showMoreNext">收起商品</div>
                </div>
                <div class="flex-box count">
                  <!--选择商品总计 次日达-->
                  <div class="flex-item total-count">共{{selectedTotalCountNext}}件商品</div>
                  <!--选择商品总价 次日达-->
                  <div class="flex-col text-right font-mind count-price">小计：<span
                    class="theme-color">¥{{nextTotalPrice}}</span></div>
                </div>
                <div class="flex-box send-way-wrap">
                  <div class="flex-item send-way">配送方式</div>
                  <checker class="flex-col text-right select-way-wrap" default-item-class="default-checker"
                           selected-item-class="selected-checker" v-model="demo11" @on-change="sendWayChange">
                    <checker-item :value="item" v-for="(item, index) in items1" :key="index" class="item">{{item.value}}
                    </checker-item>
                  </checker>
                </div>
                <!--配送费 次日达-->
                <div class="flex-box send" v-if="nextFreightShow">
                  <div class="flex-item">配送费用:</div>
                  <div class="flex-col text-right font-mind">配送费:￥{{Nextfreight}}</div>
                </div>
                <div class="flex-box get-address" v-if="!nextFreightShow">
                  <div class="flex-item">取货地址</div>
                  <div class="flex-col font-mind text-right color-666 address">{{nextShop.address}}</div>
                </div>
              </div>
            </div>
          </div>
          <confirm v-model="showComfirm"
                   title="提示"
                   @on-confirm="onConfirm">
            <p style="text-align:center;">{{comfirmText}}</p>
          </confirm>
          <confirm v-model="showComfirmDel"
                   title="提示"
                   @on-confirm="delConfirm">
            <p style="text-align:center;">{{comfirmText}}</p>
          </confirm>
          <!-- 营业时间弹窗暂时关闭-->
          <!-- <alert v-model="showAlert" button-text="我知道了">
             <p class="alert-title" slot="title">{{alertText}}</p>
             <div class="alert-content" name="content">
               <p class="p1">暂不接受新的订单</p>
               <p class="p2">(门店营业时间：{{thisShop.shopHours}})</p>
             </div>
           </alert>-->
          <!-- 页面底部 -->
          <div class="count-box" v-if="!(thisGoodsList.length===0&&NextGoodsList.length===0)">
            <!--<input type="checkbox" class="input-checkbox">-->
            <div @click="selectAll()">
              <div class="select-all-icon d-ib">
                <i class="iconfont selected-color circle" v-if="allChecked">&#xe634;</i>
                <i class="iconfont circle" v-if="!allChecked">&#xe635;</i>
              </div>
              <span class="label-checkbox">全选</span>
            </div>
            <div class="col">
              <!--次日达及时送总合计-->
              <div v-if="editShow">
                <p>合计：<span>¥{{thisTotalPrice + nextTotalPrice}}</span></p>
                <p class="font-mind">为您节省：¥{{Discount}}</p>
              </div>
            </div>
            <div class="count t-c" @click="toCount">{{ToCountText}}</div>
          </div>
        </div>
        <!--购物车无商品-->
        <div class="car-no-goods t-c" v-if="!loadingFlag&&thisGoodsList.length===0&&NextGoodsList.length===0">
          <div @click="$router.push({path:'/next'})" class="bt cl">去超市逛逛</div>
        </div>
      </div>
      <!--未登录-->
      <div v-if="!token" class="car-noLogin">
        <div class="login-bt" @click="$router.push({path:'/login'})">
          立即登录
        </div>
      </div>
      <!--加载动画-->
      <loading v-if="token" :loadingFlag="loadingFlag"></loading>
    </div>
    <m-footer></m-footer>
  </div>
</template>

<script>
  import { XHeader, Checker, CheckerItem, Confirm } from 'vux'
  import mFooter from '../components/footer'
  import BScroll from 'better-scroll'
  import loading from '../components/loading'

  export default {
    name: 'cart',
    components: {
      mFooter,
      XHeader,
      Checker,
      CheckerItem,
      BScroll,
      Confirm,
//      Alert,
      loading
    },
    data () {
      return {
        thisAllChecked: false, // 全选Flag 及时送
        nextAllChecked: false, // 全选Flag 次日达
        allChecked: false,      // 全选
        showMoreThis: true,    // 显示更多FLag 及时送
        showMoreNext: true,    // 显示更多FLag 次日达
        thisGoodsList: [],     // 购物车商品列表 及时送
        NextGoodsList: [],     // 购物车商品列表 次日达
        limitNumberThis: 2,    // 显示更多默认显示商品数量 及时送
        limitNumberNext: 2,    // 显示更多默认显示商品数量 次日达
        items1: [{key: '1', value: '客户自取'}, {key: '2', value: '送货上门'}],
        demo11: {key: '1', value: '客户自取'},
        showComfirm: false,    // 弹出提示框FLag (减号)
        showComfirmDel: false,    // 弹出提示框FLag (删除)
        comfirmText: '你确定要删除该商品么?',       // 弹出提示框文本
        showAlert: false,      // alert flag
        alertText: '',         // alert文本内容
        comfirmGoods: '',      // 弹出提示商品
        comfirmGoodsIndex: '', // 弹出提示商品索引
        comfirmGoodsList: '',  // 弹出提示商品列表
        Thisfreight: '',     // 运费 及时送
        Nextfreight: '',     // 运费 次日达
        nextFreightShow: false,  // 次日达运费默认flag
        thisShop: '', // 及时送JOSN数据
        nextShop: '', // 次日达JSON数据
        singleShowThis: true, // 差额显示Flag 及时送
        singleShowNext: true, // 差额显示Flag  次日达
        editShow: true,
        ToCountText: '去结算',
        token: localStorage.getItem('m-token'),
        loadingFlag: true, // 加载页面
        fastClick: false
      }
    },
    async created () {
      // 获取购物车列表数据
      if (this.token) {
        await this.post('/car/getUserCar', {
          token: this.token,
          villageId: localStorage.getItem('m-villageId')
        }).then((res) => {
          this.$store.state.cartInfo = res.data
          if (res.data.code === 100) {
            // 商品列表 及时送
            this.thisGoodsList = res.data.carList[1].shandianShop.goodsList
            // 商品列表 次日达
            this.NextGoodsList = res.data.carList[0].storeShop.goodsList
            // 运费 次日达
            this.Nextfreight = res.data.carList[0].storeShop.freight
            // 运费 及时送
            this.Thisfreight = res.data.carList[1].shandianShop.freight
            // 及时送相关信息
            this.$store.commit('saveThisShop', res.data.carList[1].shandianShop)
            this.thisShop = res.data.carList[1].shandianShop
            // 次日达相关信息
            this.$store.commit('saveNextShop', res.data.carList[0].storeShop)
            this.nextShop = res.data.carList[0].storeShop
//            this.$store.state.thisShop = res.data.carList[1].shandianShop
//            this.$store.state.nextShop = res.data.carList[0].storeShop
            // 收货相关信息
//            this.$store.state.shippingInfo = res.data.shippingInfo
            this.$store.commit('saveShippingInfo', res.data.shippingInfo)
            // 判断店铺营业状态
            this.shopStatusMethods(this.thisShop.shopStatus)
            // 购物车数量
            this.$store.commit('increment', res.data.totalBuyCount)
            this.$nextTick(() => {
              this._initScroll()
            })
          }
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'middle')
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'middle')
            localStorage.removeItem('m-token')
          }
        })
        this.loadingFlag = false
        // 初始化默认配送方式
        this.$store.state.sendWay = {key: '1', value: '客户自取'}
      }
    },
    watch: {
      '$route' (to, from) {
        this.$nextTick(() => {
          setTimeout(() => {
            if (typeof this.contentScroll.refresh === 'function') {
              this.contentScroll.refresh()
            }
          }, 1000)
        })
      }
    },
    methods: {
      // 判断商铺营业状态
      shopStatusMethods (status) {
        // 放假中
        if (status === 1) {
          this.alertText = '门店放假中'
          this.showAlert = true
        }
        // 非营业时间
        if (status === 2) {
          this.alertText = '门店休息中'
          this.showAlert = true
        }
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
      // 点击加减改变数量
      async count (item, type, index, list) {
//        this.$router.push({path: '/order_enter'})
        if (!this.fastClick) {
          this.fastClick = true
          if (type === 1) {
            await this.post('/car/addCar', {
              token: this.token,
              goodsId: item.goodsId,
              buyCount: 1,
              storeId: item.storeId,
              shopType: item.shopType,
              type: 1,
              villageId: localStorage.getItem('m-villageId')
            }).then((res) => {
              if (res.data.code === 100) {
                item.buyCount = res.data.buyCount
                this.$store.commit('increment', res.data.totalBuyCount)
              }
              if (res.data.code === 101) {
                this.$vux.toast.text(res.data.msg, 'middle')
              }
              if (res.data.code === 102) {
                this.$vux.toast.text(res.data.msg, 'middle')
                localStorage.removeItem('m-token')
              }
            })
          }
          if (type === 2) {
            // 删除购物车
            if (item.buyCount <= 1) {
              // 保存当前商品信息，以供删除时使用
              this.showComfirm = true
              this.comfirmGoods = item
              this.comfirmGoodsIndex = index
              this.comfirmGoodsList = list
              this.fastClick = false
              return
            }
            await this.post('/car/addCar', {
              token: this.token,
              goodsId: item.goodsId,
              buyCount: 1,
              storeId: item.storeId,
              shopType: item.shopType,
              type: 2,
              villageId: localStorage.getItem('m-villageId')
            }).then((res) => {
              if (res.data.code === 100) {
                item.buyCount = res.data.buyCount
                this.$store.commit('increment', res.data.totalBuyCount)
              }
              if (res.data.code === 101) {
                this.$vux.toast.text(res.data.msg, 'middle')
              }
              if (res.data.code === 102) {
                this.$vux.toast.text(res.data.msg, 'middle')
                localStorage.removeItem('m-token')
              }
            })
          }
          this.fastClick = false
        }
      },
      // 输入改变数量
      inputChange (item) {
        // 输入的是NAN
        if (isNaN(parseInt(item.buyCount))) {
          item.buyCount = 1
          this.inputChangePost(item)
          return
        }
        // 0
        if (item.buyCount <= 0) {
          item.buyCount = 2
          this.inputChangePost(item)
          return
        }
        // 大于库存
        if (item.buyCount > item.kucun) {
          item.buyCount = item.kucun
          this.inputChangePost(item)
          return
        }
        this.inputChangePost(item)
      },
      // 输入改变数量请求方法
      inputChangePost (item) {
        this.post('/car/addCar', {
          token: this.token,
          goodsId: item.goodsId,
          buyCount: item.buyCount,
          shopType: item.shopType,
          type: 3,
          villageId: localStorage.getItem('m-villageId')
        }).then((res) => {
          if (res.data.code === 100) {
            item.buyCount = res.data.buyCount
            this.$store.commit('increment', res.data.totalBuyCount)
          }
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'middle')
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'middle')
            localStorage.removeItem('m-token')
          }
        })
      },
      _initScroll () {
        this.contentScroll = new BScroll(this.$refs.content, {
          click: true
        })
      },
      // 提示框确认回调(减号减少到0时)
      onConfirm () {
        this.post('/car/deleteCar', {
          token: this.token,
          goodsId: this.comfirmGoods.goodsId,
          carId: this.comfirmGoods.carId
        }).then((res) => {
          if (res.data.code === 100) {
            this.comfirmGoodsList.splice(this.comfirmGoodsIndex, 1)
            this.$nextTick(() => {
              this.contentScroll.refresh()
            })
            this.$store.commit('totalBuyCountReduce', 1)
            return
          }
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'middle')
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'middle')
            localStorage.removeItem('m-token')
          }
        })
      },
      // 提示框确认回调(删除一个或多个商品)
      async delConfirm () {
        for (let i = 0; i < this.thisGoodsList.length; i++) {
          var curThis = this.thisGoodsList[i]
          if (curThis.checked) {
            await this.post('/car/deleteCar', {
              token: this.token,
              carId: curThis.carId
            }).then((res) => {
              if (res.data.code === 100) {
                this.thisGoodsList.splice(i, 1)
                i--
                this.$store.commit('totalBuyCountReduce', 1)
              }
              if (res.data.code === 101) {
                this.$vux.toast.text(res.data.msg, 'middle')
              }
              if (res.data.code === 102) {
                this.$vux.toast.text(res.data.msg, 'middle')
                localStorage.removeItem('m-token')
              }
            })
          }
          if (curThis.NoGoods) {
            await this.post('/car/deleteCar', {
              token: this.token,
              carId: curThis.carId
            }).then((res) => {
              if (res.data.code === 100) {
                this.thisGoodsList.splice(i, 1)
                i--
                this.$store.commit('totalBuyCountReduce', 1)
              }
              if (res.data.code === 101) {
                this.$vux.toast.text(res.data.msg, 'middle')
              }
              if (res.data.code === 102) {
                this.$vux.toast.text(res.data.msg, 'middle')
                localStorage.removeItem('m-token')
              }
            })
          }
        }
        for (let i = 0; i < this.NextGoodsList.length; i++) {
          var curNext = this.NextGoodsList[i]
          if (curNext.checked) {
            await this.post('/car/deleteCar', {
              token: this.token,
              carId: curNext.carId
            }).then((res) => {
              if (res.data.code === 100) {
                this.NextGoodsList.splice(i, 1)
                i--
                this.$store.commit('totalBuyCountReduce', 1)
              }
              if (res.data.code === 101) {
                this.$vux.toast.text(res.data.msg, 'middle')
              }
              if (res.data.code === 102) {
                this.$vux.toast.text(res.data.msg, 'middle')
                localStorage.removeItem('m-token')
              }
            })
          }
          if (curNext.NoGoods) {
            await this.post('/car/deleteCar', {
              token: this.token,
              carId: curNext.carId
            }).then((res) => {
              if (res.data.code === 100) {
                this.NextGoodsList.splice(i, 1)
                i--
                this.$store.commit('totalBuyCountReduce', 1)
              }
              if (res.data.code === 101) {
                this.$vux.toast.text(res.data.msg, 'middle')
              }
              if (res.data.code === 102) {
                this.$vux.toast.text(res.data.msg, 'middle')
                localStorage.removeItem('m-token')
              }
            })
          }
        }
      },
      // 选中商品 全选
      thisCheckAll (list) {
        // 非营业时间无法选择
        if (this.showAlert) {
          return
        }
        this.thisAllChecked = !this.thisAllChecked
        list.forEach((item, index) => {
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', this.thisAllChecked)
          } else {
            item.checked = this.thisAllChecked
          }
          // 失效或售罄商品
          if (item.status !== 1) {
            // NoGoods 失效或售罄商品选择标识
            if (typeof item.NoGoods === 'undefined') {
              this.$set(item, 'NoGoods', this.thisAllChecked)
            } else {
              item.NoGoods = this.thisAllChecked
            }
            item.checked = false
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
          // 失效或售罄商品
          if (item.status !== 1) {
            // NoGoods 失效或售罄商品选择标识
            if (typeof item.NoGoods === 'undefined') {
              this.$set(item, 'NoGoods', this.nextAllChecked)
            } else {
              item.NoGoods = this.nextAllChecked
            }
            item.checked = false
          }
        })
      },
      // 全选 及时送和次日达
      selectAll () {
        this.allChecked = !this.allChecked
        this.nextAllChecked = this.allChecked
        this.NextGoodsList.forEach((item, index) => {
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', this.allChecked)
            if (item.status !== 1) {
              item.checked = false
            }
          } else {
            item.checked = this.allChecked
            if (item.status !== 1) {
              item.checked = false
            }
          }
        })
        // 非营业时间无法选择
        if (this.showAlert) {
          return
        }
        this.thisAllChecked = this.allChecked
        this.thisGoodsList.forEach((item, index) => {
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', this.allChecked)
          } else {
            item.checked = this.allChecked
          }
          // 失效或售罄商品
          if (item.status !== 1) {
            // NoGoods 失效或售罄商品选择标识
            if (typeof item.NoGoods === 'undefined') {
              this.$set(item, 'NoGoods', this.allChecked)
            } else {
              item.NoGoods = this.allChecked
            }
            item.checked = false
          }
        })
      },
      // 选择商品 单选
      selectedGoods (item) {
        if (item.shopType === 2 && this.thisShop.shopStatus !== 0) {
          return
        }
        if (typeof item.checked === 'undefined') {
          this.$set(item, 'checked', true)
        } else {
          item.checked = !item.checked
        }
      },
      // 切换送货方式 运费与送货地址的显示切换
      sendWayChange (val) {
        if (val.key === '1') {
          this.nextFreightShow = false
          this.$store.state.sendWay = val
        } else {
          this.nextFreightShow = true
          this.$store.state.sendWay = val
        }
      },
      // 编辑
      edit () {
        this.editShow = !this.editShow
        if (this.editShow) {
          this.ToCountText = '去结算'
        } else {
          this.ToCountText = '删除'
        }
      },
      // 去结算 和删除商品
      toCount () {
        // 去结算
        if (this.editShow) {
          var thisGoodsList = []
          var nextGoodsList = []
          this.thisGoodsList.forEach((item, index) => {
            if (item.checked === true) {
              thisGoodsList.push(item)
            }
          })
          this.NextGoodsList.forEach((item, index) => {
            if (item.checked === true) {
              nextGoodsList.push(item)
            }
          })
          if (thisGoodsList.length === 0 && nextGoodsList.length === 0) {
            this.$vux.toast.text('请您先选择商品', 'middle')
          } else {
            // 送货上门判断有无收获地址
            var hasNext = nextGoodsList.length > 0 && (this.demo11.key === '2') // 次日达且是送货上门
            var hasThis = thisGoodsList.length > 0 // 及时送
            var noShippingInfo = !this.$store.state.shippingInfo
            if (noShippingInfo && (hasNext || hasThis)) {
              this.$router.push('/address')
              this.$vux.toast.text('当前无可用收获地址，请新增', 'middle')
              return
            }
            // 确认订单所选商品 及时送
            this.$store.commit('SaveCarOrderThisGoodsList', thisGoodsList)
            this.$store.commit('SaveCarOrderNextGoodsList', nextGoodsList)
//            this.$store.state.carOrderThisGoodsList = thisGoodsList
//            // 确认订单所选商品 次日达
//            this.$store.state.carOrderNextGoodsList = nextGoodsList
            // 配送费 及时送
            this.$store.state.Thisfreight = Number(this.Thisfreight).toFixed(1)
            // 配送费 次日达
            if (this.demo11.key === '1') {
              this.$store.state.Nextfreight = 0
            } else {
              this.$store.state.Nextfreight = Number(this.Nextfreight).toFixed(1)
            }
            // 跳转确认下单页面
            this.$router.push({path: 'confirmOrder'})
          }
          // 删除商品
        } else {
          var thisFlag = false
          var nextFlag = false
          this.thisGoodsList.forEach((item, index) => {
            if (item.checked === true) {
              thisFlag = true
            }
          })
          this.NextGoodsList.forEach((item, index) => {
            if (item.checked === true) {
              nextFlag = true
            }
          })
          if (!thisFlag && !nextFlag) {
            this.$vux.toast.text('请选择您要删除的商品', 'middle')
          } else {
            this.showComfirmDel = true
          }
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
      // 选中商品总价 及时送
      thisTotalPrice () {
        var total = 0
        this.thisGoodsList.forEach((item, index) => {
          if (item.checked) {
            total += item.canKaoPrice * item.buyCount
          }
        })
        this.$store.commit('saveTotalPriceThis', total.toFixed(1))
        return total.toFixed(1)
      },
      // 选中商品总价 次日达
      nextTotalPrice () {
        var total = 0
        this.NextGoodsList.forEach((item, index) => {
          if (item.checked) {
            total += item.price * item.buyCount
          }
        })
        this.$store.commit('saveTotalPriceNext', total.toFixed(1))
        return total.toFixed(1)
      },
      // 选中商品数量 及时送
      selectedTotalCountThis () {
        var count = 0
        this.thisGoodsList.forEach((item, index) => {
          if (item.checked) {
            count += item.buyCount
          }
        })
        this.$store.state.selectedTotalCountThis = count
        return count
      },
      // 选中商品数量 次日达
      selectedTotalCountNext () {
        var count = 0
        this.NextGoodsList.forEach((item, index) => {
          if (item.checked) {
            count += item.buyCount
          }
        })
        this.$store.state.selectedTotalCountNext = count
        return count
      },
      // 运费计算 及时送
      CThisfreight () {
        if (this.thisTotalPrice >= this.thisShop.startPrice) {
          this.Thisfreight = 0
          return '免运费'
        }
        if (parseInt(this.thisTotalPrice) === 0) {
          this.Thisfreight = 0
          return '￥' + 0
        } else {
          return '￥' + this.Thisfreight.toFixed(1)
        }
      },
      // 凑单差额 及时送 有小BUG
      singlePriceThis () {
        if (this.thisTotalPrice < this.thisShop.startPrice) {
          var count = this.thisShop.startPrice - this.thisTotalPrice
          return count
        } else {
          this.singleShowThis = false
          return
        }
      },
      // 优惠金额
      Discount () {
        var count = 0
        this.NextGoodsList.forEach((item, index) => {
          if (item.checked) {
            count += (parseFloat(item.canKaoPrice) - parseFloat(item.price)) * parseInt(item.buyCount)
          }
        })
        return count.toFixed(1)
      }
      // 暂时不做
//      singlePriceNext () {
//        if (this.nextTotalPrice < this.nextShop.startPrice) {
//          var count = this.nextShop.startPrice - this.nextTotalPrice
//          return count
//        } else {
//          this.singleShowNext = false
//          return
//        }
//      }
    }
  }
</script>

<style lang='less' scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";
  /*alert提示框样式*/
  .alert-title {
    color: #000;
    .mb(15);
    .fs(30)
  }

  .alert-content {
    .p1 {
      .fs(36);
      color: #000;
      .mb(5);
    }
    .p2 {
      color: @theme-color;
      .fs(24);
    }
  }

  .pic {
    .w(140);
    .h(140);
  }

  .theme-color {
    color: @theme-color;
  }

  .circle {
    .fs(32) !important;
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
      top: 0;
      .r(30);
      .w(75);
      .h(92);
      .lh(92);
      .fs(28);
    }
  }

  .content-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    .t(92);
    .b(100);
  }

  .content-wrapper .content-view-scroller .this-wrap, .content-wrapper .content-view-scroller .next-wrap {
    .block-title {
      .ml(138);
    }
  }

  .car-noLogin {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("../assets/buyCarNoLogin.png") no-repeat center 30%;
    background-size: 5.507rem 7.2667rem;
    .login-bt {
      .w(200);
      .h(70);
      .lh(70);
      .fs(36);
      background: @theme-color;
      color: #fff;
      margin: 0 auto 0 auto;
      .mt(700);
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

  .select-all-icon {
    color: #666;
    .fs(32) !important;
  }

  .circle {
    .mr(35);
  }

  .disabled-item {
    .w(80);
    .h(32);
    .lh(32);
    .mr(10);
    .fs(24);
    color: #fff;
    background: #bbb;
    border-radius: 4px;
  }

  .checked {
    .mr(35);
    .fs(32);
  }

  .select-all-icon {
    .mr(10);
    .fs(32) !important;
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

  .checked-icon-wrap {
    .pt(60);
    .h(120);
    .w(80);
    .mr(10);
  }

  .car-no-goods {
    position: absolute;
    left: 0;
    right: 0;
    .t(92);
    .b(100);
    background: url("../assets/carNoGoods.png") no-repeat center 20%;
    background-size: 5.507rem 7.2667rem;
    .bt {
      position: absolute;
      .w(212);
      .h(68);
      .lh(68);
      .fs(34);
      .t(600);
      background: @theme-color;
      color: #fff;
      border-radius: 3px;
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
    top: 0;
    left: 0;
    right: 0;
    .b(100);
    overflow: hidden;
    .flex-box {
      align-items: center;
      .pl(30);
      .pr(25);
      .pt(23);
      .pb(23);
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      img {
        .w(140);
        .h(140);
      }
      &.this {
        box-sizing: border-box;
        .h(100);
      }
      &.this-goods {
        .h(188);
        box-sizing: border-box;
      }
      /*.check-all {*/
      /*.select-all-icon {*/

      /*}*/
      /*}*/
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
      .fs(26);
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
    .this {
      position: relative;
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
      .fs(25);
      .pt(8);
      .pb(8);
      .pl(28);
      .pr(28);
      color: #666;
      background-color: #ddd;
      .ml(20);
      border-radius: 100px;
    }

    .selected-checker {
      color: #fff;
      background-color: #f75439;
    }
    .input-disabel {
      .ml(-10);
      .mr(10);
      .w(90);
      text-align: center;
      white-space: nowrap;
      .pt(4);
      .pb(4);
      border-radius: 10px;
      .fs(25);
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
      .w(70);
      text-align: center;
      .mr(20);
    }

    [class$=-goods] > .flex-col {
      .ml(20);
    }

    [class$=-goods] .goods-title {
      .lh(40);
      .mb(20);
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
      .h(2.4);
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
      .w(32);
      .h(2.4);
      background-color: #444;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .added:after {
      content: '';
      .h(32);
      .w(2.4);
      background-color: #444;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .more-btn {
      display: table;
      .mt(6);
      .mb(6);
      margin-left: auto;
      margin-right: auto;
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
    .h(100);
    .b(100);
    display: flex;
    .pl(30);
    .fs(28);
    background-color: #fff;
    align-items: center;
    .select-all-icon {
      .mr(0);
      .w(45);
      .iconfont {
        margin-right: 0;
      }
    }
    .input-checkbox:checked, span {
      color: #ff5500;
    }

    .label-checkbox {
      .ml(6);
      .mr(20);
    }

    .col {
      .pl(20);
      .pr(20);
      flex-grow: 1;
      line-height: 1.2;
      border-left: 1px solid #ddd;
    }

    .font-mind {
      color: #999;
      line-height: 1.5;
      .fs(25);
    }

    .count {
      box-sizing: border-box;
      .h(100);
      .lh(100);
      .w(150);
      .fs(32);
      color: #fff;
      background-color: #ff5500;
    }
  }


</style>
