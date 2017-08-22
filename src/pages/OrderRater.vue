<template>
  <div class="order-rater-view">
    <!-- 页面头部 -->
    <m-header title="订单评分">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <div class="content">
      <!-- 订单编号 -->
      <div class="number">{{orderDetail.orderNum}}</div>
      <!-- 订单商品图片 -->
      <div class="img-box">
        <div class="scroller">
          <div class="pic" v-for="(item,index) in orderDetail.goodsList" :key="index">
            <img v-lazy="item.goodsImgUrl" alt="">
          </div>
        </div>
      </div>
      <!-- 分界线 -->
      <div class="line-bar">请给我们打分</div>
      <!-- 评论星星 -->
      <div class="text-center">
        <rater active-color="#eb900e" :margin="5" v-model="rater"></rater>
      </div>
      <!-- 评价标签 -->
      <div class="rater-tabs-box">
        <checker default-item-class="default-checker" selected-item-class="selected-checker" v-model="checker"
                 type="checkbox" @on-change="raterSelect">
          <checker-item :value="item" v-for="(item,index) in keyWords" :key="index">{{item.keyword}}</checker-item>
        </checker>
      </div>
      <!-- 评论留言 -->
      <div class="text-msg">
        <textarea rows="3" placeholder="请输入评论内容" v-model="raterText" max="300"/>
      </div>
      <!-- 提交评价按钮 -->
      <div class="submit-btn" @click="submit">提交评价</div>
    </div>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  import { XHeader, Rater, Checker, CheckerItem } from 'vux'

  export default {
    name: 'orderRater',
    components: {
      XHeader,
      Rater,
      Checker,
      CheckerItem,
      mHeader
    },
    data () {
      return {
        rater: 0,
        checker: 0,
        keyWords: '',
        raterText: '',
        reterList: [],
        orderDetail: ''
      }
    },
    created () {
      this.orderDetail = this.$route.query
      this.post('/goods/searchKeyWord', {statusType: 4}).then((res) => {
        if (res.data.code === 100) {
          this.keyWords = res.data.KeyWords
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
    methods: {
      submit () {
//         拼接keyWordId
        var keywordsId = []
        this.reterList.forEach((item, index) => {
          keywordsId.push(item.keyId)
        })
        keywordsId = keywordsId.join(',')
        this.post('/orders/orderEvaluate', {
          token: localStorage.getItem('m-token'),
          orderNum: this.$route.query.orderNum,
          evaluateContext: this.raterText,
          keyWordId: keywordsId,
          businessSrvicePoints: this.rater,
          shopType: this.$route.query.shopType
        }).then((res) => {
          this.$vux.alert.show({
            content: '评论成功'
          })
          this.$router.go(-1)
        })
      },
      // 选择的评论标签
      raterSelect (val) {
        this.reterList = val
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .cp-header {
    color: @font-color-m;
    position: inherit;
    .back {
      color: @font-color-m;
    }
  }

  .content {
  }

  .order-rater-view {
    background-color: #fff;
  }

  .order-rater-view .number {
    text-align: center;
    .h(60);
    .lh(20);
    color: #666;
    .pt(20);
    .pb(20);
    box-sizing: border-box;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }

  .order-rater-view .img-box {
    .pt(20);
    .pb(20);
    border-bottom: 1px solid #eee;

    .scroller {
      .pic {
        .w(110);
        .h(110);
        img {
          width: 100%;
          height: 100%;
        }
      }
      display: flex;
      align-items: center;
      overflow-y: scroll;
    }
  }

  .order-rater-view .line-bar {
    display: table;
    margin: 20px auto;
    .mt(40);
    .mb(40);
    color: #999;
    .lh(40);
    position: relative;

    &:before {
      content: '';
      .w(160);
      height: 1px;
      background-color: #999;
      position: absolute;
      top: 50%;
      .l(-20);
      transform: translate(-100%, -50%);
    }

    &:after {
      content: '';
      .w(160);
      height: 1px;
      background-color: #999;
      position: absolute;
      top: 50%;
      .r(-20);
      transform: translate(100%, -50%);
    }
  }

  .order-rater-view .rater-tabs-box {
    margin: 10px auto;
    .mt(20);
    .mb(20);
    .pl(10);
    .pr(10);
    .pb(10);
    .pt(10);
    text-align: center;

    .default-checker {
      .pt(10);
      .pb(10);
      .pl(24);
      .pr(24);
      line-height: 1;
      color: #999;
      .fs(25);
      border-radius: 100px;
      border: 1px solid #999;
      .ml(10);
      .mr(10);
      .mb(10);
      .mt(10);
    }

    .selected-checker {
      border-color: #f95d44;
      color: #fff;
      background-color: #f95d44;
    }
  }

  .order-rater-view .text-msg {
    .pl(30);
    .pr(30);
    textarea {
      display: block;
      width: 100%;
      box-sizing: border-box;
      .pt(10);
      .pb(10);
      .pl(20);
      .pr(20);
      line-height: 1.5;
      background-color: #f1f1f1;
      border-style: none;
      outline: none;
      -webkit-appearance: none;
      border-radius: 5px;
      resize: none;
      .fs(25);
    }
  }

  .order-rater-view .submit-btn {
    box-sizing: border-box;
    width: 90%;
    margin: 0 auto;
    .h(80);
    .lh(80);
    .mt(60);
    .mb(60);
    text-align: center;
    color: #fff;
    background-color: #ff5500;
    border-radius: 5px;
    .fs(30);
  }
</style>
