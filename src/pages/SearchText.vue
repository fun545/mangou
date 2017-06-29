<template>
  <div class="search-text-view">
    <!-- 搜索框 -->
    <div class="top-search-box">
      <div class="search-left" @click="$router.go(-1)">&#xe600;</div>
      <div class="search-box">
        <input type="search" placeholder="搜索内容" @keyup.enter="searchWord" v-model.trim="search">
      </div>
      <div class="search-right" @click="searchWord">搜索</div>
    </div>
    <!-- Tab列表 -->
    <tab :line-width="1" defaultColor="#999" :active-color="activeColor" v-model="index">
      <tab-item><i class="iconfont">&#xe60a;</i>次日达</tab-item>
      <tab-item><i class="iconfont">&#xe61f;</i>即时送</tab-item>
    </tab>
    <!-- 相关内容 -->
    <swiper :show-dots="false" height="100%" v-model="index">
      <swiper-item>
        <router-link to="/goods_detail" tag="div" class="goods-item" v-for="(item,index) in 5" :key="index">
          <img src="../assets/goods_img.jpg" width="30%" alt="">
          <div class="flex-col">
            <p>景田百岁山350ml</p>
            <p style="color:#444;font-size:12px;">次日价：¥1.5</p>
            <p :style="{color:activeColor,fontSize:'12px'}">即时价：¥2.0</p>
          </div>
          <div class="cart-icon" :style="{backgroundColor:activeColor}">&#xe613;</div>
        </router-link>
      </swiper-item>
      <swiper-item>
        <router-link to="/goods_detail" tag="div" class="goods-item" v-for="(item,index) in 5" :key="index">
          <img src="../assets/goods_img.jpg" width="30%" alt="">
          <div class="flex-col">
            <p>景田百岁山350ml</p>
            <p style="color:#444;font-size:12px;">次日价：¥1.5</p>
            <p :style="{color:activeColor,fontSize:'12px'}">即时价：¥2.0</p>
          </div>
          <div class="cart-icon" :style="{backgroundColor:activeColor}">&#xe613;</div>
        </router-link>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import { Tab, TabItem, Swiper, SwiperItem } from 'vux'

  export default {
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    data () {
      return {
        search: '',
        index: 0
      }
    },
    created () {
      this.search = this.$route.query.search
    },
    computed: {
      activeColor () {
        return this.index ? '#07a4f6' : '#fc7070'
      }
    },
    methods: {
      searchWord () {
        if (!this.search) return this.$vux.alert.show({content: '搜索内容不能为空'})

        this.$vux.alert.show({content: `您的搜索内容为${this.search}`})
      }
    }
  }
</script>

<style lang="less">
  .search-text-view .top-search-box {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 5px 0;

    .search-left {
      padding-left: 10px;
      font: 16px/1 'iconfont';
    }

    .search-box {
      margin: auto 10px;
      padding: 5px 10px;
      flex-grow: 1;
      height: 20px;
      line-height: 20px;
      background-color: #f2f2f2;
      border-radius: 100px;
      position: relative;
    }

    .search-box:before {
      content: '\e639';
      color: #666;
      font: 12px/1 'iconfont';
      position: absolute;
      top: 10px;
      left: 10px;
    }

    input {
      width: 100%;
      line-height: 20px;
      padding-left: 16px;
      color: #666;
      font-size: 12px;
      border: none;
      background-color: transparent;
      outline: none;
      -webkit-appearance: none;
    }

    .search-right {
      padding-right: 10px;
      color: #666;
      font-size: 12px;
    }
  }

  .search-text-view .vux-tab .iconfont {
    font-size: inherit;
    margin-right: 5px;
  }

  .search-text-view .vux-slider {
    height: calc(~'100% - 84px');

    .vux-swiper {
      overflow-y: scroll;
    }

    .goods-item {
      display: flex;
      align-items: center;
      padding: 10px;
      background-color: #fff;
      position: relative;
    }

    .goods-item:after {
      content: '';
      height: 1px;
      background-color: #ddd;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .flex-col {
      margin: auto 10px;
      line-height: 1.6;
    }

    .cart-icon {
      padding: 4px;
      border-radius: 100px;
      font: 18px/1 'iconfont';
      color: #fff;
      background-color: #999;
    }
  }
</style>
