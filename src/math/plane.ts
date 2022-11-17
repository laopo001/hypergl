/*
 * ProjectName: hypergl
 * FilePath: \src\math\plane.ts
 * Created Date: Saturday, December 1st 2018, 4:25:00 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Saturday, December 1st 2018, 6:26:35 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Vec3 } from './vec3';
export class Plane {
    constructor(
        public normal = new Vec3(11, 0, 0),
        public constant = 0) {

    }
    normalize() {
        // Note: will lead to a divide by zero if the plane is invalid.
        // NOTE: 注意如果平面无效将产生除数是0的错误.
        let inverseNormalLength = 1.0 / this.normal.length();
        this.normal.scale(inverseNormalLength);
        this.constant *= inverseNormalLength;
        return this;	//返回规范化的二维平面(获得单位平面)
    }
    set(x: number, y: number, z: number, constant: number) {
        this.normal.set(x, y, z);
        this.constant = constant;
        return this;
    }
    distanceToPoint(point: Vec3) {
        return this.normal.dot(point) + this.constant;	//返回三维空间内一点到Plane二维平面对象表面的最小长度
    }
}