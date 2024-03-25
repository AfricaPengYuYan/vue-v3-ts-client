<script setup lang="ts">
import Logo from './logo.vue'
</script>

<template>
  <aside class="aside-container h-dvh">
    <Logo></Logo>
  </aside>
</template>

<style scoped lang="scss">
.aside-container {
  width: 220px;
  position: fixed;
  left: 0;
  top: 0;
  transition: width .3s;
  z-index: 1001;
  background-color: #fff;
}
</style>