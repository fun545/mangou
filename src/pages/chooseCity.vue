<template>
  <div class="city">
    <m-header title="请选择城市">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <div class="content">
      <div class="item" v-for="(item,index) in cityList" :key="index" @click="chooseCity(item)">
        <div class="city-name t-c">
          {{item.cityName}}
        </div>
        <div class="pic">
          <img :src="item.cityImg" alt="" width="100%" height="100%">
        </div>
        <div class="status t-c" :class="{'openning':item.isopen===0}">
          {{item | status}}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  export default {
    components: {mHeader},
    data () {
      return {
        cityList: []
      }
    },
    created () {
      // 第一次登陆没有选过小区的选择小区跳首页
      if (!localStorage.getItem('m-villageName')) {
        this.$store.commit('saveSelectVillagePath', '/home')
      }
      this.getCity()
    },
    methods: {
      getCity () {
        this.post('/village/cityList_new', {}).then((res) => {
          if (res.data.code === 100) {
            this.cityList = res.data.cityList
          }
        })
      },
      chooseCity (item) {
        if (item.isopen === 0) {
          this.$vux.toast.text('该城市尚未开通,敬请期待')
          return
        }
        if (item.isopen === 1) {
          localStorage.setItem('m-cityId', item.cityId)
          if (this.$route.query.path) {
            this.$router.replace(this.$route.query.path)
            return
          }
          this.$router.replace('/location')
        }
      }
    },
    filters: {
      status (val) {
        if (val.isopen === 0) {
          return '即将开通'
        }
        if (val.isopen === 1) {
          return '已开通'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .cp-header {
    background: @theme-color;
    color: #fff;
    .back {
      color: #fff;
    }
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    .t(92);
    .pl(30);
    .item {
      position: relative;
      .mr(30);
      .w(210);
      .h(210);
      float: left;
      .city-name {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        .fs(36);
        color: @theme-color;
      }
      .pic {
        width: 100%;
        .h(210);
        /*background: green;*/
      }
      .status {
        position: absolute;
        .h(45);
        .lh(45);
        width: 100%;
        background: rgba(249, 93, 67, .9);
        bottom: 0;
        color: #fff;
        &.openning {
          background: rgba(132, 131, 129, .8);
        }
      }
    }
  }
</style>
