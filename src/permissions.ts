import NProgress from '@/utils/progress'
import {Router} from 'vue-router'

const routesWhiteList = ['/login']

export function setupPermissions(router: Router) {
    router.beforeEach(async (to, from, next) => {
        NProgress.start()

        // 暂时设置为未登录
        // const hasToken = false
        // if (hasToken) {
        //
        // } else {
        //     if (to.path !== '/login') {
        //         if (routesWhiteList.includes(to.path)) {
        //             next()
        //         } else {
        //             next({path: '/login', replace: true})
        //         }
        //     } else {
        //         next()
        //     }
        // }

        next()
    })

    router.afterEach(async (to: any) => {
        if (NProgress.status) NProgress.done()
    })
}