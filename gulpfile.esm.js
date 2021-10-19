// Gulp tasks
//
// Usage:
//
// 1. Build sass files in sass folder without any minifications
//    npm run gulp
//
// 2. Build and minify files into dist
//    npm run gulp build

import {task, src, dest, watch, series, parallel} from 'gulp';
import gulpSass from 'gulp-sass';
import sassCompiler from 'sass';
import browserSync from 'browser-sync';
import gulpTerser from 'gulp-terser';
import gulpCleanCss from 'gulp-clean-css';
import gulpJsonMinify from 'gulp-jsonminify';
import gulpSourceMaps from 'gulp-sourcemaps';
import del from 'del';

const sass = gulpSass(sassCompiler);
const browser = browserSync.create();

let output = 'src';

task('copy:font', function (callback) {
  return src('src/font/**/*').pipe(dest(output + '/font'));
});
task('copy:vendorcss', function (callback) {
  return src('src/css/vendor/*').pipe(dest(output + '/css/vendor'));
});
task('copy:img', function (callback) {
  return src('src/img/**/*').pipe(dest(output + '/img'));
});
task('copy:js', function (callback) {
  return src('src/js/**/*').pipe(dest(output + '/js'));
});
task('copy:json', function (callback) {
  return src('src/json/*').pipe(dest(output + '/json'));
});

task('build:sass', function (callback) {
  return src('src/sass/*.scss')
    .pipe(gulpSourceMaps.init())
    .pipe(sass())
    .pipe(gulpSourceMaps.write())
    .pipe(dest(output + '/css'));
});

task('minify:js', function (callback) {
  return src(['src/js/**/*.js', '!src/js/**/*.min.js'])
    .pipe(gulpTerser())
    .pipe(dest(output + '/js'));
});

task('minify:json', function (callback) {
  return src('src/json/*')
    .pipe(gulpJsonMinify())
    .pipe(dest(output + '/json'));
});

task('minify:sass', function (callback) {
  return src('src/sass/*.scss')
    .pipe(sass())
    .pipe(gulpCleanCss({zindex: false}))
    .pipe(dest(output + '/css'));
});
task('minify:css', function (callback) {
  return src('src/css/*.css')
    .pipe(gulpCleanCss({zindex: false}))
    .pipe(dest(output + '/css'));
});

task('reload', function (callback) {
  browser.reload();
  callback();
});

task('sync', function (callback) {
  browser.init({
    server: {
      baseDir: './',
    },
    notify: false,
    startPath: '/pages/affiliator/auth/login.html',
  });
  callback();
});

task('watch', function (callback) {
  watch('src/sass/**/*', series('build:sass', 'reload'));
  watch('src/js/**/*.js', series('reload'));
  watch('src/css/**/*', series('reload'));
  watch('src/json/**/*', series('reload'));
  watch('src/font/**/*', series('reload'));
  watch('src/img/**/*', series('reload'));
  watch('pages/**/*.html', series('reload'));
  callback();
});

task('clean:output', function (callback) {
  return del(output);
});

task('mode:dev', function (callback) {
  output = 'src';
  callback();
});

task('mode:build', function (callback) {
  output = 'dist';
  callback();
});

task('default', series('mode:dev', 'build:sass', parallel('sync', 'watch')));

task(
  'build',
  series(
    'mode:build',
    'clean:output',
    'copy:font',
    'copy:vendorcss',
    'minify:css',
    'copy:img',
    'minify:json',
    'copy:js',
    'minify:js',
    'minify:sass',
  ),
);
