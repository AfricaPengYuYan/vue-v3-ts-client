import type { App, WritableComputedRef } from 'vue'
import type { I18n } from 'vue-i18n'
import { responsiveStorageNameSpace } from '@/config'
import { isObject } from '@/utils/helper'
import { useLocalStorage } from '@vueuse/core'

// element-plus国际化
import enLocale from 'element-plus/es/locale/lang/en'
import zhLocale from 'element-plus/es/locale/lang/zh-cn'
// 多组件库的国际化和本地项目国际化兼容
import { createI18n } from 'vue-i18n'

// 添加类型声明
interface I18nModuleType {
    default: Record<string, any>
}

const siphonI18n = (function () {
    const cache: Record<string, any> = {}

    function loadI18nModules(prefix: string) {
        if (cache[prefix])
            return cache[prefix]

        try {
            // 修改为单层文件结构
            const modules = import.meta.glob<I18nModuleType>('../i18n/lang/*.(js|ts)', { eager: true })

            for (const path in modules) {
                // 修改正则以匹配文件名
                const matched = path.match(/lang\/([a-z]{2}-?[A-Z]{0,2})\.(js|ts)$/i)
                if (matched && matched[1].toLowerCase() === prefix.toLowerCase()) {
                    const mod = modules[path]
                    if (mod && mod.default) {
                        cache[prefix] = mod.default
                    }
                    else {
                        console.warn(`国际化文件 ${path} 格式不正确，应该使用 export default`)
                    }
                }
            }
        }
        catch (error) {
            console.error('加载国际化文件失败:', error)
        }
    }

    return (prefix = 'zh-CN') => {
        loadI18nModules(prefix)
        if (!cache[prefix]) {
            console.warn(`未找到对应的语言包 ${prefix}，将使用空对象`)
            return {}
        }
        return cache[prefix]
    }
})()

export const localesConfigs = {
    'zh-CN': {
        ...siphonI18n('zh-CN'),
        ...zhLocale,
    },
    'en': {
        ...siphonI18n('en'),
        ...enLocale,
    },
}

// 修改 storageLocal 为 useLocalStorage
const storage = useLocalStorage(`${responsiveStorageNameSpace()}locale`, {
    locale: 'zh',
})

// 将 i18n 实例创建移到这里
export const i18n: I18n = createI18n({
    legacy: false,
    locale: storage.value.locale ?? 'zh',
    fallbackLocale: 'en',
    messages: localesConfigs,
})

/** 获取对象中所有嵌套对象的key键，并将它们用点号分割组成字符串 */
function getObjectKeys(obj) {
    const stack = []
    const keys: Set<string> = new Set()

    stack.push({ obj, key: '' })

    while (stack.length > 0) {
        const { obj, key } = stack.pop()

        for (const k in obj) {
            const newKey = key ? `${key}.${k}` : k

            if (obj[k] && isObject(obj[k])) {
                stack.push({ obj: obj[k], key: newKey })
            }
            else {
                keys.add(key)
            }
        }
    }

    return keys
}

/** 将展开的key缓存 */
const keysCache: Map<string, Set<string>> = new Map()
function flatI18n(prefix = 'zh-CN') {
    let cache = keysCache.get(prefix)
    if (!cache) {
        cache = getObjectKeys(siphonI18n(prefix))
        keysCache.set(prefix, cache)
    }
    return cache
}

/**
 * 国际化转换工具函数（自动读取根目录locales文件夹下文件进行国际化匹配）
 * @param message message
 * @returns 转化后的message
 */
export function transformI18n(message: any = '') {
    if (!message) {
        return ''
    }

    // 处理存储动态路由的title,格式 {zh:"",en:""}
    if (typeof message === 'object') {
        const locale: string | WritableComputedRef<string> | any = i18n.global.locale
        return message[locale?.value]
    }

    const key = message.match(/(\S*)\./)?.input

    if (key && flatI18n('zh-CN').has(key)) {
        return i18n.global.t.call(i18n.global.locale, message)
    }
    else if (!key && Object.hasOwn(siphonI18n('zh-CN'), message)) {
        // 兼容非嵌套形式的国际化写法
        return i18n.global.t.call(i18n.global.locale, message)
    }
    else {
        return message
    }
}

/** 此函数只是配合i18n Ally插件来进行国际化智能提示，并无实际意义（只对提示起作用），如果不需要国际化可删除 */
export const $t = (key: string) => key

export function useI18n(app: App) {
    app.use(i18n)
}
