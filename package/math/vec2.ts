/* tslint:disable */
export class Vec2 {
    data: Float32Array;

    constructor();
    constructor(x: number, y: number);
    constructor(x: [number, number]);
    constructor(x?, y?) {
        if (x && x.length === 2) {
            this.data = new Float32Array(x);
            return;
        }

        this.data = new Float32Array(2);

        this.data[0] = x || 0;
        this.data[1] = y || 0;
    }


    add(rhs: Vec2): this {
        let a = this.data,
            b = rhs.data;

        a[0] += b[0];
        a[1] += b[1];

        return this;
    }


    add2(lhs: Vec2, rhs: Vec2): this {
        let a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];

        return this;
    }


    clone(): Vec2 {
        return new Vec2().copy(this);
    }


    copy(rhs: Vec2): this {
        let a = this.data,
            b = rhs.data;

        a[0] = b[0];
        a[1] = b[1];

        return this;
    }


    dot(rhs: Vec2): number {
        let a = this.data,
            b = rhs.data;

        return a[0] * b[0] + a[1] * b[1];
    }


    equals(rhs: Vec2): boolean {
        let a = this.data,
            b = rhs.data;

        return a[0] === b[0] && a[1] === b[1];
    }


    length(): number {
        let v = this.data;

        return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    }


    lengthSq(): number {
        let v = this.data;

        return v[0] * v[0] + v[1] * v[1];
    }


    lerp(lhs: Vec2, rhs: Vec2, alpha: number): this {
        let a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] + alpha * (b[0] - a[0]);
        r[1] = a[1] + alpha * (b[1] - a[1]);

        return this;
    }


    mul(rhs: Vec2): this {
        let a = this.data,
            b = rhs.data;

        a[0] *= b[0];
        a[1] *= b[1];

        return this;
    }


    mul2(lhs: Vec2, rhs: Vec2): this {
        let a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] * b[0];
        r[1] = a[1] * b[1];

        return this;
    }


    normalize(): this {
        let v = this.data;

        let lengthSq = v[0] * v[0] + v[1] * v[1];
        if (lengthSq > 0) {
            let invLength = 1 / Math.sqrt(lengthSq);
            v[0] *= invLength;
            v[1] *= invLength;
        }

        return this;
    }


    scale(scalar: number): this {
        let v = this.data;

        v[0] *= scalar;
        v[1] *= scalar;

        return this;
    }


    set(x: number, y: number): this {
        let v = this.data;

        v[0] = x;
        v[1] = y;

        return this;
    }


    sub(rhs: Vec2): this {
        let a = this.data,
            b = rhs.data;

        a[0] -= b[0];
        a[1] -= b[1];

        return this;
    }


    sub2(lhs: Vec2, rhs: Vec2): this {
        let a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];

        return this;
    }


    toString(): string {
        return '[' + this.data[0] + ', ' + this.data[1] + ']';
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


    static readonly ONE: Vec2 = new Vec2(1, 1);


    static readonly RIGHT: Vec2 = new Vec2(1, 0);


    static readonly UP: Vec2 = new Vec2(0, 1);


    static readonly ZERO: Vec2 = new Vec2(0, 0);
}
