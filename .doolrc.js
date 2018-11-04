module.exports = {
  entry: {
    index: './src/index.js'
  },
  babelPlugins: ['@babel/transform-runtime'],
  devServer: {
    historyApiFallback: {
      rewrites: [{
        from: /./,
        to: '/index.html'
      }]
    }
  }
}