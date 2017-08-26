<template>
  <div class="add-address">
    <div>
      <m-header :title="title">
        <span class="back iconfont" @click="$router.push($store.state.addAddressBackPath)" slot="icon">&#xe600;</span>
      </m-header>
      <group class="userInfo">
        <x-input title="收货人" name="username" is-type="china-name" v-model="shippingName" placeholder="请填写"></x-input>
        <x-input title="手机号码" name="mobile" keyboard="number" placeholder="请填写"
                 v-model="shippingPhone"></x-input>
        <cell title="选择小区" is-link value-align="left"
              @click.native="goMap">
          <div slot="default" class="village">
            {{addressInfo.villageName}}
          </div>
        </cell>
        <x-textarea title="详细地址" :show-counter="false" :rows="2"
                    autosize v-model="address" placeholder="例如5号楼202室"></x-textarea>
      </group>
      <group class="setDefault">
        <x-switch title="设为默认地址" v-model="defaultFlag" @on-change="setDefault"></x-switch>
      </group>
      <div class="delet t-c" @click="saveAddress">
        保存
      </div>
    </div>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  import { Group, XInput, XAddress, XTextarea, XSwitch, Cell } from 'vux'
  export default{
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
        title: '新增收货地址',
        isDefault: 0,
        defaultFlag: false,
        shippingName: '',
        shippingPhone: '',
        villageId: '',
        cityId: '',
        areaId: '',
        address: '',
        token: localStorage.getItem('m-token')
      }
    },
    methods: {
      goMap () {
        this.$store.commit('saveSelectVillagePath', '/addAddress')
//        this.$store.commit('saveMapBackPath', '/addAddress')
        this.$router.push({path: '/Bmap'})
      },
      saveAddress () {
        // 验证名字
        if (this.shippingName.length < 2 || this.shippingName.length > 6) {
          this.$vux.toast.text('请输入合法的名字')
          return
        }
        // 验证手机号
        var telReg = /^1[0-9]{10}$/
        if (!telReg.test(this.shippingPhone)) {
          this.$vux.toast.text('请输入正确手机号')
          return
        }
        // 验证详细地址
        if (this.address.length < 5) {
          this.$vux.toast.text('详细地址长度不能小于五个字', 'center')
          return
        }
        this.post('/shipping/insertAddress', {
          token: this.token,
          shippingName: this.shippingName,
          shippingPhone: this.shippingPhone,
          villageId: this.addressInfo.villageId,
          cityId: this.addressInfo.cityId,
          areaId: this.addressInfo.areaId,
          isDefault: this.isDefault,
          address: this.address
        }).then(res => {
          if (res.data.code === 100) {
            this.$router.back()
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
      setDefault (val) {
        val ? this.isDefault = 1 : this.isDefault = 0
      }
    },
    computed: {
      addressInfo () {
        return this.$store.state.addressInfo
      }
    }
  }
</script>

<style lang='less'>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .add-address {
    .cp-header {
    /*  position: inherit;*/
    }
    .userInfo {
      .mt(92);
      .weui-cells {
        margin-top: 0 !important;
      }
      .village {
        text-align: left;
        color: #000;
        .pl(30);
        overflow-y: scroll;
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
    .no-address {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      .t(92);
      background: url("../assets/no-way.png") no-repeat center;
      background-size: 50% 50%;
    }
  }

</style>
