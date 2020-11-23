'use strict';

const {
    series,
    src,
    dest,
    parallel,
    task
} = require('gulp');
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

const themes = ['theme-default', 'theme'];
const tasks = [];

const compiler = (fieldPath, outputPath) => {
    return src(fieldPath)
        .pipe(stylus())
        .pipe(autoprefixer({
            overrideBrowserslist: [
                "Chrome > 31",
                "ff > 31",
                "ie >= 8"
            ]
        }))
        .pipe(cssmin())
        .pipe(dest(outputPath));
};

task('copyfont', () => {
    return src('./fonts/**')
        .pipe(cssmin())
        .pipe(dest('./lib/fonts'));
});

tasks.push('copyfont');

themes.forEach(theme => {
    const themeTask = [
        {
            taskName: `compile-${theme}`,
            filePath: `./${theme}/index.styl`,
            outputPath: `./lib/${theme}`
        },
        {
            taskName: `compile-${theme}-base`,
            filePath: `./${theme}/base.styl`,
            outputPath: `./lib/${theme}`
        },
        {
            taskName: `compile-${theme}-separate`,
            filePath: `./${theme}/src/*`,
            outputPath: `./lib/${theme}`
        }
    ];

    themeTask.forEach((item) => {
        task(item.taskName, () => {
            return compiler(item.filePath, item.outputPath);
        });
        tasks.push(item.taskName);
    });

});

exports.build = parallel(series.apply(null, tasks));
