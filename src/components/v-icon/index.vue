<template>
  <component v-if="hasName" :is="iconName" :style="iconStyle"></component>
  <span v-else class="iconify" :style="iconStyle" :data-icon="icon"></span>
</template>

<script setup lang="ts">
interface IconProps {
  name?: string
  icon?: string
  color?: string
  size?: number
}

const props = withDefaults(defineProps<IconProps>(), {})
const {name, icon, color, size} = toRefs(props)

// 是否传入name字段
const hasName = !!name.value

// 动态组件名称
const iconName = `icon-custom-${name.value}`

// 设置样式
const iconStyle = {
  color: color.value || '#303133',
  fontSize: `${size.value || 18}px`
}

console.log(iconStyle)
</script>