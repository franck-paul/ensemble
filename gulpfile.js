'use strict';

import { src, dest } from 'gulp';
import { series, parallel, watch } from 'gulp';

const plg_sass = require('gulp-sass')(require('sass')); //sass-css
import plg_cleanCSS from 'gulp-clean-css';
import { init, write } from 'gulp-sourcemaps';
import plg_uglify from 'gulp-uglify';
import plg_concat from 'gulp-concat';
import plg_removeUseStrict from 'gulp-remove-use-strict';

plg_sass.compiler = require('dart-sass');

const mode = require('gulp-mode')();

import del from 'del';
import zip from 'gulp-zip';

import { module, name, version } from './package.json';

// Assets (used for build)
const assets = {
  css: 'src/css/*.css',
  sass: 'src/scss/main.scss', // Should only include main Sass file
  js: ['src/js/main.js', 'src/js/*.js'], // Include main.js first
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
  return src(assets.sass)
    .pipe(mode.development(init()))
    .pipe(plg_sass()) // Converts Sass to CSS with gulp-sass
    .pipe(mode.production(plg_cleanCSS()))
    .pipe(mode.development(write('.')))
    .pipe(dest(paths.dist));
}
export const do_sass = series(sass);

// CSS
function css() {
  return src(assets.css)
    .pipe(mode.development(init()))
    .pipe(mode.production(plg_cleanCSS()))
    .pipe(mode.development(write('.')))
    .pipe(dest(paths.dist));
}
export const do_css = series(css);

// Js
function js() {
  return src(assets.js)
    .pipe(mode.development(init()))
    .pipe(plg_concat('main.js'))
    .pipe(plg_removeUseStrict())
    .pipe(mode.production(plg_uglify())) // Minify JS files
    .pipe(mode.development(write('.')))
    .pipe(dest(paths.dist));
}
export const do_js = series(js);

// Fonts
function fonts() {
  return src(assets.font).pipe(dest(`${paths.dist}/fonts`));
}
export const do_fonts = series(fonts);

// Cleanup
function clean() {
  return del(`./${paths.dist}`);
}
const _clean = series(clean);
export { _clean as clean };

export const build = series(clean, parallel(css, sass, js, fonts));

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
const _watch = parallel(watch_sass, watch_css, watch_js, watch_font);
export { _watch as watch };

// Default = Build + watch
const _default = series(clean, parallel(css, sass, js, fonts), parallel(watch_sass, watch_css, watch_js, watch_font));
export { _default as default };

// Package build
function prepare_pack() {
  return src(elements, { base: '.' }).pipe(dest(`${module}-${name}-${version}/${name}`));
}
const _prepare_pack = series(prepare_pack);
export { _prepare_pack as prepare_pack };

function zip_pack() {
  return src(`${module}-${name}-${version}/**/*`)
    .pipe(zip(`${module}-${name}-${version}.zip`))
    .pipe(dest(paths.pack));
}
const _zip_pack = series(zip_pack);
export { _zip_pack as zip_pack };

function clean_pack() {
  return del(`./${module}-${name}-${version}`);
}
const _clean_pack = series(clean_pack);
export { _clean_pack as clean_pack };

export const pack = series(prepare_pack, zip_pack, clean_pack);

// Reset: keep only non generated files
export function reset() {
  return del([`./${paths.dist}`, `./${paths.pack}`]);
}
