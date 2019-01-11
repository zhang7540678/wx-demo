const Path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var libs = ['vue', 'vuex', 'vue-router', 'lodash', 'element-ui', 'axios']

module.exports = {
  mode: 'development',
  entry: {
    libs
  },
  output: {
    path: Path.resolve(__dirname, './Dll/dev'),
    filename: 'manifest.js',
    library: '[name]_[hash]'
  },
  plugins: [
    new CleanWebpackPlugin(['Dll/dev']),
    new webpack.DllPlugin({
      path: Path.join(__dirname, 'Dll/dev', 'manifest.json'),
      name: '[name]_[hash]',
      context: __dirname
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: ['babel-loader'],
        include: Path.join(__dirname, './src'),
        exclude: /node_modules/
      }
    ]
  }
}