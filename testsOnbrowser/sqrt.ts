/*
 * ProjectName: hypergl
 * FilePath: \testsOnbrowser\sqrt.js
 * Created Date: Tuesday, September 4th 2018, 7:41:15 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, September 5th 2018, 10:38:48 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */

// tslint:disable-next-line:no-reference
/// <reference path="../typings/test.d.ts" />

import { assert } from 'chai';
// import { Application } from '../build/index';
import { Application } from '../src/index';

describe('Application', () => {
  it('new Application not null', () => {
    assert.notEqual(new Application(document.createElement('canvas')), null);
  });

});
