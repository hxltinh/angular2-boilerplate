const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const envConfig = require('./config.json')[process.env.NODE_ENV];

module.exports = () => {

  const commonConf = require('./common');
  const config = _.cloneDeep(commonConf);

  config.devtool = 'source-map';

  config.output.publicPath = '/';

  config.module.loaders = config.module.loaders.concat([
    { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') },
    { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') }
  ]);

  config.sassLoader = {
    outputStyle: 'compressed',
    precision: 10,
    sourceComments: false
  };

  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__apiHostName__': JSON.stringify( envConfig.api.host ),
      '__apiPort__': JSON.stringify( envConfig.api.port )
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js'),
    new webpack.optimize.UglifyJsPlugin({
      mangle: { screw_ie8 : true }, //prod
      comments: false, //prod
      compress: {
        dead_code: true,
        screw_ie8: true,
        unused: true,
        warnings: false
      }
    })
  ]);

  return {
    config,
    envConfig
  };
}
