var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');

var handleError = function(err) {
  plugins.notify().write(err);
  this.emit('end');
};

gulp.task('styles', function() {
      return gulp.src('css/*.scss')
        .on('error', handleError)
        .pipe(sass({ style: 'expanded', 'errLogToConsole': true }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('css'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./",
            proxy: "sop.local:8000"
        }
    });
});

gulp.task('watch', function() {
  livereload.listen('127.0.0.1/35729');
  gulp.watch('css/*.scss', ['styles']);
  gulp.watch('../craft/templates/*.html', livereload.changed);
  gulp.watch('css/*.css', livereload.changed);
});


gulp.task('default', ['watch'], function() {

});

