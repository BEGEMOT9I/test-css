const path = require('path')
const webpack = require('webpack')
const Config = require('webpack-config').default

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
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          'postcss-loader'
        ]
      },
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
    })
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
