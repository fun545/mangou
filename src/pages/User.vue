<template>
  <div class="user-view" @touchmove.prevent>
    <div class="content" ref="content">
      <div class="inner">
        <div class="top-wrap">
          <div class="top"></div>
          <!-- 设置图标 -->
          <span class="setting" @click="go">&#xe627;</span>
          <!-- 用户头像卡片 -->
          <div class="picture-card">
            <div class="user-pic">
              <img src="../assets/userlog.png" class="picture" alt="" @click="goPage('/user_info')">
            </div>
            <div class="login-bt t-c" v-if="!token" @click="$router.push({path:'login'})">
              登录
            </div>
            <div class="user-info" v-if="token">
              <div class="name">{{userInfo.userName}}</div>
              <span class="address">{{villageName}}</span>
              <div class="line-bar">&nbsp;</div>
              <div class="flex-box">
                <div class="flex-item">
                  <p>{{userReg.phaseDay | count}}<span>天</span></p>
                  <p>您已注册</p>
                </div>
                <div class="flex-item">
                  <p>{{userReg.cutSumMoney | count}}<span>元</span></p>
                  <p>为您节省</p>
                </div>
                <div class="flex-item">
                  <p>{{userReg.ranking | count}}</p>
                  <p>当前排行</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 我的订单卡片 -->
        <div class="order-card" :class="{'no-login':!token}">
          <!-- 卡片标题 -->
          <div class="title-box">
            <div class="title">我的订单</div>
            <a @click="goPage('/order_list')">查看更多订单</a>
          </div>

          <!-- 订单入口 -->
          <div class="entry-flex">
            <div class="entry-item" @click="goPage('/order_pay_list')">
              <div class="icon">
                <i class="iconfont">&#xe62c;</i>
                <span v-if="token&&userFirst.nofukuanCount">{{userFirst.nofukuanCount}}</span>
              </div>
              <div class="text">待付款</div>
            </div>
            <div class="entry-item" @click="goPage('/order_send_list')">
              <div class="icon">
                <i class="iconfont">&#xe620;</i>
                <span v-if="userFirst.nofahuoCount&&token">{{userFirst.nofahuoCount}}</span>
              </div>
              <div class="text">待发货</div>
            </div>
            <div class="entry-item" @click="goPage('/order_shipping_list')">
              <div class="icon">
                <i class="iconfont">&#xe668;</i>
                <span v-if="userFirst.peisongzhong&&token">{{userFirst.peisongzhong}}</span>
              </div>
              <div class="text">配送中</div>
            </div>
            <div class="entry-item" @click="goPage('/order_rater_list')">
              <div class="icon">
                <i class="iconfont">&#xe645;</i>
                <span v-if="userFirst.nopingjia&&token">{{userFirst.nopingjia}}</span>
              </div>
              <div class="text">待评价</div>
            </div>
            <div class="entry-item" @click="goPage('/order_after_sale_list')">
              <div class="icon">
                <i class="iconfont">&#xe630;</i>
                <span v-if="userFirst.refundCount&&token">{{userFirst.refundCount}}</span>
              </div>
              <div class="text">退款/售后</div>
            </div>
          </div>
        </div>

        <!-- 我要分享卡片 -->
        <div class="share-card">
          <div class="title-box">
            <div class="title">我要分享</div>
            <router-link to="/share">推给好友</router-link>
          </div>
        </div>

        <!-- 更多功能卡片 -->
        <div class="more-card">
          <!-- 卡片标题 -->
          <div class="title-box">
            <div class="title">更多功能</div>
          </div>
          <!-- 功能入口 -->
          <div class="entry-flex">
            <div class="entry-item" @click="goPage('/collection')">
              <div class="iconfont">&#xe629;</div>
              <div class="label">我的收藏</div>
            </div>
            <div class="entry-item" @click="goPage('/address')">
              <div class="iconfont">&#xe621;</div>
              <div class="label">收货地址</div>
            </div>
            <div class="entry-item" @click="goPage('/coupon')">
              <div class="iconfont">&#xe62e;</div>
              <div class="label">我的优惠券</div>
            </div>
            <router-link to="/help" class="entry-item">
              <div class="iconfont">&#xe626;</div>
              <div class="label">客服与帮助</div>
            </router-link>
            <router-link to="/join" class="entry-item">
              <div class="iconfont">&#xe61d;</div>
              <div class="label">加入我们</div>
            </router-link>
            <router-link to="/shop" class="entry-item">
              <div class="iconfont">&#xe616;</div>
              <div class="label">我要开店</div>
            </router-link>
            <router-link to="/issue" class="entry-item">
              <div class="iconfont">&#xe625;</div>
              <div class="label">意见反馈</div>
            </router-link>
            <router-link to="/about" class="entry-item">
              <div class="iconfont">&#xe62f;</div>
              <div class="label">关于我们</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <m-footer></m-footer>
  </div>
