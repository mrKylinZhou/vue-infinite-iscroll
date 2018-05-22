const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = require('./config')
const outputPath = config.outputPath
const vueLoaderConfig = config.vueLoaderConfig
const pathsToClean = config.pathsToClean

module.exports = {
  context: path.join(__dirname, '../'),
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, outputPath),
    filename: 'vue-infinite-scroll.min.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean)
  ]
}
