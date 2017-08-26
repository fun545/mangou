<template>
  <div class="map-view" @touchmove.prevent>
    <div class="search-box">
      <div class="input-box d-ib">
        <div class="city d-ib" @click="$router.push({path:'/chooseCity',query:{path:'/Bmap'}})">
          长沙<i class="iconfont icon">&#xe674;</i>
        </div>
        <div class="input d-ib" @click="goSearch">
          <i class="iconfont search-icon">&#xe639;</i>
          <input type="text" placeholder="请输入小区名称">
        </div>
      </div>
      <span class="back" @click="$router.back()">取消</span>
    </div>
    <div id="allmap" class="map"></div>
    <div class="village-box clearfix">
      <div class="areaList f-l t-c" ref="areaList">
        <!--<div class="item">附近</div>-->
        <div>
          <div class="item" @click="nearChange" :class="{'active':ind===-1}">
            附近
          </div>
          <div class="item" v-for="(item,index) in areaList" :key="index" @click="changeList(item,index)"
               :class="{'active':ind===index}">
            {{item.areaName}}
          </div>
        </div>
      </div>
      <div class="village-list f-l" ref="villageList">
        <div>
          <div class="item" v-for="(item,index) in villageList" :key="index" @click="chooseVillage(item)">
            {{item.villageName}}
            <span class="nearest f-r"><span v-if="ind===-1&&index===0">最近</span></span>
          </div>
          <div v-if="noVillageFlag" class="t-c no-village">
            <span class="text d-ib">该区域未开通</span>
            <div class="bt" @click="$router.push('/shop')">我要开店</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { MP } from '../util/map'
  import { getStoreInfo } from '../util/util'
  import BScroll from 'better-scroll'
  export default {
    components: {BScroll},
    data () {
      return {
        // 经度
        longitude: 116.417854,
        // 纬度
        latitude: 39.921988,
        villageList: [],
        description: '天安门',
        areaList: [],
        userlocation: {lng: '', lat: ''}, // 用户位置
        nearVillageList: [], // 附近小区
        ind: -1,
        noVillageFlag: false,
        opts: {
          width: 250, // 信息窗口宽度
          height: 40, // 信息窗口高度
          title: '' // 信息窗口标题
        } // 窗口信息配置
      }
    },
    async mounted () {
      this.getAreaList()
      this.$nextTick(() => {
//        MP().then(BMap => {
//          /* eslint-disable no-undef */
//          var map = new BMap.Map('allmap')
//          var point = new BMap.Point(this.longitude, this.latitude) // 创建坐标点
//          var marker = new BMap.Marker(point)
//          map.addOverlay(marker)
//          map.centerAndZoom(point, 50)
//          var opts = {
//            width: 59,
//            height: 20,
//            title: '珠江花痴'
//          }
//          var infoWindow = new BMap.InfoWindow(this.description, opts)// 创建信息窗口对象
//          marker.addEventListener('click', function () {
//            map.openInfoWindow(infoWindow, point)
//          })
//          map.enableScrollWheelZoom(true)
//          map.openInfoWindow(infoWindow, point)// 开启信息窗口
//        })
        MP().then(BMap => {
          var _this = this
          // 获取经纬度
          var getPositon = () => {
            var promise = new Promise((resolve) => {
              // 获取当前位置
              /* eslint-disable no-undef */
              var geolocation = new BMap.Geolocation()
              geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() === BMAP_STATUS_SUCCESS) {
                  _this.userlocation = {
                    lng: r.point.lng,
                    lat: r.point.lat
                  }
                  var c = JSON.stringify(_this.userlocation)
                  _this.getNearVillage()
                  localStorage.setItem('m-userlocation', c)
                  resolve(_this.userlocation)
                }
              })
            })
            return promise
          }
          getPositon().then(() => {
            // 地图
            /* eslint-disable no-undef */
            var map = new BMap.Map('allmap')
            map.centerAndZoom(new BMap.Point(_this.userlocation.lng, _this.userlocation.lat), 15)
//            var dataInfo = [[116.417854, 39.921988, '地址：北京市东城区王府井大街88号乐天银泰百货八层'],
//              [116.406605, 39.921585, '地址：北京市东城区东华门大街'],
//              [116.412222, 39.912345, '地址：北京市东城区正义路甲5号']
//            ]
//            _this.$vux.toast.text('text', 'center')
            for (var i = 0; i < _this.villageList.length; i++) {
              var curVillage = _this.villageList[i]
              var marker = new BMap.Marker(new BMap.Point(curVillage.longitude, curVillage.latitude))  // 创建标注
              var content = curVillage.villageName
              map.addOverlay(marker)              // 将标注添加到地图中
              addClickHandler(content, marker)
            }
            function addClickHandler (content, marker) {
              marker.addEventListener('click', function (e) {
                openInfo(content, e)
              })
            }

            function openInfo (content, e) {
              var p = e.target
              var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
              var infoWindow = new BMap.InfoWindow(content, _this.opts)  // 创建信息窗口对象
              map.openInfoWindow(infoWindow, point) // 开启信息窗口
            }
          })
        })
      })
    },
    methods: {
      // 获取附近小区
      getNearVillage () {
        this.post('/village/villageList', {
          longitude: this.userlocation.lng,
          latitude: this.userlocation.lat,
          source: 1
        }).then((res) => {
          if (res.data.code === 100) {
            this.nearVillageList = res.data.villageList
            this.villageList = res.data.villageList
          }
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'middle')
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'middle')
            localStorage.removeItem('m-token')
          }
          this.villageList.length > 0 ? this.noVillageFlag = false : this.noVillageFlag = true
        })
      },
      // 获取长沙所有区域的小区
      getAreaList () {
        this.post('/village/getAllData', {}).then((res) => {
          if (res.data.code === 100) {
            this.areaList = res.data.areaList
            this.noVillageFlag = true
          }
          if (res.data.code === 101) {
            this.$vux.toast.text(res.data.msg, 'middle')
          }
          if (res.data.code === 102) {
            this.$vux.toast.text(res.data.msg, 'middle')
            localStorage.removeItem('m-token')
          }
          this.$nextTick(() => {
            this._initVillageScroll()
          })
        })
      },
      nearChange () {
        this.villageList = this.nearVillageList
        this.ind = -1
        this.villageList.length > 0 ? this.noVillageFlag = false : this.noVillageFlag = true
        this.$nextTick(() => {
          this.villageScroll.refresh()
        })
      },
      changeList (item, index) {
        this.ind = index
        this.villageList = item.villageList
        this.villageList.length > 0 ? this.noVillageFlag = false : this.noVillageFlag = true
        this.$nextTick(() => {
          this.villageScroll.refresh()
        })
      },
      // 选择小区
      async chooseVillage (item) {
        // 除了选择或者切换小区外，不保存village和更新storeId
        if (this.$store.state.selectVillagePath !== '/home' || this.$store.state.selectVillagePath !== '/this') {
          if (this.$store.state.selectVillagePath === '/edit_address') {
            this.$store.commit('edtAddress', item)
          } else {
            this.$store.commit('saveAddress', item)
          }
          this.$router.push({path: this.$store.state.selectVillagePath})
          return
        }
        // 选择或切换小区   更新storeId 和 village
        localStorage.setItem('m-cityId', item.cityId)
        localStorage.setItem('m-areaId', item.areaId)
        localStorage.setItem('m-villageId', item.villageId)
        localStorage.setItem('m-villageName', item.villageName)
        this.$store.commit('saveVillageInfo', item)
        await getStoreInfo(this)
        // 选择后跳转
        this.$router.replace({path: this.$store.state.selectVillagePath})
        setTimeout(() => {
          window.location.reload()
        })
      },
      // 去搜索页面
      goSearch () {
        this.$router.push('/searchVillage')
      },
      _initVillageScroll () {
        this.villageScroll = new BScroll(this.$refs.villageList, {click: true})
        this.areaListScroll = new BScroll(this.$refs.areaList, {click: true})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .map-view {
    height: 100%;
  }

  .search-box {
    .pl(25);
    .pr(25);
    .pt(20);
    .pb(20);
    .fs(28);
    border-bottom: 1px solid #ddd;
    background: #fff;
    .input-box {
      background: @bg-color;
      .w(608);
      .h(58);
      .lh(58);
      .mr(20);
      border: 1px solid #eee;
      border-radius: 5px;
      .city {
        height: 100%;
        .pl(25);
        background: #fff;
        .icon {
          .fs(20);
          .pl(12);
          .pr(12);
        }
      }
      .input {
        .search-icon {
          .fs(27);
          color: @font-color-input;
          .pl(18);
          .pr(18);
        }
        input {
          background: @bg-color;
          border: none;
          .fs(28);
          display: inline-block;
          height: 100%;
          outline: none;
        }
      }
    }
  }

  .map {
    width: 100%;
    .h(460);
  }

  .village-box {
    position: absolute;
    .t(564);
    left: 0;
    right: 0;
    bottom: 0;
    .fs(32);
    color: #000;
    .areaList {
      .w(160);
      height: 100%;
      overflow: hidden;
      .item {
        .h(103);
        .lh(103);
        &.active {
          background: #fff;
        }
      }
    }
    .village-list {
      .w(590);
      height: 100%;
      background: #fff;
      overflow: hidden;
      .item {
        position: relative;
        .pl(20);
        .pr(20);
        .h(103);
        .lh(103);
        border-bottom: 1px solid #eee;
        border-left: 1px solid #eee;
        .nearest {
          color: #fff;
          .fs(25);
          span {
            background: @theme-color;
            .pt(5);
            .pb(5);
            .pl(10);
            .pr(10);
            border-radius: 5px;
          }
        }
      }
      .no-village {
        margin-top: 40%;
        .text {
          .mb(80);
        }
        .bt {
          .w(320);
          .h(75);
          .lh(75);
          border-radius: 18px;
          margin: 0 auto;
          color: #fff;
          background: @theme-color;
        }
      }
    }
  }
</style>
