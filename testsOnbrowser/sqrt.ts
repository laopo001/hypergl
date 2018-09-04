/*
 * ProjectName: hypergl
 * FilePath: \testsOnbrowser\sqrt.js
 * Created Date: Tuesday, September 4th 2018, 7:41:15 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, September 4th 2018, 10:57:22 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */

declare let assert;
if (typeof require === 'function') {
    assert = require('chai').assert;
}

describe('sqrt', () => {

  it('should 123 compute the square root of 4 as 2', () => {
    assert.equal(Math.sqrt(4), 2);
  });

});
