/*
 * ProjectName: hypergl
 * FilePath: \webpack.config.1.js
 * Created Date: Wednesday, September 5th 2018, 9:00:19 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, April 2nd 2019, 12:12:41 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


var webpack = require('webpack');
var path = require('path')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = function (env, webpackConfig) {
    return {
        //页面入口文件配置
        entry: {
            // index: `./demo/index17`,
            index: `./demo/gltf`,
            // index: `./demo/index13/index.ts`,
            // worker: `./demo/index13/worker.ts`
        },
        //入口文件输出配置
        output: {
            path: path.resolve(__dirname, 'build'),
            // library: 'HGL',
            // libraryTarget: "umd",
            filename: '[name].js',
            chunkFilename: '[name].bundle.js',
        },
        //插件项
        plugins: [
            new BrowserSyncPlugin({
                // proxy: 'localhost:80',//要代理的端口
                host: 'localhost',
                port: 5000,
                server: { baseDir: ['build'] }
            }),
            new CopyWebpackPlugin([{
                from: __dirname + '/demo/assets',
                to: __dirname + '/build/assets'
            }]),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
            })
        ],
        module: {
            //加载器配置
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        'cache-loader',
                        {
                            loader: 'thread-loader',
                            options: {
                                workers: require('os').cpus().length - 1,
                            }
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: 'tsconfig.json',
                                happyPackMode: true,
                                transpileOnly: true
                            }
                        }
                    ]
                }, {
                    test: /\.less$/,
                    use: [{
                        loader: 'style-loader',
                    }, {
                        loader: 'css-loader', // translates CSS into CommonJS
                    }, {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            // modifyVars: {
                            //     'base-color': '#f9963f',
                            //     'primary-color': '#1DA57A',
                            //     'link-color': '#1DA57A',
                            //     'border-radius-base': '2px',
                            // },
                            javascriptEnabled: true,
                        },
                    }],
                }, {
                    test: /\.(frag|vert|handlebars)$/, loader: 'handlebars-loader',
                    query: {
                        helperDirs: [
                            __dirname + "/src/graphics/shaders/helpers",
                        ]
                    }
                }

            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                'gltf-loader-ts': path.resolve(__dirname, `./src/third_party/gltf-loader-ts/source`),
                'hypergl/plugins': path.resolve(__dirname, `./plugins`),
                'hypergl': path.resolve(__dirname, `./src`),
            }
        },
        externals: [],
        devtool: 'source-map',
        mode: 'development',
        performance: { hints: false },
        // target: 'node'
    };
}