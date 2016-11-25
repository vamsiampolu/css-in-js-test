const webpack = require('webpack');
const merge = require('webpack-merge');
const validator = require('webpack-validator');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = require('html-webpack-template');
const DashboardPlugin = require('webpack-dashboard/plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const APP_PATH = path.resolve('./app');
const BUILD_PATH = path.resolve('./build');
const TEST_PATH = path.resolve('./test');
const vendor = Object.keys(require('./package.json').dependencies);

vendor.push('flexboxgrid.js');
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
const DefinePlugin = webpack.DefinePlugin;
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const base = {
  entry: `${APP_PATH}/index.js`,
  output: {
    filename: 'bundle.js',
    path: BUILD_PATH,
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel',
        include: [APP_PATH],
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
    new DashboardPlugin(),
  ],
};

const hmr = {
  entry: [
    'react-hot-loader/patch',
    `${APP_PATH}/index.js`,
  ],
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
    new DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
    }),
    new HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:3000' }),
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
  plugins: [
    new DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
    }),
  ],
};

const prod = {
  entry: {
    app: `${APP_PATH}/index.js`,
    vendor,
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js',
    path: BUILD_PATH,
  },
  devtool: 'source-map',
  plugins: [
    new DefinePlugin({
      NODE_ENV: JSON.stringify('production'),
    }),
    new CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new BabiliPlugin(),
    new CleanPlugin([BUILD_PATH], {
      root: process.cwd(),
    }),
  ],
};

const deploy = {
  output: {
    publicPath: '/css-in-js-test/',
  },
};


const NPM_TASK = process.env.npm_lifecycle_event;

const START = 'start';
const START_DASHBOARD = 'start:dash';
const BUILD = 'build';
const BUILD_DASHBOARD = 'build:dash';
const TEST = 'test';
// const DEPLOY = 'deploy';
const PREDEPLOY = 'predeploy';

let config;
switch (NPM_TASK) {
  case START:
  case START_DASHBOARD:
    config = merge(base, hmr, html);
    break;
  case BUILD:
  case BUILD_DASHBOARD:
    config = merge(base, prod, html);
    break;
  case TEST:
    config = merge(base, html, test);
    break;
  case PREDEPLOY:
    config = merge(base, prod, html, deploy);
    break;
  default:
    config = {};
}

module.exports = validator(config);
