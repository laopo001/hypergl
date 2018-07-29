/**
 * File: c:\Users\35327\Githubs\hypergl\src\shape\bounding-box.ts
 * Project: c:\Users\35327\Githubs\hypergl
 * Created Date: Saturday, July 28th 2018, 7:00:20 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, July 28th 2018, 7:15:05 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2018 jiguang
 */

import { Vec3 } from '../math/vec3';
import { Mat4 } from '../math/mat4';

const tmpVecA = new Vec3();
const tmpVecB = new Vec3();
const tmpVecC = new Vec3();
const tmpVecD = new Vec3();
const tmpVecE = new Vec3();


export class BoundingBox {
    center: Vec3;
    halfExtents: Vec3;
    _min: Vec3;
    _max: Vec3;
    type: any;
    constructor(center?: Vec3, halfExtents?: Vec3) {
        this.center = center || new Vec3(0, 0, 0);
        this.halfExtents = halfExtents || new Vec3(0.5, 0.5, 0.5);
        this._min = new Vec3();
        this._max = new Vec3();
    }


    add({ center, halfExtents }) {
        const tc = this.center.data;
        const tcx = tc[0];
        const tcy = tc[1];
        const tcz = tc[2];
        const th = this.halfExtents.data;
        const thx = th[0];
        const thy = th[1];
        const thz = th[2];
        let tminx = tcx - thx;
        let tmaxx = tcx + thx;
        let tminy = tcy - thy;
        let tmaxy = tcy + thy;
        let tminz = tcz - thz;
        let tmaxz = tcz + thz;

        const oc = center.data;
        const ocx = oc[0];
        const ocy = oc[1];
        const ocz = oc[2];
        const oh = halfExtents.data;
        const ohx = oh[0];
        const ohy = oh[1];
        const ohz = oh[2];
        const ominx = ocx - ohx;
        const omaxx = ocx + ohx;
        const ominy = ocy - ohy;
        const omaxy = ocy + ohy;
        const ominz = ocz - ohz;
        const omaxz = ocz + ohz;

        if (ominx < tminx) tminx = ominx;
        if (omaxx > tmaxx) tmaxx = omaxx;
        if (ominy < tminy) tminy = ominy;
        if (omaxy > tmaxy) tmaxy = omaxy;
        if (ominz < tminz) tminz = ominz;
        if (omaxz > tmaxz) tmaxz = omaxz;

        tc[0] = (tminx + tmaxx) * 0.5;
        tc[1] = (tminy + tmaxy) * 0.5;
        tc[2] = (tminz + tmaxz) * 0.5;
        th[0] = (tmaxx - tminx) * 0.5;
        th[1] = (tmaxy - tminy) * 0.5;
        th[2] = (tmaxz - tminz) * 0.5;
    }

    copy({ center, halfExtents, type }) {
        this.center.copy(center);
        this.halfExtents.copy(halfExtents);
        this.type = type;
    }

    clone() {
        return new BoundingBox(this.center.clone(), this.halfExtents.clone());
    }


    intersects(other) {
        const aMax = this.getMax();
        const aMin = this.getMin();
        const bMax = other.getMax();
        const bMin = other.getMin();

        return (aMin.x <= bMax.x) && (aMax.x >= bMin.x) &&
            (aMin.y <= bMax.y) && (aMax.y >= bMin.y) &&
            (aMin.z <= bMax.z) && (aMax.z >= bMin.z);
    }

    _intersectsRay({ origin, direction }, point) {
        const tMin = tmpVecA.copy(this.getMin()).sub(origin).data;
        const tMax = tmpVecB.copy(this.getMax()).sub(origin).data;
        const dir = direction.data;

        // Ensure that we are not dividing it by zero
        for (let i = 0; i < 3; i++) {
            if (dir[i] === 0) {
                tMin[i] = tMin[i] < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
                tMax[i] = tMax[i] < 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
            } else {
                tMin[i] /= dir[i];
                tMax[i] /= dir[i];
            }
        }

        const realMin = tmpVecC.set(Math.min(tMin[0], tMax[0]), Math.min(tMin[1], tMax[1]), Math.min(tMin[2], tMax[2])).data;
        const realMax = tmpVecD.set(Math.max(tMin[0], tMax[0]), Math.max(tMin[1], tMax[1]), Math.max(tMin[2], tMax[2])).data;

        const minMax = Math.min(Math.min(realMax[0], realMax[1]), realMax[2]);
        const maxMin = Math.max(Math.max(realMin[0], realMin[1]), realMin[2]);

        const intersects = minMax >= maxMin && maxMin >= 0;

        if (intersects) {
            point.copy(direction).scale(maxMin).add(origin);
        }

        return intersects;
    }

