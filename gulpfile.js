'use strict';
const gulp = require('gulp');
const webpackDev = require('./pre/webpack/development');

gulp.task('dev', (cb) => {
  console.log('webpackDev:', webpackDev);
  webpackDev();

  return cb();
});
