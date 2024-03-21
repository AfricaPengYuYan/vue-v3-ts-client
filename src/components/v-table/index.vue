<script setup lang="ts">
type ColumnsType = {
  prop: string
  label: string
}
type TableProps = {
  data: any[],
  columns: ColumnsType[],
  // 序号
  index?: boolean
  // 多选
  selection?: boolean

  page: number
  pageSize: number
  // 总数
  total: number
  pageSizes?: number[]
}
const props = withDefaults(defineProps<TableProps>(), {
  index: false,
  selection: false,
  pageSizes: [10, 50, 100]
})

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
    <el-table :data="props.data" border stripe>
      <el-table-column v-if="props.index" type="selection" align="center" width="50"/>
      <el-table-column v-if="props.index" sortable type="index" align="center" width="50"/>
      <el-table-column v-for="(row,index) in props.columns" :key="index" sortable :prop="row.prop" :label="row.label"
                       align="center"/>
      <el-table-column>
        <template #default>
          <slot/>
        </template>
      </el-table-column>
    </el-table>

    <div class="">
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

</style>