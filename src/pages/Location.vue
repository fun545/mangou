<template>
  <div class="location-view">
    <m-header title="配送至">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
      <span class="right" slot="right" @click="addAddress">新增地址</span>
    </m-header>
    <div class="content" ref="content">
      <div>
        <!--<search placeholder="请输入小区名字" @on-focus="goSearch"></search>-->
        <!--搜索框-->
        <div class="search-box" @click="goSearch">
          <div class="search">
            <i class="iconfont">&#xe639;</i>
            请输入小区名称
          </div>
        </div>
        <!--定位当前-->
        <div class="current-position t-c" @click="goCurrentVillage">
          <span class="iconfont">&#xe656;</span>
          定位到当前位置
        </div>
        <!--常用收获地址-->
        <div class="current-address" v-if="token">
          <div class="title">
            常用收获地址
          </div>
          <div class="item">
            <div class="top">
              <span class="name">小玉米</span>
              <span class="tel">15258195623</span>
            </div>
            <div class="bottom">长沙市开福区</div>
          </div>
          <div class="item">
            <div class="top">
              <span class="name">小玉米</span>
              <span class="tel">15258195623</span>
            </div>
            <div class="bottom">长沙市开福区</div>
          </div>
          <div class="item">
            <div class="top">
              <span class="name">小玉米</span>
              <span class="tel">15258195623</span>
            </div>
            <div class="bottom">长沙市开福区</div>
          </div>
        </div>
        <!--附近小区-->
        <div class="current-village">
          <group title="附近配送到小区">
            <cell title="小区一" is-link></cell>
            <cell title="小区一" is-link></cell>
            <cell title="小区一" is-link></cell>
          </group>
        </div>
        <!--没有登录时 登录按钮-->
        <div class="t-c login-bt-wrap" v-if="!token">
          <div class="login-bt">
            登录
          </div>
          登录查看已有收获地址
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Alert, Group, Cell } from 'vux'
  import mHeader from '../components/header'
  import BScroll from 'better-scroll'
  export default {
    name: 'location',
    components: {Alert, mHeader, Group, Cell, BScroll},
    data () {
      return {
        search: '',
        city: '长沙',
        area: '开福区',
        villageList: '',
        village: '',
        isOk: false,
        alertShow: false,
        alertTitle: '定位失败',
        alertContent: '请手动搜索',
        token: localStorage.getItem('m-token')
      }
    },
    created () {
      console.log(localStorage.getItem('m-token'))
      this.$nextTick(() => {
        this._initScroll()
      })
      this.getPosition()
//      var curPosition = JSON.parse(localStorage.getItem('m-CurrentPosition'))
//      console.log(curPosition)
//      if (curPosition) {
//        this.post('/village/villageList', {
//          longitude: curPosition.lng.toFixed(6),
//          latitude: curPosition.lat.toFixed(6),
//          source: 1
//        }).then((res) => {
//          if (res.data.code === 100) {
//            console.log(res.data)
//            this.villageList = res.data.villageList
//            console.log(this.villageList)
//          }
//        })
//      } else {
//        this.alertShow = true
//      }
    },
    methods: {
      curVillage (data) {
        this.village = data.villageName
        localStorage.setItem('m-cityId', data.cityId)
        localStorage.setItem('m-areaId', data.areaId)
        localStorage.setItem('m-villageId', data.villageId)
        localStorage.setItem('m-villageName', data.villageName)
//        this.$router.push({path: '/home'})
        if (!this.$route.query.path) {
          this.$router.replace('/home')
          window.location.reload()
        }
        window.location.reload()
        this.$router.replace(this.$route.query.path)
      },
      searchLocation () {
        if (!this.search) return this.$vux.alert.show({content: '搜索内容不能为空'})

        this.$vux.alert.show({content: `您的搜索内容是${this.search}`})
      },
      go () {
        this.$router.push({path: '/manualLocation', query: this.$route.query})
      },
      // 跳转搜索
      goSearch () {
        this.$router.push('/searchVillage')
      },
      // 获取当前位置信息
      getPosition () {},
      // 跳转添加收货地址
      addAddress () {
        if (!this.token) {
          this.$router.push('/login')
          return
        }
        this.$router.push('/addAddress')
      },
      // 定位到当前小区
      goCurrentVillage () {
        this.post('/village/villageList', {
          longitude: this.longitude,
          latitude: this.latitude,
          source: 1
        }).then((res) => {
          if (res.data.code === 100) {
            console.log(res.data)
            this.villageList = res.data.villageList
            console.log(this.villageList)
          }
        })
      },
      _initScroll () {
        this.contentScroll = new BScroll(this.$refs.content)
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
      /*position: inherit;*/
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
