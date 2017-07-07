<template>
  <div class="home-view" ref="homeView">
    <div class="wrapper">
      <div class="location-search-box">
        <router-link to="/location" class="location">{{villageName}}</router-link>
        <router-link to="/search" class="search"><input type="search" placeholder="搜索商品" readonly></router-link>
      </div>
      <!-- 轮播 -->
      <swiper :aspect-ratio="320/750" dots-position="center" auto loop class="banner">
        <swiper-item class="swiper-img" v-for="(item, index) in swiperList" :key="index">
          <img :src="item">
        </swiper-item>
      </swiper>
      <!-- 次日达/即时达 -->
      <div class="link-box">
        <router-link to="next"><img src="../assets/cirida.png" width="100%" alt=""></router-link>
        <router-link to="this"><img src="../assets/jishisong.png" width="100%" alt=""></router-link>
      </div>
      <!-- 预售团购 -->
      <div class="group-buy">
        <home-title :title="mapTitleTips[0].name">
          <img class="icon iconfont" slot="icon" :src="mapTitleTips[0].other">
        </home-title>
        <div class="scroller-box content">
          <router-link to="/goods_detail" class="scroller-item" v-for="(item,index) in sourceGoods" :key="index">
            <img :src="item.img" width="100%" alt="">
            <div style="color:#f95d43">次日价：¥2.3</div>
            <div style="color:#999999">即时价：¥6.3</div>
            <div class="cart-btn"><i class="iconfont">&#xe613;</i>购物车</div>
          </router-link>
        </div>
      </div>
      <!-- 优选精选 -->
      <div class="fine"><i class="iconfont">&#xe614;</i>优选精选</div>
      <div class="fine-box">
        <router-link to="/goods_detail" class="fine-item" v-for="(item,index) in sourceGoods" :key="index">
          <img :src="item.img" width="30%" alt="">
          <div class="col">
            <p>农夫茶12元/瓶促销</p>
            <p class="color-f95d43">次日价:1.5元</p>
            <p>即时价:1.5元</p>
            <i class="iconfont">&#xe613;</i>
          </div>
        </router-link>
      </div>
      <!-- 广告轮播图 -->
      <swiper :list="adverList" :aspect-ratio="120/750" :show-dots="false" :show-desc-mask="false" auto loop></swiper>
      <!-- 热门畅销 -->
      <div class="hot"><i class="iconfont">&#xe612;</i>热门畅销</div>
      <div class="hot-box">
        <router-link to="/goods_detail" class="hot-item" v-for="(item,index) in sourceGoods" :key="index">
          <img :src="item.img" width="100%" alt="">
          <p>百草味和田红枣百草味和田红枣百草味和田红枣</p>
          <p>次日价:¥26.00</p>
          <p>即时价:¥36.00</p>
          <i class="iconfont">&#xe613;</i>
        </router-link>
      </div>
      <!-- 新品上架 -->
      <div class="new"><i class="iconfont">&#xe615;</i>新品上架</div>
      <div class="new-box">
        <router-link to="/goods_detail" class="new-item" v-for="item in sourceGoods" :key="item">
          <img :src="item.img" width="100%" alt="">
          <p>气凋盒装卤鸭脖320g武汉特产食品零食小吃气凋盒装卤鸭脖320g武汉特产食品零食小吃</p>
          <p>次日价:¥26.00</p>
          <p>即时价:¥36.00</p>
          <i class="iconfont">&#xe613;</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { Swiper, SwiperItem } from 'vux'
  import homeTitle from '../components/homeTitle'
  export default {
    components: {
      Swiper,
      SwiperItem,
      homeTitle
    },
    data () {
      return {
        villageName: '',
        swiperList: [],
        cityId: localStorage.getItem('m-cityId'),
        areaId: localStorage.getItem('m-areaId'),
        villageId: localStorage.getItem('m-villageId'),
        token: localStorage.getItem('m-token'),
        mapTitleTips: [],
        ystgWords: []
      }
    },
    created () {
      if (!localStorage.getItem('m-villageName')) {
        this.$router.push({path: '/locatio'})
      } else {
        this.villageName = localStorage.getItem('m-villageName')
      }
      /* 轮播图数据 */
      this.post('/first/getFirst', {
        cityId: this.cityId,
        areaId: this.areaId,
        villageId: this.villageId,
        token: this.token,
        source: 1
      }).then((res) => {
        if (res.data.code === 100) {
          console.log(res.data)
          const imgList = res.data.firstInfo.imgList
          for (let i = 0; i < imgList.length; i++) {
            console.log(imgList[i].imageUrl)
            this.swiperList.push(imgList[i].imageUrl)
          }
        }
      })
      /* 轮播图数据 */
      this.post('/first/getFirstGoods', {storeId: 1, villageId: this.villageId}).then((res) => {
        if (res.data.code === 100) {
          console.log(res.data)
          this.mapTitleTips = res.data.goodsList.mapTitleTips
          this.ystgWords = res.data.goodsList.ystgWords
        }
      })
    },
    methods: {},
    computed: {
      sourceGoods () {
        return [
          {img: './static/goods_img.jpg'},
          {img: './static/goods_img.jpg'},
          {img: './static/goods_img.jpg'},
          {img: './static/goods_img.jpg'},
          {img: './static/goods_img.jpg'},
          {img: './static/goods_img.jpg'}
        ]
      },
      adverList () {
        return [
          {img: './static/adver.png'},
          {img: './static/adver.png'}
        ]
      }
    }
  }
