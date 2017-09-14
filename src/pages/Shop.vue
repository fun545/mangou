<template>
  <div class="shop-view" @touchmove.prevent>
    <!-- 页面头部 -->
    <m-header title="我要开店">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <div class="content" ref="content">
      <div>
        <!-- 电话 -->
        <div class="phone-flex">
          <a href="tel:13755038401" class="flex-box">
            <div class="iconfont">&#xe64d;</div>
            <div class="flex-col">
              <p>市场咨询：</p>
              <p class="font-mind">18684969907</p>
            </div>
          </a>
          <a href="tel:0731-85491868" class="flex-box">
            <div class="iconfont">&#xe64e;</div>
            <div class="flex-col">
              <p>客服咨询：</p>
              <p class="font-mind">400-0861937</p>
            </div>
          </a>
        </div>
        <!-- 页面内容 -->
        <div class="content-scroller">
          <div class="article">
            <div class="title">加入漫购</div>
            <div class="step-box">
              <div class="step-item">
                <div class="iconfont">&#xe650;</div>
                <div class="label">提交申请</div>
              </div>
              <div class="step-item">
                <div class="iconfont">&#xe651;</div>
                <div class="label">客服受理</div>
              </div>
              <div class="step-item">
                <div class="iconfont">&#xe7cc;</div>
                <div class="label">资料审核</div>
              </div>
              <div class="step-item">
                <div class="iconfont">&#xe652;</div>
                <div class="label">审核完成</div>
              </div>
            </div>
          </div>
          <div class="article data">
            <div class="title">填写资料</div>
            <div class="input-group">
              <div class="input-box">
                <span class="input-append">姓名：</span>
                <input type="text" maxlength="8" placeholder="请填写您的姓名" v-model="name">
              </div>
              <div class="input-box">
                <span class="input-append">电话：</span>
                <input type="tel" maxlength="11" placeholder="请填写您的电话" v-model="phone">
              </div>
              <div class="input-box">
                <span class="input-append">地址：</span>
                <input type="text" placeholder="请填写您的地址" v-model="address">
              </div>
              <div class="input-box">
                <div class="input-append">备注：</div>
                <textarea rows="4" placeholder="填写详细备注" v-model="msg"></textarea>
              </div>
              <div class="submit-btn" @click="submitFrom">提交</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  import BScroll from 'better-scroll'
  export default{
    components: {
      mHeader,
      BScroll
    },
    data () {
      return {
        name: '',
        phone: '',
        address: '',
        msg: ''
      }
    },
    created () {
      this.$nextTick(() => {
        this.contentScroll = new BScroll(this.$refs.content)
      })
    },
    methods: {
      toastTip (text) {
        this.$vux.toast.text(text, 'bottom')
      },
      submitFrom () {
        var flag = true
        if (this.address.length < 5 || this.address.length > 30) {
          this.toastTip('请输入合法的地址')
          flag = false
        }
        if (this.phone.length !== 11) {
          this.toastTip('请输入合法的手机号码')
          flag = false
        }
        if (this.name.length < 2 || this.name.length > 6) {
          this.toastTip('请输入合法的姓名')
          flag = false
        }
        if (flag) {
          this.post('/user/addMerchantsJoin', {
            token: localStorage.getItem('m-token'),
            joinPhone: this.phone,
            joinName: this.name,
            address: this.address,
            remark: this.msg
          }).then((res) => {
            if (res.data.code === 100) {
              this.$vux.alert.show({content: '提交申请成功！'})
            }
            if (res.data.code === 101) {
              this.$vux.toast.text(res.data.msg, 'top')
            }
            if (res.data.code === 102) {
              this.$vux.toast.text(res.data.msg, 'top')
              localStorage.removeItem('m-token')
            }
          })
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../common/style/sum";
  @import "../common/style/varlable";

  .shop-view {
    .fs(25);
    .content {
      position: absolute;
      .t(92);
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
    }
  }

  .shop-view .phone-flex {
    display: flex;
    border-bottom: 1px solid #ddd;
    background-color: #fff;

    .iconfont {
      .w(60);
      .h(60);
      .lh(60);
      text-align: center;
      box-sizing: border-box;
      color: @theme-color;
      .fs(40);
      border-radius: 100px;
      border: 1px solid @theme-color;
    }

    .font-mind {
      color: #999;
      .fs(25);
    }

    .flex-box {
      .pt(20);
      .pb(20);
      .pl(58);
      .pr(20);
      border-top: 1px solid #ddd;
      color: #444;
      align-items: center;
      flex-grow: 1;
      border-left: 1px solid #ddd;
      .fs(27);
    }

    .flex-box:first-child {
      border-left: none;
    }
    .flex-box:last-child {
      .iconfont {
        .fs(46);
      }
    }
    .flex-col {
      margin-left: 10px;
    }
  }

  .shop-view .content-scroller {
    .article {
      .pt(20);
      .pb(20);
      .pl(30);
      .pr(30);
      background-color: #fff;
      .mt(20);
      &.data {
        .input-group {
          .input-box {
            .input-append {
              .fs(30);
            }
            input {
              .fs(29);
            }
            textarea {
              .fs(29);
            }
          }
        }
      }
    }

    .title {
      .pl(40);
      .lh(40);
      position: relative;
    }

    .title:before {
      content: '';
      .w(20);
      .h(20);
      background-color: @theme-color;
      position: absolute;
      .t(10);
      left: 0;
      transform: rotate(45deg);
    }
  }

  .shop-view .step-box {
    .pt(30);
    .pb(10);
    display: flex;
    justify-content: center;

    .step-item {
      .ml(40);
      text-align: center;
      position: relative;
    }

    .step-item:before {
      content: '\e672';
      font: bold 14px/1px 'iconfont';
      .fs(28);
      color: @theme-color;
      transform: translate(-100%, -50%);
      position: absolute;
      top: 35%;
      .l(-6);
    }

    .step-item:first-child {
      margin-left: 0;
    }

    .step-item:first-child:before {
      display: none;
    }

    .iconfont {
      display: table;
      margin: 0 auto;
      .w(80);
      .h(80);
      .lh(80);
      background-color: @theme-color;
      .fs(44);
      text-align: center;
      color: #fff;
      border-radius: 100px;
    }

    .label {
      color: #666;
      .lh(44);
      .fs(25);
    }
  }

  .shop-view .input-group {
    padding: 10px;
    .pt(20);
    .pb(20);
    .pl(20);
    .pr(20);
    .fs(32);
  }

  .shop-view .input-box {
    .mb(10);
    position: relative;

    &:last-child {
      margin-bottom: 0;
    }

    .input-append {
      .fs(25);
      color: #666;
      .lh(40);
      position: absolute;
      .t(20);
      .l(20);
    }

    input {
      box-sizing: border-box;
      width: 100%;
      .lh(40);
      padding: 10px 10px 10px 50px;
      .pt(20);
      .pr(20);
      .pb(20);
      .pl(100);
      .fs(25);
      border: none;
      border-radius: 5px;
      background-color: #f7f7f7;
      outline: none;
      -webkit-appearance: none;
    }

    textarea {
      display: table;
      box-sizing: border-box;
      width: 100%;
      .lh(40);
      .pt(20);
      .pr(20);
      .pb(20);
      .pl(100);
      .fs(25);
      border: none;
      border-radius: 5px;
      background-color: #f7f7f7;
      resize: none;
      -webkit-appearance: none;
      outline: none;
    }
  }

  .shop-view .submit-btn {
    .pt(20);
    .pr(20);
    .pb(20);
    .pl(20);
    .lh(40);
    text-align: center;
    border-radius: 5px;
    color: #fff;
    background-color: @theme-color;
  }
</style>
