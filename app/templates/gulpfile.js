"use strict";

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var coveralls = require('gulp-coveralls');
var rename = require('gulp-rename');
var karma = require('karma').server;

var _coverage = 'coverage/**/lcov.info';
var _app = 'app.js';
var _appMin = 'app.min.js';

gulp.task('build', ['unit_test'], function()
{
    gulp
        .src(_app)
        .pipe(uglify())
        .pipe(rename(_appMin))
        .pipe(gulp.dest('.'))
})

gulp.task('unit_test', function(done)
{
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
    }, done);
})

gulp.task('coverage', ['unit_test'], function()
{
    gulp
        .src(_coverage)
        .pipe(coveralls());
})