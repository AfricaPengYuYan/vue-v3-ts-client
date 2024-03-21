import {createRouter, Router, RouteRecordRaw} from 'vue-router'
import {getHistoryMode} from "@/utils";
import {setupPermissions} from "@/permissions";
import {AppRouteRecordRaw} from "#/router";

const Layout = () => import("@/layout/index.vue");

export const constantRoutes: AppRouteRecordRaw[] = [
    {
        path: '/',
        name: "Home",
        redirect: "/welcome",
        component: Layout,
        children: [
            {
                path: '/welcome',
                name: 'Index',
                component: () => import('@/pages/index'),
            }
        ]
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
            title: "404",
            breadcrumbHidden: true,
            hidden: true,
        },
    }
]

const router: Router = createRouter({
    history: getHistoryMode(),
    routes: constantRoutes as RouteRecordRaw[],
    // 是否应该禁止尾部斜杠。默认为false
    strict: true,
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve) => {
            if (savedPosition) {
                return savedPosition
            } else {
                if (from.meta.saveSrollTop) {
                    const top: number = document.documentElement.scrollTop || document.body.scrollTop
                    resolve({left: 0, top})
                }
            }
        })
    },
})

export const setupRouter = (app: any) => {
    setupPermissions(router)
    app.use(router)
    return router
}

export default router