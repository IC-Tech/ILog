const path = require('path');
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const PACKAGE = require('./package.json')

const outputDirectory = 'dist';

module.exports = {
  entry: {
    'ilog': './src/index.js'
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
    open: false
  },
  plugins: [
    new CopyPlugin([
      {
        from: './src/sw.js',
        to: './sw.js'
      }
    ]),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: 'src/public',
        to: './'
      }
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.__IC_DEV__': process.env.WEBPACK_DEV_SERVER == 'true' ? 'true' : 'false',
      '__VER__': JSON.stringify(PACKAGE.version),
      '__BUILD_TIME__': Date.now().toString()
    })
  ]
};
