const Path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: Path.resolve(__dirname, './src/main.js'),
  output: {
    path: Path.resolve(__dirname, './dist/static'),
    publicPath: 'static/',
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: Path.join(__dirname, './src'),
        exclude: /node_modules/
      },
      {
        test: /\.css?$/,
        loader: [miniCssExtractPlugin.loader, 'css-loader'],
        include: Path.join(__dirname, './src')
      },
      {
        test: /\.(jpg|png|jpeg|gif|bmp)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]',
          limit: 1000
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'development'
      }
    }),
    new htmlWebpackPlugin({
      filename: Path.resolve(__dirname, './dist/index.html'),
      template: Path.resolve(__dirname, './src/index.html'),
      inject: true,
      title: 'demo'
    }),
    //分离css文件
    new miniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFileName: 'css/[id].css'
    }),
    //热更新
    new webpack.HotModuleReplacementPlugin(),
    //优化打包速度
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./Dll/dev/manifest.json')
    }),
    //插入js文件
    new AddAssetHtmlWebpackPlugin({
      filepath: Path.resolve(__dirname, './Dll/dev/manifest.js'),
      outputPath: 'lib',
      publicPath: 'static/lib',
      hash: true
    })
  ],
  //去重 + 缓存
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devtool: '#eval-source-map',
  performance: {
    hints: false
  },
  devServer: {
    contentBase: './dist',
    port: 9000,
    open:true,
    hot:true,
    openPage: './index.html'
  },
  externals: {
    jquery: 'jQuery'
  }
}