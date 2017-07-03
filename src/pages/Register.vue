<template>
  <div class="register-view">
   <div class="register-header">
     <span class="back iconfont" @click="goBack()">&#xe600;</span>

   </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  export default {
    components: {XHeader}
  }
</script>

<style lang="less">
  @import "../common/style/varlable";
  @import "../common/style/sum";
.register-view{
  .register-header{
    .h(92);
    .lh(92);
    background: #fff;
    color: #403f3f;
    box-sizing: border-box;
    .pl(30);
    .fs(40);
    .icon{
      .fs(40);
      font-weight: 700;
    }
  }
}
</style>
