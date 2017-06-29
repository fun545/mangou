<template>
  <div class="tabbar">
    <slot></slot>
  </div>
</template>

<style>
  .tabbar {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    position: fixed;
    z-index: 500;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .tabbar:before {
    content: '';
    height: 1px;
    background-color: #ddd;
    position: absolute;
    z-index: 500;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
