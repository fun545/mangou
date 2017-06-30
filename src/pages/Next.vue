<template>
  <div class="next">
    <div class="header">
      <!-- 搜索框 -->
      <div class="search-box">
        <next-search></next-search>
        <instruction :isDialog="isDialog"></instruction>
      </div>
      <!-- 弹窗内容 -->
    </div>
    <div class="content" ref="test">
      <div class="menu-wrap f-l" ref="menuWrapper">
        <side-bar>
          <side-item ref="sideItem" v-for="(item,index) in AllFirstClassify" :key="index" :classifyId="item.classifyId"
                     @click.native="memuChange(item.classifyId,index)"
                     :class="{'active':index===ind}">
            <span v-html="item.classifyName"></span>
          </side-item>
        </side-bar>
      </div>
      <div class="list-wrap f-r" ref="listWrap">
        <div>
          <div class="list-item" v-for="(firstClass,index) in AllFirstClassify" :key="index">
            <div class="title" v-for="">
              <i class="circle"></i>
              <span>{{firstClass.classifyName}}</span>
              <i class="iconfont icon">&#xe601;</i>
            </div>
            <div class="list clearfix">
              <div class="item f-l" v-for="(item,index) in firstClass.classifys" :key="index">
                <img :src="item.classifyImgUrl" alt="" class="pic">
                <p class="name t-c">{{item.classifyName}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {XDialog} from 'vux'
  import instruction from '../components/instruction.vue'
  import nextSearch from '../components/nextSearch.vue'
  import SideBar from '../components/SideBar'
  import SideItem from '../components/SideItem'
  export default {
    components: {XDialog, instruction, nextSearch, SideBar, SideItem, BScroll},
    data () {
      return {
        isDialog: false,
        search: '',
        typeIndex: 0,
        ind: '',
        AllFirstClassify: [],
        AllSecondClassify: []
      }
    },
    created () {
      var _this = this
      this.post('/classify/getClassifyAll', {}).then((res) => {
        this.AllFirstClassify = res.data.mapClassify
        console.log(_this.AllFirstClassify)
        this.$nextTick(() => {
          console.log(this.$refs.menuWrapper)
          this._initScroll()
        })
      })
    },
    methods: {
      searchText () {
        if (!this.search) {
          this.$vux.alert.show({content: '请输入搜索内容'})
          return
        }
        this.$router.push({path: '/searchText', query: {search: this.search}})
      },
      memuChange (id, index) {
//        this.getGoods(id)
        this.ind = index
      },
      _initScroll () {
        this.menuSroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.listSroll = new BScroll(this.$refs.listWrap, {
          click: true,
          probeType: 3
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .next {
    height: 100%;
    .header {
      box-sizing: border-box;
      .h(100);
      background: @theme-color;
      .pl(22);
      .pt(20);
      .search-box {
        display: flex;
        position: relative;
        padding: 5px;
        .instruction {
          position: absolute;
          .r(30);
        }
      }
    }
    .content {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      .t(100);
      overflow: hidden;
      bottom: 50px;
      .menu-wrap {
        height: 100%;
        .w(172);
      }
      .list-wrap {
        height: 100%;
        background: #fff;
        .w(578);
        .title {
          .h(54);
          .lh(54);
          .circle {
            vertical-align: middle;
            border-radius: 50%;
            display: inline-block;
            .w(10);
            .h(10);
            background: @theme-color;
            .ml(39);
          }
          .icon {
            color: #a6a6a6;
            .fs(26);
          }
          span {
            .fs(30);
            color: @next-title-color;
            .ml(16);
            .mr(15);
          }
        }
        .list {
          box-sizing: border-box;
          width: 100%;
          .pl(21);
          .pr(21);

          .item {
            width: 33.333%;
            .h(294);
            .pic {
              width: 100%;
              .h(230);
              display: block;
              border: none;
            }
            .name {
              .lh(44);
              .fs(30);
            }
          }
        }
      }
    }
  }
</style>
