<template>
  <div class="join-view">
    <!-- 页面头部 -->
    <m-header title="加入我们">
      <span class="back iconfont" @click="$router.back(-1)" slot="icon">&#xe600;</span>
    </m-header>
    <!-- 页面内容 -->
    <scroll class="content-scroller">
      <div>
        <div v-html="about"></div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  export default {
    components: {
      mHeader
    },
    data () {
      return {
        about: ''
      }
    },
    created () {
      this.post('/basic/getAbout', {
        token: localStorage.getItem('m-token'),
        type: 2
      }).then((res) => {
        if (res.data.code === 100) {
          this.about = res.data.content
        }
        if (res.data.code === 101) {
          this.$vux.toast.text(res.data.msg, 'middle')
        }
        if (res.data.code === 102) {
          this.$vux.toast.text(res.data.msg, 'middle')
          localStorage.removeItem('m-token')
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/style/sum";

  .join-view {
    .content-scroller {
      position: absolute;
      .t(92);
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
    }
  }
</style>
