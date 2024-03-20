import type {Plugin} from "vite";
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'

import {configCompressPlugin} from "./compress";
import {configImageminPlugin} from "./imagemin";
import {configStyleImportPlugin} from "./style";
import {configAutoImportPlugin, configVueComponentsPlugin, configVueIconsPlugin} from "./unplugin";

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
    const {
        VITE_USE_IMAGEMIN,
        VITE_USE_COMPRESS,
        VITE_COMPRESS_DELETE_ORIGIN_FILE,
        VITE_LEGACY,
        VITE_COMPRESSION
    } = viteEnv

    const plugins = [
        vue(),
        vueJsx(),
        vueSetupExtend()
    ]


    if (VITE_LEGACY) {
        const setupLegacy = () => {
            return legacy({
                targets: ['defaults', 'ie >= 11', 'chrome 52'],
                additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
                renderLegacyChunks: true,
                polyfills: [
                    'es.symbol',
                    'es.array.filter',
                    'es.promise',
                    'es.promise.finally',
                    'es/map',
                    'es/set',
                    'es.array.for-each',
                    'es.object.define-properties',
                    'es.object.define-property',
                    'es.object.get-own-property-descriptor',
                    'es.object.get-own-property-descriptors',
                    'es.object.keys',
                    'es.object.to-string',
                    'web.dom-collections.for-each',
                    'esnext.global-this',
                    'esnext.string.match-all'
                ]
            })
        }
        plugins.push(setupLegacy())
    }

    if (isBuild) {
        // vite-plugin-compress
        VITE_USE_COMPRESS && plugins.push(configCompressPlugin(VITE_COMPRESS_DELETE_ORIGIN_FILE, VITE_COMPRESSION))
        // vite-plugin-imagemin
        VITE_USE_IMAGEMIN && plugins.push(configImageminPlugin())
    }

    // vite-plugin-style-import
    plugins.push(configStyleImportPlugin())
    // unplugin-auto-import
    plugins.push(configAutoImportPlugin())
    // unplugin-vue-components
    plugins.push(configVueComponentsPlugin())
    // unplugin-icons
    plugins.push(configVueIconsPlugin())

    return plugins
}