import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

export function configAutoImportPlugin() {
    return AutoImport({
        imports: ['vue', 'pinia'],
        resolvers: [ElementPlusResolver({importStyle: false})],
        // 指定文件生成路径
        dts: 'vite/unplugin/auto-imports.d.ts',
        eslintrc: {
            enabled: true, // Default `false`
            filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
            globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
    })
}

export function configVueComponentsPlugin() {
    return Components({
        // 用于搜索组件的目录的相对路径。
        dirs: ['src/components'],
        resolvers: [ElementPlusResolver()],
        // 指定文件生成路径
        dts: 'vite/unplugin/components.d.ts',
        // 组件的有效文件扩展名。
        extensions: ['vue'],
        // 允许子目录作为组件的命名空间前缀。
        directoryAsNamespace: false,
        deep: true,
    })
}

