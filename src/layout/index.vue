<script setup lang="ts">
import {CustomSide, CustomHeader, CustomNav, CustomFooter} from './components'
</script>

<template>
  <div class="layout-container">
    <custom-side></custom-side>
    <section>
      <custom-header></custom-header>
      <custom-nav></custom-nav>
      <router-view></router-view>
    </section>
    <custom-footer></custom-footer>
  </div>
</template>

<style scoped lang="scss">
.layout-container{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
</style>