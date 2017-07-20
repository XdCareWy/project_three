var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var webserver = require('gulp-webserver');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');


gulp.task('uglifyjs', function () {
    gulp.src('src/js/**/*.js')
        // .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('styles', function() { 
  return gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('image', function () {
    gulp.src('src/images/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'))
})

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: false
    }));
});

gulp.task('watch', function() {
	gulp.watch('./src/js/**/*.js', ['uglifyjs']);
	gulp.watch('./src/css/**/*.css', ['styles']);
	gulp.watch('./index.html');

});

gulp.task('default', ['uglifyjs', 'styles', 'image', 'webserver']);