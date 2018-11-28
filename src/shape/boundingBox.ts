/*
 * ProjectName: hypergl
 * FilePath: \src\shape\boundingBox.ts
 * Created Date: Friday, October 19th 2018, 12:05:18 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Thursday, November 29th 2018, 12:38:28 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Vec3 } from '../math';
export class BoundingBox {
    min = new Vec3();
    max = new Vec3();
    private _points?: Vec3[];

    constructor(private center = new Vec3(), private halfExtents = new Vec3(0.5, 0.5, 0.5)) {

    }
    static compute(positions: number[]) {
        const box = new BoundingBox();
        box.compute(positions);
        return box;
    }
    compute(positions: number[]) {
        for (let i = 0; i < positions.length; i++) {
            let item = positions[i];
            if (i % 3 === 0) {
                if (this.min.x > item) {
                    this.min.x = item;
                } else if (this.max.x < item) {
                    this.max.x = item;
                }
            } else if (i % 3 === 1) {
                if (this.min.y > item) {
                    this.min.y = item;
                } else if (this.max.y < item) {
                    this.max.y = item;
                }
            } else if (i % 3 === 2) {
                if (this.min.z > item) {
                    this.min.z = item;
                } else if (this.max.z < item) {
                    this.max.z = item;
                }
            }
        }
        this.center = new Vec3().add2(this.min, this.max).scale(0.5);
        this.halfExtents = new Vec3(
            (this.max.x - this.min.x) / 2,
            (this.max.y - this.min.y) / 2,
            (this.max.z - this.min.z) / 2,
        );
        this._points = undefined;
    }
    getPoints() {
        if (this._points) {
            return this._points;
        }
        let vec3Arr = [this.max, this.min];
        let { x: x1, x: y1, x: z1 } = this.max;
        let { x: x2, x: y2, x: z2 } = this.min;
        vec3Arr.push(new Vec3(x1, y2, z2));
        vec3Arr.push(new Vec3(x2, y1, z2));
        vec3Arr.push(new Vec3(x2, y2, z1));
        vec3Arr.push(new Vec3(x2, y1, z1));
        vec3Arr.push(new Vec3(x1, y2, z1));
        vec3Arr.push(new Vec3(x1, y1, z2));
        this._points = vec3Arr;
        return vec3Arr;
    }
}