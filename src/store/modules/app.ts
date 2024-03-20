import {getToken} from "@/utils/auth.ts";
import {loginApi} from "@/api";

export const useAppStore = defineStore('app', {
    state: () => ({
        token: getToken()
    }),
    getters: {},
    actions: {
        async loginStore() {
            return new Promise((resolve, reject) => {
                loginApi().then(() => {

                })
            })
        }
    },
})

