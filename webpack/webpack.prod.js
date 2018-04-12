const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const { APP_DIR, BUILD_DIR, commonConfig } = require('./webpack.common.js');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
  mode: 'production',

  entry: [
    APP_DIR + '/index.tsx'
  ],

  output: {
    path: BUILD_DIR,
    filename: 'app.[hash].bundle.js'
  },

  plugins: [
    new ManifestPlugin({ fileName: 'asset-manifest.json'}),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) { return; }
        console.log(message);
      },
      minify: true,
      navigateFallback: '/',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    new CompressionPlugin({
      minRatio: 0.6,
      threshold: 5000
    })
  ]
});
