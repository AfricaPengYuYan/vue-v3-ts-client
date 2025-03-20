<script setup lang="ts">
import { CustomFooter, CustomHeader, CustomNav, CustomSide } from './components';
</script>

<template>
    <div class="layout-container">
        <CustomSide />
        <div class="main-container">
            <div class="fixed-header">
                <CustomHeader />
                <CustomNav />
            </div>
            <section class="app-main">
                <el-scrollbar height="100%">
                    <div class="main-content">
                        <router-view v-slot="{ Component, route }">
                            <transition name="el-fade-in-linear">
                                <!--  强制在复用的视图之间进行过渡 -->
                                <component :is="Component" :key="route.path" />
                            </transition>
                        </router-view>
                        <CustomFooter />
                    </div>
                </el-scrollbar>
            </section>
        </div>
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
