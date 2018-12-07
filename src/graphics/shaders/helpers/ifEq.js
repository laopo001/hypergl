/*
 * ProjectName: hypergl
 * FilePath: \src\graphics\shaders\helpers\ifEq.js
 * Created Date: Friday, December 7th 2018, 4:23:32 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, December 7th 2018, 4:25:20 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


module.exports = function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
};