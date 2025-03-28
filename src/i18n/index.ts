import type { App } from 'vue'
import type { I18nOptions } from 'vue-i18n'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { createI18n } from 'vue-i18n'
import { setHtmlPageLang } from './helper'

async function createI18nOptions(): Promise<I18nOptions> {
    const localeStore = useLocaleStoreWithOut()
    const locale = localeStore.getCurrentLocale
    const localeMap = localeStore.getLocaleMap
    const defaultLocal = await import(`./lang/${locale.lang}.ts`)
    const message = defaultLocal.default ?? {}

    setHtmlPageLang(locale.lang)

    localeStore.setCurrentLocale({
        lang: locale.lang,
    // elLocale: elLocal
    })

    return {
        legacy: false,
        locale: locale.lang,
        fallbackLocale: locale.lang,
        messages: {
            [locale.lang]: message,
        },
        availableLocales: localeMap.map(v => v.lang),
        sync: true,
        silentTranslationWarn: true,
        missingWarn: false,
        silentFallbackWarn: true,
    }
}

export async function useI18n(app: App<Element>) {
    const options = await createI18nOptions()
    const i18n = createI18n(options)
    app.use(i18n)
}
