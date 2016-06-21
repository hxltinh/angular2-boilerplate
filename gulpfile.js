'use strict';
const gulp = require('gulp');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackDev = require('./pre/webpack/development');
const webpackProd = require('./pre/webpack/production');

const WebpackDevServer = require('webpack-dev-server');

gulp.task('dev', (cb) => {
  const devConf = webpackDev();
  const compiler = webpack(devConf.config);
  const wbSeverIns = new WebpackDevServer(compiler, devConf.devServerConfig);
  wbSeverIns.listen(devConf.envConfig.api.port, 'localhost', (err) => {
    if(err) throw new gutil.PluginError('webpack-dev-server', err);
    // Server listening
    gutil.log('[webpack-dev-server]', `http://localhost:${devConf.envConfig.api.port}`);

  })
  return cb();
});

gulp.task('copy-lib', done => {
  gulp.src(['src/lib/**/*']).pipe(gulp.dest('client/lib'))
  done();
});
gulp.task('clean-client', done => {
  gulp.src('client/*').pipe(vinylPaths(del));
  done();
});

gulp.task( 'prodTranspile', (done) => {
  const prodConf = webpackProd();
  webpack( prodConf.config, ( err, stat) => {
    if(err) throw new gutil.PluginError('webpack', err);
    return done();
  });
});

gulp.task('production',gulp.series('clean-client', 'copy-lib', 'prodTranspile'));
