/**
 * 设置 CSS 变量
 * @param prop CSS 变量名称
 * @param val CSS 变量值
 * @param document_ DOM 元素,默认为文档根元素
 */
export function setCssVar(prop: string, val: any, document_ = document.documentElement) {
    document_.style.setProperty(prop, val)
}
