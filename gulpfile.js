'use strict';

const gulp = require('gulp');
const { series, parallel, watch } = require('gulp');

const plg_sass = require('gulp-sass');
const plg_cleanCSS = require('gulp-clean-css');
const plg_sourcemaps = require('gulp-sourcemaps');
const plg_uglify = require('gulp-uglify');
const plg_concat = require('gulp-concat');

plg_sass.compiler = require('dart-sass');

const mode = require('gulp-mode')();

const del = require('del');
const zip = require('gulp-zip');

const pjson = require('./package.json');

// Assets (used for build)
const assets = {
  css: 'src/css/*.css',
  sass: 'src/scss/main.scss', // Should only include main Sass file
  js: 'src/js/*.js',
  font: ['src/css/fonts/**.*', 'src/scss/fonts/**.*'],
};

// Watches (used for watch)
const watches = Object.assign({}, assets, { sass: 'src/scss/*.scss' });

// Paths
const paths = {
  dist: 'dist',
  pack: 'package',
};

// Package elements
const elements = ['*.php', '*.jpg', 'LICENSE', 'README.md', 'tpl/*', 'dist/*', '!dist/*.map', 'locales/**/*'];

// Sass
function sass() {
  return gulp
    .src(assets.sass)
    .pipe(mode.development(plg_sourcemaps.init()))
    .pipe(plg_sass()) // Converts Sass to CSS with gulp-sass
    .pipe(mode.production(plg_cleanCSS()))
    .pipe(mode.development(plg_sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dist));
}
exports.do_sass = series(sass);

// CSS
function css() {
  return gulp
    .src(assets.css)
    .pipe(mode.development(plg_sourcemaps.init()))
    .pipe(mode.production(plg_cleanCSS()))
    .pipe(mode.development(plg_sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dist));
}
exports.do_css = series(css);

// Js
function js() {
  return gulp
    .src(assets.js)
    .pipe(mode.development(plg_sourcemaps.init()))
    .pipe(plg_concat('main.js'))
    .pipe(mode.production(plg_uglify())) // Minify JS files
    .pipe(mode.development(plg_sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dist));
}
exports.do_js = series(js);

// Fonts
function fonts() {
  return gulp.src(assets.font).pipe(gulp.dest(paths.dist + '/fonts'));
}
exports.do_fonts = series(fonts);

// Cleanup
function clean() {
  return del('./' + paths.dist);
}
exports.clean = series(clean);

// Build
exports.build = series(clean, parallel(css, sass, js, fonts));

// Watch
function watch_sass() {
  return watch(watches.sass, sass);
}
function watch_css() {
  return watch(watches.css, css);
}
function watch_js() {
  return watch(watches.js, js);
}
function watch_font() {
  return watch(watches.font, fonts);
}
exports.watch = parallel(watch_sass, watch_css, watch_js, watch_font);

// Default = Build + watch
exports.default = series(clean, parallel(css, sass, js, fonts), parallel(watch_sass, watch_css, watch_js, watch_font));

// Package build
function prepare_pack() {
  return gulp
    .src(elements, { base: '.' })
    .pipe(gulp.dest(pjson.module + '-' + pjson.name + '-' + pjson.version + '/' + pjson.name));
}
exports.prepare_pack = series(prepare_pack);

function zip_pack() {
  return gulp
    .src(pjson.module + '-' + pjson.name + '-' + pjson.version + '/**/*')
    .pipe(zip(pjson.module + '-' + pjson.name + '-' + pjson.version + '.zip'))
    .pipe(gulp.dest(paths.pack));
}
exports.zip_pack = series(zip_pack);

function clean_pack() {
  return del('./' + pjson.module + '-' + pjson.name + '-' + pjson.version);
}
exports.clean_pack = series(clean_pack);

exports.pack = series(prepare_pack, zip_pack, clean_pack);

// Reset: keep only non generated files
exports.reset = function () {
  return del(['./' + paths.dist, './' + paths.pack]);
};
