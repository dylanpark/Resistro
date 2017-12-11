const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let extractCss = new ExtractTextPlugin('style.css');
let generateHtml = new HtmlWebpackPlugin({ template: 'src/index.html' });

module.exports = {
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        include: [
          path.join( __dirname, 'src')
        ],
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: [{loader: 'style-loader'}],
          use: ['css-loader', 'sass-loader']
        }))
      }
    ]
  },
  plugins: debug ? [
    extractCss,
    generateHtml
  ] : [
    extractCss,
    generateHtml,
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
