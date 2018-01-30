const path = require('path')
const webpack = require('webpack')
const Config = require('webpack-config').default
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const webpackConfigLoader = require('react-on-rails/webpackConfigLoader')

const configPath = path.resolve(__dirname, '../../config')
const { settings } = webpackConfigLoader(configPath)

const serverConfig = process.env.HMR
  ? settings.dev_server_hot
  : settings.dev_server

let config = new Config().extend('config/webpack.base.js').merge({
  entry: {
    client: ['@babel/polyfill', './src/startup/application']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      test: ['.js'],
      exclude: ['vendor.js']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('developement')
      }
    }),
    new BundleAnalyzerPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    host: serverConfig.host,
    port: serverConfig.port,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    hot: serverConfig.hmr
  }
})

if (serverConfig.hmr) {
  config.merge({
    entry: {
      client: ['react-hot-loader/patch']
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  })
}

module.exports = config
