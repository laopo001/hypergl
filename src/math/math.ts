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



export function intToBytes24(i) {
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


export function bytesToInt24(r, g, b) {
    if (r.length) {
        b = r[2];
        g = r[1];
        r = r[0];
    }
    return ((r << 16) | (g << 8) | b);
}

export function bytesToInt32(r, g, b, a) {
    if (r.length) {
        a = r[3];
        b = r[2];
        g = r[1];
        r = r[0];
    }
    // Why ((r << 24)>>>32)?
    // << operator uses signed 32 bit numbers, so 128<<24 is negative.
    // >>> used unsigned so >>>32 converts back to an unsigned.
    // See http://stackoverflow.com/questions/1908492/unsigned-integer-in-javascript
    return ((r << 24) | (g << 16) | (b << 8) | a) >>> 32;
}

export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;
export const INV_LOG2 = 1 / Math.log(2);

export function clamp(value, min, max) {
    if (value >= max) return max;
    if (value <= min) return min;
    return value;
}

export function lerp(a, b, alpha) {
    return a + (b - a) * clamp(alpha, 0, 1);
}

export function lerpAngle(a, b, alpha) {
    if (b - a > 180) {
        b -= 360;
    }
    if (b - a < -180) {
        b += 360;
    }
    return lerp(a, b, clamp(alpha, 0, 1));
}

export function powerOfTwo(x) {
    return ((x !== 0) && !(x & (x - 1)));
}

export function nextPowerOfTwo(val) {
    val--;
    val = (val >> 1) | val;
    val = (val >> 2) | val;
    val = (val >> 4) | val;
    val = (val >> 8) | val;
    val = (val >> 16) | val;
    val++;
    return val;
}

export function random(min, max) {
    const diff = max - min;
    return Math.random() * diff + min;
}

export function smoothstep(min, max, x) {
    if (x <= min) return 0;
    if (x >= max) return 1;

    x = (x - min) / (max - min);

    return x * x * (3 - 2 * x);
}

export function smootherstep(min, max, x) {
    if (x <= min) return 0;
    if (x >= max) return 1;

    x = (x - min) / (max - min);

    return x * x * x * (x * (x * 6 - 15) + 10);
}

export const intToBytes = intToBytes32;
export const bytesToInt = bytesToInt32;

if (!Math.log2) {
    Math.log2 = x => Math.log(x) * INV_LOG2;
}
