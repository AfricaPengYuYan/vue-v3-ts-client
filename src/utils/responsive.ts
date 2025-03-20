import type { App } from 'vue'
import { responsiveStorageNameSpace } from '@/config'
import Storage from 'responsive-storage'

export function injectResponsiveStorage(app: App, config: PlatformConfigs) {
    const nameSpace = responsiveStorageNameSpace()

    const configObj = Object.assign(
        {
            // 国际化 默认中文zh
            locale: Storage.getData('locale', nameSpace) ?? {
                locale: config.Locale ?? 'zh',
            },

            // layout模式以及主题
            layout: Storage.getData('layout', nameSpace) ?? {
                layout: config.Layout ?? 'vertical',
                theme: config.Theme ?? 'default',
                darkMode: config.DarkMode ?? false,
                sidebarStatus: config.SidebarStatus ?? true,
                epThemeColor: config.EpThemeColor ?? '#409EFF',
            },

            configure: Storage.getData('configure', nameSpace) ?? {
                grey: config.Grey ?? false,
                weak: config.Weak ?? false,
                hideTabs: config.HideTabs ?? false,
                showLogo: config.ShowLogo ?? true,
                showModel: config.ShowModel ?? 'smart',
                multiTagsCache: config.MultiTagsCache ?? false,
            },
        },
        config.MultiTagsCache
            ? { tags: Storage.getData('tags', nameSpace) } // 默认显示首页tag
            : {},
    )

    app.use(Storage, { nameSpace, memory: configObj })
}
