const path = require('path')
const TSLintPlugin = require('tslint-webpack-plugin')

module.exports = function override(config) {
  return {
    ...config,
    plugins: [
      ...config.plugins,
      new TSLintPlugin({
        files: [
          path.join(__dirname, '/src/**/*.ts'),
          path.join(__dirname, '/src/**/*.tsx'),
        ],
      }),
    ],
  }
}
