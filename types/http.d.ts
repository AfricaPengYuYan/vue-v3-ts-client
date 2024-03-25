import {AxiosError, AxiosRequestConfig, AxiosResponse, Method} from 'axios'

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
}
