<script setup lang="ts">
import { responsiveStorageNameSpace } from '@/config'
import { useLocalStorage } from '@vueuse/core'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const storage = useLocalStorage(`${responsiveStorageNameSpace()}locale`, {
    locale: 'zh',
})

const currentLocale = computed(() => {
    return storage.value.locale === 'zh' ? zhCn : en
})
</script>

<template>
    <el-config-provider :locale="currentLocale">
        <router-view />
    </el-config-provider>
</template>
