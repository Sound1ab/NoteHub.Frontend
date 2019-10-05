const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return {
    ...config,
    devServer: {
      before: function(app, webpackServer) {
        // We override the listen() function to set keepAliveTimeout.
        // See: https://github.com/microsoft/WSL/issues/4340
        // Original listen(): https://github.com/webpack/webpack-dev-server/blob/f80e2ae101e25985f0d7e3e9af36c307bfc163d2/lib/Server.js#L744
        const { listen } = webpackServer
        webpackServer.listen = function(...args) {
          const server = listen.call(this, ...args)
          server.keepAliveTimeout = 0
          return server
        }
      }
    },
    plugins: [
      ...config.plugins,
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ['markdown']
      })
    ]
  };
}