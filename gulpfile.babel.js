import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('transpile', () => {
  return gulp.src('./app/*.es6')
             .pipe(babel({}))
             .pipe(gulp.dest('./app/'));
});

gulp.task('transpile_watch', () => {
  gulp.watch('app/*.es6', () => {
      return gulp.src('./app/*.es6')
             .pipe(babel({}))
             .pipe(gulp.dest('./app/'));
  })
});
