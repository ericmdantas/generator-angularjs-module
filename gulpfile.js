var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');

gulp.task('transpile', function() {
  return gulp.src('./app/*.es6')
             .pipe(babel({}))
             .pipe(gulp.dest('./app/'));
});

gulp.task('transpile_watch', function() {
  watch('app/*.es6', function() {
      return gulp.src('./app/*.es6')
             .pipe(babel({}))
             .pipe(gulp.dest('./app/'));
  })
});
