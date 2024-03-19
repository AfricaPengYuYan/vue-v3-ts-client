import {App} from 'vue'
import axios from "axios";

let config: object = {}

const {VITE_PUBLIC_PATH} = import.meta.env

const setConfig = (cfg?: unknown) => {
    config = Object.assign(config, cfg)
}

const getConfig = (key?: string): ServerConfig => {
    if (key && Object.prototype.toString.call(key) === "[object String]") {
        const arr = key.split('.')
        if (arr && arr.length) {
            let data = config
            arr.forEach((v) => {
                if (data && Object.prototype.toString.call(data[v]) !== '[object Undefined]') {
                    data = data[v]
                } else {
                    data = null
                }
            })
            return data
        }
    }
    return config
}

/**
 * 获取项目动态全局配置
 * @param app
 */
export const getServerConfig = async (app: App): Promise<undefined> => {
    app.config.globalProperties.$config = getConfig()
    return axios({method: 'get', url: `${VITE_PUBLIC_PATH}serverConfig.json`})
        .then(({data: config}) => {
            let $config = app.config.globalProperties.$config
            // 自动注入项目配置
            if (app && $config && Object.prototype.toString.call(config) === "[object Object]") {
                $config = Object.assign($config, config)
                app.config.globalProperties.$config = $config
                // 设置全局配置
                setConfig($config)
            }
            return $config
        })
        .catch(() => {
            throw '请在public文件夹下添加serverConfig.json配置文件'
        })
}

export {getConfig, setConfig}
