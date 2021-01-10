var webpack = require('webpack');
var path = require('path')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = function (env, webpackConfig) {
    return {
        //页面入口文件配置
        entry: {
            index: `./src/index`,
            'shader_file': './src/graphics/shader_file'
        },
        //入口文件输出配置
        output: {
            path: path.resolve(__dirname, 'dist'),
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
                    use: {
                        loader: "swc-loader",
                        options: {
                            sync: true,
                            jsc: {
                                parser: {
                                    syntax: "typescript"
                                }
                            }
                        }
                    }
                    // use: [
                    //     'cache-loader',
                    //     {
                    //         loader: 'thread-loader',
                    //         options: {
                    //             workers: require('os').cpus().length - 1,
                    //         }
                    //     },
                    //     {
                    //         loader: 'ts-loader',
                    //         options: {
                    //             configFile: 'tsconfig.json',
                    //             happyPackMode: true,
                    //             transpileOnly: true,
                    //             // allowTsInNodeModules: true
                    //         }
                    //     }
                    // ]
                },
                // {
                //     test: /\.(frag|vert)$/,
                //     use: 'raw-loader'
                // },
                {
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
            extensions: ['.ts', '.tsx', '.js', 'json'],
        },
        externals: [],
        devtool: 'source-map',
        mode: 'development',
        performance: { hints: false }
    };
}