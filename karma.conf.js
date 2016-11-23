// Karma configuration
// Generated on Wed Nov 23 2016 10:52:13 GMT+1100 (AEDT)
const webpackConfig = require('./webpack.config.js');

module.exports = function karmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      {
        pattern: './app/util.js',
        watched: false,
        served: true,
        included: true,
      },
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only',
    },
    preprocessors: {
      'app/util.js': ['webpack', 'sourcemap'],
    },
    babelPreprocessor: {
      options: {
        presets: [
          'react',
          [
            'env',
            {
              targets: {
                chrome: 52,
                node: true,
              },
            },
          ],
        ],
        plugins: [
          'transform-class-properties',
          [
            'transform-object-rest-spread', {
              useBuiltIns: true,
            },
          ],
        ],
      },
    },
    plugins: [
      'karma-spec-reporter',
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-babel-preprocessor',
    ],
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
  });
};
