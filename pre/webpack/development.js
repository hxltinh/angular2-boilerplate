const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const envConfig = require('./config.json')[process.env.NODE_ENV];
const commonConf = require('./common');

module.exports = () => {
  const config = _.cloneDeep(commonConf);
  
  config.devtool = 'cheap-module-source-map';

  config.entry.vendor = config.entry.vendor.concat([
    `webpack-dev-server/client?http://localhost:${envConfig.api.port}`,
    'webpack/hot/dev-server'
  ]);

  config.output.publicPath = '/assets/';

  config.module.loaders = config.module.loaders.concat([
    { test: /\.scss$/, loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ]},
    { test: /\.css$/, loaders: [ 'style', 'css?sourceMap' ] }
  ]);

  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__apiHostName__': JSON.stringify( envConfig.api.host ),
      '__apiPort__': JSON.stringify( envConfig.api.port )
    }),
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
