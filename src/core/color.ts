/**
 * File: c:\Users\35327\Githubs\hypergl\src\core\color.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Friday, July 27th 2018, 1:06:46 am
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, July 27th 2018, 1:12:02 am
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

/* tslint:disable */
import { intToBytes32, intToBytes24 } from '../math/math';
export class Color {
    buffer: ArrayBuffer;
    data: Float32Array;
    data3: Float32Array;
    constructor(r?, g?, b?, a?) {
        this.buffer = new ArrayBuffer(4 * 4);

        this.data = new Float32Array(this.buffer, 0, 4);
        this.data3 = new Float32Array(this.buffer, 0, 3);

        const length = r && r.length;
        if (length === 3 || length === 4) {
            this.data[0] = r[0];
            this.data[1] = r[1];
            this.data[2] = r[2];
            this.data[3] = r[3] !== undefined ? r[3] : 1.0;
        } else {
            this.data[0] = r || 0;
            this.data[1] = g || 0;
            this.data[2] = b || 0;
            this.data[3] = a !== undefined ? a : 1.0;
        }
    }


    clone() {
        return new Color(this.data[0], this.data[1], this.data[2], this.data[3]);
    }


    copy({ data }) {
        const a = this.data, b = data;

        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];

        return this;
    }

    set(r, g, b, a?) {
        const c = this.data;

        c[0] = r;
        c[1] = g;
        c[2] = b;
        c[3] = (a === undefined) ? 1 : a;

        return this;
    }

    fromString(hex) {
        const i = parseInt(hex.replace('#', '0x'));
        let bytes;
        if (hex.length > 7) {
            bytes = intToBytes32(i);
        } else {
            bytes = intToBytes24(i);
            bytes[3] = 255;
        }

        this.set(bytes[0] / 255, bytes[1] / 255, bytes[2] / 255, bytes[3] / 255);

        return this;
    }

    toString(alpha) {
        let s = `#${((1 << 24) + (parseInt((this.r * 255).toString()) << 16) + (parseInt((this.g * 255).toString()) << 8) + parseInt((this.b * 255).toString())).toString(16).slice(1)}`;
        if (alpha === true) {
            const a = parseInt((this.a * 255).toString()).toString(16);
            if (this.a < 16 / 255) {
                s += `0${a}`;
            } else {
                s += a;
            }

        }

        return s;
    }

    get r() {
        return this.data[0];
    }

    set r(value) {
        this.data[0] = value;
    }

    get g() {
        return this.data[1];
    }

    set g(value) {
        this.data[1] = value;
    }

    get b() {
        return this.data[2];
    }

    set b(value) {
        this.data[2] = value;
    }

    get a() {
        return this.data[3];
    }

    set a(value) {
        this.data[3] = value;
    }
}