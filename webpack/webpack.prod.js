const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { APP_DIR, BUILD_DIR, scssBanner, commonConfig } = require('./webpack.common.js');
const compressionPlugin = require("compression-webpack-plugin");

module.exports = webpackMerge(commonConfig, {
  entry: [
    APP_DIR + '/index.tsx'
  ],

  output: {
    path: BUILD_DIR,
    filename: 'app.[hash].bundle.js'
  },

  module: {
    loaders : [
      {
        test: /\.scss$/,
        include: APP_DIR,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'typings-for-css-modules-loader',
              options: {
                modules: true,
                importLoaders: true,
                namedExport: true,
                sass: true,
                banner: scssBanner
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [APP_DIR]
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("app.[hash].bundle.css"),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new compressionPlugin()
  ]
});
