const path = require('path');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../lib'),
        publicPath: '/dist/',
        filename: 'kingdot.js',
        chunkFilename: '[id].js',
        library: 'KingDot',
        libraryExport: 'default',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            src: path.resolve(__dirname, '../src')
        }
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        },
        'src/mixin/lang.js': '../lib/mixin/lang.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /@popperjs/
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
    optimization: {
        minimize: false
    },
    plugins: [
        new ProgressBarPlugin(),
        new VueLoaderPlugin()
    ]
};
