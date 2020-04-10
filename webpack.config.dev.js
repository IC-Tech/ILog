const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin= require('html-webpack-plugin')
const common = require('./webpack.config.common.js')
const autoprefixer = require('autoprefixer')

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ILog',
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['ilog', 'vendor'],
      favicon: './src/public/favicon.ico'
    })
  ],
  devServer: {
    host: '192.168.8.20'
  }
});
