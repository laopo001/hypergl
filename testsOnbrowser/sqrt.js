/*
 * ProjectName: hypergl
 * FilePath: \testsOnbrowser\sqrt.js
 * Created Date: Tuesday, September 4th 2018, 7:41:15 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, September 4th 2018, 7:50:50 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 jiguang
 */


if (typeof require === 'function') {
    var assert = require("chai").assert;
}

describe("sqrt", function() {

  it("should compute the square root of 4 as 2", function() {
    assert.equal(Math.sqrt(4), 2);
  });

});
