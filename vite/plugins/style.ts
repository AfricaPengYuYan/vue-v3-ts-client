import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
export function configStyleImportPlugin() {
    return createStyleImportPlugin({ resolves: [ElementPlusResolve()] })
}
