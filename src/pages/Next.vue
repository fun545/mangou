<template>
  <div class="next" @touchmove.prevent>
    <div class="header">
      <!-- 搜索框 -->
      <div class="search-box">
        <next-search v-if="hasNextShop" :nextFlag="true"></next-search>
        <instruction></instruction>
      </div>
      <!-- 弹窗内容 -->
    </div>
    <div class="content" ref="test">
      <div class="menu-wrap f-l" ref="menuWrapper">
        <side-bar>
          <side-item ref="sideItem" v-for="(item,index) in AllFirstClassify" :key="index"
                     :classifyId="item.classifyId"
                     @click.native="memuChange(index)" :class="{'active':index===currentIndex}">
            <span v-html="item.classifyName"></span>
          </side-item>
        </side-bar>
      </div>
      <div class="list-wrap f-r" ref="listWrap">
        <div>
          <div class="list-item" v-for="(firstClass,index) in AllFirstClassify" :key="index">
            <div class="title">
              <i class="circle"></i>
              <span>{{firstClass.classifyName}}</span>
              <i class="iconfont icon">&#xe601;</i>
            </div>
            <div class="list clearfix">
              <div class="item f-l" v-for="(item,index) in firstClass.classifys" :key="index"
                   @click="goSecondList(item.classifyId)">
                <div class="pic">
                  <img v-lazy="item.classifyImgUrl" alt="" width="100%" height="100%">
                </div>
                <p class="name t-c">{{item.classifyName}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <loading :loadingFlag="loadingFlag"></loading>
    </div>
    <m-footer></m-footer>
    <to-top :scrollObj="listSroll" v-if="scrollY>=800"></to-top>
    <no-next-shop v-if="!hasNextShop"></no-next-shop>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import mFooter from '../components/footer'
  import { XDialog } from 'vux'
  import instruction from '../components/instruction.vue'
  import nextSearch from '../components/nextSearch.vue'
  import SideBar from '../components/SideBar'
  import SideItem from '../components/SideItem'
  import loading from '../components/loading'
  import toTop from '../components/toTop'
  import noNextShop from '../components/noNextShop.vue'
  export default {
    name: 'next',
    components: {
      mFooter,
      XDialog,
      instruction,
      nextSearch,
      SideBar,
      SideItem,
      BScroll,
      loading,
      toTop,
      noNextShop
    },
    data () {
      return {
        token: localStorage.getItem('m-token'),
        search: '',
        typeIndex: 0,
        currentIndex: 0,
        AllFirstClassify: [],
        AllSecondClassify: [],
        listHeight: [],
        scrollY: 0,
        lists: {},
        isLoad: true,
        menuSroll: {},
        listSroll: {},
        loadingFlag: true
      }
    },
    created () {
      if (!this.hasNextShop) {
        this.loadingFlag = false
        return
      }
      this.post('/classify/getClassifyAll', {}).then((res) => {
        if (this.isLoad && (res.data.code === 100)) {
          this.AllFirstClassify = res.data.mapClassify
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
            this.isLoad = false
            this.loadingFlag = false
          })
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
    watch: {
      '$route' (to, from) {
        this.$nextTick(() => {
          setTimeout(() => {
            if (typeof this.listSroll.refresh === 'function') {
              this.listSroll.refresh()
            }
            if (typeof this.menuSroll.refresh === 'function') {
              this.menuSroll.refresh()
            }
          }, 700)
        })
      },
      scrollY (to, from) {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY < height2 && this.scrollY >= height1)) {
            this.currentIndex = i
            return
          }
        }
        this.currentIndex = 0
      }
    },
    computed: {
      hasNextShop () {
        return this.$store.state.hasNextShop
      }
    },
    methods: {
      goSecondList (id) {
        this.$router.push({
          path: '/list1',
          query: {secondId: id}
        })
//        this.$router.go(0)
      },
      memuChange (index) {
        this.ind = index
        this.listSroll.scrollToElement(this.lists[index], 200)
        setTimeout(() => {
          this.currentIndex = index
        }, 230)
      },
      _initScroll () {
        this.menuSroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.listSroll = new BScroll(this.$refs.listWrap, {
          click: true,
          probeType: 3
        })
        this.listSroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        this.lists = this.$refs.listWrap.getElementsByClassName('list-item')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < this.lists.length; i++) {
          height += this.lists[i].offsetHeight
          this.listHeight.push(height)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .next {
    height: 100%;
    .header {
      box-sizing: border-box;
      .h(100);
      background: @theme-color;
      .pl(22);
      .pt(10);
      .search-box {
        display: flex;
        position: relative;
        padding: 5px;
        .instruction {
          position: absolute;
          .r(23);
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
        .side-bar .side-item.active {
          color: @theme-color;
          border-left: 3px solid @theme-color;
        }
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
              .h(178);
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
