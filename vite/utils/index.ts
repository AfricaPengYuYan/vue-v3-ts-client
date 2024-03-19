// 处理环境变量
const wrapperEnv = (envConf: Recordable): ViteEnv => {
    /** 此处为默认值 */
    const env: ViteEnv = {
        VITE_APP_TITLE: '',
        VITE_PUBLIC_PATH: '',
        VITE_ROUTER_HISTORY: '',
        VITE_PORT: 8848,
        VITE_PROXY: [],
        VITE_DROP_CONSOLE: false,
        VITE_USE_IMAGEMIN: false,
        VITE_USE_COMPRESS: false,
        VITE_COMPRESS_DELETE_ORIGIN_FILE: false,
        VITE_LEGACY: false,
        VITE_COMPRESSION: 'none',
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
            } catch (error) {
                realName = ''
            }
        }
        env[envName] = realName
        if (Object.prototype.toString.call(realName) === "[object String]") {
            process.env[envName] = realName
        }
        else if (["[object Object]", "[object Array]"].includes(Object.prototype.toString.call(realName))) {
            process.env[envName] = JSON.stringify(realName)
        }
    }
    return env
}
// 跨域代理重写
const regExps = (value: string, reg: string): string => {
    return value.replace(new RegExp(`^${reg}`, 'g'), '')
}

export {wrapperEnv, regExps}
