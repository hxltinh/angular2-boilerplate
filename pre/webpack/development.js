const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const envConfig = require('./config.json')[process.env.NODE_ENV];
const commonConf = require('./common');

const tslintConfig = require ('../../tslint');
module.exports = () => {
  const config = _.cloneDeep(commonConf);

  config.devtool = 'cheap-module-source-map';

  config.debug = true;

  config.entry.bundle = config.entry.bundle.concat([
    `webpack-dev-server/client?http://localhost:${envConfig.api.port}`,
    'webpack/hot/dev-server'
  ]);

  config.output.publicPath = '/assets/';

  config.module.preLoaders = [
    { test: /\.ts?$/, loader: 'tslint', exclude: /node_modules/ }
  ];

  config.tslint = tslintConfig;

  config.module.loaders = config.module.loaders.concat([
    { test: /\.scss$/, loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ]},
    { test: /\.css$/, loaders: [ 'style', 'css?sourceMap' ] }
  ]);

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ]);

  const devServerConfig = {
    noInfo: true,
    contentBase: './src',
    publicPath: config.output.publicPath,
    host: envConfig.api.host,
    port: envConfig.api.port,
    historyApiFallback: true,
    proxy: {
      '/api/*': 'http://0.0.0.0:3000/'
    }
  };

  return {
    config,
    devServerConfig,
    envConfig
  };
}
