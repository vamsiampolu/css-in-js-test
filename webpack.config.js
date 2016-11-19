const webpack = require('webpack');
const validator = require('webpack-validator');
const path = require('path');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = require('html-webpack-template');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const StaticSitePlugin = require('static-site-generator-webpack-plugin');

const APP_PATH = path.resolve('./app');
const BUILD_PATH = path.resolve('./build');
const SPEC_PATH = path.resolve('./spec');

const crypto = require('crypto-browserify');

const NPM_LIFECYCLE_EVENT = process.env.npm_lifecycle_event;

const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;


const base = {
  entry: {
    main: `${APP_PATH}/index.js`,
  },
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
        include: APP_PATH,
        query: {
          cacheDirectory: true,
        },
      },
    ],
  },
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
  ],
};

const html = {
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      mobile: true,
      appMountId: 'root',
      template,
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.svg$/i,
        loader: 'svg-sprite!svgo',
      },
    ],
  },
};

const dev = {
  module: {
    preLoaders: [
      {
        test: /\.jsx?/,
        loader: 'eslint',
        include: [
          APP_PATH,
          SPEC_PATH,
        ],
      },
    ],
  },
};

const paths = [
  '/',
  '/python/',
  '/ruby/',
  '/javascript/',
  '/haskell/',
];

const staticSite = {
  output: {
    libraryTarget: 'umd',
    publicPath: '/css-in-js-test/',
  },
  plugins: [
    new CleanPlugin('build', {
      root: process.cwd(),
    }),
    new StaticSitePlugin('main', paths, {
      crypto,
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.ejs$/,
        loader: 'ejs',
      },
      {
        test: /\.svg$/,
        loader: 'file',
        include: [
          APP_PATH,
        ],
      },
    ],
  },
};

let config;

switch (NPM_LIFECYCLE_EVENT) {
  case 'start':
    config = merge(base, hmr, dev, html);
    break;

  case 'build':
    config = merge(base, dev, html);
    break;

  case 'predeploy':
    config = merge(base, dev, staticSite);
    break;

  default:
    config = merge(base, dev, html);
}

module.exports = validator(config);
