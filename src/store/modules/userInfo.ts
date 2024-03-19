import store from '@/store'

export const useUserInfoStore = defineStore('user-info', {
    state: () => ({
        // 用户信息
        userInfo: null,
        // 用户名
        userName: "",
        // 页面级别权限
        roles: []
    }),
    getters: {},
    actions: {
        /**
         * 刷新`token`
         * @param data
         */
        async handRefreshToken(data) {

        }
    },
})

export function useUserInfoStoreHook() {
    return useUserInfoStore(store)
}
