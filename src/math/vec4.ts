/* tslint:disable */
export class Vec4 {
    data: Float32Array;
    constructor();
    constructor(x: number, y: number, z: number, w: number)
    constructor(x: [number, number, number, number])
    constructor(x?, y?, z?, w?) {
        if (x && x.length === 4) {
            this.data = new Float32Array(x);
            return;
        }

        this.data = new Float32Array(4);

        this.data[0] = x || 0;
        this.data[1] = y || 0;
        this.data[2] = z || 0;
        this.data[3] = w || 0;
    }



    add(rhs: Vec4): this {
        let a = this.data,
            b = rhs.data;

        a[0] += b[0];
        a[1] += b[1];
        a[2] += b[2];
        a[3] += b[3];

        return this;
    }


    add2(lhs: Vec4, rhs: Vec4): this {
        let a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];
        r[3] = a[3] + b[3];

        return this;
    }


    clone(): Vec4 {
        return new Vec4().copy(this);
    }


    copy(rhs: Vec4): this {
        let a = this.data,
            b = rhs.data;

        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];

        return this;
    }


    dot(rhs: Vec4): Number {
        let a = this.data,
            b = rhs.data;

        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }


    equals(rhs: Vec4): boolean {
        let a = this.data,
            b = rhs.data;

        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }


    length(): number {
        let v = this.data;

        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3]);
    }


    lengthSq(): number {
        let v = this.data;

        return v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3];
    }


    lerp(lhs: Vec4, rhs: Vec4, alpha: number): this {
        let a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] + alpha * (b[0] - a[0]);
        r[1] = a[1] + alpha * (b[1] - a[1]);
        r[2] = a[2] + alpha * (b[2] - a[2]);
        r[3] = a[3] + alpha * (b[3] - a[3]);

        return this;
    }


    mul(rhs: Vec4): this {
        let a = this.data,
            b = rhs.data;

        a[0] *= b[0];
        a[1] *= b[1];
        a[2] *= b[2];
        a[3] *= b[3];

        return this;
    }


    mul2(lhs: Vec4, rhs: Vec4): this {
        let a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] * b[0];
        r[1] = a[1] * b[1];
        r[2] = a[2] * b[2];
        r[3] = a[3] * b[3];

        return this;
    }


    normalize(): this {
        let v = this.data;

        let lengthSq = v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3];
        if (lengthSq > 0) {
            let invLength = 1 / Math.sqrt(lengthSq);
            v[0] *= invLength;
            v[1] *= invLength;
            v[2] *= invLength;
            v[3] *= invLength;
        }

        return this;
    }


    scale(scalar: number): this {
        let v = this.data;

        v[0] *= scalar;
        v[1] *= scalar;
        v[2] *= scalar;
        v[3] *= scalar;

        return this;
    }


    set(x: number, y: number, z: number, w: number): this {
        let v = this.data;

        v[0] = x;
        v[1] = y;
        v[2] = z;
        v[3] = w;

        return this;
    }


    sub(rhs: Vec4): this {
        let a = this.data,
            b = rhs.data;

        a[0] -= b[0];
        a[1] -= b[1];
        a[2] -= b[2];
        a[3] -= b[3];

        return this;
    }


    sub2(lhs: Vec4, rhs: Vec4): this {
        let a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        r[2] = a[2] - b[2];
        r[3] = a[3] - b[3];

        return this;
    }


    toString(): string {
        return '[' + this.data[0] + ', ' + this.data[1] + ', ' + this.data[2] + ', ' + this.data[3] + ']';
    }


    get x(): number {
        return this.data[0];
    }
    set x(value: number) {
        this.data[0] = value;
    }


    get y(): number {
        return this.data[1];
    }
    set y(value: number) {
        this.data[1] = value;
    }


    get z(): number {
        return this.data[2];
    }
    set z(value: number) {
        this.data[2] = value;
    }


    get w(): number {
        return this.data[2];
    }
    set w(value: number) {
        this.data[2] = value;
    }


    static readonly ONE: Vec4;


    static readonly ZERO: Vec4;
}
