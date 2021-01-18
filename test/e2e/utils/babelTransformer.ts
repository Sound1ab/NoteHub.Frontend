// @ts-ignore
const config = {
  babelrc: false,
  presets: [
    ['@babel/preset-env', { targets: { esmodules: true } }],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require('babel-jest').createTransformer(config)
