import Cookies from 'js-cookie'

export const TokenKey = 'authorized-token'

/**
 * 获取`token`
 */
export function getToken() {
    // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
    return Cookies.get(TokenKey)
}

/**
 * 设置`token`
 * @param data
 */
export function setToken(data) {
    const {access_token} = data
    Cookies.set(TokenKey, access_token)
}

/**
 * 删除`token`
 */
export function removeToken() {
    Cookies.remove(TokenKey)
}

/**
 * 格式化token（jwt格式）
 * @param token
 */
export const formatToken = (token: string): string => {
    return 'Bearer ' + token
}
