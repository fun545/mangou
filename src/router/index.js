import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      /* 宣传广告页面 */
      path: '/',
      component: require('../pages/Star')
    },
    {
      /* Tabbar页面 */
      path: '/tabbar',
      component: require('../pages/Tabbar'),
      children: [
        {
          /* 首页 */
          path: 'home',
          component: require('../pages/Home')
        },
        {
          /* 即时达 */
          path: 'this',
          component: require('../pages/This')
        },
        {
          /* 次日达 */
          path: 'next',
          component: require('../pages/Next')
        },
        {
          /* 购物车 */
          path: 'cart',
          component: require('../pages/Cart')
        },
        {
          /* 我的 */
          path: 'user',
          component: require('../pages/User')
        }
      ]
    },
    {
      /* 定位页面 */
      path: '/location',
      component: require('../pages/Location')
    },
    {
      /* 定位页面手动搜索 */
      path: '/manualLocation',
      component: require('../pages/manualLocation.vue')
    },
    {
      /* 选择小区 */
      path: '/village',
      component: require('../pages/Village')
    },
    {
      /* 搜索页面 */
      path: '/search',
      component: require('../pages/Search')
    },
    {
      /* 搜索内容页面 */
      path: '/search_text',
      component: require('../pages/SearchText')
    },
    {
      /* 登录 */
      path: '/sign_in',
      component: require('../pages/SignIn')
    },
    {
      /* 商品详情 */
      path: '/goods_detail',
      component: require('../pages/GoodsDetail')
    },
    {
      /* 即时送 - 专区页面 */
      path: '/zhuanqu',
      component: require('../pages/ZhuanQu')
    },
    {
      /* 收获地址 */
      path: '/address',
      component: require('../pages/Address')
    },
    {
      /* 收获地址 */
      path: '/edit_address',
      component: require('../pages/EditAddress')
    },
    {
      /* 个人资料 */
      path: '/user_info',
      component: require('../pages/UserInfo')
    },
    {
      /* 确认订单 */
      path: '/order_enter',
      component: require('../pages/OrderEnter')
    },
    {
      /* 订单列表 */
      path: '/order_list',
      component: require('../pages/OrderList')
    },
    {
      /* 订单待付款列表 */
      path: '/order_pay_list',
      component: require('../pages/OrderPayList')
    },
    {
      /* 订单待发货列表 */
      path: '/order_send_list',
      component: require('../pages/OrderSendList')
    },
    {
      /* 订单待运送列表 */
      path: '/order_shipping_list',
      component: require('../pages/OrderShippingList')
    },
    {
      /* 订单待评价列表 */
      path: '/order_rater_list',
      component: require('../pages/OrderRaterList')
    },
    {
      /* 订单待售后列表 */
      path: '/order_after_sale_list',
      component: require('../pages/OrderAfterSaleList')
    },
    {
      /* 订单详情 */
      path: '/order_info',
      component: require('../pages/OrderInfo')
    },
    {
      /* 订单评价 */
      path: '/order_rater',
      component: require('../pages/OrderRater')
    },
    {
      /* 订单退款 */
      path: '/order_refund',
      component: require('../pages/OrderRefund')
    },
    {
      /* 设置 */
      path: '/setting',
      component: require('../pages/Setting')
    },
    {
      /* 分享 */
      path: '/share',
      component: require('../pages/Share')
    },
    {
      /* 优惠券 */
      path: '/coupon',
      component: require('../pages/Coupon')
    },
    {
      /* 我的收藏 */
      path: '/collection',
      component: require('../pages/Collection')
    },
    {
      /* 客服与帮助 */
      path: '/help',
      component: require('../pages/Help')
    },
    {
      /* 加入我们 */
      path: '/join',
      component: require('../pages/Join')
    },
    {
      /* 我要开店 */
      path: '/shop',
      component: require('../pages/Shop')
    },
    {
      /* 意见反馈 */
      path: '/issue',
      component: require('../pages/Issue')
    },
    {
      /* 意见反馈 */
      path: '/about',
      component: require('../pages/About')
    },
    {
      /* 二级分类商品列表 */
      path: '/list1',
      component: require('../pages/nextSecondList1')
    },
    {
      /* 登陆 */
      path: '/login',
      component: require('../pages/login')
    }
  ]
})
