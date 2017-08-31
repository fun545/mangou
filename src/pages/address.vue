<template>
  <div class="address">
    <div>
      <m-header :title="title">
        <span class="back iconfont" @click="$router.back()" slot="icon">&#xe600;</span>
      </m-header>
      x
      <scroll class="address-list">
        <div>
          <div class="item" v-for="(item,index) in addressList" :key="index">
            <div class="top">
              <div class="user-msg">
                <span>{{item.shippingName}}</span>
                <span class="tel">{{item.shippingPhone}}</span>
              </div>
              <div class="address">
                {{item.cityName + item.areaName + item.villageName + item.address}}
              </div>
            </div>
            <div class="bt">
              <div class="left f-l" @click="setDefault(item)">
                <div class="icon d-ib">
                  <i class="iconfont" v-if="item.isDefault!==1">&#xe635;</i>
                  <i class="iconfont selected" v-if="item.isDefault===1">&#xe634;</i>
                </div>
                <span :class="{'theme-color':item.isDefault===1}">设为默认</span>
              </div>
              <div class="right" @click="goEdt(item)">
                <i class="iconfont">&#xe602;</i>
                编辑
              </div>
            </div>
          </div>
        </div>
      </scroll>
      <div class="bt-wrap">
        <div class="add-address t-c" @click="goAddAddress">
          新增收货地址
        </div>
      </div>
      <div class="no-address" v-if="noAddressFlag">

      </div>
    </div>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  export default {
    name: 'address',
    components: {
      mHeader
    },
    data () {
      return {
        title: '收货地址',
        defaultFlag: false,
        addressList: [],
        token: localStorage.getItem('m-token'),
        noAddressFlag: false
      }
    },
    created () {
      this.getAddress()
    },
    methods: {
      // 获取收货地址
      getAddress () {
        this.post('/shipping/getAddressList', {
          token: this.token
        }).then((res) => {
          if (res.data.code === 100) {
            this.addressList = res.data.shippingAddressList
            if (this.addressList.length > 0) {
              this.noAddressFlag = false
            } else {
              this.noAddressFlag = true
            }
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
      // 设置默认地址
      async setDefault (item) {
        await this.post('/shipping/updateAddress', {
          token: this.token,
          isDefault: 1,
          shippingId: item.shippingId
        }).then((res) => {
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'middle')
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'middle')
            localStorage.removeItem('m-token')
          }
        })
        this.getAddress()
      },
      // 去编辑页面
      goEdt (item) {
        this.$store.commit('saveAddress', item)
        this.$store.commit('saveMapBackPath', '/edit_address')
        this.$router.push('/edit_address')
      },
      // 去新增页面
      goAddAddress () {
        this.$store.commit('saveAddAddress', '/address')
        this.$router.push({path: '/addAddress'})
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

  .address {
    .address-list {
      position: absolute;
      left: 0;
      right: 0;
      .t(92);
      .b(120);
      .fs(32);
      .lh(32);
      color: #222;
      .item {
        .mb(22);
        background: #fff;
        .top {
          /* box-sizing: border-box;*/
          border-top: 1px solid #eee;
          /* .h(131);*/
          .pl(30);
          .pr(40);
          .pt(24);
          .pb(24);
          .user-msg {
            display: flex;
            justify-content: space-between;
            .mb(20);
          }
          .address {
            /*.lh(80);*/
            line-height: 1.3;
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

  .bt-wrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    .h(120);
    z-index: 3;
    background-color: @bg-color;
    .add-address {
      .w(700);
      margin: 0 auto;
      .h(90);
      .lh(90);
      background: @theme-color;
      color: #fff;
      .fs(34);
      border-radius: 5px;
    }
  }

  .no-address {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    .t(92);
    background: url("../assets/no-address.png") no-repeat center center;
    background-size: 5.6rem 5.6rem;
  }
</style>
