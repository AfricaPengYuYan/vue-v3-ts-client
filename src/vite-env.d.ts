/// <reference types="vite/client" />
interface ViteEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_PUBLIC_PATH: string
    readonly VITE_ROUTER_HISTORY: string
    readonly VITE_PORT: number
    readonly VITE_PROXY: [string, string][]
    readonly VITE_DROP_CONSOLE: boolean
    readonly VITE_USE_IMAGEMIN: boolean
    readonly VITE_USE_COMPRESS: boolean
    readonly VITE_COMPRESS_DELETE_ORIGIN_FILE: boolean
    readonly VITE_LEGACY: boolean
    readonly VITE_COMPRESSION: string
}

type Recordable<T = any> = Record<string, T>

declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module '*.scss' {
    const scss: Record<string, string>
    export default scss
}