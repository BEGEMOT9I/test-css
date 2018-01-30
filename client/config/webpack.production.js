const path = require('path')
const webpack = require('webpack')
const Config = require('webpack-config').default
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = new Config().extend('config/webpack.base.js').merge({
  entry: {
    client: ['@babel/polyfill', './src/startup/application']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(__dirname, '../postcss.config.js')
                }
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      uglifyOptions: {
        ecma: 8,
        compress: {
          unused: true,
          dead_code: true,
          warnings: false
        }
      }
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new ExtractTextPlugin('client-[contenthash].css')
  ]
})
