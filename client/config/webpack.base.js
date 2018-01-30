const path = require('path')
const webpack = require('webpack')
const Config = require('webpack-config').default
const manifestPlugin = require('webpack-manifest-plugin')
const workboxPlugin = require('workbox-webpack-plugin')

const webpackConfigLoader = require('react-on-rails/webpackConfigLoader')

const configPath = path.resolve(__dirname, '../../config')
const { output } = webpackConfigLoader(configPath)

module.exports = new Config().merge({
  context: path.resolve(__dirname, '../'),
  output: {
    filename: '[name]-[hash].js',
    publicPath: output.publicPath,
    path: output.path
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      assets: path.resolve(__dirname, 'assets')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_compontents)/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        exclude: /sprite/,
        use: [
          'file-loader',
          {
            loader: 'img-loader',
            options: {
              gifsicle: {
                interlaced: false
              },
              mozjpeg: {
                progressive: true,
                arithmetic: false
              },
              optipng: {
                optimizationLevel: 3
              },
              pngquant: {
                floyd: 0.5,
                speed: 2
              }
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[name].[hash].[ext]',
            mimetype: 'application/font-woff'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: function(module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),
    new workboxPlugin.GenerateSW({
      globDirectory: output.publicPath,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /.(jpe?g|png|gif)$/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'image-cache'
          }
        },
        {
          urlPattern: new RegExp(`^${output.publicPathWithHost}`),
          handler: 'staleWhileRevalidate'
        }
      ]
    }),
    new webpack.DefinePlugin({
      SW_PATH: JSON.stringify(path.join(output.publicPath, 'service-worker.js'))
    }),
    new manifestPlugin({
      publicPath: output.publicPath,
      writeToFileEmit: true
    })
  ]
})
