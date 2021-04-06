'use strict';

const gulp = require('gulp');
const { series, parallel, watch } = require('gulp');

const plg_sass = require('gulp-sass');
const plg_cleanCSS = require('gulp-clean-css');
const plg_sourcemaps = require('gulp-sourcemaps');
const plg_uglify = require('gulp-uglify');

const del = require('del');

// Assets
var assets = {
  css: 'src/css/*.css',
  sass: 'src/scss/main.scss',
  js: 'src/js/*.js',
  font: ['src/css/fonts/**.*', 'src/scss/fonts/**.*'],
};

// Paths
var paths = {
  dist: 'dist',
};

// Sass
const sass = function (done) {
  gulp
    .src(assets.sass)
    .pipe(plg_sourcemaps.init())
    .pipe(plg_sass()) // Converts Sass to CSS with gulp-sass
    .pipe(plg_cleanCSS())
    .pipe(plg_sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist));
  done();
};
exports.do_sass = series(sass);

// CSS
const css = function (done) {
  gulp
    .src(assets.css)
    .pipe(plg_sourcemaps.init())
    .pipe(plg_cleanCSS())
    .pipe(plg_sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist));
  done();
};
exports.do_css = series(css);

// Js
const js = function (done) {
  gulp
    .src(assets.js)
    .pipe(plg_sourcemaps.init())
    .pipe(plg_uglify()) // Minify JS files
    .pipe(plg_sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist));
  done();
};
exports.do_js = series(js);

// Fonts
const fonts = function (done) {
  gulp
    .src(assets.font)
    .pipe(gulp.dest('dist/fonts'));
  done();
};
exports.do_fonts = series(fonts);

// Cleanup
const clean = function (done) {
  del(paths.dist);
  done();
};
exports.clean = series(clean);

// Build
exports.build = series(clean, parallel(css, sass, js, fonts));

// Watch
exports.watch = function () {
  watch(assets.sass, sass);
  watch(assets.css, css);
  watch(assets.js, js);
};
