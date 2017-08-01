<template>
  <div class="address">
    <m-header :title="title">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <div class="address-list">
      <div class="item">
        <div class="top">
          <div class="user-msg">
            <span>小玉米</span>
            <span class="tel">15258195623</span>
          </div>
          <div class="address">
            收货地址是地方都是反倒是第
          </div>
        </div>
        <div class="bt">
          <div class="left f-l">
            <div class="icon d-ib" @click="defaultFlag=!defaultFlag">
              <i class="iconfont" v-if="!defaultFlag">&#xe635;</i>
              <i class="iconfont selected" v-if="defaultFlag">&#xe634;</i>
            </div>
            <span :class="{'theme-color':defaultFlag}">设为默认</span>
          </div>
          <div class="right" @click="$router.push({path:'/edit_address'})">
            <i class="iconfont">&#xe602;</i>
            编辑
          </div>
        </div>
      </div>
    </div>
    <div class="add-address t-c" @click="$router.push({path:'addAddress'})">
      新增收货地址
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
        defaultFlag: false
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
