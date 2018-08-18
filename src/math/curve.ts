/* tslint:disable */
import { CURVE } from '../conf';
import * as math from './math';

export class Curve {
    keys: any[];
    type: number;
    tension: number;
    constructor(data?) {
        this.keys = [];
        this.type = CURVE.SMOOTHSTEP;

        this.tension = 0.5; // used for CURVE_CARDINAL

        if (data) {
            for (let i = 0; i < data.length - 1; i += 2) {
                this.keys.push([data[i], data[i + 1]]);
            }
        }

        this.sort();
    }

    add(time, value) {
        const keys = this.keys;
        const len = keys.length;
        let i = 0;

        for (; i < len; i++) {
            if (keys[i][0] > time) {
                break;
            }
        }

        const key = [time, value];
        this.keys.splice(i, 0, key);
        return key;
    }

    get(index) {
        return this.keys[index];
    }

    sort() {
        this.keys.sort((a, b) => a[0] - b[0]);
    }

    value(time) {
        const keys = this.keys;

        // no keys
        if (!keys.length) {
            return 0;
        }

        // Clamp values before first and after last key
        if (time < keys[0][0]) {
            return keys[0][1];
        } else if (time > keys[keys.length - 1][0]) {
            return keys[keys.length - 1][1];
        }

        let leftTime = 0;
        let leftValue = keys.length ? keys[0][1] : 0;

        let rightTime = 1;
        let rightValue = 0;
        let i = 0;
        for (let i = 0, len = keys.length; i < len; i++) {
            // early exit check
            if (keys[i][0] === time) {
                return keys[i][1];
            }

            rightValue = keys[i][1];

            if (time < keys[i][0]) {
                rightTime = keys[i][0];
                break;
            }

            leftTime = keys[i][0];
            leftValue = keys[i][1];
        }

        const div = rightTime - leftTime;
        let interpolation = (div === 0 ? 0 : (time - leftTime) / div);

        if (this.type === CURVE.SMOOTHSTEP) {
            interpolation *= interpolation * (3 - 2 * interpolation);
        } else if (this.type === CURVE.CATMULL || this.type === CURVE.CARDINAL) {
            const p1 = leftValue;
            const p2 = rightValue;
            let p0 = p1 + (p1 - p2); // default control points are extended back/forward from existing points
            let p3 = p2 + (p2 - p1);

            let dt1 = rightTime - leftTime;
            let dt0 = dt1;
            let dt2 = dt1;

            // back up index to left key
            if (i > 0) {
                i = i - 1;
            }

            if (i > 0) {
                p0 = keys[i - 1][1];
                dt0 = keys[i][0] - keys[i - 1][0];
            }

            if (keys.length > i + 1) {
                dt1 = keys[i + 1][0] - keys[i][0];
            }

            if (keys.length > i + 2) {
                dt2 = keys[i + 2][0] - keys[i + 1][0];
                p3 = keys[i + 2][1];
            }

            // normalize p0 and p3 to be equal time with p1->p2
            p0 = p1 + (p0 - p1) * dt1 / dt0;
            p3 = p2 + (p3 - p2) * dt1 / dt2;

            if (this.type === CURVE.CATMULL) {
                return this._interpolateCatmullRom(p0, p1, p2, p3, interpolation);
            } else {
                return this._interpolateCardinal(p0, p1, p2, p3, interpolation, this.tension);
            }
        }

        return math.lerp(leftValue, rightValue, interpolation);
    }

    _interpolateHermite(p0, p1, t0, t1, s) {
        const s2 = s * s;
        const s3 = s * s * s;
        const h0 = 2 * s3 - 3 * s2 + 1;
        const h1 = -2 * s3 + 3 * s2;
        const h2 = s3 - 2 * s2 + s;
        const h3 = s3 - s2;

        return p0 * h0 + p1 * h1 + t0 * h2 + t1 * h3;
    }

    _interpolateCardinal(p0, p1, p2, p3, s, t) {
        const t0 = t * (p2 - p0);
        const t1 = t * (p3 - p1);

        return this._interpolateHermite(p1, p2, t0, t1, s);
    }

    _interpolateCatmullRom(p0, p1, p2, p3, s) {
        return this._interpolateCardinal(p0, p1, p2, p3, s, 0.5);
    }

    closest(time) {
        const keys = this.keys;
        const length = keys.length;
        let min = 2;
        let result = null;

        for (let i = 0; i < length; i++) {
            const diff = Math.abs(time - keys[i][0]);
            if (min >= diff) {
                min = diff;
                result = keys[i];
            } else {
                break;
            }
        }

        return result;
    }

    clone() {
        console.log('error');
        const result = new Curve();
        // result.keys = pc.extend(result.keys, this.keys);
        result.type = this.type;
        return result;
    }

    quantize(precision) {
        precision = Math.max(precision, 2);

        const values = new Float32Array(precision);
        const step = 1.0 / (precision - 1);

        // quantize graph to table of interpolated values
        for (let i = 0; i < precision; i++) {
            const value = this.value(step * i);
            values[i] = value;
        }

        return values;
    }

    get length() {
        return this.keys.length;
    }
}


