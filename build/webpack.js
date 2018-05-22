const path = require('path')

const config = require('./config')

const vueLoaderConfig = config.vueLoaderConfig

module.exports = {
  context: path.join(__dirname, '../'),
  entry: './src/main.js',
  output: {

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
  }
}
