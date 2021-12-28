// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack')

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      let rule

      if (
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_NODE_ENV === 'development' ||
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_NODE_ENV === 'production'
      ) {
        // Source map rule is added to array locally but removed
        // in development and production as an env var in ci because
        // it causes the container to run out of memory
        rule = webpackConfig.module.rules[0]

        // Resolves problem with comlink-loader in webpack 5
        // Error happens only in production
        // https://github.com/GoogleChromeLabs/comlink-loader/issues/34#issuecomment-894099400
        webpackConfig.optimization.usedExports = false
      } else {
        rule = webpackConfig.module.rules[1]
      }

      if (!('oneOf' in rule)) {
        throw new Error(
          'CRA webpackConfig not as expected. Update craco config.'
        )
      }

      const responsiveLoader = {
        test: /\.(jpe?g|png)$/,
        loader: require.resolve('responsive-loader'),
        options: {
          adapter: require('responsive-loader/sharp'),
          name: 'static/media/[name]-[width].[hash:8].[ext]',
          sizes: [300, 600, 800, 1200, 1600],
        },
      }

      const webWorkerLoader = {
        test: /\.worker\.(js|ts)$/i,
        loader: require.resolve('comlink-loader'),
        options: {
          singleton: true,
        },
      }

      rule.oneOf = [responsiveLoader, ...rule.oneOf]

      rule.rules = [webWorkerLoader]

      webpackConfig.resolve.fallback = {
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
        process: require.resolve('process/browser'),
      }

      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        })
      )

      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
        })
      )

      return webpackConfig
    },
  },
}
