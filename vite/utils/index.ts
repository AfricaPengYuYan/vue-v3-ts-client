import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// 处理环境变量
function wrapperEnv(envConf: Recordable): ViteEnv {
    /** 此处为默认值 */
    const env: ViteEnv = {
        VITE_APP_TITLE: '', // 项目标题
        VITE_PORT: 8808, // 开发服务器端口号
        VITE_PUBLIC_PATH: '', // 部署时的公共基础路径
        VITE_HIDE_HOME: false, // 是否隐藏首页
        VITE_ROUTER_HISTORY: '', // 路由模式（hash/history）
        VITE_PROXY: [], // 开发环境代理配置
        VITE_DROP_CONSOLE: false, // 生产环境是否删除 console
        VITE_USE_IMAGEMIN: false, // 是否使用图片压缩
        VITE_USE_COMPRESS: false, // 是否使用 gzip 或 brotli 压缩
        VITE_COMPRESS_DELETE_ORIGIN_FILE: false, // 压缩后是否删除原文件
        VITE_COMPRESSION: 'none', // 压缩类型（gzip/brotli/none）
        VITE_LEGACY: false, // 是否为旧版浏览器提供兼容性支持
        VITE_CDN: false, // 是否使用 CDN 加速
    }
    for (const envName of Object.keys(envConf)) {
        let realName = envConf[envName].replace(/\\n/g, '\n')
        realName = realName === 'true' ? true : realName === 'false' ? false : realName

        if (envName === 'VITE_PORT') {
            realName = Number(realName)
        }
        if (envName === 'VITE_PROXY' && realName) {
            try {
                realName = JSON.parse(realName.replace(/'/g, '"'))
            }
            catch (error) {
                realName = ''
            }
        }
        env[envName] = realName
        if (Object.prototype.toString.call(realName) === '[object String]') {
            process.env[envName] = realName
        }
        else if (['[object Object]', '[object Array]'].includes(Object.prototype.toString.call(realName))) {
            process.env[envName] = JSON.stringify(realName)
        }
    }
    return env
}
// 跨域代理重写
function regExps(value: string, reg: string): string {
    return value.replace(new RegExp(`^${reg}`, 'g'), '')
}

function pathResolve(dir = '.', metaUrl = import.meta.url) {
    // 当前文件目录的绝对路径
    const currentFileDir = dirname(fileURLToPath(metaUrl))
    // build 目录的绝对路径
    const buildDir = resolve(currentFileDir, 'build')
    // 解析的绝对路径
    const resolvedPath = resolve(currentFileDir, dir)
    // 检查解析的绝对路径是否在 build 目录内
    if (resolvedPath.startsWith(buildDir)) {
        // 在 build 目录内，返回当前文件路径
        return fileURLToPath(metaUrl)
    }
    // 不在 build 目录内，返回解析后的绝对路径
    return resolvedPath
}

export { pathResolve, regExps, wrapperEnv }
