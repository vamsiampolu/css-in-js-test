// Karma configuration
// Generated on Wed Nov 23 2016 10:52:13 GMT+1100 (AEDT)

const webpack = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'test/*.js',
      'test/**/*.js',
    ],
    exclude: [
      'node_modules/**/**',
    ],
    webpack,
    preprocessors: {
      'src/**/*.js': ['webpack', 'source-map'],
      'src/*.js': ['webpack', 'source-map'],
      'test/*.js': ['webpack', 'source-map'],
      'test/**/*.js': ['webpack', 'source-map'],
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-firefox-laucher',
    ],

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  })
}
