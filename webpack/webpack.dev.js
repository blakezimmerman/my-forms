const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const { APP_DIR, scssBanner, commonConfig } = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  entry: [
    'webpack-hot-middleware/client',
    APP_DIR + '/index.tsx'
  ],

  devtool: 'eval',

  output: {
    filename: 'app.bundle.js'
  },

  module: {
    loaders : [
      {
        test: /\.scss$/,
        include: APP_DIR,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
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
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.WatchIgnorePlugin([
      /scss\.d\.ts$/
    ])
  ]
});
