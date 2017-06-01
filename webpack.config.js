module.exports = (config) => {
  config.module.rules.forEach(rule => {
    if (rule.key === 'js' || rule.key === 'jsx') {
      rule.options.plugins = [
        'transform-runtime'
      ];
    }
  });
  config.devServer = {
    historyApiFallback: {
      rewrites: [{
        from: /./,
        to: '/index.html'
      }]
    }
  };
  return config;
};
