<script lang="ts" setup>
import { useThrottleFn } from '@vueuse/core'

interface BeLazyBaseProps {
    component: object | Function
    props?: Record<string, any>
}

interface BeLazyUIProps {
    rows?: number
    throttle?: number
}

// 通过接口继承来组合最终的 Props
interface Props extends BeLazyBaseProps, BeLazyUIProps {}

const { component, props, rows = 3, throttle = 200 } = defineProps<Props>()

const lazyContainer = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

function handleIntersection(entries: IntersectionObserverEntry[]) {
    if (entries[0].isIntersecting) {
        isVisible.value = true
        if (observer) {
            observer.disconnect()
        }
    }
}

onMounted(() => {
    observer = new IntersectionObserver(handleIntersection, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px',
    })

    if (lazyContainer.value) {
        const throttledObserve = useThrottleFn(() => {
            observer?.observe(lazyContainer.value!)
        }, throttle)

        throttledObserve()
    }
})

onUnmounted(() => {
    if (observer) {
        observer.disconnect()
    }
})
</script>

<template>
    <div ref="lazyContainer">
        <ElSkeleton v-if="!isVisible" :rows="rows" animated />
        <component :is="component" v-else v-bind="props" />
    </div>
</template>

<style scoped>
/* 可根据需要添加样式 */
</style>
