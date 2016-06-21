const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const envConfig = require('./config.json')[process.env.NODE_ENV];

module.exports = () => {
  const config = {
    cache: true,
    debug: true,
    devtool: 'source-map',
    entry: {
      main: [
        './src/ts/main.ts'
      ],
      vendor: [
        './src/ts/polyfills.browser.ts',
        './src/ts/vendor.ts',
      ]
    },

    output: {
      filename: '[name].js',
      path: path.resolve('./client'),
      publicPath: '/'
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
        { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') },
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
        { test: /.(gif|jpg|png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader' },
        // { test: /\.tpl$/, loader: 'html' }
      ]
    },
    sassLoader: {
      outputStyle: 'compressed',
      precision: 10,
      sourceComments: false
    },
    plugins: [
      new ExtractTextPlugin('styles.css'),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        '__apiHostName__': JSON.stringify(envConfig.api.host),
        '__apiPort__': JSON.stringify(envConfig.api.port)
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js'),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          dead_code: true,
          screw_ie8: true,
          unused: true,
          warnings: false
        }
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new DedupePlugin(),
      new UglifyJsPlugin({
        // beautify: true, //debug
        // mangle: false, //debug
        // dead_code: false, //debug
        // unused: false, //debug
        // deadCode: false, //debug
        // compress: {
        //   screw_ie8: true,
        //   keep_fnames: true,
        //   drop_debugger: false,
        //   dead_code: false,
        //   unused: false
        // }, // debug
        // comments: true, //debug


        beautify: false, //prod
        mangle: { screw_ie8 : true }, //prod
        compress: { screw_ie8: true }, //prod
        comments: false //prod
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

  return {
    config,
    envConfig
  };
}
