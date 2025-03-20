import type { ECharts } from 'echarts'

declare global {

    /**
     * 打包压缩格式的类型声明
     */
    type ViteCompression =
        | 'none'
        | 'gzip'
        | 'brotli'
        | 'both'
        | 'gzip-clear'
        | 'brotli-clear'
        | 'both-clear'

    /**
     * 对应 `public/platform-config.json` 文件的类型声明
     * @see {@link https://pure-admin.cn/pages/config/#platform-config-json}
     */
    interface PlatformConfigs {
        Version?: string
        Title?: string
        FixedHeader?: boolean
        HiddenSideBar?: boolean
        MultiTagsCache?: boolean
        MaxTagsLevel?: number
        KeepAlive?: boolean
        Locale?: string
        Layout?: string
        Theme?: string
        DarkMode?: boolean
        OverallStyle?: string
        Grey?: boolean
        Weak?: boolean
        HideTabs?: boolean
        HideFooter?: boolean
        Stretch?: boolean | number
        SidebarStatus?: boolean
        EpThemeColor?: string
        ShowLogo?: boolean
        ShowModel?: string
        MenuArrowIconNoTransition?: boolean
        CachingAsyncRoutes?: boolean
        TooltipEffect?: Effect
        ResponsiveStorageNameSpace?: string
        MenuSearchHistory?: number
        MapConfigure?: {
            amapKey?: string
            options: {
                resizeEnable?: boolean
                center?: number[]
                zoom?: number
            }
        }
    }

    /**
     * 与 `PlatformConfigs` 类型不同，这里是缓存到浏览器本地存储的类型声明
     * @see {@link https://pure-admin.cn/pages/config/#platform-config-json}
     */
    interface StorageConfigs {
        version?: string
        title?: string
        fixedHeader?: boolean
        hiddenSideBar?: boolean
        multiTagsCache?: boolean
        keepAlive?: boolean
        locale?: string
        layout?: string
        theme?: string
        darkMode?: boolean
        grey?: boolean
        weak?: boolean
        hideTabs?: boolean
        hideFooter?: boolean
        sidebarStatus?: boolean
        epThemeColor?: string
        themeColor?: string
        overallStyle?: string
        showLogo?: boolean
        showModel?: string
        menuSearchHistory?: number
        mapConfigure?: {
            amapKey?: string
            options: {
                resizeEnable?: boolean
                center?: number[]
                zoom?: number
            }
        }
        username?: string
    }

    /**
     * `responsive-storage` 本地响应式 `storage` 的类型声明
     */
    interface ResponsiveStorage {
        locale: {
            locale?: string
        }
        layout: {
            layout?: string
            theme?: string
            darkMode?: boolean
            sidebarStatus?: boolean
            epThemeColor?: string
            themeColor?: string
            overallStyle?: string
        }
        configure: {
            grey?: boolean
            weak?: boolean
            hideTabs?: boolean
            hideFooter?: boolean
            showLogo?: boolean
            showModel?: string
            multiTagsCache?: boolean
            stretch?: boolean | number
        }
        tags?: Array<any>
    }

    /**
     * 平台里所有组件实例都能访问到的全局属性对象的类型声明
     */
    interface GlobalPropertiesApi {
        $echarts: ECharts
        $storage: ResponsiveStorage
        $config: PlatformConfigs
    }

    /**
     * 扩展 `Element`
     */
    interface Element {
        // v-ripple 作用于 src/directives/ripple/index.ts 文件
        _ripple?: {
            enabled?: boolean
            centered?: boolean
            class?: string
            circle?: boolean
            touched?: boolean
        }
    }
}
