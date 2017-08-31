<template>
  <div class="selectAddress">
    <m-header :title="title">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <scroll class="address-list">
      <div>
        <div class="item" v-for="(item,index) in addressList" :key="index" @click="chooseAddress(item)">
          <div class="top"
               :class="{'disable-color':(item.areaId!==localAreaId)||(item.cityId!==localCityId)||(item.villageId!==localVillageId)}">
            <div class="user-msg">
              <span>{{item.shippingName}}</span>
              <span class="tel">{{item.shippingPhone}}</span>
            </div>
            <div class="address">
              <span v-if="item.isDefault===1">默认地址</span>
              {{item.cityName + item.areaName + item.villageName + item.address}}
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="bt">
      <div class="add-address t-c" @click="goAddAddress">
        新增收货地址
      </div>
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
//        defaultFlag: false,
        addressList: [],
        localCityId: Number(localStorage.getItem('m-cityId')),
        localAreaId: Number(localStorage.getItem('m-areaId')),
        localVillageId: Number(localStorage.getItem('m-villageId'))
      }
    },
    async created () {
      await this.post('/shipping/getAddressList', {
        token: localStorage.getItem('m-token')
      }).then((res) => {
        if (res.data.code === 100) {
          this.addressList = res.data.shippingAddressList
        }
        if (res.data.code === 101) {
          this.$vux.toast.text(res.data.msg, 'middle')
        }
        if (res.data.code === 102) {
          this.$vux.toast.text(res.data.msg, 'middle')
          localStorage.removeItem('m-token')
        }
      })
      // 可用地址排前
//      this.addressList.forEach((item, index) => {
//        if ((item.areaId !== this.localAreaId) || (item.cityId !== this.localCityId) || (item.villageId !== this.localVillageId)) {
//          this.addressList.splice(index, 1)
//        }
//      })
    },
    methods: {
      // 跳转添加地址
      goAddAddress () {
        this.$store.commit('saveAddAddress', '/selecteAddress')
        this.$router.push('/addAddress')
      },
      // 选择收货地址
      chooseAddress (item) {
        if ((item.areaId !== this.localAreaId) || (item.cityId !== this.localCityId) || (item.villageId !== this.localVillageId)) {
          this.$vux.toast.text('亲，超出配上范围啦')
        } else {
          this.$store.commit('saveShippingInfo', item)
          this.$router.back()
        }
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
    width: 100%;
    height: 100%;
    .cp-header {
      color: #222;
      z-index: 103;
      background: #f9f9f9;
      .back {
        color: #222;
      }
    }
    .address-list {
      position: absolute;
      left: 0;
      right: 0;
      .t(92);
      .b(120);
      .fs(27);
      .lh(27);
      overflow: hidden;
      color: #222;
      .item {
        .mb(22);
        background: #fff;
        .top {
       /*   box-sizing: border-box;*/
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
        .disable-color {
          color: #d2d2d2;
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

  .bt {
     position: absolute;
     left: 0;
     right: 0;
     bottom: 0;
     .h(120);
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


</style>
