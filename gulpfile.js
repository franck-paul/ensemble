'use strict';

const gulp = require('gulp');
const { series, parallel, watch } = require('gulp');

const plg_sass = require('gulp-sass');
const plg_cleanCSS = require('gulp-clean-css');
const plg_sourcemaps = require('gulp-sourcemaps');
const plg_uglify = require('gulp-uglify');

const mode = require('gulp-mode')();

const del = require('del');
const zip = require('gulp-zip');
const rename = require("gulp-rename");

const pjson = require('./package.json');

// Assets
const assets = {
  css: 'src/css/*.css',
  sass: 'src/scss/main.scss',
  js: 'src/js/*.js',
  font: ['src/css/fonts/**.*', 'src/scss/fonts/**.*'],
};

// Paths
const paths = {
  dist: 'dist',
  pack: 'package'
};

// Package elements
const elements = ['*.php', 'LICENSE', 'README.md', 'tpl/*', 'dist/*', '!dist/*.map'];

// Sass
const sass = function (done) {
  gulp
    .src(assets.sass)
    .pipe(mode.development(plg_sourcemaps.init()))
    .pipe(plg_sass()) // Converts Sass to CSS with gulp-sass
    .pipe(mode.production(plg_cleanCSS()))
    .pipe(mode.development(plg_sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dist));
  done();
};
exports.do_sass = series(sass);

// CSS
const css = function (done) {
  gulp
    .src(assets.css)
    .pipe(mode.development(plg_sourcemaps.init()))
    .pipe(mode.production(plg_cleanCSS()))
    .pipe(mode.development(plg_sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dist));
  done();
};
exports.do_css = series(css);

// Js
const js = function (done) {
  gulp
    .src(assets.js)
    .pipe(mode.development(plg_sourcemaps.init()))
    .pipe(mode.production(plg_uglify())) // Minify JS files
    .pipe(mode.development(plg_sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dist));
  done();
};
exports.do_js = series(js);

// Fonts
const fonts = function (done) {
  gulp
    .src(assets.font)
    .pipe(gulp.dest(paths.dist + '/fonts'));
  done();
};
exports.do_fonts = series(fonts);

// Cleanup
const clean = function (done) {
  del('./' + paths.dist);
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

// Package build
const pack = function (done) {
  gulp
    .src(elements, { base: '.' })
    .pipe(gulp.dest(pjson.module + '-' + pjson.name + '-' + pjson.version + '/' + pjson.name))
    .pipe(zip(pjson.module + '-' + pjson.name + '-' + pjson.version + '.zip'))
    .pipe(gulp.dest(paths.pack));
  del('./' + pjson.module + '-' + pjson.name + '-' + pjson.version);
  done();
};
exports.pack = series(pack);
