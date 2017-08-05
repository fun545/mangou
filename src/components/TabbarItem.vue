<template>
  <router-link :to="link" class="tabbar-item" :active-class="activeClass">
    <template v-if="!transitionClass">
      <div class="item-badge" v-if="badge" v-text="badge"/>
      <div class="item-icon">
        <slot name="icon"></slot>
      </div>
      <div class="item-label">
        <slot name="label"></slot>
      </div>
    </template>
    <template v-if="transitionClass">
      <div :class="transitionClass">
        <div class="item-badge" v-if="badge" v-text="badge"/>
        <div class="item-icon">
          <slot name="icon"></slot>
        </div>
        <div class="item-label">
          <slot name="label"></slot>
        </div>
      </div>
    </template>
  </router-link>
</template>

<script>
  export default{
    props: {
      link: {
        type: String,
        required: true
      },
      activeClass: {
        type: String,
        default: 'item-active'
      },
      transitionClass: String,
      badge: Number
    }
  }
</script>

<style scoped lang="less">
  @import "../common/style/sum";
  .tabbar-item {
    flex-grow: 1;
    .pt(12);
    color: #957b70;
    text-align: center;
    position: relative;
  }

  .item-active {
    color: #f75439;
  }

  .item-badge {
    .pl(8);
    .pr(8);
    .h(32);
    box-sizing: border-box;
    border-radius: 100px;
    border: 1px solid #fff;
    color: #fff;
    background-color: #f75439;
    font: 12px/16px 'Microsoft Yahei';
    .fs(25);
    position: absolute;
    .t(4);
    left: 50%;
  }

  .item-icon {
    .lh(48);
  }

  .item-label {
    line-height: 20px;
    .lh(40);
  }
</style>
