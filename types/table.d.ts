// 表格1行属性
import {VNodeChild} from "vue";

export type ColumnsType = {
    prop?: string
    label?: string
    type?: "default" | "index" | "selection" | 'expand'
    width?: number
    align?: string
    //  使用插槽
    slot?: string
    // 使用h()函数渲染
    render?: (scope: { row: any, $index: number }) => VNodeChild
}

// props
export interface TableProps {
    data: any[],
    columns: ColumnsType[],
    options?: {
        height?: number
        "max-height"?: number
        "show-header"?: boolean
        stripe?: boolean
        border?: boolean
        "row-key"?: (row: any) => string | string
        "empty-text"?: string
        "default-expand-all"?: boolean
    },
    page: number
    pageSize: number
    // 总数
    total: number
    pageSizes?: number[]
}