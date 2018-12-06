/*
 * ProjectName: hypergl
 * FilePath: \testsOnbrowser\sqrt.js
 * Created Date: Tuesday, September 4th 2018, 7:41:15 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, December 6th 2018, 4:14:27 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
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
