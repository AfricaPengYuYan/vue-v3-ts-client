<script setup lang="ts">
import {TableProps} from "#/table"
import Column from "@/components/v-table/column.vue";

const props = withDefaults(defineProps<TableProps>(), {
  pageSizes: [10, 50, 100],
  options: {
    border: true,
    stripe: true
  }
})
// 插槽
type TableSlots = {
  settings(scope: { row: typeof props.data[0] })
}
const slots = defineSlots<TableSlots>()
const emits = defineEmits(["update:page", "update:pageSize", "get"])

const currentPage = computed({
  get() {
    return props.page
  },
  set(value: number) {
    emits("update:page", value)
  }
})

const currentPageSize = computed({
  get() {
    return props.pageSize
  },
  set(value: number) {
    emits("update:pageSize", value)
  }
})

function handleSizeChange(value: number) {
  if (currentPage.value * value > props.total) currentPage.value = 1;
  emits('get', {page: currentPage.value, limit: value});
  // 平滑滚动顶部
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function handleCurrentChange(value: number) {
  emits('get', {page: value, limit: currentPageSize.value});
  // 平滑滚动顶部
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
</script>

<template>
  <div>
    <el-table :data="props.data" v-bind="props.options">
      <template v-for="(column,index) in props.columns" :key="index">
        <!-- 多选 -->
        <el-table-column v-if="column.type === 'selection'" v-bind="column"/>
        <!-- 序号 -->
        <el-table-column v-else-if="column.type === 'index'" sortable v-bind="column"/>

        <column v-else :column="column">
          <template v-for="slotName in Object.keys($slots)" #[slotName]="scope">
            <slot :name="slotName" v-bind="scope"/>
          </template>
        </column>
      </template>
    </el-table>

    <div class="v-pagination">
      <el-pagination v-model:current-page="currentPage"
                     v-model:page-size="currentPageSize"
                     :page-sizes="props.pageSizes"
                     background layout="total, sizes, prev, pager, next, jumper"
                     :total="props.total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-pagination {
  width: 100%;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>