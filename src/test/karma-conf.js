// Karma configuration
// Generated on Fri Jul 01 2016 13:22:35 GMT+0300 (MSK)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../main/bower_components/jquery/dist/jquery.min.js',
      '../main/bower_components/angular/angular.js',
      '../main/bower_components/ui-router/release/angular-ui-router.js',
      '../main/bower_components/ng-dialog/js/ngDialog.js',
      '../main/bower_components/angular-mocks/angular-mocks.js',
      '../main/bower_components/angular-toastr/dist/angular-toastr.tpls.js',
      '../main/bower_components/angular-permission/dist/angular-permission.js',
      '../main/bower_components/angular-permission/dist/angular-permission-ui.js',
      '../main/bower_components/angular-validation-match/dist/angular-validation-match.js',
      '../main/bower_components/angular-translate/angular-translate.js',
      '../main/bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
      '../main/compiled/js/*.js',
      'js/unit/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
