const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 自定义插件
const CopyTextWebpackPlugin = require('./src/plugins/CopyTextWebpackPlugin')

const resolve = filePath => { path.resolve(__dirname, filePath)}
module.exports = {
    entry: './src/index.js',
    output: {
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
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'async-replace-loader',
            //     }
            // }, 
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
        new CopyTextWebpackPlugin({
            name: 'I am a plugin'
        })
    ]
}