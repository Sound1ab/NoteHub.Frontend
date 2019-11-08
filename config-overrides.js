const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const { useBabelRc, override } = require('customize-cra')

const useMonaco = () => config => {
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

module.exports = override(
  useBabelRc(),
  useMonaco()
)
