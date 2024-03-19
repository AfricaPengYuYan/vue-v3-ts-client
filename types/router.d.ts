import type {RouteMeta, RouteRecordRaw} from 'vue-router'

export type Component<T = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>)


/**
 * 路由记录
 */
declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'name' | 'meta' | 'children'> {
    name: string
    meta: RouteMeta
    component?: Component | string
    components?: Component
    children?: AppRouteRecordRaw[]
    childrenPathList?: string[]
    props?: Recordable
    fullPath?: string
    redirect?: string
}
