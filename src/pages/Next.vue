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
    <div class="content">
      <div class="menu-wrap" rel="menuWrapper">
        <side-bar>
          <side-item ref="sideItem" v-for="(item,index) in sideList" :key="index" :classifyId="item.classifyId"
                     @click.native="memuChange(item.classifyId,index)"
                     :class="{'active':index===ind}">
            <span v-html="item.classifyName"></span>
          </side-item>
        </side-bar>
      </div>
      <div class="list-wrap"></div>
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
        secondClassifyList: '',
        ind: '',
        sideList: ''
      }
    },
    created () {
      this.post('/classify/firstClassifyList_new', {storeId: 1, villageId: 1, shopType: 1}).then((res) => {
        if (res.data.code === 100) {
          this.sideList = res.data.firstClassifyList
        }
      })
      this.post('/classify/secondClassifyList', {}).then((res) => {
        console.log(res)
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
      }
    }
  }
</script>

<style lang="less">
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .next {
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
      .menu-wrap {
        .w(172);
      }
    }
  }
</style>
