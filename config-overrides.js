// eslint-disable-next-line @typescript-eslint/no-var-requires
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { useBabelRc, override, useEslintRc } = require('customize-cra')

const useMonaco = () => config => {
  return {
    ...config,
    plugins: [
      ...config.plugins,
      new MonacoWebpackPlugin({
        languages: ['markdown'],
      }),
    ],
  }
}

// eslint-disable-next-line no-undef
module.exports = override(useBabelRc(), useMonaco(), useEslintRc())
