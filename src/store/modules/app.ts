import type { ComponentSize } from 'element-plus'
import store from '@/store'
import { defineStore } from 'pinia'

interface AppState {
    breadcrumb: boolean
    breadcrumbIcon: boolean
    collapse: boolean
    uniqueOpened: boolean
    hamburger: boolean
    screenfull: boolean
    size: boolean
    locale: boolean
    tagsView: boolean
    tagsViewIcon: boolean
    logo: boolean
    fixedHeader: boolean
    greyMode: boolean
    dynamicRouter: boolean
    serverDynamicRouter: boolean
    pageLoading: boolean
    layout: LayoutType
    title: string
    isDark: boolean
    currentSize: ComponentSize
    sizeMap: ComponentSize[]
    mobile: boolean
    footer: boolean
    theme: ThemeTypes
    fixedMenu: boolean
}

export const useAppStore = defineStore('app', {
    state: (): AppState => {
        return {
            sizeMap: ['default', 'large', 'small'],
            mobile: false, // 是否是移动端
            title: import.meta.env.VITE_APP_TITLE, // 标题
            pageLoading: false, // 路由跳转loading
            breadcrumb: true, // 面包屑
            breadcrumbIcon: true, // 面包屑图标
            collapse: false, // 折叠菜单
            uniqueOpened: false, // 是否只保持一个子菜单的展开
            hamburger: true, // 折叠图标
            screenfull: true, // 全屏图标
            size: true, // 尺寸图标
            locale: true, // 多语言图标
            tagsView: true, // 标签页
            tagsViewIcon: true, // 是否显示标签图标
            logo: true, // logo
            fixedHeader: true, // 固定toolheader
            footer: true, // 显示页脚
            greyMode: false, // 是否开始灰色模式，用于特殊悼念日
            dynamicRouter: true, // 是否动态路由
            serverDynamicRouter: true, // 是否服务端渲染动态路由
            fixedMenu: false, // 是否固定菜单
            layout: 'classic', // layout布局
            isDark: false, // 是否是暗黑模式
            currentSize: 'default', // 组件尺寸
            theme: {
                // 主题色
                elColorPrimary: '#409eff',
                // 左侧菜单边框颜色
                leftMenuBorderColor: 'inherit',
                // 左侧菜单背景颜色
                leftMenuBgColor: '#001529',
                // 左侧菜单浅色背景颜色
                leftMenuBgLightColor: '#0f2438',
                // 左侧菜单选中背景颜色
                leftMenuBgActiveColor: 'var(--el-color-primary)',
                // 左侧菜单收起选中背景颜色
                leftMenuCollapseBgActiveColor: 'var(--el-color-primary)',
                // 左侧菜单字体颜色
                leftMenuTextColor: '#bfcbd9',
                // 左侧菜单选中字体颜色
                leftMenuTextActiveColor: '#fff',
                // logo字体颜色
                logoTitleTextColor: '#fff',
                // logo边框颜色
                logoBorderColor: 'inherit',
                // 头部背景颜色
                topHeaderBgColor: '#fff',
                // 头部字体颜色
                topHeaderTextColor: 'inherit',
                // 头部悬停颜色
                topHeaderHoverColor: '#f6f6f6',
                // 头部边框颜色
                topToolBorderColor: '#eee',
            },
        }
    },
    getters: {
        getCurrentSize(): ComponentSize {
            return this.currentSize
        },
    },
    actions: {
        setCurrentSize(currentSize: ComponentSize) {
            this.currentSize = currentSize
        },
    },
    persist: true,
})

export function useAppStoreWithOut() {
    return useAppStore(store)
}
