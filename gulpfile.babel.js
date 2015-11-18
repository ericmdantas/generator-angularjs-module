import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('compile', () => {
  return gulp.src('./app/*.es6')
             .pipe(babel({
               presets: ["es2015"]
             }))
             .pipe(gulp.dest('./app/'));
});
