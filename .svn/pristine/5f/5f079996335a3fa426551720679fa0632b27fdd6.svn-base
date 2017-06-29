<template>
  <div id="Star">
    <div class="go-link-time">{{goLinkTime}}S后跳转</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        goLinkTime: 3
      }
    },
    mounted () {
      let interVal = setInterval(() => {
        if (!--this.goLinkTime) {
          clearInterval(interVal)
          this.$router.replace('/tabbar/home')
        }
      }, 1000)
    }
  }
</script>

<style lang="less">
  #Star {
    min-height: 100vh;
    background: url("../assets/start_img.png") #f95d43 no-repeat center/contain;
    position: relative;

    .go-link-time {
      padding: 5px 14px;
      width: 85px - 14px * 2;
      color: #ffffff;
      text-align: center;
      border-radius: 30px/2;
      line-height: 20px;
      font-size: 12px;
      font-weight: normal;
      background-color: rgba(0, 0, 0, .4);
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
</style>