</template>
<script>
  import mFooter from '../components/footer'
  import BScroll from 'better-scroll'
  export default {
    name: 'user',
    components: {mFooter, BScroll},
    data () {
      return {
        userFirst: '', // 订单数据
        userReg: '', // 注册xxx节省xxx
        userInfo: JSON.parse(localStorage.getItem('m-userInfo')), // 用户信息
        villageName: localStorage.getItem('m-villageName'),  // 小区名字
        token: localStorage.getItem('m-token')
      }
    },
    created () {
      this.$nextTick(() => {
        this._initScroll()
      })
      if (localStorage.getItem('m-token')) {
        // 我的订单
        this.post('/user/userFirst', {token: localStorage.getItem('m-token')}).then((res) => {
          if (res.data.code === 100) {
            this.userFirst = res.data.userFirst
          }
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'middle')
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'middle')
            localStorage.removeItem('m-token')
          }
        })
        // 注册XX天消费XX钱
        this.post('/user/userRegDay', {token: localStorage.getItem('m-token')}).then((res) => {
          if (res.data.code === 100) {
            this.userReg = res.data.userReg
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
    },
    methods: {
      go () {
        this.$router.push({path: '/setting'})
      },
      _initScroll () {
        this.contentScroll = new BScroll(this.$refs.content, {
          click: true,
          disableMouse: true
        })
      },
      goPage (url) {
        if (this.token) {
          this.$router.push({path: url})
          return
        }
        this.$vux.toast.text('请先登录', 'bottom')
        this.$router.push({path: '/login'})
      }
    },
    filters: {
      count (val) {
        if (!val) {
          return 0
        }
        return val
      }
    }
  }
</script>

<style lang='less' scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .user-view {
    height: 100%;
    .top {
      height: 100px;
      /*background: linear-gradient(#f46f4b, #fa9f5a);*/
      background-color: @theme-color;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      z-index: 1;
    }
    .content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      .b(100);
      overflow: hidden;
      .inner {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        .h(1296);
      }
      .top-wrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }
    }
    .setting {
      color: #ffffff;
      line-height: normal;
      .fs(36);
      font-family: 'iconfont';
      position: absolute;
      .t(30);
      .r(30);
      z-index: 2;
    }

    [class*=-card] {
      .mr(20);
      .ml(20);
      .mt(20);
      .mb(20);
      .pl(20);
      .pr(20);
      .pb(20);
      .pt(20);
      border-radius: 2px;
      background-color: #ffffff;
      position: relative;
      z-index: 2;

      .title-box {
        display: flex;
        line-height: normal;
        .fs(26);

        .title {
          flex-grow: 1;
          .ml(-20);
          &:before {
            content: '';
            display: inline-block;
            .mr(20);
            .w(8);
            .h(20);
            background-color: @theme-color;
          }
        }

        a {
          color: #999999;

          &:after {
            content: '\e601';
            vertical-align: middle;
            font: 12px/1 'iconfont';
            .fs(25);
          }
        }
      }
    }

    .picture-card {
      position: absolute;
      .t(120);
      left: 0;
      right: 0;
      z-index: 5;
      .pt(80);
      .login-bt {
        .w(170);
        .h(45);
        .lh(45);
        .fs(30);
        background: @theme-color;
        border-radius: 25px;
        color: #fff;
        margin: 0 auto;
        .mt(15);
      }
      .picture {
        box-sizing: border-box;
        .w(160);
        .h(160);
        border-radius: 50%;
        /*background-color: #e3eaee;*/
        transform: translate(-50%, -50%);
        position: absolute;
        top: 0;
        left: 50%;
      }

      .name {
        .lh(40);
        .pt(10);
        .pb(10);
        font-weight: bold;
        text-align: center;
        .fs(25);
      }

      .address {
        display: table;
        .pl(20);
        .pr(20);
        margin: 0 auto;
        .lh(40);
        .fs(25);
        color: #eba098;
        background-color: #fef7f5;
        border-radius: 10px;
      }

      .line-bar {
        margin: 10px auto;
        .mt(20);
        .mb(20);
        height: 1px;
        background-color: #eeeeee;
      }

      .flex-box {
        display: flex;

        .flex-item {
          width: calc(~'100vw/3');
          box-sizing: border-box;
          .pl(20);
          .pr(20);
          border-left: 1px solid #eeeeee;
          text-align: center;

          &:first-child {
            border-left: none;
          }

          p, span {
            .fs(25);
            line-height: normal;
          }

          p:first-child {
            color: #fb9082;
            .fs(36);
          }
        }
      }
    }
    .order-card {
      .mt(492);
    }
    .no-login {
      .mt(323);
    }
    .order-card .entry-flex {
      display: flex;
      justify-content: space-between;
      .mt(10);
      .mr(-10);
      .mb(-10);
      .ml(-10);
      .fs(25);
      .entry-item {
        width: calc(~'(100% - 20px)/5');
        box-sizing: border-box;
        border-radius: 5px;
        color: #444444;
        background-color: #fff8ef;

        .icon {
          display: table;
          margin: 10px auto 0 auto;
          .mt(20);
          line-height: normal;
          position: relative;

          .iconfont {
            color: @theme-color;
            .fs(44);
          }

          span {
            .w(28);
            text-align: center;
            .h(28);
            .lh(28);
            border-radius: 14px/2;
            .fs(25);
            color: #ffffff;
            background-color: @theme-color-price;
            transform: translate(65%, -15%);
            position: absolute;
            top: 0;
            right: 0;
            /*.pl(1);
            .pr(1);
            .pt(1);
            .pb(1);*/
          }
        }

        .text {
          margin: 5px auto;
          .mt(10);
          .mb(10);
          .lh(40);
          text-align: center;
        }
      }
    }

    .more-card .entry-flex {
      display: flex;
      flex-wrap: wrap;

      .entry-item {
        width: calc(~'100%/3');
        padding: 10px 0;
        .pt(20);
        .pb(20);
        text-align: center;
        border-bottom: 1px solid #e4e4e4;

        .iconfont {
          color: @theme-color;
          .fs(56);
        }

        .label {
          color: #444444;
          .fs(25);
        }
      }
    }
  }
</style>
