import type { ComponentSize } from 'element-plus'
import store from '@/store'
import { humpToUnderline, setCssVar } from '@/utils'
import { colorIsDark, hexToRGB, lighten, mix } from '@/utils/color'
import { useCssVar, useDark } from '@vueuse/core'
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

            // UI 组件相关配置
            size: true, // 是否显示全局组件大小切换按钮
            locale: true, // 是否显示多语言切换按钮
            tagsView: true, // 是否启用标签页导航
            tagsViewIcon: true, // 是否在标签页中显示图标
            logo: true, // 是否显示系统Logo

            // 布局相关配置
            fixedHeader: true, // 是否固定头部工具栏，固定后会始终显示在页面顶部
            footer: true, // 是否显示底部页脚信息
            greyMode: false, // 灰色模式开关，用于特殊纪念日展示
            fixedMenu: false, // 是否固定左侧菜单，固定后不随页面滚动
            layout: 'classic', // 整体布局方式：classic-经典布局，其他可选项根据实际定义

            // 系统功能配置
            dynamicRouter: true, // 是否启用前端动态路由
            serverDynamicRouter: true, // 是否启用后端动态路由配置
            isDark: false, // 是否启用暗黑模式
            currentSize: 'default', // 当前全局组件大小设置：default-默认，large-大号，small-小号

            // 主题相关配置
            theme: {
                elColorPrimary: '#409eff', // Element Plus 主题主色
                leftMenuBorderColor: 'inherit', // 左侧菜单边框颜色
                leftMenuBgColor: '#001529', // 左侧菜单背景色
                leftMenuBgLightColor: '#0f2438', // 左侧菜单浅色背景，用于子菜单
                leftMenuBgActiveColor: 'var(--el-color-primary)', // 左侧菜单选中项背景色
                leftMenuCollapseBgActiveColor: 'var(--el-color-primary)', // 菜单折叠时选中项背景色
                leftMenuTextColor: '#bfcbd9', // 左侧菜单字体颜色
                leftMenuTextActiveColor: '#fff', // 左侧菜单选中项字体颜色
                logoTitleTextColor: '#fff', // Logo标题字体颜色
                logoBorderColor: 'inherit', // Logo边框颜色
                topHeaderBgColor: '#fff', // 顶部工具栏背景色
                topHeaderTextColor: 'inherit', // 顶部工具栏字体颜色
                topHeaderHoverColor: '#f6f6f6', // 顶部工具栏悬停背景色
                topToolBorderColor: '#eee', // 顶部工具栏边框颜色
            },
        }
    },
    getters: {
        getCurrentSize(): ComponentSize {
            return this.currentSize
        },
        getTitle(): string {
            return this.title
        },
        getIsDark(): boolean {
            return this.isDark
        },
    },
    actions: {
        /**
         * 设置菜单主题
         * @param color - 主题颜色值
         * @description 根据传入的颜色值设置菜单主题，包括边框、背景、文字等颜色的计算和设置
         */
        setMenuTheme(color: string) {
            const primaryColor = useCssVar('--el-color-primary', document.documentElement)
            const isDarkColor = colorIsDark(color)
            const theme: Recordable = {
                // 左侧菜单边框颜色
                leftMenuBorderColor: isDarkColor ? 'inherit' : '#eee',
                // 左侧菜单背景颜色
                leftMenuBgColor: color,
                // 左侧菜单浅色背景颜色
                leftMenuBgLightColor: isDarkColor ? lighten(color!, 6) : color,
                // 左侧菜单选中背景颜色
                leftMenuBgActiveColor: isDarkColor
                    ? 'var(--el-color-primary)'
                    : hexToRGB(unref(primaryColor) as string, 0.1),
                // 左侧菜单收起选中背景颜色
                leftMenuCollapseBgActiveColor: isDarkColor
                    ? 'var(--el-color-primary)'
                    : hexToRGB(unref(primaryColor) as string, 0.1),
                // 左侧菜单字体颜色
                leftMenuTextColor: isDarkColor ? '#bfcbd9' : '#333',
                // 左侧菜单选中字体颜色
                leftMenuTextActiveColor: isDarkColor ? '#fff' : 'var(--el-color-primary)',
                // logo字体颜色
                logoTitleTextColor: isDarkColor ? '#fff' : 'inherit',
                // logo边框颜色
                logoBorderColor: isDarkColor ? color : '#eee',
            }
            this.setTheme(theme)
            this.setCssVarTheme()
        },

        /**
         * 设置主题配置
         * @param theme - 主题配置对象
         * @description 合并并更新当前主题配置
         */
        setTheme(theme: ThemeTypes) {
            this.theme = Object.assign(this.theme, theme)
        },

        /**
         * 设置暗黑模式
         * @param isDark - 是否启用暗黑模式
         * @description 切换暗黑/明亮模式，并更新相关样式
         */
        setIsDark(isDark: boolean) {
            this.isDark = isDark
            if (this.isDark) {
                document.documentElement.classList.add('dark')
                document.documentElement.classList.remove('light')
            }
            else {
                document.documentElement.classList.add('light')
                document.documentElement.classList.remove('dark')
            }
            this.setPrimaryLight()
        },

        /**
         * 设置 CSS 变量主题
         * @description 将主题配置转换为 CSS 变量并应用到文档根元素
         */
        setCssVarTheme() {
            for (const key in this.theme) {
                setCssVar(`--${humpToUnderline(key)}`, this.theme[key])
            }
            this.setPrimaryLight()
        },

        /**
         * 设置主题主色亮度
         * @description 根据主题色计算并设置不同亮度的变体颜色
         */
        setPrimaryLight() {
            if (this.theme.elColorPrimary) {
                const elColorPrimary = this.theme.elColorPrimary
                const color = this.isDark ? '#000000' : '#ffffff'
                const lightList = [3, 5, 7, 8, 9]
                lightList.forEach((v) => {
                    setCssVar(`--el-color-primary-light-${v}`, mix(color, elColorPrimary, v / 10))
                })
                setCssVar(`--el-color-primary-dark-2`, mix(color, elColorPrimary, 0.2))
            }
        },

        /**
         * 设置全局组件尺寸
         * @param currentSize - 组件尺寸
         * @description 更新全局组件尺寸配置
         */
        setCurrentSize(currentSize: ComponentSize) {
            this.currentSize = currentSize
        },

        /**
         * 设置系统标题
         * @param title - 系统标题
         * @description 更新系统标题
         */
        setTitle(title: string) {
            this.title = title
        },

        /**
         * 初始化主题
         * @description 初始化暗黑模式和系统标题
         */
        initTheme() {
            const isDark = useDark({
                valueDark: 'dark',
                valueLight: 'light',
            })
            isDark.value = this.getIsDark
            const newTitle = import.meta.env.VITE_APP_TITLE
            newTitle !== this.getTitle && this.setTitle(newTitle)
        },
    },
    persist: true,
})

export function useAppStoreWithOut() {
    return useAppStore(store)
}
