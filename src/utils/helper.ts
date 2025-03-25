/**
 * 判断值是否为数组
 * @param {any} val - 要检查的值
 * @returns {boolean} - 如果是数组返回true，否则返回false
 */
export const isArray = (val: any): val is any[] => Array.isArray(val)

/**
 * 判断值是否为对象
 * @param {any} val - 要检查的值
 * @returns {boolean} - 如果是对象返回true，否则返回false
 */
export const isObject = (val: any): val is Record<any, any> => val !== null && typeof val === 'object'

/**
 * 判断值是否为字符串
 * @param {any} val - 要检查的值
 * @returns {boolean} - 如果是字符串返回true，否则返回false
 */
export const isString = (val: unknown): val is string => typeof val === 'string'

/**
 * 安全地获取对象属性值
 * @param {Record<string, any>} obj - 源对象
 * @param {string} path - 属性路径，例如 'user.name'
 * @param {any} defaultValue - 默认值
 * @returns {any} - 属性值或默认值
 */
export function get(obj: Record<string, any>, path: string, defaultValue?: any): any {
    const travel = (regexp: RegExp) =>
        String.prototype.split
            .call(path, regexp)
            .filter(Boolean)
            .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj)
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
    return result === undefined || result === obj ? defaultValue : result
}

/**
 * 防抖函数
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} - 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
    let timeout: NodeJS.Timeout
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        clearTimeout(timeout)
        timeout = setTimeout(() => fn.apply(this, args), delay)
    }
}

/**
 * 节流函数
 * @param {Function} fn - 要执行的函数
 * @param {number} interval - 间隔时间（毫秒）
 * @returns {Function} - 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(fn: T, interval: number) {
    let last = 0
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        const now = Date.now()
        if (now - last >= interval) {
            last = now
            fn.apply(this, args)
        }
    }
}
