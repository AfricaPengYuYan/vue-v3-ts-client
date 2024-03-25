<script setup lang="ts">
import {CustomSide, CustomHeader, CustomNav, CustomFooter} from './components'
</script>

<template>
  <div class="layout-container">
    <custom-side></custom-side>
    <div class="main-container">
      <div class="fixed-header">
        <custom-header></custom-header>
        <custom-nav></custom-nav>
      </div>
      <section class="app-main">
        <el-scrollbar height="100%">
          <div class="main-content">
            <router-view></router-view>
          </div>
        </el-scrollbar>
      </section>
    </div>
    <custom-footer></custom-footer>
  </div>
</template>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;

  .main-container {
    position: relative;
    margin-left: 220px;

    .fixed-header {
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 998;
    }

    .app-main {
      padding-top: 80px;

      .main-content {
        margin: 10px 10px 0;
      }
    }
  }
}
</style>