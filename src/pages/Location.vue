<template>
  <div class="location-view">
    <m-header title="配送至">
      <span class="back iconfont" @click="$router.push('/home')" slot="icon">&#xe600;</span>
      <span class="right" slot="right" @click="goAddAddress">新增地址</span>
    </m-header>
    <scroll class="content">
      <div>
        <!--<search placeholder="请输入小区名字" @on-focus="goSearch"></search>-->
        <!--搜索框-->
        <div class="search-box" @click="goMap">
          <div class="search">
            <i class="iconfont">&#xe639;</i>
            请输入小区名称
          </div>
        </div>
        <!--定位当前-->
        <div class="current-position t-c">
          <div v-if="villageList.length>0&&!positionLoading" @click="curVillage(villageList[0])">
            <span class="iconfont">&#xe656;</span>
            定位到当前位置
          </div>
          <div v-if="villageList.length===0&&!positionLoading" @click="goMap">附近无服务小区或定位失败，请点击选择更多</div>
          <div v-if="positionLoading">
            定位中
          </div>
        </div>
        <!--常用收获地址-->
        <div class="current-address" v-if="token&&addressList.length>0">
          <div class="title">
            常用收获地址
          </div>
          <div class="item" v-for="(item,index) in addressList" :key="index" @click="curVillage(item)">
            <div class="top">
              <span class="name">{{item.shippingName}}</span>
              <span class="tel">{{item.shippingPhone}}</span>
            </div>
            <div class="bottom">{{item.cityName + item.areaName + item.villageName + item.address}}</div>
          </div>
        </div>
        <!--附近小区-->
        <div class="current-village" v-if="villageList.length>0">
          <group title="附近配送到小区">
            <cell :title="item.villageName" is-link v-for="(item,index) in villageList" :key="index"
                  @click.native="curVillage(item)"></cell>
          </group>
        </div>
        <!--没有登录时 登录按钮-->
        <div class="t-c login-bt-wrap" v-if="!token">
          <div class="login-bt" @click="$router.push('/login')">
            登录
          </div>
          登录查看已有收获地址
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import { Alert, Group, Cell } from 'vux'
  import mHeader from '../components/header'
  import { MP } from '../util/map'
  export default {
    name: 'location',
    components: {Alert, mHeader, Group, Cell},
    data () {
      return {
        search: '',
        villageList: '',
        token: localStorage.getItem('m-token'),
        userlocation: {lng: '', lat: ''}, // 用户位置
        addressList: [], // 收获地址
        positionLoading: true
      }
    },
    async created () {
      // 获取当前位置
      await this.getPosition()
      if (this.token) {
        this.getAddress()
      }
    },
    methods: {
      // 选择当前小区
      curVillage (data) {
        localStorage.setItem('m-cityId', data.cityId)
        localStorage.setItem('m-areaId', data.areaId)
        localStorage.setItem('m-villageId', data.villageId)
        localStorage.setItem('m-villageName', data.villageName)
        this.$store.commit('saveVillageInfo', data)
        this.$store.commit('saveAddress', data)
        this.$router.replace('/home')
        setTimeout(() => {
          window.location.reload()
        })
      },

      // 跳转地图
      goMap () {
        this.$store.commit('saveSelectVillagePath', '/home')
        this.$router.push('/Bmap')
      },
      // 获取当前位置信息
      getPosition () {
        var _this = this
        /* eslint-disable no-undef */
        MP().then(BMap => {
          var geolocation = new BMap.Geolocation()
          geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() === BMAP_STATUS_SUCCESS) {
              _this.userlocation = {
                lng: r.point.lng,
                lat: r.point.lat
              }
              var c = JSON.stringify(_this.userlocation)
              _this.goCurrentVillage()
              localStorage.setItem('m-userlocation', c)
            }
          })
        })
      },
      // 跳转添加收货地址
      goAddAddress () {
        if (!this.token) {
          this.$vux.toast.text('请登录', 'top')
          return
        }
        this.$store.commit('saveAddAddress', '/location')
        this.$router.push('/addAddress')
      },
      // 定位到当前小区
      goCurrentVillage () {
        // 请求数据获取附近小区
        this.post('/village/villageList', {
          longitude: this.userlocation.lng,
          latitude: this.userlocation.lat,
          source: 1
        }).then((res) => {
          if (res.data.code === 100) {
            this.villageList = res.data.villageList
            this.positionLoading = false
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
      // 获取收货地址
      getAddress () {
        this.post('/shipping/getAddressList', {
          token: this.token
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
      }
    }
  }
</script>

<style lang="less">
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .location-view {
    width: 100%;
    height: 100%;
    .cp-header {
      .right {
        position: absolute;
        .r(30);
        .fs(28);
        color: @theme-color;
      }
    }
    .content {
      position: absolute;
      left: 0;
      right: 0;
      .t(92);
      bottom: 0;
      overflow: hidden;
      .search-box {
        background: #fff;
        .pt(12);
        .pb(12);
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        .search {
          /*width: 100%;*/
          border-radius: 8px;
          .pl(30);
          .pr(10);
          .ml(25);
          .mr(25);
          .h(60);
          .lh(60);
          color: @font-color-input;
          .iconfont {
            color: @font-color-input;
            .pr(15);
            .fs(26);
          }
          background: @bg-color;
        }
      }
      .current-position {
        .h(63);
        .lh(63);
        .ml(25);
        .mr(25);
        .mt(20);
        color: @theme-color;
        background: #fff;
        border-radius: 12px;
        border: 1px solid #eee;
        .fs(26);
      }
      .login-bt-wrap {
        color: @font-color-m;
        .login-bt {
          color: #fff;
          .h(80);
          .lh(80);
          .fs(32);
          border-radius: 6px;
          width: 93%;
          margin: 0 auto;
          background: @theme-color;
          .mt(40);
          .mb(40);
        }
      }
      .current-address {
        .ml(25);
        .mr(25);
        /*.mt(25);*/
        .title {
          .pt(15);
          .pb(15);
          .pl(15);
          color: @font-color-input;
          .fs(28);
        }
        .item {
          .fs(26);
          border-radius: 8px;
          border: 1px solid #eee;
          background: #fff;
          .pl(15);
          .pr(15);
          .pt(10);
          .pb(10);
          .mb(10);
          .top {
            .h(40);
            .lh(40);
            color: @font-color-m;
            display: flex;
            justify-content: space-between;
            .fs(27);
          }
          .bottom {
            .h(40);
            .lh(40);
            color: @font-color-input;
          }
        }
      }
      .current-village {
        .weui-cells__title {
          .fs(28);
        }
        .weui-cells {
          .fs(28);
          .weui-cell_access .weui-cell__ft:after {
            .w(12);
            .h(12);
          }
        }
      }
    }
  }
</style>
