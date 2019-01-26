/* tslint:disable */
import { Vec3 } from './vec3';
import { Vec4 } from './vec4';
import { Quat } from './quat';
import * as math from './math';
export class Mat4 {
    data: Float32Array;

    constructor(
        v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number,
        v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number
    );
    constructor(v0: [
        number, number, number, number, number, number, number, number,
        number, number, number, number, number, number, number, number
    ]);
    constructor();
    constructor(v0?, v1?, v2?, v3?, v4?, v5?, v6?, v7?, v8?, v9?, v10?, v11?, v12?, v13?, v14?, v15?) {
        if (v0 && v0.length === 16) {
            this.data = new Float32Array(v0);
            return;
        }

        this.data = new Float32Array(16);

        if (typeof (v0) === 'number') {
            this.data[0] = v0;
            this.data[1] = v1;
            this.data[2] = v2;
            this.data[3] = v3;
            this.data[4] = v4;
            this.data[5] = v5;
            this.data[6] = v6;
            this.data[7] = v7;
            this.data[8] = v8;
            this.data[9] = v9;
            this.data[10] = v10;
            this.data[11] = v11;
            this.data[12] = v12;
            this.data[13] = v13;
            this.data[14] = v14;
            this.data[15] = v15;
        } else {
            this.setIdentity();
        }
    }



    add2(lhs: Mat4, rhs: Mat4): this {
        let a = lhs.data,
            b = rhs.data,
            r = this.data;

        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];
        r[3] = a[3] + b[3];
        r[4] = a[4] + b[4];
        r[5] = a[5] + b[5];
        r[6] = a[6] + b[6];
        r[7] = a[7] + b[7];
        r[8] = a[8] + b[8];
        r[9] = a[9] + b[9];
        r[10] = a[10] + b[10];
        r[11] = a[11] + b[11];
        r[12] = a[12] + b[12];
        r[13] = a[13] + b[13];
        r[14] = a[14] + b[14];
        r[15] = a[15] + b[15];