    _fastIntersectsRay({ direction, origin }) {
        const diff = tmpVecA;
        const cross = tmpVecB;
        const prod = tmpVecC;
        const absDiff = tmpVecD;
        const absDir = tmpVecE;
        const rayDir = direction;

        diff.sub2(origin, this.center);
        absDiff.set(Math.abs(diff.x), Math.abs(diff.y), Math.abs(diff.z));

        prod.mul2(diff, rayDir);

        if (absDiff.x > this.halfExtents.x && prod.x >= 0) {
            return false;
        }

        if (absDiff.y > this.halfExtents.y && prod.y >= 0) {
            return false;
        }

        if (absDiff.z > this.halfExtents.z && prod.z >= 0) {
            return false;
        }

        absDir.set(Math.abs(rayDir.x), Math.abs(rayDir.y), Math.abs(rayDir.z));
        cross.cross(rayDir, diff);
        cross.set(Math.abs(cross.x), Math.abs(cross.y), Math.abs(cross.z));

        if (cross.x > this.halfExtents.y * absDir.z + this.halfExtents.z * absDir.y) {
            return false;
        }

        if (cross.y > this.halfExtents.x * absDir.z + this.halfExtents.z * absDir.x) {
            return false;
        }

        if (cross.z > this.halfExtents.x * absDir.y + this.halfExtents.y * absDir.x) {
            return false;
        }

        return true;
    }


    intersectsRay(ray, point) {
        if (point) {
            return this._intersectsRay(ray, point);
        } else {
            return this._fastIntersectsRay(ray);
        }
    }

    setMinMax(min, max) {
        this.center.add2(max, min).scale(0.5);
        this.halfExtents.sub2(max, min).scale(0.5);
    }


    getMin() {
        return this._min.copy(this.center).sub(this.halfExtents);
    }


    getMax() {
        return this._max.copy(this.center).add(this.halfExtents);
    }


    containsPoint({ data }) {
        const min = this.getMin();
        const max = this.getMax();
        let i;

        for (i = 0; i < 3; ++i) {
            if (data[i] < min.data[i] || data[i] > max.data[i]) {
                return false;
            }
        }

        return true;
    }


    setFromTransformedAabb({ center, halfExtents }: BoundingBox, m: Mat4) {
        const bc = this.center;
        const br = this.halfExtents;
        const ac = center.data;
        const ar = halfExtents.data;

        // tslint:disable-next-line:no-parameter-reassignment
        const data = m.data;
        const mx0 = data[0];
        const mx1 = data[4];
        const mx2 = data[8];
        const my0 = data[1];
        const my1 = data[5];
        const my2 = data[9];
        const mz0 = data[2];
        const mz1 = data[6];
        const mz2 = data[10];

        const mx0a = Math.abs(mx0);
        const mx1a = Math.abs(mx1);
        const mx2a = Math.abs(mx2);
        const my0a = Math.abs(my0);
        const my1a = Math.abs(my1);
        const my2a = Math.abs(my2);
        const mz0a = Math.abs(mz0);
        const mz1a = Math.abs(mz1);
        const mz2a = Math.abs(mz2);

        bc.set(
            data[12] + mx0 * ac[0] + mx1 * ac[1] + mx2 * ac[2],
            data[13] + my0 * ac[0] + my1 * ac[1] + my2 * ac[2],
            data[14] + mz0 * ac[0] + mz1 * ac[1] + mz2 * ac[2]
        );

        br.set(
            mx0a * ar[0] + mx1a * ar[1] + mx2a * ar[2],
            my0a * ar[0] + my1a * ar[1] + my2a * ar[2],
            mz0a * ar[0] + mz1a * ar[1] + mz2a * ar[2]
        );
    }

    compute(vertices) {
        const min = tmpVecA.set(vertices[0], vertices[1], vertices[2]);
        const max = tmpVecB.set(vertices[0], vertices[1], vertices[2]);
        const numVerts = vertices.length / 3;

        for (let i = 1; i < numVerts; i++) {
            const x = vertices[i * 3 + 0];
            const y = vertices[i * 3 + 1];
            const z = vertices[i * 3 + 2];
            if (x < min.x) min.x = x;
            if (y < min.y) min.y = y;
            if (z < min.z) min.z = z;
            if (x > max.x) max.x = x;
            if (y > max.y) max.y = y;
            if (z > max.z) max.z = z;
        }

        this.setMinMax(min, max);
    }


    intersectsBoundingSphere(sphere) {
        const sq = this._distanceToBoundingSphereSq(sphere);
        if (sq <= sphere.radius * sphere.radius) {
            return true;
        }

        return false;
    }

    _distanceToBoundingSphereSq({ center }) {
        const boxMin = this.getMin();
        const boxMax = this.getMax();

        let sq = 0;

        for (let i = 0; i < 3; ++i) {
            let out = 0;
            const pn = center.data[i];
            const bMin = boxMin.data[i];
            const bMax = boxMax.data[i];
            let val = 0;

            if (pn < bMin) {
                val = (bMin - pn);
                out += val * val;
            }

            if (pn > bMax) {
                val = (pn - bMax);
                out += val * val;
            }

            sq += out;
        }

        return sq;
    }
}