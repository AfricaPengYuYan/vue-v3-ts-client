import {ConfigEnv, defineConfig, loadEnv, UserConfig} from 'vite'
import {createViteBuild, createVitePlugins, createViteServer} from "./vite";
import {wrapperEnv} from './vite/utils'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}: ConfigEnv): UserConfig => {
    const isBuild = command === 'build'
    const env = loadEnv(mode, process.cwd())
    const viteEnv = wrapperEnv(env)
    const {VITE_PUBLIC_PATH} = viteEnv

    return {
        base: VITE_PUBLIC_PATH,
        plugins: createVitePlugins(viteEnv, isBuild),
        server: createViteServer(viteEnv),
        build: createViteBuild(),
        resolve: {
            alias: {
                '~': resolve(__dirname, '.'),
                '@': resolve(__dirname, 'src'),
                '#': resolve(__dirname, 'types'),
            },
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        },
    }
})
