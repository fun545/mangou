<template>
  <div class="add-address">
    <m-header :title="title">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
      <span slot="right" class="save" @click="saveAddress">保存</span>
    </m-header>
    <group class="userInfo">
      <x-input title="收货人" name="username" is-type="china-name" v-model="shippingName" placeholder="请填写"></x-input>
      <x-input title="手机号码" name="mobile" keyboard="number" is-type="china-mobile" placeholder="请填写"
               v-model="shippingPhone"></x-input>
      <x-address title="选择地区" v-model="value" :list="addressList" placeholder="请选择地址"></x-address>
      <x-textarea title="详细地址" :show-counter="false" :rows="2"
                  autosize v-model="address" placeholder="例如5号楼202室"></x-textarea>
    </group>
    <group class="setDefault">
      <x-switch title="设为默认地址" v-model="defaultFlag"></x-switch>
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
    name: 'addAddress',
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
        ss: '2222',
        value: [],
        addressList: [],
        defaultFlag: false,
        shippingName: '',
        shippingPhone: '',
        villageId: '',
        cityId: '',
        areaId: '',
        address: '',
        areaList: ''
      }
    },
    created () {
      this.threeLinkage()
    },
    methods: {
      delAddress () {},
      saveAddress () {},
      // 三级联动
      async threeLinkage () {
        await this.post('/village/getAllData', {areaId: 1}).then((res) => {
          console.log(res.data)
          if (res.data.code === 100) {
            this.areaList = res.data.areaList
          }
        })
        var firstVal = 430000
        this.post('/village/cityList', {}).then((res) => {
          console.log(res.data)
          if (res.data.code === 100) {
            res.data.cityList.forEach((item, index) => {
              var cityObj = {}
              cityObj['name'] = item.cityName
              cityObj['value'] = firstVal
              this.addressList.push(cityObj)
              var areaValue = firstVal + 100
              this.areaList.forEach((item, index) => {
                var areaObj = {}
                areaObj['name'] = item.areaName
                areaObj['parent'] = firstVal
                areaObj['value'] = areaValue
                this.addressList.push(areaObj)
                var villageValue = areaValue + 2
                if (item.villageList.length > 0) {
                  item.villageList.forEach((item, index) => {
                    var villageObj = {}
                    villageObj['name'] = item.villageName
                    villageObj['parent'] = areaValue
                    villageObj['value'] = villageValue
                    this.addressList.push(villageObj)
                    villageValue += 1
                  })
                } else {
                  var villageObj = {}
                  villageObj['name'] = '--'
                  villageObj['parent'] = areaValue
                  villageObj['value'] = '--'
                  this.addressList.push(villageObj)
//                  villageValue += 1
                }
                areaValue += 100
              })
              firstVal += 10000
            })
            console.log(this.addressList)
          }
        })
      }
    }
  }
</script>

<style lang='less' scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .add-address {
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
