/**
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑       永不宕机     永无BUG
 *
 */

// 解决使用 unplugin-auto-import 开发时 VSCode 出现错误提示、并且无法打包问题
import 'vue-global-api'
// 使用动态图标 @purge-icons/generated 必须要引入
import '@purge-icons/generated'
import {createApp} from 'vue'

import "@/assets/styles/tailwind.css"
import "@/assets/styles/reset.scss"

import App from './App.vue'

import {setupStore} from '@/store'
import {setupRouter} from '@/router'
import {getServerConfig} from "@/config";
import {injectResponsiveStorage} from "@/utils/responsive.ts";

const app = createApp(App)
getServerConfig(app).then(async (config) => {
    injectResponsiveStorage(app, config)
    setupStore(app)
    await setupRouter(app)
        .isReady()
        .then(() => app.mount('#app'))
})

