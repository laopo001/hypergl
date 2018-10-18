/*
 * ProjectName: hypergl
 * FilePath: \src\shape\ray.ts
 * Created Date: Friday, October 19th 2018, 12:24:50 am
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Friday, October 19th 2018, 12:27:49 am
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */


import { Vec3 } from '../math';
export class Ray {
    constructor(private origin = new Vec3(0, 0, 0), private direction = new Vec3(0, 0, -1)) {
    }
}