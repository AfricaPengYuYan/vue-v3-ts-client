import type { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios'

declare global {
    type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'>

    interface PureHttpError extends AxiosError {
        isCancelRequest?: boolean
    }

    interface PureHttpResponse extends AxiosResponse {
        config: PureHttpRequestConfig
    }

    interface PureHttpRequestConfig extends AxiosRequestConfig {
        beforeRequestCallback?: (request: PureHttpRequestConfig) => void
        beforeResponseCallback?: (response: PureHttpResponse) => void
        retryTimes?: number
        retryDelay?: number
        withToken?: boolean
    }

    /** HTTP 响应数据接口 */
    interface HttpResponse<T = any> {
        /** 状态码 */
        code: number
        /** 响应信息 */
        message: string
        /** 响应数据 */
        data: T
    }

    /** HTTP 错误接口 */
    interface HttpError {
        /** 错误码 */
        code: number
        /** 错误信息 */
        message: string
    }

    /** HTTP 状态码枚举 */
    enum HttpStatusCode {
        /** 400 错误的请求 */
        BadRequest = 400,
        /** 401 未授权 */
        Unauthorized = 401,
        /** 403 禁止访问 */
        Forbidden = 403,
        /** 404 资源未找到 */
        NotFound = 404,
        /** 405 方法不允许 */
        MethodNotAllowed = 405,
        /** 408 请求超时 */
        RequestTimeout = 408,
        /** 500 服务器内部错误 */
        InternalServerError = 500,
        /** 501 未实现 */
        NotImplemented = 501,
        /** 502 网关错误 */
        BadGateway = 502,
        /** 503 服务不可用 */
        ServiceUnavailable = 503,
        /** 504 网关超时 */
        GatewayTimeout = 504,
        /** 505 HTTP版本不支持 */
        HttpVersionNotSupported = 505,
    }

    const HTTP_ERROR_MESSAGES: Record<HttpStatusCode, string>
}

export const HTTP_ERROR_MESSAGES: Record<HttpStatusCode, string> = {
    [HttpStatusCode.BadRequest]: '请求错误',
    [HttpStatusCode.Unauthorized]: '未授权，请重新登录',
    [HttpStatusCode.Forbidden]: '拒绝访问',
    [HttpStatusCode.NotFound]: '请求错误,未找到该资源',
    [HttpStatusCode.MethodNotAllowed]: '请求方法未允许',
    [HttpStatusCode.RequestTimeout]: '请求超时',
    [HttpStatusCode.InternalServerError]: '服务器端出错',
    [HttpStatusCode.NotImplemented]: '网络未实现',
    [HttpStatusCode.BadGateway]: '网络错误',
    [HttpStatusCode.ServiceUnavailable]: '服务不可用',
    [HttpStatusCode.GatewayTimeout]: '网络超时',
    [HttpStatusCode.HttpVersionNotSupported]: 'http版本不支持该请求',
} as const

export {}
