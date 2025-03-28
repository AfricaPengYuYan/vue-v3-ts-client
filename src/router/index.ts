import type { Router, RouteRecordRaw } from 'vue-router'
import { setupPermissions } from '@/permissions'
import { getHistoryMode } from '@/router/utils'
import { createRouter } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

export const constantRoutes: RouteConfigsTable[] = [
    {
        path: '/',
        name: 'Home',
        redirect: '/welcome',
        component: Layout,
        children: [
            {
                path: '/welcome',
                name: 'Index',
                component: () => import('@/pages/index'),
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/login'),
        meta: {
            title: '登录',
        },
    },
    {
        path: '/:path(.*)*',
        name: 'PageNotFound',
        component: () => import('@/pages/error/404'),
        meta: {
            title: '404',
        },
    },
]

const router: Router = createRouter({
    history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
    routes: constantRoutes as RouteRecordRaw[],
    // 是否应该禁止尾部斜杠。默认为false
    strict: true,
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve) => {
            if (savedPosition) {
                return savedPosition
            }
            else {
                if (from.meta.saveSrollTop) {
                    const top: number = document.documentElement.scrollTop || document.body.scrollTop
                    resolve({ left: 0, top })
                }
            }
        })
    },
})

export function setupRouter(app: any) {
    setupPermissions(router)
    app.use(router)
    return router
}

export default router
