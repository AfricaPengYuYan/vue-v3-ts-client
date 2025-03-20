import type { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios'

export type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'>

export interface PureHttpError extends AxiosError {
    isCancelRequest?: boolean
}

export interface PureHttpResponse extends AxiosResponse {
    config: PureHttpRequestConfig
}

export interface PureHttpRequestConfig extends AxiosRequestConfig {
    beforeRequestCallback?: (request: PureHttpRequestConfig) => void
    beforeResponseCallback?: (response: PureHttpResponse) => void
    retryTimes?: number // 重试次数
    retryDelay?: number // 重试延迟
    withToken?: boolean // 是否需要token
}

export interface HttpResponse<T = any> {
    code: number
    message: string
    data: T
}

export interface HttpError {
    code: number
    message: string
}

export enum HttpStatusCode {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    RequestTimeout = 408,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HttpVersionNotSupported = 505,
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