</script>

<style lang="less">
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .home-view .location-search-box {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 500;
    top: 0;
    right: 0;
    left: 0;

    .location {
      width: calc(~'(100% - 10px)/2');
      margin-right: 5px;
      padding: 0 15px;
      text-align: center;
      box-sizing: border-box;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow-x: hidden;
      color: #fff;
      font-size: 12px;
      position: relative;
    }

    .location:before {
      content: '\e610';
      font: 12px/1 'iconfont';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-45%);
    }

    .location:after {
      content: '';
      width: 5px;
      height: 5px;
      border-width: 0 1px 1px 0;
      border-style: solid;
      border-color: #fff;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(-20%, -80%) rotate(45deg);
    }

    .search {
      margin-left: 5px;
      padding: 5px 10px;
      flex-grow: 1;
      height: 30px;
      box-sizing: border-box;
      line-height: 20px;
      border-radius: 100px;
      background-color: rgba(255, 255, 255, .3);
      position: relative;
    }

    .search:before {
      content: '\e639';
      color: #fff;
      font: 12px/1 'iconfont';
      position: absolute;
      top: 10px;
      left: 15px;
    }

    .search input {
      padding-left: 20px;
      width: 100%;
      line-height: 20px;
      background-color: transparent;
      border: none;
      -webkit-appearance: none;
      outline: none;
    }

    .search input::placeholder {
      color: #fff;
    }
  }

  .banner {
    img {
      width: 100%;
      height: 100%;
    }
  }

  .home-view .scroller-box {
    overflow-x: scroll;
    display: flex;
    align-items: center;
    position: relative;

    .scroller-item {
      width: calc(~'100vw/3.8');
      padding-bottom: 10px;
      border: 1px solid #ddd;
      border-left: none;
      background-color: #fff;
      font: 12px/1.5 'Microsoft Yahei';
      display: table;
      position: relative;
    }

    .scroller-item:last-child {
      border-right: none;
    }

    .iconfont {
      font-size: inherit;
      margin-right: 3px;
    }

    .cart-btn {
      display: table;
      margin: 5px auto 0px auto;
      padding: 0 10px;
      color: #fff;
      background-color: #f95d43;
      border-radius: 100px;
    }
  }

  .home-view {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: scroll;
    .wrapper {

    }
    .link-box {
      display: flex;
      .pt(5);
      .pb(5);
      a {
        margin: 5px;
      }
    }

    .source {
      box-sizing: border-box;
      height: 40px;
      padding: 10px;
      line-height: 20px;
      color: #ee524d;
      background-color: #ffffff;
      font-style: italic;

      .iconfont {
        margin-right: 5px;
      }
    }

    .fine {
      text-align: center;
      color: #ff01a2;
      background-color: #ffffff;
      margin-top: 10px;
      line-height: 20px;
      padding: 10px;
      height: 40px;
      box-sizing: border-box;

      .iconfont {
        color: #ff01a2;
        margin-right: 5px;
      }
    }

    .fine-box {
      display: flex;
      flex-wrap: wrap;
      border-top: 1px solid #eeeeee;
      margin-bottom: 10px;

      .fine-item {
        width: calc(~'100vw / 2');
        display: flex;
        align-items: center;
        background-color: #ffffff;
        box-sizing: border-box;
        font-size: 12px;
        border-bottom: 1px solid #eeeeee;
        border-right: 1px solid #eeeeee;

        .col {
          flex-grow: 1;
          margin: 5px;
          position: relative;

          p {
            line-height: normal;
          }

          p:nth-child(1) {
            color: #333333;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }

          p:nth-child(2) {
            color: #fc5050;
          }

          p:nth-child(3) {
            color: #aaaaaa;
          }

          .iconfont {
            line-height: normal;
            color: #fc5050;
            font-size: 20px;
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
    }

    .hot {
      margin-top: 10px;
      line-height: 20px;
      color: #ff3d01;
      background-color: #ffffff;
      text-align: center;
      padding: 10px;
      height: 40px;
      box-sizing: border-box;

      .iconfont {
        margin-right: 5px;
        color: #ff3d01;
      }
    }

    .hot-box {
      display: flex;
      flex-wrap: wrap;
      border-top: 1px solid #eeeeee;

      .hot-item {
        width: calc(~'100vw / 3');
        box-sizing: border-box;
        padding: 5px;
        background-color: #ffffff;
        text-align: center;
        border-right: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;

        p:nth-child(2) {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333333;
          font-size: 13px;
          line-height: normal;
          margin: 5px 0;
        }

        p:nth-child(3) {
          font-size: 12px;
          color: #fc5050;
          line-height: normal;
        }

        p:nth-child(4) {
          font-size: 12px;
          color: #aaaaaa;
          line-height: normal;
        }

        .iconfont {
          color: #fc5050;
          font-size: 20px;
        }
      }
    }

    .new {
      color: #ff8401;
      text-align: center;
      margin: 10px 0;
      line-height: normal;

      .iconfont {
        margin-right: 5px;
      }
    }

    .new-box {
      display: flex;
      flex-wrap: wrap;
      padding: 0 5px 5px 5px;
      margin-top: -5px;

      .new-item {
        box-sizing: border-box;
        width: calc(~'100vw / 2 - 15px');
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow: #dddddd 2px 2px 2px;
        margin: 5px;
        overflow: hidden;
        position: relative;

        p:nth-child(2) {
          font-size: 13px;
          margin: 5px;
          line-height: normal;
          color: #444444;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        p:nth-child(3) {
          line-height: normal;
          color: #fc5050;
          font-size: 12px;
          border-top: 1px dashed #eeeeee;
          padding-top: 5px;
          padding-left: 5px;
        }

        p:nth-child(4) {
          line-height: normal;
          color: #aaaaaa;
          font-size: 12px;
          padding-bottom: 5px;
          padding-left: 5px;
        }

        .iconfont {
          font-size: 22px;
          line-height: normal;
          color: #fc5050;
          position: absolute;
          right: 10px;
          bottom: 10px;
        }
      }
    }
  }
</style>
