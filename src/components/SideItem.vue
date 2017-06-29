<template>
  <div class="side-item" :class="{active:isActive}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isActive: false,
        currentIndex: -1
      }
    },
    props: {},
    methods: {
      onItemClick (id) {
        this.$parent.currentIndex = this.currentIndex
        this.$emit('click')
      }
    }
  }
</script>
