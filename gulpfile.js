var gulp = require('gulp');
var sync = require('browser-sync').create();
var reload = sync.reload;
var del = require('del');
var path = require('path');
var webpack = require('gulp-webpack');
var sftp = require('gulp-sftp');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');

var options = {
  html: 'htdocs/**/*.html',
  css: 'css/site.css',
  js: 'js/**/*.js',
  templates: 'templates/*.html',
  images: 'images/**/*'
};

gulp.task('clean', function(cb) {
  del(['build/*', '!build/components'], cb);
});

gulp.task('html', function() {
  return gulp.src(options.html)
    .pipe(gulp.dest('build'))
    .pipe(reload({stream: true}));
});

gulp.task('css', function() {
  return gulp.src(options.css)
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(reload({stream: true}));
});

gulp.task('js', function() {
  return gulp.src(options.js)
    .pipe(webpack({
      entry: './js/app.js',
      output: {
        filename: 'app.js'
      }
    }))
    .pipe(gulp.dest('build/js'))
    .pipe(reload({stream: true}));
});

gulp.task('templates', function() {
  return gulp.src(options.templates)
    .pipe(gulp.dest('build/templates'))
    .pipe(reload({stream: true}));
});

gulp.task('images', function() {
  return gulp.src(options.images)
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('build/images'))
    .pipe(reload({stream: true}));
});

gulp.task('build', ['html', 'css', 'js', 'templates', 'images']);

gulp.task('watch', ['build'], function() {
  sync.init({
    server: 'build'
  });

  gulp.watch(options.html, ['html']);
  gulp.watch(options.css, ['css']);
  gulp.watch(options.js, ['js']);
  gulp.watch(options.templates, ['templates']);
  gulp.watch(options.images, ['images']);
});

gulp.task('publish', function() {
  return gulp.src('build/**/*')
    .pipe(sftp({
      host: 'frwaw.itu.dk',
      auth: 'keyMain',
      remotePath: '/home/lhil/public_html/assignment3'
    }));
});
