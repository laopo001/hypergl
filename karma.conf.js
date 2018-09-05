/*
 * ProjectName: hypergl
 * FilePath: \karma.conf.js
 * Created Date: Tuesday, September 4th 2018, 7:39:15 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, September 5th 2018, 10:17:13 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


module.exports = function (config) {
    config.set({
        frameworks: [
            'mocha',
            'karma-typescript',
            'detectBrowsers'
        ],

        files: [
            '_temp/**/*.ts'
        ],
        preprocessors: {
            '**/*.ts': ['karma-typescript']
        },
        // client: {
        //     mocha: {
        //         reporter: 'html',
        //         ui: 'bdd'
        //     }
        // },
        reporters: ['dots', 'karma-typescript'],

        karmaTypescriptConfig: {
            options: {

                noImplicitAny: true, // (optional) Warn on expressions and declarations with an implied 'any' type.
                noResolve: true, // (optional) Skip resolution and preprocessing.
            },
            include: ['_temp/**/*.ts'],
        },

        singleRun: true,
        colors: true,

        detectBrowsers: {
            enabled: true,
            usePhantomJS: false
        },
        detectBrowsers: {
            // enable/disable, default is true
            enabled: true,

            // enable/disable phantomjs support, default is true
            usePhantomJS: false,

            // use headless mode, for browsers that support it, default is false
            // preferHeadless: true,

            // post processing of browsers list
            // here you can edit the list of browsers used by karma
            postDetection: function (availableBrowsers) {
                /* Karma configuration with custom launchers
                  customLaunchers: {
                    IE9: {  https://github.com/litixsoft/karma-detect-browsers
                      base: 'IE',
                      'x-ua-compatible': 'IE=EmulateIE9'
                    }
                  }
                */

                //Add IE Emulation
                var result = availableBrowsers;

                // if (availableBrowsers.indexOf('IE') > -1) {
                //     result.push('IE9');
                // }

                //Remove PhantomJS if another browser has been detected
                // if (availableBrowsers.length > 1 && availableBrowsers.indexOf('PhantomJS') > -1) {
                //     var i = result.indexOf('PhantomJS');

                //     if (i !== -1) {
                //         result.splice(i, 1);
                //     }
                // }
                if (availableBrowsers.length > 1 && availableBrowsers.indexOf('IE') > -1) {
                    var i = result.indexOf('IE');

                    if (i !== -1) {
                        result.splice(i, 1);
                    }
                }
                return result;
            }
        },
        plugins: [
            'karma-mocha',
            'karma-typescript',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-ie-launcher',
            'karma-safari-launcher',
            'karma-detect-browsers'
        ]
    });
}