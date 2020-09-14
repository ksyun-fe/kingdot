'use strict';

const { series, src, dest, parallel, task } = require('gulp');
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

task('compileStyl',() => {
    let str = './theme-default/src/*.styl';
    return src(str)
        .pipe(stylus())
        .pipe(autoprefixer({
            overrideBrowserslist: [
                "Chrome > 31",
                "ff > 31",
                "ie >= 8"
            ]
        }))
        .pipe(cssmin())
        .pipe(dest('./lib/theme-default'));
})
task('copyfont', () => {
    return src('../fonts/**')
        .pipe(cssmin())
        .pipe(dest('./lib/fonts'));
})
task('compileStylOther',() => {
    let str = './theme/src/*.styl';
    return src(str)
        .pipe(stylus())
        .pipe(autoprefixer({
            overrideBrowserslist: [
                "Chrome > 31",
                "ff > 31",
                "ie >= 8"
            ]
        }))
        .pipe(cssmin())
        .pipe(dest('./lib/theme'));
})

exports.build = parallel(series('compileStyl', 'copyfont'),series('compileStylOther', 'copyfont'));
