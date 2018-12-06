/*
 * ProjectName: hypergl
 * FilePath: \src\shape\boundingSphere.ts
 * Created Date: Thursday, December 6th 2018, 7:52:28 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, December 7th 2018, 12:54:06 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Vec3 } from '../math';

export class BoundingSphere {
    min = new Vec3();
    max = new Vec3();
    constructor(public center = new Vec3(0, 0, 0), public radius = 0.5) {

    }
    static compute(positions: number[]) {
        let t = new BoundingSphere();
        t.compute(positions);
        return t;
    }
    containsPoint(point: Vec3) {
        const len = new Vec3().sub2(point, this.center).length();
        return this.radius > len;
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
        this.radius = new Vec3(
            (this.max.x - this.min.x) / 2,
            (this.max.y - this.min.y) / 2,
            (this.max.z - this.min.z) / 2
        ).length();
        // this.radius = Math.min(
        //     (this.max.x - this.min.x) / 2,
        //     (this.max.y - this.min.y) / 2,
        //     (this.max.z - this.min.z) / 2
        // );
    }
}