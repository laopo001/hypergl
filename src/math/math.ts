/**
 * File: c:\Users\35327\Documents\Githubs\hypergl\src\math\math.ts
 * Project: c:\Users\35327\Documents\Githubs\hypergl
 * Created Date: Wednesday, July 11th 2018, 9:13:35 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, July 27th 2018, 1:11:25 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */


/* tslint:disable */
export const generateUUID = (function _() {

    // http://www.broofa.com/Tools/Math.uuid.htm

    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = new Array(36);
    let rnd = 0;
    let r;

    return function generateUUID() {

        for (let i = 0; i < 36; i++) {

            if (i === 8 || i === 13 || i === 18 || i === 23) {

                uuid[i] = '-';

            } else if (i === 14) {

                uuid[i] = '4';

            } else {

                if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                // tslint:disable-next-line:number-literal-format
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];

            }
        }

        return uuid.join('');	//返回36位的uuid通用唯一识别码 (Universally Unique Identifier).

    };

})();



export function  intToBytes24(i) {
    let r, g, b;

    r = (i >> 16) & 0xff;
    g = (i >> 8) & 0xff;
    b = (i) & 0xff;

    return [r, g, b];
}

export function intToBytes32(i) {
    let r, g, b, a;

    r = (i >> 24) & 0xff;
    g = (i >> 16) & 0xff;
    b = (i >> 8) & 0xff;
    a = (i) & 0xff;

    return [r, g, b, a];
}


export function  bytesToInt24(r, g, b) {
    if (r.length) {
        b = r[2];
        g = r[1];
        r = r[0];
    }
    return ((r << 16) | (g << 8) | b);
}