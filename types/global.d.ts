declare global {
    /**
     * 打包压缩格式的类型声明
     */
    type ViteCompression = | 'none' | 'gzip' | 'brotli' | 'both' | 'gzip-clear' | 'brotli-clear' | 'both-clear'

    /**
     * 对应 `public/serverConfig.json` 文件的类型声明
     * @see {@link https://yiming_chang.gitee.io/pure-admin-doc/pages/config/#serverconfig-json}
     *
     * {
     *   "Version": 平台版本号
     *   "Title": 平台标题
     *   "FixedHeader": 是否固定页头和标签页（true 内容区超出出现纵向滚动条 false 页头、标签页、内容区可纵向滚动）
     *   "HiddenSideBar": 隐藏菜单和页头，只显示标签页和内容区
     *   "MultiTagsCache": 是否开启持久化标签 （会缓存）
     *   "KeepAlive": 是否开启组件缓存（此处不同于路由的 keepAlive，如果此处为 true 表示设置路由的 keepAlive 起效，反之设置 false 屏蔽平台整体的 keepAlive，即使路由设置了keepAlive 也不再起作用）
     *   "Locale": 默认国际化语言 （zh 中文、en 英文）（会缓存）
     *   "Layout": 导航菜单模式 （vertical 左侧菜单模式、horizontal 顶部菜单模式、mix 综合菜单模式）（会缓存）
     *   "Theme": 主题模式（会缓存）
     *   "DarkMode": 是否开启暗黑模式 （会缓存）
     *   "OverallStyle": 整体风格（浅色：light、深色：dark、自动：system）（会缓存）更多详情看 https://github.com/pure-admin/vue-pure-admin/commit/dd783136229da9e291b518df93227111f4216ad0#commitcomment-137027417
     *   "Grey": 灰色模式（会缓存）
     *   "Weak": 色弱模式（会缓存）
     *   "HideTabs": 是否隐藏标签页（会缓存）
     *   "HideFooter": 是否隐藏页脚（会缓存）
     *   "SidebarStatus": vertical左侧菜单模式模式下侧边栏状态（true 展开、false 收起）（会缓存）
     *   "EpThemeColor": 主题色（会缓存）
     *   "ShowLogo": 是否显示logo（会缓存）
     *   "ShowModel": 标签页风格（smart 灵动模式、card 卡片模式）（会缓存）
     *   "MenuArrowIconNoTransition": 菜单展开、收起图标是否开启动画，如遇菜单展开、收起卡顿设置成 true 即可（默认 false，开启动画）
     *   "CachingAsyncRoutes": 是否开启动态路由缓存本地的全局配置，默认 false
     *   "TooltipEffect": 可配置平台主体所有 el-tooltip 的 effect 属性，默认 light，不会影响业务代码
     *   "ResponsiveStorageNameSpace": 本地响应式存储的命名空间
     *   "MenuSearchHistory": 菜单搜索历史的最大条目
     * }
     *
     */
    interface ServerConfig {
        Version: string
        Title: string
        FixedHeader: boolean
        HiddenSideBar: boolean
        MultiTagsCache: boolean
        KeepAlive: boolean
        Locale: string
        Layout: string
        Theme: string
        DarkMode: boolean
        OverallStyle: string
        Grey: boolean
        Weak: boolean
        HideTabs: boolean
        HideFooter: boolean
        SidebarStatus: boolean
        EpThemeColor: string
        ShowLogo: boolean
        ShowModel: string
        MenuArrowIconNoTransition: boolean
        CachingAsyncRoutes: boolean
        TooltipEffect: string
        ResponsiveStorageNameSpace: string
        MenuSearchHistory: number
    }

    interface ResponsiveStorage {
        locale: {
            locale: string
        }
        layout: {
            layout: string
            theme: string
            darkMode: boolean
            sidebarStatus: boolean
            epThemeColor: string
        }
        configure: {
            grey: boolean
            weak: boolean
            hideTabs: boolean
            showLogo: boolean
            showModel: string
            multiTagsCache: boolean
        }
    }

    interface GlobalPropertiesApi {
        $echarts: ECharts
        $storage: ResponsiveStorage
        $config: ServerConfig
    }
}