/* eslint strict: 0 */
module.exports = function(config) {

    var customLaunchers = {
        SL_CHROME: {
            base: "SauceLabs",
            browserName: "chrome"
        },
        SL_FIREFOX: {
            base: "SauceLabs",
            browserName: "firefox"
        },
        SL_SAFARI: {
            base: "SauceLabs",
            browserName: "safari"
        },
        SL_IOS: {
            base: "SauceLabs",
            browserName: "iphone"
        },
        SL_ANDROID: {
            base: "SauceLabs",
            browserName: "android"
        },
        SL_ANDROID_4: {
            base: "SauceLabs",
            browserName: "android",
            version: "4.0"
        },
        SL_IE: {
            base: "SauceLabs",
            browserName: "internet explorer"
        }
    };

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: "",

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["browserify", "jasmine"],

        // list of files / patterns to load in the browser
        files: [
            "node_modules/angular/angular.min.js",
            "node_modules/angular-mocks/angular-mocks.js",
            "dist/js/ngAlertify.js",
            "dist/js/alertify.js",
            "test/**/*Spec.js"
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },

        // test results reporter to use
        // possible values: "dots", "progress"
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["dots", "saucelabs"],

        // Browserify bundle
        browserify: {
            debug: true,
            configure: function(bundle) {
                bundle.on("prebundle", function() {
                    bundle.require("./src/js/alertify.js", { expose: "alertify" });
                });
            }
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        sauceLabs: {
            testName: "Alertify.js unit tests"
        },

        captureTimeout: 120000,
        browserNoActivityTimeout: 100000,
        browserDisconnectTimeout: 2000,
        browserDisconnectTolerance: 3,

        customLaunchers: customLaunchers,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: Object.keys(customLaunchers),

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
