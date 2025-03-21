import antfu from '@antfu/eslint-config'

export default antfu({
    // 严格模式
    stylistic: {
        indent: 4, // 缩进4个空格
        quotes: 'single', // 使用单引号
        semi: false, // 使用分号
        // 移除 commaDangle 配置，避免与 style/comma-dangle 冲突
    },

    // JavaScript 配置
    javascript: {
        overrides: {
            'no-console': 'off', // 允许使用 console
            'no-debugger': 'warn', // debugger 使用警告
            'prefer-const': 'error', // 优先使用 const
            'style/comma-dangle': 'off', // 关闭 style/comma-dangle 规则检查
        },
    },

    // TypeScript 配置
    typescript: {
        overrides: {
            'ts/consistent-type-imports': 'error', // 类型导入必须一致
            'ts/no-explicit-any': 'warn', // 警告使用 any
        },
    },

    // Vue 配置
    vue: {
        overrides: {
            'vue/html-indent': ['error', 4], // Vue 模板缩进4个空格
            'vue/multi-word-component-names': 'off', // 允许单个单词的组件名
        },
    },

    // 格式化配置
    formatters: {
        css: true, // 启用 CSS 格式化
        html: true, // 启用 HTML 格式化
        markdown: true, // 启用 Markdown 格式化
    },

    // 忽略文件
    ignores: ['dist', 'node_modules', '*.min.*', 'public'],

})
