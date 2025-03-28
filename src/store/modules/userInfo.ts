import store from '@/store'
import { getToken } from '@/utils/auth'

export const useUserInfoStore = defineStore('userInfo', {
    state: () => ({
        // 令牌
        token: getToken(),
        // 用户信息
        userInfo: null,
        // 用户名
        userName: '',
        // 用户头像
        avatar: '',
        // 角色权限
        roles: [],
        // 页面权限
        permissions: [],
        // 记住我
        rememberMe: false,
    }),
    getters: {},
    actions: {
        async loginStore() {},
        /**
         * 刷新`token`
         * @param data
         */
        async handRefreshToken() {},
        async logout() {},
    },
})

export function useUserInfoStoreHook() {
    return useUserInfoStore(store)
}
