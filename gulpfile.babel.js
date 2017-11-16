const gulp         = require('gulp');
const sass         = require('gulp-sass');
const postcss      = require('gulp-postcss');
const cleancss     = require('gulp-clean-css');
const autoprefixer = require('autoprefixer');
const del          = require('del');
const imagemin     = require('gulp-imagemin');
const svgmin       = require('gulp-svgmin');
const rename       = require('gulp-rename');
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify');

const globs = {
  js: [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/popper.js/dist/umd/popper.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './_assets/js/**/*.js',
  ],
  stylesheets: './_assets/scss/**/*.scss',
  images: './_assets/images/**/*.{png,gif,jpg,jpeg}',
  svg: './_assets/svgs/**/*.svg',
  fonts: './_assets/fonts/*.{eot,svg,ttf,woff,woff2}'
}

const paths = {
  build: './assets',
  js: './assets/js',
  stylesheets: './assets/stylesheets',
  images: './assets/images',
  svg: './assets/svg',
  fonts: './assets/fonts'
}

// Default
gulp.task('default', ['js', 'sass', 'images', 'svg', 'fonts'], () => {
  gulp.watch(globs.js, ['js']);
  gulp.watch(globs.stylesheets, ['sass']);
  gulp.watch(globs.images, ['images']);
  gulp.watch(globs.svg, ['svg']);
  gulp.watch(globs.fonts, ['fonts']);
});

// JavaScripts
gulp.task('js', () => {
  return gulp.src(globs.js)
    .pipe(concat('application.js'))
    .pipe(rename('application.min.js'))
    .pipe(gulp.dest(paths.js));
});

// SASS
gulp.task('sass', () => {
  return gulp.src(globs.stylesheets)
    .pipe(sass(
      {
        includePaths: [
          './node_modules/bootstrap/scss/',

        ]
      }
    ).on('error', sass.logError))
    .pipe(postcss())
    .pipe(gulp.dest(paths.stylesheets));
});

// Images
gulp.task('images', () => {
  return gulp.src(globs.images)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images))
});

// SVG
gulp.task('svg', () => {
  return gulp.src(globs.svg)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.svg))
});

// Fonts
gulp.task('fonts', () => {
  return gulp.src(globs.fonts)
    .pipe(gulp.dest(paths.fonts))
});

// Clean
gulp.task('clean', () => {
  return del([paths.build]);
});
