declare global {
    /**
     * 打包压缩格式的类型声明
     * @description 定义构建时的压缩方式
     * - none: 不压缩
     * - gzip: 使用 gzip 压缩
     * - brotli: 使用 brotli 压缩
     * - both: 同时使用 gzip 和 brotli 压缩
     * - gzip-clear: 使用 gzip 压缩并删除源文件
     * - brotli-clear: 使用 brotli 压缩并删除源文件
     * - both-clear: 同时使用两种压缩并删除源文件
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
     * Vite 环境变量配置接口
     * @interface ViteEnv
     * @description 定义项目环境变量的类型
     */
    interface ViteEnv {
        /** 标题 */
        readonly VITE_APP_TITLE: string
        /** 公共基础路径 */
        readonly VITE_PUBLIC_PATH: string
        /** 路由历史模式 */
        readonly VITE_ROUTER_HISTORY: string
        /** 服务端口号 */
        readonly VITE_PORT: number
        /** 代理配置 */
        readonly VITE_PROXY: [string, string][]
        /** 是否删除 console */
        readonly VITE_DROP_CONSOLE: boolean
        /** 是否启用图片压缩 */
        readonly VITE_USE_IMAGEMIN: boolean
        /** 是否启用压缩 */
        readonly VITE_USE_COMPRESS: boolean
        /** 压缩时是否删除原始文件 */
        readonly VITE_COMPRESS_DELETE_ORIGIN_FILE: boolean
        /** 是否启用兼容性构建 */
        readonly VITE_LEGACY: boolean
        /** 压缩类型 */
        readonly VITE_COMPRESSION: ViteCompression
        /** 是否启用 CDN */
        readonly VITE_CDN: boolean
        /** 是否隐藏首页 */
        readonly VITE_HIDE_HOME: boolean
    }
}
