<template>
  <div class="edit-address">
    <m-header :title="title">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
      <span slot="right" class="save">保存</span>
    </m-header>
    <group class="userInfo">
      <x-input title="收货人" name="username" is-type="china-name" v-model="ss"></x-input>
      <x-input title="手机号码" name="mobile" keyboard="number" is-type="china-mobile"></x-input>
    </group>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  import { Group, XInput, XAddress } from 'vux'
  export default{
    components: {
      mHeader,
      Group,
      XInput,
      XAddress
    },
    data () {
      return {
        title: '修改收货地址',
        ss: '2222'
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
  }

</style>
