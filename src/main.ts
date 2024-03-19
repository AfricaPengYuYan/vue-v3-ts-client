// 解决使用 unplugin-auto-import 开发时 VSCode 出现错误提示、并且无法打包问题
import 'vue-global-api'
import {createApp} from 'vue'
import App from './App.vue'
import {setupStore} from '@/store'
import {setupRouter} from '@/router'
import {getServerConfig} from "@/config";
import {injectResponsiveStorage} from "@/utils/responsive.ts";

import './style.css'

const app = createApp(App)
getServerConfig(app).then(async (config) => {
    injectResponsiveStorage(app, config)
    setupStore(app)
    await setupRouter(app)
        .isReady()
        .then(() => app.mount('#app'))
})

