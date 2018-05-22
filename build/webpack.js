const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = require('./config')
const vueLoaderConfig = config.vueLoaderConfig

module.exports = {
  context: path.join(__dirname, '../'),
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'vue-infinite-scroll.min.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: 'vue-style-loader!css-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
