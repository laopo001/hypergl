/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\jest.config.js
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Tuesday, August 14th 2018, 12:07:52 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, August 14th 2018, 12:15:35 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/tests/.*(?<!\\.ignore)|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'node'
}
