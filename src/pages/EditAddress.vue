<template>
  <div class="edit-address">
    <m-header :title="title">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
      <span slot="right" class="save" @click="saveAddress">保存</span>
    </m-header>
    <group class="userInfo">
      <x-input title="收货人" name="username" is-type="china-name" v-model="ss"></x-input>
      <x-input title="手机号码" name="mobile" keyboard="number" is-type="china-mobile"></x-input>
      <x-address title="选择地区" v-model="value" :list="addressList" placeholder="请选择地址"></x-address>
      <x-textarea title="详细地址" :show-counter="false" :rows="2"
                  autosize v-model="detailAddrss"></x-textarea>
    </group>
    <group class="setDefault">
      <x-switch title="设为默认地址" v-model="defaultFlag"></x-switch>
    </group>
    <group class="delet">
      <cell title="删除地址" @click="delAddress"></cell>
    </group>
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
        title: '修改收货地址',
        ss: '2222',
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
        detailAddrss: '505室',
        defaultFlag: false
      }
    },
    methods: {
      delAddress () {},
      saveAddress () {}
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
      color: @theme-color;
    }
  }

</style>
