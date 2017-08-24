<template>
  <div class="edit-address" @touchmove.prevent>
    <m-header :title="title">
      <span class="back iconfont" @click="$router.push('/address')" slot="icon">&#xe600;</span>
      <span slot="right" class="save" @click="deleteAddress">删除</span>
    </m-header>
    <group class="userInfo">
      <x-input title="收货人" name="username" is-type="china-name" v-model="addressInfo.shippingName"></x-input>
      <x-input title="手机号码" name="mobile" keyboard="number" is-type="china-mobile"
               v-model="addressInfo.shippingPhone"></x-input>
      <cell title="选择小区" is-link value-align="left"
            @click.native="goMap">
        <div slot="default" class="village">
          {{addressInfo.villageName}}
        </div>
      </cell>
      <x-textarea title="详细地址" :show-counter="false" :rows="2"
                  autosize v-model="addressInfo.address"></x-textarea>
    </group>
    <group class="setDefault">
      <x-switch title="设为默认地址" v-model="defaultFlag" @on-change="setDefault"></x-switch>
    </group>
    <div class="delet t-c" @click="saveAddress">
      保存
    </div>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  import { Group, XInput, XAddress, XTextarea, XSwitch, Cell } from 'vux'
  export default{
    name: 'editAddress',
    components: {
      mHeader,
      Group,
      XInput,
      XAddress,
      XTextarea,
      XSwitch,
      Cell
    },
    data () {
      return {
        title: '修改收货地址',
        curAddress: {},
        token: localStorage.getItem('m-token')
      }
    },
    methods: {
      // 删除地址
      deleteAddress () {
        var _this = this
        this.$vux.confirm.show({
          title: '提示',
          content: '你确定要删除该地址么？',
          onConfirm () {
            _this.post('/shipping/deleteAddress', {
              token: _this.token,
              shippingId: _this.addressInfo.shippingId
            }).then(res => {
              if (res.data.code === 100) {
                _this.$router.push('/address')
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
        })
      },
      // 修改地址
      saveAddress () {
        this.post('/shipping/updateAddress', {
          token: this.token,
          shippingName: this.addressInfo.shippingName,
          shippingPhone: this.addressInfo.shippingPhone,
          villageId: this.addressInfo.villageId,
          cityId: this.addressInfo.cityId,
          areaId: this.addressInfo.areaId,
          address: this.addressInfo.address,
          shippingId: this.addressInfo.shippingId,
          isDefault: this.addressInfo.isDefault
        }).then(res => {
          if (res.data.code === 100) {
            this.$router.push('/address')
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
      setDefault (val) {
        val ? this.addressInfo.isDefault = 1 : this.addressInfo.isDefault = 0
        this.post('/shipping/updateAddress', {
          token: this.token,
          isDefault: this.addressInfo.isDefault,
          shippingId: this.addressInfo.shippingId
        }).then((res) => {
          if (res.data.code === 100) {}
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'middle')
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'middle')
            localStorage.removeItem('m-token')
          }
        })
      },
      goMap () {
        this.$store.commit('saveSelectVillagePath', '/edit_address')
        this.$router.push({path: '/Bmap'})
      }
    },
    computed: {
      defaultFlag () {
        if (this.addressInfo.isDefault === 1) {
          return true
        } else {
          return false
        }
      },
      addressInfo () {
        return this.$store.state.addressInfo
      }
    }
  }
</script>

<style lang='less'>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .edit-address {
    .cp-header {
      position: inherit;
      .save {
        position: absolute;
        .r(36);
        color: @theme-color;
        .fs(32);
      }
    }
    .userInfo {
      .weui-cells {
        margin-top: 0 !important;
      }
      .village {
        text-align: left;
        color: #000;
        .pl(30);
      }
    }
    .delet {
      .h(90);
      .lh(90);
      color: #fff;
      width: 90%;
      margin: 0 auto;
      .mt(50);
      background: @theme-color;
      .fs(36);
      border-radius: 5px;
    }
  }

</style>
