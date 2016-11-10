const webpack = require('webpack');
const validator = require('webpack-validator')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const template = require('html-webpack-template')
const NpmInstallPlugin = require('npm-install-webpack-plugin')
const DotEnvPlugin = require('webpack-dotenv-plugin')
const APP_PATH = path.resolve('./app')
const BUILD_PATH = path.resolve('./build')
const SPEC_PATH = path.resolve('./spec')
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin


module.exports = validator({
  entry:`${APP_PATH}/index.js`,
  output:{
    filename:'bundle.js',
    path:BUILD_PATH
  },
  devtool:'eval-source-map',
  devServer:{
    inline:true,
    hot:true,
    host:process.env.HOST || '0.0.0.0',
    port:process.env.PORT || 3000,
    stats:'errors-only',
    historyApiFallback:true,
    contentBase:BUILD_PATH,
    watchOptions:{
      aggregateTimeout:300,
      poll:1000
    }
  },
  module:{
    preloaders:[
      {
        test:/\.jsx?/,
        loader:'eslint'
        include:[
          SRC_PATH,
          SPEC_PATH
        ]
      }
    ],
    loaders:[
      {
        test:/\.jsx?/,
        loader:'babel',
        include:SRC_PATH,
        query:{
          cacheDirectory:true
        }
      }
    ]
  },
  plugins:{
    new HotModuleReplacementPlugin(),
    new DotEnvPlugin({
      sample:'./.env.default',
      path:'./.env
    }),
    new NpmInstallPlugin({
      dev(module,path) {
        return (/(^babel-?.*|.*-plugin$|.*-loader)/).test(module)
      }
    }),
    new HtmlWebpackPlugin({
      inject: false,
      mobile:true,
      appMountId:'root',
      template:template
    })
  }
})
