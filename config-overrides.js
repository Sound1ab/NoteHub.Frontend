const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config) {
  //do stuff with the webpack config...
  return {
    ...config,
    plugins: [
      ...config.plugins,
      new MonacoWebpackPlugin({
        languages: ['markdown']
      })
    ]
  };
}