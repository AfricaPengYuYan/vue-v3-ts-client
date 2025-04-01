declare global {
    /**
     * 系统语言类型
     * @description 支持中文和英文两种语言
     * @type {'zh-CN' | 'en'} LocaleType
     */
    type LocaleType = 'zh-CN' | 'en'

    /**
     * 布局类型
     * @description 定义系统支持的布局方式
     * @type {'classic' | 'topLeft' | 'top' | 'cutMenu'} LayoutType
     * @property {string} classic - 经典布局，左侧菜单模式
     * @property {string} topLeft - 顶部左侧布局，顶部导航+左侧菜单模式
     * @property {string} top - 顶部布局，纯顶部导航模式
     * @property {string} cutMenu - 切割菜单布局，左侧菜单精简模式
     */
    type LayoutType = 'classic' | 'topLeft' | 'top' | 'cutMenu'

    /**
     * 通用记录类型
     * @description 定义一个通用的记录类型，用于对象的键值对
     * @template T - 值的类型，默认为 any
     * @template K - 键的类型，默认为 string
     */
    type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

    /**
     * 主题配置接口
     * @interface ThemeTypes
     * @description 定义系统主题相关的配置项
     */
    interface ThemeTypes {
        /** Element-Plus 主题色 */
        elColorPrimary?: string
        /** 左侧菜单边框颜色 */
        leftMenuBorderColor?: string
        /** 左侧菜单背景色 */
        leftMenuBgColor?: string
        /** 左侧菜单浅色背景 */
        leftMenuBgLightColor?: string
        /** 左侧菜单选中背景色 */
        leftMenuBgActiveColor?: string
        /** 左侧菜单收起时选中背景色 */
        leftMenuCollapseBgActiveColor?: string
        /** 左侧菜单文字颜色 */
        leftMenuTextColor?: string
        /** 左侧菜单选中文字颜色 */
        leftMenuTextActiveColor?: string
        /** Logo 标题文字颜色 */
        logoTitleTextColor?: string
        /** Logo 边框颜色 */
        logoBorderColor?: string
        /** 顶部栏背景色 */
        topHeaderBgColor?: string
        /** 顶部栏文字颜色 */
        topHeaderTextColor?: string
        /** 顶部栏悬停颜色 */
        topHeaderHoverColor?: string
        /** 顶部工具栏边框颜色 */
        topToolBorderColor?: string
    }
}

export {}
