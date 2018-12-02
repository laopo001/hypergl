/*
 * ProjectName: hypergl
 * FilePath: \src\math\frustum.ts
 * Created Date: Thursday, October 18th 2018, 11:27:34 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, December 2nd 2018, 4:46:13 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */

import { Entity } from '../ecs/entity';
import { Mat4 } from './mat4';
import { Vec3 } from './vec3';
import { BoundingBox } from '../shape/boundingBox';
import { Plane } from './plane';
export class Frustum {
    planes: Plane[] = [];
    constructor(projectionMatrix, viewMatrix) {
        for (let i = 0; i < 6; i++) {
            this.planes[i] = new Plane();
        }
        this.update(projectionMatrix, viewMatrix);
    }
    update(projectionMatrix, viewMatrix) {
        let viewProj = new Mat4();
        viewProj.mul2(projectionMatrix, viewMatrix);
        let me = viewProj.data;
        let planes = this.planes;

        // tslint:disable-next-line:one-variable-per-declaration
        let me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
        // tslint:disable-next-line:one-variable-per-declaration
        let me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
        // tslint:disable-next-line:one-variable-per-declaration
        let me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
        // tslint:disable-next-line:one-variable-per-declaration
        let me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];

        planes[0].set(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
        planes[1].set(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
        planes[2].set(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
        planes[3].set(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
        planes[4].set(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
        planes[5].set(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();

        return this;
    }
    containsPoint(point: Vec3) {
        let planes = this.planes;
        for (let i = 0; i < 6; i ++) {
            if (planes[ i ].distanceToPoint(point) < 0) {
                return false;	//不在边界内,返回false
            }
        }
        return true;		//在边界内,返回true
    }
    containsBox(box: BoundingBox) {
        for (let i = 0; i < this.planes.length; i++) {
            const plane = this.planes[i];
            let [x, y, z] = plane.normal.data;
            let p1 = new Vec3();
            let p2 = new Vec3();
            p1.x = x > 0 ? box.min.x : box.max.x;
            p2.x = x > 0 ? box.max.x : box.min.x;
            p1.y = y > 0 ? box.min.y : box.max.y;
            p2.y = y > 0 ? box.max.y : box.min.y;
            p1.z = z > 0 ? box.min.z : box.max.z;
            p2.z = z > 0 ? box.max.z : box.min.z;
            if (plane.distanceToPoint(p1) < 0 && plane.distanceToPoint(p2) < 0) {
                return false;
            }
        }
        return true;
    }
    containsSphere(sphere) {
        let planes = this.planes;
        let center = sphere.center;
        let negRadius = - sphere.radius;
        for (let i = 0; i < 6; i ++) {
            let distance = planes[ i ].distanceToPoint(center);
            if (distance < negRadius) {
                return false;	//不相交返回false
            }
        }
        return true;	//相交返回true
    }
}