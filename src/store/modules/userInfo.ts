import store from '@/store'

export const useUserInfoStore = defineStore('userInfo', {
    state: () => ({
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
    }),
    getters: {},
    actions: {
        /**
         * 刷新`token`
         * @param data
         */
        async handRefreshToken(data) {},
        async logout() {},
    },
})

export function useUserInfoStoreHook() {
    return useUserInfoStore(store)
}
