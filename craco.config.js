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

      rule.oneOf = [responsiveLoader, ...rule.oneOf]

      return webpackConfig
    },
  },
}
