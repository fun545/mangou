<template>
  <div class="next-second-list1">
    <div class="header">
      <!-- 搜索框 -->
      <div class="search-box">
        <next-search></next-search>
        <instruction></instruction>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import instruction from '../components/instruction.vue'
  import nextSearch from '../components/nextSearch.vue'
  export default {
    components: {instruction, nextSearch, BScroll}
  }
</script>

<style lang="less">
  @import "../common/style/varlable";
  @import "../common/style/sum";

  .next-second-list1 {
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
  }
</style>
