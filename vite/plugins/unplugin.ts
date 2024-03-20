import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import {FileSystemIconLoader} from 'unplugin-icons/loaders'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import PurgeIcons from 'vite-plugin-purge-icons'

export function configAutoImportPlugin() {
    return AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [ElementPlusResolver({importStyle: false})],
        // 指定文件生成路径
        dts: 'vite/unplugin/auto-imports.d.ts',
        eslintrc: {
            enabled: true, // Default `false`
            filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
            globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
    })
}

export function configVueComponentsPlugin() {
    return Components({
        // 用于搜索组件的目录的相对路径。
        dirs: ['src/components'],
        resolvers: [
            ElementPlusResolver(),
            //  {prefix}-{collection}-{icon}
            IconsResolver({prefix: 'icon', customCollections: ['custom']}),
        ],
        // 指定文件生成路径
        dts: 'vite/unplugin/components.d.ts',
        // 组件的有效文件扩展名。
        extensions: ['vue', 'tsx', 'jsx'],
        // 允许子目录作为组件的命名空间前缀。
        directoryAsNamespace: false,
        deep: true,
    })
}

export function configVueIconsPlugin() {
    return Icons({
        compiler: 'vue3',
        customCollections: {
            // 这里是存放svg图标的文件地址，custom是自定义图标库的名称
            custom: FileSystemIconLoader('./src/assets/icons'),
        },
        autoInstall: true,
    })
}

export function configVuePurgeIconsPlugin() {
    return PurgeIcons({
        /* PurgeIcons Options */
        // globs for searching source file to analyze
        content: ['**/*.vue'], // scan for .vue file as well
        format: 'mjs',
    })
}
