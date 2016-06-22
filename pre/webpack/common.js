const path = require('path');
const webpack = require('webpack');

module.exports = {
  cache: true,
  debug: true,
  devtool: 'cheap-module-source-map',
  entry: {
    bundle: [
      './src/ts/main.ts'
    ],
    vendor: [
      './src/ts/polyfills.browser.ts',
      './src/ts/vendor.ts'
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./client')
  },

  resolve: {
    extensions: ['', '.ts', '.js', '.json'],
    modulesDirectories: ['node_modules'],
    root: path.resolve('./src')
  },

  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [/\.(spec|e2e)\.ts$/] },
      { test: /\.html$/, loader: 'raw' },
      { test: /.(gif|jpg|png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader' },
      // { test: /\.tpl$/, loader: 'html' }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],

  stats: {
    cached: true,
    cachedAssets: true,
    chunks: true,
    chunkModules: false,
    colors: true,
    hash: false,
    reasons: true,
    timings: true,
    version: false
  }
};
