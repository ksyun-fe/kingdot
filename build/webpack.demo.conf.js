const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const HashOutput = require('webpack-plugin-hash-output');
const version = require('../package.json').version;
const isProd = process.env.NODE_ENV === 'production';
const theme = process.env.THEME;
const publicPath = isProd ? '/kingdot/' : '/';
const cssLoader = (preprocessor) => {
    const loader = [
        isProd ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
                esModule: true
            }
        } : 'style-loader',
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    require('autoprefixer')
                ]
            }
        }
    ];
    if (preprocessor === 'stylus') {
        loader.push('stylus-loader');
    }
    return loader;
};

const entry = [
    path.resolve(__dirname, '../examples/main.js')
];

if (!isProd) {
    entry.push(path.resolve(__dirname, `../src/styles/${theme}/index.styl`));
}

const webpackConfig = {
    mode: process.env.NODE_ENV,
    entry: entry,
    output: {
        path: path.resolve(__dirname, '../docs'),
        publicPath: publicPath,
        filename: isProd ? '[name].[hash].js' : '[name].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'src': path.resolve(__dirname, '../src'),
            'examples': path.resolve(__dirname, '../examples')
        },
        modules: ['node_modules']
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
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.md$/,
                loader: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            }
                        }
                    },
                    path.resolve(__dirname, 'vue-md-loader/index.js')
                ]
            },
            {
                test: /\.css/,
                loader: cssLoader()
            },
            {
                test: /\.styl(us)?$/,
                loader: cssLoader('stylus')
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 20000,
                            name: '[name].[hash:5].min.[ext]',
                            outputPath: '/images/'
                        }
                    }
                ]
            }, {
                test: /\.(eot|ttf|svg|woff2?)$/,
                loader: 'url-loader',
                options: {
                    limit: 20000,
                    name: '[name].[hash:5].min.[ext]',
                    outputPath: '/fonts/'
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            isProd: isProd,
            devTheme: `"${theme}"`,
            publicPath: `"${publicPath}"`,
            version: `"${version}"`
        }),
        new HtmlWebpackPlugin({
            title: 'King Dot UI',
            template: './examples/index.html',
            filename: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new ProgressBarPlugin(),
        new VueLoaderPlugin()
    ],
    optimization: {
        runtimeChunk: 'single',
        minimize: false,
        minimizer: []
    },
    devtool: isProd ? false : 'source-map'
};

if (isProd) {
    webpackConfig.optimization.minimize = true;
    webpackConfig.optimization.minimizer.push(
        new TerserPlugin({
            extractComments: false,
            cache: true,
            parallel: true,
            sourceMap: true,
            terserOptions: {
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true
                },
                output: {
                    comments: false
                }
            }
        }),
        new OptimizeCSSAssetsPlugin({})
    );
    webpackConfig.optimization.splitChunks = {
        chunks: 'all',
        name: true,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                filename: 'vendors.[contenthash].js'
            },
            common: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
    };
    webpackConfig.plugins.unshift(new HashOutput());
    webpackConfig.plugins.push(
        new CleanWebpackPlugin()
    );
    webpackConfig.plugins.push(
        new InlineManifestWebpackPlugin(),
        new MiniCssExtractPlugin({
            ignoreOrder: true,
            filename: '[name].[contenthash].css'
        }),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10000
        }),
        new WebpackMd5Hash()
    );

    webpackConfig.devtool = false;
} else {
    webpackConfig.devServer = {
        contentBase: path.resolve(__dirname, '../examples/dist/'),
        host: 'localhost',
        port: 8001,
        publicPath: '/',
        hot: true
    };
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}
module.exports = webpackConfig;
