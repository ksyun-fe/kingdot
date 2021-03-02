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
const version = require('../../package.json').version;
const themes = require('../../src/styles/themes.js');
const rename = require('gulp-rename');
const tasks = [];

task('copyfont', () => {
    return src('../../src/styles/fonts/**')
        .pipe(cssmin())
        .pipe(dest('../../docs/fonts'));
});

tasks.push('copyfont');
themes.forEach(theme => {
    const taskName = `compile-${theme}`;
    task(taskName, () => {
        return src(`../../src/styles/${theme}/index.styl`)
            .pipe(stylus({ rawDefine: { '$-font-path': '/kingdot/fonts' }}))
            .pipe(autoprefixer({
                overrideBrowserslist: [
                    'Chrome > 31',
                    'ff > 31',
                    'ie >= 8'
                ]
            }))
            .pipe(cssmin())
            .pipe(rename(function (path) {
                return {
                    dirname: path.dirname,
                    basename: `${theme}.${version}`,
                    extname: path.extname
                };
            }))
            .pipe(dest(`../../docs`));
    });
    tasks.push(taskName);
});

exports.build = parallel(series.apply(null, tasks));
