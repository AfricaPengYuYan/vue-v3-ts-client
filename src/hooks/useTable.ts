export function useTable(params: any[]) {
    const tableData = ref<any[]>(params)
    const tableRef = ref()
    const tableLoading = ref<boolean>(false)

    return {
        tableData,
        tableRef,
        tableLoading,
    }
}
