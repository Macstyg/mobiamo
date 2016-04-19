'use strict';

var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    nano         = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-sass'),
    uglify       = require('gulp-uglify'),
    fileinclude  = require('gulp-file-include'),

    assetsStylesDistPath  = './assets/styles/dist',
    assetsScriptsDistPath = './assets/scripts/dist',

    buildStylesPath  = './',
    buildHtmlPath    = './',
    buildScriptsPath = './';

gulp.task('buildHtml', function() {
  return gulp.src(['./tpl/*.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest(buildHtmlPath));
});

gulp.task('assetsStyles', function() {
  return gulp
    .src('./assets/styles/src/mobiamo.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['> 0%'] }))
    .pipe(gulp.dest(assetsStylesDistPath))
    .pipe(nano({ autoprefixer: false }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(assetsStylesDistPath));
});

gulp.task('assetsScripts', function() {
  return gulp
    .src('./assets/scripts/src/mobiamo.js')
    .pipe(gulp.dest(assetsScriptsDistPath))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(assetsScriptsDistPath));
});

gulp.task('buildStyles', ['assetsStyles'], function() {
  return gulp
    .src([
      './vendor/flag-icon-css/css/flag-icon.min.css',
      './assets/styles/dist/mobiamo.min.css'
    ])
    .pipe(concat('build.min.css'))
    .pipe(gulp.dest(buildStylesPath));
});

gulp.task('buildScripts', ['assetsScripts'], function() {
  return gulp
    .src([
      './vendor/jquery/jquery-1.12.0.min.js',
      './assets/scripts/dist/mobiamo.min.js'
    ])
    .pipe(concat('build.min.js'))
    .pipe(gulp.dest(buildScriptsPath));
});

gulp.task('default', function() {
  gulp.start('buildHtml');
  gulp.start('assetsStyles');
  gulp.start('buildStyles');
  gulp.start('assetsScripts');
  gulp.start('buildScripts');
});

gulp.task('watch', function() {
  gulp.watch('./**/*.html', ['buildHtml']);
  gulp.watch('./assets/styles/**/*.scss', ['assetsStyles', 'buildStyles']);
  gulp.watch('./assets/scripts/**/*.js', ['assetsScripts', 'buildScripts']);
});
