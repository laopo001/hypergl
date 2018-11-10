var webpack = require('webpack');
var path = require('path')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = function (env, webpackConfig) {
    return {
        //页面入口文件配置
        entry: {
            index: `./src/index`
        },
        //入口文件输出配置
        output: {
            path: path.resolve(__dirname, 'build'),
            library: 'HGL',
            libraryTarget: "umd",
            filename: '[name].js'
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
            }])
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
                },
                // {
                //     test: /\.(frag|vert)$/,
                //     use: 'raw-loader'
                // },
                { test: /\.(frag|vert|handlebars)$/, loader: 'handlebars-loader' }

            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                'gltf-loader-ts': path.resolve(__dirname, `./src/third_party/gltf-loader-ts/source`)
            }
        },
        externals: [],
        devtool: 'source-map',
        mode: 'development',
        performance: { hints: false }
    };
}