var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();

gulp.task('styles', function() {
    gulp.src(['css/main.scss'])
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('css'))
        .pipe(refresh(server))
})

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})

gulp.task('default', function() {
    gulp.run('lr-server', 'styles');

    gulp.watch('css/**', function(event) {
        gulp.run('styles');
    })

})