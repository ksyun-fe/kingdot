
const webpackConfig = require('../../build/webpack.test.conf.js');
module.exports = function (config) {
    config.set({
        port: 9876,   // 端口
        browsers: ['Chrome'],   // 启动的浏览器
        frameworks: ['mocha', 'sinon-chai'],  // 可用的框架工具
        reporters: ['mocha', 'coverage'],    // 测试报告结果
        files: ['./index.js'],  // 加载到浏览器的文件
        // 浏览器使用之前处理的文件
        preprocessors: {
            './index.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        exclude: ['node_modules'],
        // 屏蔽webpack日志信息
        webpackMiddleware: {
            noInfo: true,
            stats: 'errors-only'
        },
        // 覆盖率
        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.'},
                { type: 'text-summary'}
            ]
        }
    });
};
