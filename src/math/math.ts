/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\math\math.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Wednesday, July 11th 2018, 9:13:35 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, July 11th 2018, 9:18:35 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


export namespace IMath {
    export const generateUUID = function () {

        // http://www.broofa.com/Tools/Math.uuid.htm

        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = new Array(36);
        var rnd = 0, r;

        return function () {

            for (var i = 0; i < 36; i++) {

                if (i == 8 || i == 13 || i == 18 || i == 23) {

                    uuid[i] = '-';

                } else if (i == 14) {

                    uuid[i] = '4';

                } else {

                    if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                    r = rnd & 0xf;
                    rnd = rnd >> 4;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];

                }
            }

            return uuid.join('');	//返回36位的uuid通用唯一识别码 (Universally Unique Identifier).

        };

    }();
}