const path = require('path');
const webpack = require('webpack');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const envConfig = require('./config.json')[process.env.NODE_ENV];

module.exports = () => {
  const config = {
    cache: true,
    debug: true,
    devtool: 'source-map',
    entry: {
      bundle: [
        './src/ts/main.ts'
      ],
      vendor: [
        `webpack-dev-server/client?http://localhost:${envConfig.api.port}`,
        './src/ts/polyfills.browser.ts',
        './src/ts/vendor.ts',
      ]
    },

    output: {
      // path: path.resolve(__dirname, '/client/js'),
      // filename: 'bundle.js',
      filename: '[name].js',
      path: path.resolve('./client'),
      publicPath: '/assets/'
    },

    resolve: {
      extensions: ['', '.ts', '.js', '.json'],
      modulesDirectories: ['node_modules'],
      root: path.resolve('./src'),
      // alias: {
      //   // legacy imports pre-rc releases
      //   'angular2': helpers.root('node_modules/@angularclass/angular2-beta-to-rc-alias/dist/beta-17')
      // },
    },

    module: {
      loaders: [
        { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [/\.(spec|e2e)\.ts$/] },
        { test: /\.html$/, loader: 'raw' },
        { test: /\.scss$/, loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ]},
        { test: /\.css$/, loaders: [ 'style', 'css?sourceMap' ] },
        { test: /.(gif|jpg|png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader' },
        // { test: /\.tpl$/, loader: 'html' }
      ]
    },

    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        '__apiHostName__': JSON.stringify( envConfig.api.host ),
        '__apiPort__': JSON.stringify( envConfig.api.port )
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new DedupePlugin(),
      new webpack.NoErrorsPlugin()
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
