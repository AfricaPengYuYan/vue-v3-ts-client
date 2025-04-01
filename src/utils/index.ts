/**
 * 设置 CSS 变量
 * @description 用于动态设置 CSS 变量值
 * @param {string} prop - CSS 变量名称，例如：'--el-color-primary'
 * @param {any} val - CSS 变量值，可以是任意有效的 CSS 值
 * @param {HTMLElement} document_ - 目标 DOM 元素，默认为文档根元素
 * @example
 * setCssVar('--el-color-primary', '#409eff')
 */
export function setCssVar(prop: string, val: any, document_ = document.documentElement) {
    document_.style.setProperty(prop, val)
}

/**
 * 驼峰转下划线命名
 * @description 将驼峰命名转换为下划线命名
 * @param {string} str - 需要转换的驼峰命名字符串
 * @returns {string} 转换后的下划线命名字符串
 * @example
 * humpToUnderline('userName') // 返回 'user-name'
 */
export function humpToUnderline(str: string): string {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}
