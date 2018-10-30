/*
 * ProjectName: hypergl
 * FilePath: \src\shape\boundingBox.ts
 * Created Date: Friday, October 19th 2018, 12:05:18 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Tuesday, October 30th 2018, 12:37:22 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Vec3 } from '../math';
export class BoundingBox {
    min = new Vec3();
    max = new Vec3();
    constructor(private center = new Vec3(), private halfExtents = new Vec3(0.5, 0.5, 0.5)) {

    }
    static compute(positions: number[]) {
        const box = new BoundingBox();
        for (let i = 0; i < positions.length; i++) {
            let item = positions[i];
            if (i % 3 === 0) {
                if (box.min.x > item) {
                    box.min.x = item;
                } else if (box.max.x < item) {
                    box.max.x = item;
                }
            } else if (i % 3 === 1) {
                if (box.min.y > item) {
                    box.min.y = item;
                } else if (box.max.y < item) {
                    box.max.y = item;
                }
            } else if (i % 3 === 2) {
                if (box.min.z > item) {
                    box.min.z = item;
                } else if (box.max.z < item) {
                    box.max.z = item;
                }
            }
        }
        box.center = new Vec3().add2(box.min, box.max).scale(0.5);
        box.halfExtents = new Vec3(
            (box.max.x - box.min.x) / 2,
            (box.max.y - box.min.y) / 2,
            (box.max.z - box.min.z) / 2,
        );
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
    }

}