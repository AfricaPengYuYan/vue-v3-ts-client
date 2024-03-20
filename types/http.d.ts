import {AxiosError, AxiosRequestConfig, AxiosResponse, Method} from 'axios'

declare type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'>

declare interface PureHttpError extends AxiosError {
    isCancelRequest?: boolean
}

declare interface PureHttpResponse extends AxiosResponse {
    config: PureHttpRequestConfig
}

declare interface PureHttpRequestConfig extends AxiosRequestConfig {
    beforeRequestCallback?: (request: PureHttpRequestConfig) => void
    beforeResponseCallback?: (response: PureHttpResponse) => void
}
