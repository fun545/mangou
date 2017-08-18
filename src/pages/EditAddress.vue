<template>
  <div class="edit-address">
    <m-header :title="title">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
      <span slot="right" class="save" @click="deleteAddress">删除</span>
    </m-header>
    <group class="userInfo">
      <x-input title="收货人" name="username" is-type="china-name" v-model="name"></x-input>
      <x-input title="手机号码" name="mobile" keyboard="number" is-type="china-mobile"
               v-model="phone"></x-input>
      <x-address title="选择地区" v-model="value" :list="addressList" placeholder="请选择地址"></x-address>
      <x-textarea title="详细地址" :show-counter="false" :rows="2"
                  autosize v-model="detailAddrss"></x-textarea>
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
        phone: '2222',
        name: '',
        value: [],
        addressList: [
          {
            'name': '长沙市',
            'value': '430000'
          },
          {
            'name': '芙蓉区',
            'value': '430100',
            'parent': '430000'
          },
          {
            'name': '天心区',
            'value': '430200',
            'parent': '430000'
          },
          {
            'name': '岳麓区',
            'value': '430300',
            'parent': '430000'
          },
          {
            'name': '开福区',
            'value': '430400',
            'parent': '430000'
          },
          {
            'name': '雨花区',
            'value': '430500',
            'parent': '430000'
          },
          {
            'name': '望城',
            'value': '430600',
            'parent': '430000'
          },
          {
            'name': '长沙县',
            'value': '430700',
            'parent': '430000'
          },
          {
            'name': '宁乡县',
            'value': '430800',
            'parent': '430000'
          },
          {
            'name': '珠江一',
            'value': '430102',
            'parent': '430100'
          },
          {
            'name': '珠江二',
            'value': '430103',
            'parent': '430100'
          },
          {
            'name': '珠江二',
            'value': '430104',
            'parent': '430100'
          },
          {
            'name': '珠江二',
            'value': '430105',
            'parent': '430100'
          },
          {
            'name': '珠江二',
            'value': '430111',
            'parent': '430100'
          },
          {
            'name': '珠江二',
            'value': '430112',
            'parent': '430100'
          },
          {
            'name': '珠江二',
            'value': '430121',
            'parent': '430100'
          },
          {
            'name': '珠江二',
            'value': '430124',
            'parent': '430100'
          }
        ],
        detailAddrss: '',
        curAddress: {},
        token: localStorage.getItem('m-token'),
        villageId: ''
      }
    },
    created () {
      this.curAddress = this.$route.query.curEdt
      console.log(this.curAddress.shippingId)
      this.name = this.curAddress.shippingName
      this.phone = this.curAddress.shippingPhone
      this.detailAddrss = this.curAddress.address
      console.log(this.$route.query.curEdt)
    },
    methods: {
      deleteAddress () {
        var _this = this
        this.$vux.confirm.show({
          title: '提示',
          content: '你确定要删除该地址么？',
          onConfirm () {
            _this.post('/shipping/deleteAddress', {
              token: _this.token,
              shippingId: _this.curAddress.shippingId
            }).then(res => {
              if (res.data.code === 100) {
                _this.$router.go(-1)
              }
              if (res.data.code === 101) {
                _this.$vux.toast.text(res.data.msg, 'center')
              }
              if (res.data.code === 102) {
                _this.$vux.toast.text(res.data.msg, 'center')
                localStorage.removeItem('m-token')
              }
            })
          }
        })
      },
      saveAddress () {
        this.post('/shipping/updateAddress', {
          token: this.token,
          shippingName: this.name,
          shippingPhone: this.phone,
          villageId: this.villageId,
          areaId: this.areaId,
          address: this.detailAddrss
        }).then(res => {
          if (res.data.code === 100) {
            this.$router.go(-1)
          }
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'center')
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'center')
            localStorage.removeItem('m-token')
          }
        })
      },
      setDefault (val) {
        console.log(val)
        val ? this.defaultVal = 1 : this.defaultVal = 0
//        if (val) {
//          var defaultVal = 1
//        } else {
//          defaultVal = 0
//        }
        this.post('/shipping/updateAddress', {
          token: this.token,
          isDefault: this.defaultVal,
          shippingId: this.curAddress.shippingId
        }).then((res) => {
          console.log(res.data)
          if (res.data.code === 100) {}
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'center')
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'center')
            localStorage.removeItem('m-token')
          }
        })
      }
    },
    computed: {
      defaultFlag () {
        if (this.curAddress.isDefault === 1) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style lang='less' scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .edit-address {
    .cp-header {
      color: #222;
      z-index: 103;
      background: #f9f9f9;
      .back {
        color: #222;
      }
      .save {
        position: absolute;
        .r(36);
        color: @theme-color;
        .fs(32);
      }
    }
    .userInfo {
      .mt(92)
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
