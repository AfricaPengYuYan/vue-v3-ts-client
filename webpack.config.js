const path = require('node:path')
const CompressionPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const dotenv = require('dotenv')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')

module.exports = (env, argv) => {
    const mode = argv.mode || 'development'
    const envFiles = [
        '.env',
        `.env.${mode}`,
        '.env.local',
        `.env.${mode}.local`,
    ]

    const envConfig = envFiles.reduce((config, file) => {
        const envPath = path.resolve(__dirname, file)
        try {
            const result = dotenv.config({ path: envPath }).parsed || {}
            return { ...config, ...result }
        }
        catch (err) {
            return config
        }
    }, {})

    const isProduction = mode === 'production'

    // 设置 process.env.NODE_ENV
    process.env.NODE_ENV = mode

    return {
        mode,
        entry: './src/main.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].[contenthash:8].js',
            clean: true,
            publicPath: '/',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
            alias: {
                '~': path.resolve(__dirname, '.'),
                '@': path.resolve(__dirname, 'src'),
                '#': path.resolve(__dirname, 'types'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.(ts|tsx)$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', {
                                        useBuiltIns: 'usage',
                                        corejs: 3,
                                        targets: {
                                            browsers: [
                                                '> 0.5%',
                                                'last 2 versions',
                                                'not dead',
                                                'IE 11',
                                                'iOS 8',
                                                'Android 4.4',
                                            ],
                                        },
                                    }],
                                    '@babel/preset-typescript',
                                ],
                            },
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                appendTsSuffixTo: [/\.vue$/],
                            },
                        },
                    ],
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: ['postcss-preset-env', 'autoprefixer'],
                                },
                            },
                        },
                        'sass-loader',
                    ],
                },
            ],
        },
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        compress: {
                            drop_console: isProduction,
                            drop_debugger: isProduction,
                        },
                    },
                }),
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                chunks: 'all',
                minSize: 20000,
                maxSize: 1000000,
                minChunks: 1,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        priority: 10,
                        chunks: 'all',
                    },
                    elementPlus: {
                        name: 'element-plus',
                        test: /[\\/]node_modules[\\/]element-plus[\\/]/,
                        priority: 20,
                    },
                    vue: {
                        name: 'vue-family',
                        test: /[\\/]node_modules[\\/]@?vue/,
                        priority: 30,
                    },
                    commons: {
                        name: 'commons',
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
            runtimeChunk: {
                name: 'runtime',
            },
        },
        performance: {
            maxEntrypointSize: 1000000,
            maxAssetSize: 1000000,
        },
        plugins: [
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'index.html'),
                title: envConfig.VITE_APP_TITLE || 'Vue App',
                minify: isProduction
                    ? {
                            removeComments: true,
                            collapseWhitespace: true,
                            minifyCSS: true,
                            minifyJS: true,
                        }
                    : false,
            }),
            new DefinePlugin({
                'process.env': JSON.stringify(envConfig),
                '__VUE_OPTIONS_API__': true,
                '__VUE_PROD_DEVTOOLS__': false,
            }),
            isProduction && new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
            }),
            isProduction && new CompressionPlugin({
                test: /\.(js|css|html|svg)$/,
                threshold: 10240,
                deleteOriginalAssets: false,
            }),
        ].filter(Boolean),
    }
}
