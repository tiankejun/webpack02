const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const resolve = filePath => { path.resolve(__dirname, filePath)}
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name][hash:6].js',
        path: resolve('./dist'),
        // publicPath: '/'
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
            }, {
                test: /\.js$/,
                use: {
                    loader: 'async-replace-loader',
                }
            }
        ]
    },
    resolveLoader: {
        modules: ['node_modules', './src/loaders']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './assets/css/[name].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}