        return this;
    }


    add(rhs: Mat4): this {
        return this.add2(this, rhs);
    }


    clone(): Mat4 {
        return new Mat4().copy(this);
    }


    copy(rhs: Mat4): this {
        let src = rhs.data,
            dst = this.data;

        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        dst[4] = src[4];
        dst[5] = src[5];
        dst[6] = src[6];
        dst[7] = src[7];
        dst[8] = src[8];
        dst[9] = src[9];
        dst[10] = src[10];
        dst[11] = src[11];
        dst[12] = src[12];
        dst[13] = src[13];
        dst[14] = src[14];
        dst[15] = src[15];

        return this;
    }


    equals(rhs: Mat4): boolean {
        let l = this.data,
            r = rhs.data;

        return ((l[0] === r[0]) &&
            (l[1] === r[1]) &&
            (l[2] === r[2]) &&
            (l[3] === r[3]) &&
            (l[4] === r[4]) &&
            (l[5] === r[5]) &&
            (l[6] === r[6]) &&
            (l[7] === r[7]) &&
            (l[8] === r[8]) &&
            (l[9] === r[9]) &&
            (l[10] === r[10]) &&
            (l[11] === r[11]) &&
            (l[12] === r[12]) &&
            (l[13] === r[13]) &&
            (l[14] === r[14]) &&
            (l[15] === r[15]));
    }


    isIdentity(): boolean {
        return this.equals(Mat4.IDENTITY);
        // var m = this.data;

        // return ((m[0] === 1) &&
        //     (m[1] === 0) &&
        //     (m[2] === 0) &&
        //     (m[3] === 0) &&
        //     (m[4] === 0) &&
        //     (m[5] === 1) &&
        //     (m[6] === 0) &&
        //     (m[7] === 0) &&
        //     (m[8] === 0) &&
        //     (m[9] === 0) &&
        //     (m[10] === 1) &&
        //     (m[11] === 0) &&
        //     (m[12] === 0) &&
        //     (m[13] === 0) &&
        //     (m[14] === 0) &&
        //     (m[15] === 1));
    }


    mul2(lhs: Mat4, rhs: Mat4): this {
        let a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            a30, a31, a32, a33,
            b0, b1, b2, b3,
            a = lhs.data,
            b = rhs.data,
            r = this.data;

        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        a30 = a[12];
        a31 = a[13];
        a32 = a[14];
        a33 = a[15];

        b0 = b[0];
        b1 = b[1];
        b2 = b[2];
        b3 = b[3];
        r[0] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        r[1] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        r[2] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        r[3] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;

        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        r[4] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        r[5] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        r[6] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        r[7] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;

        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        r[8] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        r[9] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        r[10] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        r[11] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;

        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        r[12] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        r[13] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        r[14] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        r[15] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;

        return this;
    }


    mul(rhs: Mat4): this {
        return this.mul2(this, rhs);
    }

    mulVec4(v: Vec4): Vec4 {
        let a = this.data;
        let a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            a30, a31, a32, a33,
            b0, b1, b2, b3;

        b0 = v.data[0];
        b1 = v.data[1];
        b2 = v.data[2];
        b3 = v.data[3];
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        a30 = a[12];
        a31 = a[13];
        a32 = a[14];
        a33 = a[15];
        return new Vec4(
            a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3,
            a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3,
            a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3,
            a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3
        )
    }

    /**
     * 移动到某个点
     *
     * @param {Vec3} vec
     * @param {Vec3} [res] ref
     * @returns {Vec3} res
     * @memberof Mat4
     */
    transformPoint(vec: Vec3, res?/* ref */: Vec3): Vec3 {
        let x, y, z,
            m = this.data,
            v = vec.data;

        res = (res === undefined) ? new Vec3() : res;

        x =
            v[0] * m[0] +
            v[1] * m[4] +
            v[2] * m[8] +
            m[12];
        y =
            v[0] * m[1] +
            v[1] * m[5] +
            v[2] * m[9] +
            m[13];
        z =
            v[0] * m[2] +
            v[1] * m[6] +
            v[2] * m[10] +
            m[14];

        return res.set(x, y, z);
    }


    transformVector(vec: Vec3, res?: Vec3): Vec3 {
        let x, y, z,
            m = this.data,
            v = vec.data;

        res = (res === undefined) ? new Vec3() : res;

        x =
            v[0] * m[0] +
            v[1] * m[4] +
            v[2] * m[8];
        y =
            v[0] * m[1] +
            v[1] * m[5] +
            v[2] * m[9];
        z =
            v[0] * m[2] +
            v[1] * m[6] +
            v[2] * m[10];

        return res.set(x, y, z);
    }


    transformVec4(vec: Vec4, res: Vec4): Vec4 {
        let x, y, z, w,
            m = this.data,
            v = vec.data;

        res = (res === undefined) ? new Vec4() : res;

        x =
            v[0] * m[0] +
            v[1] * m[4] +
            v[2] * m[8] +
            v[3] * m[12];
        y =
            v[0] * m[1] +
            v[1] * m[5] +
            v[2] * m[9] +
            v[3] * m[13];
        z =
            v[0] * m[2] +
            v[1] * m[6] +
            v[2] * m[10] +
            v[3] * m[14];

        w =
            v[0] * m[3] +
            v[1] * m[7] +
            v[2] * m[11] +
            v[3] * m[15];

        return res.set(x, y, z, w);
    }


    setLookAt = (() => {
        let x: Vec3, y: Vec3, z: Vec3;

        x = new Vec3();
        y = new Vec3();
        z = new Vec3();

        return (position: Vec3, target: Vec3, up: Vec3): this => {
            z.sub2(position, target).normalize();
            if (z.length() === 0) {
                z.z = 1;
            }
            y.copy(up).normalize();
            x.cross(y, z).normalize();
            if (x.length() === 0) {
                z.x += 0.0001;
                x.cross(y, z).normalize();
            }
            y.cross(z, x);

            let r = this.data;

            r[0] = x.x;
            r[1] = x.y;
            r[2] = x.z;
            r[3] = 0;
            r[4] = y.x;
            r[5] = y.y;
            r[6] = y.z;
            r[7] = 0;
            r[8] = z.x;
            r[9] = z.y;
            r[10] = z.z;
            r[11] = 0;
            r[12] = position.x;
            r[13] = position.y;
            r[14] = position.z;
            r[15] = 1;

            return this;
        };
    })();


    setFrustum(left: number, right: number, bottom: number, top: number, znear: number, zfar: number): this {
        let temp1, temp2, temp3, temp4, r;

        temp1 = 2 * znear;
        temp2 = right - left;
        temp3 = top - bottom;
        temp4 = zfar - znear;

        r = this.data;
        r[0] = temp1 / temp2;
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = temp1 / temp3;
        r[6] = 0;
        r[7] = 0;
        r[8] = (right + left) / temp2;
        r[9] = (top + bottom) / temp3;
        r[10] = (-zfar - znear) / temp4;
        r[11] = -1;
        r[12] = 0;
        r[13] = 0;
        r[14] = (-temp1 * zfar) / temp4;
        r[15] = 0;

        return this;
    }


    setPerspective(fovy: number, aspect: number, znear: number, zfar: number, fovIsHorizontal?: boolean): this {
        let xmax, ymax;

        if (!fovIsHorizontal) {
            ymax = znear * Math.tan(fovy * Math.PI / 360);
            xmax = ymax * aspect;
        } else {
            xmax = znear * Math.tan(fovy * Math.PI / 360);
            ymax = xmax / aspect;
        }

        return this.setFrustum(-xmax, xmax, -ymax, ymax, znear, zfar);
    }

    /**
     * 正视投影
     * @param {number} left
     * @param {number} right
     * @param {number} bottom
     * @param {number} top
     * @param {number} near
     * @param {number} far
     * @returns {this}
     * @memberof Mat4
     */
    setOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number): this {
        let r = this.data;

        r[0] = 2 / (right - left);
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = 2 / (top - bottom);
        r[6] = 0;
        r[7] = 0;
        r[8] = 0;
        r[9] = 0;
        r[10] = -2 / (far - near);
        r[11] = 0;
        r[12] = -(right + left) / (right - left);
        r[13] = -(top + bottom) / (top - bottom);
        r[14] = -(far + near) / (far - near);
        r[15] = 1;

        return this;
    }


    setFromAxisAngle(axis: Vec3, angle: number): this {
        let x, y, z, c, s, t, tx, ty, m;

        angle *= math.DEG_TO_RAD;

        x = axis.x;
        y = axis.y;
        z = axis.z;
        c = Math.cos(angle);
        s = Math.sin(angle);
        t = 1 - c;
        tx = t * x;
        ty = t * y;
        m = this.data;

        m[0] = tx * x + c;
        m[1] = tx * y + s * z;
        m[2] = tx * z - s * y;
        m[3] = 0;
        m[4] = tx * y - s * z;
        m[5] = ty * y + c;
        m[6] = ty * z + s * x;
        m[7] = 0;
        m[8] = tx * z + s * y;
        m[9] = ty * z - x * s;
        m[10] = t * z * z + c;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return this;
    }


    setTranslate(x: number, y: number, z: number): this {
        let m = this.data;

        // m[0] = 1;
        // m[1] = 0;
        // m[2] = 0;
        // m[3] = 0;
        // m[4] = 0;
        // m[5] = 1;
        // m[6] = 0;
        // m[7] = 0;
        // m[8] = 0;
        // m[9] = 0;
        // m[10] = 1;
        // m[11] = 0;
        m[12] = x;
        m[13] = y;
        m[14] = z;
        // m[15] = 1;

        return this;
    }


    setScale(x: number, y: number, z: number): this {
        let m = this.data;

        m[0] = x;
        // m[1] = 0;
        // m[2] = 0;
        // m[3] = 0;
        // m[4] = 0;
        m[5] = y;
        // m[6] = 0;
        // m[7] = 0;
        // m[8] = 0;
        // m[9] = 0;
        m[10] = z;
        // m[11] = 0;
        // m[12] = 0;
        // m[13] = 0;
        // m[14] = 0;
        // m[15] = 1;

        return this;
    }

    /**
     * 修改自身，逆矩阵
     *
     * @returns {this} this
     * @memberof Mat4
     */
    invert(): this {
        let a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            a30, a31, a32, a33,
            b00, b01, b02, b03,
            b04, b05, b06, b07,
            b08, b09, b10, b11,
            det, invDet, m;

        m = this.data;
        a00 = m[0];
        a01 = m[1];
        a02 = m[2];
        a03 = m[3];
        a10 = m[4];
        a11 = m[5];
        a12 = m[6];
        a13 = m[7];
        a20 = m[8];
        a21 = m[9];
        a22 = m[10];
        a23 = m[11];
        a30 = m[12];
        a31 = m[13];
        a32 = m[14];
        a33 = m[15];

        b00 = a00 * a11 - a01 * a10;
        b01 = a00 * a12 - a02 * a10;
        b02 = a00 * a13 - a03 * a10;
        b03 = a01 * a12 - a02 * a11;
        b04 = a01 * a13 - a03 * a11;
        b05 = a02 * a13 - a03 * a12;
        b06 = a20 * a31 - a21 * a30;
        b07 = a20 * a32 - a22 * a30;
        b08 = a20 * a33 - a23 * a30;
        b09 = a21 * a32 - a22 * a31;
        b10 = a21 * a33 - a23 * a31;
        b11 = a22 * a33 - a23 * a32;

        det = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);
        if (det === 0) {
            // #ifdef DEBUG
            console.warn("pc.Mat4#invert: Can't invert matrix, determinant is 0");
            // #endif
            this.setIdentity();
        } else {
            invDet = 1 / det;

            m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
            m[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
            m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
            m[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
            m[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
            m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
            m[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
            m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
            m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
            m[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
            m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
            m[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
            m[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
            m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
            m[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
            m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
        }


        return this;
    }


    set(src: [
        number, number, number, number,
        number, number, number, number,
        number, number, number, number,
        number, number, number, number
    ]): this {
        let dst = this.data;
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        dst[4] = src[4];
        dst[5] = src[5];
        dst[6] = src[6];
        dst[7] = src[7];
        dst[8] = src[8];
        dst[9] = src[9];
        dst[10] = src[10];
        dst[11] = src[11];
        dst[12] = src[12];
        dst[13] = src[13];
        dst[14] = src[14];
        dst[15] = src[15];

        return this;
    }


    setIdentity(): this {
        let m = this.data;
        m[0] = 1;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = 1;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = 1;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return this;
    }


    setTRS(t: Vec3, r: Quat, s: Vec3): this {
        let tx, ty, tz, qx, qy, qz, qw, sx, sy, sz,
            x2, y2, z2, xx, xy, xz, yy, yz, zz, wx, wy, wz, m;

        tx = t.x;
        ty = t.y;
        tz = t.z;

        qx = r.x;
        qy = r.y;
        qz = r.z;
        qw = r.w;

        sx = s.x;
        sy = s.y;
        sz = s.z;

        x2 = qx + qx;
        y2 = qy + qy;
        z2 = qz + qz;
        xx = qx * x2;
        xy = qx * y2;
        xz = qx * z2;
        yy = qy * y2;
        yz = qy * z2;
        zz = qz * z2;
        wx = qw * x2;
        wy = qw * y2;
        wz = qw * z2;

        m = this.data;

        m[0] = (1 - (yy + zz)) * sx;
        m[1] = (xy + wz) * sx;
        m[2] = (xz - wy) * sx;
        m[3] = 0;

        m[4] = (xy - wz) * sy;
        m[5] = (1 - (xx + zz)) * sy;
        m[6] = (yz + wx) * sy;
        m[7] = 0;

        m[8] = (xz + wy) * sz;
        m[9] = (yz - wx) * sz;
        m[10] = (1 - (xx + yy)) * sz;
        m[11] = 0;

        m[12] = tx;
        m[13] = ty;
        m[14] = tz;
        m[15] = 1;

        return this;
    }


    transpose(): this {
        let tmp, m = this.data;

        tmp = m[1];
        m[1] = m[4];
        m[4] = tmp;

        tmp = m[2];
        m[2] = m[8];
        m[8] = tmp;

        tmp = m[3];
        m[3] = m[12];
        m[12] = tmp;

        tmp = m[6];
        m[6] = m[9];
        m[9] = tmp;

        tmp = m[7];
        m[7] = m[13];
        m[13] = tmp;

        tmp = m[11];
        m[11] = m[14];
        m[14] = tmp;

        return this;
    }

    invertTo3x3(res: Mat4): this {
        let a11, a21, a31, a12, a22, a32, a13, a23, a33,
            m, r, det, idet;

        m = this.data;
        r = res.data;

        let m0 = m[0];
        let m1 = m[1];
        let m2 = m[2];

        let m4 = m[4];
        let m5 = m[5];
        let m6 = m[6];

        let m8 = m[8];
        let m9 = m[9];
        let m10 = m[10];

        a11 = m10 * m5 - m6 * m9;
        a21 = -m10 * m1 + m2 * m9;
        a31 = m6 * m1 - m2 * m5;
        a12 = -m10 * m4 + m6 * m8;
        a22 = m10 * m0 - m2 * m8;
        a32 = -m6 * m0 + m2 * m4;
        a13 = m9 * m4 - m5 * m8;
        a23 = -m9 * m0 + m1 * m8;
        a33 = m5 * m0 - m1 * m4;

        det = m0 * a11 + m1 * a12 + m2 * a13;
        if (det === 0) { // no inverse
            // #ifdef DEBUG
            console.warn("pc.Mat4#invertTo3x3: Can't invert matrix, determinant is 0");
            // #endif
            return this;
        }

        idet = 1 / det;

        r[0] = idet * a11;
        r[1] = idet * a21;
        r[2] = idet * a31;
        r[3] = idet * a12;
        r[4] = idet * a22;
        r[5] = idet * a32;
        r[6] = idet * a13;
        r[7] = idet * a23;
        r[8] = idet * a33;

        return this;
    }


    getTranslation(t?/* ref */: Vec3): Vec3 {
        t = (t === undefined) ? new Vec3() : t;

        return t.set(this.data[12], this.data[13], this.data[14]);
    }


    getX(x?: Vec3): Vec3 {
        x = (x === undefined) ? new Vec3() : x;

        return x.set(this.data[0], this.data[1], this.data[2]);
    }


    getY(y?/*ref and return*/: Vec3): Vec3 {
        y = (y === undefined) ? new Vec3() : y;

        return y.set(this.data[4], this.data[5], this.data[6]);
    }


    getZ(z?: Vec3): Vec3 {
        z = (z === undefined) ? new Vec3() : z;

        return z.set(this.data[8], this.data[9], this.data[10]);
    }


    getScale = (() => {
        let x, y, z;

        x = new Vec3();
        y = new Vec3();
        z = new Vec3();

        return (scale?: Vec3) => {
            scale = (scale === undefined) ? new Vec3() : scale;

            this.getX(x);
            this.getY(y);
            this.getZ(z);
            scale.set(x.length(), y.length(), z.length());

            return scale;
        };
    })();


    // http://en.wikipedia.org/wiki/Rotation_matrix#Conversion_from_and_to_axis-angle
    // The 3D space is right-handed, so the rotation around each axis will be counterclockwise
    // for an observer placed so that the axis goes in his or her direction (Right-hand rule).
    setFromEulerAngles(ex: number, ey: number, ez: number): this {
        let s1, c1, s2, c2, s3, c3, m;

        ex *= math.DEG_TO_RAD;
        ey *= math.DEG_TO_RAD;
        ez *= math.DEG_TO_RAD;

        // Solution taken from http://en.wikipedia.org/wiki/Euler_angles#Matrix_orientation
        s1 = Math.sin(-ex);
        c1 = Math.cos(-ex);
        s2 = Math.sin(-ey);
        c2 = Math.cos(-ey);
        s3 = Math.sin(-ez);
        c3 = Math.cos(-ez);

        m = this.data;

        // Set rotation elements
        m[0] = c2 * c3;
        m[1] = -c2 * s3;
        m[2] = s2;
        m[3] = 0;

        m[4] = c1 * s3 + c3 * s1 * s2;
        m[5] = c1 * c3 - s1 * s2 * s3;
        m[6] = -c2 * s1;
        m[7] = 0;

        m[8] = s1 * s3 - c1 * c3 * s2;
        m[9] = c3 * s1 + c1 * s2 * s3;
        m[10] = c1 * c2;
        m[11] = 0;

        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return this;
    }


    getEulerAngles = (() => {
        let scale = new Vec3();

        return (eulers?: Vec3): Vec3 => {
            let x, y, z, sx, sy, sz, m, halfPi;

            eulers = (eulers === undefined) ? new Vec3() : eulers;

            this.getScale(scale);
            sx = scale.x;
            sy = scale.y;
            sz = scale.z;

            m = this.data;

            y = Math.asin(-m[2] / sx);
            halfPi = Math.PI * 0.5;

            if (y < halfPi) {
                if (y > -halfPi) {
                    x = Math.atan2(m[6] / sy, m[10] / sz);
                    z = Math.atan2(m[1] / sx, m[0] / sx);
                } else {
                    // Not a unique solution
                    z = 0;
                    x = -Math.atan2(m[4] / sy, m[5] / sy);
                }
            } else {
                // Not a unique solution
                z = 0;
                x = Math.atan2(m[4] / sy, m[5] / sy);
            }

            return eulers.set(x, y, z).scale(math.RAD_TO_DEG);
        };
    })();


    toString(): string {
        let i, t;

        t = '[';
        for (i = 0; i < 16; i += 1) {
            t += this.data[i];
            t += (i !== 15) ? ', ' : '';
        }
        t += ']';
        return t;
    }


    static readonly IDENTITY: Mat4 = new Mat4();


    static readonly ZERO: Mat4 = new Mat4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
}

