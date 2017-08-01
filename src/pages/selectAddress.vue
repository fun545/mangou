<template>
  <div class="selectAddress">
    <m-header :title="title">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <div class="address-list">
      <div class="item" v-for="(item,index) in addressList" :key="index">
        <div class="top">
          <div class="user-msg">
            <span>{{item.shippingName}}</span>
            <span class="tel">{{item.shippingPhone}}</span>
          </div>
          <div class="address">
            {{item.address}}
          </div>
        </div>
      </div>
    </div>
    <div class="add-address t-c" @click="$router.push({path:'addAddress'})">
      新增收货地址
    </div>
    <toast v-model="showPositionValue" type="text" :time="2000" is-show-mask position="middle"
           :text="msg" width="10em" class="toast"></toast>
  </div>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  import { Toast } from 'vux'
  export default {
    name: 'selectAddress',
    components: {
      mHeader,
      Toast
    },
    data () {
      return {
        title: '收货地址',
        defaultFlag: false,
        addressList: [],
        msg: '',
        code: '',
        showPositionValue: false
      }
    },
    async created () {
      await this.post('/shipping/getAddressList', {
        token: localStorage.getItem('m-token')
      }).then((res) => {
        this.code = res.data.code
        if (res.data.code === 100) {
          this.addressList = res.data.shippingAddressList
        }
        if (res.data.code === 101) {
          this.msg = res.data.msg
          this.showPositionValue = true
        }
        if (res.data.code === 102) {
          this.msg = '请重新登录'
          this.showPositionValue = true
        }
      })
      // 异常处理
      if (this.code === 102 || this.code === 101) {
        this.post('/user/loginOut', {token: localStorage.getItem('m-token')}).then((res) => {
          if (res.data.code === 100) {
            localStorage.removeItem('m-token')
          }
          if (res.data.code === 102) {
            localStorage.removeItem('m-token')
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .theme-color {
    color: @theme-color;
  }

  .selectAddress {
    .cp-header {
      color: #222;
      z-index: 103;
      background: #f9f9f9;
      .back {
        color: #222;
      }
    }
    .address-list {
      .mt(92);
      .fs(32);
      .lh(32);
      color: #222;
      .item {
        .mb(22);
        background: #fff;
        .top {
          box-sizing: border-box;
          border-top: 1px solid #eee;
          .h(131);
          .pl(30);
          .pr(40);
          .pt(24);
          .pb(24);
          .user-msg {
            display: flex;
            justify-content: space-between;
            .tel {

            }
          }
          .address {
            .lh(80);
          }
        }
        .bt {
          box-sizing: border-box;
          border-top: 1px solid #eee;
          .h(90);
          .lh(90);
          .pl(30);
          .pr(60);
          .left {
            .fs(26);
            .icon {
              .iconfont {
                .fs(24);
              }
              .selected {
                color: @theme-color;
              }
            }
          }
          .right {
            color: #444;
            .fs(26);
            float: right;
            .iconfont {
              .fs(26);
              color: #444;
            }
          }
        }
      }
    }
  }

  .add-address {
    position: absolute;
    .l(25);
    .r(25);
    .b(30);
    .h(90);
    .lh(90);
    background: @theme-color;
    color: #fff;
    .fs(34);
    border-radius: 5px;
  }
</style>
