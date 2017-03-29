import gulp from 'gulp';
import uglify from 'gulp-uglify';
import coveralls from 'gulp-coveralls';
import cssmin from 'gulp-cssmin';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import {Server as Karma} from 'karma';

const _coverage = 'coverage/**/lcov.info';
const _scripts = 'src/**/*.js';
const _styles = 'src/**/*.css';
const _script = '<%= app %>.js';
const _style = '<%= app %>.css';
const _dist = 'dist';

gulp.task('build-css', () => {
  return gulp.src(_styles)
    .pipe(concat(_style.toLowerCase()))
    .pipe(gulp.dest(_dist))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(_dist));
});

gulp.task('build', ['unit_test', 'build-css'], () => {
  return gulp.src(_scripts)
    .pipe(concat(_script.toLowerCase()))
    .pipe(gulp.dest(_dist))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(_dist));
});

gulp.task('unit_test', (done) => {
  var _opts = {
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: ['Chrome']
  };

  return new Karma(_opts, done).start();
});

gulp.task('test-ci', ['unit_test'], () => {
  return gulp.src(_coverage).pipe(coveralls());
});
