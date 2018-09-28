let BundleTracker = require('webpack-bundle-tracker');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let path = require('path');
let url = require('url');
let webpack = require('webpack');
let autoprefixer = require('autoprefixer');

let resolve = path.resolve.bind(path, __dirname);

let extractCssPlugin;
let fileLoaderPath;
let output;

const basePath = './static/';
const publicPath = process.env.STATIC_URL || '/static/assets/';

output = {
  path: resolve(path.join(basePath, 'assets')),
  filename: '[name].js',
  chunkFilename: '[name].js',
  publicPath: publicPath
};
fileLoaderPath = 'file-loader?name=[name].[ext]';
extractCssPlugin = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[name].css'
});

let bundleTrackerPlugin = new BundleTracker({
  filename: 'webpack-bundle.json'
});

let providePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
  'Popper': 'popper.js',
  'query-string': 'query-string'
});

let config = {
  entry: {
    front: './' + path.join(basePath, 'js/front.js')
  },
  output: output,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              'sourceMap': true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              'sourceMap': true,
              'plugins': function () {
                return [autoprefixer];
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              'sourceMap': true
            }
          }
        ]
      },
      {
        test: /\.(eot|otf|png|svg|jpe?g|ttf|woff|woff2)(\?v=[0-9.]+)?$/,
        loader: fileLoaderPath,
        include: [
          resolve('node_modules'),
          resolve(path.join(basePath, 'fonts')),
          resolve(path.join(basePath, 'images')),
          resolve(path.join(basePath, 'dashboard/images')),
          resolve(path.join(basePath, 'dashboard/fonts'))
        ]
      }
    ]
  },
  plugins: [
    bundleTrackerPlugin,
    extractCssPlugin,
    providePlugin
  ],
  resolve: {
    alias: {
      'jquery': resolve('node_modules/jquery/dist/jquery.js')
    }
  }
};

module.exports = config;
