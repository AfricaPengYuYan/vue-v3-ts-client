import type {Plugin} from 'vite'
import {isArray} from '@pureadmin/utils'
import compressPlugin from 'vite-plugin-compression'

export const configCompressPlugin = (deleteOriginFile = false, compress: ViteCompression) => {
    if (compress === 'none') return null

    const gz = {
        verbose: false, // 是否在控制台输出压缩结果
        disable: false, // 是否禁用
        threshold: 10240, // 文件容量大于这个值进行压缩，它将被压缩，单位为b
        ext: '.gz', // 生成的压缩包后缀
        filter: () => true, // 默认压缩.js|mjs|json|css|html后缀文件，设置成true，压缩全部文件
        deleteOriginFile, // 压缩后是否删除原始文件
    }
    const br = {
        verbose: false, // 是否在控制台输出压缩结果
        disable: false, // 是否禁用
        threshold: 10240, // 文件容量大于这个值进行压缩，它将被压缩，单位为b
        ext: '.br',
        algorithm: 'brotliCompress',
        filter: () => true, // 默认压缩.js|mjs|json|css|html后缀文件，设置成true，压缩全部文件
        deleteOriginFile, // 压缩后是否删除原始文件
    }
    // 压缩算法 可选 ['gzip','brotliCompress' ,'deflate','deflateRaw']
    const codeList = [
        {k: 'gzip', v: gz},
        {k: 'brotli', v: br},
        {k: 'both', v: [gz, br]},
    ]

    const plugins: Plugin[] = []

    codeList.forEach((item) => {
        if (compress.includes(item.k)) {
            if (compress.includes('clear')) {
                if (isArray(item.v)) {
                    item.v.forEach((vItem) => {
                        plugins.push(compressPlugin(Object.assign(vItem, {deleteOriginFile: true})))
                    })
                } else {
                    plugins.push(compressPlugin(Object.assign(item.v, {deleteOriginFile: true})))
                }
            } else {
                if (isArray(item.v)) {
                    item.v.forEach((vItem) => {
                        plugins.push(compressPlugin(vItem))
                    })
                } else {
                    plugins.push(compressPlugin(item.v))
                }
            }
        }
    })

    return plugins
}
