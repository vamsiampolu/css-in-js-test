const webpack = require('webpack');
const merge = require('webpack-merge');
const validator = require('webpack-validator');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = require('html-webpack-template');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const DotEnvPlugin = require('webpack-dotenv-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const APP_PATH = path.resolve('./app');
const BUILD_PATH = path.resolve('./build');
const TEST_PATH = path.resolve('./test');

const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;

const base = {
  entry: `${APP_PATH}/index.js`,
  output: {
    filename: 'bundle.js',
    path: BUILD_PATH,
    publicPath: '/css-in-js-test/',
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel',
        include: [APP_PATH],
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.svg$/i,
        loader: 'svg-sprite!svgo',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  plugins: [
    new DotEnvPlugin({
      sample: './.env.default',
      path: './.env',
    }),
  ],
};

const hmr = {
  devServer: {
    inline: true,
    hot: true,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    stats: 'errors-only',
    historyApiFallback: true,
    contentBase: BUILD_PATH,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new NpmInstallPlugin({
      dev(module) {
        return (/(^babel-?.*|.*-plugin$|.*-loader)/).test(module);
      },
    }),
    new DashboardPlugin(),
  ],
};

const html = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Bookcover mashup',
      inject: false,
      mobile: true,
      appMountId: 'root',
      template,
    }),
  ],
};

const test = {
  devtool: 'inline-source-map',
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
    'react/lib/ReactContext': true,
  },
  resolve: {
    alias: {
      sinon: 'sinon/pkg/sinon.js',
    },
  },
  module: {
    noParse: /\/sinon\.js/,
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel',
        include: [APP_PATH, TEST_PATH],
        query: {
          cacheDirectory: true,
        },
      },
    ],
  },
};

const NPM_TASK = process.env.npm_lifecycle_event;

const START = 'start';
const BUILD = 'build';
const TEST = 'test';

let config;
switch (NPM_TASK) {
  case START:
    config = merge(base, hmr, html);
    break;
  case BUILD:
    config = merge(base, html);
    break;
  case TEST:
    config = merge(base, html, test);
    break;
  default:
    config = {};
}

module.exports = validator(config);
