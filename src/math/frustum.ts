/*
 * ProjectName: hypergl
 * FilePath: \src\math\frustum.ts
 * Created Date: Thursday, October 18th 2018, 11:27:34 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, November 28th 2018, 3:48:49 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { Entity } from '../ecs/entity';
import { Mat4 } from './mat4';
import { Vec3 } from './vec3';
export class Frustum {
    planes: number[][] = [];
    constructor(projectionMatrix, viewMatrix) {
        for (let i = 0; i < 6; i++) {
            this.planes[i] = [];
        }
        this.update(projectionMatrix, viewMatrix);
    }
    update(projectionMatrix, viewMatrix) {
        let viewProj = new Mat4();
        viewProj.mul2(projectionMatrix, viewMatrix);
        let vpm = viewProj.data;
        // Extract the numbers for the RIGHT plane
        this.planes[0][0] = vpm[3] - vpm[0];
        this.planes[0][1] = vpm[7] - vpm[4];
        this.planes[0][2] = vpm[11] - vpm[8];
        this.planes[0][3] = vpm[15] - vpm[12];
        // Normalize the result
        let t = Math.sqrt(this.planes[0][0] * this.planes[0][0] + this.planes[0][1] * this.planes[0][1] + this.planes[0][2] * this.planes[0][2]);
        this.planes[0][0] /= t;
        this.planes[0][1] /= t;
        this.planes[0][2] /= t;
        this.planes[0][3] /= t;

        // Extract the numbers for the LEFT plane
        this.planes[1][0] = vpm[3] + vpm[0];
        this.planes[1][1] = vpm[7] + vpm[4];
        this.planes[1][2] = vpm[11] + vpm[8];
        this.planes[1][3] = vpm[15] + vpm[12];
        // Normalize the result
        t = Math.sqrt(this.planes[1][0] * this.planes[1][0] + this.planes[1][1] * this.planes[1][1] + this.planes[1][2] * this.planes[1][2]);
        this.planes[1][0] /= t;
        this.planes[1][1] /= t;
        this.planes[1][2] /= t;
        this.planes[1][3] /= t;

        // Extract the BOTTOM plane
        this.planes[2][0] = vpm[3] + vpm[1];
        this.planes[2][1] = vpm[7] + vpm[5];
        this.planes[2][2] = vpm[11] + vpm[9];
        this.planes[2][3] = vpm[15] + vpm[13];
        // Normalize the result
        t = Math.sqrt(this.planes[2][0] * this.planes[2][0] + this.planes[2][1] * this.planes[2][1] + this.planes[2][2] * this.planes[2][2]);
        this.planes[2][0] /= t;
        this.planes[2][1] /= t;
        this.planes[2][2] /= t;
        this.planes[2][3] /= t;

        // Extract the TOP plane
        this.planes[3][0] = vpm[3] - vpm[1];
        this.planes[3][1] = vpm[7] - vpm[5];
        this.planes[3][2] = vpm[11] - vpm[9];
        this.planes[3][3] = vpm[15] - vpm[13];
        // Normalize the result
        t = Math.sqrt(this.planes[3][0] * this.planes[3][0] + this.planes[3][1] * this.planes[3][1] + this.planes[3][2] * this.planes[3][2]);
        this.planes[3][0] /= t;
        this.planes[3][1] /= t;
        this.planes[3][2] /= t;
        this.planes[3][3] /= t;

        // Extract the FAR plane
        this.planes[4][0] = vpm[3] - vpm[2];
        this.planes[4][1] = vpm[7] - vpm[6];
        this.planes[4][2] = vpm[11] - vpm[10];
        this.planes[4][3] = vpm[15] - vpm[14];
        // Normalize the result
        t = Math.sqrt(this.planes[4][0] * this.planes[4][0] + this.planes[4][1] * this.planes[4][1] + this.planes[4][2] * this.planes[4][2]);
        this.planes[4][0] /= t;
        this.planes[4][1] /= t;
        this.planes[4][2] /= t;
        this.planes[4][3] /= t;

        // Extract the NEAR plane
        this.planes[5][0] = vpm[3] + vpm[2];
        this.planes[5][1] = vpm[7] + vpm[6];
        this.planes[5][2] = vpm[11] + vpm[10];
        this.planes[5][3] = vpm[15] + vpm[14];
        // Normalize the result
        t = Math.sqrt(this.planes[5][0] * this.planes[5][0] + this.planes[5][1] * this.planes[5][1] + this.planes[5][2] * this.planes[5][2]);
        this.planes[5][0] /= t;
        this.planes[5][1] /= t;
        this.planes[5][2] /= t;
        this.planes[5][3] /= t;
    }
    containsPoint(point: Vec3) {
        for (let p = 0; p < 6; p++) {
            if (this.planes[p][0] * point.x +
                this.planes[p][1] * point.y +
                this.planes[p][2] * point.z +
                this.planes[p][3] <= 0) {
                return false;
            }
        }
        return true;
    }
    containsSphere (sphere) {
        let c = 0;
        let d;
        let p;
        let sr = sphere.radius;
        let sc = sphere.center;
        let scx = sc.x;
        let scy = sc.y;
        let scz = sc.z;
        let planes = this.planes;
        let plane;
        for (p = 0; p < 6; p++) {
            plane = planes[p];
            d = plane[0] * scx + plane[1] * scy + plane[2] * scz + plane[3];
            if (d <= -sr) {
                return 0;
            }
            if (d > sr) {
                c++;
            }
        }
        return (c === 6) ? 2 : 1;
    }
}