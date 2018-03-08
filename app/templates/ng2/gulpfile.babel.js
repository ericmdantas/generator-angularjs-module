import gulp from 'gulp';
import uglify from 'gulp-uglify';
import coveralls from 'gulp-coveralls';
<% if (compileStyles) { %>
import cssmin from 'gulp-cssmin'; 
<% } %>
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import {Server as Karma} from 'karma';

const COVERAGE_PATH = 'coverage/**/lcov.info';
const SCRIPTS_PATH = 'src/**/*.js';
<% if (compileStyles) { %>
const STYLES_PATH = 'src/**/*.css'; 
<% } %>
const MAIN_SCRIPT = '<%= app %>.js';
const MAIN_STYLE = '<%= app %>.css';
const DIST_PATH = 'dist';

<% if (compileStyles) { %>
gulp.task('build-css', () => {
  return gulp.src(STYLES_PATH)
    .pipe(concat(MAIN_STYLE.toLowerCase()))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(DIST_PATH));
});

gulp.task('build', ['unit_test', 'build-css'], () => {
  return gulp.src(SCRIPTS_PATH)
    .pipe(concat(MAIN_SCRIPT.toLowerCase()))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(DIST_PATH));
});
<% } else {%>
gulp.task('build', ['unit_test'], () => {
  return gulp.src(SCRIPTS_PATH)
    .pipe(concat(MAIN_SCRIPT.toLowerCase()))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(DIST_PATH));
});
<% } %>
gulp.task('unit_test', (done) => {
  return new Karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: ['Chrome']
  }, (exitCode) => done(exitCode)).start();
});

gulp.task('test-ci', ['unit_test'], () => {
  return gulp.src(COVERAGE_PATH).pipe(coveralls());
});
