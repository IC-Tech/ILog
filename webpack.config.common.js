const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin= require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const outputDirectory = 'dist';

module.exports = {
  entry: {
    'p201907221623': './src/index.js'
  },
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=assets/[name].[ext]&limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    port: 3000,
    open: true
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'ILog',
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['p201907221623', 'react_vendor', 'vendor'],
      favicon: './public/favicon.ico'
    }),
    new CopyPlugin([
      {
        from: 'public/common/*',
        to: './',
        flatten: true
      }
    ]),
    new CopyPlugin([
      {
        from: './src/sw.js',
        to: './sw.js'
      }
    ])
  ]
};
