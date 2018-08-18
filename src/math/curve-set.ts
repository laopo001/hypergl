import { Curve } from './curve';
import { CURVE } from '../conf';
/* tslint:disable */

export class CurveSet {
    curves: any[];
    _type: number;
    constructor(...args) {
        let i;

        this.curves = [];
        this._type = CURVE.SMOOTHSTEP;

        if (args.length > 1) {
            for (i = 0; i < args.length; i++) {
                this.curves.push(new Curve(args[i]));
            }
        } else {
            if (args.length === 0) {
                this.curves.push(new Curve());
            } else {
                const arg = args[0];
                if (typeof(arg) === 'number') {
                    for (i = 0; i < arg; i++) {
                        this.curves.push(new Curve());
                    }
                } else {
                    for (i = 0; i < arg.length; i++) {
                        this.curves.push(new Curve(arg[i]));
                    }
                }
            }
        }
    }

    get(index) {
        return this.curves[index];
    }

    value(time, result) {
        const length = this.curves.length;
        result = result || [];
        result.length = length;

        for (let i = 0; i < length; i++) {
            result[i] = this.curves[i].value(time);
        }

        return result;
    }

    clone() {
        const result = new CurveSet();

        result.curves = [];
        for (let i = 0; i < this.curves.length; i++) {
            result.curves.push(this.curves[i].clone());
        }

        result._type = this._type;

        return result;
    }

    quantize(precision) {
        precision = Math.max(precision, 2);

        const numCurves = this.curves.length;
        const values = new Float32Array(precision * numCurves);
        const step = 1.0 / (precision - 1);
        const temp = [];

        for (let i = 0; i < precision; i++) { // quantize graph to table of interpolated values
            const value = this.value(step * i, temp);
            if (numCurves === 1) {
                values[i] = value[0];
            } else {
                for (let j = 0; j < numCurves; j++) {
                    values[i * numCurves + j] = value[j];
                }
            }
        }

        return values;
    }

    get length() {
        return this.curves.length;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
        for (let i = 0; i < this.curves.length; i++) {
            this.curves[i].type = value;
        }
    }
}
