export function useTable() {
    const tableData = ref([])
    const tableRef = ref()


    return {
        tableData,
        tableRef
    }
}