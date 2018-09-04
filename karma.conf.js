/*
 * ProjectName: hypergl
 * FilePath: \karma.conf.js
 * Created Date: Tuesday, September 4th 2018, 7:39:15 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, September 5th 2018, 1:40:14 am
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
            'testsOnbrowser/**/*.ts'
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
            include: ['testsOnbrowser/**/*.ts'],
        },

        singleRun: true,
        colors: true,

        detectBrowsers: {
            enabled: true,
            usePhantomJS: false
        },

        plugins: [
            'karma-mocha',
            'karma-typescript',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            // 'karma-ie-launcher',
            'karma-safari-launcher',
            'karma-detect-browsers'
        ]
    });
}