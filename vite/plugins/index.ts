import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'

import {configCompressPlugin} from "./compress";
import {configImageminPlugin} from "./imagemin";
import {configStyleImportPlugin} from "./style";
import {configAutoImportPlugin, configVueComponentsPlugin} from "./unplugin";


export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {


    const {VITE_USE_IMAGEMIN, VITE_USE_COMPRESS, VITE_COMPRESS_DELETE_ORIGIN_FILE, VITE_LEGACY} = viteEnv

    const plugins = [
        vue(),
        vueJsx(),
        vueSetupExtend()
    ]

    VITE_LEGACY && plugins.push(
        legacy({
            targets: ['ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        })
    )

    if (isBuild) {
        // vite-plugin-compress
        VITE_USE_COMPRESS && plugins.push(configCompressPlugin(VITE_COMPRESS_DELETE_ORIGIN_FILE))
        // vite-plugin-imagemin
        VITE_USE_IMAGEMIN && plugins.push(configImageminPlugin())
    }

    // vite-plugin-style-import
    plugins.push(configStyleImportPlugin())
    // unplugin-auto-import
    plugins.push(configAutoImportPlugin())
    // unplugin-vue-components
    plugins.push(configVueComponentsPlugin())

    return plugins
}