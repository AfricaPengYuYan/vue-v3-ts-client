// https://vitejs.cn/config/#build-target
export function createViteBuild() {
    return {
        /**
         * 混淆器
         * terser 构建后文件体积更小，'terser' | 'esbuild'
         */
        minify: 'esbuild',

        /**
         * 类型： string | string[]
         * 默认: modules
         * 设置最终构建的浏览器兼容目标
         */
        target: 'es2015',

        /**
         * 类型： string
         * 默认: dist
         * 指定输出路径（相对于 项目根目录）
         */
        outDir: 'dist',

        /**
         * 类型： string
         * 默认: assets
         * 指定生成静态资源（js、css、img、fonts）的存放路径（相对于 build.outDir）。
         */
        assetsDir: 'static/assets',

        /**
         * 类型： number
         * 默认： 4096 (4kb)
         * 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
         */
        assetsInlineLimit: 4096,

        /**
         * 类型： boolean
         * 默认: true
         * 启用/禁用 CSS 代码拆分。如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
         */
        cssCodeSplit: true,

        /**
         * 类型： boolean | 'inline' | 'hidden'
         * 默认： false
         * 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件。
         * 如果为 'inline' source map 将作为一个 data URI 附加在输出文件中。
         * 如果为 'hidden' 的工作原理与 'true' 相似，只是 bundle 文件中相应的注释将不被保留。
         */
        sourcemap: false,

        /**
         * 类型： RollupOptions
         * 自定义底层的 Rollup 打包配置。这与从 Rollup 配置文件导出的选项相同，并将与 Vite 的内部 Rollup 选项合并。
         */
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: [],
            // 指定文件输出的配置
            output: {
                chunkFileNames: `static/js/[name]-[hash].js`,
                entryFileNames: `static/js/[name]-[hash].js`,
                assetFileNames: `static/[ext]/[name]-[hash].[ext]`,
                manualChunks(id: any) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                },
            },
        },

        /**
         * 类型： boolean
         * 默认： true
         * 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
         */
        brotliSize: false,

        /**
         * 类型： number
         * 默认: 500
         * chunk 大小警告的限制（以 kbs 为单位）。
         */
        chunkSizeWarningLimit: 2000,
    }
}