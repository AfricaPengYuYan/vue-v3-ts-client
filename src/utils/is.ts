const toString = Object.prototype.toString

/**
 * 检查值是否为指定类型
 * @param val 要检查的值
 * @param type 类型名称
 * @returns 是否为指定类型
 */
export function is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`
}

/**
 * 检查值是否已定义
 * @param val 要检查的值
 * @returns 是否已定义
 */
export function isDef<T = unknown>(val?: T): val is T {
    return typeof val !== 'undefined'
}

/**
 * 检查值是否未定义
 * @param val 要检查的值
 * @returns 是否未定义
 */
export function isUnDef<T = unknown>(val?: T): val is T {
    return !isDef(val)
}

/**
 * 检查值是否为对象
 * @param val 要检查的值
 * @returns 是否为对象
 */
export function isObject(val: any): val is Record<any, any> {
    return val !== null && is(val, 'Object')
}

/**
 * 检查值是否为空
 * @param val 要检查的值
 * @returns 是否为空
 */
export function isEmpty<T = unknown>(val: T): val is T {
    if (isArray(val) || isString(val)) {
        return val.length === 0
    }

    if (val instanceof Map || val instanceof Set) {
        return val.size === 0
    }

    if (isObject(val)) {
        return Object.keys(val).length === 0
    }

    return false
}

/**
 * 检查值是否为日期
 * @param val 要检查的值
 * @returns 是否为日期
 */
export function isDate(val: unknown): val is Date {
    return is(val, 'Date')
}

/**
 * 检查值是否为 null
 * @param val 要检查的值
 * @returns 是否为 null
 */
export function isNull(val: unknown): val is null {
    return val === null
}

/**
 * 检查值是否为 null 且未定义
 * @param val 要检查的值
 * @returns 是否为 null 且未定义
 */
export function isNullAndUnDef(val: unknown): val is null | undefined {
    return isUnDef(val) && isNull(val)
}

/**
 * 检查值是否为 null 或未定义
 * @param val 要检查的值
 * @returns 是否为 null 或未定义
 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
    return isUnDef(val) || isNull(val)
}

/**
 * 检查值是否为数字
 * @param val 要检查的值
 * @returns 是否为数字
 */
export function isNumber(val: unknown): val is number {
    return is(val, 'Number')
}

/**
 * 检查值是否为 Promise
 * @param val 要检查的值
 * @returns 是否为 Promise
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * 检查值是否为字符串
 * @param val 要检查的值
 * @returns 是否为字符串
 */
export function isString(val: unknown): val is string {
    return is(val, 'String')
}

/**
 * 检查值是否为函数
 * @param val 要检查的值
 * @returns 是否为函数
 */
export function isFunction(val: unknown): val is Function {
    return typeof val === 'function'
}

/**
 * 检查值是否为布尔值
 * @param val 要检查的值
 * @returns 是否为布尔值
 */
export function isBoolean(val: unknown): val is boolean {
    return is(val, 'Boolean')
}

/**
 * 检查值是否为正则表达式
 * @param val 要检查的值
 * @returns 是否为正则表达式
 */
export function isRegExp(val: unknown): val is RegExp {
    return is(val, 'RegExp')
}

/**
 * 检查值是否为数组
 * @param val 要检查的值
 * @returns 是否为数组
 */
export function isArray(val: any): val is Array<any> {
    return val && Array.isArray(val)
}

/**
 * 检查值是否为 Window 对象
 * @param val 要检查的值
 * @returns 是否为 Window 对象
 */
export function isWindow(val: any): val is Window {
    return typeof window !== 'undefined' && is(val, 'Window')
}

/**
 * 检查值是否为 HTML 元素
 * @param val 要检查的值
 * @returns 是否为 HTML 元素
 */
export function isElement(val: unknown): val is Element {
    return isObject(val) && !!val.tagName
}

/**
 * 检查值是否为 Map
 * @param val 要检查的值
 * @returns 是否为 Map
 */
export function isMap(val: unknown): val is Map<any, any> {
    return is(val, 'Map')
}

/**
 * 检查是否为服务端环境
 * @returns 是否为服务端环境
 */
export const isServer = typeof window === 'undefined'

/**
 * 检查是否为客户端环境
 * @returns 是否为客户端环境
 */
export const isClient = !isServer

/**
 * 检查路径是否为 URL
 * @param path 要检查的路径
 * @returns 是否为 URL
 */
export function isUrl(path: string): boolean {
    try {
        new URL(path)
        return true
    }
    catch (_error) {
        return false
    }
}

/**
 * 检查是否为深色模式
 * @returns 是否为深色模式
 */
export function isDark(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * 检查路径是否为图片链接
 * @param path 要检查的路径
 * @returns 是否为图片链接
 */
export function isImgPath(path: string): boolean {
    return /(https?:\/\/|data:image\/).*?\.(png|jpg|jpeg|gif|svg|webp|ico)/i.test(path)
}

/**
 * 检查值是否为空值
 * @param val 要检查的值
 * @returns 是否为空值
 */
export function isEmptyVal(val: any): boolean {
    return val === '' || val === null || val === undefined
}
