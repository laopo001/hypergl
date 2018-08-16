/**
 * File: c:\Users\35327\Githubs\hypergl\src\core\core.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Saturday, July 28th 2018, 6:39:07 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, July 28th 2018, 6:39:33 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

/* tslint:disable */


var _typeLookup = (() => {
    const result = {};
    const names = ["Array", "Object", "Function", "Date", "RegExp", "Float32Array"];

    for (let i = 0; i < names.length; i++)
        result[`[object ${names[i]}]`] = names[i].toLowerCase();

    return result;
})();

export function type(obj) {
    if (obj === null) {
        return "null";
    }

    const type = typeof (obj);

    if (type == "undefined" || type == "number" || type == "string" || type == "boolean") {
        return type;
    }

    return _typeLookup[Object.prototype.toString.call(obj)];
}