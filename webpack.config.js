const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 自定义插件
const CopyTextWebpackPlugin = require('./src/plugins/CopyTextWebpackPlugin')
const resolve = filePath => path.resolve(__dirname, filePath)
const joinPath = filePath => path.join(__dirname, filePath)
// 多页面自动化配置解决方案
const getMultiPageConfig = () => {
    const entries = {}
    const htmpWebpackPlugins = []
    const filePathList = glob.sync(joinPath('./src/pages/*/index.js'))
    filePathList.map(filePath => {
        const match = filePath.match(/src\/pages\/(.*)\/index.js$/)
        // console.log(match);
        const pageName = match[1] // pages下面的文件夹名称
        entries[pageName] = filePath
        htmpWebpackPlugins.push(new HtmlWebpackPlugin({
            template: joinPath(`./src/pages/${pageName}/index.html`),
            filename: `pages/${pageName}.html`,
            chunks: [pageName]
        }))
    })
    return {
        entries,
        htmpWebpackPlugins
    }
}
const {entries, htmpWebpackPlugins} = getMultiPageConfig()
// 多页面配置替换是那个地方
// 1/ entry
// 2/ output.filename
// 3/ plugins: [...htmpWebpackPlugins]

module.exports = {
    entry: './src/index.js',
    // entry: entries,
    output: {
        // filename: 'pages/[name][hash:6].js',
        filename: '[name][hash:6].js',
        path: resolve('./dist'),
        // publicPath: '/'
    },
    devServer: {
        open: true,
        hot: true,
        proxy: {
            '^api/': {
                target: ''
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../../'
                    }
                }, 'css-loader']
            },
            {
                test: /\.less$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../../'
                    }
                }, 'css-loader', 'postcss-loader', 'less-loader']
            }, {
                test: /\.png|jpe?g|gif$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './assets/images/',
                        limit: 1024 * 3
                    }
                }
            }, {
                test: /\.woff2$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './assets/font/',
                        limit: 1024 * 3
                    }
                }
            }, {
                test: /\.js$/,
                use: {
                    loader: 'replace-loader',
                    options: {
                        name: 'params01'
                    }
                }
            }, 
            {
                test: /\.js$/,
                use: {
                    loader: 'async-replace-loader',
                }
            }, 
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolveLoader: {
        modules: ['node_modules', './src/loaders']
    },
    plugins: [
        new CleanWebpackPlugin(),
        // webpack 自带热模块加载
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: './assets/css/[name].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // ...htmpWebpackPlugins,
        new CopyTextWebpackPlugin({
            name: 'I am a plugin'
        })
    ]
}