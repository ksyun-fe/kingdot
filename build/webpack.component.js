const path = require('path');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const Components = require('../components.json');

module.exports = {
    mode: 'production',
    entry: Components,
    output: {
        path: path.posix.join(process.cwd(), './lib'),
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[id].js',
        library: 'KingDot',
        libraryTarget: 'commonjs2',
        libraryExport: 'default'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            src: path.posix.join(process.cwd(), './src')
        }
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '@popperjs'
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff2?)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new VueLoaderPlugin()
    ]
};
