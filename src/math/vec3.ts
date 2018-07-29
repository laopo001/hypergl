

/* tslint:disable */
export class Vec3 {
    addSelf(arg0: any): any {
        throw new Error('Method not implemented.');
    }
    data: Float32Array;
    constructor();
    constructor(x: number, y: number, z: number)
    constructor(x: [number, number, number])
    constructor(x?, y?, z?) {
        if (x && x.length === 3) {
            this.data = new Float32Array(x);
            return;
        }

        this.data = new Float32Array(3);

        this.data[0] = x || 0;
        this.data[1] = y || 0;
        this.data[2] = z || 0;
    }


    add(rhs: Vec3): this {
        let a = this.data,
            b = rhs.data;

        a[0] += b[0];
        a[1] += b[1];
        a[2] += b[2];

        return this;
    }


    add2(lhs: Vec3, rhs: Vec3): this {
        let a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];

        return this;
    }


    clone(): Vec3 {
        return new Vec3().copy(this);
    }


    copy(rhs: Vec3): this {
        let a = this.data,
            b = rhs.data;

        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];

        return this;
    }


    cross(lhs: Vec3, rhs: Vec3): this {
        let a, b, r, ax, ay, az, bx, by, bz;

        a = lhs.data;
        b = rhs.data;
        r = this.data;

        ax = a[0];
        ay = a[1];
        az = a[2];
        bx = b[0];
        by = b[1];
        bz = b[2];

        r[0] = ay * bz - by * az;
        r[1] = az * bx - bz * ax;
        r[2] = ax * by - bx * ay;

        return this;
    }


    dot(rhs: Vec3): number {
        let a = this.data,
            b = rhs.data;

        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }


    equals(rhs: Vec3): boolean {
        let a = this.data,
            b = rhs.data;

        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    }


    length(): number {
        let v = this.data;

        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    }


    lengthSq(): number {
        let v = this.data;

        return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
    }


    lerp(lhs: Vec3, rhs: Vec3, alpha: number): this {
        let a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] + alpha * (b[0] - a[0]);
        r[1] = a[1] + alpha * (b[1] - a[1]);
        r[2] = a[2] + alpha * (b[2] - a[2]);

        return this;
    }


    mul(rhs: Vec3): this {
        let a = this.data,
            b = rhs.data;

        a[0] *= b[0];
        a[1] *= b[1];
        a[2] *= b[2];

        return this;
    }


    mul2(lhs: Vec3, rhs: Vec3): this {
        let a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] * b[0];
        r[1] = a[1] * b[1];
        r[2] = a[2] * b[2];

        return this;
    }


    normalize(): this {
        let v = this.data;

        let lengthSq = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
        if (lengthSq > 0) {
            let invLength = 1 / Math.sqrt(lengthSq);
            v[0] *= invLength;
            v[1] *= invLength;
            v[2] *= invLength;
        }

        return this;
    }


    project(rhs: Vec3): this {
        let a = this.data;
        let b = rhs.data;
        let a_dot_b = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        let b_dot_b = b[0] * b[0] + b[1] * b[1] + b[2] * b[2];
        let s = a_dot_b / b_dot_b;
        a[0] = b[0] * s;
        a[1] = b[1] * s;
        a[2] = b[2] * s;
        return this;
    }


    scale(scalar: number): this {
        let v = this.data;

        v[0] *= scalar;
        v[1] *= scalar;
        v[2] *= scalar;

        return this;
    }


    set(x: number, y: number, z: number): this {
        let v = this.data;

        v[0] = x;
        v[1] = y;
        v[2] = z;

        return this;
    }


    sub(rhs: Vec3): this {
        let a = this.data,
            b = rhs.data;

        a[0] -= b[0];
        a[1] -= b[1];
        a[2] -= b[2];

        return this;
    }


    sub2(lhs: Vec3, rhs: Vec3): this {
        let a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        r[2] = a[2] - b[2];

        return this;
    }


    toString(): string {
        return '[' + this.data[0] + ', ' + this.data[1] + ', ' + this.data[2] + ']';
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


    static readonly BACK: Vec3 = new Vec3(0, 0, 1);


    static readonly DOWN: Vec3 = new Vec3(0, -1, 0);


    static readonly FORWARD: Vec3 = new Vec3(0, 0, -1);


    static readonly LEFT: Vec3 = new Vec3(-1, 0, 0);


    static readonly ONE: Vec3 = new Vec3(1, 1, 1);


    static readonly RIGHT: Vec3 = new Vec3(1, 0, 0);


    static readonly UP: Vec3 = new Vec3(0, 1, 0);


    static readonly ZERO: Vec3 = new Vec3(0, 0, 0);
}


