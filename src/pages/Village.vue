<template>
  <div class="village-view">
    <ul class="village">
      <li v-for="item in villageList">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    computed: {
      villageList () {
        return ['湘江世纪城', '珠江花城', '金帆大厦']
      }
    }
  }
</script>

<style lang="less">
  .village-view .village {
    background-color: #ffffff;

    li {
      padding: 10px;
      color: #444;
      line-height: 20px;
      border-bottom: 1px solid #eeeeee;
    }
  }
</style>
