<script setup lang="ts">
import { useGlobal } from '@pureadmin/utils'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const { $storage } = useGlobal<GlobalPropertiesApi>()

const currentLocale = computed(() => {
    return $storage.locale?.locale === 'zh' ? zhCn : en
})
</script>

<template>
    <el-config-provider :locale="currentLocale">
        <router-view />
    </el-config-provider>
</template>
