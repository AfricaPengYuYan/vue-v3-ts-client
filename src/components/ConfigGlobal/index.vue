<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import { useLocaleStore } from '@/store/modules/locale'

const appStore = useAppStore()
const localeStore = useLocaleStore()
const currentSize = computed(() => appStore.getCurrentSize)
const currentLocale = computed(() => localeStore.currentLocale)
</script>

<template>
    <el-config-provider
        :message="{ max: 1 }"
        :locale="currentLocale.elLocale"
        :size="currentSize"
    >
        <slot />
    </el-config-provider>
</template>
