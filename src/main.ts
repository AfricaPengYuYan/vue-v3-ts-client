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

import { getServerConfig } from '@/config';

import { setupRouter } from '@/router';

import { setupStore } from '@/store';
import { injectResponsiveStorage } from '@/utils/responsive.ts';

import { createApp } from 'vue';

import App from './App.vue';
// 解决使用 unplugin-auto-import 开发时 VSCode 出现错误提示、并且无法打包问题
import 'vue-global-api';
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import '@/assets/styles/tailwind.css';
// 引入重置样式
import '@/assets/styles/reset.scss';

const app = createApp(App);
getServerConfig(app).then(async (config) => {
    injectResponsiveStorage(app, config);
    setupStore(app);
    await setupRouter(app)
        .isReady()
        .then(() => app.mount('#app'));
});
