<template>
  <div class="collection-view">
    <!-- 页面头部 -->
    <x-header :left-options="{backText:''}">我的收藏<span slot="right" @click="isEdit = !isEdit" v-html="editText"/>
    </x-header>
    <!-- 页面内容 -->
    <div class="content-scroller">
      <!-- 商品类型 -->
      <tab :line-width="1" :active-color="activeColor" default-color="#999" v-model="currentIndex">
        <tab-item><i class="iconfont">&#xe60a;</i>次日达</tab-item>
        <tab-item><i class="iconfont">&#xe61f;</i>即时达</tab-item>
      </tab>
      <!-- 商品列表 -->
      <swiper height="100%" :show-dots="false" v-model="currentIndex">
        <swiper-item>
          <div class="flex-box goods-item" v-for="index in 10" :key="index">
            <img src="../assets/goods_img.jpg" width="30%" alt="">
            <div class="flex-col">
              <p>景田百岁山348ml</p>
              <p style="color:#999">次日价：¥1.5</p>
              <p :style="{color:activeColor}">即时价：¥2.0</p>
            </div>
            <input type="checkbox" class="input-checkbox" :style="{color:activeColor}" v-if="isEdit">
          </div>
          <!-- 删除按钮 -->
          <div class="remove-btn" v-if="isEdit" @click="remove">删除</div>
        </swiper-item>
        <swiper-item>
          <div class="flex-box goods-item" v-for="index in 10" :key="index">
            <img src="../assets/goods_img.jpg" width="30%" alt="">
            <div class="flex-col">
              <p>景田百岁山348ml</p>
              <p style="color:#999">次日价：¥1.5</p>
              <p :style="{color:activeColor}">即时价：¥2.0</p>
            </div>
            <input type="checkbox" class="input-checkbox" :style="{color:activeColor}" v-if="isEdit">
          </div>
          <!-- 删除按钮 -->
          <div class="remove-btn" v-if="isEdit" @click="remove">删除</div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
  import { XHeader, Tab, TabItem, Swiper, SwiperItem } from 'vux'

  export default {
    components: {
      XHeader,
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    data () {
      return {
        isEdit: false,
        currentIndex: 0
      }
    },
    computed: {
      activeColor () {
        return this.currentIndex ? '#07a4f6' : '#ff2323'
      },
      editText () {
        return this.isEdit ? '取消' : '编辑'
      }
    },
    methods: {
      remove () {
        this.$vux.alert.show({content: '删除所选商品成功'})
      }
    }
  }
</script>

<style lang="less" scoped>
  .collection-view .vux-header {
    background: linear-gradient(#f17458, #eb4e3b);

    [class^=vux-header-] {
      color: #fff;
    }

    .left-arrow:before {
      border-color: #fff;
      border-width: 2px 0 0 2px;
    }
  }

  .collection-view .content-scroller {
    height: calc(~'100% - 46px');
  }

  .collection-view .vux-tab-item .iconfont {
    font-size: inherit;
    margin-right: 5px;
  }

  .collection-view .vux-slider {
    height: calc(~'100% - 44px');

    .vux-swiper {
      overflow-y: scroll;
    }

    .vux-swiper::-webkit-scrollbar {
      display: none;
    }
  }

  .collection-view .goods-item {
    align-items: center;
    background-color: #fff;
    padding: 10px;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .flex-col {
      margin-left: 10px;
    }
  }

  .collection-view .remove-btn {
    padding: 10px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
    background-color: #ff2323;
    margin: 20px;
    border-radius: 5px;
  }
</style>
