import { useStorage } from '@/hooks/useStorage'
import store from '@/store'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { defineStore } from 'pinia'

interface Language {
    el: Recordable
    name: string
}
interface LocaleDropdownType {
    lang: LocaleType
    name?: string
    elLocale?: Language
}
interface LocaleState {
    currentLocale: LocaleDropdownType
    localeMap: LocaleDropdownType[]
}

const { getStorage, setStorage } = useStorage('localStorage')
const elLocaleMap: Record<string, Language> = {
    'zh-CN': zhCn as Language,
    'en': en as Language,
}

export const useLocaleStore = defineStore('locale', {
    state: (): LocaleState => {
        return {
            currentLocale: {
                lang: getStorage('lang') || 'zh-CN',
                elLocale: elLocaleMap[getStorage('lang') || 'zh-CN'],
            },
            // 多语言
            localeMap: [
                {
                    lang: 'zh-CN',
                    name: '简体中文',
                },
                {
                    lang: 'en',
                    name: 'English',
                },
            ],
        }
    },
    getters: {
        getCurrentLocale(): LocaleDropdownType {
            return this.currentLocale
        },
        getLocaleMap(): LocaleDropdownType[] {
            return this.localeMap
        },
    },
    actions: {
        setCurrentLocale(localeMap: LocaleDropdownType) {
            this.currentLocale.lang = localeMap?.lang
            this.currentLocale.elLocale = elLocaleMap[localeMap?.lang]
            setStorage('lang', localeMap?.lang)
        },
    },
})

export function useLocaleStoreWithOut() {
    return useLocaleStore(store)
}
