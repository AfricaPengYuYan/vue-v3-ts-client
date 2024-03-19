import {ProxyOptions} from 'vite'

type ProxyTargetList = Record<string, ProxyOptions>

const httpsRE = /^https:\/\//

export function createViteServer(viteEnv: ViteEnv) {
    const {VITE_PORT, VITE_PROXY} = viteEnv
    const proxy: ProxyTargetList = {}
    for (const [prefix, target] of VITE_PROXY) {
        const isHttps = httpsRE.test(target)
        // https://github.com/http-party/node-http-proxy#options
        proxy[prefix] = {
            target: target,
            changeOrigin: true,
            ws: true,
            rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
            // https is require secure=false
            ...(isHttps ? {secure: false} : {}),
        }
    }
    return {
        // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
        hmr: {overlay: false},
        // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
        cors: true,
        // 服务启动时是否自动打开浏览器
        open: true,
        // 类型： number 指定服务器端口
        port: VITE_PORT,
        headers: {
            'Cache-Control': 'no-store',
        },
        // 是否开启 https
        https: false,
        // IP配置，支持从IP启动
        host: '0.0.0.0',
        // 本地跨域代理
        proxy,
    }
}
