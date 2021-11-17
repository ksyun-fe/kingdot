
const webpackConfig = require('../../build/webpack.test.conf.js');
module.exports = function (config) {
    config.set({
        port: 9876,
        browsers: ['Chrome'],
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['mocha', 'coverage'],
        files: ['./index.js'],
        preprocessors: {
            './index.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        exclude: ['node_modules'],
        webpackMiddleware: {
            noInfo: true,
            stats: 'errors-only'
        },
        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.'},
                { type: 'text-summary'}
            ]
        }
    });
};
