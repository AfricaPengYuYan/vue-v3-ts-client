export function useTable() {
    const tableData = ref([])
    const tableRef = ref()
    const tableLoading = ref(false)


    return {
        tableData,
        tableRef,
        tableLoading
    }
}