<script setup lang="ts">
import {ColumnsType} from "#/table";

const props = withDefaults(defineProps<{ column: ColumnsType }>(), {})
const {column} = toRefs(props)
</script>

<template>
  <el-table-column sortable
                   v-bind="column"
                   :type="column?.type || 'default'"
                   :prop="column.prop || ''"
                   :label="column.label || ''"
                   :align="column.align || 'center'"
  >
    <template #default="scope">
      <!--
           render函数
           使用内置的component组件可以支持h函数渲染和txs语法
      -->
      <component v-if="column.render" :is="column.render" v-bind="scope"></component>
      <!-- 自定义插槽-->
      <slot v-else-if="column.slot" :name="column.slot" v-bind="scope"></slot>
      <!-- 默认 -->
      <span v-else>{{ scope.row[column.prop] }}</span>
    </template>
  </el-table-column>
</template>

<style scoped lang="scss">

</style>