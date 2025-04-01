import type { FunctionalComponent } from 'vue'
import type { RouteComponent, RouteLocationNormalized } from 'vue-router'

declare global {
    /** 扩展路由元信息接口 */
    interface ToRouteType extends RouteLocationNormalized {
        meta: CustomizeRouteMeta
    }

    /**
     * @description 完整子路由的`meta`配置表
     */
    interface CustomizeRouteMeta {
        /** 菜单名称（兼容国际化、非国际化，如何用国际化的写法就必须在根目录的`locales`文件夹下对应添加） `必填` */
        title: string
        /** 菜单图标 `可选` */
        icon?: string | FunctionalComponent | IconifyIcon
        /** 菜单名称右侧的额外图标 */
        extraIcon?: string | FunctionalComponent | IconifyIcon
        /** 是否在菜单中显示（默认`true`）`可选` */
        showLink?: boolean
        /** 是否显示父级菜单 `可选` */
        showParent?: boolean
        /** 页面级别权限设置 `可选` */
        roles?: Array<string>
        /** 按钮级别权限设置 `可选` */
        auths?: Array<string>
        /** 路由组件缓存（开启 `true`、关闭 `false`）`可选` */
        keepAlive?: boolean
        /** 内嵌的`iframe`链接 `可选` */
        frameSrc?: string
        /** `iframe`页是否开启首次加载动画（默认`true`）`可选` */
        frameLoading?: boolean
        /** 页面加载动画配置 `可选` */
        transition?: {
            /**
             * @description 当前路由动画效果
             * @see {@link https://next.router.vuejs.org/guide/advanced/transitions.html#transitions}
             * @see animate.css {@link https://animate.style}
             */
            name?: string
            /** 进场动画 */
            enterTransition?: string
            /** 离场动画 */
            leaveTransition?: string
        }
        /** 当前菜单名称或自定义信息禁止添加到标签页（默认`false`） */
        hiddenTag?: boolean
        /** 当前菜单名称是否固定显示在标签页且不可关闭（默认`false`） */
        fixedTag?: boolean
        /** 动态路由可打开的最大数量 `可选` */
        dynamicLevel?: number
        /** 设置该路由的激活菜单路径 `可选` */
        activePath?: string
    }

    /**
     * @description 完整子路由配置表
     */
    interface RouteChildrenConfigsTable {
        /** 子路由地址 `必填` */
        path: string
        /** 路由名字（对应不要重复，和当前组件的`name`保持一致）`必填` */
        name?: string
        /** 路由重定向 `可选` */
        redirect?: string
        /** 按需加载组件 `可选` */
        component?: RouteComponent
        /** 路由元信息 */
        meta?: CustomizeRouteMeta
        /** 子路由配置项 */
        children?: Array<RouteChildrenConfigsTable>
    }

    /**
     * @description 整体路由配置表（包括完整子路由）
     */
    interface RouteConfigsTable {
        /** 路由地址 `必填` */
        path: string
        /** 路由名字（保持唯一）`可选` */
        name?: string
        /** `Layout`组件 `可选` */
        component?: RouteComponent
        /** 路由重定向 `可选` */
        redirect?: string
        /** 路由元信息 */
        meta?: {
            /** 菜单名称（兼容国际化、非国际化）`必填` */
            title: string
            /** 菜单图标 `可选` */
            icon?: string | FunctionalComponent | IconifyIcon
            /** 是否在菜单中显示（默认`true`）`可选` */
            showLink?: boolean
            /** 菜单升序排序，值越高排的越后（只针对顶级路由）`可选` */
            rank?: number
        }
        /** 子路由配置项 */
        children?: Array<RouteChildrenConfigsTable>
    }
}

// https://router.vuejs.org/zh/guide/advanced/meta.html#typescript
declare module 'vue-router' {
    interface RouteMeta extends CustomizeRouteMeta { }
}
