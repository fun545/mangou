<template>
  <div class="location-view">
    <x-header :left-options="{backText:''}" class="location-h">
      定位
      <a slot="right" @click="go()">手动搜索</a>
    </x-header>
    <div class="location-content">
      <div class="title">
        <i class="iconfont t-icon">&#xe610;</i>
        <span class="text">已帮您定位到以下小区</span>
      </div>
      <group class="l-c-list">
        <cell :title="village.villageName" is-link v-for="(village,index) in villageList" :key="index"
              @click.native="curVillage(village)"></cell>
      </group>
      <div>{{village}}</div>
      <div class="location-city">
        <div class="title">
          <i class="iconfont t-icon">&#xe610;</i>
          <span class="text">定位城市</span>
        </div>
        <div class="city t-c">
          {{city}}
        </div>
      </div>
      <alert v-model="alertShow" :title="alertTitle" :content="alertContent"></alert>
    </div>
    <div class="location-footer t-c">
      我要开店
    </div>
  </div>
</template>

<script>
  import { XHeader, Group, Cell, Alert } from 'vux'
  export default {
    name: 'location',
    components: {XHeader, Group, Cell, Alert},
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
        alertContent: '请手动搜索'
      }
    },
    created () {
      var curPosition = JSON.parse(localStorage.getItem('m-CurrentPosition'))
      console.log(curPosition)
      if (curPosition) {
        this.post('/village/villageList', {
          longitude: curPosition.lng.toFixed(6),
          latitude: curPosition.lat.toFixed(6),
          source: 1
        }).then((res) => {
          if (res.data.code === 100) {
            console.log(res.data)
            this.villageList = res.data.villageList
            console.log(this.villageList)
          }
        })
      } else {
        this.alertShow = true
      }
    },
    methods: {
      curVillage (data) {
        this.village = data.villageName
        localStorage.setItem('m-cityId', data.cityId)
        localStorage.setItem('m-areaId', data.areaId)
        localStorage.setItem('m-villageId', data.villageId)
        localStorage.setItem('m-villageName', data.villageName)
//        this.$router.push({path: '/home'})
        this.$router.replace(this.$route.query.path)
        window.location.reload()
      },
      searchLocation () {
        if (!this.search) return this.$vux.alert.show({content: '搜索内容不能为空'})

        this.$vux.alert.show({content: `您的搜索内容是${this.search}`})
      },
      go () {
        this.$router.push({path: '/manualLocation', query: this.$route.query})
      }
    }
  }
</script>

<style lang="less">
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .location-view {
    background: @bg-color;
    .fs(35);
  }

  .location-h {
    background: @theme-color;
  }

  .location-h {
    .vux-header-left {
      .left-arrow:before {
        border-color: #fff;
        border-width: 2px 0 0 2px
      }
    }
    .vux-header-right {
      a {
        color: #fff;
      }
    }
  }

  .location-content {
    .h(96);
    .lh(96);
    color: @font-color-m;
    background: #fff;
    .title {
      .ml(34);
      .t-icon {
        color: @theme-color;
      }
    }
    .l-c-list {
      .vux-no-group-title {
        .mt(12);
        .weui-cell_access {
          .pl(66);
        }
      }
    }
  }

  .location-city {
    .title {
      color: #8b8b8b;
    }
    .city {
      border: 1px solid #d2d2d2;
      .w(142);
      .h(77);
      .lh(77);
      .ml(54);
      border-radius: 3px;
      color: @theme-color;
    }
  }

  .location-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    .h(100);
    .lh(100);
    color: #fff;
    background: @theme-color;
    .fs(35);
  }
</style>
