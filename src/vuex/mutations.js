// import {
//   INCREMENT,
//   CHANGE_TOTAL_PRICE
// } from './mutation-types'

export default {
  // 储存次日达和即时送storeInfo
  saveStoreInfo (state, storeList) {
    // 及时送和次日达都没有店铺
    if (storeList.length === 0) {
      state.hasNextShop = false
      state.hasThisShop = false
    }
    if (storeList.length === 1) {
      // 只有次日达店铺
      if (storeList[0].shopType === 1) {
        state.hasNextShop = true
        state.hasThisShop = false
        localStorage.setItem('m-depotId', storeList[0].storeId)
        state.depotInfo = storeList[0]
      }
      // 只有及时送店铺
      if (storeList[0].shopType === 2) {
        state.hasNextShop = false
        state.hasThisShop = true
        localStorage.setItem('m-shopId', storeList[0].storeId)
        state.shopInfo = storeList[0]
      }
    }
    // 及时送和次日达都有店铺
    if (storeList.length === 2) {
      state.hasNextShop = true
      state.hasThisShop = true
      if (storeList[0].shopType === 1) {
        localStorage.setItem('m-depotId', storeList[0].storeId)
        localStorage.setItem('m-shopId', storeList[1].storeId)
        state.depotInfo = storeList[0]
        state.shopInfo = storeList[1]
      } else {
        localStorage.setItem('m-depotId', storeList[1].storeId)
        localStorage.setItem('m-shopId', storeList[0].storeId)
        state.depotInfo = storeList[1]
        state.shopInfo = storeList[0]
      }
    }
  },
  // // 储存次日达和即时送storeInfo
  // saveStoreInfo (state, storeList) {
  //   state.depotInfo = storeList[0]
  //   state.shopInfo = storeList[1]
  // },
  saveVillageInfo (state, val) {
    state.villageInfo = val
    localStorage.setItem('m-cityId', val.cityId)
    localStorage.setItem('m-areaId', val.areaId)
    localStorage.setItem('m-villageId', val.villageId)
    localStorage.setItem('m-villageName', val.villageName)
  },
  // 购物车总数
  increment (state, count) {
    // vuex储存m-totalBuyCount
    localStorage.setItem('m-totalBuyCount', count)
    // 变更状态
    state.totalBuyCount = count
    // console.log(state.totalBuyCount)
  },
  // 改变购物车总价
  changeTotalPrice (state, val) {
    state.totalPrice = val.toFixed(1)
  },
  shopStatus (state, val) {
    state.shopStatus = val
  },
  // 减少购物车数量
  totalBuyCountReduce (state, count) {
    state.totalBuyCount = state.totalBuyCount - count
    localStorage.setItem('m-totalBuyCount', state.totalBuyCount)
  },
  // 增加购物车数量
  totalBuyCountPlus (state, count) {
    state.totalBuyCount = state.totalBuyCount + count
    localStorage.setItem('m-totalBuyCount', state.totalBuyCount)
  },
  // 确认订单列表
  saveOrderNumList (state, val) {
    state.orderNumList = val
  },
  // 储存购物车及时送相关信息
  saveThisShop (state, val) {
    state.thisShop = val
  },
  // 储存购物车次日达相关信息
  saveNextShop (state, val) {
    state.nextShop = val
  },
  // 储存购物车shippingInfo
  saveShippingInfo (state, val) {
    state.shippingInfo = val
  },
  // 确认下单合计
  saveOrderTotalPrice (state, val) {
    state.orderTotalPrice = (Number(state.totalPriceThis) + Number(state.totalPriceNext) + Number(state.Thisfreight) + Number(state.Nextfreight)).toFixed(1)
    if (val === 'fastBuy') {
      state.orderTotalPrice = (Number(state.totalPriceThis) + Number(state.Thisfreight)).toFixed(1)
    }
  },
  // 购物车选中商品总价 及时送
  saveTotalPriceThis (state, val) {
    state.totalPriceThis = Number(val).toFixed(1)
  },
  // 购物车选中商品总价 次日达
  saveTotalPriceNext (state, val) {
    state.totalPriceNext = Number(val).toFixed(1)
  },
  // 购物车选择商品数量 及时送
  saveSelectedTotalCountThis (state, val) {
    state.selectedTotalCountThis = Number(val)
  },
  // 购物车选择商品数量 次日达
  saveSelectedTotalCountNext (state, val) {
    state.selectedTotalCountNext = Number(val)
  },
  // 运费
  saveThisFreight (state, val) {
    state.Thisfreight = val
  },
  // 运费
  saveNextfreight (state, val) {
    state.Nextfreight = val
  },
  // 确认订单所选商品 及时送
  SaveCarOrderThisGoodsList (state, val) {
    state.carOrderThisGoodsList = val
  },
  // 确认订单所选商品 次日达
  SaveCarOrderNextGoodsList (state, val) {
    state.carOrderNextGoodsList = val
  },
  // 存储用户信息
  getUserInfo (state, val) {
    state.userInfo = val
    localStorage.setItem('m-userInfo', JSON.stringify(val))
  },
  // 快速购买info
  getFastBuyInfo (state, val) {
    state.fastBuyInfo = val
  },
  // 保存新增编辑地址
  saveAddress (state, val) {
    state.addressInfo = val
  },
  // 保存地图回退地址
  saveMapBackPath (state, val) {
    state.mapBackPath = val
  },
  // 编辑地址
  edtAddress (state, val) {
    state.addressInfo.cityId = val.cityId
    state.addressInfo.areaId = val.areaId
    state.addressInfo.villageId = val.villageId
    state.addressInfo.villageName = val.villageName
  },
  // 保存新增回退地址
  saveAddAddress (state, val) {
    state.addAddressBackPath = val
  },
  // 保存小区搜索回退地址
  saveSearchVillagePath (state, val) {
    state.SearchVillagePath = val
  },
  // 保存选择小区回跳地址
  saveSelectVillagePath (state, val) {
    state.selectVillagePath = val
  },
  // 储存支付地订单
  savePayOrder (state, val) {
    state.payOrder = val
  },
  // 储存支付总金额
  saveTotalPay (state, val) {
    state.totalPay = val
  },
  saveOkPayBackPath (state, val) {
    state.oKPayBackPath = val
  }
}
