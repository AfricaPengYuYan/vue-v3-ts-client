import type { AxiosInstance, AxiosRequestConfig, CustomParamsSerializer } from 'axios'
import { HTTP_ERROR_MESSAGES } from '#/http'
import { useUserInfoStoreHook } from '@/store/modules/userInfo'
import { formatToken, getToken } from '@/utils/auth'
import Axios from 'axios'
import { stringify } from 'qs'
import NProgress from './progress'

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
    // 请求超时时间
    timeout: 10000,
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
    },
    // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
    paramsSerializer: {
        serialize: stringify as unknown as CustomParamsSerializer,
    },
    timeoutErrorMessage: '请求超时，请稍后重试',
}

const whiteList = ['/refreshToken', '/login']

class PureHttp {
    constructor() {
        this.httpInterceptorsRequest()
        this.httpInterceptorsResponse()
    }

    /** token过期后，暂存待执行的请求 */
    private static requests = []

    /** 防止重复刷新token */
    private static isRefreshing = false

    /** 初始化配置对象 */
    private static initConfig: PureHttpRequestConfig = {}

    /** 保存当前Axios实例对象 */
    private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

    /** 重连原始请求 */
    private static retryOriginalRequest(config: PureHttpRequestConfig) {
        return new Promise((resolve) => {
            PureHttp.requests.push((token: string) => {
                config.headers!.Authorization = formatToken(token)
                resolve(config)
            })
        })
    }

    /** 重试请求 */
    private async retryRequest(error: PureHttpError, config: PureHttpRequestConfig): Promise<any> {
        const { retryTimes = 3, retryDelay = 1000 } = config
        if (!retryTimes)
            return Promise.reject(error)

        const retry = async (times: number): Promise<any> => {
            if (times === 0)
                return Promise.reject(error)
            try {
                await new Promise(resolve => setTimeout(resolve, retryDelay))
                return await PureHttp.axiosInstance.request(config)
            }
            catch (err) {
                return retry(times - 1)
            }
        }

        return retry(retryTimes)
    }

    /** 请求拦截 */
    private httpInterceptorsRequest(): void {
        PureHttp.axiosInstance.interceptors.request.use(
            async (config: PureHttpRequestConfig) => {
                // 开启进度条动画
                NProgress.start()
                // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
                if (Object.prototype.toString.call(config.beforeResponseCallback) === '[object Function]') {
                    config.beforeRequestCallback!(config)
                    return config
                }
                if (PureHttp.initConfig.beforeRequestCallback) {
                    PureHttp.initConfig.beforeRequestCallback(config)
                    return config
                }
                /** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
                if (whiteList.some(v => config.url.includes(v))) {
                    return config
                }
                else {
                    return new Promise((resolve) => {
                        const data = getToken()
                        if (data) {
                            const now = new Date().getTime()
                            const expired = Number(data.expires) - now <= 0
                            if (expired) {
                                if (!PureHttp.isRefreshing) {
                                    PureHttp.isRefreshing = true
                                    // token过期刷新
                                    useUserInfoStoreHook()
                                        .handRefreshToken({ refreshToken: data.refreshToken })
                                        .then((res) => {
                                            // const token = res
                                            // config.headers['Authorization'] = formatToken(token)
                                            // PureHttp.requests.forEach((cb) => cb(token))
                                            // PureHttp.requests = []
                                        })
                                        .finally(() => {
                                            PureHttp.isRefreshing = false
                                        })
                                }
                                resolve(PureHttp.retryOriginalRequest(config))
                            }
                            else {
                                config.headers!.Authorization = formatToken(data.accessToken)
                                resolve(config)
                            }
                        }
                        else {
                            resolve(config)
                        }
                    })
                }
            },
            (error) => {
                return Promise.reject(error)
            },
        )
    }

    /** 响应拦截 */
    private httpInterceptorsResponse(): void {
        PureHttp.axiosInstance.interceptors.response.use(
            async (response: PureHttpResponse) => {
                NProgress.done()

                const res = response.data as HttpResponse

                // 处理业务错误
                if (res.code !== 200) {
                    const error: HttpError = {
                        code: res.code,
                        message: res.message,
                    }

                    // 处理token过期
                    if (res.code === 401) {
                        if (!PureHttp.isRefreshing) {
                            PureHttp.isRefreshing = true
                            const userStore = useUserInfoStoreHook()
                            try {
                                await userStore.handRefreshToken()
                                PureHttp.isRefreshing = false
                                // 重试所有等待的请求
                                PureHttp.requests.forEach(cb => cb())
                                PureHttp.requests = []
                                // 重试当前请求
                                return PureHttp.axiosInstance.request(response.config)
                            }
                            catch (err) {
                                PureHttp.isRefreshing = false
                                userStore.logout()
                                return Promise.reject(error)
                            }
                        }
                        // 将请求加入队列
                        return new Promise((resolve) => {
                            PureHttp.requests.push(() => {
                                resolve(PureHttp.axiosInstance.request(response.config))
                            })
                        })
                    }

                    return Promise.reject(error)
                }

                return res.data
            },
            async (error: PureHttpError) => {
                NProgress.done()

                // 处理请求重试
                const config = error.config as PureHttpRequestConfig
                if (config?.retryTimes) {
                    return this.retryRequest(error, config)
                }

                if (error.response) {
                    const status = error.response.status as HttpStatusCode
                    error.message = HTTP_ERROR_MESSAGES[status] || `连接错误${status}`
                }

                return Promise.reject(error)
            },
        )
    }

    /** 通用请求工具函数 */
    public request<T>(method: RequestMethods, url: string, param?: AxiosRequestConfig, axiosConfig?: PureHttpRequestConfig): Promise<T> {
        const config = { method, url, ...param, ...axiosConfig } as PureHttpRequestConfig

        // 单独处理自定义请求/响应回掉
        return new Promise((resolve, reject) => {
            PureHttp.axiosInstance
                .request(config)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    /** 单独抽离的post工具函数 */
    public post<T, P>(url: string, params?: AxiosRequestConfig<T>, config?: PureHttpRequestConfig): Promise<P> {
        return this.request<P>('post', url, params, config)
    }

    /** 单独抽离的get工具函数 */
    public get<T, P>(url: string, params?: AxiosRequestConfig<T>, config?: PureHttpRequestConfig): Promise<P> {
        return this.request<P>('get', url, params, config)
    }
}

export const http = new PureHttp()
