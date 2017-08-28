<template>
  <div class="search-village-box" @touchmove.prevent>
    <div class="search-box">
      <div class="input-box d-ib">
        <div class="city d-ib" @click="$router.push({path:'/chooseCity',query:{path:'/searchVillage'}})">
          长沙<i class="iconfont icon">&#xe674;</i>
        </div>
        <div class="input d-ib">
          <i class="iconfont search-icon">&#xe639;</i>
          <input type="text" placeholder="请输入小区名称" v-model="keyName">
        </div>
      </div>
      <span class="back" @click="$router.back()">取消</span>
    </div>
    <div class="content">
      <div class="item" v-for="(item,index) in list" :key="index" @click="curVillage(item)">
        {{item.villageName}}
      </div>
      <div class="noThing t-c" v-if="list.length<=0">
        亲，没有搜索到相关信息
      </div>
    </div>
  </div>
</template>

<script>
  import { getStoreInfo } from '../util/util'
  export default {
    name: 'searchVillage',
    data () {
      return {
        list: [],
        keyName: '', // 搜索关键字
        cityName: '长沙', // 默认长沙
        cityId: 1 // 默认长沙
      }
    },
    created () {
      this.cityId = localStorage.getItem('m-cityId')
      this.cityName = localStorage.getItem('m-cityName')
    },
    methods: {
      searchVillage () {
        if (!this.keyName) {
          return
        }
        this.post('/village/getAllVillage', {
          cityId: this.cityId,
          keyName: this.keyName
        }).then((res) => {
          if (res.data.code === 100) {
            this.list = res.data.villageList
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
      curVillage (item) {
        // 除了选择或者切换小区外，不保存village和更新storeId
        if (this.$store.state.selectVillagePath !== '/home' && this.$store.state.selectVillagePath !== '/this') {
          if (this.$store.state.selectVillagePath === '/edit_address') {
            this.$store.commit('edtAddress', item)
          } else {
            this.$store.commit('saveAddress', item)
          }
          this.$router.replace({path: this.$store.state.selectVillagePath})
          return
        }
        // 选择或切换小区   更新storeId 和 village
        localStorage.setItem('m-cityId', item.cityId)
        localStorage.setItem('m-areaId', item.areaId)
        localStorage.setItem('m-villageId', item.villageId)
        localStorage.setItem('m-villageName', item.villageName)
        this.$store.commit('saveVillageInfo', item)
        // this 跳转及时送更新storeInfo
        if (this.$store.state.selectVillagePath === '/this') {
          getStoreInfo(this)
          return
        }
        // home 选择后跳转
        this.$router.replace(this.$store.state.selectVillagePath)
        window.location.reload()
      }
    },
    watch: {
      keyName () {
        this.searchVillage()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .search-village-box {
    width: 100%;
    height: 100%;
    background: #fff;
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

  .content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    .t(104);
    .item {
      .h(90);
      .lh(90);
      .fs(32);
      .pl(35);
      border-bottom: 1px solid #eee;
      color: @font-color-m;
    }
    .noThing {
      position: absolute;
      width: 100%;
      .h(40);
      .lh(40);
      color: @font-color-input;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
