// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack')

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const rule = webpackConfig.module.rules[1]
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
