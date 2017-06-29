<template>
  <div>
    <x-header :left-options="{backText:''}" class="location-h noScroll">定位</x-header>
    <div class="manualLocation-view">
      <div class="manualLocation-content">
        <div class="search-box clearfix">
          <div class="f-l search-ip-wrap">
            <i class="iconfont">&#xe639;</i>
            <input type="text" class="search-ip" placeholder="输入小区名" v-model="searchWord">
          </div>
          <div class="f-l search-bt t-c" @click="search(searchWord)">搜索</div>
        </div>
        <div class="location-city-left">
          <div class="location-city">
            <div class="title">
              <i class="iconfont t-icon">&#xe610;</i>
              <span class="text">定位城市</span>
            </div>
            <div class="city t-c">
              长沙
            </div>
          </div>
          <div class="location-village">
            <div class="title">
              <i class="iconfont t-icon">&#xe63a;</i>
              <span class="text">定位小区</span>
            </div>
            <div class="village-list">
              <div class="letter">
                A
              </div>
              <div class="item" v-for="(item,index) in villageList">
                {{item.villageName}}
              </div>
            </div>
          </div>
        </div>
        <div class="location-city-right t-c">
          <p>A</p>
          <p>B</p>
          <p>C</p>
          <p>D</p>
          <p>E</p>
          <p>D</p>
          <p>A</p>
          <p>B</p>
          <p>C</p>
          <p>D</p>
          <p>E</p>
          <p>D</p>
          <p>A</p>
          <p>B</p>
          <p>C</p>
          <p>D</p>
          <p>E</p>
          <p>D</p>
          <p>A</p>
          <p>B</p>
          <p>C</p>
          <p>D</p>
          <p>E</p>
          <p>D</p>
          <p>D</p>
          <p>E</p>
          <p>D</p>
        </div>
      </div>
    </div>
    <div class="location-footer t-c noScroll">
      我要开店
    </div>
  </div>

</template>

<script>
  import { XHeader } from 'vux'
  export default {
    components: {XHeader},
    data () {
      return {
        villageList: '',
        searchWord: ''
      }
    },
    created () {
      this.post('/village/villageList', {
        cityId: 1,
        areaId: 1,
        source: 2
      }).then((res) => {
        if (res.data.code === 100) {
          this.villageList = res.data.villageList
//          console.log(res.data)
        }
      })
    },
    methods: {
      search (word) {
        this.post('/village/villageList', {
          cityId: 1,
          areaId: 1,
          source: 2,
          keyName: word
        }).then((res) => {
          console.log(res.data)
          if (res.code === 100) {
            console.log(res.data)
            this.villageList = res.data.villageList
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .manualLocation-view {
    background: @bg-color;
    overflow: hidden;
    .manualLocation-content {
      .search-box {
        width: 100%;
        .pl(20);
        .pt(25);
        .search-ip-wrap {
          border: 1px solid @input-border;
          border-radius: 5px;
          position: relative;
          .iconfont {
            position: absolute;
            color: @placehold-color;
            .l(26);
            .t(26);
          }
          .search-ip {
            box-sizing: border-box;
            .w(547);
            .h(76);
            .lh(76);
            .fs(30);
            border-radius: 5px;
            outline: none;
            border: none;
            text-indent: 35px;
            color: @font-color-m;
          }
        }
        .search-bt {
          border: 1px solid @input-border;
          box-sizing: border-box;
          .w(142);
          .h(78);
          .lh(78);
          .ml(20);
          color: @font-color-input;
          border-radius: 4px;
        }
      }
      .location-city-right {
        .w(44);
        background: #fff;
        position: fixed;
        .t(240);
        right: 0;
        color: @font-color-input;
        p {
          .h(40);
          .fs(28);
        }
      }
      .title {
        color: @font-color-input;
        .mt(10);
        .ml(20);
        .t-icon {
          color: @theme-color;
        }
      }
      .location-city {
        .city {
          .mt(25);
          background: #fff;
          .ml(20);
        }
      }
      .location-village {
        .title {
          .mt(20);
          .mb(10);
        }
        .village-list {
          .letter {
            .pl(44);
            .h(54);
            .lh(54);
            background: @bg-color;
            color: @font-color-input;
          }
          .item {
            .h(96);
            .lh(96);
            .pl(44);
            .fs(30);
            background: #fff;
            color: @font-color-input;
            border-bottom: 1px solid #e0e0e0;
          }
        }
      }
    }
  }


</style>
