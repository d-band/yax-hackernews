module.exports = {
  entry: {
    index: './src/index.js'
  },
  babelPlugins: ['transform-runtime'],
  devServer: {
    historyApiFallback: {
      rewrites: [{
        from: /./,
        to: '/index.html'
      }]
    }
  }
}