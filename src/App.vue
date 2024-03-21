<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import {useGlobal} from "@pureadmin/utils";

const {$storage} = useGlobal<GlobalPropertiesApi>()

const currentLocale = computed(() => {
  return $storage.locale?.locale === 'zh' ? zhCn : en
})
</script>

<template>
  <el-config-provider :locale="currentLocale">
    <router-view/>
  </el-config-provider>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/reset-element";
</style>
