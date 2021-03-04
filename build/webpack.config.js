const path = require('path');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../lib'),
        publicPath: '/dist',
        filename: 'index.js',
        chunkFilename: '[id].js',
        library: 'KingDot',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        libraryExport: 'default',
        globalObject: 'typeof self !== \'undefined\' ? self : this'
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
        }
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserJSPlugin({
                extractComments: false,
                cache: true,
                parallel: true,
                terserOptions: {
                    compress: {
                        warnings: false
                    },
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /@popperjs/
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.styl(us)?$/,
                loader: ['style-loader', 'css-loader', 'stylus-loader']
            },
            {
                test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new VueLoaderPlugin()
    ]
};
