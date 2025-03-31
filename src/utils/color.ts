/**
 * 判断是否是十六进制颜色值
 * 输入形式可为 #fff000 #f00
 *
 * @param   {string}  color   十六进制颜色值
 * @return  {boolean} 是否是有效的十六进制颜色值
 */
export function isHexColor(color: string) {
    const reg = /^#([0-9a-fA-F]{3}|[0-9A-f]{6})$/
    return reg.test(color)
}

/**
 * RGB 颜色值转换为十六进制颜色值
 * r, g, 和 b 需要在 [0, 255] 范围内
 *
 * @param   {number} r 红色值
 * @param   {number} g 绿色值
 * @param   {number} b 蓝色值
 * @return  {string} 返回类似 #ff00ff 的颜色值
 */
export function rgbToHex(r: number, g: number, b: number) {
    // tslint:disable-next-line:no-bitwise
    const hex = ((r << 16) | (g << 8) | b).toString(16)
    return `#${Array.from({ length: Math.abs(hex.length - 7) }).join('0')}${hex}`
}

/**
 * 十六进制颜色值转换为 RGB/RGBA 颜色值
 * @param {string} hex 要转换的十六进制颜色值
 * @param {number} [opacity] 透明度，可选
 * @returns {string} RGB/RGBA 格式的颜色值
 */
export function hexToRGB(hex: string, opacity?: number) {
    let sHex = hex.toLowerCase()
    if (isHexColor(hex)) {
        if (sHex.length === 4) {
            let sColorNew = '#'
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sHex.slice(i, i + 1).concat(sHex.slice(i, i + 1))
            }
            sHex = sColorNew
        }
        const sColorChange: number[] = []
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(Number.parseInt(`0x${sHex.slice(i, i + 2)}`))
        }
        return opacity
            ? `RGBA(${sColorChange.join(',')},${opacity})`
            : `RGB(${sColorChange.join(',')})`
    }
    return sHex
}

/**
 * 判断颜色是否为深色
 * @param {string} color 十六进制颜色值
 * @returns {boolean} 如果是深色返回 true，浅色返回 false
 */
export function colorIsDark(color: string) {
    if (!isHexColor(color))
        return
    const [r, g, b] = hexToRGB(color)
        .replace(/(?:\(|\)|rgb|RGB)*/g, '')
        .split(',')
        .map(item => Number(item))
    return r * 0.299 + g * 0.578 + b * 0.114 < 192
}

/**
 * 使十六进制颜色变暗
 * @param {string} color 要处理的颜色
 * @param {number} amount 要改变的数值（百分比）
 * @returns {string} 处理后的十六进制颜色值
 */
export function darken(color: string, amount: number) {
    color = color.includes('#') ? color.substring(1, color.length) : color
    amount = Math.trunc((255 * amount) / 100)
    return `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(
        color.substring(2, 4),
        amount,
    )}${subtractLight(color.substring(4, 6), amount)}`
}

/**
 * 使十六进制颜色变亮
 * @param {string} color 要处理的颜色
 * @param {number} amount 要改变的数值（百分比）
 * @returns {string} 处理后的十六进制颜色值
 */
export function lighten(color: string, amount: number) {
    color = color.includes('#') ? color.substring(1, color.length) : color
    amount = Math.trunc((255 * amount) / 100)
    return `#${addLight(color.substring(0, 2), amount)}${addLight(
        color.substring(2, 4),
        amount,
    )}${addLight(color.substring(4, 6), amount)}`
}

/**
 * 增加颜色分量的明度
 * @param {string} color 要处理的颜色分量
 * @param {number} amount 要增加的数值
 * @returns {string} 处理后的颜色分量
 */
function addLight(color: string, amount: number) {
    const cc = Number.parseInt(color, 16) + amount
    const c = cc > 255 ? 255 : cc
    return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

/**
 * 计算 RGB 颜色的亮度
 * @param {number} r 红色值
 * @param {number} g 绿色值
 * @param {number} b 蓝色值
 * @returns {number} 颜色亮度值
 */
function luminanace(r: number, g: number, b: number) {
    const a = [r, g, b].map((v) => {
        v /= 255
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
    })
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

/**
 * 计算两个 RGB 颜色之间的对比度
 * @param {string[]} rgb1 第一个 RGB 颜色
 * @param {number[]} rgb2 第二个 RGB 颜色
 * @returns {number} 对比度值
 */
function contrast(rgb1: string[], rgb2: number[]) {
    return (
        (luminanace(~~rgb1[0], ~~rgb1[1], ~~rgb1[2]) + 0.05)
        / (luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05)
    )
}

/**
 * 根据背景色计算最佳文本颜色(黑色或白色)
 * @param {string} hexColor - 十六进制颜色值(例如: '#FFFFFF')
 * @returns {string} 返回 '#000000' 或 '#FFFFFF'
 */
export function calculateBestTextColor(hexColor: string) {
    const rgbColor = hexToRGB(hexColor.substring(1))
    const contrastWithBlack = contrast(rgbColor.split(','), [0, 0, 0])

    return contrastWithBlack >= 12 ? '#000000' : '#FFFFFF'
}

/**
 * 将指定数值从十六进制颜色分量中减去
 * @param {string} color - 需要处理的颜色分量(例如: 'FF')
 * @param {number} amount - 要减去的数值
 * @returns {string} 处理后的颜色分量
 */
function subtractLight(color: string, amount: number) {
    const cc = Number.parseInt(color, 16) - amount
    const c = cc < 0 ? 0 : cc
    return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

/**
 * 混合两个颜色
 * @param {string} color1 - 第一个颜色(六位十六进制颜色代码,以'#'开头)
 * @param {string} color2 - 第二个颜色(六位十六进制颜色代码,以'#'开头)
 * @param {number} [weight] - color1的权重(0-1之间的数值,0表示完全使用color2,1表示完全使用color1)
 * @returns {string} 混合后的颜色(六位十六进制颜色代码,以'#'开头)
 */
export function mix(color1: string, color2: string, weight: number = 0.5): string {
    let color = '#'
    for (let i = 0; i <= 2; i++) {
        const c1 = Number.parseInt(color1.substring(1 + i * 2, 3 + i * 2), 16)
        const c2 = Number.parseInt(color2.substring(1 + i * 2, 3 + i * 2), 16)
        const c = Math.round(c1 * weight + c2 * (1 - weight))
        color += c.toString(16).padStart(2, '0')
    }
    return color
}
